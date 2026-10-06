import React, { useState, useEffect } from 'react';

const DEFAULT_PROJECT_CATEGORIES = [
  { id: 'cat_hospitality', name: 'HOSPITALITY', images: [] },
  { id: 'cat_commercial', name: 'COMMERCIAL', images: [] },
  { id: 'cat_mixed_use', name: 'MIXED USE', images: [] },
  { id: 'cat_master_planning', name: 'MASTER PLANNING', images: [] },
  { id: 'cat_residential', name: 'RESIDENTIAL', images: [] }
];

export default function Aesthetics({ refreshTrigger }) {
  const [categories, setCategories] = useState(DEFAULT_PROJECT_CATEGORIES);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [rowOffsets, setRowOffsets] = useState({});

  useEffect(() => {
    try {
      const key = 'ta_legacy_projects_cleaned_v2';
      if (!localStorage.getItem(key)) {
        const saved = localStorage.getItem('ta_project_categories');
        if (saved) {
          let cats = JSON.parse(saved);
          if (Array.isArray(cats)) {
            cats = cats.map(c => ({
              ...c,
              images: (c.images || []).filter(img => {
                const u = img.url || '';
                return !u.includes('project_card_') && !u.includes('media_1789919') && !u.includes('legacy_building');
              })
            }));
            localStorage.setItem('ta_project_categories', JSON.stringify(cats));
            setCategories(cats);
          }
        } else {
          localStorage.setItem('ta_project_categories', JSON.stringify(DEFAULT_PROJECT_CATEGORIES));
          setCategories(DEFAULT_PROJECT_CATEGORIES);
        }
        localStorage.setItem(key, 'true');
      } else {
        const saved = localStorage.getItem('ta_project_categories');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCategories(parsed);
          }
        }
      }
    } catch (e) {}
  }, [refreshTrigger]);

  const allImages = categories.flatMap((c) => c.images || []);
  const populatedCats = categories.filter((c) => (c.images || []).length > 0);
  const activeFeatured = allImages[featuredIndex] || null;

  const slideCategory = (catId, total, dir) => {
    setRowOffsets((prev) => {
      const current = prev[catId] || 0;
      const maxSlide = Math.max(0, total - 4);
      let next = current + dir;
      if (next > maxSlide) next = 0;
      if (next < 0) next = maxSlide;
      return { ...prev, [catId]: next };
    });
  };

  return (
    <section className="projects-gallery-section" id="showcase">
      <div className="projects-gallery-container">
        <h2 className="projects-page-heading">Projects</h2>

        {allImages.length === 0 ? (
          <div className="projects-empty-state" style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
            <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '20px', color: '#5B1422', marginBottom: '8px' }}>
              Portfolio Curation in Progress
            </h3>
            <p style={{ fontSize: '13.5px', color: '#888', maxWidth: '480px', margin: '0 auto' }}>
              New development projects and architectural showcases are being curated. Projects added via Admin Panel will appear here live.
            </p>
          </div>
        ) : (
          <>
            {activeFeatured && (
              <div className="projects-featured-banner">
                <h3 className="projects-featured-heading">Projects</h3>
                <div className="projects-featured-stage">
                  <img
                    src={activeFeatured.url}
                    alt={activeFeatured.title || 'Featured Project'}
                    className="projects-featured-img"
                  />
                </div>
                <button
                  className="featured-nav-arrow prev"
                  onClick={() => setFeaturedIndex((prev) => (prev - 1 + allImages.length) % Math.max(1, allImages.length))}
                  aria-label="Previous Featured Project"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="featured-nav-arrow next"
                  onClick={() => setFeaturedIndex((prev) => (prev + 1) % Math.max(1, allImages.length))}
                  aria-label="Next Featured Project"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}

            <div className="project-categories-list">
              {populatedCats.map((cat) => {
                const imgs = cat.images || [];
                const offset = rowOffsets[cat.id] || 0;
                return (
                  <div key={cat.id} className="project-category-block">
                    <h3 className="project-category-title">{cat.name}</h3>
                    <div className="cat-slider-wrapper">
                      <button
                        className="cat-slider-arrow prev"
                        onClick={() => slideCategory(cat.id, imgs.length, -1)}
                        aria-label={`Previous ${cat.name}`}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <div className="cat-slider-viewport">
                        <div
                          className="cat-slider-track"
                          style={{ transform: `translateX(-${offset * 25.4}%)` }}
                        >
                          {imgs.map((img) => (
                            <div
                              key={img.id}
                              className="cat-image-card"
                              onClick={() => {
                                const idx = allImages.findIndex((x) => x.id === img.id);
                                if (idx >= 0) setFeaturedIndex(idx);
                              }}
                            >
                              <img src={img.url} alt={img.title || cat.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        className="cat-slider-arrow next"
                        onClick={() => slideCategory(cat.id, imgs.length, 1)}
                        aria-label={`Next ${cat.name}`}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
