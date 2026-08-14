import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { dropdownData } from "./datas/dropdownData";
import { supabase } from "./components/utils/supabaseClient"; // Đảm bảo đường dẫn import đúng file supabaseClient của anh
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Finance from "./pages/Finance";
import Goal from "./pages/Goal";
// import Client from "./pages/Client";
import Social from "./pages/Social";
// import Supplies from "./pages/Supplies";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes("/goal")) return "goal";
    if (path.includes("/client")) return "client";
    if (path.includes("/social")) return "social";
    if (path.includes("/supplies")) return "supplies";
    return "finance";
  };

  const currentTab = getCurrentTab();

  const [selectedValue, setSelectedValue] = useState(() => {
    const options = dropdownData[currentTab] || dropdownData.finance;
    return options[0]?.value || "";
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State lưu tên series đang mở trong tab Social để ẩn Header khi vào SocialList
  const [activeSocialSeries, setActiveSocialSeries] = useState(null);

  // --- THÊM ĐOẠN LẮNG NGHE REALTIME CHO TOÀN BỘ APP ---
  useEffect(() => {
    // Tạo channel lắng nghe thay đổi trên toàn bộ schema public (hoặc theo table cụ thể của anh)
    const channel = supabase
      .channel('global-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Lắng nghe mọi sự kiện: INSERT, UPDATE, DELETE
          schema: 'public',
        },
        (payload) => {
          console.log('Phát hiện thay đổi dữ liệu từ thiết bị khác:', payload);
          
          // Phát ra một Custom Event để các trang con tự động gọi lại hàm fetch dữ liệu
          window.dispatchEvent(new CustomEvent('supabase-data-changed', { detail: payload }));
        }
      )
      .subscribe();

    // Dọn dẹp channel khi unmount app
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  // ----------------------------------------------------

  // Reset activeSocialSeries mỗi khi đổi tab hoặc đổi URL
  useEffect(() => {
    setActiveSocialSeries(null);
  }, [location.pathname]);

  useEffect(() => {
    const options = dropdownData[currentTab] || dropdownData.finance;
    if (options.length > 0) {
      setSelectedValue(options[0].value);
    }
    setSearchTerm("");
  }, [location.pathname]);

  useEffect(() => {
    if (window.location.search.includes("fbclid")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("fbclid");
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, []);

  const handleUpdateClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="app-container">
      <ScrollToTop />

      {!(currentTab === "social" && activeSocialSeries) && (
        <Header
          currentTab={currentTab}
          value={selectedValue}
          onChange={setSelectedValue}
          onUpdate={handleUpdateClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Finance selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path="/finance" element={<Finance selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path="/goal" element={<Goal selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          {/* <Route path="/client" element={<Client selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
          <Route path="/social" element={<Social selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} onActiveSeriesChange={setActiveSocialSeries} />} />
          {/* <Route path="/supplies" element={<Supplies selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;