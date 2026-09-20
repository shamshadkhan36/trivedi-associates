import React, { useState } from 'react';

const localities = {
  powai: {
    label: 'Powai',
    image: '/assets/images/thumb_powai.jpg',
    description:
      'Walk past the lanes of Powai where Trivedi Associates has crafted architectural landmarks amidst serene lakeside greens, neoclassical facades, and vibrant modern lifestyles.'
  },
  thane: {
    label: 'Thane',
    image: '/assets/images/thumb_thane.jpg',
    description:
      'Discover our expansive townships in Thane, bringing tranquil nature, manicured promenades, and monumental classical design to luxurious living spaces.'
  },
  mumbai: {
    label: 'South Mumbai',
    image: '/assets/images/thumb_mumbai.jpg',
    description:
      'Immerse in our signature high-rise residences across South Mumbai, blending timeless heritage aesthetics with panoramic Arabian Sea views and elite urban connectivity.'
  }
};

export default function Legacy() {
  const [activeLocality, setActiveLocality] = useState('powai');

  return (
    <section className="legacy-section" id="legacy">
      <div className="legacy-container">
        {/* Left Column: Narrative and Locality Selectors */}
        <div className="legacy-content-col">
          <h2 className="legacy-title">
            Our <span className="italic-serif">Legacy</span>
          </h2>
          <p className="legacy-description">
            {localities[activeLocality].description}
          </p>

          <div className="legacy-locations">
            {Object.keys(localities).map((key) => {
              const loc = localities[key];
              const isActive = activeLocality === key;
              return (
                <div
                  key={key}
                  className={`location-thumb-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveLocality(key)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={loc.image} alt={`${loc.label} Developments`} />
                  <span className="location-label">{loc.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Monumental Architecture */}
        <div className="legacy-image-col">
          <div className="legacy-monument-wrap">
            <img
              src="/assets/images/legacy_building.png"
              alt="Trivedi Associates Neoclassical Landmark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
