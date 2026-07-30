import React from 'react';
import '../css/DebtGrid.css';

export default function DebtGrid({ rawData = [] }) {
  const safeData = Array.isArray(rawData) ? rawData : [];

  // Sắp xếp theo ngày nhận mới nhất lên đầu
  const sortedData = [...safeData].sort((a, b) => {
    const dateA = a?.datum || a?.ngayNhan;
    const dateB = b?.datum || b?.ngayNhan;
    if (!dateA || !dateB) return 0;
    const [d1, m1, y1] = dateA.split('/').map(Number);
    const [d2, m2, y2] = dateB.split('/').map(Number);
    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });

  // Tính tổng số tiền gốc và tổng tiền lãi hiện tại
  const totalPrincipal = sortedData.reduce((sum, item) => {
    const amt = item.rawAmount !== undefined ? item.rawAmount : (Number(String(item.amount || item.principal || '0').replace(/\./g, '')) || 0);
    return sum + amt;
  }, 0);

  const totalInterest = sortedData.reduce((sum, item) => {
    const intr = item.rawInterest !== undefined ? item.rawInterest : (Number(String(item.interest || '0').replace(/\./g, '')) || 0);
    return sum + intr;
  }, 0);

  const totalDebtAmount = totalPrincipal + totalInterest;

  // Hàm viết hoa chữ cái đầu (ví dụ: dad -> Dad)
  const capitalizeFirstLetter = (str) => {
    if (!str) return 'Chủ nợ';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="common-grid-container">
      {/* Thẻ tổng kết thông tin */}
      <div className="grid-card" style={{ background: '#fcfcfc', borderLeft: '4px solid var(--primary-red, #b52b2b)' }}>
        <div className="grid-body" style={{ padding: '12px 16px' }}>
          <div className="grid-row" style={{ marginBottom: '6px' }}>
            <span className="label" style={{ fontWeight: 'bold', color: '#333' }}>Tổng khoản vay:</span>
            <span className="value" style={{ fontWeight: 'bold', color: '#333' }}>{sortedData.length}</span>
          </div>
          <div className="grid-row">
            <span className="label" style={{ fontWeight: 'bold', color: '#333' }}>Tổng tiền nợ (Gốc + Lãi):</span>
            <span className="value" style={{ fontWeight: 'bold', color: '#d9534f', fontSize: '16px' }}>
              {totalDebtAmount.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>Chưa có khoản vay nào.</div>
      ) : (
        sortedData.map((item, index) => {
          const amountVal = item.rawAmount !== undefined ? item.rawAmount : (Number(String(item.amount || item.principal || '0').replace(/\./g, '')) || 0);
          const interestVal = item.rawInterest !== undefined ? item.rawInterest : (Number(String(item.interest || '0').replace(/\./g, '')) || 0);
          
          const ngayNhanVal = item.datum || item.ngayNhan || '---';
          const dueDateVal = item.dueDate || item.ngayTra || '---';
          const monthsVal = item.months || `${item.soThang || 1} tháng`;
          const creditorName = capitalizeFirstLetter(item.creditor);

          return (
            <div key={index} className="grid-card">
              <div className="grid-header" style={{ borderBottom: '1px solid #eee' }}>
                <span className="grid-date" style={{ fontWeight: 'bold', color: '#333' }}>
                  {creditorName}
                </span>
              </div>
              
              <div className="grid-body">
                <div className="grid-row">
                  <span className="label">Số tiền gốc:</span>
                  <span className="value" style={{ fontWeight: 'bold' }}>{amountVal.toLocaleString('vi-VN')} đ</span>
                </div>
                
                <div className="grid-row">
                  <span className="label">Ngày nhận:</span>
                  <span>{ngayNhanVal}</span>
                </div>

                <div className="grid-row">
                  <span className="label">Ngày trả (Đến hạn):</span>
                  <span>{dueDateVal}</span>
                </div>

                <div className="grid-row">
                  <span className="label">Lãi ({monthsVal}):</span>
                  <span style={{ color: '#d9534f', fontWeight: '500' }}>{interestVal.toLocaleString('vi-VN')} đ</span>
                </div>

                {item.note && (
                  <div className="grid-row note-row" style={{ marginTop: '6px', fontSize: '13px', color: '#666', borderTop: '1px dashed #eee', paddingTop: '6px' }}>
                    <span className="label">Ghi chú:</span>
                    <span>{item.note}</span>
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