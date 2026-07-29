import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { galleryData } from "../datas/galleryData"; // Nhớ kiểm tra đường dẫn file đúng với project của bạn
import "./Header.css";

// Import các logo
import LogoGroup from "../assets/images/logo-phucgroup.png";
import LogoDesign from "../assets/images/logo-phucdesign.png";
import LogoParty from "../assets/images/logo-phucparty.png";

// Import LogoDayNe theo public path (hoặc bạn có thể import từ src nếu để chung thư mục assets)
const LogoDayNe = "/img/logodayne-1.webp";

import { FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (path) => {
    setIsMenuOpen(false); // Đóng menu mobile
    navigate(path); // Điều hướng tới trang mong muốn
  };

  const [currentLogo, setCurrentLogo] = useState(LogoGroup);

  const updateLogo = () => {
    // 1. Kiểm tra nếu đang ở khu vực Balloon Club thì dùng logo Đây Nè!
    if (location.pathname.includes("/balloon-club")) {
      return LogoDayNe;
    }

    const categoryFromState = location.state?.category;
    const searchParams = new URLSearchParams(location.search);
    const categoryFromURL = searchParams.get("filter");

    let currentCat = categoryFromState || categoryFromURL;

    if (!currentCat) {
      if (location.pathname.includes("/post/")) {
        const pathParts = location.pathname.split("/");
        const slug = pathParts[pathParts.length - 1];

        const project = galleryData.find((item) => item.slug === slug);
        currentCat = project ? project.category : "thiet-ke";
      } else if (location.pathname.includes("/all-post")) {
        currentCat = "su-kien";
      }
    }

    if (currentCat === "su-kien") return LogoParty;
    if (currentCat === "thiet-ke") return LogoDesign;
    return LogoGroup;
  };

  // Luôn cập nhật logo khi location thay đổi
  useEffect(() => {
    setCurrentLogo(updateLogo());
  }, [location]);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo-wrapper" onClick={() => handleMenuClick("/")}>
          <img src={currentLogo} alt="Logo" className="logo-img" />
        </div>
        <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
          <FaBars size={24} />
        </button>
      </div>

      <nav className={`header-nav ${isMenuOpen ? "nav-open" : ""}`}>
        <div className="menu-header-mobile">
          <div className="menu-logo-mobile">
            <img src={currentLogo} alt="Logo" />
          </div>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        <div className="nav-link" onClick={() => handleMenuClick("/")}>
          Home
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/gallery")}>
          Gallery
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/balloon-club")}>
          Balloon Club
        </div>
        <div className="nav-link" onClick={() => handleMenuClick("/lucky-spin")}>
          Lucky Spin
        </div>
      </nav>
    </header>
  );
};

export default Header;