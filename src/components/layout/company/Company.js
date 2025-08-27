// components/CompanyInfo.js
import React from 'react';
import { FaLinkedin, FaGlobe, FaEnvelope, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './company.css';

const CompanyInfo = () => {
  // Company vision and mission data
  const companyData = {
    vision: "To revolutionize the digital landscape by creating innovative solutions that empower businesses and transform user experiences.",
    mission: "Delivering exceptional digital products through cutting-edge technology, creative design, and unwavering commitment to client success."
  };

  // Team members data
  const teamMembers = [
    {
      role: "Founder & Mobile app / IoT Developer",
      name: "Kavinda Kariyawasam",
      email: "kavindamaduranga822@gmail.com",
      website: "https://k.com",
      linkedin: "https://linkedin.com/in/alexjohnson",
      bio: "Turning bold ideas into digital realities that don’t just power businesses today, but shape the way the world transforms tomorrow."
    },
    {
      role: "Lead Developer",
      name: "D. P. I. Gayantha",
      email: "ishangayantha998@gmail.com",
      website: "https://ishan-portfolio-xbvh.onrender.com",
      linkedin: "https://www.linkedin.com/in/ishan-gayantha-9b2352166/",
      bio: "Full-stack developer specializing in React, Node.js, and cloud architecture with a passion for clean code."
    },
    // {
    //   role: "UI/UX Designer",
    //   name: "Marcus Rivera",
    //   email: "marcus@company.com",
    //   website: "https://marcusrivera.design",
    //   linkedin: "https://linkedin.com/in/marcusrivera",
    //   bio: "Creative designer focused on creating intuitive user experiences and beautiful interfaces that convert."
    // },
    // {
    //   role: "Project Manager",
    //   name: "Elena Rodriguez",
    //   email: "elena@company.com",
    //   website: "https://elenarodriguez.com",
    //   linkedin: "https://linkedin.com/in/elenarodriguez",
    //   bio: "Detail-oriented project manager ensuring seamless delivery and client satisfaction on every project."
    // }
  ];

  return (
    <section className="company-info-section">
      <div className="container">
        <h2 className="section-title">About Our Company</h2>
        <p>Learn about our company, mission, and values.</p>

        <br></br>
        
        {/* Vision and Mission Section */}
        <div className="vision-mission-grid">
          <div className="vision-card">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <h3>Our Vision</h3>
            <p className="quote-text">{companyData.vision}</p>
            <div className="quote-icon right">
              <FaQuoteRight />
            </div>
          </div>
          
          <div className="mission-card">
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <h3>Our Mission</h3>
            <p className="quote-text">{companyData.mission}</p>
            <div className="quote-icon right">
              <FaQuoteRight />
            </div>
          </div>
        </div>

        {/* Team Hierarchy Section */}
        <div className="team-section">
          <h3 className="team-title">Our Leadership Team</h3>
          
          <div className="team-hierarchy">
            {/* Founder/CEO at the top */}
            <div className="hierarchy-level founder-level">
              {teamMembers.filter(member => member.role.includes("CEO")).map((member, index) => (
                <TeamMemberCard key={index} member={member} isFounder={true} />
              ))}
            </div>
            
            {/* Leadership team below */}
            <div className="hierarchy-level team-level">
              {teamMembers.filter(member => !member.role.includes("CEO")).map((member, index) => (
                <TeamMemberCard key={index} member={member} isFounder={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Member Card Component with Circular Avatar
const TeamMemberCard = ({ member, isFounder }) => {
  // Generate avatar placeholder based on name initials
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Different avatar colors for variety
  const avatarColors = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-primary-bg)',
    'var(--color-secondary-bg)'
  ];
  
  const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return (
    <div className={`team-member-card ${isFounder ? 'founder' : ''}`}>
      {/* Circular Avatar */}
      <div className="member-avatar">
        <div 
          className="avatar-placeholder"
          style={{ backgroundColor: avatarColor }}
        >
          {getInitials(member.name)}
        </div>
      </div>
      
      <div className="member-header">
        <h4 className="member-role">{member.role}</h4>
        <h3 className="member-name">{member.name}</h3>
      </div>
      
      <p className="member-bio">{member.bio}</p>
      
      <div className="member-contact">
        <a href={`mailto:${member.email}`} className="contact-link" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href={member.website} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Website">
          <FaGlobe />
        </a>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default CompanyInfo;