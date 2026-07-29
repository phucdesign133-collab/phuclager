import React, { useState, useMemo } from "react";
import "./searchSection.css";
import { data } from "../datas/galleryData";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const allGalleryItems = useMemo(() => {
    const events = data.events ? Object.values(data.events) : [];
    const designs = data.designs ? Object.values(data.designs) : [];
    return [...events, ...designs];
  }, []);

  // Logic tự động cập nhật hashtag dựa trên độ mới của bài viết
  const allSubCategories = useMemo(() => {
    const tagLatestDate = {};

    allGalleryItems.forEach((item) => {
      const cats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);
      // Lấy thời gian từ bài viết (đảm bảo mỗi item trong data có thuộc tính 'date')
      const itemDate = item.date ? new Date(item.date).getTime() : 0;

      cats.forEach((cat) => {
        if (!tagLatestDate[cat] || itemDate > tagLatestDate[cat]) {
          tagLatestDate[cat] = itemDate;
        }
      });
    });

    // Trả về 6 hashtag có bài viết mới nhất
    return Object.keys(tagLatestDate)
      .sort((a, b) => tagLatestDate[b] - tagLatestDate[a])
      .slice(0, 6);
  }, [allGalleryItems]);

  const renderHighlighted = (text, highlight) => {
    if (!highlight || !highlight.trim()) return text;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-highlight">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      const filtered = allGalleryItems.filter((item) => item.title && item.title.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
      setIsFocused(true);
    } else {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  return (
    <div className="search-section-main">
      <div className="search-bar-container">
        <div className="search-wrapper">
          <input
            className={`search-input ${isFocused && suggestions.length > 0 ? "is-active" : ""}`}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.trim().length > 0 && setIsFocused(true)}
            placeholder="Tìm kiếm nhanh..."
          />
          {isFocused && suggestions.length > 0 && <div className="search-overlay" onClick={() => setIsFocused(false)} />}
          {isFocused && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li
                  key={item.slug}
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/post/${item.slug}`);
                    setSearchTerm("");
                    setIsFocused(false);
                  }}
                >
                  {renderHighlighted(item.title, searchTerm)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="search-hashtags">
        {allSubCategories.map((sub, index) => (
          <span key={index} className="hashtag-pill" onClick={() => navigate(`/all-post?filter=${sub}`)}>
            #{sub.replace(/-/g, " ")}
          </span>
        ))}
      </div>
    </div>
  );
}
