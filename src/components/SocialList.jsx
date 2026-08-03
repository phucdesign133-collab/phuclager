import React, { useState } from 'react';
import { supabase } from "./utils/supabaseClient";
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

  // Xử lý xóa tích hợp xóa cả bản ghi lẫn file trên Supabase Storage
  const handleDeleteWithStorage = async (item, actualIndex) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa mục này không?`)) return;

    try {
      if (item && item.keyWord) {
        const fileNameToDelete = `${item.keyWord.trim().toLowerCase()}.webp`;
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove([`uploads/${fileNameToDelete}`]);

        if (storageError) {
          console.error("Lỗi khi xóa file trên mây:", storageError.message);
        }
      }
    } catch (err) {
      console.error("Lỗi kết nối Supabase Storage khi xóa:", err);
    }

    if (onDeleteItem) {
      onDeleteItem(actualIndex);
    }
  };

  // Sắp xếp các mục theo thứ tự số mục (episode) giảm dần
  const sortedItems = seriesItems ? [...seriesItems].map((item, originalIndex) => ({ ...item, originalIndex })).sort((a, b) => {
    const epA = Number(a.episode) || 0;
    const epB = Number(b.episode) || 0;
    return epB - epA;
  }) : [];

  return (
    <div className="grid-container">
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
        sortedItems.map((item) => {
          // Lọc bỏ các hàng chưa nhập keyWord để giao diện cực kỳ gọn gàng
          if (!item.keyWord || item.keyWord.trim() === '') {
            return null;
          }

          const actualIndex = item.originalIndex;
          const seriesNameUpper = (item.seriesName || activeSeries).toUpperCase();
          const paddedEpisode = item.episode ? String(item.episode).padStart(3, '0') : '000';
          
          const rawClipName = item.clipName || item.keyWord;
          const translatedClipName = translateClipNameToVietnamese(rawClipName);
          const titleDisplay = `${seriesNameUpper}#${paddedEpisode}${translatedClipName ? ` - ${translatedClipName}` : ''}`;
          
          // Hiển thị Ngày đăng thay thế cho Chapter cũ
          const publishDateDisplay = item.chapter ? `Ngày đăng: ${item.chapter}` : '';

          const matchesSearch = titleDisplay.toLowerCase().includes(searchTerm.toLowerCase());
          if (searchTerm.trim() !== '' && !matchesSearch) {
            return null;
          }

          // Trạng thái nền tảng từ checkbox trực tiếp (postedMeta, postedYouTube, postedTikTok)
          const platformsConfig = [
            { name: 'Meta', checked: item.postedMeta },
            { name: 'YouTube', checked: item.postedYouTube },
            { name: 'TikTok', checked: item.postedTikTok }
          ];

          return (
            <div key={actualIndex} className="social-item-card">
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
                      onClick={() => handleDeleteWithStorage(item, actualIndex)} 
                      title="Xóa mục"
                      className="social-action-delete-btn"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                <div className="social-item-details">
                  {publishDateDisplay && (
                    <div className="info-row">
                      <span className="info-label social-chapter-label" style={{ fontWeight: '600', color: '#2b6cb0' }}>
                        {publishDateDisplay}
                      </span>
                    </div>
                  )}

                  <div className="info-row social-platforms-wrapper" style={{ marginTop: '6px' }}>
                    <span className="info-label" style={{ fontSize: '13px', color: '#718096' }}>Nền tảng đã đăng:</span>
                    <div className="social-platforms-list" style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                      {platformsConfig.map((p, pIdx) => (
                        <div key={pIdx} className="social-platform-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{p.checked ? '☑' : '☐'}</span>
                          <span style={{ fontWeight: '500', color: '#4a5568', fontSize: '13px' }}>{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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