import React, { useState, useEffect } from "react";
import "../css/Tab.css";

// TODO: Import các components và popups tương ứng của tab tại đây
// Ví dụ:
// import SubComponent1 from "../components/SubComponent1";
// import SubPopup1 from "../components/popup/SubPopup1";

// Hàm lấy ngày hiện tại chuẩn định dạng DD/MM/YYYY
const getCurrentDateFormatted = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

// Hàm lấy tên thứ trong tuần hiện tại bằng tiếng Việt
const getCurrentDayOfWeek = () => {
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  return days[new Date().getDay()];
};

export default function TabTemplate({ selectedFilter, isPopupOpen, setIsPopupOpen }) {
  // Trạng thái ngày đang chọn cho popup
  const [selectedDate, setSelectedDate] = useState(getCurrentDateFormatted());

  // --- QUẢN LÝ DỮ LIỆU LOCALSTORAGE CHO TAB ---
  const [tabData, setTabData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_tab_template_data");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_tab_template_data", JSON.stringify(tabData));
  }, [tabData]);

  // Hàm xử lý lưu dữ liệu mẫu
  const handleSaveData = (newData) => {
    // Thêm logic cập nhật state của tab tại đây
    setIsPopupOpen(false);
  };

  return (
    <div className="finance-wrapper">
      {/* Phân tách giao diện dựa trên selectedFilter của từng tab */}
      
      {selectedFilter === "filter-1" && (
        <>
          {/* Đặt Grid component của mục 1 ở đây */}
          {/* Đặt Popup component của mục 1 ở đây */}
        </>
      )}

      {selectedFilter === "filter-2" && (
        <>
          {/* Đặt Grid component của mục 2 ở đây */}
          {/* Đặt Popup component của mục 2 ở đây */}
        </>
      )}
    </div>
  );
}