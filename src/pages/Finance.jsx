import React, { useState, useEffect } from "react";
import "../css/Finance.css";
import { dropdownData } from "../datas/dropdown";

// Components
import CommonDropdown from "../components/CommonDropdown";
import DailyIncomeExpenseGrid from "../components/DailyIncomeExpenseGrid";
import DailyIncomeExpensePopup from "../components/popup/DailyIncomeExpensePopup";

// Thẻ tín dụng
import CreditCardIconGrid from "../components/CreditCardIconGrid";
import CreditCardGrid from "../components/CreditCardGrid";
import CreditCardPopup from "../components/popup/CreditCardPopup";

// Tổng số dư
import TotalBalanceGrid from "../components/TotalBalanceGrid";
import TotalBalancePopup from "../components/popup/TotalBalancePopup";

// Nợ xã hội (Schulden-Monitoring)
import DebtGrid from "../components/DebtGrid";
import DebtPopup from "../components/popup/DebtPopup";

export default function Finance() {
  const [selectedFilter, setSelectedFilter] = useState("thu-chi-moi-ngay");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Trạng thái lưu thẻ tín dụng đang được active
  const [activeCreditCard, setActiveCreditCard] = useState(null);

  // --- DỮ LIỆU TAB 1 ---
  const [dailyData, setDailyData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_daily_data");
    return saved ? JSON.parse(saved) : [{ dayOfWeek: "Thứ Năm", date: "30/07/2026", income: "0", expense: "0", totalBalance: "43.375.199" }];
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_daily_data", JSON.stringify(dailyData));
  }, [dailyData]);

  // --- DỮ LIỆU TAB 3: Thẻ tín dụng ---
  const [creditCardData, setCreditCardData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_credit_card_data");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_credit_card_data", JSON.stringify(creditCardData));
  }, [creditCardData]);

  const handleSaveCreditCard = (newData) => {
    if (!activeCreditCard) return;
    setCreditCardData((prev) => ({
      ...prev,
      [activeCreditCard]: newData,
    }));
  };

  // --- DỮ LIỆU TAB 4: Tổng số dư ---
  const [totalBalanceData, setTotalBalanceData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_total_balance_data");
    return saved
      ? JSON.parse(saved)
      : [
          {
            dayOfWeek: "Thứ Năm",
            date: "30/07/2026",
            summe: 43375199,
            bilanz: 0,
            details: {
              techKonto: 37225655,
              vibKonto: 150000,
              tpKonto: 479,
              vpKonto: 0,
              grabKonto: 330783,
              kassenfrisch: 3736000,
              dasBargeld: 1771000,
              eWallet: 124007,
            },
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_total_balance_data", JSON.stringify(totalBalanceData));
  }, [totalBalanceData]);

  const handleSaveTotalBalance = (newData) => {
    const newSumme = Object.keys(newData.details)
      .filter((key) => key !== "note")
      .reduce((sum, key) => sum + (Number(newData.details[key]) || 0), 0);

    const sortedList = [...totalBalanceData].sort((a, b) => {
      const [d1, m1, y1] = a.date.split("/").map(Number);
      const [d2, m2, y2] = b.date.split("/").map(Number);
      return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
    });

    const currentIndex = sortedList.findIndex((item) => item.date === newData.date);
    let previousSumme = newSumme;
    if (currentIndex > 0) {
      previousSumme = sortedList[currentIndex - 1].summe;
    } else if (sortedList.length > 0) {
      previousSumme = sortedList[sortedList.length - 1].summe;
    }

    const bilanz = newSumme - previousSumme;
    const updatedRecord = {
      dayOfWeek: "Thứ Năm",
      date: newData.date,
      details: newData.details,
      summe: newSumme,
      bilanz: bilanz,
    };

    setTotalBalanceData((prev) => {
      const existingIndex = prev.findIndex((item) => item.date === newData.date);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedRecord;
        return updated;
      } else {
        return [...prev, updatedRecord];
      }
    });
  };

  const latestRecord = totalBalanceData[totalBalanceData.length - 1];
  const lastSavedDetails = latestRecord ? latestRecord.details : null;

  // --- DỮ LIỆU TAB TỔNG DƯ NỢ (Schulden-Monitoring) ---
  const [debtData, setDebtData] = useState(() => {
    const saved = localStorage.getItem("phuc_lager_social_debt_data");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("phuc_lager_social_debt_data", JSON.stringify(debtData));
  }, [debtData]);

  // Hàm nhận dữ liệu từ DebtPopup khi bấm Cập nhật
  const handleAddDebtData = (creditor, newItem) => {
    const itemToSave = {
      ...newItem,
      creditor: creditor,
    };
    setDebtData((prev) => [itemToSave, ...(Array.isArray(prev) ? prev : [])]);
    setIsPopupOpen(false);
  };

  return (
    <div className="finance-wrapper">
      <h2>💰 Quản lý Tài chính</h2>

      <CommonDropdown
        options={dropdownData.finance}
        value={selectedFilter}
        onChange={(val) => {
          setSelectedFilter(val);
          if (val !== "the-tin-dung") setActiveCreditCard(null);
        }}
        onUpdate={() => {
          if (selectedFilter === "the-tin-dung" && !activeCreditCard) {
            alert("Vui lòng chọn một thẻ tín dụng trước khi cập nhật!");
            return;
          }
          setIsPopupOpen(true);
        }}
      />

      {selectedFilter === "thu-chi-moi-ngay" && (
        <>
          <DailyIncomeExpenseGrid rawData={dailyData} />
          <DailyIncomeExpensePopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={(newData) => {
              setDailyData((prev) => {
                const income = Number(newData.income || 0);
                const expense = Number(newData.expense || 0);

                const existingIndex = prev.findIndex((item) => item.date === newData.date);

                let previousBalance = 43375199;
                if (prev.length > 0) {
                  const lastItem = prev[existingIndex > 0 ? existingIndex - 1 : prev.length - 1];
                  if (lastItem && lastItem.totalBalance) {
                    previousBalance = Number(String(lastItem.totalBalance).replace(/\./g, "")) || 43375199;
                  }
                }

                const newTotalBalance = previousBalance + income - expense;

                const updatedRecord = {
                  dayOfWeek: "Thứ Năm",
                  date: newData.date,
                  income: income.toLocaleString("vi-VN"),
                  expense: expense.toLocaleString("vi-VN"),
                  totalBalance: newTotalBalance.toLocaleString("vi-VN"),
                  incomeDetails: newData.incomeDetails,
                  expenseDetails: newData.expenseDetails,
                };

                if (existingIndex >= 0) {
                  const updated = [...prev];
                  updated[existingIndex] = updatedRecord;
                  return updated;
                } else {
                  return [...prev, updatedRecord];
                }
              });
              setIsPopupOpen(false);
            }}
            currentDate="30/07/2026"
            lastSavedData={dailyData[dailyData.length - 1] || null}
          />
        </>
      )}

      {selectedFilter === "tong-du-no" && (
        <>
          <DebtGrid rawData={debtData} />
          <DebtPopup 
            isOpen={isPopupOpen} 
            onClose={() => setIsPopupOpen(false)} 
            onAddDebt={handleAddDebtData}
          />
        </>
      )}

      {selectedFilter === "the-tin-dung" && (
        <>
          <CreditCardIconGrid selectedCard={activeCreditCard} onSelectCard={(cardId) => setActiveCreditCard(cardId)} allCardsData={creditCardData} />

          {activeCreditCard && <CreditCardGrid selectedCard={activeCreditCard} rawData={creditCardData[activeCreditCard] || null} />}

          <CreditCardPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={handleSaveCreditCard}
            currentDate="30/07/2026"
            selectedCard={activeCreditCard}
            lastSavedData={activeCreditCard ? creditCardData[activeCreditCard] : null}
          />
        </>
      )}

      {selectedFilter === "tong-so-du" && (
        <>
          <TotalBalanceGrid rawData={totalBalanceData} />
          <TotalBalancePopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={handleSaveTotalBalance}
            currentDate="30/07/2026"
            lastSavedData={lastSavedDetails}
          />
        </>
      )}
    </div>
  );
}