import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col-brand">
          <div className="brand-logo">
            <div className="brand-logo-icon">
              <svg viewBox="0 0 100 100" width="24" height="24">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.5" />
                <path d="M30 36 L70 36 M50 36 L50 78 M38 78 L62 78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="brand-logo-text">
              <span className="brand-logo-title">Trivedi Associates</span>
              <span className="brand-logo-sub">Trivedi Associates . Com</span>
            </div>
          </div>
          <p>
            Mastering the art of neoclassical architecture and superior craftsmanship. Crafting enduring living spaces across Mumbai, Powai, Thane, and beyond.
          </p>
        </div>

        <div>
          <h4 className="footer-col-title">Portfolios</h4>
          <ul className="footer-col-links">
            <li><a href="#aesthetics">Luxury Residential</a></li>
            <li><a href="#aesthetics">Signature Commercial</a></li>
            <li><a href="#legacy">High-Street Retail</a></li>
            <li><a href="#skylines">Green Initiatives</a></li>
            <li><a href="#legacy">Township Masterplans</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Locations</h4>
          <ul className="footer-col-links">
            <li><a href="#legacy">Powai Estates</a></li>
            <li><a href="#legacy">Thane Greenery</a></li>
            <li><a href="#legacy">South Mumbai Towers</a></li>
            <li><a href="#skylines">Bandra Residences</a></li>
            <li><a href="#contact">Upcoming Releases</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Headquarters &amp; Direct</h4>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Trivedi Associates Corporate Chambers, Mumbai, Maharashtra, India</span>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a href="tel:7977117256">+91 7977117256</a>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:trivedi.associates13@gmail.com">trivedi.associates13@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 Trivedi Associates . Com &bull; All Rights Reserved.</div>
        <div>Designed for Luxury Architectural Distinction</div>
      </div>
    </footer>
  );
}
