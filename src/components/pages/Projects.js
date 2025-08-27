// pages/Projects.js
import React, { useState } from 'react';
import projects from '../../data/Projects'; 

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all unique tags from projects
  const allTags = ['all', ...new Set(projects.flatMap(project => project.tags))];

  // Filter projects based on selected tag
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  return (
    <div className="projects-page">
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Our Projects</h1>
          <p className="page-description">
            Explore our portfolio of innovative solutions across various industries and technologies.
          </p>
          
          {/* Filter buttons */}
          <div className="projects-filter">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Projects grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div 
                  className="project-image"
                  onClick={() => openModal(project)}
                >
                  <img 
                    src={`/images/projects/${project.images[0]}`} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  <div className="project-overlay">
                    <span className="view-project-btn">View Project</span>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">
                    {project.description.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description
                    }
                  </p>
                  
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="project-tag">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag">+{project.tags.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="project-actions">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found with the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-image-container">
              <img 
                src={`/images/projects/${selectedProject.images[currentImageIndex]}`} 
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                className="modal-image"
              />
              
              {selectedProject.images.length > 1 && (
                <>
                  <button className="image-nav prev" onClick={prevImage}>
                    &#8249;
                  </button>
                  <button className="image-nav next" onClick={nextImage}>
                    &#8250;
                  </button>
                  
                  <div className="image-counter">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              )}
            </div>
            
            <div className="modal-body">
              <p>{selectedProject.description}</p>
              
              <div className="modal-actions">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  View Code
                </a>
                <a 
                  href={selectedProject.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-link primary"
                >
                  Visit Live Site
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;