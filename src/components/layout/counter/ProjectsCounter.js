// components/ProjectsCounter.js
import React, { useState, useEffect, useRef } from 'react';
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
        <h2 className="section-title-dark">Our Projects</h2>
        <p className="brands-subtitle">Projects We Have Completed Previously</p>
        
        <div className="projects-counter-grid">
          {/* First Section: Overall Count */}
          <div className="total-projects-card">
            <div className="circle-container">
              <div className="circle-background">
                <div className="total-icon">
                  <FaProjectDiagram />
                </div>
                <AnimatedCount end={projectData.total} className="total-count" />
                <div className="total-label">Completed Projects</div>
              </div>
            </div>
          </div>

          {/* Second Section: Category Breakdown */}
          <div className="categories-breakdown">
            {projectData.categories.map((category, index) => (
              <CategoryCircle 
                key={index} 
                category={category} 
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated Count Component
const AnimatedCount = ({ end, className }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 20);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className={className}>
      {count}+
    </div>
  );
};

// Category Circle Component
const CategoryCircle = ({ category, delay }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const duration = 1500;
          const increment = category.count / (duration / 20);

          const timer = setTimeout(() => {
            const countTimer = setInterval(() => {
              start += increment;
              if (start >= category.count) {
                setCount(category.count);
                clearInterval(countTimer);
              } else {
                setCount(Math.ceil(start));
              }
            }, 20);
          }, delay);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [category.count, delay, hasAnimated]);

  return (
    <div ref={ref} className="category-circle-item">
      <div className="circle-background category-circle">
        <div className="category-icon">
          {category.icon}
        </div>
        <div className="category-count">{count}</div>
      </div>
      <div className="category-type">{category.type}</div>
    </div>
  );
};

export default ProjectsCounter;