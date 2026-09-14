import React from "react";
import "../css/Header.css";
import { dropdownData } from "../datas/dropdownData";

const tabTitles = {
  finance: "Quản lý tài chính",
  goal: "Quản lý kế hoạch",
};

export default function Header({ currentTab = "finance", value, onChange, onUpdate }) {
  const options = dropdownData[currentTab] || dropdownData.finance;

  return (
    <div className="sticky-header-container">
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {tabTitles[currentTab] || "Quản lý tài chính"}
      </h2>

      <div className="dropdown-container">
        <select className="common-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <button type="button" className="dropdown-update-btn" onClick={onUpdate}>
          Cập nhật
        </button>
      </div>
    </div>
  );
}
