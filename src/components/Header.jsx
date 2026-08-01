import React from 'react';
import '../css/Header.css';

// Dữ liệu bộ lọc đúng chuẩn 5 mục lớn tương ứng với 5 icon
export const dropdownData = {
  finance: [
    { value: "thu-chi-moi-ngay", label: "Thu chi mỗi ngày" },
    { value: "tong-so-du", label: "Tổng số dư" },
    { value: "the-tin-dung", label: "Thẻ tín dụng" },
    { value: "tong-du-no", label: "Tổng dư nợ" },
  ],
  goal: [
    { value: "muc-tieu-ngan-han", label: "Mục tiêu ngắn hạn (trong 1 năm)" },
    { value: "muc-tieu-dai-han", label: "Mục tiêu dài hạn (sau 2 năm)" },
  ],
  client: [
    { value: "mang-cong-viec", label: "Mảng công việc" },
    { value: "doi-tac", label: "Đối tác" },
    { value: "them-khach-hang", label: "Thêm khách hàng" },
    { value: "xoa-khach-hang", label: "Vuốt qua trái để xoá khách hàng" },
  ],
  social: [
    { value: "quan-ly-bai-dang", label: "Quản lý bài đăng" },
    { value: "quan-ly-src-raw", label: "Quản lý src raw" },
    { value: "quan-ly-clip-dung", label: "Quản lý clip dựng" },
    { value: "quan-ly-thumb", label: "Quản lý thumb" },
    { value: "theo-doi-nen-tang", label: "Theo dõi các nền tảng" },
    { value: "quan-ly-series", label: "Quản lý chuỗi các Series" },
  ],
  supplies: [
    { value: "kho-lam-show", label: "Kho làm show" },
    { value: "kho-do-dung", label: "Kho đồ dùng ở trọ" },
    { value: "tu-quan-ao", label: "Tủ quần áo" },
  ],
};

// Bản đồ chuyển đổi tên tab sang tiêu đề hiển thị (Đã đồng bộ key: goal, client, supplies)
const tabTitles = {
  finance: "Quản lý tài chính",
  goal: "Quản lý mục tiêu",
  client: "Quản lý khách hàng",
  social: "Quản lý MXH",
  supplies: "Quản lý vật tư"
};

export default function Header({ currentTab = 'finance', value, onChange, onUpdate }) {
  const options = dropdownData[currentTab] || dropdownData.finance;

  return (
    <div className="sticky-header-container">
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        {tabTitles[currentTab] || "Quản lý tài chính"}
      </h2>
      <div className="dropdown-container">
        <select 
          className="common-select" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        
        <button className="dropdown-update-btn" onClick={onUpdate}>
          Cập nhật
        </button>
      </div>
    </div>
  );
}