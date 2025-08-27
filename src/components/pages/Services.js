
import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Node.js, and cloud infrastructure.",
      icon: "💻",
      video: "/videos/web.mp4"
    },
    {
      title: "IoT Development",
      description: "Internet of Things solutions connecting devices, sensors, and systems for smart automation and data collection.",
      icon: "🌐",
      video: "/videos/iot.mp4"
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      icon: "📱",
      video: "/videos/mobile2.mp4"
    },
    {
      title: "Consulting",
      description: "Strategic guidance to help your business leverage technology effectively and maximize digital transformation.",
      icon: "📊",
      video: "/videos/consult.mp4"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Our Services</h1>
        <p className="page-subtitle">We offer comprehensive digital solutions to transform your business</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              {/* Top Half - Video and Icon */}
              <div className="service-top">
                <div className="video-container">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster={`/images/services/service-${index + 1}.jpg`}
                    className="service-video"
                  >
                    <source src={service.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-overlay"></div>
                </div>
                <div className="service-icon-circle">
                  <span className="service-icon">{service.icon}</span>
                </div>
              </div>
              
              {/* Bottom Half - Content */}
              <div className="service-bottom">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="service-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;