import React, { useState, useEffect } from "react";
import "../../css/Popup.css";

export default function SocialPopup({ isOpen, onClose, onSave, isEditing, lastSavedData }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(lastSavedData?.title || '');
      setCode(lastSavedData?.code || '');
      setPurpose(lastSavedData?.purpose || '');
    }
  }, [isOpen, lastSavedData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      title,
      code,
      purpose,
      updatedAt: new Date().toISOString()
    };
    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>{isEditing ? "Chỉnh Sửa Series" : "Tạo Series Mới"}</h3>
          <button type="button" className="popup-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label>Title (Tên Series, VD: Từ một quả Bóng):</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Nhập tên series..." 
              required
            />
          </div>

          <div className="form-group">
            <label>Mã (VD: TMQB):</label>
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value.toUpperCase())} 
              placeholder="Nhập mã viết tắt..." 
              required
            />
          </div>

          <div className="form-group">
            <label>Mục đích:</label>
            <textarea 
              value={purpose} 
              onChange={(e) => setPurpose(e.target.value)} 
              placeholder="mục đích của series..." 
              rows="3"
            />
          </div>

          <div className="popup-footer" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '16px' }}>
            <button type="submit" className="popup-submit-btn">Lưu Lại</button>
          </div>
        </form>
      </div>
    </div>
  );
}