import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenConnect, onOpenSearch, onOpenDrawer, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-nav ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#" className="brand-logo" aria-label="Trivedi Associates Home">
        <div className="brand-logo-icon">
          <svg viewBox="0 0 100 100" width="24" height="24">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.5" />
            <path d="M30 36 L70 36 M50 36 L50 78 M38 78 L62 78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="brand-logo-text">
          <span className="brand-logo-title">Trivedi Associates</span>
          <span className="brand-logo-sub">DESIGN &amp; PROJECT MANAGEMENT CONSULTANT</span>
        </div>
      </a>

      <ul className="nav-links">
        <li><a href="#hero" className="nav-link">HOME</a></li>
        <li><a href="#services" className="nav-link">SERVICES</a></li>
        <li><a href="#showcase" className="nav-link">PROJECTS</a></li>
        <li><a href="#about" className="nav-link">ABOUT</a></li>
        <li><a href="#insights" className="nav-link">INSIGHTS</a></li>
        <li><a href="#enquiry-form-section" className="nav-link">CONTACT</a></li>
      </ul>

      <div className="nav-actions">
        {/* Mobile Hamburger */}
        <button
          className="nav-icon-btn mobile-menu-btn"
          onClick={onOpenDrawer}
          aria-label="Toggle Navigation Menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Search Icon */}
        <button
          className="nav-icon-btn"
          onClick={onOpenSearch}
          aria-label="Search Developments"
          title="Search Developments"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Let's Connect CTA */}
        <button
          className="nav-connect-btn"
          onClick={onOpenConnect}
        >
          Let's Connect
        </button>
      </div>
    </header>
  );
}
