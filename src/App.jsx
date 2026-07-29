import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Finance from "./pages/Finance";

// Component con giúp tự động cuộn lên đầu
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    // Xử lý xóa rác fbclid nếu có
    if (window.location.search.includes("fbclid")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("fbclid");
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Chỉ giữ lại trang Finance làm trọng tâm */}
        <Route path="/" element={<Finance />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;