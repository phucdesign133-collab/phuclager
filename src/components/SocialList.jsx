import React, { useState } from "react";
import { supabase } from "./utils/supabaseClient";
import "../css/Grid.css";
import SearchBar from "./searchBar";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

export default function SocialList({ activeSeries, seriesItems, onBack, onOpenAddPopup, onEditItem }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!activeSeries) return null;

  const sortedItems = seriesItems
    ? [...seriesItems]
        .map((item, originalIndex) => ({ ...item, originalIndex }))
        .sort((a, b) => {
          const epA = Number(a.episode) || 0;
          const epB = Number(b.episode) || 0;
          return epB - epA;
        })
    : [];

  return (
    <div className="grid-container">
      <div className="social-header-sticky">
        <div className="social-header-top-row">
          <button type="button" onClick={onBack} title="Quay lại danh sách Series" className="social-back-btn">
            ←
          </button>
          <h3 className="social-title-heading">{activeSeries.toUpperCase()}</h3>
          <button type="button" onClick={onOpenAddPopup} title="Thêm mục mới cho series" className="social-add-btn">
            +
          </button>
        </div>
        <div className="social-search-bar-wrapper">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Tìm kiếm theo tiêu đề..." />
        </div>
      </div>

      {!sortedItems || sortedItems.length === 0 ? (
        <div className="grid-no-data social-no-data">Chưa có mục nào trong series này.</div>
      ) : (
        <div className="social-list-grid">
          {sortedItems.map((item) => {
            const displayKey = item.clipName || item.keyWord;
            if (!displayKey || displayKey.trim() === "") return null;

            const actualIndex = item.originalIndex;
            const seriesNameUpper = (item.seriesName || activeSeries).toUpperCase();
            const paddedEpisode = item.episode ? String(item.episode).padStart(3, "0") : "000";
            const titleDisplay = `${seriesNameUpper}#${paddedEpisode} - ${displayKey}`;
            
            const matchesSearch = titleDisplay.toLowerCase().includes(searchTerm.toLowerCase());
            if (searchTerm.trim() !== "" && !matchesSearch) return null;

            return (
              <div
                key={actualIndex}
                onClick={() => onEditItem && onEditItem(item, actualIndex)}
                className="social-list-card"
              >
                {/* Ảnh nền */}
                <div className="social-list-image-wrapper">
                  {item.imagePreview ? (
                    <img src={item.imagePreview} alt="Preview" className="social-list-img" />
                  ) : (
                    <div className="social-list-no-image">Chưa có ảnh</div>
                  )}
                  <div className="social-list-gradient-overlay" />
                </div>

                {/* Nội dung TOP */}
                <div className="social-list-content-top">
                  <div className="social-list-item-title">{titleDisplay}</div>
                  {item.chapter && <div className="social-list-item-date">({item.chapter})</div>}
                </div>

                {/* Nội dung BOTTOM: Icon kèm ô tích */}
                <div className="social-list-content-bottom">
                  {[
                    { name: "Meta", active: item.postedMeta, icon: <FaFacebook /> },
                    { name: "YouTube", active: item.postedYouTube, icon: <FaYoutube /> },
                    { name: "TikTok", active: item.postedTikTok, icon: <FaTiktok /> }
                  ].map((p, i) => (
                    <div key={i} className={`social-list-platform-item ${p.active ? "active" : ""}`}>
                      <span className="social-list-checkbox">{p.active ? "☑" : "☐"}</span>
                      <span className="social-list-platform-icon">{p.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}