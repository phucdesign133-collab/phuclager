import React, { useState, useMemo, useRef } from "react";
import { data } from "../datas/galleryData";
import "./AllProjects.css";
import MenuIconEventSection from "./MenuIconEventSection";

const AllProjects = () => {
  const sectionRef = useRef(null);

  // Map dữ liệu
  const projectsList = useMemo(() => {
    return Object.entries(data.events || {}).map(([key, value]) => ({
      id: key,
      ...value,
    }));
  }, []);

  const tabs = [
    { id: "events", label: "Sự kiện", category: "su-kien" },
    { id: "designs", label: "Thiết kế", category: "thiet-ke" },
    { id: "others", label: "Dự án khác", category: "du-an" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeFilter, setActiveFilter] = useState("all"); // State quan trọng để icon hoạt động
  const [activeCategory, setActiveCategory] = useState("su-kien"); // State này nên cập nhật theo tab
  const activeCategory = tabs.find((t) => t.id === activeTab).category;

  // Filter dữ liệu dựa trên Category (Tab) và Filter (Icon)
  const filteredData = useMemo(() => {
    let filtered = projectsList.filter((p) => p.category === activeCategory);
    if (activeFilter !== "all") {
      filtered = filtered.filter((p) => p.subCategory === activeFilter);
    }
    return filtered;
  }, [activeCategory, activeFilter, projectsList]);

  return (
    <div className="all-projects-section" ref={sectionRef}>
      <h1 className="all-projects-title">Thư viện</h1>

      {/* 1. Thanh Tab ngang */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveFilter("all"); // Reset bộ lọc khi đổi tab
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Menu Icons (Đã fix truyền đủ props) */}
      <div className="menu-icon-wrapper">
        <MenuIconEventSection activeCategory={activeCategory} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      {/* 3. Grid Nội dung */}
      <div className="content-container">
        {filteredData.length > 0 ? (
          <div className="grid-layout">
            {filteredData.map((item) => (
              <div key={item.id} className="project-card">
                <img src={`${import.meta.env.BASE_URL}img/${item.files?.[0] || "default.jpg"}`} alt={item.title} />
                <div className="item-info">
                  <p className="project-name">{item?.title}</p>
                  <p className="project-time">Thời gian: {item?.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Hiện chưa có dự án nào trong mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
