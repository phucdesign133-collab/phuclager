import React, { useRef, useState, useEffect } from "react";
import "./MenuIconEventSection.css";
import { filters_Gallery } from "../datas/dataJSX";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MenuIconDesignSection = ({ activeFilter, setActiveFilter }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

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
        {filters_Gallery.map((filter) => (
          <div
            key={filter.id}
            className={`filter-item-event-section ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuIconDesignSection;
