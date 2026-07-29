import React from "react";
import { useNavigate } from "react-router-dom";
import { dataLuckySpinParty, scrollToTopSmooth } from "../datas/data";

const BtnToSpin = () => {
  const navigate = useNavigate();

  return (
    <div className="party-container button-to-spin">
      {/* Khối Lối tắt vào Vòng Quay */}
      <div
        style={{
          background: "#fff",
          border: "2px dashed #ff7675",
          padding: "10px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
          margin: "20px 0",
        }}
      >
        {/* <h2 style={{ color: "#ff7675", margin: "0 0 10px 0" }}>🎁 Khu Vực Trúng Thưởng 🎁</h2> */}
        <h2 style={{ color: "#ff7675", margin: "0 0 10px 0" }}>Khu Vực Trúng Thưởng </h2>
        <p style={{ color: "#2d3436", marginBottom: "20px" }}>Bạn có thư mời tham gia vòng quay may mắn nhận quà đặc quyền từ Phúc Design?</p>
        <button
          // onClick={() => navigate("/lucky-spin")} : cái này là điều hướng đổi trang cơ bản
          onClick={() => {
            scrollToTopSmooth(); // Gọi hàm cuộn lên
            navigate("/lucky-spin"); // Sau đó điều hướng
          }}
          style={{
            background: "linear-gradient(45deg, #ff7675, #ff007f)",
            color: "#fff",
            border: "none",
            padding: "12px 35px",
            borderRadius: "30px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(255, 118, 117, 0.4)",
          }}
        >
          Thử Vận May Ngay!
        </button>
      </div>
    </div>
  );
};

export default BtnToSpin;
