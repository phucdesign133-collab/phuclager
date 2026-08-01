import React, { useState, useEffect } from 'react';
import '../../css/DailyIncomeExpensePopup.css';

export default function DailyIncomeExpensePopup({ isOpen, onClose, currentDate, onSave, lastSavedData }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('income');

  const [incomeValues, setIncomeValues] = useState({
    '1. Chạy show': '',
    '2. Chạy taxi': '',
    '3. Việc ngoài': '',
    '4. Bonus taxi': '',
    '5. Streak': '',
    '6. Tips': '',
    'Ghi chú': ''
  });

  const [expenseValues, setExpenseValues] = useState({
    '1. Ăn uống': '',
    '2. Đậu sạc': '',
    '3. Đậu gửi': '',
    '4. Rửa': '',
    '5. Phát sinh': '',
    '6. Nhập hàng': '',
    'Ghi chú': ''
  });

  const formatCurrencyInput = (value) => {
    if (!value) return '';
    const numberString = String(value).replace(/\D/g, '');
    if (!numberString) return '';
    return Number(numberString).toLocaleString('vi-VN');
  };

  useEffect(() => {
    const formatSavedObj = (obj) => {
      const formatted = {};
      if (obj) {
        Object.keys(obj).forEach(k => {
          // Bỏ qua nếu là key cũ '7. Ghi chú'
          if (k === '7. Ghi chú') return;
          
          if (k === 'Ghi chú') {
            formatted[k] = obj[k] || '';
          } else {
            formatted[k] = obj[k] !== '' && obj[k] !== undefined ? formatCurrencyInput(obj[k]) : '';
          }
        });
      }
      return formatted;
    };

    setIncomeValues({
      '1. Chạy show': '',
      '2. Chạy taxi': '',
      '3. Việc ngoài': '',
      '4. Bonus taxi': '',
      '5. Streak': '',
      '6. Tips': '',
      'Ghi chú': '',
      ...(lastSavedData?.incomeDetails ? formatSavedObj(lastSavedData.incomeDetails) : {})
    });

    setExpenseValues({
      '1. Ăn uống': '',
      '2. Đậu sạc': '',
      '3. Đậu gửi': '',
      '4. Rửa': '',
      '5. Phát sinh': '',
      '6. Nhập hàng': '',
      'Ghi chú': '',
      ...(lastSavedData?.expenseDetails ? formatSavedObj(lastSavedData.expenseDetails) : {})
    });
  }, [currentDate, lastSavedData]);

  const handleIncomeChange = (key, value) => {
    const newValue = key === 'Ghi chú' ? value : formatCurrencyInput(value);
    setIncomeValues(prev => ({ ...prev, [key]: newValue }));
  };

  const handleExpenseChange = (key, value) => {
    const newValue = key === 'Ghi chú' ? value : formatCurrencyInput(value);
    setExpenseValues(prev => ({ ...prev, [key]: newValue }));
  };

  const handleFormSubmit = () => {
    const finalIncomeDetails = {};
    Object.keys(incomeValues).forEach(k => {
      finalIncomeDetails[k] = incomeValues[k] !== '' ? incomeValues[k] : (lastSavedData?.incomeDetails?.[k] || '');
    });
    // Đảm bảo loại bỏ key cũ nếu lọt vào
    delete finalIncomeDetails['7. Ghi chú'];

    const finalExpenseDetails = {};
    Object.keys(expenseValues).forEach(k => {
      finalExpenseDetails[k] = expenseValues[k] !== '' ? expenseValues[k] : (lastSavedData?.expenseDetails?.[k] || '');
    });
    delete finalExpenseDetails['7. Ghi chú'];

    const totalIncome = Object.keys(finalIncomeDetails)
      .filter(k => k !== 'Ghi chú')
      .reduce((sum, k) => sum + (parseFloat(String(finalIncomeDetails[k]).replace(/\./g, '')) || 0), 0);

    const totalExpense = Object.keys(finalExpenseDetails)
      .filter(k => k !== 'Ghi chú')
      .reduce((sum, k) => sum + (parseFloat(String(finalExpenseDetails[k]).replace(/\./g, '')) || 0), 0);

    if (onSave) {
      onSave({
        date: currentDate,
        income: totalIncome,
        expense: totalExpense,
        incomeDetails: finalIncomeDetails,
        expenseDetails: finalExpenseDetails
      });
    }
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Cập nhật tài chính ({currentDate})</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-tabs">
          <button 
            className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
            type="button"
          >
            Thu nhập
          </button>
          <button 
            className={`tab-btn ${activeTab === 'expense' ? 'active' : ''}`}
            onClick={() => setActiveTab('expense')}
            type="button"
          >
            Chi phí
          </button>
        </div>

        <div className="popup-body">
          {activeTab === 'income' ? (
            <div className="form-section">
              {Object.keys(incomeValues).map((key) => {
                const isNote = key === 'Ghi chú';
                const oldVal = lastSavedData?.incomeDetails?.[key];
                const placeholderText = (oldVal !== undefined && oldVal !== '') ? (isNote ? oldVal : formatCurrencyInput(oldVal)) : (isNote ? "Nhập ghi chú..." : "0");

                return (
                  <div className="form-group" key={key}>
                    <label>{key}</label>
                    <input 
                      type="text" 
                      value={incomeValues[key]} 
                      placeholder={placeholderText}
                      onChange={(e) => handleIncomeChange(key, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="form-section">
              {Object.keys(expenseValues).map((key) => {
                const isNote = key === 'Ghi chú';
                const oldVal = lastSavedData?.expenseDetails?.[key];
                const placeholderText = (oldVal !== undefined && oldVal !== '') ? (isNote ? oldVal : formatCurrencyInput(oldVal)) : (isNote ? "Nhập ghi chú..." : "0");

                return (
                  <div className="form-group" key={key}>
                    <label>{key}</label>
                    <input 
                      type="text" 
                      value={expenseValues[key]} 
                      placeholder={placeholderText}
                      onChange={(e) => handleExpenseChange(key, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="popup-footer">
          <button className="submit-update-btn" onClick={handleFormSubmit} type="button">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}