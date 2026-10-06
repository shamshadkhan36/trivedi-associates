import React from 'react';

// Real client and strategic partner logos for Trivedi Associates
const partnerCompanies = [
  {
    name: 'Water Kingdom by EsselWorld',
    src: '/assets/images/partners/water_kingdom.png'
  },
  {
    name: 'Signet Diamonds',
    src: '/assets/images/partners/signet_diamonds.png'
  },
  {
    name: 'Vyoman Infraprojects Pvt Ltd',
    src: '/assets/images/partners/vyoman_infraprojects.jpg'
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
    src: '/assets/images/partners/freeda_one.png'
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
