import React, { useState, useEffect } from 'react';

const BLOG_STORAGE_VERSION = 'v20261011_only_2_pmc_blogs';
const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog_pmc_mumbai',
    title: "Why a Good PMC Can Save Your Construction Project in Mumbai",
    slug: "why-a-good-pmc-can-save-your-construction-project-in-mumbai",
    category: "PMC & Cost Control",
    author: "Trivedi Associates Editorial Team",
    date: "October 2026",
    readTime: "4 min read",
    image: "assets/images/project_card_1.jpg",
    excerpt: "Building in Mumbai is not easy. Land is expensive, approvals take time, and space is always tight. Discover why a qualified PMC and proactive Value Engineering protect project timelines, budgets, and bottom lines.",
    content: "Building in Mumbai is not easy. Land is expensive, approvals take time, and space is always tight. Many owners and developers start a project with a clear budget and a clear deadline, only to see both slip halfway through. This is where a PMC in Mumbai makes a real difference. A Project Management Consultant looks after the project from the first drawing to the final handover, so you can focus on your business while the site runs smoothly.\n\nSo what does a Project Management Consultant in Mumbai actually do? Think of them as your representative on site. They plan the schedule, prepare the budget, check the quality of work, coordinate with contractors and architects, and keep you informed at every stage. If something goes wrong, they spot it early and fix it before it becomes a costly problem. For anyone who does not have the time or technical knowledge to watch every detail, this support is very valuable.\n\nOne of the most useful tools a good consultant brings is Value Engineering. In simple words, it means finding smarter ways to get the same result at a lower cost. This could be choosing a better material, changing a design detail, or improving how the work is sequenced on site. The aim is never to cut quality. The aim is to remove waste and spend money only where it adds value. Many projects save a good amount of money this way without any change in strength, safety or finish.\n\nMany people believe that hiring a consultant adds to the project cost. In reality, a cost effective PMC in Mumbai usually pays for itself. Avoiding delays, preventing rework, controlling material wastage and negotiating better with vendors can save far more than the consultancy fee. If you are working with a tight budget, an affordable PMC can give you the same planning and supervision that large projects enjoy, without stretching your finances.\n\nWhen choosing a PMC, look for a team that has handled projects similar to yours, understands local rules and approvals, and is honest about costs and timelines. Ask for clear reporting and regular site updates. The right partner will treat your project like their own. If you are planning a new residential, commercial or industrial project, speak to our team today. We will help you build on time, within budget, and without unnecessary stress."
  },
  {
    id: 'blog_pmc_agencies',
    title: "How a PMC Brings Every Agency on Your Site Together",
    slug: "how-a-pmc-brings-every-agency-on-your-site-together",
    category: "Site Coordination & Engineering",
    author: "Trivedi Associates Technical Team",
    date: "October 2026",
    readTime: "5 min read",
    image: "assets/images/project_card_2.jpg",
    excerpt: "A construction project brings structural engineers, architects, MEP vendors, and fabricators together. Learn how a dedicated PMC bridges civil, steel, PEB, and MEP agencies to eliminate costly site clashes and maintain uninterrupted progress.",
    content: "A construction project is never the work of just one person. There are structural engineers, architects, contractors, MEP vendors, suppliers and many others, each with their own schedule and priorities. When these teams work without proper coordination, delays and arguments are almost certain. A Project Management Consultant (PMC) sits at the centre of all this, and PMC collaborates with all agencies for faster and steady work progress. Instead of the owner chasing ten different people, one team keeps everything moving in the same direction.\n\nTake the structure of a building first. Concrete structures are the most common choice for residential towers, hospitals and commercial complexes because they are strong, durable and easy to shape. Steel structures, on the other hand, are preferred when a project needs long spans, higher speed and lighter weight. Choosing between the two is not a small decision, and it affects cost, timeline and maintenance for years. A good PMC works with the design team to compare both options and picks what suits your project, budget and site conditions.\n\nFor factories, warehouses and large industrial sheds, many owners now go for PEB, also known as Pre Engineered Buildings. These are designed and fabricated in a factory and then assembled on site, which saves a lot of time and reduces wastage. But PEB work needs careful planning, because even a small mismatch between the foundation and the steel frame can stop work for days. The PMC checks drawings, tracks fabrication and makes sure the civil and steel teams are in sync.\n\nThen come the services that make a building actually usable: electrical, plumbing, fire fighting, ventilation and air conditioning. Delays often happen here because MEP vendors enter the site late or work without knowing what the structure team has already done. A PMC fixes this by planning the order of work well in advance, checking vendor quality and clearing clashes on paper before they turn into breakages on site. Structural engineers also get timely information, so their designs and site work stay aligned.\n\nIn the end, a project moves fast when everyone knows what to do and when to do it. That is the real value of a PMC. With regular meetings, clear reports and quick decisions, work keeps moving without confusion. If you are planning a concrete, steel or PEB project and want a team that keeps every agency on track, get in touch with us. We will help you build faster, smarter and with complete peace of mind."
  }
];

export default function BlogSection() {
  const [posts, setPosts] = useState(() => {
    try {
      const storedVersion = localStorage.getItem('ta_blog_version');
      const raw = localStorage.getItem('ta_blog_posts');
      if (raw && storedVersion === BLOG_STORAGE_VERSION) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    localStorage.setItem('ta_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
    localStorage.setItem('ta_blog_version', BLOG_STORAGE_VERSION);
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

          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            <a
              href="/blog.html"
              className="nav-connect-btn"
              style={{
                padding: '14px 34px',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              Explore Dedicated Insights &amp; Publications &rarr;
            </a>
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
