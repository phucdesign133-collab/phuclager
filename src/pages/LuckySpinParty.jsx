import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASIC_PRIZES, PREMIUM_PRIZES } from "../datas/data";
import ResultPopup from "../components/resultPopup";

const ZALO_PHONE_ADMIN = "0799910603";

export default function LuckySpinParty() {
  const navigate = useNavigate();

  const [babyName, setBabyName] = useState("");
  const [babyBirthday, setBabyBirthday] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeResult, setPrizeResult] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPopup, setShowPopup] = useState(false);
  const [isGiftImageOpen, setIsGiftImageOpen] = useState(false);
  const [currentGiftImage, setCurrentGiftImage] = useState(null);

  const canvasRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  const isMobile = windowWidth < 850;
  const canvasSize = windowWidth < 500 ? 300 : 440;
  const isPremiumMode = babyName.trim().length > 0 && babyBirthday.trim().length > 0;
  const currentPrizes = isPremiumMode ? PREMIUM_PRIZES : BASIC_PRIZES;

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvasSize;
    const center = size / 2;
    const radius = center - 8;
    const arc = (Math.PI * 2) / currentPrizes.length;

    ctx.clearRect(0, 0, size, size);

    currentPrizes.forEach((prize, index) => {
      const angle = currentAngle + index * arc;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arc);
      ctx.closePath();
      ctx.fillStyle = index % 2 === 0 ? "#f21d1d" : "#292828";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);
      ctx.fillStyle = "#fff";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.font = 'bold 12px "Quicksand", sans-serif';
      ctx.fillText(prize.text, radius - 20, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.font = "25px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎁", center, center + 2);
  };

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [canvasSize, isPremiumMode]);

  const calculateFinalPrize = () => {
    const degrees = angleRef.current * (180 / Math.PI) + 90;
    const arc = 360 / currentPrizes.length;
    const index = Math.floor((360 - (degrees % 360)) / arc) % currentPrizes.length;
    setPrizeResult(currentPrizes[index]);
    const code = `${isPremiumMode ? "VIP" : "NORMAL"}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(code);
  };

  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrizeResult(null);
    setGeneratedCode("");
    const spinAngleStart = Math.random() * 15 + 20;
    const spinTimeTotal = 7000;
    let spinTime = 0;
    const easeOut = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;
    const animate = () => {
      spinTime += 20;
      if (spinTime >= spinTimeTotal) {
        setIsSpinning(false);
        calculateFinalPrize();
        setShowPopup(true);
        return;
      }
      const delta = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      angleRef.current += (delta * Math.PI) / 180;
      drawWheel(angleRef.current);
      requestAnimationFrame(animate);
    };
    animate();
  };

  const handleOpenGiftImage = (imageName) => {
    setCurrentGiftImage(imageName);
    setIsGiftImageOpen(true);
  };
  const getImageUrl = (imageName) => {
    return `img/${imageName}`;
  };
  return (
    <div
      style={{
        ...styles.partyContainer,
        borderColor: isPremiumMode ? "#00f5d4" : "#64748b",
        boxShadow: isPremiumMode ? "0 25px 50px rgba(0, 245, 212, 0.25)" : "0 25px 50px rgba(0,0,0,0.5)",
        padding: isMobile ? "70px 15px 30px 15px" : "50px 30px",
      }}
    >
      <div style={styles.headerArea}>
        <h1 style={{ ...styles.partyTitle, color: isPremiumMode ? "#00f5d4" : "#e2e8f0", fontSize: isMobile ? "22px" : "30px" }}>
          {isPremiumMode ? "💎 VÒNG QUAY VIP 💎" : "🎉 VÒNG QUAY MAY MẮN 🎉"}
        </h1>
        <p style={styles.partySubtitle}>
          {isPremiumMode ? "Chào mừng bạn đến với Vòng quay VIP của Phúc" : "Chào mừng bạn đến với Vòng quay Basic của Phúc."}
        </p>
      </div>

      <div style={{ ...styles.mainLayout, flexDirection: isMobile ? "column" : "row", gap: isMobile ? "35px" : "50px" }}>
        <div
          style={{
            ...styles.wheelWrapper,
            transform: isPremiumMode ? "rotateY(360deg)" : "rotateY(0deg)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div
            style={{
              ...styles.pointer,
              borderTopColor: isPremiumMode ? "#00f5d4" : "#64748b",
              borderLeftWidth: isMobile ? "12px" : "16px",
              borderRightWidth: isMobile ? "12px" : "16px",
              borderTopWidth: isMobile ? "24px" : "32px",
            }}
          ></div>
          <div style={{ position: "relative" }}>
            <div className={`wheel-lights-container ${isSpinning ? "spinning" : ""}`}>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="light-dot"
                  style={{
                    // Giữ nguyên công thức bạn đã ưng ý, không thay đổi
                    transform: `rotate(${i * 18}deg) translateY(-${canvasSize / 2}px)`,
                  }}
                ></div>
              ))}
            </div>
            <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={styles.canvasStyle} />
          </div>
          <button
            onClick={spinTheWheel}
            disabled={isSpinning}
            style={{
              ...styles.spinButton,
              background: isSpinning ? "#333" : "#f00",
              color: "#fff",
              border: "2px solid #fff",
              padding: isMobile ? "12px 30px" : "14px 40px",
            }}
          >
            {isSpinning ? "🌟 ĐANG XOAY..." : isPremiumMode ? "🔥 QUAY VÒNG VIP 🔥" : " QUAY THỬ QUÀ NHỎ"}
          </button>
        </div>

        <div style={{ ...styles.formWrapper, width: isMobile ? "100%" : "390px" }}>
          <h3 style={{ ...styles.formTitle, color: isPremiumMode ? "#ffbf00" : "#94a3b8", fontSize: isMobile ? "15px" : "16px" }}>
            {isPremiumMode ? "✨ Vòng Quay VIP Sẵn Sàng ✨" : "🔒 Nhập Thông Tin Để Mở Vòng Quay VIP"}
          </h3>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: isPremiumMode ? "#00f5d4" : "#94a3b8" }}>Tên của bé yêu!</label>
            <input type="text" placeholder="Nhập tên bé..." value={babyName} onChange={(e) => setBabyName(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={{ ...styles.label, color: isPremiumMode ? "#00f5d4" : "#94a3b8" }}>Ngày sinh của bé:</label>
            <input
              type="date"
              value={babyBirthday}
              onChange={(e) => setBabyBirthday(e.target.value)}
              required
              style={{ ...styles.input, colorScheme: "dark" }}
            />
          </div>
          {prizeResult && (
            <div
              style={{
                ...styles.resultBox,
                background: isPremiumMode ? "linear-gradient(135deg, #ff007f 0%, #7b2cbf 100%)" : "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#fff" }}>BÉ ĐÃ QUAY TRÚNG:</p>
              <h2 style={{ ...styles.resultText, fontSize: isMobile ? "18px" : "20px" }}>
                {prizeResult.icon} {prizeResult.text}
              </h2>
              <div style={styles.codeBadge}>{generatedCode}</div>
            </div>
          )}
        </div>
      </div>
      <ResultPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        result={prizeResult}
        babyName={babyName}
        code={generatedCode}
        onSendZalo={() => window.open(`https://zalo.me/${ZALO_PHONE_ADMIN}?text=Mã:${generatedCode}`)}
        onSendWhatsapp={() => window.open(`https://wa.me/${ZALO_PHONE_ADMIN}?text=Mã:${generatedCode}`)}
        onSpinAgain={() => {
          setShowPopup(false);
          spinTheWheel();
        }}
        onOpenImage={handleOpenGiftImage}
      />
      {isGiftImageOpen && (
        <div className="lightbox-overlay" onClick={() => setIsGiftImageOpen(false)}>
          <div className="lightbox-content">
            {/* Gọi hàm getImageUrl trực tiếp ở đây */}
            <img src={`${import.meta.env.BASE_URL}img/${currentGiftImage}`} alt="Gift Preview" />
            <p style={{ textAlign: "center" }}>Chạm bất kỳ vị trí nào để đóng...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles định nghĩa bên ngoài component
const styles = {
  partyContainer: {
    background: "radial-gradient(circle, #1a1625 0%, #0a0712 100%)",
    borderRadius: "24px",
    color: "#fff",
    fontFamily: '"Quicksand", sans-serif',
    position: "relative",
    border: "3px solid #64748b",
    maxWidth: "1050px",
    margin: "10px auto",
    boxSizing: "border-box",
    padding: "25px",
  },
  headerArea: { textAlign: "center", marginBottom: "30px" },
  partyTitle: { margin: 0, fontWeight: "bold", letterSpacing: "0.5px" },
  partySubtitle: { fontSize: "13px", color: "#94a3b8", marginTop: "6px" },
  mainLayout: { display: "flex", justifyContent: "center", alignItems: "center" },
  wheelWrapper: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
  pointer: {
    position: "absolute",
    top: "-6px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    borderRightStyle: "solid",
    borderRightColor: "transparent",
    borderTopStyle: "solid",
    zIndex: 10,
  },
  canvasStyle: { borderRadius: "50%", background: "#13111c", maxWidth: "100%" },
  spinButton: { marginTop: "30px", color: "#fff", border: "none", fontWeight: "bold", borderRadius: "30px", cursor: "pointer" },
  formWrapper: {
    background: "rgba(255, 255, 255, 0.02)",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    boxSizing: "border-box",
  },
  formTitle: { margin: "0 0 18px 0", textAlign: "center" },
  inputGroup: { marginBottom: "15px" },
  label: { display: "block", marginBottom: "6px", fontSize: "12px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "11px",
    borderRadius: "10px",
    border: "1px solid #3f3f46",
    background: "#09070f",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  resultBox: { marginTop: "15px", padding: "15px", borderRadius: "12px", textAlign: "center" },
  resultText: { margin: "4px 0 8px 0", color: "#fff", fontWeight: "bold" },
  codeBadge: {
    background: "#ffffff",
    color: "#111111",
    padding: "6px 12px",
    borderRadius: "6px",
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "16px",
    letterSpacing: "0.5px",
  },
};
