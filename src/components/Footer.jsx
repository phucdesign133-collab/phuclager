import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaWallet, FaAddressBook, FaVideo, FaImages } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const location = useLocation();

  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
        <FaChartLine className="nav-icon" />
        <span>Tổng Quan</span>
      </Link>
      <Link to="/finance" className={location.pathname === '/finance' ? 'nav-item active' : 'nav-item'}>
        <FaWallet className="nav-icon" />
        <span>Tài Chính</span>
      </Link>
      <Link to="/clients" className={location.pathname === '/clients' ? 'nav-item active' : 'nav-item'}>
        <FaAddressBook className="nav-icon" />
        <span>Khách Hàng</span>
      </Link>
      <Link to="/production" className={location.pathname === '/production' ? 'nav-item active' : 'nav-item'}>
        <FaVideo className="nav-icon" />
        <span>Production</span>
      </Link>
      <Link to="/thumbs" className={location.pathname === '/thumbs' ? 'nav-item active' : 'nav-item'}>
        <FaImages className="nav-icon" />
        <span>Thumbs</span>
      </Link>
    </div>
  );
}