import React from 'react';
import '../css/DailyIncomeExpenseGrid.css';

export default function DailyIncomeExpenseGrid({ rawData = [] }) {
  const generateMonthDays = () => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0: Tháng 1, ..., 6: Tháng 7 (July 2026)
    const currentDate = today.getDate(); // Ngày hôm nay (ví dụ: 30)

    // Lấy số ngày của tháng trước để tính cho ngày mùng 1
    const lastDayPrevMonthDate = new Date(currentYear, currentMonth, 0);
    const lastDayPrevMonthStr = `${String(lastDayPrevMonthDate.getDate()).padStart(2, '0')}/${String(lastDayPrevMonthDate.getMonth() + 1).padStart(2, '0')}/${lastDayPrevMonthDate.getFullYear()}`;

    // Dữ liệu mẫu giả lập cho ngày cuối tháng trước (để ngày 1 tháng này có cái so sánh)
    const mockDatabase = {
      [lastDayPrevMonthStr]: 43375199,
      // Có thể nạp thêm các ngày trong tháng vào đây từ rawData của anh
    };

    // Nạp dữ liệu thô từ props vào database giả lập theo định dạng ngày 'DD/MM/YYYY'
    rawData.forEach(item => {
      if (item.date && item.totalBalance) {
        mockDatabase[item.date] = parseFloat(item.totalBalance.replace(/\./g, '')) || 0;
      }
    });

    const list = [];

    // Chạy vòng lặp từ ngày hôm nay lùi về mùng 1 của tháng
    for (let d = currentDate; d >= 1; d--) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const dayOfWeek = daysOfWeek[dateObj.getDay()];
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const yyyy = dateObj.getFullYear();
      const dateStr = `${dd}/${mm}/${yyyy}`;

      // Tìm dữ liệu thu/chi của ngày d (nếu không có mặc định là 0)
      const foundItem = rawData.find(item => item.date === dateStr) || {
        income: 0,
        expense: 0,
      };

      const incomeVal = parseFloat(String(foundItem.income).replace(/\./g, '')) || 0;
      const expenseVal = parseFloat(String(foundItem.expense).replace(/\./g, '')) || 0;

      // Xác định ngày hôm qua là ngày nào
      let prevDateStr = '';
      if (d > 1) {
        const prevObj = new Date(currentYear, currentMonth, d - 1);
        prevDateStr = `${String(prevObj.getDate()).padStart(2, '0')}/${String(prevObj.getMonth() + 1).padStart(2, '0')}/${prevObj.getFullYear()}`;
      } else {
        prevDateStr = lastDayPrevMonthStr;
      }

      // Lấy tổng số dư của ngày hôm qua làm gốc
      const prevBalance = mockDatabase[prevDateStr] !== undefined ? mockDatabase[prevDateStr] : 43375199;

      // Áp dụng công thức: Tổng số dư hôm nay = Tổng số dư hôm qua + Thu - Chi
      const currentBalance = prevBalance + incomeVal - expenseVal;

      // Lưu lại vào database tạm để ngày tiếp theo (hoặc vòng lặp tiếp theo) có thể gọi làm hôm qua
      mockDatabase[dateStr] = currentBalance;

      list.push({
        dayOfWeek,
        date: dateStr,
        income: incomeVal.toLocaleString('vi-VN'),
        expense: expenseVal.toLocaleString('vi-VN'),
        totalBalance: currentBalance.toLocaleString('vi-VN'),
        prevBalance: prevBalance,
        rawBalance: currentBalance,
        incomeColor: 'neutral',
        expenseColor: 'neutral'
      });
    }

    return list;
  };

  const gridData = generateMonthDays();

  return (
    <div className="common-grid-container">
      {gridData.map((item, index) => {
        let trend = 'none';
        let diffText = '';

        // Vì mảng đang xếp từ ngày mới nhất xuống cũ nhất (index 0 là hôm nay, index sau là ngày hôm qua)
        // So sánh ngày ở index hiện tại với ngày đứng ngay sau nó (index + 1)
        if (index < gridData.length - 1) {
          const currentBalance = item.rawBalance;
          const prevDayBalance = gridData[index + 1].rawBalance;
          const diff = currentBalance - prevDayBalance;

          if (diff > 0) {
            trend = 'up';
            diffText = `+${diff.toLocaleString('vi-VN')} đ so với hôm qua`;
          } else if (diff < 0) {
            trend = 'down';
            diffText = `${diff.toLocaleString('vi-VN')} đ so với hôm qua`;
          } else {
            trend = 'none'; // Bằng nhau thì tắt hẳn mũi tên theo đúng yêu cầu
          }
        } else {
          // Riêng ngày mùng 1 (phần tử cuối cùng trong danh sách tháng này), so với ngày cuối tháng trước
          const currentBalance = item.rawBalance;
          const diff = currentBalance - item.prevBalance;

          if (diff > 0) {
            trend = 'up';
            diffText = `+${diff.toLocaleString('vi-VN')} đ so với hôm qua`;
          } else if (diff < 0) {
            trend = 'down';
            diffText = `${diff.toLocaleString('vi-VN')} đ so với hôm qua`;
          } else {
            trend = 'none';
          }
        }

        return (
          <div key={index} className="grid-card">
            <div className="grid-header">
              <span className="grid-date">{item.dayOfWeek}, {item.date}</span>
              {trend !== 'none' && (
                <span className={`grid-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                  {trend === 'up' ? '▲' : '▼'} {diffText}
                </span>
              )}
            </div>
            
            <div className="grid-body">
              <div className="grid-row-inline">
                <div className="inline-group">
                  <span className="label">Thu vào:</span>
                  <span className={`value ${item.incomeColor || 'neutral'}`}>+{item.income} đ</span>
                </div>
                <div className="inline-group">
                  <span className="label">Chi ra:</span>
                  <span className={`value ${item.expenseColor || 'neutral'}`}>-{item.expense} đ</span>
                </div>
              </div>

              <div className="grid-row total-row">
                <span className="label">Tổng số dư:</span>
                <span className="value total">{item.totalBalance} đ</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}