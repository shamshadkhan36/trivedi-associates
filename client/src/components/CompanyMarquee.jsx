import React from 'react';

const partnerCompanies = [
  { name: 'HIRANANDANI', subtitle: 'Communities' },
  { name: 'GODREJ', subtitle: 'Properties' },
  { name: 'LODHA', subtitle: 'Luxury Residences' },
  { name: 'OBEROI', subtitle: 'Realty' },
  { name: 'L&T', subtitle: 'Realty & Infrastructure' },
  { name: 'SHAPOORJI', subtitle: 'Pallonji Group' },
  { name: 'TATA', subtitle: 'Housing & Realty' },
  { name: 'K RAHEJA', subtitle: 'Corp' },
  { name: 'PIRAMAL', subtitle: 'Realty' },
  { name: 'KALPATARU', subtitle: 'Developers' }
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
              <span className="company-logo-text">{company.name}</span>
              <span className="company-logo-sub">{company.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
