import React from 'react';

export default function Hero({ onOpenConnect }) {
  const scrollToSkylines = () => {
    const el = document.getElementById('skylines');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-container">
        <img
          src="/assets/images/hero_bg.png"
          alt="Trivedi Associates Neoclassical Architecture"
          className="hero-bg-image"
        />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-subtitle">Trivedi Associates &bull; Mumbai</p>
        <h1 className="hero-title">
          Crafting Architectural Marvels with <br />
          <span className="italic-serif">Unrivaled Heritage</span>
        </h1>
        <div className="hero-cta-wrapper">
          <a href="#aesthetics" className="btn-hero-primary">
            Explore Developments
          </a>
          <button
            className="btn-hero-secondary"
            onClick={onOpenConnect}
          >
            Let's Connect
          </button>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={scrollToSkylines}
        title="Scroll Down"
        role="button"
        tabIndex={0}
      >
        <div className="mouse-icon">
          <div className="mouse-dot"></div>
        </div>
      </div>
    </section>
  );
}
