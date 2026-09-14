import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBullseye, FaWallet, FaEllipsisH } from "react-icons/fa";
import "../css/Footer.css";

export default function Footer() {
  const location = useLocation();

  return (
    <div className="mobile-bottom-nav">
      <Link to="/goal" className={location.pathname === "/goal" ? "nav-item active" : "nav-item"}>
        <FaBullseye className="nav-icon" />
        <span>PLAN</span>
      </Link>

      <Link to="/finance" className={location.pathname === "/finance" || location.pathname === "/" ? "nav-item active" : "nav-item"}>
        <FaWallet className="nav-icon" />
        <span>FINANCE</span>
      </Link>

      <Link to="/more" className={location.pathname === "/more" ? "nav-item active" : "nav-item"}>
        <FaEllipsisH className="nav-icon" />
        <span>MORE</span>
      </Link>
    </div>
  );
}
