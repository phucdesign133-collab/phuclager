import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <div className="search-bar-container" style={{ margin: "8px 16px 4px 16px" }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        background: "#f8fafc", 
        borderRadius: "8px", 
        padding: "6px 12px", 
        width: "100%",
        border: "1px solid #e2e8f0",
        boxSizing: "border-box"
      }}>
      
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder || "Tìm kiếm..."}
          style={{ margin:"0 !important",padding:"0 !important",
            border: "none", 
            background: "transparent", 
            outline: "none", 
            width: "100%", 
            fontSize: "13.5px",
            color: "#1e293b"
          }}
        />
      </div>
    </div>
  );
}