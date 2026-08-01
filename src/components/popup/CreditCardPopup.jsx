import React, { useState, useEffect } from "react";
import "../../css/CreditCardPopup.css";

export default function CreditCardPopup({ isOpen, onClose, onSave, currentDate, selectedCard, lastSavedData }) {
  if (!isOpen) return null;

  const formatNumber = (val) => {
    if (val === '' || val === null || val === undefined) return '';
    const num = Number(String(val).replace(/\./g, ''));
    if (isNaN(num)) return val;
    return num.toLocaleString('vi-VN');
  };

  const parseNumber = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/\./g, '')) || 0;
  };

  const [limit, setLimit] = useState('');
  const [usage, setUsage] = useState('');
  const [available, setAvailable] = useState('');
  const [statement, setStatement] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [installment, setInstallment] = useState('');
  const [note, setNote] = useState('');

  const [statementStatus, setStatementStatus] = useState('CHƯA XONG');
  const [debt, setDebt] = useState(0);
  const [fee, setFee] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [withdrawalFee, setWithdrawalFee] = useState(0);

  // Khi mở popup hoặc đổi thẻ, reset ô input về rỗng để hiển thị placeholder
  useEffect(() => {
    setLimit('');
    setUsage('');
    setAvailable('');
    setStatement('');
    setDueDate(lastSavedData?.dueDate || '');
    setInstallment('');
    setNote(lastSavedData?.note || '');
  }, [lastSavedData, selectedCard, isOpen]);

  useEffect(() => {
    const activeLimit = parseNumber(limit) > 0 ? parseNumber(limit) : parseNumber(lastSavedData?.limit);
    const activeAvailable = parseNumber(available) > 0 ? parseNumber(available) : parseNumber(lastSavedData?.available);
    
    // Tính dư nợ
    const calcDebt = Math.max(0, activeLimit - activeAvailable);
    setDebt(calcDebt);

    const numStatement = parseNumber(statement) > 0 ? parseNumber(statement) : parseNumber(lastSavedData?.statement);
    const calcFee = Math.round(numStatement * 0.02);
    setFee(calcFee);

    // Tính số rút dựa trên khả dụng thực tế (làm tròn xuống đến hàng trăm nghìn, ví dụ 12.813.272 -> 12.800.000)
    const rawWithdrawal = activeAvailable > 0 ? activeAvailable : parseNumber(lastSavedData?.available);
    const roundedThousand = Math.floor(rawWithdrawal / 100000) * 100000;
    setWithdrawal(roundedThousand);

    // Tính phí rút (1.8%, tối thiểu 50k)
    const calcWithFee = Math.max(Math.round(roundedThousand * 0.018), 50000);
    setWithdrawalFee(roundedThousand > 0 ? calcWithFee : 0);

    // Trạng thái sao kê: sao kê > 0 thì CHƯA XONG, = 0 thì XONG
    if (numStatement > 0) {
      setStatementStatus('CHƯA XONG');
      const activeDueDate = dueDate || lastSavedData?.dueDate;
      if (activeDueDate) {
        const diffTime = new Date(activeDueDate) - new Date();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays >= 0 ? diffDays : 0);
      } else {
        setDaysLeft(lastSavedData?.daysLeft || 15);
      }
    } else {
      setStatementStatus('XONG');
      setDaysLeft(0);
    }
  }, [limit, available, statement, dueDate, lastSavedData]);

  const handleFormattedChange = (setter) => (e) => {
    const rawVal = e.target.value.replace(/\./g, '');
    if (rawVal === '' || !isNaN(rawVal)) {
      setter(rawVal === '' ? '' : formatNumber(rawVal));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      limit: parseNumber(limit) > 0 ? parseNumber(limit) : parseNumber(lastSavedData?.limit),
      usage: parseNumber(usage) > 0 ? parseNumber(usage) : parseNumber(lastSavedData?.usage),
      available: parseNumber(available) > 0 ? parseNumber(available) : parseNumber(lastSavedData?.available),
      statement: parseNumber(statement) > 0 ? parseNumber(statement) : parseNumber(lastSavedData?.statement),
      dueDate: dueDate || lastSavedData?.dueDate,
      installment: parseNumber(installment) > 0 ? parseNumber(installment) : parseNumber(lastSavedData?.installment),
      note: note !== '' ? note : (lastSavedData?.note || ''),
      debt,
      fee,
      daysLeft,
      withdrawal,
      withdrawalFee,
      statementStatus
    };
    onSave(dataToSave);
    onClose();
  };

  const cardNames = {
    techcombank: "Techcombank",
    vib: "VIB",
    tpbank: "TPBank",
    vpbank: "VPBank",
    seasy: "Seasy",
    slater: "Slater",
  };

  const numStatementCurrent = parseNumber(statement) > 0 ? parseNumber(statement) : parseNumber(lastSavedData?.statement);

  return (
    <div className="popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="popup-container">
        <div className="popup-header">
          <h3>Cập nhật Thẻ: {cardNames[selectedCard] || selectedCard} ({currentDate})</h3>
          <button type="button" className="popup-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          
          <div className="form-group">
            <label>Hạn mức thẻ:</label>
            <input 
              type="text" 
              value={limit} 
              onChange={handleFormattedChange(setLimit)} 
              placeholder={lastSavedData?.limit ? formatNumber(lastSavedData.limit) : "Nhập hạn mức..."} 
            />
          </div>

          <div className="form-group">
            <label>Sử dụng:</label>
            <input 
              type="text" 
              value={usage} 
              onChange={handleFormattedChange(setUsage)} 
              placeholder={lastSavedData?.usage ? formatNumber(lastSavedData.usage) : "Nhập số tiền sử dụng..."} 
            />
          </div>

          <div className="form-group">
            <label>Khả dụng thực tế:</label>
            <input 
              type="text" 
              value={available} 
              onChange={handleFormattedChange(setAvailable)} 
              placeholder={lastSavedData?.available ? formatNumber(lastSavedData.available) : "Nhập số tiền khả dụng..."} 
            />
          </div>

          <div className="form-group">
            <label>Sao kê tháng hiện tại:</label>
            <input 
              type="text" 
              value={statement} 
              onChange={handleFormattedChange(setStatement)} 
              placeholder={lastSavedData?.statement ? formatNumber(lastSavedData.statement) : "Nhập tiền sao kê..."} 
            />
          </div>

          {numStatementCurrent > 0 && (
            <div className="form-group">
              <label>Hạn chót thanh toán:</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </div>
          )}

          <div className="form-group">
            <label>Trả góp:</label>
            <input 
              type="text" 
              value={installment} 
              onChange={handleFormattedChange(setInstallment)} 
              placeholder={lastSavedData?.installment ? formatNumber(lastSavedData.installment) : "Nhập tiền trả góp..."} 
            />
          </div>

          <div className="form-group">
            <label>Ghi chú:</label>
            <input 
              type="text" 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder={lastSavedData?.note || "Nhập ghi chú (nếu có)..."} 
            />
          </div>

          <div className="form-group">
            <label>Trạng thái sao kê:</label>
            <input 
              type="text" 
              value={statementStatus} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed', fontWeight: '600', color: statementStatus === 'XONG' ? '#2b8a3e' : '#c92a2a' }} 
            />
          </div>

          <div className="form-group">
            <label>Dư nợ (= Hạn mức - Khả dụng):</label>
            <input 
              type="text" 
              value={formatNumber(debt)} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed', fontWeight: '600', color: '#c92a2a' }} 
            />
          </div>

          <div className="form-group">
            <label>Phí đáo (2%):</label>
            <input 
              type="text" 
              value={formatNumber(fee)} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed' }} 
            />
          </div>

          {statementStatus !== 'XONG' && (
            <div className="form-group">
              <label>Số ngày còn lại:</label>
              <input 
                type="text" 
                value={daysLeft} 
                readOnly 
                style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed' }} 
              />
            </div>
          )}

          <div className="form-group">
            <label>Số rút (Làm tròn hàng trăm nghìn):</label>
            <input 
              type="text" 
              value={formatNumber(withdrawal)} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed', fontWeight: '600', color: '#2b8a3e' }} 
            />
          </div>
 
          <div className="form-group">
            <label>Phí rút (1.8%):</label>
            <input 
              type="text" 
              value={formatNumber(withdrawalFee)} 
              readOnly 
              style={{ backgroundColor: '#f1f3f5', cursor: 'not-allowed', fontWeight: '600', color: '#c92a2a' }} 
            />
          </div>

          <button type="submit" className="popup-submit-btn">Cập nhật</button>
        </form>
      </div>
    </div>
  );
}