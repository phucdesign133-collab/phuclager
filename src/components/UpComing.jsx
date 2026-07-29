import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { data } from "../datas/galleryData";

const UpComing = () => {
  // 1. Dữ liệu đã sắp xếp (giữ nguyên logic của bạn)
  const sortedItems = useMemo(() => {
    const allPosts = [...Object.values(data.events || {}), ...Object.values(data.designs || {})];

    // Hàm parseDate chuẩn
    const parseDate = (d) => {
      if (!d) return new Date(2000, 0, 1);
      if (d.includes(".")) {
        const [day, month, year] = d.split(".");
        return new Date(year, month - 1, day);
      }
      return new Date(d);
    };

    return allPosts
      .filter((item) => item?.date)
      .sort((a, b) => parseDate(b.date) - parseDate(a.date)) // Bài mới nhất (date lớn hơn) lên đầu
      .slice(0, 6);
  }, []);

  // 2. State & Logic điều hướng
  const [items, setItems] = useState(sortedItems);
  const [displayIndex, setDisplayIndex] = useState(1);

  const rotate = (dir) => {
    setItems((prev) => (dir === "next" ? [...prev.slice(1), prev[0]] : [prev[prev.length - 1], ...prev.slice(0, -1)]));
    setDisplayIndex((prev) => (dir === "next" ? (prev === sortedItems.length ? 1 : prev + 1) : prev === 1 ? sortedItems.length : prev - 1));
  };

  return (
    <div className="up-container">
      <div className="up-inner">
        <div className="up-text">
          <h6 className="up-title">Recents</h6>
          <p className="up-desc">Những khoảnh khắc gần đây...</p>
          <div className="up-nav">
            <button onClick={() => rotate("prev")} className="up-btn">
              ‹
            </button>
            <span className="up-count">
              {displayIndex} / {sortedItems.length}
            </span>
            <button onClick={() => rotate("next")} className="up-btn">
              ›
            </button>
          </div>
        </div>

        <div className="up-slider">
          <div className="up-track">
            {items.map((item, index) => (
              <Link key={item.slug} to={`/post/${item.slug}`} className={`up-card ${index >= 2 ? "dim" : ""}`}>
                <img src={`./img/${item.files?.[0] || "default.jpg"}`} alt={item.title} />
                <div className="up-overlay">
                  <span>{item.date.replace(/\./g, "/")}</span>
                  <h4>{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="up-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,30 C400,110 1040,10 1440,40 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      <style>{`
        .up-container { background: linear-gradient(135deg, #1e0b36, #0f051d); padding: 20px 0 80px; position: relative; width: 100%; overflow: hidden; }
        .up-inner { max-width: 1200px; display: flex; margin: 0 auto; padding: 0 20px; align-items: center; gap: 50px; }
        .up-text { flex: 0 0 300px; color: #fff; margin-bottom: 10px; }
        .up-title { font-size: 2.7rem; margin: 12px 0; }
        .up-nav { display: flex; align-items: center; gap: 15px; }
        .up-btn { width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; background: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .up-slider { flex: 1; overflow: hidden; }
        .up-track { display: flex; gap: 28px; }
        .up-card { width: 290px; height: 400px; border-radius: 24px; position: relative; overflow: hidden; flex-shrink: 0; transition: 0.3s; text-decoration: none; color: inherit; display: block; }
        .up-card img { width: 100%; height: 100%; object-fit: cover; }
        .up-overlay { position: absolute; bottom: 0; width: 100%; padding: 40px 25px 25px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); color: #fff; }
        .dim { opacity: 0.45; filter: blur(1px); }
        .up-wave { position: absolute; bottom: -1px; width: 100%; line-height: 0; }
        @media(max-width:768px){ .up-inner { display: block; } }
      `}</style>
    </div>
  );
};

export default UpComing;
