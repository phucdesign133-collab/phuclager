import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            width: "45px",
            height: "45px",
            backgroundColor: "#6c5ce7",
            color: "#ffffff",
            border: "none",
            borderRadius: "50%",
            fontSize: "1.2rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(108, 92, 231, 0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999, // Tăng thêm 1 chút để chắc chắn nằm trên cùng
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          title="Lên đầu trang"
        >
          ▲
        </button>
      )}
    </>
  );
};

export default BackToTop;
