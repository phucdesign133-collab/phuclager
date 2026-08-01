import React, { useState, useEffect } from 'react';
import '../../css/Popup.css';

export default function DebtPopup({ isOpen, onClose, onAddDebt }) {
  const [creditor, setCreditor] = useState('');
  const [amount, setAmount] = useState('');
  const [datum, setDatum] = useState(''); 
  const [dueDate, setDueDate] = useState(''); 
  const [note, setNote] = useState('');

  const [calculatedMonths, setCalculatedMonths] = useState(1);
  const [calculatedInterest, setCalculatedInterest] = useState(0);

  // Xử lý nhập số tiền tự động thêm dấu chấm phân cách hàng nghìn
  const handleAmountChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // Chỉ giữ lại số
    if (!rawVal) {
      setAmount('');
      return;
    }
    const formatted = Number(rawVal).toLocaleString('vi-VN');
    setAmount(formatted);
  };

  useEffect(() => {
    if (!datum) {
      setCalculatedMonths(1);
      setCalculatedInterest(0);
      return;
    }

    const parts = datum.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const nhậnDate = new Date(year, month, day);
      const now = new Date();

      if (!isNaN(nhậnDate.getTime())) {
        const diffYears = now.getFullYear() - nhậnDate.getFullYear();
        const diffMonths = now.getMonth() - nhậnDate.getMonth();
        let totalMonths = diffYears * 12 + diffMonths + 1;
        if (totalMonths < 1) totalMonths = 1;

        setCalculatedMonths(totalMonths);

        const rawAmt = parseFloat(amount.replace(/\./g, '')) || 0;
        const interestVal = rawAmt * 0.02 * totalMonths;
        setCalculatedInterest(Math.round(interestVal));
      }
    }
  }, [datum, amount]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !datum) return;

    const rawAmt = parseFloat(amount.replace(/\./g, '')) || 0;

    const newDebtItem = {
      id: Date.now(),
      creditor: creditor || 'Không rõ',
      datum: datum,
      rawAmount: rawAmt,
      amount: rawAmt.toLocaleString('vi-VN'),
      months: `${calculatedMonths} tháng`,
      rawInterest: calculatedInterest,
      interest: calculatedInterest.toLocaleString('vi-VN'),
      dueDate: dueDate,
      note: note
    };

    onAddDebt(creditor || 'Dad', newDebtItem);

    setCreditor('');
    setAmount('');
    setDatum('');
    setDueDate('');
    setNote('');
    onClose();
  };

  return (
    <div className="debt-popup-overlay">
      <div className="debt-popup-container">
        <div className="debt-popup-header">
          <h3 className="debt-popup-title">Cập nhật khoản vay</h3>
          <button type="button" className="debt-popup-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="debt-popup-form">
          <div className="debt-popup-field">
            <label>1. Chủ nợ</label>
            <input 
              type="text" 
              placeholder="Nhập tên chủ nợ (VD: Dad, Mom...)" 
              value={creditor} 
              onChange={(e) => setCreditor(e.target.value)} 
              required 
            />
          </div>

          <div className="debt-popup-field">
            <label>2. Số tiền gốc</label>
            <input 
              type="text" 
              placeholder="Nhập số tiền..." 
              value={amount} 
              onChange={handleAmountChange} 
              required 
            />
          </div>

          <div className="debt-popup-field">
            <label>3. Ngày nhận (DD/MM/YYYY)</label>
            <input 
              type="text" 
              placeholder="VD: 08/05/2026" 
              value={datum} 
              onChange={(e) => setDatum(e.target.value)} 
              required 
            />
          </div>

          <div className="debt-popup-field">
            <label>4. Ngày trả (Đến hạn)</label>
            <input 
              type="text" 
              placeholder="VD: 08/11/2026" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>

          <div className="debt-popup-field">
            <label>5. Lãi (Tự động 2%/tháng): <span className="highlight-val">{calculatedInterest.toLocaleString('vi-VN')} đ</span></label>
          </div>

          <div className="debt-popup-field">
            <label>6. Số tháng tính lãi (+1): <span className="highlight-val">{calculatedMonths} tháng</span></label>
          </div>

          <div className="debt-popup-field">
            <label>7. Ghi chú</label>
            <input  
              type="text" 
              placeholder="Nhập ghi chú (nếu có)..." 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
            />
          </div>

          <button type="submit" className="debt-popup-submit-btn">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}