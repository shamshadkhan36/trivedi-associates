import React, { useState } from 'react';

const servicePillars = [
  {
    id: 'design',
    number: '01',
    title: 'Design & Planning',
    tagline: 'Comprehensive Architectural & Spatial Solutions',
    overview: 'From initial conceptual sketches to detailed execution blueprints, we deliver precision-driven 2D, 3D, and structural planning tailored for luxury residential, commercial, and mixed-use properties.',
    deliverables: [
      { name: 'Floor Planning & Master Layouts', desc: 'Optimized space utilization, circulation diagrams, and functional zoning.' },
      { name: '3D Views & Photorealistic Modeling', desc: 'High-definition architectural visualizations, walkthroughs, and material renderings.' },
      { name: 'Elevation Design & Facades', desc: 'Signature classical & contemporary facade treatments with distinct curb appeal.' },
      { name: 'Interior Architecture & Detailing', desc: 'Bespoke interior design, structural layouts, and MEP coordination.' }
    ]
  },
  {
    id: 'pmc',
    number: '02',
    title: 'Project Management Consultant (PMC)',
    tagline: 'End-to-End Construction Supervision & Delivery',
    overview: 'We safeguard client investments by overseeing every phase of construction, enforcing stringent quality benchmarks, budget control, contractor accountability, and timely completion.',
    deliverables: [
      { name: 'On-Site Supervision & Execution', desc: 'Daily construction monitoring, methodology verification, and progress reports.' },
      { name: 'Cost Estimation & Budget Optimization', desc: 'Bill of quantities (BOQ), tender preparation, and value engineering.' },
      { name: 'Quality Control & Structural Audit', desc: 'Material testing, compliance checks, and structural safety audits.' },
      { name: 'Timeline & Milestone Management', desc: 'Critical path tracking, contractor coordination, and handover assurance.' }
    ]
  },
  {
    id: 'liaisoning',
    number: '03',
    title: 'Liaisoning & Approvals',
    tagline: 'Government Sanctions & Regulatory Clearance',
    overview: 'Navigating regulatory frameworks with seasoned expertise. We manage and expedite all statutory sanctions, municipal permits, and compliance clearances across Maharashtra and pan-India.',
    deliverables: [
      { name: 'Municipal & BMC Approvals', desc: 'Building proposals, concession approvals, and IOD / CC sanctioning.' },
      { name: 'Environmental & Coastal Clearances', desc: 'MoEF clearances, CRZ compliances, and SEAC presentations.' },
      { name: 'Fire & Life Safety NOCs', desc: 'Chief Fire Officer (CFO) approvals, fire safety audits, and compliance.' },
      { name: 'Occupation Certificate (OC) & Handover', desc: 'Final compliances, completion certificates, and legal handovers.' }
    ]
  },
  {
    id: 'green',
    number: '04',
    title: 'Green Building Consultant',
    tagline: 'Sustainable Engineering & Environmental Certification',
    overview: 'Pioneering eco-conscious architecture that reduces environmental footprints while enhancing operational efficiency, occupant well-being, and asset valuation.',
    deliverables: [
      { name: 'IGBC & LEED Green Certification', desc: 'Accreditation facilitation from pre-certification to final rating.' },
      { name: 'Energy Modeling & Optimization', desc: 'Thermal simulation, daylight analysis, and renewable energy integration.' },
      { name: 'Water & Waste Management Systems', desc: 'Rainwater harvesting, greywater recycling, and net-zero waste planning.' },
      { name: 'Eco-Friendly Materials Advisory', desc: 'Sustainable procurement, carbon-footprint reduction, and healthy indoor air quality.' }
    ]
  }
];

export default function ExpandableServices({ onSelectService }) {
  // Allow multiple or single open; default first open
  const [expandedId, setExpandedId] = useState('design');

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="services-section" id="services">
      <div className="services-header-wrap">
        <div className="services-eyebrow">Our Core Pillars &bull; Trivedi Associates</div>
        <h2 className="services-main-title">
          Specialized Architectural &amp; <br />
          <span className="italic-serif">Engineering Expertise</span>
        </h2>
        <p className="services-sub-desc">
          Click any of our 4 foundational verticals below to explore deliverables, methodologies, and technical capabilities.
        </p>
      </div>

      <div className="services-list-container">
        {servicePillars.map((pillar) => {
          const isExpanded = expandedId === pillar.id;

          return (
            <div
              key={pillar.id}
              className={`service-card-item ${isExpanded ? 'expanded' : ''}`}
            >
              {/* Card Header (Click to Expand) */}
              <div
                className="service-card-header"
                onClick={() => toggleExpand(pillar.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="service-title-group">
                  <span className="service-number">{pillar.number}</span>
                  <div>
                    <h3 className="service-heading-text">{pillar.title}</h3>
                    <p className="service-tagline-text">{pillar.tagline}</p>
                  </div>
                </div>

                <div className="expand-indicator-btn">
                  <svg
                    className={`expand-chevron ${isExpanded ? 'rotated' : ''}`}
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expandable Content Area */}
              {isExpanded && (
                <div className="service-card-body">
                  <p className="service-overview-paragraph">{pillar.overview}</p>

                  <div className="deliverables-grid">
                    {pillar.deliverables.map((item, idx) => (
                      <div key={idx} className="deliverable-item">
                        <div className="deliverable-bullet-dot"></div>
                        <div>
                          <h4 className="deliverable-name">{item.name}</h4>
                          <p className="deliverable-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="service-card-action">
                    <button
                      className="service-enquire-btn"
                      onClick={() => onSelectService(pillar.title)}
                    >
                      Enquire for {pillar.title} &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
