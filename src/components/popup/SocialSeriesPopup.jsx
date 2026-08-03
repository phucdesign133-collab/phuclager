import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import "../../css/Popup.css";

export default function SocialSeriesPopup({ isOpen, onClose, onSave, lastSavedData, existingKeys = [] }) {
  if (!isOpen) return null;

  const [episode, setEpisode] = useState('');
  const [publishDateInput, setPublishDateInput] = useState(''); 
  const [clipName, setClipName] = useState('');
  const [keyWord, setKeyWord] = useState('');
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const [postedMeta, setPostedMeta] = useState(false);
  const [postedYouTube, setPostedYouTube] = useState(false);
  const [postedTikTok, setPostedTikTok] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEpisode(lastSavedData?.episode || '');
      setPublishDateInput(lastSavedData?.publishDateRaw || lastSavedData?.chapter || '');
      setClipName(lastSavedData?.clipName || '');
      setKeyWord(lastSavedData?.keyWord || '');
      setImagePreview(lastSavedData?.imagePreview || lastSavedData?.thumbnail_url || '');
      
      setPostedMeta(lastSavedData?.postedMeta || false);
      setPostedYouTube(lastSavedData?.postedYouTube || false);
      setPostedTikTok(lastSavedData?.postedTikTok || false);

      setImageFile(null);
      setUploading(false);
    }
  }, [isOpen, lastSavedData]);

  // Xử lý nén ảnh tối ưu dưới 50Kb
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const MAX_WIDTH = 600;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.6;
          const targetMaxSize = 50 * 1024;

          const tryCompress = (q) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) return;
                if (blob.size > targetMaxSize && q > 0.1) {
                  tryCompress(q - 0.1);
                } else {
                  const currentKey = keyWord.trim() || file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
                  const cleanKeyName = currentKey.toLowerCase().replace(/\s+/g, '-');

                  const compressedFile = new File([blob], `${cleanKeyName}.webp`, {
                    type: 'image/webp',
                    lastModified: Date.now(),
                  });

                  setImageFile(compressedFile);
                  setImagePreview(URL.createObjectURL(blob));
                }
              },
              'image/webp',
              q
            );
          };

          tryCompress(quality);
        };
      };
      reader.readAsDataURL(file);

      if (!keyWord.trim()) {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setKeyWord(nameWithoutExt.toLowerCase().replace(/\s+/g, '-'));
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const trimmedKey = keyWord.trim().toLowerCase();
  const isKeyAvailable = trimmedKey.length > 0;
  const isDuplicateKey = existingKeys && existingKeys.includes(trimmedKey) && trimmedKey !== (lastSavedData?.keyWord || '').toLowerCase();

  const handleDateChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = '';
    if (raw.length > 0) {
      formatted = raw.slice(0, 2);
      if (raw.length >= 3) formatted += '/' + raw.slice(2, 4);
      if (raw.length >= 5) formatted += '/' + raw.slice(4, 8);
    }
    setPublishDateInput(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicateKey) return;

    setUploading(true);
    let finalImageUrl = imagePreview;

    try {
      if (imageFile && isKeyAvailable) {
        const fileName = `${trimmedKey}.webp`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }
    } catch (error) {
      console.error("Lỗi upload ảnh lên Supabase:", error.message);
      alert("Lỗi upload ảnh lên mây: " + error.message);
      setUploading(false);
      return;
    }

    const dataToSave = {
      episode,
      publishDateRaw: publishDateInput,
      chapter: publishDateInput,
      clipName,
      keyWord,
      imagePreview: finalImageUrl,
      thumbnail_url: finalImageUrl,
      postedMeta,
      postedYouTube,
      postedTikTok,
      updatedAt: new Date().toISOString()
    };

    setUploading(false);
    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>{lastSavedData ? "Cập Nhật mục Series" : "Thêm mục Mới"}</h3>
          <button type="button" className="popup-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label>Số thứ tự mục (VD: 20):</label>
            <input 
              type="text" 
              value={episode} 
              onChange={(e) => setEpisode(e.target.value)} 
              placeholder="Nhập số thứ tự mục..." 
              required
            />
          </div>

          <div className="form-group">
            <label>Ngày đăng (VD: 12/08/2026):</label>
            <input 
              type="text" 
              value={publishDateInput} 
              onChange={handleDateChange} 
              placeholder="dd/mm/yyyy" 
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label>Tên clip / Mẫu:</label>
            <input 
              type="text" 
              value={clipName} 
              onChange={(e) => setClipName(e.target.value)} 
              placeholder="Nhập tên mô tả clip..." 
            />
          </div>

          <div className="form-group">
            <label>Key định danh file ảnh & Upload:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" 
                value={keyWord} 
                onChange={(e) => setKeyWord(e.target.value)} 
                placeholder="Nhập key tiếng Anh..." 
                style={{ 
                  flex: 1, 
                  borderColor: isKeyAvailable ? (isDuplicateKey ? '#e53e3e' : '#38a169') : '#cbd5e0',
                  color: isKeyAvailable ? (isDuplicateKey ? '#e53e3e' : '#38a169') : '#2d3748',
                  fontWeight: isKeyAvailable ? 'bold' : 'normal'
                }}
              />
              <label className="upload-btn-label" style={{ 
                padding: '8px 12px', background: '#f0f2f5', border: '1px solid #ccc', 
                borderRadius: '4px', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}>
                📁 Chọn ảnh
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>

            {isDuplicateKey && (
              <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ color: '#e53e3e', fontWeight: 'bold', fontSize: '13px' }}>
                  ❌ Trùng key, vui lòng thêm hậu tố (-1, -2...)
                </span>
              </div>
            )}

            {imagePreview && (
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8f9fa', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e0' }} />
                  <span style={{ fontSize: '12px', color: '#4a5568' }}>Đã nén tối ưu dưới 50Kb!</span>
                </div>
                <button 
                  type="button" 
                  onClick={handleRemoveImage}
                  title="Xóa hình này"
                  style={{ background: '#feb2b2', color: '#9b2c2c', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Nền tảng đã đăng:</label>
            <div style={{ display: 'flex', gap: '20px', background: '#f8f9fa', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
                <input 
                  type="checkbox" 
                  checked={postedMeta} 
                  onChange={(e) => setPostedMeta(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Meta
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
                <input 
                  type="checkbox" 
                  checked={postedYouTube} 
                  onChange={(e) => setPostedYouTube(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                YouTube
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
                <input 
                  type="checkbox" 
                  checked={postedTikTok} 
                  onChange={(e) => setPostedTikTok(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                TikTok
              </label>
            </div>
          </div>

          <div className="popup-footer" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '16px' }}>
            <button 
              type="submit" 
              className="popup-submit-btn" 
              disabled={uploading || isDuplicateKey}
              style={{ opacity: isDuplicateKey ? 0.6 : 1, cursor: isDuplicateKey ? 'not-allowed' : 'pointer' }}
            >
              {uploading ? "Đang đẩy lên mây..." : "Lưu Lại"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}