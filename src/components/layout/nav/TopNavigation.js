// components/TopNavigation.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './topNavigation.css';

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdown(!servicesDropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setServicesDropdown(false);
  };

  return (
    <nav className="top-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <h2>BusinessName</h2>
          </Link>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div 
            className="nav-item dropdown" 
            onMouseEnter={() => setServicesDropdown(true)} 
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <span className="nav-link" onClick={toggleServicesDropdown}>
              Services <i className="dropdown-arrow">▼</i>
            </span>
            <div className={`dropdown-menu ${servicesDropdown ? 'show' : ''}`}>
              <Link 
                to="/services#web-dev" 
                className={`dropdown-item ${location.hash === '#web-dev' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Web Development
              </Link>
              <Link 
                to="/services#app-dev" 
                className={`dropdown-item ${location.hash === '#app-dev' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                App Development
              </Link>
              <Link 
                to="/services#consulting" 
                className={`dropdown-item ${location.hash === '#consulting' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Consulting
              </Link>
            </div>
          </div>
          
          <Link 
            to="/projects" 
            className={`nav-item ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Projects
          </Link>
          
          <Link 
            to="/about-us" 
            className={`nav-item ${location.pathname === '/about-us' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Us
          </Link>
          
          <Link 
            to="/contact-us" 
            className={`nav-item ${location.pathname === '/contact-us' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact Us
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;