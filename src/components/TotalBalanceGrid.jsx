import React from "react";
import "../css/Grid.css";

export default function TotalBalanceGrid({ rawData = [] }) {
  // Finance đã chịu trách nhiệm giữ tối đa 32 record.
  // Phần này chỉ sắp xếp ngày mới nhất lên đầu.
  const sortedData = [...rawData].sort((a, b) => {
    const [d1, m1, y1] = a.date.split("/").map(Number);
    const [d2, m2, y2] = b.date.split("/").map(Number);

    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });

  const renderNote = (note) => {
    if (!note) return null;

    const lines = String(note).split(/\r?\n/);

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("-x")) {
        return (
          <div key={index} style={{ display: "block" }}>
            • {trimmedLine.slice(2).trim()}
          </div>
        );
      }

      return (
        <div key={index} style={{ display: "block" }}>
          {line}
        </div>
      );
    });
  };

  return (
    <div className="common-grid-container">
      {sortedData.length === 0 ? (
        <div
          className="no-data-notice"
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
          }}
        >
          Chưa có dữ liệu tổng số dư.
        </div>
      ) : (
        sortedData.map((item, index) => {
          const summeVal = Number(item.summe) || 0;
          const bilanzVal = Number(item.bilanz) || 0;

          let trend = "none";
          let diffText = "";

          if (bilanzVal > 0) {
            trend = "up";
            diffText = `+${bilanzVal.toLocaleString("vi-VN")} đ`;
          } else if (bilanzVal < 0) {
            trend = "down";
            diffText = `${bilanzVal.toLocaleString("vi-VN")} đ`;
          }

          return (
            <div key={index} className="grid-card">
              <div
                className="grid-header none-border"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span className="grid-date">
                  {item.dayOfWeek}, {item.date}
                </span>

                {trend !== "none" && (
                  <span
                    className={`grid-trend ${trend === "up" ? "trend-up" : "trend-down"}`}
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: trend === "up" ? "#28a745" : "#d9534f",
                    }}
                  >
                    {trend === "up" ? "▲" : "▼"} {diffText}
                  </span>
                )}
              </div>

              <div className="grid-body">
                <div className="grid-row total-row">
                  <span className="label">Tổng số dư:</span>

                  <span className="value total">{summeVal.toLocaleString("vi-VN")} đ</span>
                </div>

                {item.details?.note && (
                  <div
                    className="grid-row note-row"
                    style={{
                      marginTop: "6px",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    <span className="label">Ghi chú:</span>

                    <span>{renderNote(item.details.note)}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
