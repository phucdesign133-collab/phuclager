import React from "react";
import "../css/Grid.css";
import { getCurrentDateFormatted } from "./utils/utils";
import { EditIcon, TrashIcon } from "./Icons";

export default function CreditCardGrid({ selectedCard, rawData, onEdit, onDelete }) {
  const currentDate = getCurrentDateFormatted();

  // Tính số ngày còn lại từ dueDate thay vì dùng daysLeft lưu cứng trong DB
  const calculateDaysLeft = (dueDate) => {
    if (!dueDate) return 0;

    const [year, month, day] = dueDate.split("-").map(Number);

    if (!year || !month || !day) return 0;

    const now = new Date();

    const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const dueUTC = Date.UTC(year, month - 1, day);

    return Math.max(0, Math.ceil((dueUTC - todayUTC) / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = calculateDaysLeft(rawData?.dueDate);
  const cardName = rawData?.name || selectedCard;

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(selectedCard, rawData);
    }
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa dữ liệu của thẻ ${cardName} không?`);

    if (confirmDelete && onDelete) {
      onDelete(selectedCard);
    }
  };

  if (!rawData) {
    return (
      <div
        className="grid-no-data"
        style={{
          padding: "20px",
          textAlign: "center",
          background: "#fff",
          borderRadius: "12px",
          marginTop: "10px",
        }}
      >
        Chưa có dữ liệu cho thẻ {cardName}. Bấm "Cập nhật" để thêm mới.
      </div>
    );
  }

  const statement = Number(rawData.statement || 0);
  const installment = Number(rawData.installment || 0);

  return (
    <div className="grid-container">
      <div className="grid-card-box">
        <div
          className="grid-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="grid-date">{currentDate}</span>

          <div className="grid-actions" style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={handleEditClick}
              title="Chỉnh sửa thông tin"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#3182ce",
                fontSize: "14px",
              }}
            >
              <EditIcon />
            </button>

            <button
              type="button"
              onClick={handleDeleteClick}
              title="Xóa dữ liệu thẻ"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#e53e3e",
                fontSize: "14px",
              }}
            >
              <TrashIcon />
            </button>
          </div>
        </div>

        <div className="grid-content-list">
          <div className="info-row">
            <span className="info-label">Hạn mức thẻ:</span>
            <span className="info-value">{Number(rawData.limit || 0).toLocaleString("vi-VN")} đ</span>
          </div>

          <div className="info-row">
            <span className="info-label">Khả dụng thực tế:</span>
            <span className="info-value" style={{ color: "#38a169", fontWeight: "600" }}>
              {Number(rawData.available || 0).toLocaleString("vi-VN")} đ
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Dư nợ:</span>
            <span className="info-value" style={{ color: "#e53e3e", fontWeight: "600" }}>
              {Number(rawData.debt || 0).toLocaleString("vi-VN")} đ
            </span>
          </div>

          {/* Chỉ hiện nhóm sao kê khi có sao kê */}
          {statement > 0 && (
            <>
              <div className="info-row">
                <span className="info-label">Sao kê tháng hiện tại:</span>
                <span className="info-value">{statement.toLocaleString("vi-VN")} đ</span>
              </div>

              <div className="info-row">
                <span className="info-label">Trạng thái sao kê:</span>
                <span className={`info-value ${rawData.statementStatus === "XONG" ? "text-green" : "text-red"}`}>
                  {rawData.statementStatus || "Chưa xong"}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">Phí đáo:</span>
                <span className="info-value">{Number(rawData.fee || 0).toLocaleString("vi-VN")} đ</span>
              </div>

              <div className="info-row">
                <span className="info-label">Số ngày còn lại:</span>
                <span className="info-value text-orange">{daysLeft} ngày</span>
              </div>
            </>
          )}

          <div className="info-row">
            <span className="info-label">Số rút:</span>
            <span className="info-value" style={{ color: "#3182ce", fontWeight: "600" }}>
              {Number(rawData.withdrawal || 0).toLocaleString("vi-VN")} đ
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Phí rút:</span>
            <span className="info-value text-red">{Number(rawData.withdrawalFee || 0).toLocaleString("vi-VN")} đ</span>
          </div>

          {installment > 0 && (
            <div className="info-row">
              <span className="info-label">Trả góp:</span>
              <span className="info-value">{installment.toLocaleString("vi-VN")} đ</span>
            </div>
          )}

          {rawData.note && (
            <div className="info-row note-row">
              <span className="info-label italic">Ghi chú:</span>
              <span className="info-value italic text-gray">{rawData.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
