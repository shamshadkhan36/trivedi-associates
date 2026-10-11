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

  // ----------------- MOBILE DRAWER NAVIGATION -----------------
  const openMobileDrawerBtn = document.getElementById('openMobileDrawerBtn');
  const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');

  const closeDrawer = () => {
    mobileDrawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Ensure closed on load
  closeDrawer();

  openMobileDrawerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeMobileDrawerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDrawer();
  });

  mobileDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileDrawerOverlay) closeDrawer();
  });

  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawerOverlay?.classList.contains('active')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && mobileDrawerOverlay?.classList.contains('active')) {
      closeDrawer();
    }
  });

  // ----------------- 5 HORIZONTAL EXPANDABLE CARDS -----------------
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
  const enquirySuccessBox = document.getElementById('enquirySuccessBox');
  const enquiryErrorBox = document.getElementById('enquiryErrorBox');
  const enquiryErrorMsg = document.getElementById('enquiryErrorMsg');
  const enquiryWhatsappDirectBtn = document.getElementById('enquiryWhatsappDirectBtn');
  const enquirySuccessMsg = document.getElementById('enquirySuccessMsg');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('enqName')?.value.trim();
      const detail = document.getElementById('enqDetail')?.value.trim();
      const service = document.getElementById('enqService')?.value.trim();
      const phone = document.getElementById('enqPhone')?.value.trim();
      const email = document.getElementById('enqEmail')?.value.trim();
      const message = document.getElementById('enqMessage')?.value.trim();

      const showError = (msg) => {
        if (enquirySuccessBox) enquirySuccessBox.style.display = 'none';
        if (enquiryErrorBox && enquiryErrorMsg) {
          enquiryErrorMsg.textContent = msg;
          enquiryErrorBox.style.display = 'block';
          enquiryErrorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert(msg);
        }
      };

      const hideError = () => {
        if (enquiryErrorBox) enquiryErrorBox.style.display = 'none';
      };

      // Client-side Validation
      if (!name || name.length < 2) {
        showError('Please enter your full name (minimum 2 characters).');
        return;
      }

      const cleanPhoneDigits = (phone || '').replace(/\D/g, '');
      if (!cleanPhoneDigits || cleanPhoneDigits.length < 8) {
        showError('Please provide a valid contact number (minimum 8 to 10 digits).');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError('Please enter a valid email address (e.g. yourname@domain.com).');
        return;
      }

      hideError();

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const origText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting Data...';
      submitBtn.disabled = true;

      const leadData = {
        id: Date.now().toString(),
        name,
        phone,
        email,
        service: `${service} (${detail || 'Individual'})`,
        message: message || 'N/A',
        createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Save to localStorage leads as client backup
      try {
        const savedLeads = JSON.parse(localStorage.getItem('ta_admin_leads') || '[]');
        savedLeads.unshift(leadData);
        localStorage.setItem('ta_admin_leads', JSON.stringify(savedLeads));
      } catch (err) {
        console.warn('LocalStorage leads save warning:', err);
      }

      // Transmit directly to server database
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

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Server encountered an issue recording your enquiry. Please reach out to us directly via WhatsApp.');
        }

        // Success handling
        hideError();

        // Prepare direct WhatsApp link to Mr. Trivedi (+91 7977117256)
        const waText = `Hello Trivedi Associates,\n\nI have submitted an enquiry on your website.\n*Name:* ${name}\n*Organization:* ${detail || 'N/A'}\n*Service:* ${service}\n*Phone:* ${phone}\n*Email:* ${email}\n*Requirements:* ${message || 'N/A'}`;
        const waUrl = `https://wa.me/917977117256?text=${encodeURIComponent(waText)}`;

        if (enquiryWhatsappDirectBtn) {
          enquiryWhatsappDirectBtn.href = waUrl;
        }
        if (enquirySuccessMsg) {
          enquirySuccessMsg.textContent = `Thank you, ${name}! Your consultation brief has been recorded. Our senior consultant will connect with you promptly at ${phone}. You can also connect immediately below:`;
        }
        if (enquirySuccessBox) {
          enquirySuccessBox.style.display = 'block';
          enquirySuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        enquiryForm.reset();
      } catch (err) {
        console.warn('Server contact POST warning:', err);
        showError(err.message || 'Unable to connect to server. Please check your internet connection or contact us via WhatsApp.');
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
    footerBrandDesc: "Mastering the art of neoclassical design and superior craftsmanship. 5 core services: Design & Planning, PMC, Liaisoning, Green Building, and Auditing and Cost Management.",
    servicesMainTitle: "OUR 5 CORE SERVICES",

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
    p2Del1: "Site Management & Execution Oversight",
    p2Del2: "Billing Consultation & Budget Auditing",
    p2Del3: "Quality Control & Construction Audits",
    p2Del4: "Timeline & Milestone Tracking",

    // Pillar 3: Liaisoning & Approvals
    p3Title: "Liaisoning & Approvals",
    p3Tagline: "Sanctions & Government Approvals",
    p3Overview: "Expedited statutory compliance, building proposals, municipal approvals, and environmental clearances.",
    p3Del1: "All Types of Building & Plan Approvals",
    p3Del2: "Chief Fire Officer (CFO) & Fire NOCs",
    p3Del3: "Commencement Certificate (CC) & Occupancy Certificate (OC)",
    p3Del4: "Environmental, High-Rise & Civil Aviation Clearances",

    // Pillar 4: Green Building Consultant
    p4Title: "Green Building Consultant",
    p4Tagline: "Sustainability & Green Building Advisory",
    p4Overview: "Eco-conscious design review, energy and water-saving methods, and green rating facilitation reducing lifecycle operating costs.",
    p4Del1: "IGBC Green Building Certifications",
    p4Del2: "Sustainable Architecture & Building Envelope Review",
    p4Del3: "Energy, Water & Waste Management Frameworks",
    p4Del4: "Eco-Friendly Material Selection & Embodied Carbon Advisory",

    // Pillar 5: Auditing and Cost Management
    p5Title: "Auditing and Cost Management",
    p5Tagline: "Project and Financial Audit",
    p5Overview: "Comprehensive project and financial auditing, bill verification, tender cost auditing, and final account closures to protect project capital.",
    p5Del1: "Cost Management",
    p5Del2: "Audit of the Project",
    p5Del3: "Tender and Contract Cost Audit",
    p5Del4: "Final Account and Contract Closure Audit",

    // About Section
    aboutMainTitle: "ABOUT <span class=\"italic-serif\">US</span>",
    aboutP1: "Trivedi Associates is a construction and project management consultancy firm established in 2016, founded on the principles of professional integrity, technical excellence and a commitment to delivering value-driven solutions.",
    aboutP2: "Founded by <strong>Mr. Aakash Trivedi</strong>, Founder & Chairman, a Designer , Civil Engineer with an MBA in Construction Project Management, the firm brings together technical knowledge, strategic planning and a structured approach to construction and project execution.",
    aboutP3: "At Trivedi Associates, we believe that successful projects are built on more than just drawings, materials and structures. They require thoughtful planning, transparent decision-making, efficient resource management and seamless coordination among all stakeholders.",
    aboutP4: "Our approach focuses on aligning design intent, quality, cost and timelines to achieve project objectives while maintaining the highest standards of professionalism and accountability. We strive to create lasting value for our clients by combining engineering fundamentals with modern project management practices.",
    aboutP5: "As we continue to grow, Trivedi Associates remains committed to building enduring relationships, embracing innovation and contributing to the creation of efficient, sustainable and well-executed built environments.",

    // Contact Information
    contactHotlineVal: "+91 7977117256",
    contactWhatsappVal: "+91 7977117256",
    contactEmailVal: "trivedi.associates13@gmail.com",
    footerAddressVal: "Western Mumbai : Jogeshwari (East)<br>Central Mumbai : Kurla (East)",
    footerPhoneVal: "+91 7977117256",
    footerEmailVal: "trivedi.associates13@gmail.com"
  };

  const applyContentMap = (contentMap) => {
    for (const [key, value] of Object.entries(contentMap)) {
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
  };

  const loadAndApplySiteContent = async () => {
    try {
      let saved = {};
      const raw = localStorage.getItem('ta_site_content');
      if (raw) {
        saved = JSON.parse(raw);
        if (saved.servicesMainTitle === "OUR 4 CORE PILLARS" || saved.servicesMainTitle === "OUR 5 CORE PILLARS") {
          delete saved.servicesMainTitle;
        }
        if (saved.footerBrandDesc && (saved.footerBrandDesc.includes("4 core") || !saved.footerBrandDesc.includes("Cost Management"))) {
          delete saved.footerBrandDesc;
        }
        if (saved.footerAddressVal === "Trivedi Associates Corporate Chambers, Mumbai, Maharashtra, India") {
          delete saved.footerAddressVal;
        }
        if (saved.p5Title === "Auditing & Quality Control" || saved.p5Tagline === "Structural, NDT & Quality Audits" || (saved.p5Del1 && /^\d+\.\s*/.test(saved.p5Del1))) {
          delete saved.p5Title;
          delete saved.p5Tagline;
          delete saved.p5Overview;
          delete saved.p5Del1;
          delete saved.p5Del2;
          delete saved.p5Del3;
          delete saved.p5Del4;
        }
        if (saved.aboutP1 && (saved.aboutP1.includes("Headquartered in Mumbai") || !saved.aboutP1.includes("established in 2016"))) {
          delete saved.aboutMainTitle;
          delete saved.aboutP1;
          delete saved.aboutP2;
        }
        if (saved.p4Del1 && saved.p4Del1.includes("LEED")) {
          delete saved.p4Del1;
        }
      }
      const merged = Object.assign({}, DEFAULT_SITE_CONTENT, saved);
      applyContentMap(merged);

      // Async sync from server CMS file
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const srvData = await res.json();
          if (srvData && srvData.success && srvData.data && Object.keys(srvData.data).length > 0) {
            if (srvData.data.p4Del1 && srvData.data.p4Del1.includes("LEED")) {
              delete srvData.data.p4Del1;
            }
            const finalMerged = Object.assign({}, merged, srvData.data);
            applyContentMap(finalMerged);
            localStorage.setItem('ta_site_content', JSON.stringify(finalMerged));
          }
        }
      } catch (netErr) {
        // Offline or server not responding
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
    if (e.key === 'ta_blog_posts') {
      renderBlogSection();
    }
  });

  // ----------------- CATEGORIZED PROJECTS GALLERY & FEATURED SLIDER -----------------
  // ----------------- CATEGORIZED PROJECTS GALLERY & FEATURED SLIDER -----------------
  const DEFAULT_PROJECT_CATEGORIES = [
    { id: 'cat_hospitality', name: 'HOSPITALITY', images: [] },
    { id: 'cat_commercial', name: 'COMMERCIAL', images: [] },
    { id: 'cat_mixed_use', name: 'MIXED USE', images: [] },
    { id: 'cat_master_planning', name: 'MASTER PLANNING', images: [] },
    { id: 'cat_residential', name: 'RESIDENTIAL', images: [] }
  ];

  // Automatic cleanup of legacy mock/dummy project images from browser storage
  (function cleanupLegacyProjects() {
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
          }
        } else {
          localStorage.setItem('ta_project_categories', JSON.stringify(DEFAULT_PROJECT_CATEGORIES));
        }
        localStorage.setItem(key, 'true');
      }
    } catch (e) {}
  })();

  const getProjectCategories = () => {
    try {
      const raw = localStorage.getItem('ta_project_categories');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
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
  const featuredBannerEl = document.querySelector('.projects-featured-banner');
  const featuredPrevBtn = document.getElementById('featuredPrevBtn');
  const featuredNextBtn = document.getElementById('featuredNextBtn');

  let allFeaturedImages = [];
  let currentFeaturedIdx = 0;

  const updateFeaturedStage = (index) => {
    if (!featuredImgEl || allFeaturedImages.length === 0) return;
    currentFeaturedIdx = (index + allFeaturedImages.length) % allFeaturedImages.length;
    const cur = allFeaturedImages[currentFeaturedIdx];
    featuredImgEl.style.opacity = '0.4';
    setTimeout(() => {
      featuredImgEl.src = cur.url;
      featuredImgEl.alt = cur.title || 'Featured Project';
      featuredImgEl.style.opacity = '1';
      const infoEl = document.getElementById('featuredProjectInfo');
      if (infoEl) {
        if (cur.title || cur.description) {
          infoEl.style.display = 'block';
          infoEl.innerHTML = `
            ${cur.title ? `<h4 class="projects-featured-info-title">${cur.title}</h4>` : ''}
            ${cur.description ? `<p class="projects-featured-info-desc">${cur.description}</p>` : ''}
          `;
        } else {
          infoEl.style.display = 'none';
        }
      }
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

    if (allFeaturedImages.length > 0) {
      if (featuredBannerEl) featuredBannerEl.style.display = 'block';
      if (featuredImgEl) {
        const first = allFeaturedImages[0];
        featuredImgEl.src = first.url;
        featuredImgEl.alt = first.title || 'Featured Project';
        const infoEl = document.getElementById('featuredProjectInfo');
        if (infoEl) {
          if (first.title || first.description) {
            infoEl.style.display = 'block';
            infoEl.innerHTML = `
              ${first.title ? `<h4 class="projects-featured-info-title">${first.title}</h4>` : ''}
              ${first.description ? `<p class="projects-featured-info-desc">${first.description}</p>` : ''}
            `;
          } else {
            infoEl.style.display = 'none';
          }
        }
      }
    } else {
      if (featuredBannerEl) featuredBannerEl.style.display = 'none';
    }

    if (!categoriesContainer) return;

    const populatedCats = categories.filter((c) => (c.images || []).length > 0);

    if (populatedCats.length === 0) {
      categoriesContainer.innerHTML = `
        <div class="projects-empty-state" style="text-align: center; padding: 50px 20px; color: #888;">
          <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--color-wine); margin-bottom: 8px;">
            Portfolio Curation in Progress
          </h3>
          <p style="font-size: 13.5px; color: #888; max-width: 480px; margin: 0 auto;">
            New development projects and architectural showcases are being curated. Projects added via Admin Panel will appear here live.
          </p>
        </div>
      `;
      return;
    }

    categoriesContainer.innerHTML = populatedCats.map((cat) => {
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
                  <div class="cat-image-card" data-img-url="${img.url}" data-img-title="${img.title || ''}" data-img-desc="${img.description || ''}" title="${img.title || cat.name}">
                    <img src="${img.url}" alt="${img.title || cat.name}" loading="lazy">
                    ${img.title || img.description ? `
                      <div class="cat-image-caption">
                        ${img.title ? `<div class="cat-image-title-text">${img.title}</div>` : ''}
                        ${img.description ? `<div class="cat-image-desc-text">${img.description}</div>` : ''}
                      </div>
                    ` : ''}
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
          const title = card.getAttribute('data-img-title');
          const desc = card.getAttribute('data-img-desc');
          if (url && featuredImgEl) {
            featuredImgEl.src = url;
            featuredImgEl.alt = title || 'Featured Project';
            const infoEl = document.getElementById('featuredProjectInfo');
            if (infoEl) {
              if (title || desc) {
                infoEl.style.display = 'block';
                infoEl.innerHTML = `
                  ${title ? `<h4 class="projects-featured-info-title">${title}</h4>` : ''}
                  ${desc ? `<p class="projects-featured-info-desc">${desc}</p>` : ''}
                `;
              } else {
                infoEl.style.display = 'none';
              }
            }
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

  // ----------------- BLOG & ARTICLES MODULE -----------------
  const BLOG_STORAGE_VERSION = 'v20261011_clean_pmc_img';
  const DEFAULT_BLOG_POSTS = [
    {
      id: 'blog_pmc_mumbai',
      title: "Why a Good PMC Can Save Your Construction Project in Mumbai",
      slug: "why-a-good-pmc-can-save-your-construction-project-in-mumbai",
      category: "PMC & Cost Control",
      author: "Trivedi Associates Editorial Team",
      date: "October 2026",
      readTime: "4 min read",
      image: "assets/images/project_card_1.jpg?v=20261011_clean",
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

  const getBlogPosts = () => {
    try {
      const storedVersion = localStorage.getItem('ta_blog_version');
      const raw = localStorage.getItem('ta_blog_posts');
      if (raw && storedVersion === BLOG_STORAGE_VERSION) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading ta_blog_posts:', e);
    }
    localStorage.setItem('ta_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
    localStorage.setItem('ta_blog_version', BLOG_STORAGE_VERSION);
    return DEFAULT_BLOG_POSTS;
  };

  const blogPostsGrid = document.getElementById('blogPostsGrid');
  const blogFilterBar = document.getElementById('blogFilterBar');
  const blogReaderModal = document.getElementById('blogReaderModal');
  const blogModalBody = document.getElementById('blogModalBody');
  const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');

  let activeBlogFilter = 'ALL';

  const navigateToBlogArticle = (postOrId) => {
    const id = typeof postOrId === 'string' ? postOrId : (postOrId.id || postOrId.slug);
    window.location.href = `blog.html?id=${encodeURIComponent(id)}`;
  };

  const renderBlogSection = () => {
    if (!blogPostsGrid) return;
    const posts = getBlogPosts();

    // Populate category filter bar
    if (blogFilterBar) {
      const categories = ['ALL', ...new Set(posts.map(p => p.category).filter(Boolean))];
      blogFilterBar.innerHTML = categories.map(cat => `
        <button class="blog-filter-pill ${activeBlogFilter === cat ? 'active' : ''}" data-filter="${cat}">
          ${cat === 'ALL' ? 'All Publications' : cat}
        </button>
      `).join('');

      blogFilterBar.querySelectorAll('.blog-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          activeBlogFilter = btn.getAttribute('data-filter') || 'ALL';
          renderBlogSection();
        });
      });
    }

    const filtered = activeBlogFilter === 'ALL'
      ? posts
      : posts.filter(p => p.category === activeBlogFilter);

    if (filtered.length === 0) {
      blogPostsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-muted);">
          No articles found under "${activeBlogFilter}".
        </div>
      `;
      return;
    }

    blogPostsGrid.innerHTML = filtered.map(post => `
      <a href="blog.html?id=${encodeURIComponent(post.id)}" class="blog-card" data-blog-id="${post.id}" style="text-decoration: none; color: inherit; display: flex; cursor: pointer;">
        <div class="blog-card-media">
          <img src="${post.image || 'assets/images/project_card_1.jpg'}" alt="${post.title}" class="blog-card-img" loading="lazy">
          <span class="blog-card-badge">${post.category || 'Insights'}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>${post.date || '2026'}</span>
            <span class="blog-card-meta-dot">&bull;</span>
            <span>${post.readTime || '4 min read'}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt || ''}</p>
          <div class="blog-card-action">
            Read Full Article &rarr;
          </div>
        </div>
      </a>
    `).join('');

    blogPostsGrid.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const id = card.getAttribute('data-blog-id');
        navigateToBlogArticle(id);
      });
    });
  };

  renderBlogSection();

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
