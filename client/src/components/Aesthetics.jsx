import React, { useState, useEffect } from 'react';

const DEFAULT_PROJECT_CATEGORIES = [
  {
    id: 'cat_hospitality',
    name: 'HOSPITALITY',
    images: [
      { id: 'h1', url: '/assets/images/project_card_3.jpg', title: 'Resort Poolside Deck' },
      { id: 'h2', url: '/assets/images/project_card_1.jpg', title: 'Courtyard Pavilion' },
      { id: 'h3', url: '/assets/images/media_1789919300137.png', title: 'Illuminated Resort Pool' },
      { id: 'h4', url: '/assets/images/media_1789919353341.png', title: 'Hospitality Master Layout' },
      { id: 'h5', url: '/assets/images/project_card_2.jpg', title: 'Luxury Hotel Tower' }
    ]
  },
  {
    id: 'cat_commercial',
    name: 'COMMERCIAL',
    images: [
      { id: 'c1', url: '/assets/images/media_1789919271519.png', title: 'Corporate Campus Plaza' },
      { id: 'c2', url: '/assets/images/media_1789919287755.png', title: 'Recreation & Civic Zone' },
      { id: 'c3', url: '/assets/images/project_card_2.jpg', title: 'Commercial Retail Hub' },
      { id: 'c4', url: '/assets/images/project_card_3.jpg', title: 'Green Rooftop Terrace' },
      { id: 'c5', url: '/assets/images/project_card_4.jpg', title: 'Executive Commercial Crest' }
    ]
  },
  {
    id: 'cat_mixed_use',
    name: 'MIXED USE',
    images: [
      { id: 'm1', url: '/assets/images/media_1789919339844.png', title: 'Canopy & Amphitheatre' },
      { id: 'm2', url: '/assets/images/project_card_2.jpg', title: 'Waterfront Mixed-Use Towers' },
      { id: 'm3', url: '/assets/images/project_card_4.jpg', title: 'Evening Glass Facade' },
      { id: 'm4', url: '/assets/images/project_card_3.jpg', title: 'Landscaped Promenade' },
      { id: 'm5', url: '/assets/images/project_card_1.jpg', title: 'Neoclassical Arcade' }
    ]
  },
  {
    id: 'cat_master_planning',
    name: 'MASTER PLANNING',
    images: [
      { id: 'mp1', url: '/assets/images/media_1789919353341.png', title: 'Institutional Campus' },
      { id: 'mp2', url: '/assets/images/project_card_2.jpg', title: 'Urban Canopy Towers' },
      { id: 'mp3', url: '/assets/images/project_card_3.jpg', title: 'Botanical Walkway & Gazebo' },
      { id: 'mp4', url: '/assets/images/media_1789919300137.png', title: 'Integrated Township Pool' },
      { id: 'mp5', url: '/assets/images/project_card_1.jpg', title: 'Heritage Masterplan' }
    ]
  },
  {
    id: 'cat_residential',
    name: 'RESIDENTIAL',
    images: [
      { id: 'r1', url: '/assets/images/project_card_1.jpg', title: 'Trivedi Signature Entrance' },
      { id: 'r2', url: '/assets/images/project_card_3.jpg', title: 'Residential Courtyard Greens' },
      { id: 'r3', url: '/assets/images/project_card_4.jpg', title: 'Imperial Crest Balconies' },
      { id: 'r4', url: '/assets/images/project_card_2.jpg', title: 'Skyline Residences' },
      { id: 'r5', url: '/assets/images/legacy_building.png', title: 'Classical Residential Wing' }
    ]
  }
];

export default function Aesthetics({ refreshTrigger }) {
  const [categories, setCategories] = useState(DEFAULT_PROJECT_CATEGORIES);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [rowOffsets, setRowOffsets] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ta_project_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {}
  }, [refreshTrigger]);

  const allImages = categories.flatMap((c) => c.images || []);
  const activeFeatured = allImages[featuredIndex] || { url: '/assets/images/project_card_3.jpg', title: 'Featured Project' };

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

        <div className="project-categories-list">
          {categories.map((cat) => {
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
      </div>
    </section>
  );
}
