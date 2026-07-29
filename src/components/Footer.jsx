import React from "react";
import "./Footer.css";
import LogoGroup from "../assets/images/logo-phucgroup.png";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-grid">
        <div className="footer-col">
          <img src={LogoGroup} alt="Logo" className="footer-logo" style={{background:"#fff",padding:"10px",borderRadius:"10px"}}/>
          <p>Cung cấp nhân sự</p>
          <p>Xây dựng thương hiệu</p>
          <p>An tâm di chuyển</p>
          <p>"Tất cả chỉ trong 1 cuộc gọi!"</p>
        </div>

        <div className="footer-col">
          <h3>Khám Phá</h3>
          <a href="#">Profile</a>
          <a href="#/lucky-spin">Vòng quay may mắn</a>
          <a href="#">Balloon Club</a>
        </div>

        <div className="footer-col">
          <h3>Dịch Vụ</h3>
          <a href="#/gallery">Tổ chức sự kiện</a>
          <a href="#all-post">Thiết kế tham khảo</a>
          <a href="#all-post">Bảng giá sự kiện</a>
        </div>

        <div className="footer-col">
          <h3>Liên Hệ</h3>
          <a
            href="https://www.google.com/maps/place/C%C3%B4ng+ty+TNHH+Qu%E1%BA%A3ng+C%C3%A1o+Ph%C3%BAc+Design/@10.7575846,106.6224333,17z/data=!3m1!4b1!4m6!3m5!1s0x31752db0382a5be9:0xd367b1680f80fb22!8m2!3d10.7575846!4d106.6250082!16s%2Fg%2F11w7910_603?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            242/99A Bà Hom, Phú Lâm, Q.6, TP.HCM
          </a>
          <a href="mailto:phucdesign133@gmail.com">phucdesign133@gmail.com</a>
          <a href="tel:0799910603">Hotline: 079.991.0603</a>
          <a href="#">Zalo</a>
        </div>
      </div>
      <div className="footer-copyright">
        © 2026 PhucParty. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;
