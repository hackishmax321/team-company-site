// components/Brands.js
import React from 'react';
import './brands.css';

const Brands = () => {
  // Array of brand image paths (assuming they're in public/images/brands folder)
  const brands = [
    '/images/brands/no-image.png',
    '/images/brands/no-image.png',
    '/images/brands/no-image.png',
  ];

  return (
    <section className="brands-section">
      <div className="container">
        <h2 className="brands-title">Brands We've Worked With</h2>
        <p className="brands-subtitle">We're proud to have collaborated with these amazing companies</p>
        
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <img 
                src={brand} 
                alt={`Brand ${index + 1}`}
                className="brand-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x80/043068/ffffff?text=Brand+Logo';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;