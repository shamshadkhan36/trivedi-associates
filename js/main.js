/**
 * Trivedi Associates - Minimalist Architecture Interactions
 * Controls Expandable 4 Service Cards, Slider, Enquire Form & Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------- NAVBAR SCROLL EFFECT -----------------
  const headerNav = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      headerNav?.classList.add('scrolled');
    } else {
      headerNav?.classList.remove('scrolled');
    }
  });

  // Hero Scroll Indicator Click
  const heroScrollIndicator = document.getElementById('heroScrollIndicator');
  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', () => {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------------- 4 HORIZONTAL EXPANDABLE CARDS -----------------
  const serviceCards = document.querySelectorAll('.horizontal-service-card');
  const expandAllBtn = document.getElementById('expandAllBtn');
  const collapseAllBtn = document.getElementById('collapseAllBtn');

  serviceCards.forEach((card) => {
    const header = card.querySelector('.h-card-header');
    const body = card.querySelector('.h-card-expanded-body');
    const chevron = card.querySelector('.h-chevron');
    const promptText = card.querySelector('.prompt-text');

    const toggle = () => {
      const isExpanded = card.classList.contains('expanded');
      if (isExpanded) {
        card.classList.remove('expanded');
        if (body) body.style.display = 'none';
        chevron?.classList.remove('rotated');
        if (promptText) promptText.textContent = 'Click to Expand';
      } else {
        card.classList.add('expanded');
        if (body) body.style.display = 'block';
        chevron?.classList.add('rotated');
        if (promptText) promptText.textContent = 'Collapse';
      }
    };

    if (header) {
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
      });
    }

    card.addEventListener('click', (e) => {
      // If clicking enquire button, let the enquire button trigger do its work
      if (e.target.closest('.h-enquire-btn')) return;
      if (!card.classList.contains('expanded')) {
        toggle();
      }
    });
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      serviceCards.forEach((card) => {
        const body = card.querySelector('.h-card-expanded-body');
        const chevron = card.querySelector('.h-chevron');
        const promptText = card.querySelector('.prompt-text');
        card.classList.add('expanded');
        if (body) body.style.display = 'block';
        if (chevron) chevron.classList.add('rotated');
        if (promptText) promptText.textContent = 'Collapse';
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      serviceCards.forEach((card) => {
        const body = card.querySelector('.h-card-expanded-body');
        const chevron = card.querySelector('.h-chevron');
        const promptText = card.querySelector('.prompt-text');
        card.classList.remove('expanded');
        if (body) body.style.display = 'none';
        if (chevron) chevron.classList.remove('rotated');
        if (promptText) promptText.textContent = 'Click to Expand';
      });
    });
  }

  // Select Service Trigger buttons
  const serviceTriggers = document.querySelectorAll('.select-service-trigger');
  const enqServiceSelect = document.getElementById('enqService');
  serviceTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sName = btn.getAttribute('data-service-name');
      if (enqServiceSelect && sName) {
        enqServiceSelect.value = sName;
      }
      document.getElementById('enquiry-form-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ----------------- ENQUIRY FORM SUBMISSION -----------------
  const enquiryForm = document.getElementById('publicEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('enqName')?.value;
      const detail = document.getElementById('enqDetail')?.value;
      const service = document.getElementById('enqService')?.value;
      const phone = document.getElementById('enqPhone')?.value;
      const email = document.getElementById('enqEmail')?.value;
      const message = document.getElementById('enqMessage')?.value;

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const origText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting Data...';
      submitBtn.disabled = true;

      const leadData = {
        id: Date.now(),
        name,
        phone,
        email,
        service: `${service} (${detail || 'Individual'})`,
        message: message || 'N/A',
        createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Save to localStorage leads for Admin Panel review
      try {
        const savedLeads = JSON.parse(localStorage.getItem('ta_admin_leads') || '[]');
        savedLeads.unshift(leadData);
        localStorage.setItem('ta_admin_leads', JSON.stringify(savedLeads));
      } catch (err) {
        console.warn('LocalStorage leads save warning:', err);
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            interest: `${service} (${detail || 'Individual'})`,
            message
          })
        });

        alert('Thank you! Your information has been received. Our senior consultant will reach you promptly at ' + phone + '.');
        enquiryForm.reset();
      } catch (err) {
        alert('Thank you! Your enquiry has been securely registered. Our team will contact you at ' + phone + ' or via email.');
        enquiryForm.reset();
      } finally {
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
      }
    });
  }

  // ----------------- SYNC HERO BANNER FROM ADMIN PANEL -----------------
  const heroBgImg = document.querySelector('.hero-bg-image');
  try {
    const customBanner = localStorage.getItem('ta_hero_banner');
    if (customBanner && heroBgImg) {
      heroBgImg.src = customBanner;
    }
  } catch (e) {
    console.warn('Error loading custom hero banner:', e);
  }

  // ----------------- CATEGORIZED PROJECTS GALLERY & FEATURED SLIDER -----------------
  const DEFAULT_PROJECT_CATEGORIES = [
    {
      id: 'cat_hospitality',
      name: 'HOSPITALITY',
      images: [
        { id: 'h1', url: 'assets/images/project_card_3.jpg', title: 'Resort Poolside Deck' },
        { id: 'h2', url: 'assets/images/project_card_1.jpg', title: 'Courtyard Pavilion' },
        { id: 'h3', url: 'assets/images/media_1789919300137.png', title: 'Illuminated Resort Pool' },
        { id: 'h4', url: 'assets/images/media_1789919353341.png', title: 'Hospitality Master Layout' },
        { id: 'h5', url: 'assets/images/project_card_2.jpg', title: 'Luxury Hotel Tower' }
      ]
    },
    {
      id: 'cat_commercial',
      name: 'COMMERCIAL',
      images: [
        { id: 'c1', url: 'assets/images/media_1789919271519.png', title: 'Corporate Campus Plaza' },
        { id: 'c2', url: 'assets/images/media_1789919287755.png', title: 'Recreation & Civic Zone' },
        { id: 'c3', url: 'assets/images/project_card_2.jpg', title: 'Commercial Retail Hub' },
        { id: 'c4', url: 'assets/images/project_card_3.jpg', title: 'Green Rooftop Terrace' },
        { id: 'c5', url: 'assets/images/project_card_4.jpg', title: 'Executive Commercial Crest' }
      ]
    },
    {
      id: 'cat_mixed_use',
      name: 'MIXED USE',
      images: [
        { id: 'm1', url: 'assets/images/media_1789919339844.png', title: 'Canopy & Amphitheatre' },
        { id: 'm2', url: 'assets/images/project_card_2.jpg', title: 'Waterfront Mixed-Use Towers' },
        { id: 'm3', url: 'assets/images/project_card_4.jpg', title: 'Evening Glass Facade' },
        { id: 'm4', url: 'assets/images/project_card_3.jpg', title: 'Landscaped Promenade' },
        { id: 'm5', url: 'assets/images/project_card_1.jpg', title: 'Neoclassical Arcade' }
      ]
    },
    {
      id: 'cat_master_planning',
      name: 'MASTER PLANNING',
      images: [
        { id: 'mp1', url: 'assets/images/media_1789919353341.png', title: 'Institutional Campus' },
        { id: 'mp2', url: 'assets/images/project_card_2.jpg', title: 'Urban Canopy Towers' },
        { id: 'mp3', url: 'assets/images/project_card_3.jpg', title: 'Botanical Walkway & Gazebo' },
        { id: 'mp4', url: 'assets/images/media_1789919300137.png', title: 'Integrated Township Pool' },
        { id: 'mp5', url: 'assets/images/project_card_1.jpg', title: 'Heritage Masterplan' }
      ]
    },
    {
      id: 'cat_residential',
      name: 'RESIDENTIAL',
      images: [
        { id: 'r1', url: 'assets/images/project_card_1.jpg', title: 'Trivedi Signature Entrance' },
        { id: 'r2', url: 'assets/images/project_card_3.jpg', title: 'Residential Courtyard Greens' },
        { id: 'r3', url: 'assets/images/project_card_4.jpg', title: 'Imperial Crest Balconies' },
        { id: 'r4', url: 'assets/images/project_card_2.jpg', title: 'Skyline Residences' },
        { id: 'r5', url: 'assets/images/legacy_building.png', title: 'Classical Residential Wing' }
      ]
    }
  ];

  const getProjectCategories = () => {
    try {
      const raw = localStorage.getItem('ta_project_categories');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading ta_project_categories:', e);
    }
    localStorage.setItem('ta_project_categories', JSON.stringify(DEFAULT_PROJECT_CATEGORIES));
    return DEFAULT_PROJECT_CATEGORIES;
  };

  const categoriesContainer = document.getElementById('projectCategoriesContainer');
  const featuredImgEl = document.getElementById('featuredProjectImg');
  const featuredPrevBtn = document.getElementById('featuredPrevBtn');
  const featuredNextBtn = document.getElementById('featuredNextBtn');

  let allFeaturedImages = [];
  let currentFeaturedIdx = 0;

  const updateFeaturedStage = (index) => {
    if (!featuredImgEl || allFeaturedImages.length === 0) return;
    currentFeaturedIdx = (index + allFeaturedImages.length) % allFeaturedImages.length;
    featuredImgEl.style.opacity = '0.4';
    setTimeout(() => {
      featuredImgEl.src = allFeaturedImages[currentFeaturedIdx].url;
      featuredImgEl.alt = allFeaturedImages[currentFeaturedIdx].title || 'Featured Project';
      featuredImgEl.style.opacity = '1';
    }, 120);
  };

  const renderCategorizedProjects = () => {
    const categories = getProjectCategories();
    allFeaturedImages = [];
    categories.forEach((cat) => {
      (cat.images || []).forEach((img) => {
        allFeaturedImages.push(img);
      });
    });

    if (featuredImgEl && allFeaturedImages.length > 0) {
      featuredImgEl.src = allFeaturedImages[0].url;
      featuredImgEl.alt = allFeaturedImages[0].title || 'Featured Project';
    }

    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = categories.map((cat) => {
      const imgs = cat.images || [];
      return `
        <div class="project-category-block" data-cat-id="${cat.id}">
          <h3 class="project-category-title">${cat.name}</h3>
          <div class="cat-slider-wrapper">
            <button class="cat-slider-arrow prev" aria-label="Previous ${cat.name}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div class="cat-slider-viewport">
              <div class="cat-slider-track">
                ${imgs.map((img) => `
                  <div class="cat-image-card" data-img-url="${img.url}" title="${img.title || cat.name}">
                    <img src="${img.url}" alt="${img.title || cat.name}" loading="lazy">
                  </div>
                `).join('')}
              </div>
            </div>
            <button class="cat-slider-arrow next" aria-label="Next ${cat.name}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Wire up each category row's horizontal slider arrows and image click
    categoriesContainer.querySelectorAll('.project-category-block').forEach((block) => {
      const track = block.querySelector('.cat-slider-track');
      const cards = block.querySelectorAll('.cat-image-card');
      const prevArrow = block.querySelector('.cat-slider-arrow.prev');
      const nextArrow = block.querySelector('.cat-slider-arrow.next');
      let slideIndex = 0;

      const getVisibleCount = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 992) return 2;
        return 4;
      };

      const updateRowSlide = () => {
        if (!track || cards.length === 0) return;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 18;
        track.style.transform = `translateX(-${slideIndex * (cardWidth + gap)}px)`;
      };

      nextArrow?.addEventListener('click', () => {
        const visible = getVisibleCount();
        const maxSlide = Math.max(0, cards.length - visible);
        slideIndex = slideIndex >= maxSlide ? 0 : slideIndex + 1;
        updateRowSlide();
      });

      prevArrow?.addEventListener('click', () => {
        const visible = getVisibleCount();
        const maxSlide = Math.max(0, cards.length - visible);
        slideIndex = slideIndex <= 0 ? maxSlide : slideIndex - 1;
        updateRowSlide();
      });

      cards.forEach((card) => {
        card.addEventListener('click', () => {
          const url = card.getAttribute('data-img-url');
          if (url && featuredImgEl) {
            featuredImgEl.src = url;
            document.querySelector('.projects-featured-banner')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    });
  };

  renderCategorizedProjects();

  featuredNextBtn?.addEventListener('click', () => {
    updateFeaturedStage(currentFeaturedIdx + 1);
  });

  featuredPrevBtn?.addEventListener('click', () => {
    updateFeaturedStage(currentFeaturedIdx - 1);
  });

  // ----------------- URL-ONLY ADMIN REDIRECT -----------------
  if (window.location.hash === '#admin') {
    window.location.href = 'admin.html';
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') {
      window.location.href = 'admin.html';
    }
  });
});
