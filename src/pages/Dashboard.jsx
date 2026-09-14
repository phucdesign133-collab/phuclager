import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Dashboard.css";
import { supabase } from "../components/utils/supabaseClient";

//chỗ này là nợ từ 250M của cô Mai cho & 254M nợ tín dụng
const LOCKED_HISTORY = 504000000;

const INCOME_CATEGORIES = [
  { key: "1. Chạy show", color: "#0ea5e9" }, // Xanh dương sáng (Sky)
  { key: "2. Chạy taxi", color: "#3b82f6" }, // Xanh dương (Blue)
  { key: "3. Việc ngoài", color: "#6366f1" }, // Xanh chàm (Indigo)
  { key: "4. Bonus taxi", color: "#14b8a6" }, // Xanh ngọc (Teal)
  { key: "5. Streak", color: "#06b6d4" }, // Xanh cyan
  { key: "6. Tips", color: "#10b981" }, // Xanh lá ngọc (Emerald)
];

const EXPENSE_CATEGORIES = [
  { key: "1. Ăn uống", color: "#ef4444" }, // Đỏ (Red)
  { key: "2. Đậu sạc", color: "#f97316" }, // Cam đậm (Orange)
  { key: "3. Đậu gửi", color: "#eab308" }, // Vàng (Yellow)
  { key: "4. Rửa", color: "#f43f5e" }, // Hồng đỏ (Rose)
  { key: "5. Phát sinh", color: "#ec4899" }, // Hồng (Pink)
  { key: "6. Nhập hàng", color: "#d97706" }, // Cam hổ phách (Amber)
];

const getDateValue = (dateString) => {
  if (!dateString) return 0;

  const [day, month, year] = String(dateString).split("/").map(Number);

  if (!day || !month || !year) return 0;

  return new Date(year, month - 1, day).getTime();
};

const parseMoney = (value) => {
  if (typeof value === "number") {
    return value;
  }

  return (
    parseFloat(
      String(value || "")
        .replace(/\./g, "")
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, ""),
    ) || 0
  );
};

const formatMoney = (value) => {
  return `${Math.abs(Number(value) || 0).toLocaleString("vi-VN")} VNĐ`;
};

const getVietnamDate = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date());

  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return {
    day: Number(getPart("day")),
    month: Number(getPart("month")),
    year: Number(getPart("year")),
  };
};

const getDateFromString = (dateString) => {
  if (!dateString) return null;

  const [day, month, year] = String(dateString).split("/").map(Number);

  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getDebtAmount = (item) => {
  if (!item || typeof item !== "object") {
    return 0;
  }

  const possibleKeys = ["amount", "debt", "balance", "remaining", "principal", "total", "summe", "soTien", "soTienNo"];

  for (const key of possibleKeys) {
    if (item[key] !== undefined && item[key] !== null) {
      const value = parseMoney(item[key]);

      if (value !== 0) {
        return value;
      }
    }
  }

  if (item.newItem && typeof item.newItem === "object") {
    return getDebtAmount(item.newItem);
  }

  return 0;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [dailyData, setDailyData] = useState([]);
  const [totalBalanceData, setTotalBalanceData] = useState([]);
  const [debtData, setDebtData] = useState([]);

  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);

  const [currentDate, setCurrentDate] = useState(getVietnamDate());

  const fetchDashboardData = async () => {
    try {
      const { data, error } = await supabase.from("finance_tables").select("*");

      if (error) {
        throw error;
      }

      const dailyRaw = data?.find((item) => item.id === "daily_data")?.content || [];

      const balancesRaw = data?.find((item) => item.id === "total_balance_data")?.content || [];

      const debtsRaw = data?.find((item) => item.id === "debt_data")?.content || [];

      setDailyData(Array.isArray(dailyRaw) ? dailyRaw : []);
      setTotalBalanceData(Array.isArray(balancesRaw) ? balancesRaw : []);
      setDebtData(Array.isArray(debtsRaw) ? debtsRaw : []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu Dashboard:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleRealtimeChange = () => {
      fetchDashboardData();
    };

    window.addEventListener("supabase-data-changed", handleRealtimeChange);

    const channel = supabase
      .channel("dashboard-finance-data")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "finance_tables",
        },
        () => {
          fetchDashboardData();
        },
      )
      .subscribe();

    return () => {
      window.removeEventListener("supabase-data-changed", handleRealtimeChange);

      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(getVietnamDate());
    };

    updateDate();

    const timer = setInterval(updateDate, 30000);

    return () => clearInterval(timer);
  }, []);

  const { day: currentDay, month: currentMonth, year: currentYear } = currentDate;

  const currentMonthData = dailyData.filter((item) => {
    const date = getDateFromString(item.date);

    if (!date) return false;

    return date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth;
  });

  const getMonthlyTotal = (data, type) => {
    return data.reduce((total, item) => {
      const details = type === "income" ? item.incomeDetails || {} : item.expenseDetails || {};

      return (
        total +
        Object.entries(details).reduce((sum, [key, value]) => {
          if (key === "Ghi chú" || key === "note") {
            return sum;
          }

          return sum + parseMoney(value);
        }, 0)
      );
    }, 0);
  };

  const getCategoryTotals = (data, categories, type) => {
    return categories
      .map((category) => {
        const total = data.reduce((sum, item) => {
          const details = type === "income" ? item.incomeDetails || {} : item.expenseDetails || {};

          return sum + parseMoney(details[category.key]);
        }, 0);

        return {
          ...category,
          total,
        };
      })
      .filter((item) => item.total !== 0);
  };

  const incomeTotal = getMonthlyTotal(currentMonthData, "income");
  const expenseTotal = getMonthlyTotal(currentMonthData, "expense");

  const monthlySummary = incomeTotal - expenseTotal;

  const incomeDetails = getCategoryTotals(currentMonthData, INCOME_CATEGORIES, "income");

  const expenseDetails = getCategoryTotals(currentMonthData, EXPENSE_CATEGORIES, "expense");

  const latestBalanceRecord =
    totalBalanceData.length > 0 ? [...totalBalanceData].sort((a, b) => getDateValue(b.date) - getDateValue(a.date))[0] : null;

  const totalBalance = latestBalanceRecord ? parseMoney(latestBalanceRecord.summe) : 0;

  const totalDebt = debtData.reduce((sum, item) => sum + getDebtAmount(item), 0);

  const remainingAmount = totalBalance - (totalDebt + LOCKED_HISTORY);

  const breakEvenMonths = monthlySummary !== 0 ? Math.ceil(Math.abs(remainingAmount / monthlySummary)) : 0;

  const renderSegments = (details, total) => {
    if (!total || details.length === 0) {
      return <div className="dashboard-progress-segment-empty" />;
    }

    return details.map((item) => {
      const width = (item.total / total) * 100;

      return (
        <div
          key={item.key}
          className="dashboard-progress-segment"
          style={{
            width: `${width}%`,
            backgroundColor: item.color,
          }}
        />
      );
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <button type="button" className="dashboard-header-side dashboard-back-btn" onClick={() => navigate("/more")}>
          ←
        </button>

        <div className="dashboard-header-title">Dashboard</div>

        <div className="dashboard-header-side" />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-break-even-block">
          <div className="dashboard-break-even-title">HÒA VỐN</div>

          <div className="dashboard-break-even-row">
            <span>Số tiền còn lại</span>

            <span className={remainingAmount < 0 ? "dashboard-break-even-negative" : "dashboard-break-even-positive"}>
              {remainingAmount < 0 ? "-" : "+"}
              {formatMoney(remainingAmount)}
            </span>
          </div>

          <div className="dashboard-break-even-row">
            <span>Thời gian còn lại (dự kiến):</span>

            <span>{breakEvenMonths.toLocaleString("vi-VN")} tháng</span>
          </div>
        </div>

        <div className="dashboard-month-block">
          <div className="dashboard-month-title">
            THÁNG {String(currentMonth).padStart(2, "0")}/{currentYear}
          </div>

          <div className="dashboard-progress-block">
            <button type="button" className="dashboard-progress-button" onClick={() => setOpenIncome((prev) => !prev)}>
              <div className="dashboard-progress-label-row">
                <span>THU NHẬP</span>

                <span>+{formatMoney(incomeTotal)}</span>

                <span>
                  {currentDay}/{getDaysInMonth(currentYear, currentMonth)}
                </span>
              </div>

              <div className="dashboard-progress-bar">{renderSegments(incomeDetails, incomeTotal)}</div>
            </button>

            {openIncome && (
              <div className="dashboard-detail-list income-list">
                {incomeDetails.length === 0 ? (
                  <div className="dashboard-empty-detail">Chưa có dữ liệu.</div>
                ) : (
                  incomeDetails.map((item) => (
                    <div key={item.key} className="dashboard-detail-row">
                      <span>
                        <span
                          className="dashboard-detail-dot"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        {item.key}
                      </span>

                      <span>+{formatMoney(item.total)}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="dashboard-progress-block">
            <button type="button" className="dashboard-progress-button" onClick={() => setOpenExpense((prev) => !prev)}>
              <div className="dashboard-progress-label-row">
                <span>CHI PHÍ</span>

                <span>-{formatMoney(expenseTotal)}</span>

                <span>
                  {currentDay}/{getDaysInMonth(currentYear, currentMonth)}
                </span>
              </div>

              <div className="dashboard-progress-bar">{renderSegments(expenseDetails, expenseTotal)}</div>
            </button>

            {openExpense && (
              <div className="dashboard-detail-list expense-list">
                {expenseDetails.length === 0 ? (
                  <div className="dashboard-empty-detail">Chưa có dữ liệu.</div>
                ) : (
                  expenseDetails.map((item) => (
                    <div key={item.key} className="dashboard-detail-row">
                      <span>
                        <span
                          className="dashboard-detail-dot"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        {item.key}
                      </span>

                      <span>-{formatMoney(item.total)}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="dashboard-summary-row">
            <span>Tổng kết</span>

            <span className={monthlySummary < 0 ? "dashboard-summary-negative" : "dashboard-summary-positive"}>
              {monthlySummary >= 0 ? "+" : "-"}
              {formatMoney(monthlySummary)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
