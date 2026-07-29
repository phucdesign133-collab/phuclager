import React from "react";

const BackgroundText = ({ category }) => {
  // Cấu hình nội dung cho từng tab
  const content = {
    "su-kien": {
      title: "Memorable Events",
      subtitle: "Milestones and grand celebrations we have successfully brought to life."
    },
    "thiet-ke": {
      title: "Creative Design",
      subtitle: "Where imagination takes flight through unique and professional visuals."
    },
    "bang-gia": {
      title: "Service Pricing",
      subtitle: "Optimized packages tailored to deliver maximum value for your projects."
    },
    default: {
      title: "Captured Moments",
      subtitle: "Incredible snapshots preserved by the Phuc Party team and you."
    },
    balloonClub: {
      title: "Balloon Club",
      subtitle: "An ecosystem for Balloon Artists featuring Academy, AI Tools, and trusted partners."
    }
  };

  const data = content[category] || content.default;

  const styles = {
    wrapper: {
      padding: "40px 20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Segoe UI', sans-serif"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2d3436",
      margin: "0 0 15px 0",
      lineHeight: "1.2"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#636e72",
      fontWeight: "400",
      maxWidth: "600px",
      margin: "0 auto"
    },
    line: {
      width: "60%",
      height: "1px",
      backgroundColor: "#dfe6e9",
      marginTop: "40px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>{data.title}</h1>
      <p style={styles.subtitle}>{data.subtitle}</p>
      <div style={styles.line}></div>
    </div>
  );
};

export default BackgroundText;