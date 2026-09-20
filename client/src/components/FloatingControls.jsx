import React, { useState, useEffect } from 'react';

export default function FloatingControls({ onOpenConnect }) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions">
      {/* Floating Emblem Button */}
      <button
        className="floating-emblem-btn"
        onClick={onOpenConnect}
        title="Quick Connect with Trivedi Associates"
        aria-label="Quick Connect"
      >
        <svg viewBox="0 0 100 100" width="26" height="26">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M28 34 L72 34 M50 34 L50 80 M36 80 L64 80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Floating Back to Top Button */}
      <button
        className={`floating-back-top ${showTopBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Back to Top"
        aria-label="Back to Top"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
