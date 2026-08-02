import React, { useState, useEffect } from "react";
import "../css/Tab.css";
import SocialGrid from "../components/SocialGrid";
import SocialList from "../components/SocialList";
import SocialPopup from "../components/popup/SocialPopup";
import SocialSeriesPopup from "../components/popup/SocialSeriesPopup"; // ✅ Import popup tập

export default function Social({ selectedFilter, isPopupOpen, setIsPopupOpen, onActiveSeriesChange }) {
  // 1. Lưu trữ thông tin định hướng (Title, Purpose, updatedAt) của từng series riêng biệt
  const [seriesMeta, setSeriesMeta] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_series_meta");
    return saved ? JSON.parse(saved) : {};
  });

  // 2. Lưu trữ danh sách các tập thực tế bên trong của từng series
  const [seriesEpisodes, setSeriesEpisodes] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_series_episodes");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeSeries, setActiveSeries] = useState(null);
  
  // State quản lý popup series lớn
  const [editingSeriesCode, setEditingSeriesCode] = useState(null);
  const [editingSeriesData, setEditingSeriesData] = useState(null);

  // ✅ State quản lý popup tập con bên trong SocialList
  const [isEpisodePopupOpen, setIsEpisodePopupOpen] = useState(false);
  const [editingEpisodeIndex, setEditingEpisodeIndex] = useState(null);
  const [editingEpisodeData, setEditingEpisodeData] = useState(null);

  useEffect(() => {
    localStorage.setItem("phuc_lager_series_meta", JSON.stringify(seriesMeta));
  }, [seriesMeta]);

  useEffect(() => {
    localStorage.setItem("phuc_lager_series_episodes", JSON.stringify(seriesEpisodes));
  }, [seriesEpisodes]);

  useEffect(() => {
    if (onActiveSeriesChange) {
      onActiveSeriesChange(activeSeries);
    }
  }, [activeSeries, onActiveSeriesChange]);

  // Gom dữ liệu chuẩn xác để SocialGrid nhận diện được cả title, purpose và thời gian updatedAt (cả cha lẫn con)
  const gridFormattedData = React.useMemo(() => {
    const result = {};
    Object.keys(seriesMeta).forEach((code) => {
      const meta = seriesMeta[code] || {};
      const episodes = seriesEpisodes[code] || [];
      
      const listCopy = [...episodes];
      listCopy.seriesName = meta.title;
      listCopy.purpose = meta.purpose;
      // Lấy thời gian cập nhật của cha hoặc thời gian mới nhất từ các tập con bên trong
      listCopy.updatedAt = meta.updatedAt || 0;
      
      result[code] = listCopy;
    });
    return result;
  }, [seriesMeta, seriesEpisodes]);

  // Chỉ lưu thông tin series từ popup lớn (Cập nhật updatedAt cho cha)
  const handleSaveSeries = (newData) => {
    const targetCode = (newData.code || "").trim().toLowerCase();
    if (!targetCode) return;

    const currentTime = Date.now();

    setSeriesMeta((prevMeta) => {
      const updated = { ...prevMeta };

      if (editingSeriesCode && editingSeriesCode !== targetCode) {
        updated[targetCode] = { 
          title: newData.title, 
          purpose: newData.purpose, 
          updatedAt: currentTime 
        };
        delete updated[editingSeriesCode];

        setSeriesEpisodes((prevEp) => {
          const epUpdated = { ...prevEp };
          if (epUpdated[editingSeriesCode]) {
            epUpdated[targetCode] = epUpdated[editingSeriesCode];
            delete epUpdated[editingSeriesCode];
          }
          return epUpdated;
        });
      } else {
        updated[targetCode] = { 
          title: newData.title, 
          purpose: newData.purpose, 
          updatedAt: currentTime // Đẩy lên đầu khi chỉnh sửa/tạo series cha
        };
      }

      return updated;
    });

    setIsPopupOpen(false);
    setEditingSeriesCode(null);
    setEditingSeriesData(null);
  };

  // ✅ Hàm lưu tập mới hoặc cập nhật tập hiện tại từ SocialSeriesPopup (Đồng thời cập nhật updatedAt cho series cha để đẩy lên đầu)
  const handleSaveEpisode = (episodeData) => {
    if (!activeSeries) return;

    const currentTime = Date.now();

    setSeriesEpisodes((prev) => {
      const updated = { ...prev };
      const list = [...(updated[activeSeries] || [])];

      if (editingEpisodeIndex !== null && editingEpisodeIndex >= 0) {
        list[editingEpisodeIndex] = episodeData; // Sửa tập
      } else {
        list.push(episodeData); // Thêm tập mới
      }

      updated[activeSeries] = list;
      return updated;
    });

    // Cập nhật lại thời gian updatedAt của series cha tương ứng để nó tự động nhảy lên đầu ở SocialGrid
    setSeriesMeta((prevMeta) => {
      const currentMeta = prevMeta[activeSeries] || {};
      return {
        ...prevMeta,
        [activeSeries]: {
          ...currentMeta,
          updatedAt: currentTime
        }
      };
    });

    setIsEpisodePopupOpen(false);
    setEditingEpisodeIndex(null);
    setEditingEpisodeData(null);
  };

  return (
    <div className="finance-wrapper">
      {!activeSeries ? (
        <SocialGrid 
          rawData={gridFormattedData} 
          onSelectSeries={(seriesKey) => setActiveSeries(seriesKey)} 
          onEditSeries={(seriesKey) => {
            setEditingSeriesCode(seriesKey);
            const meta = seriesMeta[seriesKey] || {};
            setEditingSeriesData({
              code: seriesKey,
              title: meta.title || '',
              purpose: meta.purpose || ''
            });
            setIsPopupOpen(true);
          }}
          onDeleteSeries={(seriesKey) => {
            if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ series [${seriesKey.toUpperCase()}] không?`)) {
              setSeriesMeta((prev) => {
                const updated = { ...prev };
                delete updated[seriesKey];
                return updated;
              });
              setSeriesEpisodes((prev) => {
                const updated = { ...prev };
                delete updated[seriesKey];
                return updated;
              });
            }
          }}
        />
      ) : (
        <SocialList 
          activeSeries={activeSeries}
          seriesItems={seriesEpisodes[activeSeries] || []}
          onBack={() => {
            setActiveSeries(null);
            setEditingSeriesCode(null);
            setEditingSeriesData(null);
          }}
          onOpenAddPopup={() => {
            setEditingEpisodeIndex(null);
            setEditingEpisodeData(null);
            setIsEpisodePopupOpen(true);
          }}
          onEditItem={(item, index) => {
            setEditingEpisodeIndex(index);
            setEditingEpisodeData(item);
            setIsEpisodePopupOpen(true);
          }}
          onDeleteItem={(index) => {
            const currentTime = Date.now();
            setSeriesEpisodes((prev) => {
              const updated = { ...prev };
              const list = [...(updated[activeSeries] || [])];
              list.splice(index, 1);
              updated[activeSeries] = list;
              return updated;
            });
            // Cập nhật lại thời gian khi xóa tập con để phản ánh thay đổi mới nhất
            setSeriesMeta((prevMeta) => {
              const currentMeta = prevMeta[activeSeries] || {};
              return {
                ...prevMeta,
                [activeSeries]: {
                  ...currentMeta,
                  updatedAt: currentTime
                }
              };
            });
          }}
        />
      )}

      {/* Popup quản lý Series lớn */}
      <SocialPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setEditingSeriesCode(null);
          setEditingSeriesData(null);
        }}
        onSave={handleSaveSeries}
        isEditing={!!editingSeriesCode}
        lastSavedData={editingSeriesData}
      />

      {/* ✅ Popup quản lý Tập bên trong SocialList */}
      <SocialSeriesPopup
        isOpen={isEpisodePopupOpen}
        onClose={() => {
          setIsEpisodePopupOpen(false);
          setEditingEpisodeIndex(null);
          setEditingEpisodeData(null);
        }}
        onSave={handleSaveEpisode}
        lastSavedData={editingEpisodeData}
      />
    </div>
  );
}