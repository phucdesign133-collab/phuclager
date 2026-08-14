import React, { useState, useEffect } from "react";
import "../css/Tab.css";
import { supabase } from "../components/utils/supabaseClient";
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
  const [selectedDate] = useState(getCurrentDateFormatted());
  const [editingGoal, setEditingGoal] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [goalData, setGoalData] = useState([]);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase.from('goal_tables').select('*').eq('id', 'goals_main').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setGoalData(data.content || []);
    } catch (err) {
      console.error("Lỗi tải Goals:", err);
    }
  };

  const syncGoals = async (updatedList) => {
    try {
      await supabase.from('goal_tables').upsert({ id: 'goals_main', content: updatedList });
    } catch (err) {
      console.error("Lỗi đồng bộ Goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
    const handleRealtimeChange = () => fetchGoals();
    window.addEventListener('supabase-data-changed', handleRealtimeChange);
    return () => window.removeEventListener('supabase-data-changed', handleRealtimeChange);
  }, []);

  const handleSaveGoal = (newData) => {
    let updatedList = [];
    if (editingIndex !== null) {
      updatedList = [...goalData];
      updatedList[editingIndex] = newData;
    } else {
      updatedList = [newData, ...goalData];
    }
    setGoalData(updatedList);
    syncGoals(updatedList);

    setEditingGoal(null);
    setEditingIndex(null);
    setIsPopupOpen(false);
  };

  const handleEdit = (item, index) => {
    setEditingGoal(item);
    setEditingIndex(index);
    setIsPopupOpen(true);
  };

  const handleDelete = (indexToDelete, listTypeData) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kế hoạch này không?")) {
      const itemToDelete = listTypeData[indexToDelete];
      const updatedList = goalData.filter((item) => item !== itemToDelete);
      setGoalData(updatedList);
      syncGoals(updatedList);
    }
  };

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
            const originalIdx = goalData.findIndex(g => g.goalName === item.goalName && g.startDate === item.startDate);
            handleEdit(item, originalIdx !== -1 ? originalIdx : idx);
          }}
          onDelete={(idx) => handleDelete(idx, shortTermData)}
        />
      )}

      {selectedFilter === "muc-tieu-dai-han" && (
        <GoalLong 
          rawData={longTermData} 
          onEdit={(item, idx) => {
            const originalIdx = goalData.findIndex(g => g.goalName === item.goalName && g.startDate === item.startDate);
            handleEdit(item, originalIdx !== -1 ? originalIdx : idx);
          }}
          onDelete={(idx) => handleDelete(idx, longTermData)}
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