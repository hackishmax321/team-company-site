// components/Header.js
import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header-banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>Elevate Your Business to New Heights</h1>
          <p>We provide innovative solutions that drive growth and success for your business</p>
          <div className="banner-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;