import React, { useState, useEffect } from 'react';

const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog_1',
    title: "Navigating Mumbai's DCPR 2034: Essential Statutory Approvals for High-Rise Developments",
    slug: "navigating-mumbai-dcpr-2034",
    category: "Liaisoning & Approvals",
    author: "Trivedi Associates Editorial Team",
    date: "October 2026",
    readTime: "5 min read",
    image: "assets/images/project_card_2.jpg",
    excerpt: "A comprehensive developer's roadmap through MCGM/BMC building proposals, DP 2034 concessions, High-Rise Committee clearances, and CFO Fire NOC compliance to secure timely Commencement Certificates (CC).",
    content: "Developing real estate landmarks across Greater Mumbai demands rigorous technical precision and deep familiarity with the Development Control and Promotion Regulations (DCPR 2034). For high-density commercial towers and luxury residential high-rises, statutory compliance determines project feasibility and investor returns.\n\nKey Regulatory Pathways Under BMC:\n1. Scrutinized Building Proposal Submission: Preparing master architectural layouts in full conformance with FSI, TDR, and premium fungible compensatory calculations.\n2. Multi-Department Clearances: Coordinating environmental impact assessments (EIA), Chief Fire Officer (CFO) approvals, tree authority sanctions, and civil aviation height permissions.\n3. Transitioning from IOD to CC & OC: Securing the Intimation of Disapproval (IOD), satisfying statutory compliance requisites for the Commencement Certificate (CC), and guiding the project through to Final Occupancy Certificate (OC).\n\nAt Trivedi Associates, our liaisoning vertical bridges neoclassical architectural design with administrative policy, minimizing regulatory bottlenecks for Mumbai’s foremost developers."
  },
  {
    id: 'blog_2',
    title: "The Financial & Environmental Return of IGBC & LEED Green Building Certifications",
    slug: "financial-return-igbc-leed-green-building",
    category: "Green Building",
    author: "Trivedi Associates Sustainability Cell",
    date: "September 2026",
    readTime: "4 min read",
    image: "assets/images/project_card_3.jpg",
    excerpt: "How lifecycle energy modeling, water conservation loops, and IGBC/LEED benchmarks reduce operational overhead while commanding premium rental yields and institutional investment.",
    content: "Sustainable construction has transcended corporate social responsibility to become a decisive commercial advantage. Institutional investors and premium corporate tenants actively prioritize energy-efficient assets that minimize carbon intensity.\n\nCore Advantages of Certified Green Architecture:\n1. Reduced Operational Expenditure (OpEx): Advanced HVAC energy modeling, high-performance low-E double glazing, and passive shading reduce energy draw by 25% to 40%.\n2. Water Neutrality & Conservation: On-site sewage treatment plants (STP), rainwater harvesting, and drip-irrigation landscapes drastically curb municipal water dependency.\n3. Regulatory Incentives: Multiple municipal corporations across India, including Maharashtra authorities, offer additional FSI rebates and concession incentives for certified Green Buildings.\n\nAs accredited IGBC and LEED consultants, Trivedi Associates guides developers through every credit calculation from concept to official certification."
  },
  {
    id: 'blog_3',
    title: "Mitigating Capital Risk in Redevelopment: The Strategic Role of PMC & Technical Audits",
    slug: "mitigating-capital-risk-pmc-audits",
    category: "PMC & Auditing",
    author: "Trivedi Associates Technical Advisory",
    date: "August 2026",
    readTime: "6 min read",
    image: "assets/images/project_card_1.jpg",
    excerpt: "Why independent project management consulting (PMC), contractor bill verification, and non-destructive structural audits (NDT) are vital to protecting developer balance sheets.",
    content: "In large-scale society redevelopment, slum rehabilitation (SRA), and luxury residential transformations across Western and Central Mumbai, cost overruns and structural variances pose critical threats to completion.\n\nWhy Independent PMC is Vital:\n1. Milestone & Contractor Bill Certification: Independent site engineers scrutinize contractor measurements, steel consumption, and concrete grade test reports prior to any financial disbursement.\n2. Non-Destructive Testing (NDT) & Structural Audits: Ultrasonic pulse velocity and rebound hammer tests ensure that load-bearing columns and retrofitted frameworks maintain structural integrity.\n3. Turnkey Schedule Governance: Maintaining strict critical path methods (CPM) prevents the compounding delays that erode project profitability.\n\nWith Trivedi Associates acting as your trusted Project Management Consultant, developers gain total statutory certainty, transparent budget governance, and superior neoclassical execution."
  }
];

export default function BlogSection() {
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem('ta_blog_posts');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_BLOG_POSTS;
  });

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [readingPost, setReadingPost] = useState(null);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'ta_blog_posts') {
        try {
          const updated = JSON.parse(e.newValue || '[]');
          if (Array.isArray(updated) && updated.length > 0) {
            setPosts(updated);
          } else {
            setPosts(DEFAULT_BLOG_POSTS);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const categories = ['ALL', ...new Set(posts.map((p) => p.category).filter(Boolean))];

  const filteredPosts = activeFilter === 'ALL'
    ? posts
    : posts.filter((p) => p.category === activeFilter);

  const handleOpenPost = (post) => {
    setReadingPost(post);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setReadingPost(null);
    document.body.style.overflow = '';
  };

  const handleConsultCTA = (postTitle) => {
    handleCloseModal();
    const enquirySec = document.getElementById('enquiry-form-section');
    if (enquirySec) {
      enquirySec.scrollIntoView({ behavior: 'smooth' });
      const detailInput = document.getElementById('enqDetail');
      if (detailInput) {
        detailInput.value = `Consultation regarding: ${postTitle}`;
      }
    }
  };

  return (
    <>
      <section className="blog-section" id="blog">
        <div className="blog-container">
          <div className="blog-header-wrap">
            <div>
              <span className="services-eyebrow">THOUGHT LEADERSHIP &bull; TRIVEDI ASSOCIATES</span>
              <h2 className="services-main-title" style={{ textAlign: 'left', marginBottom: '12px' }}>
                Architectural Insights &amp; <br />
                <span className="italic-serif">Industry Publications</span>
              </h2>
              <p className="blog-header-sub">
                Authoritative perspectives on BMC municipal regulations, sustainable design, PMC governance, and structural auditing across Mumbai and India.
              </p>
            </div>
            <div className="blog-header-actions">
              <div className="blog-category-filter">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`blog-filter-pill ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat === 'ALL' ? 'All Publications' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card" onClick={() => handleOpenPost(post)}>
                <div className="blog-card-media">
                  <img
                    src={post.image || 'assets/images/project_card_1.jpg'}
                    alt={post.title}
                    loading="lazy"
                  />
                  <span className="blog-card-category-badge">{post.category || 'Article'}</span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>{post.date || '2026'}</span>
                    <span>&bull;</span>
                    <span>{post.readTime || '4 min read'}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-author">{post.author || 'Trivedi Associates'}</span>
                    <span className="blog-card-read-more">
                      Read Publication <span className="arrow">&rarr;</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      {readingPost && (
        <div
          className="blog-modal-overlay active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains('blog-modal-overlay')) handleCloseModal();
          }}
        >
          <div className="blog-modal-content">
            <button
              className="blog-modal-close"
              aria-label="Close Article"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="blog-modal-hero">
              <img
                src={readingPost.image || 'assets/images/project_card_1.jpg'}
                alt={readingPost.title}
              />
            </div>
            <div className="blog-modal-body-content">
              <div className="blog-modal-meta-row">
                <span className="blog-modal-badge">{readingPost.category || 'Article'}</span>
                <span className="blog-modal-meta-text">
                  {readingPost.date || '2026'} &bull; {readingPost.readTime || '4 min read'}
                </span>
              </div>
              <h2 className="blog-modal-title">{readingPost.title}</h2>
              <div className="blog-modal-author-bar">
                <div className="blog-modal-avatar">TA</div>
                <div>
                  <div className="blog-modal-author-info">
                    {readingPost.author || 'Trivedi Associates Editorial Team'}
                  </div>
                  <div className="blog-modal-author-role">Technical &amp; Statutory Advisory Cell</div>
                </div>
              </div>
              <div className="blog-modal-prose">
                {(readingPost.content || '')
                  .split('\n')
                  .filter((p) => p.trim().length > 0)
                  .map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
              </div>
              <div className="blog-modal-cta-box">
                <div>
                  <div className="blog-modal-cta-text">Require Advisory on this Subject?</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                    Connect with our senior partners for confidential project consultation.
                  </div>
                </div>
                <button
                  className="nav-connect-btn"
                  style={{ padding: '10px 22px', fontSize: '11.5px' }}
                  onClick={() => handleConsultCTA(readingPost.title)}
                >
                  Consult With Our Team &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
