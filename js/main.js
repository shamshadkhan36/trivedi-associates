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

    if (header && body) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');
        if (isExpanded) {
          card.classList.remove('expanded');
          body.style.display = 'none';
          chevron?.classList.remove('rotated');
          if (promptText) promptText.textContent = 'Click to Expand';
        } else {
          card.classList.add('expanded');
          body.style.display = 'block';
          chevron?.classList.add('rotated');
          if (promptText) promptText.textContent = 'Collapse';
        }
      });
    }
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

      try {
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

  // ----------------- PROJECT CAROUSEL SLIDER -----------------
  const cardsTrack = document.getElementById('cardsTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  // Load custom projects from localStorage
  const loadCustomProjects = () => {
    if (!cardsTrack) return;
    try {
      const stored = JSON.parse(localStorage.getItem('ta_admin_projects') || '[]');
      stored.forEach((proj) => {
        const card = document.createElement('div');
        card.className = 'project-card custom-project-card';
        card.innerHTML = `
          <img src="${proj.image}" alt="${proj.titleMain}" class="project-card-img">
          <div class="project-card-overlay">
            <h3 class="card-title">${proj.titleMain} <br><span class="italic-serif">${proj.titleItalic}</span></h3>
            <p class="card-subtitle">${proj.subtitle}</p>
          </div>
        `;
        cardsTrack.appendChild(card);
      });
    } catch (e) {
      console.warn('Error loading custom projects:', e);
    }
  };
  loadCustomProjects();

  if (cardsTrack && prevBtn && nextBtn) {
    let currentSlide = 0;

    nextBtn.addEventListener('click', () => {
      const cards = cardsTrack.querySelectorAll('.project-card');
      currentSlide = currentSlide >= cards.length - 1 ? 0 : currentSlide + 1;
      cardsTrack.style.transform = `translateX(-${currentSlide * 568}px)`;
    });

    prevBtn.addEventListener('click', () => {
      const cards = cardsTrack.querySelectorAll('.project-card');
      currentSlide = currentSlide <= 0 ? cards.length - 1 : currentSlide - 1;
      cardsTrack.style.transform = `translateX(-${currentSlide * 568}px)`;
    });
  }

  // ----------------- ADMIN PORTAL MODAL -----------------
  const adminModal = document.getElementById('adminModal');
  const adminBackdrop = document.getElementById('adminBackdrop');
  const openAdminBtn = document.getElementById('openAdminBtn');
  const footerAdminBtn = document.getElementById('footerAdminBtn');
  const closeAdminBtn = document.getElementById('closeAdminBtn');
  const closeAdminDashBtn = document.getElementById('closeAdminDashBtn');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  const adminLoginView = document.getElementById('adminLoginView');
  const adminDashboardView = document.getElementById('adminDashboardView');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginAlert = document.getElementById('adminLoginAlert');
  const adminDashAlert = document.getElementById('adminDashAlert');

  const tabBtnAdd = document.getElementById('tabBtnAdd');
  const tabBtnProjects = document.getElementById('tabBtnProjects');
  const tabBtnLeads = document.getElementById('tabBtnLeads');
  const tabPanelAdd = document.getElementById('tabPanelAdd');
  const tabPanelProjects = document.getElementById('tabPanelProjects');
  const tabPanelLeads = document.getElementById('tabPanelLeads');

  const newProjectForm = document.getElementById('newProjectForm');
  const adminProjectsList = document.getElementById('adminProjectsList');
  const adminLeadsList = document.getElementById('adminLeadsList');

  const openAdmin = () => {
    if (!adminModal) return;
    adminModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const token = localStorage.getItem('ta_admin_token');
    if (token) {
      showDashboard();
    } else {
      showLogin();
    }
  };

  const closeAdmin = () => {
    if (!adminModal) return;
    adminModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const showLogin = () => {
    if (adminLoginView) adminLoginView.style.display = 'block';
    if (adminDashboardView) adminDashboardView.style.display = 'none';
    if (adminLoginAlert) adminLoginAlert.style.display = 'none';
  };

  const showDashboard = () => {
    if (adminLoginView) adminLoginView.style.display = 'none';
    if (adminDashboardView) adminDashboardView.style.display = 'block';
    renderProjectsList();
    renderLeadsList();
  };

  // Check URL hash
  if (window.location.hash === '#admin') {
    openAdmin();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openAdmin();
  });

  openAdminBtn?.addEventListener('click', openAdmin);
  footerAdminBtn?.addEventListener('click', openAdmin);
  closeAdminBtn?.addEventListener('click', closeAdmin);
  closeAdminDashBtn?.addEventListener('click', closeAdmin);
  adminBackdrop?.addEventListener('click', closeAdmin);

  // Admin Login
  adminLoginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail')?.value.trim();
    const pass = document.getElementById('adminPass')?.value.trim();

    if (email === 'admin@trivediassociates.com' && pass === 'Trivedi@2026') {
      localStorage.setItem('ta_admin_token', 'ta_jwt_auth_token_active');
      localStorage.setItem('ta_admin_user', JSON.stringify({ email, role: 'SuperAdmin' }));
      showDashboard();
    } else {
      if (adminLoginAlert) {
        adminLoginAlert.style.display = 'block';
        adminLoginAlert.textContent = 'Invalid credentials. Use admin@trivediassociates.com / Trivedi@2026';
      }
    }
  });

  // Admin Logout
  adminLogoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('ta_admin_token');
    localStorage.removeItem('ta_admin_user');
    showLogin();
  });

  // Tab switching
  const switchTab = (tab) => {
    [tabBtnAdd, tabBtnProjects, tabBtnLeads].forEach(b => b?.classList.remove('active'));
    [tabPanelAdd, tabPanelProjects, tabPanelLeads].forEach(p => { if (p) p.style.display = 'none'; });

    if (tab === 'add') {
      tabBtnAdd?.classList.add('active');
      if (tabPanelAdd) tabPanelAdd.style.display = 'block';
    } else if (tab === 'projects') {
      tabBtnProjects?.classList.add('active');
      if (tabPanelProjects) tabPanelProjects.style.display = 'block';
      renderProjectsList();
    } else if (tab === 'leads') {
      tabBtnLeads?.classList.add('active');
      if (tabPanelLeads) tabPanelLeads.style.display = 'block';
      renderLeadsList();
    }
  };

  tabBtnAdd?.addEventListener('click', () => switchTab('add'));
  tabBtnProjects?.addEventListener('click', () => switchTab('projects'));
  tabBtnLeads?.addEventListener('click', () => switchTab('leads'));

  // Render Projects in Admin
  function renderProjectsList() {
    if (!adminProjectsList) return;
    const stored = JSON.parse(localStorage.getItem('ta_admin_projects') || '[]');
    if (stored.length === 0) {
      adminProjectsList.innerHTML = '<div style="color: #777; font-size: 13px; padding: 12px 0;">No custom projects added yet. Use "Add New Project" to publish your first development.</div>';
      return;
    }
    adminProjectsList.innerHTML = stored.map((p, idx) => `
      <div class="admin-item-card">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${p.image}" style="width: 48px; height: 38px; object-fit: cover; border-radius: 4px;" alt="${p.titleMain}">
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #FFF;">${p.titleMain} ${p.titleItalic}</div>
            <div style="font-size: 11px; color: var(--color-gold);">${p.category} &bull; ${p.subtitle}</div>
          </div>
        </div>
        <button class="admin-del-btn" data-proj-id="${p.id}">Delete</button>
      </div>
    `).join('');

    adminProjectsList.querySelectorAll('.admin-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-proj-id');
        let current = JSON.parse(localStorage.getItem('ta_admin_projects') || '[]');
        current = current.filter(item => item.id !== id);
        localStorage.setItem('ta_admin_projects', JSON.stringify(current));
        renderProjectsList();
        // Remove from showcase track
        const cards = cardsTrack?.querySelectorAll('.custom-project-card');
        cards?.forEach(c => c.remove());
        loadCustomProjects();
      });
    });
  }

  // Render Leads in Admin
  function renderLeadsList() {
    if (!adminLeadsList) return;
    const leads = JSON.parse(localStorage.getItem('ta_admin_leads') || '[]');
    if (leads.length === 0) {
      adminLeadsList.innerHTML = '<div style="color: #777; font-size: 13px; padding: 12px 0;">No inquiries received yet. Inquiries from the website contact form will appear here.</div>';
      return;
    }
    adminLeadsList.innerHTML = leads.map(l => `
      <div class="admin-item-card" style="flex-direction: column; align-items: flex-start; gap: 8px;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span style="font-weight: 600; color: #FFF; font-size: 14px;">${l.name}</span>
          <span style="font-size: 11px; color: #888;">${l.createdAt}</span>
        </div>
        <div style="font-size: 12px; color: var(--color-gold);">
          <strong>Phone:</strong> ${l.phone} &nbsp;|&nbsp; <strong>Email:</strong> ${l.email}
        </div>
        <div style="font-size: 12px; color: #CCC;">
          <strong>Service:</strong> ${l.service}
        </div>
        <div style="font-size: 12px; color: #999; font-style: italic;">
          "${l.message}"
        </div>
      </div>
    `).join('');
  }

  // Add New Project Form Submit
  newProjectForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleMain = document.getElementById('projTitleMain')?.value.trim();
    const titleItalic = document.getElementById('projTitleItalic')?.value.trim();
    const category = document.getElementById('projCategory')?.value;
    const subtitle = document.getElementById('projSubtitle')?.value.trim();
    const image = document.getElementById('projImageSelect')?.value;

    const newProj = {
      id: 'proj_' + Date.now(),
      titleMain,
      titleItalic,
      category,
      subtitle,
      image
    };

    const stored = JSON.parse(localStorage.getItem('ta_admin_projects') || '[]');
    stored.push(newProj);
    localStorage.setItem('ta_admin_projects', JSON.stringify(stored));

    // Also append to website showcase immediately
    if (cardsTrack) {
      const card = document.createElement('div');
      card.className = 'project-card custom-project-card';
      card.innerHTML = `
        <img src="${image}" alt="${titleMain}" class="project-card-img">
        <div class="project-card-overlay">
          <h3 class="card-title">${titleMain} <br><span class="italic-serif">${titleItalic}</span></h3>
          <p class="card-subtitle">${subtitle}</p>
        </div>
      `;
      cardsTrack.appendChild(card);
    }

    if (adminDashAlert) {
      adminDashAlert.style.display = 'block';
      adminDashAlert.textContent = `Success! "${titleMain} ${titleItalic}" has been published to the portfolio showcase.`;
      setTimeout(() => { adminDashAlert.style.display = 'none'; }, 4000);
    }

    newProjectForm.reset();
    switchTab('projects');
  });
});
