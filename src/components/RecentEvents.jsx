import React, { useState } from "react";
import { galleryRecentEvents } from "../datas/data";
import "./RecentEvents.css";
import { Link } from "react-router-dom";

const RecentEvents = () => {
  const [items, setItems] = useState([...galleryRecentEvents]);
  const [displayIndex, setDisplayIndex] = useState(1);

  const handlePrev = () => {
    setItems((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]);
    setDisplayIndex((prev) => (prev === 1 ? galleryRecentEvents.length : prev - 1));
  };

  const handleNext = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
    setDisplayIndex((prev) => (prev === galleryRecentEvents.length ? 1 : prev + 1));
  };

  return (
    <div className="recent-container">
      <div className="recent-inner">
        <div className="recent-text">
          <span className="recent-tag">TIMETABLE 📅</span>
          <h2 className="recent-title">Recent Events</h2>
          <p className="recent-desc">It is a long established fact that a reader will</p>
          <div className="recent-nav">
            <button onClick={handlePrev} className="recent-btn">
              ‹
            </button>
            <span className="recent-count">
              {displayIndex} / {galleryRecentEvents.length}
            </span>
            <button onClick={handleNext} className="recent-btn">
              ›
            </button>
          </div>
        </div>

        <div className="recent-slider">
          <div className="recent-track">
            {items.map((item, index) => (
              /* Bọc Link ở đây để khi bấm vào bất kỳ đâu trên card cũng chuyển trang */
              <Link
                key={index}
                to={`/post/${item.id}`}
                className={`recent-card ${index >= 2 ? "dim" : ""}`}
                style={{ textDecoration: "none" }} // Giữ style mặc định của Link là không gạch chân
              >
                <img src={item.img || item.src} alt={item.title} />
                <div className="recent-overlay">
                  <div className="recent-content">
                    <span>{item.date}</span>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;
