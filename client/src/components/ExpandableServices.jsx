import React, { useState } from 'react';

const servicePillars = [
  {
    id: 'design',
    number: '01',
    title: 'Design & Planning',
    tagline: 'Architectural & Spatial Planning',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 20h20" />
        <path d="M5 20V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    ),
    overview: 'Precision-driven architectural planning, spatial optimization, and photorealistic visualization for luxury developments.',
    deliverables: [
      'Floor Planning & Master Layouts',
      '3D Views & Modeling',
      'Elevation Design & Facades',
      'Interior Architecture & Detailing'
    ]
  },
  {
    id: 'pmc',
    number: '02',
    title: 'Project Management Consultant (PMC)',
    tagline: 'Site Supervision & Quality Audit',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
    overview: 'End-to-end execution oversight, cost management, contractor accountability, and timely milestone delivery.',
    deliverables: [
      'Site Supervision & Execution',
      'Cost Estimation & Budgeting',
      'Quality Control & Audit',
      'Timeline & Milestone Tracking'
    ]
  },
  {
    id: 'liaisoning',
    number: '03',
    title: 'Liaisoning & Approvals',
    tagline: 'Sanctions & Government Approvals',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    overview: 'Expedited statutory compliance, building proposals, municipal approvals, and environmental clearances.',
    deliverables: [
      'Municipal & BMC Approvals',
      'Environmental Clearance (MoEF)',
      'Fire & Life Safety NOCs',
      'Occupation Certificate (OC)'
    ]
  },
  {
    id: 'green',
    number: '04',
    title: 'Green Building Consultant',
    tagline: 'Sustainable LEED & IGBC Advisory',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    overview: 'Eco-conscious design, energy modeling, and green rating facilitation reducing lifecycle operating costs.',
    deliverables: [
      'IGBC & LEED Certification',
      'Energy Modeling & Daylighting',
      'Water & Waste Management',
      'Eco-Friendly Materials Advisory'
    ]
  }
];

export default function ExpandableServices({ onSelectService }) {
  // Support active expansion (default first open or toggleable)
  const [expandedIds, setExpandedIds] = useState(['design']);

  const toggleCard = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(servicePillars.map((p) => p.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  return (
    <section className="services-section" id="services">
      <div className="services-header-wrap">
        <div className="services-eyebrow">OUR 4 CORE PILLARS &bull; TRIVEDI ASSOCIATES</div>
        <h2 className="services-main-title">
          Specialized Architectural &amp; <br />
          <span className="italic-serif">Engineering Verticals</span>
        </h2>
        <p className="services-sub-desc">
          Click any card below to expand deliverables, technical scopes, and consulting capabilities.
        </p>

        {/* Quick Toggle Controls */}
        <div className="services-toggle-bar">
          <button onClick={expandAll} className="services-mini-toggle">
            Expand All
          </button>
          <span style={{ color: '#CCC' }}>&bull;</span>
          <button onClick={collapseAll} className="services-mini-toggle">
            Collapse All
          </button>
        </div>
      </div>

      {/* Horizontal 4-Column Layout */}
      <div className="services-grid-horizontal">
        {servicePillars.map((pillar) => {
          const isExpanded = expandedIds.includes(pillar.id);

          return (
            <div
              key={pillar.id}
              className={`horizontal-service-card ${isExpanded ? 'expanded' : ''}`}
            >
              {/* Card Header */}
              <div
                className="h-card-header"
                onClick={() => toggleCard(pillar.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="h-card-top-row">
                  <div className="h-card-number">{pillar.number}</div>
                  <div className="h-card-icon-wrap">{pillar.icon}</div>
                </div>

                <h3 className="h-card-title">{pillar.title}</h3>
                <p className="h-card-tagline">{pillar.tagline}</p>

                <div className="h-card-expand-prompt">
                  <span>{isExpanded ? 'Collapse' : 'Click to Expand'}</span>
                  <svg
                    className={`h-chevron ${isExpanded ? 'rotated' : ''}`}
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expandable Content Area */}
              {isExpanded && (
                <div className="h-card-expanded-body">
                  <p className="h-card-overview">{pillar.overview}</p>

                  <div className="h-deliverables-list">
                    <div className="h-deliverables-heading">Key Deliverables:</div>
                    {pillar.deliverables.map((item, idx) => (
                      <div key={idx} className="h-deliverable-row">
                        <span className="h-check-bullet">&#10003;</span>
                        <span className="h-deliverable-text">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="h-enquire-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(pillar.title);
                    }}
                  >
                    Enquire for {pillar.number} &rarr;
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
