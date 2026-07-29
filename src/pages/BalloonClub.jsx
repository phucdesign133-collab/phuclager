import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { balloonClubData } from "../datas/balloonClubData";
import BackgroundText from "../components/backgroundText";
import SliderSection from "../components/SliderSection";
import "../components/BalloonClub.css";

const BalloonClub = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [levelFilters, setLevelFilters] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const removeDiacritics = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const matchesKeyword = (text, keyword) => {
    const cleanKw = removeDiacritics(keyword).trim();
    if (!cleanKw) return false; // Không có từ khóa thì không bao giờ khớp

    const cleanText = removeDiacritics(text);
    const textWords = cleanText.split(/\s+/);
    const kwWords = cleanKw.split(/\s+/);

    return kwWords.every((kwWord) => textWords.some((word) => word.includes(kwWord)) || cleanText.includes(cleanKw));
  };

  const renderHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      removeDiacritics(part) === removeDiacritics(highlight) ? (
        <span key={i} style={{ color: "#e91e63", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // Chỉ lấy gợi ý khi thực sự có nhập từ khóa tìm kiếm
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    let results = [];

    balloonClubData.forEach((group) => {
      group.tools.forEach((tool) => {
        if (matchesKeyword(tool.title, searchTerm)) {
          results.push({
            ...tool,
            categoryName: group.category,
          });
        }
      });
    });
    return results;
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = useMemo(() => {
    return balloonClubData.map((group) => {
      let tools = group.tools;

      if (searchTerm.trim()) {
        tools = tools.filter((tool) => matchesKeyword(tool.title, searchTerm));
      }

      const activeSub = filters[group.category];
      if (activeSub && activeSub !== "Tất cả") {
        tools = tools.filter((tool) => tool.subCategory === activeSub);
      }

      // Sửa lại đoạn kiểm tra level ở đây:
      // Chỉ lọc theo level khi người dùng chọn đúng subCategory và chọn một level cụ thể (khác "Tất cả")
      if (activeSub) {
        const activeLevel = levelFilters[group.category];
        if (activeLevel && activeLevel !== "Tất cả" && activeLevel !== "Tất cả cấp độ") {
          tools = tools.filter((tool) => tool.level === activeLevel);
        }
      }

      return { ...group, tools };
    });
  }, [searchTerm, filters, levelFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFocused(true);
  };

  const levelDescriptions = {
    "Tất cả": "Hiển thị tất cả các mẫu tạo hình từ cơ bản đến nâng cao.",
    "Level 1": "Nhập môn: tổng hợp các mẫu dễ",
    "Level 2": "Cơ bản: tổng hợp các mẫu nhiều thao tác hơn, kỹ thuật bắt đầu nâng cao",
    "Level 3": "Nâng cao: 1 bóng xoay nhiều chi tiết hoặc trên phức tạp hơn Cơ bản",
    "Level 4": "Chuyên gia: mẫu khó nhất, nhiều công đoạn và kỹ thuật phức tạp",
  };

  return (
    <div className="club-page">
      <BackgroundText category="balloonClub" />

     <div className="club-search-wrapper" ref={searchRef}>
  <input
    className="club-search-input"
    placeholder="Search in Balloon Club..."
    value={searchTerm}
    onChange={handleSearchChange}
    onFocus={() => setIsFocused(true)}
  />

  {/* Lớp overlay bấm để đóng (nếu trang có dùng) -> tạm ẩn lớp phủ trước để sau dùng thì bật lại*/} 
  {/* {isFocused && searchTerm.trim() && searchSuggestions.length > 0 && (
    <div className="search-overlay" onClick={() => setIsFocused(false)} />
  )} */}

  {/* Dùng thẻ ul và class suggestions-list để ăn theo CSS có sẵn thanh cuộn dọc */}
  {isFocused && searchTerm.trim() && searchSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {searchSuggestions.slice(0, 5).map((item) => {
        const displaySubCategory = item.subCategory 
          ? `${item.subCategory}${item.level ? ` - ${item.level}` : ""}` 
          : item.categoryName;

        return (
          <li
            key={item.id}
            className="suggestion-item"
            onClick={() => {
              setSearchTerm(item.title);
              setIsFocused(false);
              navigate(`/balloon-club/${item.id}`);
            }}
          >
            <span className="suggestion-title">
              {renderHighlightedText(item.title, searchTerm)}
            </span>
            <span className="suggestion-category" style={{ fontStyle: "italic", color: "#666" }}>
              &nbsp;(in section {displaySubCategory})
            </span>
          </li>
        );
      })}
    </ul>
  )}
</div>

      <div className="club-content">
        {filteredData.map((group, index) => {
          const currentSub = filters[group.category] || "Tất cả";

          return (
            <div key={index} className="club-group-wrapper">
              <div className="club-group-header">
                <h3>{group.category}</h3>

                <select
                  className="club-select"
                  value={currentSub}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters((prev) => ({ ...prev, [group.category]: val }));
                    setLevelFilters((prev) => ({ ...prev, [group.category]: "Tất cả" }));
                  }}
                >
                  <option value="Tất cả">Tất cả</option>
                  {group.subCategories?.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {currentSub === "Từ một quả Bóng" && (
                <div className="level-select-wrapper level-select-animation">
                  <select
                    className="club-level-select-full"
                    value={levelFilters[group.category] || "Tất cả"}
                    onChange={(e) => setLevelFilters((prev) => ({ ...prev, [group.category]: e.target.value }))}
                  >
                    <option value="Tất cả">Tất cả cấp độ</option>
                    <option value="Level 1">Level 01 — Cơ bản (Beginner)</option>
                    <option value="Level 2">Level 02 — Nâng cấp (Intermediate)</option>
                    <option value="Level 3">Level 03 — Nâng cao (Advanced)</option>
                    <option value="Level 4">Level 04 — Chuyên gia (Expert)</option>
                  </select>
                  <p className="level-sub-desc">💡 {levelDescriptions[levelFilters[group.category] || "Tất cả"]}</p>
                </div>
              )}

              {group.tools.length > 0 ? (
                <SliderSection title="" tools={group.tools} basePath="/balloon-club" />
              ) : (
                <p className="club-empty">Dữ liệu đang được cập nhật... ⏳</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BalloonClub;
