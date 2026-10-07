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
        <div className="brand-logo-media">
          <img src="/assets/images/logo_white.png" alt="Trivedi Associates" className="site-header-logo" />
          <span className="brand-logo-sub">DESIGN &amp; PROJECT MANAGEMENT CONSULTANT</span>
        </div>
      </a>

      <ul className="nav-links">
        <li><a href="#hero" className="nav-link">HOME</a></li>
        <li><a href="#services" className="nav-link">SERVICES</a></li>
        <li><a href="#showcase" className="nav-link">PROJECTS</a></li>
        <li><a href="#about" className="nav-link">ABOUT</a></li>
        <li><a href="#blog" className="nav-link">BLOG</a></li>
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
