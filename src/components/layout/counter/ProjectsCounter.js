// components/ProjectsCounter.js
import React from 'react';
import { FaMobileAlt, FaLaptopCode, FaMicrochip, FaProjectDiagram } from 'react-icons/fa';
import './counter.css';

const ProjectsCounter = () => {
  // Sample data - you can replace with actual data from API or props
  const projectData = {
    total: 38,
    categories: [
      { type: 'Mobile Apps', count: 8, icon: <FaMobileAlt /> },
      { type: 'Web Apps', count: 21, icon: <FaLaptopCode /> },
      { type: 'IoT Apps', count: 9, icon: <FaMicrochip /> }
    ]
  };

  return (
    <section className="projects-counter-section">
      <div className="container">
        <h2 className="section-title">Our Projects</h2>
        <p className="brands-subtitle">Projects We Have Completed Previously</p>
        
        <div className="projects-counter-grid">
          {/* First Section: Overall Count */}
          <div className="total-projects-card">
            <div className="total-icon">
              <FaProjectDiagram />
            </div>
            <div className="total-count">{projectData.total}+</div>
            <div className="total-label">Completed Projects</div>
          </div>

          {/* Second Section: Category Breakdown */}
          <div className="categories-breakdown">
            {projectData.categories.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-icon">
                  {category.icon}
                </div>
                <div className="category-details">
                  <div className="category-count">{category.count}</div>
                  <div className="category-type">{category.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCounter;