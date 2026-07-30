import React from 'react';
import "../css/CreditCardGrid.css";

export default function CreditCardGrid({ selectedCard, rawData }) {
  const currentDate = "30/07/2026";
  
  const cardNames = {
    techcombank: 'Techcombank',
    vib: 'VIB',
    tpbank: 'TPBank',
    vpbank: 'VPBank',
    seasy: 'Seasy',
    slater: 'Slater'
  };

  if (!rawData) {
    return (
      <div className="grid-no-data" style={{ padding: '20px', textAlign: 'center', background: '#fff', borderRadius: '12px', marginTop: '10px' }}>
        Chưa có dữ liệu cho thẻ {cardNames[selectedCard] || selectedCard}. Bấm "Cập nhật" để thêm mới.
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="grid-card-box">
        <div className="grid-header">
          <span className="grid-date">{currentDate}</span>
        </div>

        <div className="grid-content-list">
          <div className="info-row">
            <span className="info-label">Hạn mức thẻ:</span>
            <span className="info-value">{Number(rawData.limit || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          <div className="info-row">
            <span className="info-label">Khả dụng thực tế:</span>
            <span className="info-value text-blue">{Number(rawData.available || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          <div className="info-row">
            <span className="info-label">Dư nợ:</span>
            <span className="info-value text-red">{Number(rawData.debt || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          <div className="info-row">
            <span className="info-label">Sao kê tháng hiện tại:</span>
            <span className="info-value">{Number(rawData.statement || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          <div className="info-row">
            <span className="info-label">Trạng thái sao kê:</span>
            <span className={`info-value ${rawData.statementStatus === "XONG" ? "text-green" : "text-red"}`}>
              {rawData.statementStatus || "Chưa xong"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Phí đáo:</span>
            <span className="info-value">{Number(rawData.fee || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          {rawData.statement > 0 && (
            <div className="info-row">
              <span className="info-label">Số ngày còn lại:</span>
              <span className="info-value text-orange">{rawData.daysLeft} ngày</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-label">Số rút:</span>
            <span className="info-value">{Number(rawData.withdrawal || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phí rút:</span>
            <span className="info-value text-red">{Number(rawData.withdrawalFee || 0).toLocaleString('vi-VN')} đ</span>
          </div>
          {rawData.installment > 0 && (
            <div className="info-row">
              <span className="info-label">Trả góp:</span>
              <span className="info-value">{Number(rawData.installment).toLocaleString('vi-VN')} đ</span>
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