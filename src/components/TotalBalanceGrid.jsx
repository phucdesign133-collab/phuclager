import React from 'react';
import '../css/DailyIncomeExpenseGrid.css';

export default function TotalBalanceGrid({ rawData = [] }) {
  // Sắp xếp danh sách từ ngày mới nhất xuống cũ nhất (để hiển thị ngày hôm nay lên đầu)
  const sortedData = [...rawData].sort((a, b) => {
    const [d1, m1, y1] = a.date.split('/').map(Number);
    const [d2, m2, y2] = b.date.split('/').map(Number);
    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });

  return (
    <div className="common-grid-container">
      {sortedData.map((item, index) => {
        const summeVal = Number(item.summe) || 0;
        const bilanzVal = Number(item.bilanz) || 0;

        let trend = 'none';
        let diffText = '';

        if (bilanzVal > 0) {
          trend = 'up';
          diffText = `+${bilanzVal.toLocaleString('vi-VN')} đ so với hôm qua`;
        } else if (bilanzVal < 0) {
          trend = 'down';
          diffText = `${bilanzVal.toLocaleString('vi-VN')} đ so với hôm qua`;
        } else {
          trend = 'none'; // Bằng 0 thì ẩn mũi tên theo đúng ý anh
        }

        return (
          <div key={index} className="grid-card">
            <div className="grid-header none-border">
              <span className="grid-date">{item.dayOfWeek}, {item.date}</span>
              {trend !== 'none' && (
                <span className={`grid-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                  {trend === 'up' ? '▲' : '▼'} {diffText}
                </span>
              )}
            </div>
            
            <div className="grid-body">
              <div className="grid-row total-row">
                <span className="label">Tổng số dư:</span>
                <span className="value total">{summeVal.toLocaleString('vi-VN')} đ</span>
              </div>
              
              {/* Hiển thị thêm ghi chú nếu có */}
              {item.details?.note && (
                <div className="grid-row note-row" style={{ marginTop: '6px', fontSize: '13px', color: '#666' }}>
                  <span className="label">Ghi chú:</span>
                  <span>{item.details.note}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}