import React, { useState, useEffect, useRef } from 'react';

export default function Skylines() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    homes: 0,
    clients: 0,
    area: 0,
    trees: 0
  });

  const targets = {
    years: 45,
    homes: 27041,
    clients: 95288,
    area: 50.85,
    trees: 69357
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      setCounts({
        years: Math.floor(easeProgress * targets.years),
        homes: Math.floor(easeProgress * targets.homes),
        clients: Math.floor(easeProgress * targets.clients),
        area: parseFloat((easeProgress * targets.area).toFixed(2)),
        trees: Math.floor(easeProgress * targets.trees)
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section className="skylines-section" id="skylines" ref={sectionRef}>
      <div className="skylines-container">
        {/* Left Column: Colonnade Architectural Image */}
        <div className="skylines-col-image">
          <div className="colonnade-img-wrap">
            <img
              src="/assets/images/colonnade.png"
              alt="Trivedi Associates Colonnade Architecture"
              className="colonnade-img"
            />
          </div>
        </div>

        {/* Right Column: Narrative and Counters */}
        <div className="skylines-col-content">
          <h2 className="skylines-title">
            Shaping Skylines with
            <span className="italic-serif">Timeless Design</span>
          </h2>
          <p className="skylines-description">
            At Trivedi Associates, our developments are holistic, all crafted with meticulous planning, thoughtful design, attention to detail, and superior craftsmanship.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number-wrap">
                <span className="stat-number">{counts.years}</span>
                <span className="stat-symbol">+</span>
              </div>
              <div className="stat-label">Years of Expertise</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-wrap">
                <span className="stat-number">{counts.homes.toLocaleString()}</span>
              </div>
              <div className="stat-label">Homes Delivered</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-wrap">
                <span className="stat-number">{counts.clients.toLocaleString()}</span>
              </div>
              <div className="stat-label">Clients Welcomed</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-wrap">
                <span className="stat-number">{counts.area.toFixed(2)}</span>
              </div>
              <div className="stat-label">Mn. sq. ft. Area Developed</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-wrap">
                <span className="stat-number">{counts.trees.toLocaleString()}</span>
                <span className="stat-symbol">+</span>
              </div>
              <div className="stat-label">Trees Planted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
