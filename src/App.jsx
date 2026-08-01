import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";

// Components
import Header, { dropdownData } from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Finance from "./pages/Finance";
// import Goal from "./pages/Goal";
// import Client from "./pages/Client";
// import Social from "./pages/Social";
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

  // Xác định tab hiện tại dựa trên URL
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes("/goal")) return "goal";
    if (path.includes("/client")) return "client";
    if (path.includes("/social")) return "social";
    if (path.includes("/supplies")) return "supplies";
    return "finance";
  };

  const currentTab = getCurrentTab();

  // State lưu giá trị đang chọn trong dropdown, mặc định lấy phần tử đầu tiên của tab hiện tại
  const [selectedValue, setSelectedValue] = useState(() => {
    const options = dropdownData[currentTab] || dropdownData.finance;
    return options[0]?.value || "";
  });

  // State quản lý việc bật/tắt popup chung khi bấm nút Cập nhật trên Header
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Khi chuyển tab lớn ở Footer, tự động reset giá trị dropdown về mục đầu tiên của tab đó
  useEffect(() => {
    const options = dropdownData[currentTab] || dropdownData.finance;
    if (options.length > 0) {
      setSelectedValue(options[0].value);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (window.location.search.includes("fbclid")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("fbclid");
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, []);

  const handleUpdateClick = () => {
    // Kiểm tra logic trước khi mở popup nếu cần (ví dụ Thẻ tín dụng)
    if (currentTab === "finance" && selectedValue === "the-tin-dung") {
      // Có thể xử lý riêng nếu chưa chọn thẻ ở trang Finance
    }
    setIsPopupOpen(true);
  };

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Header cố định trên cùng */}
      <Header 
        currentTab={currentTab} 
        value={selectedValue} 
        onChange={(val) => setSelectedValue(val)}
        onUpdate={handleUpdateClick}
      />
      
      {/* Vùng nội dung chính */}
      <div className="app-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Finance 
                selectedFilter={selectedValue} 
                isPopupOpen={isPopupOpen} 
                setIsPopupOpen={setIsPopupOpen} 
              />
            } 
          />
          <Route 
            path="/finance" 
            element={
              <Finance 
                selectedFilter={selectedValue} 
                isPopupOpen={isPopupOpen} 
                setIsPopupOpen={setIsPopupOpen} 
              />
            } 
          />
          {/* Các route tiếp theo cho tương lai */}
          {/* <Route path="/goal" element={<Goal selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
          {/* <Route path="/client" element={<Client selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
          {/* <Route path="/social" element={<Social selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
          {/* <Route path="/supplies" element={<Supplies selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;