import React, { useState, useEffect } from 'react';
import '../../css/DailyIncomeExpensePopup.css';

export default function DailyIncomeExpensePopup({ isOpen, onClose, onSave, currentDate, lastSavedData }) {
  const [activeTab, setActiveTab] = useState('income'); // 'income' hoặc 'expense'

  // State cho Tab Thu nhập luôn bắt đầu bằng rỗng để tận dụng placeholder
  const [incomeData, setIncomeData] = useState({
    chayShow: '',
    chayTaxi: '',
    viecNgoai: '',
    bonusTaxi: '',
    streak: '',
    tips: '',
    note: ''
  });

  // State cho Tab Chi phí luôn bắt đầu bằng rỗng
  const [expenseData, setExpenseData] = useState({
    anUong: '',
    phiDauSac: '',
    phiDauGui: '',
    ruaXe: '',
    nhapHang: '',
    phatSinh: '',
    note: ''
  });

  // Khi mở popup lên, nếu có dữ liệu cũ thì reset state về rỗng để ô input trống và hiển thị placeholder
  useEffect(() => {
    if (isOpen) {
      setIncomeData({ chayShow: '', chayTaxi: '', viecNgoai: '', bonusTaxi: '', streak: '', tips: '', note: '' });
      setExpenseData({ anUong: '', phiDauSac: '', phiDauGui: '', ruaXe: '', nhapHang: '', phatSinh: '', note: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Xử lý thay đổi input Thu nhập
  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncomeData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input Chi phí
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({ ...prev, [name]: value }));
  };

  // Tính tổng thu và tổng chi thực tế
  const calculateTotals = () => {
    const totalIncome = Object.keys(incomeData)
      .filter(key => key !== 'note')
      .reduce((sum, key) => {
        const val = incomeData[key];
        // Nếu ô trống thì lấy giá trị cũ từ lastSavedData làm số tiền thực tế luôn
        const num = val === '' && lastSavedData?.incomeDetails ? Number(lastSavedData.incomeDetails[key]) || 0 : parseFloat(String(val).replace(/\./g, '')) || 0;
        return sum + num;
      }, 0);

    const totalExpense = Object.keys(expenseData)
      .filter(key => key !== 'note')
      .reduce((sum, key) => {
        const val = expenseData[key];
        const num = val === '' && lastSavedData?.expenseDetails ? Number(lastSavedData.expenseDetails[key]) || 0 : parseFloat(String(val).replace(/\./g, '')) || 0;
        return sum + num;
      }, 0);

    return { totalIncome, totalExpense };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { totalIncome, totalExpense } = calculateTotals();

    // Chuẩn bị dữ liệu chi tiết cuối cùng (nếu ô nào không nhập thì giữ nguyên giá trị cũ)
    const finalIncomeDetails = {};
    Object.keys(incomeData).forEach(key => {
      if (key === 'note') {
        finalIncomeDetails[key] = incomeData[key] || lastSavedData?.incomeDetails?.[key] || '';
      } else {
        const val = incomeData[key];
        finalIncomeDetails[key] = val === '' && lastSavedData?.incomeDetails ? lastSavedData.incomeDetails[key] || '' : val;
      }
    });

    const finalExpenseDetails = {};
    Object.keys(expenseData).forEach(key => {
      if (key === 'note') {
        finalExpenseDetails[key] = expenseData[key] || lastSavedData?.expenseDetails?.[key] || '';
      } else {
        const val = expenseData[key];
        finalExpenseDetails[key] = val === '' && lastSavedData?.expenseDetails ? lastSavedData.expenseDetails[key] || '' : val;
      }
    });

    onSave({
      date: currentDate,
      income: totalIncome,
      expense: totalExpense,
      incomeDetails: finalIncomeDetails,
      expenseDetails: finalExpenseDetails
    });

    onClose();
  };

 return (
    <div className="popup-overlay" onClick={onClose}>
      <form onSubmit={handleSubmit} className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Cập nhật tài chính ({currentDate})</h3>
          <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Tab Switcher */}
        <div className="popup-tabs">
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
          >
            Thu nhập
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'expense' ? 'active' : ''}`}
            onClick={() => setActiveTab('expense')}
          >
            Chi phí
          </button>
        </div>

        <div className="popup-body">
          {/* TAB 1: THU NHẬP */}
          {activeTab === 'income' && (
            <div className="tab-content">
              <div className="form-group">
                <label>1. Chạy show</label>
                <input type="text" name="chayShow" value={incomeData.chayShow} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.chayShow || "0"} />
              </div>
              <div className="form-group">
                <label>2. Chạy taxi</label>
                <input type="text" name="chayTaxi" value={incomeData.chayTaxi} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.chayTaxi || "0"} />
              </div>
              <div className="form-group">
                <label>3. Việc ngoài</label>
                <input type="text" name="viecNgoai" value={incomeData.viecNgoai} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.viecNgoai || "0"} />
              </div>
              <div className="form-group">
                <label>4. Bonus taxi</label>
                <input type="text" name="bonusTaxi" value={incomeData.bonusTaxi} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.bonusTaxi || "0"} />
              </div>
              <div className="form-group">
                <label>5. Streak</label>
                <input type="text" name="streak" value={incomeData.streak} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.streak || "0"} />
              </div>
              <div className="form-group">
                <label>6. Tips</label>
                <input type="text" name="tips" value={incomeData.tips} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.tips || "0"} />
              </div>
              <div className="form-group">
                <label>7. Ghi chú thu nhập</label>
                <textarea name="note" value={incomeData.note} onChange={handleIncomeChange} placeholder={lastSavedData?.incomeDetails?.note || "Nhập ghi chú..."} rows="2" />
              </div>
            </div>
          )}

          {/* TAB 2: CHI PHÍ */}
          {activeTab === 'expense' && (
            <div className="tab-content">
              <div className="form-group">
                <label>1. Ăn uống</label>
                <input type="text" name="anUong" value={expenseData.anUong} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.anUong || "0"} />
              </div>
              <div className="form-group">
                <label>2. Phí đậu sạc</label>
                <input type="text" name="phiDauSac" value={expenseData.phiDauSac} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.phiDauSac || "0"} />
              </div>
              <div className="form-group">
                <label>3. Phí đậu gửi</label>
                <input type="text" name="phiDauGui" value={expenseData.phiDauGui} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.phiDauGui || "0"} />
              </div>
              <div className="form-group">
                <label>4. Rửa xe</label>
                <input type="text" name="ruaXe" value={expenseData.ruaXe} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.ruaXe || "0"} />
              </div>
              <div className="form-group">
                <label>5. Nhập hàng</label>
                <input type="text" name="nhapHang" value={expenseData.nhapHang} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.nhapHang || "0"} />
              </div>
              <div className="form-group">
                <label>6. Phát sinh</label>
                <input type="text" name="phatSinh" value={expenseData.phatSinh} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.phatSinh || "0"} />
              </div>
              <div className="form-group">
                <label>7. Ghi chú chi phí</label>
                <textarea name="note" value={expenseData.note} onChange={handleExpenseChange} placeholder={lastSavedData?.expenseDetails?.note || "Nhập ghi chú..."} rows="2" />
              </div>
            </div>
          )}
        </div>

        <div className="popup-footer">
          <button type="submit" className="submit-update-btn">Cập nhật</button>
        </div>
      </form>
    </div>
  );
}