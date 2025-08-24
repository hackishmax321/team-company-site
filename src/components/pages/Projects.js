// pages/Projects.js
import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A fully responsive online store with payment integration.",
      image: "🛒"
    },
    {
      title: "Corporate Website",
      description: "A modern website for a financial services company.",
      image: "🏢"
    },
    {
      title: "Mobile App",
      description: "A fitness tracking application with social features.",
      image: "🏃"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Our Projects</h1>
        <p>Take a look at some of our recent work and successful projects.</p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">{project.image}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;