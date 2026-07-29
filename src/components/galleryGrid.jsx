import React, { useState } from "react";
import "./galleryGrid.css";
import { mockGalleryItems } from "../datas/data";
// import BackgroundText from "./BackgroundText";
// import Breadcrumb from "./Breadcrumb";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuIcon from "./MenuIcon";

const GalleryGrid = ({ items = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredData = selectedCategory === "all" ? mockGalleryItems : mockGalleryItems.filter((item) => item.category === selectedCategory); // Đảm bảo đã đóng ngoặc đủ

  return (
    <div className="gallery-allpost-main-layout">
      {/* 1. Phần background và Breadcrumb */}
      {/* <BackgroundText /> */}
      {/* <Breadcrumb postTitle="Tất cả bài viết" /> */}
      {/* 2. Phần chứa của Sự kiện */}
      <div className="gallery-allpost-container">
        <div className="category-section">
          <h1>Category Sự kiện</h1>
          <MenuIcon />
        </div>
        <h1>Tất cả bài viết Sự kiện</h1>
        <div className="gallery-grid">
          {mockGalleryItems.map((item) => (
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
      {/* 3. Phần chứa của Thiết kế */}
      <div className="gallery-allpost-container">
        <div className="category-section">
          <h1>Category Thiết kế</h1>
          <MenuIcon />
        </div>
        <h1>Tất cả bài viết Thiết ké</h1>
        <div className="gallery-grid">
          {mockGalleryItems.map((item) => (
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
      {/* 4. Phần chứa của Dự án khác */}
      <div className="gallery-allpost-container">
        <div className="category-section">
          <h1>Category Dự án khác</h1>
          <MenuIcon />
        </div>
        <h1>Tất cả bài viết Dự án khác</h1>
        <div className="gallery-grid">
          {mockGalleryItems.map((item) => (
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
    </div>
  );
};

export default GalleryGrid;
