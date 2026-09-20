import React from 'react';

export default function Hero({ onOpenConnect }) {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-container">
        <img
          src="/assets/images/hero_bg.png"
          alt="Trivedi Associates Architectural Excellence"
          className="hero-bg-image"
        />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-minimal-badge">TRIVEDI ASSOCIATES &bull; MUMBAI</div>
        <h1 className="hero-title">
          Architectural Ingenuity, <br />
          <span className="italic-serif">Precision Engineering</span>
        </h1>
        <p className="hero-minimal-sub">
          Master planning, project management consulting, government liaisoning, and IGBC/LEED green building advisory.
        </p>

        <div className="hero-cta-wrapper">
          <button onClick={scrollToServices} className="btn-hero-primary">
            Explore 4 Core Verticals
          </button>
          <button onClick={scrollToEnquiry} className="btn-hero-secondary">
            Enquire Now
          </button>
        </div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={scrollToServices}
        title="Scroll Down to Services"
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
