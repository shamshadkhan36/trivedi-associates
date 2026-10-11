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

  openMobileDrawerBtn?.addEventListener('click', () => {
    mobileDrawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeMobileDrawerBtn?.addEventListener('click', closeDrawer);
  mobileDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileDrawerOverlay) closeDrawer();
  });
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
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
        await fetch('/api/contact', {
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
      } catch (err) {
        console.warn('Server contact POST warning:', err);
      } finally {
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
      }

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
    footerBrandDesc: "Mastering the art of neoclassical design and superior craftsmanship. 5 core services: Design & Planning, PMC, Liaisoning, Green Building, and Auditing.",
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
    p4Del1: "IGBC & LEED Green Building Certifications",
    p4Del2: "Sustainable Architecture & Building Envelope Review",
    p4Del3: "Energy, Water & Waste Management Frameworks",
    p4Del4: "Eco-Friendly Material Selection & Embodied Carbon Advisory",

    // Pillar 5: Auditing & Quality Control
    p5Title: "Auditing & Quality Control",
    p5Tagline: "Structural, NDT & Quality Audits",
    p5Overview: "Comprehensive structural stability assessments, independent construction quality control, non-destructive testing (NDT), and municipal compliance certifications.",
    p5Del1: "Structural Stability & BMC Rule 353B Audits",
    p5Del2: "Quality Assurance & Non-Destructive Testing (NDT)",
    p5Del3: "MEP & Fire Life-Safety Compliance Inspections",
    p5Del4: "Structural Distress, Dilapidation & Retrofitting Advisory",

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
        if (saved.footerBrandDesc && saved.footerBrandDesc.includes("4 core")) {
          delete saved.footerBrandDesc;
        }
        if (saved.footerAddressVal === "Trivedi Associates Corporate Chambers, Mumbai, Maharashtra, India") {
          delete saved.footerAddressVal;
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

    if (allFeaturedImages.length > 0) {
      if (featuredBannerEl) featuredBannerEl.style.display = 'block';
      if (featuredImgEl) {
        featuredImgEl.src = allFeaturedImages[0].url;
        featuredImgEl.alt = allFeaturedImages[0].title || 'Featured Project';
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

  // ----------------- BLOG & ARTICLES MODULE -----------------
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

  const getBlogPosts = () => {
    try {
      const raw = localStorage.getItem('ta_blog_posts');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading ta_blog_posts:', e);
    }
    localStorage.setItem('ta_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
    return DEFAULT_BLOG_POSTS;
  };

  const blogPostsGrid = document.getElementById('blogPostsGrid');
  const blogFilterBar = document.getElementById('blogFilterBar');
  const blogReaderModal = document.getElementById('blogReaderModal');
  const blogModalBody = document.getElementById('blogModalBody');
  const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');

  let activeBlogFilter = 'ALL';

  const openBlogArticle = (post) => {
    if (!blogReaderModal || !blogModalBody) return;
    const paragraphs = (post.content || '').split('\n').filter(p => p.trim().length > 0);
    blogModalBody.innerHTML = `
      <div class="blog-modal-hero">
        <img src="${post.image || 'assets/images/project_card_1.jpg'}" alt="${post.title}">
      </div>
      <div class="blog-modal-body-content">
        <div class="blog-modal-meta-row">
          <span class="blog-modal-badge">${post.category || 'Article'}</span>
          <span class="blog-modal-meta-text">${post.date || '2026'} &bull; ${post.readTime || '4 min read'}</span>
        </div>
        <h2 class="blog-modal-title">${post.title}</h2>
        <div class="blog-modal-author-bar">
          <div class="blog-modal-avatar">TA</div>
          <div>
            <div class="blog-modal-author-info">${post.author || 'Trivedi Associates Editorial Team'}</div>
            <div class="blog-modal-author-role">Technical &amp; Statutory Advisory Cell</div>
          </div>
        </div>
        <div class="blog-modal-prose">
          ${paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="blog-modal-cta-box">
          <div>
            <div class="blog-modal-cta-text">Require Advisory on this Subject?</div>
            <div style="font-size: 13px; color: #666; margin-top: 4px;">Connect with our senior partners for confidential project consultation.</div>
          </div>
          <button class="nav-connect-btn" id="blogConsultBtn" style="padding: 10px 22px; font-size: 11.5px;">
            Consult With Our Team &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('blogConsultBtn')?.addEventListener('click', () => {
      blogReaderModal.classList.remove('active');
      const enquirySec = document.getElementById('enquiry-form-section');
      if (enquirySec) {
        enquirySec.scrollIntoView({ behavior: 'smooth' });
        const detailInput = document.getElementById('enqDetail');
        if (detailInput) detailInput.value = `Consultation regarding: ${post.title}`;
      }
    });

    blogReaderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeBlogArticle = () => {
    if (!blogReaderModal) return;
    blogReaderModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBlogModalBtn?.addEventListener('click', closeBlogArticle);
  blogReaderModal?.addEventListener('click', (e) => {
    if (e.target === blogReaderModal) closeBlogArticle();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogReaderModal?.classList.contains('active')) {
      closeBlogArticle();
    }
  });

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
      <article class="blog-card" data-blog-id="${post.id}">
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
      </article>
    `).join('');

    blogPostsGrid.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-blog-id');
        const found = posts.find(p => String(p.id) === String(id));
        if (found) openBlogArticle(found);
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
