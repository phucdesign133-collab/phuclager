import React, { useState, useEffect } from "react";
import "../../css/Popup.css";

export default function SocialSeriesPopup({ isOpen, onClose, onSave, lastSavedData }) {
  if (!isOpen) return null;

  const [episode, setEpisode] = useState('');
  const [chapter, setChapter] = useState('');
  const [clipName, setClipName] = useState('');
  const [keyWord, setKeyWord] = useState('');
  
  // State lưu trữ file ảnh hoặc chuỗi ảnh base64 được upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // 3 nền tảng link Reels/Bài đăng
  const [linkTikTok, setLinkTikTok] = useState('');
  const [linkReelsFB, setLinkReelsFB] = useState('');
  const [linkShortsYT, setLinkShortsYT] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEpisode(lastSavedData?.episode || '');
      setChapter(lastSavedData?.chapter || '');
      setClipName(lastSavedData?.clipName || '');
      setKeyWord(lastSavedData?.keyWord || '');
      setImagePreview(lastSavedData?.imagePreview || '');
      setLinkTikTok(lastSavedData?.linkTikTok || '');
      setLinkReelsFB(lastSavedData?.linkReelsFB || '');
      setLinkShortsYT(lastSavedData?.linkShortsYT || '');
    }
  }, [isOpen, lastSavedData]);

  // Xử lý khi người dùng chọn file ảnh từ máy
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Lưu chuỗi Base64
      };
      reader.readAsDataURL(file);
      
      if (!keyWord.trim()) {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setKeyWord(nameWithoutExt.toLowerCase().replace(/\s+/g, '-'));
      }
    }
  };

  const trimmedKey = keyWord.trim().toLowerCase();
  const previewFileName = trimmedKey ? `${trimmedKey}.webp` : 'chuabocopnhap.webp';
  const isKeyAvailable = trimmedKey.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      episode,
      chapter,
      clipName,
      keyWord,
      imagePreview,
      linkTikTok,
      linkReelsFB,
      linkShortsYT,
      updatedAt: new Date().toISOString()
    };
    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>{lastSavedData ? "Cập Nhật Tập Series" : "Thêm Tập Mới"}</h3>
          <button type="button" className="popup-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label>Số thứ tự tập (VD: 20):</label>
            <input 
              type="text" 
              value={episode} 
              onChange={(e) => setEpisode(e.target.value)} 
              placeholder="Nhập số thứ tự tập..." 
              required
            />
          </div>

          <div className="form-group">
            <label>Chapter (Nhập số, VD: 5):</label>
            <input 
              type="text" 
              value={chapter} 
              onChange={(e) => setChapter(e.target.value)} 
              placeholder="Nhập số chương/chapter..." 
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

          {/* Phần Key định danh & Upload Ảnh trực tiếp */}
          <div className="form-group">
            <label>Key định danh file ảnh & Upload:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" 
                value={keyWord} 
                onChange={(e) => setKeyWord(e.target.value)} 
                placeholder="Nhập key tiếng Anh..." 
                style={{ flex: 1 }}
              />
              <label className="upload-btn-label" style={{ 
                padding: '8px 12px', background: '#f0f2f5', border: '1px solid #ccc', 
                borderRadius: '4px', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap' 
              }}>
                📁 Chọn ảnh
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="preview-filename-box" style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span>Tên file hệ thống:</span> <strong>{previewFileName}</strong>
              </div>
              <div>
                {isKeyAvailable ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }} title="Key hợp lệ">
                    ✔️ Hợp lệ
                  </span>
                ) : (
                  <span style={{ color: '#999' }} title="Chưa nhập key">
                    ❌ Chưa có
                  </span>
                )}
              </div>
            </div>

            {imagePreview && (
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                <span style={{ fontSize: '12px', color: '#666' }}>Đã tải ảnh lên thành công!</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Link đăng tải lên các Nền tảng:</label>
            <div className="platform-links-container">
              <div className="platform-input-row">
                <label>TikTok:</label>
                <input 
                  type="text" 
                  value={linkTikTok} 
                  onChange={(e) => setLinkTikTok(e.target.value)} 
                  placeholder="Dán link TikTok..." 
                />
              </div>
              <div className="platform-input-row">
                <label>Facebook:</label>
                <input 
                  type="text" 
                  value={linkReelsFB} 
                  onChange={(e) => setLinkReelsFB(e.target.value)} 
                  placeholder="Dán link Reels FB..." 
                />
              </div>
              <div className="platform-input-row">
                <label>YouTube:</label>
                <input 
                  type="text" 
                  value={linkShortsYT} 
                  onChange={(e) => setLinkShortsYT(e.target.value)} 
                  placeholder="Dán link Shorts YT..." 
                />
              </div>
            </div>
          </div>

          <div className="popup-footer" style={{ padding: 0, background: 'transparent', border: 'none' }}>
            <button type="submit" className="popup-submit-btn">Lưu Lại</button>
          </div>
        </form>
      </div>
    </div>
  );
}