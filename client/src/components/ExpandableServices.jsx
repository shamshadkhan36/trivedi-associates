import React, { useState } from 'react';

const servicePillars = [
  {
    id: 'design',
    number: '01',
    title: 'Design & Planning',
    tagline: 'Design & Spatial Planning',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 20h20" />
        <path d="M5 20V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    ),
    overview: 'Precision-driven design planning, spatial optimization, and photorealistic visualization for luxury developments.',
    deliverables: [
      'Floor Planning & Master Layouts',
      '3D Views & Modeling',
      'Elevation Design & Facades',
      'Interior Design & Detailing'
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
      'Site management and execution',
      'Billing consultation and budgeting',
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
      'All types of Building and plan approvals',
      'Fire and related NOCs',
      'Commencement certificate (CC) and Occupation certificate(OC)',
      'All other approvals'
    ]
  },
  {
    id: 'green',
    number: '04',
    title: 'Green Building Consultant',
    tagline: 'Sustainability and green consultancy',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    overview: 'Eco-conscious design review , energy and water saving methods, and green rating facilitation reducing lifecycle operating costs.',
    deliverables: [
      'Green building certification',
      'Building design review for sustainability',
      'Energy, water and waste management methods',
      'Eco friendly material advisory'
    ]
  },
  {
    id: 'auditing',
    number: '05',
    title: 'Auditing',
    tagline: 'Structural & Quality Audits',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
    overview: 'Rigorous structural stability assessment, construction quality control, and statutory compliance certifications.',
    deliverables: [
      'Structural stability & safety audit',
      'Quality assurance & material testing',
      'MEP & fire compliance inspections',
      'Structural distress & repair advisory'
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
        <h2 className="services-main-title">OUR 5 CORE SERVICES</h2>

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
              onClick={(e) => {
                if (!isExpanded) toggleCard(pillar.id);
              }}
            >
              {/* Card Header */}
              <div
                className="h-card-header"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(pillar.id);
                }}
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
