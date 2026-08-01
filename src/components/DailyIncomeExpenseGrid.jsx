import React, { useState } from 'react';
import '../css/DailyIncomeExpenseGrid.css';
import DailyIncomeExpensePopup from './popup/DailyIncomeExpensePopup';

export default function DailyIncomeExpenseGrid({ rawData = [], onUpdateData }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItemData, setSelectedItemData] = useState(null);

  const handleOpenPopup = (item) => {
    setSelectedDate(item.date);
    setSelectedItemData(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveData = (updatedItem) => {
    if (onUpdateData) {
      onUpdateData(updatedItem);
    }
  };

  const currentMonthStr = '/08/2026';
  const filteredData = rawData.filter(item => item.date && item.date.includes(currentMonthStr));

  const sortedData = [...filteredData].sort((a, b) => {
    const [d1, m1, y1] = a.date.split('/').map(Number);
    const [d2, m2, y2] = b.date.split('/').map(Number);
    return new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1);
  });

  const gridData = sortedData.map((item) => {
    const incomeDetails = item.incomeDetails || {};
    const incomeVal = Object.keys(incomeDetails)
      .filter(k => k !== 'Ghi chú')
      .reduce((sum, k) => sum + (parseFloat(String(incomeDetails[k]).replace(/\./g, '')) || 0), 0);

    const expenseDetails = item.expenseDetails || {};
    const expenseVal = Object.keys(expenseDetails)
      .filter(k => k !== 'Ghi chú')
      .reduce((sum, k) => sum + (parseFloat(String(expenseDetails[k]).replace(/\./g, '')) || 0), 0);

    const dailyNet = incomeVal - expenseVal;

    return {
      originalItem: item,
      dayOfWeek: item.dayOfWeek || 'Thứ Hai',
      date: item.date,
      income: incomeVal.toLocaleString('vi-VN'),
      expense: expenseVal.toLocaleString('vi-VN'),
      dailyNet: dailyNet,
      incomeDetails,
      expenseDetails
    };
  });

  return (
    <div className="common-grid-container">
      {gridData.length === 0 ? (
        <div className="no-data-notice" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Chưa có dữ liệu cập nhật trong tháng 8.
        </div>
      ) : (
        gridData.map((item, index) => (
          <div 
            key={index} 
            className="grid-card"
            onClick={() => handleOpenPopup(item.originalItem)}
            style={{ cursor: 'pointer' }}
          >
            <div className="grid-header">
              <span className="grid-date">{item.dayOfWeek}, {item.date}</span>
            </div>
            
            <div className="grid-body">
              <div className="grid-row-inline">
                <div className="inline-group">
                  <span className="label">Thu vào:</span>
                  <span className="value text-success">+{item.income} đ</span>
                </div>
                <div className="inline-group">
                  <span className="label">Chi ra:</span>
                  <span className="value text-danger">-{item.expense} đ</span>
                </div>
              </div>

              <div className="grid-sub-details" style={{ fontSize: '13px', color: '#555', margin: '8px 0', borderTop: '1px dashed #eee', paddingTop: '6px' }}>
                {Object.entries(item.incomeDetails || {}).map(([key, val]) => {
                  if (key === 'Ghi chú') {
                    if (!val) return null;
                    return (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', color: '#28a745' }}>
                        <span>• {key}:</span>
                        <span>{val}</span>
                      </div>
                    );
                  }
                  const num = parseFloat(String(val).replace(/\./g, '')) || 0;
                  if (num === 0) return null;
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>• {key}:</span>
                      <span>{num.toLocaleString('vi-VN')} đ</span>
                    </div>
                  );
                })}

                {Object.entries(item.expenseDetails || {}).map(([key, val]) => {
                  if (key === 'Ghi chú') {
                    if (!val) return null;
                    return (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', color: '#d9534f' }}>
                        <span>• {key}:</span>
                        <span>{val}</span>
                      </div>
                    );
                  }
                  const num = parseFloat(String(val).replace(/\./g, '')) || 0;
                  if (num === 0) return null;
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', color: '#d9534f' }}>
                      <span>• {key}:</span>
                      <span>{num.toLocaleString('vi-VN')} đ</span>
                    </div>
                  );
                })}
              </div>

              <div className="grid-row total-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '6px' }}>
                <span className="label">Thu nhập trong ngày:</span>
                <span className={`value total ${item.dailyNet < 0 ? 'text-danger' : 'text-success'}`} style={{ color: item.dailyNet < 0 ? '#d9534f' : '#28a745' }}>
                  <b>{item.dailyNet > 0 ? `+${item.dailyNet.toLocaleString('vi-VN')}` : item.dailyNet.toLocaleString('vi-VN')} đ</b>
                </span>
              </div>
            </div>
          </div>
        ))
      )}

      <DailyIncomeExpensePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        currentDate={selectedDate} 
        lastSavedData={selectedItemData}
        onSave={handleSaveData}
      />
    </div>
  );
}