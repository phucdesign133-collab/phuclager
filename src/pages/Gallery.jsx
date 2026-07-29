import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../components/Gallery.css";
import BackToTop from "../components/BackToTop";
import BackgroundText from "../components/backgroundText";
import Breadcrumb from "../components/Breadcrumb";
import EventSection from "../components/eventSection";
import { data as rawData } from "../datas/galleryData";

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter");
  const navigate = useNavigate();

  const tabConfigs = useMemo(
    () => [
      { id: "events", label: "EVENTS", category: "su-kien" },
      { id: "designs", label: "DESIGNS", category: "thiet-ke" },
      { id: "pricing", label: "PRICING", category: "bang-gia" },
    ],
    [],
  );

  const sortedGalleryData = useMemo(() => {
    const allItems = [...Object.values(rawData.events || {}), ...Object.values(rawData.designs || {}), ...Object.values(rawData.pricing || {})];

    return allItems.sort((a, b) => {
      const timeA = a.time || a.date || a.contactInfo?.date || "2000-01-01";
      const timeB = b.time || b.date || b.contactInfo?.date || "2000-01-01";
      return new Date(timeB) - new Date(timeA);
    });
  }, []);

  const findTabByFilter = (filter) => {
    if (!filter) return null;
    return tabConfigs.find((tab) =>
      sortedGalleryData.some((item) => {
        const subCats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);
        return item.category === tab.category && subCats.includes(filter);
      }),
    );
  };

  const [activeTabId, setActiveTabId] = useState(() => findTabByFilter(filterFromUrl)?.id || "events");
  const [activeFilter, setActiveFilter] = useState(() => filterFromUrl || "all");
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    if (filterFromUrl) {
      const foundTab = findTabByFilter(filterFromUrl);
      if (foundTab) setActiveTabId(foundTab.id);
      setActiveFilter(filterFromUrl);
    }
  }, [filterFromUrl, tabConfigs, sortedGalleryData]);

  return (
    <div className="all-post-main-layout">
      <BackgroundText category={tabConfigs.find(t => t.id === activeTabId)?.category}/>
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "All Post", link: "/gallery" },
        ]}
      />

      <div className="tabs-container-row">
        {tabConfigs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-header ${activeTabId === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTabId(tab.id);
              setActiveFilter("all");
              navigate("/gallery", { state: { category: tab.category }, replace: true });
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gallery-Gallery-container" ref={tabsContainerRef}>
        <EventSection
          data={sortedGalleryData}
          category={tabConfigs.find((t) => t.id === activeTabId)?.category || "su-kien"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
      <BackToTop />
    </div>
  );
};

export default Gallery;