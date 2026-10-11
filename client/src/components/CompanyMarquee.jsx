import React from 'react';

// Real client and strategic partner logos for Trivedi Associates
const partnerCompanies = [
  {
    name: 'Water Kingdom by EsselWorld',
    src: '/assets/images/partners/waterpark_esselworld.png?v=20261011_v3'
  },
  {
    name: 'Signet Diamonds',
    src: '/assets/images/partners/signet_diamonds.png'
  },
  {
    name: 'Vyoman Infraprojects Pvt Ltd',
    src: '/assets/images/partners/vyoman_infraprojects.png'
  },
  {
    name: 'Sundaram Infra Pvt Ltd',
    src: '/assets/images/partners/sundaram_infra.png'
  },
  {
    name: 'Rays of Life Foundation',
    src: '/assets/images/partners/rays_of_life_foundation.png'
  },
  {
    name: 'The Wisdom Club',
    src: '/assets/images/partners/the_wisdom_club.jpg'
  },
  {
    name: 'Majha Ghar Foundation',
    src: '/assets/images/partners/majha_ghar_foundation.png'
  },
  {
    name: 'Suryoday Trust',
    src: '/assets/images/partners/suryoday_trust.jpg'
  },
  {
    name: 'Nautai Marine Shipyard',
    src: '/assets/images/partners/nautai_marine_shipyard.jpg'
  },
  {
    name: 'Freeda One Builders & Developers',
    src: '/assets/images/partners/freeda_one_clean.png?v=20261011_v4'
  }
];

export default function CompanyMarquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-label-container">
        <h2 className="services-main-title" style={{ marginTop: '6px', marginBottom: '4px', color: '#FFFFFF', fontSize: 'clamp(24px, 3.5vw, 36px)' }}>
          OUR CLIENTELE
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--color-gold)', fontSize: '13px', letterSpacing: '1.5px', marginBottom: '24px', textTransform: 'uppercase' }}>
          Strategic Partners &bull; Institutional Collaborations
        </p>
      </div>

      <div className="marquee-outer-track">
        {/* Repeating content twice for infinite seamless loop */}
        <div className="marquee-inner-strip">
          {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
            <div key={index} className="marquee-company-card" title={company.name}>
              <img
                src={company.src}
                alt={company.name}
                className="partner-logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
