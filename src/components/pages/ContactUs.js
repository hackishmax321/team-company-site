// pages/ContactUs.js
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>Get in touch with us for inquiries, quotes, or collaborations.</p>
        
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Here's how you can reach us.</p>
            
            <div className="contact-detail">
              <h3>Address</h3>
              <p>123 Business Street, City, Country</p>
            </div>
            
            <div className="contact-detail">
              <h3>Phone</h3>
              <p>+1 (123) 456-7890</p>
            </div>
            
            <div className="contact-detail">
              <h3>Email</h3>
              <p>info@business.com</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;