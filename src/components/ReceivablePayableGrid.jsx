import React, { useRef, useState } from "react";
import "../css/ReceivablePayableGrid.css";

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("vi-VN");
};

const getRemaining = (item) => {
  if (item.remaining !== undefined && item.remaining !== null) {
    return Number(item.remaining) || 0;
  }

  return Math.max(0, Number(item.amount || 0) - Number(item.paid || 0));
};

const formatAmount = (value) => {
  return `${formatNumber(value)}`;
};

function SwipeCard({ item, onEdit, onDelete, children }) {
  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const [offset, setOffset] = useState(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;

    const delta = currentX.current - startX.current;

    setOffset(delta);
  };

  const handleTouchEnd = () => {
    const width = cardRef.current?.offsetWidth || 1;

    const delta = currentX.current - startX.current;

    if (Math.abs(delta) > width * 0.85) {
      if (delta > 0) {
        onEdit(item);
      } else {
        onDelete(item);
      }
    }

    setOffset(0);
  };

  return (
    <div
      ref={cardRef}
      className="receivable-payable-swipe-card"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default function ReceivablePayableGrid({ data = [], onEdit, onDelete }) {
  const [showReceivable, setShowReceivable] = useState(true);

  const [showPayable, setShowPayable] = useState(true);

  const receivables = data.filter((item) => (item.type || "receivable") === "receivable");

  const payables = data.filter((item) => item.type === "payable");

  const summary = {
    receivable: receivables.reduce((sum, item) => sum + getRemaining(item), 0),
    payable: payables.reduce((sum, item) => sum + getRemaining(item), 0),
  };

  const renderSection = (title, items, isOpen, setIsOpen) => {
    return (
      <section className="receivable-payable-section">
        <button type="button" className="receivable-payable-section-title" onClick={() => setIsOpen((prev) => !prev)}>
          <span>{title}</span>

          <span>{isOpen ? "−" : "+"}</span>
        </button>

        {isOpen && (
          <div className="receivable-payable-list">
            {items.length === 0 ? (
              <div className="receivable-payable-empty">Chưa có dữ liệu</div>
            ) : (
              items.map((item, index) => (
                <SwipeCard key={item.id || `${item.date}-${index}`} item={item} onEdit={onEdit} onDelete={onDelete}>
                  <div className="receivable-payable-card">
                    <div className="receivable-payable-card-header">
                      <strong className="receivable-payable-card-name">{item.counterparty || "Không tên"}</strong>

                      <span className="receivable-payable-card-date">{item.date || ""}</span>

                      <span className="receivable-payable-card-content">{item.content || ""}</span>
                    </div>

                    <div className="receivable-payable-card-row">
                      <span>Số tiền</span>

                      <strong>{formatAmount(item.amount)}</strong>
                    </div>

                    <div className="receivable-payable-card-row">
                      <span>Đã thanh toán</span>

                      <strong>{formatAmount(item.paid)}</strong>
                    </div>

                    <div className="receivable-payable-card-row">
                      <span>Còn lại</span>

                      <strong>{formatAmount(getRemaining(item))}</strong>
                    </div>
                  </div>
                </SwipeCard>
              ))
            )}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="receivable-payable-grid">
      <div className="receivable-payable-summary">
        <div className="receivable-payable-summary-title">TỔNG CÔNG NỢ</div>

        <div className="receivable-payable-summary-row">
          <span>Tiền phải thu</span>

          <strong>{formatAmount(summary.receivable)}</strong>
        </div>

        <div className="receivable-payable-summary-row">
          <span>Tiền phải trả</span>

          <strong>{formatAmount(summary.payable)}</strong>
        </div>
      </div>

      {renderSection("TIỀN PHẢI THU", receivables, showReceivable, setShowReceivable)}

      {renderSection("TIỀN PHẢI TRẢ", payables, showPayable, setShowPayable)}
    </div>
  );
}
