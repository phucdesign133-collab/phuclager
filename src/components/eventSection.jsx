import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./eventSection.css";
import MenuIconEventSection from "./MenuIconEventSection";

const EventSection = ({ data, category, activeFilter, setActiveFilter, currentSlug }) => {
  // Hàm chuyển đổi ngày chuẩn xác
  const parseDate = (d) => {
    if (!d) return new Date(2000, 0, 1);
    if (d.includes(".")) {
      const [day, month, year] = d.split(".");
      return new Date(year, month - 1, day);
    }
    return new Date(d);
  };

  const sorted = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      return parseDate(b.date || b.contactInfo?.date) - parseDate(a.date || a.contactInfo?.date);
    });
  }, [data]);

  // 2. Logic lọc
  const displayPosts = useMemo(() => {
    if (currentSlug) {
      const currentPost = sorted.find((item) => item.slug === currentSlug);
      if (!currentPost) return [];
      return sorted
        .filter((item) => {
          if (item.slug === currentSlug) return false;
          const currentCats = Array.isArray(currentPost.subCategory) ? currentPost.subCategory : [currentPost.subCategory].filter(Boolean);
          const itemCats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);
          return itemCats.some((cat) => currentCats.includes(cat));
        })
        .sort(() => 0.5 - Math.random());
    } else {
      return sorted.filter((item) => {
        const itemCats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);
        return item.category === category && (activeFilter === "all" || itemCats.includes(activeFilter));
      });
    }
  }, [currentSlug, category, activeFilter, sorted]);

  // 3. Render giao diện
  return (
    <div className="event-section-container">
      {!currentSlug && <MenuIconEventSection category={category} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
      <div className="gallery-grid">
        {displayPosts.map((project) => (
          <Link key={project.slug} to={`/post/${project.slug}`} className="gallery-item">
            <img src={`${import.meta.env.BASE_URL}img/${project?.files?.[0] || "default.jpg"}`} alt={project?.title || "Dự án"} loading="lazy" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventSection;