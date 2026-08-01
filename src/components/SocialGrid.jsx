import React from 'react';
import "../css/Grid.css";
import { getSeriesDisplayName } from '../datas/seriesNameMapping'; 
import { EditIcon, TrashIcon } from './Icons';

export default function SocialGrid({ rawData, onSelectSeries, onEditSeries, onDeleteSeries }) {
  const seriesKeys = rawData ? Object.keys(rawData) : [];

  if (seriesKeys.length === 0) {
    return (
      <div className="grid-no-data" style={{ padding: '30px', textAlign: 'center', background: '#fff', borderRadius: '12px', marginTop: '15px', color: '#666' }}>
        Chưa có Series nào được tạo. Bấm nút <strong>"Cập nhật"</strong> ở phía trên để khởi tạo Series mới!
      </div>
    );
  }

  return (
    <div className="grid-container">
      <h3 style={{ marginBottom: '12px', fontSize: '15px', color: '#2d3748' }}>Danh sách các Series hiện có:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {seriesKeys.map((seriesKey, idx) => {
          const seriesDataList = rawData[seriesKey] || [];
          const latestItem = seriesDataList[seriesDataList.length - 1] || {};
          
          // ✅ FIX: Lấy purpose trực tiếp từ mảng seriesDataList trước, nếu không có mới tìm trong latestItem
          const purposeText = seriesDataList.purpose || latestItem.purpose || "Chưa có định hướng / slogan cho series này.";
          
          // ✅ Lấy tên hiển thị từ seriesName (nếu có) hoặc qua hàm mapping
          const displayName = seriesDataList.seriesName || getSeriesDisplayName(seriesKey);

          return (
            <div 
              key={idx} 
              className="grid-card-box" 
              style={{ borderLeft: '4px solid var(--primary-dark-red, #c92a2a)', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              <div 
                className="grid-header" 
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div 
                  onClick={() => onSelectSeries && onSelectSeries(seriesKey)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer', flex: 1 }}
                >
                  <span className="grid-date" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-dark-red, #c92a2a)' }}>
                    {displayName}
                  </span>
                  <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase' }}>
                    Mã: {seriesKey}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', background: '#f1f3f5', padding: '2px 8px', borderRadius: '10px', color: '#495057' }}>
                    {seriesDataList.length} tập
                  </span>

                  {/* Nút sửa/xóa Series */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSeries && onEditSeries(seriesKey);
                      }} 
                      title="Chỉnh sửa Series"
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3182ce", fontSize: "14px" }}
                    >
                      <EditIcon />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSeries && onDeleteSeries(seriesKey);
                      }} 
                      title="Xóa Series"
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "#e53e3e", fontSize: "14px" }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div 
                className="grid-content-list" 
                onClick={() => onSelectSeries && onSelectSeries(seriesKey)}
                style={{ marginTop: '8px', cursor: 'pointer' }}
              >
                <div className="info-row">
                  <span className="info-label italic" style={{ color: '#4a5568' }}>Mục đích / Slogan: </span>
                  <span className="info-value italic text-gray" style={{ fontSize: '13px' }}>{purposeText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}