import React, { useState, useEffect } from "react";
import "../css/Tab.css";

import GoalShort from "../components/GoalShort";
import GoalLong from "../components/GoalLong";
import GoalPopup from "../components/popup/GoalPopup";

const getCurrentDateFormatted = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export default function Goal({ selectedFilter, isPopupOpen, setIsPopupOpen }) {
  const [selectedDate, setSelectedDate] = useState(getCurrentDateFormatted());
  const [editingGoal, setEditingGoal] = useState(null); // Lưu thông tin mục tiêu đang chỉnh sửa
  const [editingIndex, setEditingIndex] = useState(null); // Lưu vị trí index đang sửa

  const [goalData, setGoalData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_goal_data");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_goal_data", JSON.stringify(goalData));
  }, [goalData]);

  // Hàm xử lý khi lưu (Thêm mới hoặc Cập nhật)
  const handleSaveGoal = (newData) => {
    if (editingIndex !== null) {
      // Đang sửa mục tiêu cũ
      setGoalData((prev) => {
        const updated = [...prev];
        updated[editingIndex] = newData;
        return updated;
      });
    } else {
      // Thêm mới mục tiêu
      setGoalData((prev) => [newData, ...prev]);
    }
    // Reset trạng thái edit
    setEditingGoal(null);
    setEditingIndex(null);
    setIsPopupOpen(false);
  };

  // Hàm mở popup chỉnh sửa
  const handleEdit = (item, index) => {
    setEditingGoal(item);
    setEditingIndex(index);
    setIsPopupOpen(true);
  };

  // Hàm xóa mục tiêu có xác nhận
  const handleDelete = (indexToDelete, listTypeData, originalGoalData) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục tiêu này không?")) {
      // Tìm item thực tế trong mảng gốc goalData để xóa chuẩn xác
      const itemToDelete = listTypeData[indexToDelete];
      setGoalData((prev) => prev.filter((item) => item !== itemToDelete));
    }
  };

  // Lọc chống trùng lặp dữ liệu
  const uniqueGoalData = goalData.filter((item, index, self) =>
    index === self.findIndex((t) => t.goalName === item.goalName && t.startDate === item.startDate)
  );

  const shortTermData = uniqueGoalData.filter((item) => item.totalDays <= 365);
  const longTermData = uniqueGoalData.filter((item) => item.totalDays > 365);

  return (
    <div className="finance-wrapper">
      {(selectedFilter === "muc-tieu-ngan-han" || !selectedFilter) && (
        <GoalShort 
          rawData={shortTermData} 
          onEdit={(item, idx) => {
            // Tìm đúng index gốc từ mảng unique hoặc goalData
            const originalIdx = goalData.findIndex(g => g.goalName === item.goalName && g.startDate === item.startDate);
            handleEdit(item, originalIdx !== -1 ? originalIdx : idx);
          }}
          onDelete={(idx) => handleDelete(idx, shortTermData, goalData)}
        />
      )}

      {selectedFilter === "muc-tieu-dai-han" && (
        <GoalLong 
          rawData={longTermData} 
          onEdit={(item, idx) => {
            const originalIdx = goalData.findIndex(g => g.goalName === item.goalName && g.startDate === item.startDate);
            handleEdit(item, originalIdx !== -1 ? originalIdx : idx);
          }}
          onDelete={(idx) => handleDelete(idx, longTermData, goalData)}
        />
      )}

      <GoalPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setEditingGoal(null);
          setEditingIndex(null);
          setIsPopupOpen(false);
        }}
        onSave={handleSaveGoal}
        currentDate={selectedDate}
        editingGoal={editingGoal}
      />
    </div>
  );
}