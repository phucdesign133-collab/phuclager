import React, { useState, useEffect } from "react";
import "../css/Tab.css";
import SocialGrid from "../components/SocialGrid";
import SocialIdeaGrid from "../components/SocialIdeaGrid"; 
import SocialList from "../components/SocialList";
import SocialPopup from "../components/popup/SocialPopup";
import SocialSeriesPopup from "../components/popup/SocialSeriesPopup"; 

export default function Social({ selectedFilter, isPopupOpen, setIsPopupOpen, onActiveSeriesChange }) {
  const [seriesMeta, setSeriesMeta] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_series_meta");
    return saved ? JSON.parse(saved) : {};
  });

  const [seriesEpisodes, setSeriesEpisodes] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_series_episodes");
    return saved ? JSON.parse(saved) : {};
  });

  const [ideaMeta, setIdeaMeta] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_idea_meta");
    return saved ? JSON.parse(saved) : {};
  });
  const [ideaEpisodes, setIdeaEpisodes] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_idea_episodes");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeSeries, setActiveSeries] = useState(null);
  
  const [editingSeriesCode, setEditingSeriesCode] = useState(null);
  const [editingSeriesData, setEditingSeriesData] = useState(null);

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
    localStorage.setItem("phuc_lager_idea_meta", JSON.stringify(ideaMeta));
  }, [ideaMeta]);

  useEffect(() => {
    localStorage.setItem("phuc_lager_idea_episodes", JSON.stringify(ideaEpisodes));
  }, [ideaEpisodes]);

  useEffect(() => {
    if (onActiveSeriesChange) {
      onActiveSeriesChange(activeSeries);
    }
  }, [activeSeries, onActiveSeriesChange]);

  // Kiểm tra xem đang ở chế độ Idea hay Series dựa vào giá trị lọc của Header
  const isIdeaMode = selectedFilter === "Quản lý Ideas" || selectedFilter === "Ideas" || selectedFilter?.toLowerCase().includes("idea");

  // Reset lại activeSeries khi chuyển đổi qua lại giữa các bộ lọc trên header để tránh kẹt màn hình chi tiết
  useEffect(() => {
    setActiveSeries(null);
    setEditingSeriesCode(null);
    setEditingSeriesData(null);
  }, [selectedFilter]);

  const gridFormattedData = React.useMemo(() => {
    const result = {};
    Object.keys(seriesMeta).forEach((code) => {
      const meta = seriesMeta[code] || {};
      const episodes = seriesEpisodes[code] || [];
      const listCopy = [...episodes];
      listCopy.seriesName = meta.title;
      listCopy.purpose = meta.purpose;
      listCopy.updatedAt = meta.updatedAt || 0;
      result[code] = listCopy;
    });
    return result;
  }, [seriesMeta, seriesEpisodes]);

  const ideaGridFormattedData = React.useMemo(() => {
    const result = {};
    Object.keys(ideaMeta).forEach((code) => {
      const meta = ideaMeta[code] || {};
      const episodes = ideaEpisodes[code] || [];
      const listCopy = [...episodes];
      listCopy.seriesName = meta.title;
      listCopy.purpose = meta.purpose;
      listCopy.targetAudience = meta.targetAudience;
      listCopy.scope = meta.scope;
      listCopy.budget = meta.budget;
      listCopy.startDate = meta.startDate;
      listCopy.timeSlot = meta.timeSlot;
      listCopy.notes = meta.notes;
      listCopy.updatedAt = meta.updatedAt || 0;
      result[code] = listCopy;
    });
    return result;
  }, [ideaMeta, ideaEpisodes]);

  const handleSaveSeries = (newData) => {
    const isIdea = newData.activeTab === 'idea';
    let targetCode = "";
    if (isIdea) {
      targetCode = editingSeriesCode || `idea_${Date.now()}`;
    } else {
      targetCode = (newData.code || "").trim().toLowerCase();
    }
      
    if (!targetCode) return;

    const currentTime = Date.now();
    const metaPayload = {
      title: newData.title,
      purpose: newData.purpose,
      targetAudience: newData.targetAudience,
      scope: newData.scope,
      budget: newData.budget,
      startDate: newData.startDate,
      timeSlot: newData.timeSlot,
      notes: newData.notes,
      updatedAt: currentTime
    };

    if (isIdea) {
      setIdeaMeta((prevMeta) => {
        const updated = { ...prevMeta };
        updated[targetCode] = metaPayload;
        return updated;
      });
    } else {
      setSeriesMeta((prevMeta) => {
        const updated = { ...prevMeta };
        if (editingSeriesCode && editingSeriesCode !== targetCode) {
          updated[targetCode] = metaPayload;
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
          updated[targetCode] = metaPayload;
        }
        return updated;
      });
    }

    setIsPopupOpen(false);
    setEditingSeriesCode(null);
    setEditingSeriesData(null);
  };

  const handleSaveEpisode = (episodeData) => {
    if (!activeSeries) return;
    const currentTime = Date.now();

    if (isIdeaMode) {
      setIdeaEpisodes((prev) => {
        const updated = { ...prev };
        const list = [...(updated[activeSeries] || [])];
        if (editingEpisodeIndex !== null && editingEpisodeIndex >= 0) {
          list[editingEpisodeIndex] = episodeData;
        } else {
          list.push(episodeData);
        }
        updated[activeSeries] = list;
        return updated;
      });
      setIdeaMeta((prevMeta) => {
        const currentMeta = prevMeta[activeSeries] || {};
        return { ...prevMeta, [activeSeries]: { ...currentMeta, updatedAt: currentTime } };
      });
    } else {
      setSeriesEpisodes((prev) => {
        const updated = { ...prev };
        const list = [...(updated[activeSeries] || [])];
        if (editingEpisodeIndex !== null && editingEpisodeIndex >= 0) {
          list[editingEpisodeIndex] = episodeData;
        } else {
          list.push(episodeData);
        }
        updated[activeSeries] = list;
        return updated;
      });
      setSeriesMeta((prevMeta) => {
        const currentMeta = prevMeta[activeSeries] || {};
        return { ...prevMeta, [activeSeries]: { ...currentMeta, updatedAt: currentTime } };
      });
    }

    setIsEpisodePopupOpen(false);
    setEditingEpisodeIndex(null);
    setEditingEpisodeData(null);
  };

  return (
    <div className="finance-wrapper">
      {!activeSeries ? (
        isIdeaMode ? (
          <SocialIdeaGrid 
            rawData={ideaGridFormattedData} 
            onSelectSeries={(seriesKey) => setActiveSeries(seriesKey)} 
            onEditSeries={(seriesKey) => {
              setEditingSeriesCode(seriesKey);
              const meta = ideaMeta[seriesKey] || {};
              setEditingSeriesData({
                code: seriesKey,
                title: meta.title || '',
                purpose: meta.purpose || '',
                targetAudience: meta.targetAudience || '',
                scope: meta.scope || 'Cá nhân',
                budget: meta.budget || '',
                startDate: meta.startDate || '',
                timeSlot: meta.timeSlot || '',
                notes: meta.notes || ''
              });
              setIsPopupOpen(true);
            }}
            onDeleteSeries={(seriesKey) => {
              if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ idea này không?`)) {
                setIdeaMeta((prev) => {
                  const updated = { ...prev };
                  delete updated[seriesKey];
                  return updated;
                });
                setIdeaEpisodes((prev) => {
                  const updated = { ...prev };
                  delete updated[seriesKey];
                  return updated;
                });
              }
            }}
          />
        ) : (
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
        )
      ) : (
        <SocialList 
          activeSeries={activeSeries}
          seriesItems={isIdeaMode ? (ideaEpisodes[activeSeries] || []) : (seriesEpisodes[activeSeries] || [])}
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
            if (isIdeaMode) {
              setIdeaEpisodes((prev) => {
                const updated = { ...prev };
                const list = [...(updated[activeSeries] || [])];
                list.splice(index, 1);
                updated[activeSeries] = list;
                return updated;
              });
              setIdeaMeta((prevMeta) => {
                const currentMeta = prevMeta[activeSeries] || {};
                return { ...prevMeta, [activeSeries]: { ...currentMeta, updatedAt: currentTime } };
              });
            } else {
              setSeriesEpisodes((prev) => {
                const updated = { ...prev };
                const list = [...(updated[activeSeries] || [])];
                list.splice(index, 1);
                updated[activeSeries] = list;
                return updated;
              });
              setSeriesMeta((prevMeta) => {
                const currentMeta = prevMeta[activeSeries] || {};
                return { ...prevMeta, [activeSeries]: { ...currentMeta, updatedAt: currentTime } };
              });
            }
          }}
        />
      )}

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
        initialTab={isIdeaMode ? "idea" : "series"}
      />

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