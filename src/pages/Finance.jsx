// src\pages\Finance.jsx
import React, { useState, useEffect } from "react";
import "../css/Tab.css";
import { supabase } from "../components/utils/supabaseClient";
import DailyIncomeExpenseGrid from "../components/DailyIncomeExpenseGrid";
import DailyIncomeExpensePopup from "../components/popup/DailyIncomeExpensePopup";
import CreditCardIconGrid from "../components/CreditCardIconGrid";
import CreditCardGrid from "../components/CreditCardGrid";
import CreditCardPopup from "../components/popup/CreditCardPopup";
import TotalBalanceGrid from "../components/TotalBalanceGrid";
import TotalBalancePopup from "../components/popup/TotalBalancePopup";
import DebtGrid from "../components/DebtGrid";
import DebtPopup from "../components/popup/DebtPopup";
import ReceivablePayableGrid from "../components/ReceivablePayableGrid";
import ReceivablePayablePopup from "../components/popup/ReceivablePayablePopup";

const MAX_DAILY_RECORDS = 32;

// Lấy ngày hiện tại theo múi giờ Việt Nam.
const getVietnamDateParts = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return {
    day: Number(getPart("day")),
    month: Number(getPart("month")),
    year: Number(getPart("year")),
    hour: Number(getPart("hour")),
    minute: Number(getPart("minute")),
    second: Number(getPart("second")),
  };
};

const getCurrentDateFormatted = () => {
  const { day, month, year } = getVietnamDateParts();
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}/${mm}/${year}`;
};

const getCurrentDayOfWeek = () => {
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
  }).format(new Date());

  const days = {
    Sun: "Chủ Nhật",
    Mon: "Thứ Hai",
    Tue: "Thứ Ba",
    Wed: "Thứ Tư",
    Thu: "Thứ Năm",
    Fri: "Thứ Sáu",
    Sat: "Thứ Bảy",
  };

  return days[date] || "Thứ Hai";
};

// Chuyển dd/mm/yyyy thành timestamp để sắp xếp.
const getDateValue = (dateString) => {
  if (!dateString) return 0;

  const [day, month, year] = String(dateString).split("/").map(Number);

  if (!day || !month || !year) return 0;

  return new Date(year, month - 1, day).getTime();
};

// Giữ tối đa 32 record mới nhất.
const keepLatestRecords = (data) => {
  if (!Array.isArray(data)) return [];

  return [...data]
    .filter((item) => item?.date)
    .sort((a, b) => getDateValue(a.date) - getDateValue(b.date))
    .slice(-MAX_DAILY_RECORDS);
};

export default function Finance({ selectedFilter, isPopupOpen, setIsPopupOpen, addCardTrigger, addReceivablePayableTrigger }) {
  const [activeCreditCard, setActiveCreditCard] = useState(null);
  const [activeReceivablePayable, setActiveReceivablePayable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getCurrentDateFormatted());

  // States lưu dữ liệu
  const [dailyData, setDailyData] = useState([]);
  const [creditCardData, setCreditCardData] = useState({});
  const [totalBalanceData, setTotalBalanceData] = useState([]);

  // Dư nợ - module riêng.
  const [debtData, setDebtData] = useState([]);

  // Tổng công nợ - module riêng.
  const [receivablePayableData, setReceivablePayableData] = useState([]);

  // Hàm lưu dữ liệu lên Supabase.
  const syncToSupabase = async (id, content) => {
    try {
      const { error } = await supabase.from("finance_tables").upsert({ id, content });

      if (error) throw error;
    } catch (err) {
      console.error("Lỗi đồng bộ Supabase:", err);
    }
  };

  // Hàm fetch dữ liệu từ Supabase.
  const fetchFinanceData = async () => {
    try {
      const { data, error } = await supabase.from("finance_tables").select("*");

      if (error) throw error;

      if (data && data.length > 0) {
        const dailyRaw = data.find((item) => item.id === "daily_data")?.content || [];

        const cards = data.find((item) => item.id === "credit_card_data")?.content || {};

        const balancesRaw = data.find((item) => item.id === "total_balance_data")?.content || [];

        const debts = data.find((item) => item.id === "debt_data")?.content || [];

        const receivablePayables = data.find((item) => item.id === "receivable_payable_data")?.content || [];

        const daily = keepLatestRecords(dailyRaw);
        const balances = keepLatestRecords(balancesRaw);

        setDailyData(daily);
        setCreditCardData(cards);
        setTotalBalanceData(balances);
        setDebtData(debts);
        setReceivablePayableData(Array.isArray(receivablePayables) ? receivablePayables : []);

        if (Array.isArray(dailyRaw) && dailyRaw.length !== daily.length) {
          await syncToSupabase("daily_data", daily);
        }

        if (Array.isArray(balancesRaw) && balancesRaw.length !== balances.length) {
          await syncToSupabase("total_balance_data", balances);
        }
      }
    } catch (err) {
      console.error("Lỗi tải dữ liệu Finance:", err);
    }
  };

  useEffect(() => {
    fetchFinanceData();

    const handleRealtimeChange = () => {
      fetchFinanceData();
    };

    window.addEventListener("supabase-data-changed", handleRealtimeChange);

    const channel = supabase
      .channel("public:finance_tables")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "finance_tables",
        },
        () => {
          fetchFinanceData();
        },
      )
      .subscribe();

    return () => {
      window.removeEventListener("supabase-data-changed", handleRealtimeChange);

      supabase.removeChannel(channel);
    };
  }, []);

  // Theo dõi ngày theo giờ Việt Nam.
  useEffect(() => {
    const updateVietnamDate = () => {
      const today = getCurrentDateFormatted();

      setSelectedDate((currentDate) => {
        if (currentDate !== today) {
          return today;
        }

        return currentDate;
      });
    };

    updateVietnamDate();

    const timer = setInterval(updateVietnamDate, 30000);

    return () => clearInterval(timer);
  }, []);

  // Lưu thẻ đang được chọn.
  const handleSaveCreditCard = (newData) => {
    if (!activeCreditCard) return;

    const updatedCards = {
      ...creditCardData,
      [activeCreditCard]: newData,
    };

    setCreditCardData(updatedCards);
    syncToSupabase("credit_card_data", updatedCards);
  };

  // Thêm thẻ mới.
  const handleAddCreditCard = (newData, cardId) => {
    if (!cardId) return;

    const updatedCards = {
      ...creditCardData,
      [cardId]: newData,
    };

    setCreditCardData(updatedCards);
    setActiveCreditCard(cardId);

    syncToSupabase("credit_card_data", updatedCards);
  };

  // Thêm khoản Dư nợ mới.
  // Dư nợ hoàn toàn độc lập với Tổng công nợ.
  const handleAddDebtData = (creditor, newDebtItem) => {
    const updatedDebtData = [newDebtItem, ...debtData];

    setDebtData(updatedDebtData);

    syncToSupabase("debt_data", updatedDebtData);
  };

  // Header Cập nhật → thêm thẻ mới.
  useEffect(() => {
    if (!addCardTrigger) return;
    if (selectedFilter !== "the-tin-dung") return;

    setActiveCreditCard(null);
    setIsPopupOpen(true);
  }, [addCardTrigger, selectedFilter, setIsPopupOpen]);

  // Header Cập nhật → thêm tổng công nợ mới.
  useEffect(() => {
    if (!addReceivablePayableTrigger) return;
    if (selectedFilter !== "tong-cong-no") return;

    setActiveReceivablePayable(null);
    setIsPopupOpen(true);
  }, [addReceivablePayableTrigger, selectedFilter, setIsPopupOpen]);

  // Thêm / sửa Tổng số dư.
  const handleSaveTotalBalance = (newData) => {
    const newSumme = Object.keys(newData.details)
      .filter((key) => key !== "note")
      .reduce((sum, key) => sum + (Number(newData.details[key]) || 0), 0);

    const sortedList = [...totalBalanceData].sort((a, b) => getDateValue(a.date) - getDateValue(b.date));

    const currentIndex = sortedList.findIndex((item) => item.date === newData.date);

    let previousSumme = newSumme;

    if (currentIndex > 0) {
      previousSumme = sortedList[currentIndex - 1].summe;
    } else if (sortedList.length > 0) {
      previousSumme = sortedList[sortedList.length - 1].summe;
    }

    const bilanz = newSumme - previousSumme;

    const updatedRecord = {
      dayOfWeek: getCurrentDayOfWeek(),
      date: newData.date,
      details: newData.details,
      summe: newSumme,
      bilanz,
    };

    let updatedBalances = [];

    const existingIndex = totalBalanceData.findIndex((item) => item.date === newData.date);

    if (existingIndex >= 0) {
      updatedBalances = [...totalBalanceData];
      updatedBalances[existingIndex] = updatedRecord;
    } else {
      updatedBalances = [...totalBalanceData, updatedRecord];
    }

    updatedBalances = keepLatestRecords(updatedBalances);

    setTotalBalanceData(updatedBalances);

    syncToSupabase("total_balance_data", updatedBalances);
  };

  // Thêm / sửa Tổng công nợ.
  // Đây là module riêng với Dư nợ.
  const handleSaveReceivablePayable = (newData) => {
    const currentData = Array.isArray(receivablePayableData) ? receivablePayableData : [];

    let updatedData;

    if (activeReceivablePayable) {
      updatedData = currentData.map((item) => (item === activeReceivablePayable ? newData : item));
    } else {
      updatedData = [newData, ...currentData];
    }

    setReceivablePayableData(updatedData);

    syncToSupabase("receivable_payable_data", updatedData);

    setActiveReceivablePayable(null);
    setIsPopupOpen(false);
  };

  // Xóa Tổng công nợ.
  const handleDeleteReceivablePayable = (item) => {
    const updatedData = (Array.isArray(receivablePayableData) ? receivablePayableData : []).filter((currentItem) => currentItem !== item);

    setReceivablePayableData(updatedData);

    syncToSupabase("receivable_payable_data", updatedData);

    if (activeReceivablePayable === item) {
      setActiveReceivablePayable(null);
    }
  };

  const latestRecord = totalBalanceData.length > 0 ? [...totalBalanceData].sort((a, b) => getDateValue(b.date) - getDateValue(a.date))[0] : null;

  const lastSavedDetails = latestRecord ? latestRecord.details : null;

  return (
    <div className="finance-wrapper">
      {selectedFilter === "thu-chi-moi-ngay" && (
        <>
          <DailyIncomeExpenseGrid rawData={dailyData} onSelectDate={(date) => setSelectedDate(date)} />

          <DailyIncomeExpensePopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={(newData) => {
              const income = Number(newData.income || 0);

              const expense = Number(newData.expense || 0);

              const existingIndex = dailyData.findIndex((item) => item.date === newData.date);

              const sortedDaily = [...dailyData].sort((a, b) => getDateValue(a.date) - getDateValue(b.date));

              let previousBalance = 43375199;

              if (sortedDaily.length > 0) {
                const currentIndex = sortedDaily.findIndex((item) => item.date === newData.date);

                const previousItem = currentIndex > 0 ? sortedDaily[currentIndex - 1] : sortedDaily[sortedDaily.length - 1];

                if (previousItem && previousItem.totalBalance) {
                  previousBalance = Number(String(previousItem.totalBalance).replace(/\./g, "")) || 43375199;
                }
              }

              const newTotalBalance = previousBalance + income - expense;

              const updatedRecord = {
                dayOfWeek: getCurrentDayOfWeek(),
                date: newData.date,
                income: income.toLocaleString("vi-VN"),
                expense: expense.toLocaleString("vi-VN"),
                totalBalance: newTotalBalance.toLocaleString("vi-VN"),
                incomeDetails: newData.incomeDetails,
                expenseDetails: newData.expenseDetails,
              };

              let updatedDaily = [];

              if (existingIndex >= 0) {
                updatedDaily = [...dailyData];

                updatedDaily[existingIndex] = updatedRecord;
              } else {
                updatedDaily = [...dailyData, updatedRecord];
              }

              updatedDaily = keepLatestRecords(updatedDaily);

              setDailyData(updatedDaily);

              syncToSupabase("daily_data", updatedDaily);

              setIsPopupOpen(false);
            }}
            currentDate={selectedDate}
            lastSavedData={dailyData.length > 0 ? [...dailyData].sort((a, b) => getDateValue(b.date) - getDateValue(a.date))[0] : null}
          />
        </>
      )}

      {selectedFilter === "tong-cong-no" && (
        <>
          <ReceivablePayableGrid
            data={receivablePayableData}
            onEdit={(item) => {
              setActiveReceivablePayable(item);

              setIsPopupOpen(true);
            }}
            onDelete={handleDeleteReceivablePayable}
          />

          <ReceivablePayablePopup
            isOpen={isPopupOpen}
            onClose={() => {
              setActiveReceivablePayable(null);

              setIsPopupOpen(false);
            }}
            onSave={handleSaveReceivablePayable}
            currentDate={selectedDate}
            lastSavedData={activeReceivablePayable}
          />
        </>
      )}

      {selectedFilter === "tong-du-no" && (
        <>
          <DebtGrid rawData={debtData} />

          <DebtPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onAddDebt={handleAddDebtData} />
        </>
      )}

      {selectedFilter === "the-tin-dung" && (
        <>
          <CreditCardIconGrid selectedCard={activeCreditCard} onSelectCard={(cardId) => setActiveCreditCard(cardId)} allCardsData={creditCardData} />

          {activeCreditCard && (
            <CreditCardGrid
              selectedCard={activeCreditCard}
              rawData={creditCardData[activeCreditCard] || null}
              onEdit={() => setIsPopupOpen(true)}
              onDelete={(cardId) => {
                const updatedCards = {
                  ...creditCardData,
                };

                delete updatedCards[cardId];

                setCreditCardData(updatedCards);

                setActiveCreditCard(null);

                setIsPopupOpen(false);

                syncToSupabase("credit_card_data", updatedCards);
              }}
            />
          )}

          <CreditCardPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={activeCreditCard ? handleSaveCreditCard : handleAddCreditCard}
            currentDate={selectedDate}
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
            currentDate={selectedDate}
            lastSavedData={lastSavedDetails}
          />
        </>
      )}
    </div>
  );
}
