import React from "react";
import "./contactSection.css";

const ContactSection = ({ category }) => {
  // Xác định tên thương hiệu dựa trên category hoặc nếu thuộc Balloon Club
  let brandName = "Phúc Party";
  if (category === "thiet-ke") {
    brandName = "Phúc Design";
  } else if (category === "balloonClub" || category === "balloon-club") {
    brandName = "Đây Nè!";
  }

  return (
    <div className="contact-section-custom">
      <h3 style={{ marginTop: "-10px" }}>Liên hệ với chúng tôi</h3>
      <div className="contact-info">
        <p>
          <strong>Đại diện {brandName}:</strong> Dương Đỗ Hồng Phúc
        </p>
        <p>
          <strong>Số điện thoại:</strong> 079.991.0603
        </p>
        <p>
          <strong>Email:</strong> phucdesign133@gmail.com
        </p>
      </div>

      <div className="cta-container">
        <a href="https://zalo.me/0799910603" target="_blank" rel="noopener noreferrer" className="btn-zalo">
          Liên hệ Zalo
        </a>
        <a href="https://zalo.me/0799910603" target="_blank" rel="noopener noreferrer" className="btn-share">
          Liên hệ Whatsapp
        </a>
      </div>
    </div>
  );
};

export default ContactSection;