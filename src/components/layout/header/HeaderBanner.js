import React, { useEffect, useRef } from 'react';
import { FaCode, FaServer, FaMobile, FaPlay } from 'react-icons/fa';
import './banner.css'

const HeaderBanner = () => {
    const videoRef = useRef(null);

  useEffect(() => {
    // Try to play the video automatically
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (error) {
        console.log("Autoplay prevented:", error);
        // Fallback: mute the video and try to play again
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      }
    };

    playVideo();
  }, []);

  return (
    <header className="header-banner">
      <div className="banner-content">
        <div className="text-content">
          <h1>Transform Your Business with Digital Innovation</h1>
          <p>We deliver cutting-edge software solutions that drive growth, efficiency, and competitive advantage for businesses of all sizes.</p>
          
          <div className="button-group">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Read More</button>
          </div>
        </div>
        
        <div className="media-content">
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="banner-video"
               width="460" height="260"
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="technologies">
            <div className="tech-item">
              <FaCode className="tech-icon" />
              <span>Web Solutions</span>
            </div>
            <div className="tech-item">
              <FaServer className="tech-icon" />
              <span>IoT Platforms</span>
            </div>
            <div className="tech-item">
              <FaMobile className="tech-icon" />
              <span>Mobile Apps</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;