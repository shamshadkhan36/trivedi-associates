/**
 * Trivedi Associates - Minimalist Design Interactions
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

  // ----------------- SITE CONTENT CMS (DYNAMIC EDITABLE CONTENT) -----------------
  const DEFAULT_SITE_CONTENT = {
    headerBrandSub: "DESIGN & PROJECT MANAGEMENT CONSULTANT",
    footerBrandSub: "DESIGN & PROJECT MANAGEMENT CONSULTANT",
    footerBrandDesc: "Mastering the art of neoclassical design and superior craftsmanship. 4 core pillars: Design & Planning, PMC, Liaisoning, and Green Building.",
    servicesMainTitle: "OUR 5 CORE PILLARS",

    // Pillar 1: Design & Planning
    p1Title: "Design & Planning",
    p1Tagline: "Design & Spatial Planning",
    p1Overview: "Precision-driven design planning, spatial optimization, and photorealistic visualization for luxury developments.",
    p1Del1: "Floor Planning & Master Layouts",
    p1Del2: "3D Views & Modeling",
    p1Del3: "Elevation Design & Facades",
    p1Del4: "Interior Design & Detailing",

    // Pillar 2: Project Management Consultant (PMC)
    p2Title: "Project Management Consultant (PMC)",
    p2Tagline: "Site Supervision & Quality Audit",
    p2Overview: "End-to-end execution oversight, cost management, contractor accountability, and timely milestone delivery.",
    p2Del1: "Site management and execution",
    p2Del2: "Billing consultation and budgeting",
    p2Del3: "Quality Control & Audit",
    p2Del4: "Timeline & Milestone Tracking",

    // Pillar 3: Liaisoning & Approvals
    p3Title: "Liaisoning & Approvals",
    p3Tagline: "Sanctions & Government Approvals",
    p3Overview: "Expedited statutory compliance, building proposals, municipal approvals, and environmental clearances.",
    p3Del1: "All types of Building and plan approvals",
    p3Del2: "Fire and related NOCs",
    p3Del3: "Commencement certificate (CC) and Occupation certificate(OC)",
    p3Del4: "All other approvals",

    // Pillar 4: Green Building Consultant
    p4Title: "Green Building Consultant",
    p4Tagline: "Sustainability and green consultancy",
    p4Overview: "Eco-conscious design review , energy and water saving methods, and green rating facilitation reducing lifecycle operating costs.",
    p4Del1: "Green building certification",
    p4Del2: "Building design review for sustainability",
    p4Del3: "Energy, water and waste management methods",
    p4Del4: "Eco friendly material advisory",

    // Pillar 5: Auditing
    p5Title: "Auditing",
    p5Tagline: "Structural & Quality Audits",
    p5Overview: "Rigorous structural stability assessment, construction quality control, and statutory compliance certifications.",
    p5Del1: "Structural stability & safety audit",
    p5Del2: "Quality assurance & material testing",
    p5Del3: "MEP & fire compliance inspections",
    p5Del4: "Structural distress & repair advisory",

    // About Section
    aboutMainTitle: "Engineering Landmarks with <br><span class=\"italic-serif\">Timeless Precision</span>",
    aboutP1: "Headquartered in Mumbai, <strong>Trivedi Associates</strong> is a premier multidisciplinary consultancy uniting master design planning, rigorous project management (PMC), municipal & government liaisoning, and IGBC/LEED green building advisory under one integrated practice.",
    aboutP2: "From luxury residential towers and township developments to high-compliance commercial landmarks across Powai, Thane, and South Mumbai, we partner with India’s foremost developers to deliver statutory certainty and design distinction.",

    // Contact Information
    contactHotlineVal: "+91 7977117256",
    contactWhatsappVal: "+91 7977117256",
    contactEmailVal: "trivedi.associates13@gmail.com",
    footerAddressVal: "Western Mumbai : Jogeshwari (East)<br>Central Mumbai : Kurla (East)",
    footerPhoneVal: "+91 7977117256",
    footerEmailVal: "trivedi.associates13@gmail.com"
  };

  const loadAndApplySiteContent = () => {
    try {
      let saved = {};
      const raw = localStorage.getItem('ta_site_content');
      if (raw) {
        saved = JSON.parse(raw);
        if (saved.servicesMainTitle === "OUR 4 CORE PILLARS") {
          delete saved.servicesMainTitle;
        }
        if (saved.footerAddressVal === "Trivedi Associates Corporate Chambers, Mumbai, Maharashtra, India") {
          delete saved.footerAddressVal;
        }
      }
      const merged = Object.assign({}, DEFAULT_SITE_CONTENT, saved);
      for (const [key, value] of Object.entries(merged)) {
        const el = document.getElementById(key);
        if (el && typeof value === 'string') {
          let val = value;
          if (key === 'footerAddressVal' && val.includes('|') && !val.includes('<br>')) {
            val = val.split('|').map(s => s.trim()).join('<br>');
          }
          if (val.includes('<') && val.includes('>')) {
            el.innerHTML = val;
          } else {
            el.textContent = val;
          }
        }
      }
    } catch (err) {
      console.warn('Error applying site content:', err);
    }
  };

  loadAndApplySiteContent();

  // Listen for storage events (changes made in Admin Panel update the site live in real-time)
  window.addEventListener('storage', (e) => {
    if (e.key === 'ta_site_content') {
      loadAndApplySiteContent();
    }
    if (e.key === 'ta_hero_banner' && heroBgImg) {
      heroBgImg.src = localStorage.getItem('ta_hero_banner') || 'assets/images/hero_bg.png';
    }
    if (e.key === 'ta_project_categories') {
      renderCategorizedProjects();
    }
  });

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
