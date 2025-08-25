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
            <h2>Our Story</h2>
            <p>Founded in 2010, we have been helping businesses transform their digital presence and achieve their goals. Our team of experts is dedicated to delivering exceptional results for our clients.</p>
            
            <h2>Our Mission</h2>
            <p>To provide innovative and effective solutions that help businesses thrive in the digital landscape. We believe in building long-term relationships with our clients based on trust and results.</p>
            
            <h2>Our Values</h2>
            <ul>
              <li>Quality in everything we do</li>
              <li>Innovation and creativity</li>
              <li>Customer satisfaction</li>
              <li>Integrity and transparency</li>
            </ul>
          </div>
          
          <div className="about-image">
            <div className="placeholder-image">Team Photo</div>
          </div>
        </div>
      </div>
      <CompanyInfo />
    </div>
  );
};

export default AboutUs;