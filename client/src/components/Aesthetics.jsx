import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    image: '/assets/images/project_card_1.jpg',
    titleMain: 'Superior',
    titleItalic: 'Build Quality',
    subtitle: 'Shot at Trivedi Associates Property'
  },
  {
    id: 2,
    image: '/assets/images/project_card_2.jpg',
    titleMain: 'Meticulous',
    titleItalic: 'Craftsmanship',
    subtitle: 'Trivedi Signature Tower'
  },
  {
    id: 3,
    image: '/assets/images/project_card_3.jpg',
    titleMain: 'Sustainable',
    titleItalic: 'Living',
    subtitle: 'Trivedi Green Haven Estate'
  },
  {
    id: 4,
    image: '/assets/images/project_card_4.jpg',
    titleMain: 'Architectural',
    titleItalic: 'Finesse',
    subtitle: 'Trivedi Imperial Crest'
  }
];

export default function Aesthetics() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section className="aesthetics-section" id="aesthetics">
      <div className="aesthetics-container">
        {/* Left Column: Heading and Slider Controls */}
        <div className="aesthetics-text-col">
          <h2 className="aesthetics-title">
            A Seamless Blend of <br />
            <span className="italic-serif">Purpose</span> and <br />
            <span className="italic-serif">Aesthetics</span>
          </h2>
          <p className="aesthetics-desc">
            We are a design and engineering company with a focus on quality construction, architectural excellence, sustainable design, and innovation.
          </p>

          <div className="slider-controls">
            <button
              className="slider-btn"
              onClick={prevSlide}
              aria-label="Previous Project"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="slider-btn"
              onClick={nextSlide}
              aria-label="Next Project"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Carousel Track */}
        <div className="aesthetics-slider-col">
          <div
            className="cards-track"
            style={{ transform: `translateX(-${currentIndex * 568}px)` }}
          >
            {projects.map((proj) => (
              <div key={proj.id} className="project-card">
                <img
                  src={proj.image}
                  alt={`${proj.titleMain} ${proj.titleItalic}`}
                  className="project-card-img"
                />
                <div className="project-card-overlay">
                  <h3 className="card-title">
                    {proj.titleMain} <br />
                    <span className="italic-serif">{proj.titleItalic}</span>
                  </h3>
                  <p className="card-subtitle">{proj.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
