import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  // CSS được tổ chức gọn gàng hơn
  const styles = {
    nav: { marginBottom: "20px", fontSize: "14px", fontFamily: "Arial, sans-serif", display: "flex", flexWrap: "wrap", alignItems: "center" },
    link: { textDecoration: "none", color: "#777", transition: "color 0.3s" },
    active: { color: "#6a1b9a", fontWeight: "bold", pointerEvents: "none" },
    separator: { margin: "0 8px", color: "#ccc" },
  };

  return (
    <nav style={styles.nav} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} style={{ display: "flex", alignItems: "center" }}>
            {/* Sử dụng Link từ react-router-dom để điều hướng SPA.
               Lưu ý: Nếu link là đường dẫn tuyệt đối (ví dụ '/'), React Router sẽ tự xử lý 
               dựa trên cấu hình base URL của dự án.
            */}
            <Link to={item.link} style={{ ...styles.link, ...(isLast ? styles.active : {}) }}>
              {item.label}
            </Link>

            {/* Dấu phân cách chỉ hiển thị nếu không phải là phần tử cuối */}
            {!isLast && <span style={styles.separator}>&gt;</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
