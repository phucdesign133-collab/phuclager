import React, { useRef, useState, useEffect } from "react";
import "./MenuIconEventSection.css";
import { filters_events } from "../datas/dataJSX";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MenuIconEventSection = ({ category, activeFilter, setActiveFilter }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  // Chỉ lấy các icon thuộc category hiện tại
  const filteredIcons = (filters_events ?? []).filter((item) => item?.category === category);

  useEffect(() => {
    // Khi đổi tab, tự động chọn icon đầu tiên của tab đó
    if (filteredIcons.length > 0) {
      setActiveFilter(filteredIcons[0].id);
    }
  }, [category]);

  const checkScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="menu-gallery-wrapper">
      {showLeftArrow && (
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>
      )}

      <div className="icon-event-section" ref={scrollRef}>
        {/* QUAN TRỌNG: Phải map qua filteredIcons để không bị hiện icon của tab khác */}
        {filteredIcons.map((filter) => (
          <div
            key={filter.id}
            className={`filter-item-event-section ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span className="filter-icon">{filter.activeFilter === filter.id ? filter.iconActive : filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </div>
        ))}
      </div>

      {/* Nút scroll phải luôn hiện nếu có nhiều icon */}
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};
export default MenuIconEventSection;
