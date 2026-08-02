import React, { useState } from 'react';
import "../css/Grid.css";
import { EditIcon, TrashIcon } from './Icons';
import SearchBar from "./searchBar";

// Hàm dịch clipName hoặc keyWord sang tiếng Việt nếu cần
const translateClipNameToVietnamese = (name) => {
  if (!name) return '';
  const dictionary = {
    gun: 'cây súng',
    dog: 'Con chó',
    cat: 'Con mèo',
    squid: 'Con mực',
    bird: 'Con chim',
    fish: 'Con cá',
    lion: 'Sư tử',
    tiger: 'Hổ',
    monkey: 'Con khỉ',
    rabbit: 'Con thỏ'
  };
  const cleanName = name.trim().toLowerCase();
  return dictionary[cleanName] || name;
};

export default function SocialList({ activeSeries, seriesItems, onBack, onOpenAddPopup, onEditItem, onDeleteItem }) {
  // State quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  if (!activeSeries) return null;

  // Sắp xếp các mục theo thứ tự số mục (episode) giảm dần: mới nhất/lớn nhất lên trên
  const sortedItems = seriesItems ? [...seriesItems].map((item, originalIndex) => ({ ...item, originalIndex })).sort((a, b) => {
    const epA = Number(a.episode) || 0;
    const epB = Number(b.episode) || 0;
    return epB - epA;
  }) : [];

  return (
    <div className="grid-container">
      {/* Header riêng biệt của SocialList: Cố định khi cuộn (Chứa cả nút Back, Tiêu đề, Nút Add và Thanh SearchBar) */}
      <div className="social-header-sticky">
        <div className="social-header-top-row">
          <button 
            type="button" 
            onClick={onBack}
            title="Quay lại danh sách Series"
            className="social-back-btn"
          >
            ←
          </button>

          <h3 className="social-title-heading">
            {activeSeries.toUpperCase()}
          </h3>

          <button 
            type="button" 
            onClick={onOpenAddPopup}
            title="Thêm mục mới cho series"
            className="social-add-btn"
          >
            +
          </button>
        </div>

        {/* Thanh tìm kiếm nằm bên trong header cố định, lọc theo tiêu đề */}
        <div className="social-search-bar-wrapper">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Tìm kiếm theo tiêu đề..."
          />
        </div>
      </div>

      {(!sortedItems || sortedItems.length === 0) ? (
        <div className="grid-no-data social-no-data">
          Chưa có mục nào trong series này. Bấm dấu cộng (+) ở góc phải để thêm mục mới.
        </div>
      ) : (
        sortedItems.map((item, index) => {
          const actualIndex = item.originalIndex;
          const seriesNameUpper = (item.seriesName || activeSeries).toUpperCase();
          const paddedEpisode = item.episode ? String(item.episode).padStart(3, '0') : '000';
          
          // Lấy clipName làm phần đuôi tiêu đề (ưu tiên dịch, nếu không có lấy tạm keyWord)
          const rawClipName = item.clipName || item.keyWord;
          const translatedClipName = translateClipNameToVietnamese(rawClipName);
          const titleDisplay = `${seriesNameUpper}#${paddedEpisode}${translatedClipName ? ` - ${translatedClipName}` : ''}`;
          
          const chapterDisplay = item.chapter ? `Chapter ${item.chapter}` : '';

          // Lọc theo tiêu đề (nếu không khớp với từ khóa tìm kiếm thì ẩn đi)
          const matchesSearch = titleDisplay.toLowerCase().includes(searchTerm.toLowerCase());
          if (searchTerm.trim() !== '' && !matchesSearch) {
            return null;
          }

          // Danh sách 3 nền tảng cố định
          const platformsConfig = [
            { name: 'Meta', link: item.linkReelsFB },
            { name: 'YouTube', link: item.linkShortsYT },
            { name: 'TikTok', link: item.linkTikTok }
          ];

          return (
            <div key={actualIndex} className="social-item-card">
              {/* BÊN TRÁI: Cụm thông tin văn bản */}
              <div className="social-item-content-left">
                <div className="social-item-header">
                  <span className="social-item-title">
                    {titleDisplay}
                  </span>
                  
                  <div className="social-item-actions">
                    <button 
                      type="button"
                      onClick={() => onEditItem && onEditItem(item, actualIndex)} 
                      title="Chỉnh sửa mục"
                      className="social-action-edit-btn"
                    >
                      <EditIcon />
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc chắn muốn xóa mục này không?`)) {
                          onDeleteItem && onDeleteItem(actualIndex);
                        }
                      }} 
                      title="Xóa mục"
                      className="social-action-delete-btn"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                <div className="social-item-details">
                  {chapterDisplay && (
                    <div className="info-row">
                      <span className="info-label social-chapter-label">{chapterDisplay}</span>
                    </div>
                  )}

                  <div className="info-row social-platforms-wrapper">
                    <span className="info-label">Nền tảng đã đăng:</span>
                    <div className="social-platforms-list">
                      {platformsConfig.map((p, pIdx) => {
                        const hasLink = p.link && p.link.trim() !== '';
                        return (
                          <div key={pIdx} className="social-platform-item">
                            <span>{hasLink ? '☑' : '☐'}</span>
                            <span style={{ fontWeight: '500', color: '#4a5568' }}>{p.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* BÊN PHẢI: Khung ảnh kiểm soát */}
              <div className="social-item-image-right">
                {item.imagePreview ? (
                  <img 
                    src={item.imagePreview} 
                    alt="Preview" 
                  />
                ) : (
                  <span className="social-item-no-image">
                    Chưa có ảnh
                  </span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}