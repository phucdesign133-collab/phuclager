import React, { useState } from "react";
import "./eventSection.css";
import { mockGalleryItems } from "../datas/data";
// import BackgroundText from "./BackgroundText";
// import Breadcrumb from "./Breadcrumb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuIconEventSection from "./MenuIconEventSection";

const DesignSection = ({ items = [] }) => {
  // const [selectedCategory, setSelectedCategory] = useState("all");

  // Logic lọc dữ liệu
  const filteredData = selectedCategory === "all" ? mockGalleryItems : mockGalleryItems.filter((item) => item.category === selectedCategory);
  return (
    <div className="design-section-container">
      <div className="category-section">
        <MenuIconEventSection activeFilter={selectedCategory} setActiveFilter={setSelectedCategory} />
      </div>

      <div className="gallery-grid">
        {filteredData.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.src} alt={item.title} />
            <div className="item-info">
              <p className="project-name">Dự án: {item.projectName}</p>
              <p className="project-time">Thời gian: {item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSection;
