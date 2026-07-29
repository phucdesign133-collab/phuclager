import React, { useState } from "react";
import "./imageGallery.css";
import { galleryData } from "../datas/data";
import { Link } from "react-router-dom";

export default function ImageGallery({ activeFilter }) {
  const [visibleRows, setVisibleRows] = useState(3);

  // Logic hiển thị: Web 4 cột, Mobile 2 cột
  const isMobile = window.innerWidth < 768;
  const itemsPerRow = isMobile ? 2 : 4;
  const itemsToShow = visibleRows * itemsPerRow;

  // Lọc theo subCategory chuẩn xác hơn
  const filteredData = activeFilter === "all" ? galleryData : galleryData.filter((item) => item.subCategory === activeFilter);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-grid">
        {filteredData.slice(0, itemsToShow).map((item) => (
          /* Bọc Link ở đây để khi bấm vào ảnh sẽ chuyển hướng đến DetailPost */
          <Link key={item.id} to={`/post/${item.id}`} className="gallery-item-link">
            <img src={item.src} alt={item.title || "gallery"} className="gallery-img" />
          </Link>
        ))}
      </div>

      {/* Hiển thị thông báo nếu không có ảnh */}
      {filteredData.length === 0 && <p>Hiện tại chưa có ảnh cho mục này.</p>}

      {itemsToShow < filteredData.length && (
        <button className="load-more-btn" onClick={() => setVisibleRows((prev) => prev + 2)}>
          Xem thêm ảnh
        </button>
      )}
    </div>
  );
}
