import React, { useState, useEffect } from 'react';
import '../css/Finance.css';

export default function Finance() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('phuc_lager_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ title: '', amount: '', type: 'expense', category: 'Chi phí' });

  useEffect(() => {
    localStorage.setItem('phuc_lager_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    const newTx = {
      id: Date.now(),
      title: form.title,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setTransactions([newTx, ...transactions]);
    setForm({ title: '', amount: '', type: 'expense', category: 'Chi phí' });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(item => item.id !== id));
  };

  const totalIncome = transactions
    .filter(item => item.type === 'income')
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="finance-wrapper">
      <h2>💰 Quản lý Tài chính - Phúc Lager</h2>

      <div className="finance-summary">
        <div className="summary-card income">
          <span>Tổng Thu</span>
          <h3>{totalIncome.toLocaleString()} đ</h3>
        </div>
        <div className="summary-card expense">
          <span>Tổng Chi</span>
          <h3>{totalExpense.toLocaleString()} đ</h3>
        </div>
        <div className="summary-card balance">
          <span>Số Dư</span>
          <h3>{balance.toLocaleString()} đ</h3>
        </div>
      </div>

      <form className="finance-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nội dung giao dịch..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số tiền (VNĐ)..."
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="income">Thu nhập</option>
          <option value="expense">Chi phí</option>
        </select>
        <button type="submit">Thêm giao dịch</button>
      </form>

      <div className="finance-list">
        <h3>Lịch sử giao dịch</h3>
        {transactions.length === 0 ? (
          <p className="empty-text">Chưa có giao dịch nào được ghi nhận.</p>
        ) : (
          <ul>
            {transactions.map((item) => (
              <li key={item.id} className={item.type}>
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-date">{item.date}</span>
                </div>
                <div className="item-right">
                  <span className="item-amount">
                    {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString()} đ
                  </span>
                  <button onClick={() => deleteTransaction(item.id)} className="delete-btn">×</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}