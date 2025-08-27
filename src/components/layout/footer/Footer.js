// components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section social-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
          <p>Follow us on social media to stay updated with our latest news and offers.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>123 Business Street, City</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: info@business.com</li>
            <li>Hours: Mon-Fri 9am-5pm</li>
          </ul>
        </div>
      </div>

      <div className="vehicles-container">
        <img src="/images/background/car.png" alt="Car" className="vehicle car-1" />
        <img src="/images/background/car2.png" alt="Car 2" className="vehicle car-2" />
        <img src="/images/background/bus.png" alt="Bus" className="vehicle bus" />
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Business Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;