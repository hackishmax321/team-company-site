// pages/Services.js
import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      icon: "💻"
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: "📱"
    },
    {
      title: "Consulting",
      description: "Strategic guidance to help your business leverage technology effectively.",
      icon: "📊"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Our Services</h1>
        <p>We offer a wide range of services to meet your business needs.</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;