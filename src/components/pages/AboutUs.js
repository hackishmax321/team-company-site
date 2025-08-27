// pages/AboutUs.js
import React from 'react';
import CompanyInfo from '../layout/company/Company';

const AboutUs = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About Us</h1>
        <p>Learn about our company, mission, and values.</p>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Summary</h2>
            <p>Founded in 2023, we have been helping businesses transform their digital presence and achieve their goals. Our team of experts is dedicated to delivering exceptional results for our clients.</p>
            
            <div className="values-section">
              <h2>Our Values</h2>
              <ul className="values-list">
                <li className="value-item">
                  <div className="value-icon">✓</div>
                  <div className="value-content">
                    <h4>Quality in everything we do</h4>
                    <p>We never compromise on quality and strive for excellence in every project</p>
                  </div>
                </li>
                <li className="value-item">
                  <div className="value-icon">🚀</div>
                  <div className="value-content">
                    <h4>Innovation and creativity</h4>
                    <p>Pushing boundaries with creative solutions and innovative approaches</p>
                  </div>
                </li>
                <li className="value-item">
                  <div className="value-icon">😊</div>
                  <div className="value-content">
                    <h4>Customer satisfaction</h4>
                    <p>Your success is our success - we're committed to exceeding expectations</p>
                  </div>
                </li>
                <li className="value-item">
                  <div className="value-icon">🔍</div>
                  <div className="value-content">
                    <h4>Integrity and transparency</h4>
                    <p>Honest communication and ethical practices in all our dealings</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="about-image">
            <div className="placeholder-image"></div>
          </div>
        </div>
      </div>
      <CompanyInfo />
    </div>
  );
};

export default AboutUs;