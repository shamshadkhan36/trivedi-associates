import React from 'react';

export default function Hero({ onOpenConnect }) {
  const customBanner = typeof window !== 'undefined' ? localStorage.getItem('ta_hero_banner') : null;
  const bannerSrc = customBanner || '/assets/images/hero_bg.png';

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
          src={bannerSrc}
          alt="Trivedi Associates Design Excellence"
          className="hero-bg-image"
        />
      </div>
      <div className="hero-overlay"></div>

      {/* Bottom Hero Action Bar: Two CTA Buttons */}
      <div className="hero-bottom-bar">
        <button onClick={scrollToServices} className="btn-hero-primary">
          Explore 5 Core Services
        </button>

        <button onClick={scrollToEnquiry} className="btn-hero-secondary">
          Enquire Now
        </button>
      </div>
    </section>
  );
}
