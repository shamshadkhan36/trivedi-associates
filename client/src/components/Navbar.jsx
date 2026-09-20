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
          <span className="brand-logo-sub">Architecture &amp; Living</span>
        </div>
      </a>

      <ul className="nav-links">
        <li><a href="#skylines" className="nav-link">Our Story</a></li>
        <li><a href="#aesthetics" className="nav-link">Residential</a></li>
        <li><a href="#aesthetics" className="nav-link">Commercial</a></li>
        <li><a href="#legacy" className="nav-link">Retail</a></li>
        <li><a href="#legacy" className="nav-link">Our Legacy</a></li>
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

        {/* Admin Portal Lock Icon Button */}
        <button
          className="nav-icon-btn"
          onClick={onOpenAdmin}
          aria-label="Admin Portal"
          title="Client Admin Portal (Manage Projects)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
