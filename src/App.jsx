// src\App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { dropdownData } from "./datas/dropdownData";
import { supabase } from "./components/utils/supabaseClient";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalculatorLogin from "./components/CalculatorLogin";
import MoreHubIcon from "./components/MoreHubIcon";
import InventoryGroup from "./components/InventoryGroup";

// Pages
import Finance from "./pages/Finance";
import Goal from "./pages/Goal";
import Dashboard from "./pages/Dashboard";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCurrentTab = () => {
    const path = location.pathname;

    if (path.includes("/goal")) return "goal";

    return "finance";
  };

  const currentTab = getCurrentTab();
  const isMorePage = location.pathname === "/more";
  const isMoreChildPage = location.pathname.startsWith("/more/") && location.pathname !== "/more";

  const [selectedValue, setSelectedValue] = useState(() => {
    const options = dropdownData[currentTab] || dropdownData.finance;
    return options[0]?.value || "";
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addCardTrigger, setAddCardTrigger] = useState(0);
  const [addReceivablePayableTrigger, setAddReceivablePayableTrigger] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel("global-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          console.log("Phát hiện thay đổi dữ liệu từ thiết bị khác:", payload);

          window.dispatchEvent(
            new CustomEvent("supabase-data-changed", {
              detail: payload,
            }),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
    if (currentTab === "finance" && selectedValue === "the-tin-dung") {
      setAddCardTrigger((prev) => prev + 1);
      return;
    }

    if (currentTab === "finance" && (selectedValue === "tong-cong-no" || selectedValue === "tong-du-no")) {
      setAddReceivablePayableTrigger((prev) => prev + 1);
      return;
    }

    setIsPopupOpen(true);
  };

  if (!isAuthenticated) {
    return <CalculatorLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      <ScrollToTop />

      {!isMorePage && !isMoreChildPage && (
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
          <Route path="/" element={<Navigate to="/finance" replace />} />

          <Route
            path="/finance"
            element={
              <Finance
                selectedFilter={selectedValue}
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
                addCardTrigger={addCardTrigger}
                addReceivablePayableTrigger={addReceivablePayableTrigger}
              />
            }
          />

          <Route path="/goal" element={<Goal selectedFilter={selectedValue} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />

          <Route path="/more" element={<MoreHubIcon />} />

          <Route path="/more/dashboard" element={<Dashboard />} />

          <Route path="/more/:groupSlug" element={<InventoryGroup />} />
        </Routes>
      </div>

      {!isMoreChildPage && <Footer />}
    </div>
  );
}

export default App;
