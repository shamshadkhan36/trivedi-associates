import React from 'react';

// Curated professional logo insignias for top real estate developers
const partnerCompanies = [
  {
    name: 'HIRANANDANI',
    subtitle: 'Communities',
    // Iconic circular geometric architectural monogram
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="50" cy="50" r="44" strokeWidth="3.5" />
        <line x1="50" y1="6" x2="50" y2="94" strokeWidth="3" />
        <line x1="22" y1="22" x2="78" y2="22" strokeWidth="2.5" />
        <line x1="22" y1="78" x2="78" y2="78" strokeWidth="2.5" />
        <path d="M30 36 L70 36 M30 50 L70 50 M30 64 L70 64" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'TATA REALTY',
    subtitle: 'Housing & Infrastructure',
    // Iconic Tata corporate twin-arc elliptical emblem
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="currentColor">
        <path d="M50 8 C26.8 8 8 26.8 8 50 C8 73.2 26.8 92 50 92 C73.2 92 92 73.2 92 50 C92 26.8 73.2 8 50 8 Z M50 14 C69.9 14 86 30.1 86 50 C86 69.9 69.9 86 50 86 C30.1 86 14 69.9 14 50 C14 30.1 30.1 14 50 14 Z" fillOpacity="0.3" />
        <path d="M50 22 C34.5 22 28 32 28 42 L42 42 C42 35 45 32 50 32 C55 32 58 35 58 42 L72 42 C72 32 65.5 22 50 22 Z" />
        <path d="M43 45 L57 45 L57 78 L43 78 Z" />
      </svg>
    )
  },
  {
    name: 'GODREJ',
    subtitle: 'Properties',
    // Godrej signature geometric petal / infinity wing emblem
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="currentColor">
        <path d="M20 50 C20 33.4 33.4 20 50 20 C66.6 20 80 33.4 80 50 C80 66.6 66.6 80 50 80 C33.4 80 20 66.6 20 50 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M35 50 Q50 28 65 50 Q50 72 35 50 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="6" />
      </svg>
    )
  },
  {
    name: 'LODHA',
    subtitle: 'Luxury Estates',
    // Lodha crown & diamond geometric emblem
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <polygon points="50,15 85,50 50,85 15,50" strokeWidth="3" />
        <polygon points="50,28 72,50 50,72 28,50" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        <line x1="50" y1="15" x2="50" y2="85" strokeWidth="1.5" />
        <line x1="15" y1="50" x2="85" y2="50" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'OBEROI',
    subtitle: 'Realty',
    // Oberoi Realty dual interlocking square diamond emblem
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="25" y="25" width="50" height="50" rx="3" strokeWidth="3" transform="rotate(45 50 50)" />
        <rect x="33" y="33" width="34" height="34" rx="2" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    name: 'L&T REALTY',
    subtitle: 'Larsen & Toubro',
    // L&T bold hexagonal industrial-architectural insignia
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3.5">
        <polygon points="50,12 86,32 86,68 50,88 14,68 14,32" strokeWidth="3.5" />
        <path d="M34 32 L34 68 L58 68" strokeWidth="4" strokeLinecap="square" />
        <path d="M52 38 L68 38 M60 38 L60 62" strokeWidth="3.5" />
      </svg>
    )
  },
  {
    name: 'SHAPOORJI',
    subtitle: 'Pallonji Group',
    // Shapoorji Pallonji heritage circular crest
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="50" cy="50" r="42" strokeWidth="3" />
        <circle cx="50" cy="50" r="34" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M36 38 C36 34 42 32 48 32 C54 32 58 35 58 40 C58 46 48 48 42 52 C36 56 36 62 36 68" strokeWidth="3" strokeLinecap="round" />
        <circle cx="64" cy="50" r="14" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: 'K RAHEJA',
    subtitle: 'Corp',
    // K Raheja architectural rising stepped pillar crest
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="20" y="52" width="16" height="34" strokeWidth="2.5" />
        <rect x="42" y="34" width="16" height="52" strokeWidth="2.5" />
        <rect x="64" y="16" width="16" height="70" strokeWidth="2.5" />
        <path d="M12 88 L88 88" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'PIRAMAL',
    subtitle: 'Realty',
    // Piramal faceted triangular prism geometry
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <polygon points="50,14 88,80 12,80" strokeWidth="3.5" />
        <polygon points="50,38 72,74 28,74" strokeWidth="2" />
        <line x1="50" y1="14" x2="50" y2="38" strokeWidth="2.5" />
        <line x1="12" y1="80" x2="28" y2="74" strokeWidth="2.5" />
        <line x1="88" y1="80" x2="72" y2="74" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    name: 'KALPATARU',
    subtitle: 'Developers',
    // Kalpataru sacred tree of life architectural emblem
    icon: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="50" cy="50" r="42" strokeWidth="3" />
        <path d="M50 78 L50 44" strokeWidth="4" />
        <path d="M50 44 C42 34 32 38 32 46 C32 54 44 54 50 62" strokeWidth="2.5" />
        <path d="M50 44 C58 34 68 38 68 46 C68 54 56 54 50 62" strokeWidth="2.5" />
        <path d="M50 36 C44 26 50 20 50 20 C50 20 56 26 50 36" strokeWidth="2.5" />
      </svg>
    )
  }
];

export default function CompanyMarquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-label-container">
        <span className="marquee-eyebrow">DEVELOPMENT ECOSYSTEM &amp; STRATEGIC PARTNERS</span>
      </div>

      <div className="marquee-outer-track">
        {/* Repeating content twice for infinite seamless loop */}
        <div className="marquee-inner-strip">
          {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
            <div key={index} className="marquee-company-card">
              <div className="company-icon-box">
                {company.icon}
              </div>
              <div className="company-text-box">
                <span className="company-logo-text">{company.name}</span>
                <span className="company-logo-sub">{company.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
