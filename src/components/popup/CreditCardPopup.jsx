import React, { useState, useEffect } from "react";
import "../../css/Popup.css";
import { supabase } from "../utils/supabaseClient";

export default function CreditCardPopup({ isOpen, onClose, onSave, currentDate, selectedCard, lastSavedData }) {
  const formatNumber = (val) => {
    if (val === "" || val === null || val === undefined) return "";
    const num = Number(String(val).replace(/\./g, ""));
    if (isNaN(num)) return val;
    return num.toLocaleString("vi-VN");
  };

  const parseNumber = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/\./g, "")) || 0;
  };

  const [cardName, setCardName] = useState("");
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [available, setAvailable] = useState("");
  const [statement, setStatement] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [installment, setInstallment] = useState("");
  const [note, setNote] = useState("");
  const [statementStatus, setStatementStatus] = useState("CHƯA XONG");
  const [debt, setDebt] = useState(0);
  const [fee, setFee] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const isAddingCard = !selectedCard;

  const getVietnamToday = () => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const year = parts.find((part) => part.type === "year")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;

    return `${year}-${month}-${day}`;
  };

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return 0;

    const today = getVietnamToday();
    const [todayYear, todayMonth, todayDay] = today.split("-").map(Number);
    const [dueYear, dueMonth, dueDay] = dateString.split("-").map(Number);

    if (!todayYear || !todayMonth || !todayDay || !dueYear || !dueMonth || !dueDay) {
      return 0;
    }

    const todayValue = Date.UTC(todayYear, todayMonth - 1, todayDay);
    const dueValue = Date.UTC(dueYear, dueMonth - 1, dueDay);

    return Math.max(0, Math.ceil((dueValue - todayValue) / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    setCardName(lastSavedData?.name || "");
    setLimit("");
    setUsage("");
    setAvailable("");
    setStatement("");
    setDueDate(lastSavedData?.dueDate || "");
    setInstallment("");
    setNote(lastSavedData?.note || "");
  }, [lastSavedData, selectedCard, isOpen]);

  useEffect(() => {
    const activeLimit = parseNumber(limit) > 0 ? parseNumber(limit) : parseNumber(lastSavedData?.limit);
    const activeAvailable = parseNumber(available) > 0 ? parseNumber(available) : parseNumber(lastSavedData?.available);

    const calcDebt = Math.max(0, activeLimit - activeAvailable);
    setDebt(calcDebt);

    const numStatement = statement === "" ? parseNumber(lastSavedData?.statement) : parseNumber(statement);

    if (statement !== "" && parseNumber(statement) === 0) {
      setStatementStatus("XONG");
      setFee(0);
      setDaysLeft(0);
    } else if (numStatement > 0) {
      setStatementStatus("CHƯA XONG");

      const activeDueDate = dueDate || lastSavedData?.dueDate;

      if (activeDueDate) {
        setDaysLeft(calculateDaysLeft(activeDueDate));
      } else {
        setDaysLeft(lastSavedData?.daysLeft || 15);
      }

      setFee(Math.round(numStatement * 0.02));
    } else {
      setStatementStatus("XONG");
      setFee(0);
      setDaysLeft(0);
    }

    const rawWithdrawal = activeAvailable > 0 ? activeAvailable : parseNumber(lastSavedData?.available);
    const roundedThousand = Math.floor(rawWithdrawal / 100000) * 100000;

    setWithdrawal(roundedThousand);

    const calcWithFee = Math.max(Math.round(roundedThousand * 0.018), 50000);
    setWithdrawalFee(roundedThousand > 0 ? calcWithFee : 0);
  }, [limit, available, statement, dueDate, lastSavedData]);

  const handleFormattedChange = (setter) => (e) => {
    const rawVal = e.target.value.replace(/\./g, "");

    if (rawVal === "" || !isNaN(rawVal)) {
      setter(rawVal === "" ? "" : formatNumber(rawVal));
    }
  };

  const createCardId = (name, allCardsData) => {
    const baseId = String(name)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    if (!baseId) return "";

    let cardId = baseId;
    let counter = 2;

    while (allCardsData[cardId]) {
      cardId = `${baseId}_${counter}`;
      counter += 1;
    }

    return cardId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (isAddingCard && !cardName.trim()) {
      window.alert("Vui lòng nhập tên thẻ.");
      return;
    }

    setLoading(true);

    const isStatementCleared = statement !== "" && parseNumber(statement) === 0;
    const savedStatement = isStatementCleared ? 0 : parseNumber(statement) > 0 ? parseNumber(statement) : parseNumber(lastSavedData?.statement);
    const savedDueDate = isStatementCleared ? "" : dueDate || lastSavedData?.dueDate || "";
    const savedStatementStatus = savedStatement > 0 ? "CHƯA XONG" : "XONG";
    const savedFee = savedStatement > 0 ? Math.round(savedStatement * 0.02) : 0;
    const savedDaysLeft = savedStatement > 0 ? calculateDaysLeft(savedDueDate) : 0;

    const dataToSave = {
      ...(isAddingCard ? { name: cardName.trim() } : lastSavedData?.name ? { name: lastSavedData.name } : {}),
      limit: parseNumber(limit) > 0 ? parseNumber(limit) : parseNumber(lastSavedData?.limit),
      usage: parseNumber(usage) > 0 ? parseNumber(usage) : parseNumber(lastSavedData?.usage),
      available: parseNumber(available) > 0 ? parseNumber(available) : parseNumber(lastSavedData?.available),
      statement: savedStatement,
      dueDate: savedDueDate,
      installment: parseNumber(installment) > 0 ? parseNumber(installment) : parseNumber(lastSavedData?.installment),
      note: note !== "" ? note : lastSavedData?.note || "",
      debt,
      fee: savedFee,
      daysLeft: savedDaysLeft,
      withdrawal,
      withdrawalFee,
      statementStatus: savedStatementStatus,
    };

    try {
      const { data: remoteRows } = await supabase.from("app_data").select("*").eq("key", "credit_cards_data").single();

      let allCardsData = remoteRows && remoteRows.value ? remoteRows.value : {};

      let cardId = selectedCard;

      if (isAddingCard) {
        cardId = createCardId(cardName, allCardsData);

        if (!cardId) {
          window.alert("Tên thẻ không hợp lệ.");
          setLoading(false);
          return;
        }
      }

      allCardsData[cardId] = dataToSave;

      await supabase.from("app_data").upsert({
        key: "credit_cards_data",
        value: allCardsData,
      });

      onSave(dataToSave, cardId);
    } catch (err) {
      console.error("Lỗi đồng bộ Supabase thẻ tín dụng:", err);
    } finally {
      setLoading(false);
    }

    onClose();
  };

  const cardNames = {
    techcombank: "Techcombank",
    vib: "VIB",
    tpbank: "TPBank",
    vpbank: "VPBank",
    seasy: "Seasy",
    slater: "Slater",
  };

  const displayCardName = lastSavedData?.name || cardNames[selectedCard] || selectedCard || "Thẻ mới";

  const showDueDate = statement !== "" && parseNumber(statement) > 0;
  const numStatementCurrent = statement === "" ? parseNumber(lastSavedData?.statement) : parseNumber(statement);

  if (!isOpen) return null;

  return (
    <div
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="popup-container">
        <div className="popup-header">
          <h3>
            {isAddingCard ? "Thêm Thẻ Mới" : `Cập nhật Thẻ: ${displayCardName}`} ({currentDate})
          </h3>

          <button type="button" className="popup-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          {isAddingCard && (
            <div className="form-group">
              <label>Tên thẻ:</label>
              <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ví dụ: MB Bank..." autoFocus />
            </div>
          )}

          <div className="form-group">
            <label>Hạn mức thẻ:</label>
            <input
              type="text"
              value={limit}
              onChange={handleFormattedChange(setLimit)}
              placeholder={lastSavedData?.limit ? formatNumber(lastSavedData.limit) : "Nhập hạn mức..."}
            />
          </div>

          <div className="form-group">
            <label>Sử dụng:</label>
            <input
              type="text"
              value={usage}
              onChange={handleFormattedChange(setUsage)}
              placeholder={lastSavedData?.usage ? formatNumber(lastSavedData.usage) : "Nhập số tiền sử dụng..."}
            />
          </div>

          <div className="form-group">
            <label>Khả dụng thực tế:</label>
            <input
              type="text"
              value={available}
              onChange={handleFormattedChange(setAvailable)}
              placeholder={lastSavedData?.available ? formatNumber(lastSavedData.available) : "Nhập số tiền khả dụng..."}
            />
          </div>

          <div className="form-group">
            <label>Sao kê tháng hiện tại:</label>
            <input
              type="text"
              value={statement}
              onChange={handleFormattedChange(setStatement)}
              placeholder={lastSavedData?.statement ? formatNumber(lastSavedData.statement) : "Nhập tiền sao kê..."}
            />
          </div>

          {showDueDate && (
            <div className="form-group">
              <label>Hạn chót thanh toán:</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          )}

          <div className="form-group">
            <label>Trả góp:</label>
            <input
              type="text"
              value={installment}
              onChange={handleFormattedChange(setInstallment)}
              placeholder={lastSavedData?.installment ? formatNumber(lastSavedData.installment) : "Nhập tiền trả góp..."}
            />
          </div>

          <div className="form-group">
            <label>Ghi chú:</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={lastSavedData?.note || "Nhập ghi chú (nếu có)..."}
            />
          </div>

          <div className="form-group">
            <label>Trạng thái sao kê:</label>
            <input
              type="text"
              value={statementStatus}
              readOnly
              style={{
                backgroundColor: "#f1f3f5",
                cursor: "not-allowed",
                fontWeight: "600",
                color: statementStatus === "XONG" ? "#2b8a3e" : "#c92a2a",
              }}
            />
          </div>

          <div className="form-group">
            <label>Dư nợ (= Hạn mức - Khả dụng):</label>
            <input
              type="text"
              value={formatNumber(debt)}
              readOnly
              style={{
                backgroundColor: "#f1f3f5",
                cursor: "not-allowed",
                fontWeight: "600",
                color: "#c92a2a",
              }}
            />
          </div>

          <div className="form-group">
            <label>Phí đáo (2%):</label>
            <input
              type="text"
              value={formatNumber(fee)}
              readOnly
              style={{
                backgroundColor: "#f1f3f5",
                cursor: "not-allowed",
              }}
            />
          </div>

          {numStatementCurrent > 0 && (
            <div className="form-group">
              <label>Số ngày còn lại:</label>
              <input
                type="text"
                value={daysLeft}
                readOnly
                style={{
                  backgroundColor: "#f1f3f5",
                  cursor: "not-allowed",
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label>Số rút (Làm tròn hàng trăm nghìn):</label>
            <input
              type="text"
              value={formatNumber(withdrawal)}
              readOnly
              style={{
                backgroundColor: "#f1f3f5",
                cursor: "not-allowed",
                fontWeight: "600",
                color: "#2b8a3e",
              }}
            />
          </div>

          <div className="form-group">
            <label>Phí rút (1.8%):</label>
            <input
              type="text"
              value={formatNumber(withdrawalFee)}
              readOnly
              style={{
                backgroundColor: "#f1f3f5",
                cursor: "not-allowed",
                fontWeight: "600",
                color: "#c92a2a",
              }}
            />
          </div>

          <button type="submit" className="popup-submit-btn" disabled={loading}>
            {loading ? "Đang đồng bộ..." : isAddingCard ? "Thêm thẻ" : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
}
