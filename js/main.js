/**
 * Trivedi Associates - Interactive Luxury Architecture Theme
 * Handles Navigation, Animated Number Counters, Project Carousel,
 * Locality Tabs, Modals, and Contact Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------- NAVBAR SCROLL EFFECT -----------------
  const headerNav = document.querySelector('.header-nav');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 60) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Smooth Back to Top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hero Scroll Indicator Click
  const heroScrollIndicator = document.getElementById('heroScrollIndicator');
  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', () => {
      const skylinesSection = document.getElementById('skylines');
      if (skylinesSection) {
        skylinesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ----------------- ANIMATED NUMBER COUNTERS -----------------
  const counterElements = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = counter.getAttribute('data-decimal') === 'true';
      const duration = 2000; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = progress * target;

        if (isDecimal) {
          counter.textContent = (easeProgress * target).toFixed(2);
        } else {
          counter.textContent = Math.floor(easeProgress * target).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          if (isDecimal) {
            counter.textContent = target.toFixed(2);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const skylinesSection = document.getElementById('skylines');
  if (skylinesSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(skylinesSection);
  }

  // ----------------- PROJECT CAROUSEL SLIDER -----------------
  const cardsTrack = document.getElementById('cardsTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  
  if (cardsTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const cards = cardsTrack.querySelectorAll('.project-card');
    const totalCards = cards.length;

    const getSlideWidth = () => {
      if (cards.length === 0) return 568;
      const cardStyle = window.getComputedStyle(cards[0]);
      const cardWidth = cards[0].offsetWidth;
      const gap = 28;
      return cardWidth + gap;
    };

    const updateSlider = () => {
      const maxSlides = window.innerWidth <= 768 ? totalCards - 1 : Math.max(0, totalCards - 2);
      if (currentSlide > maxSlides) currentSlide = 0;
      if (currentSlide < 0) currentSlide = maxSlides;

      const slideAmount = currentSlide * getSlideWidth();
      cardsTrack.style.transform = `translateX(-${slideAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
      const maxSlides = window.innerWidth <= 768 ? totalCards - 1 : Math.max(0, totalCards - 2);
      if (currentSlide >= maxSlides) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      const maxSlides = window.innerWidth <= 768 ? totalCards - 1 : Math.max(0, totalCards - 2);
      if (currentSlide <= 0) {
        currentSlide = maxSlides;
      } else {
        currentSlide--;
      }
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
  }

  // ----------------- LEGACY LOCALITY SWITCHER -----------------
  const locationCards = document.querySelectorAll('.location-thumb-card');
  const legacyDesc = document.getElementById('legacyDesc');

  const localityDescriptions = {
    powai: "Walk past the lanes of Powai where Trivedi Associates has crafted architectural landmarks amidst serene lakeside greens, neoclassical facades, and vibrant modern lifestyles.",
    thane: "Discover our expansive townships in Thane, bringing tranquil nature, manicured promenades, and monumental classical design to luxurious living spaces.",
    mumbai: "Immerse in our signature high-rise residences across South Mumbai, blending timeless heritage aesthetics with panoramic Arabian Sea views and elite urban connectivity."
  };

  locationCards.forEach(card => {
    card.addEventListener('click', () => {
      locationCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const locKey = card.getAttribute('data-locality');
      if (localityDescriptions[locKey] && legacyDesc) {
        legacyDesc.style.opacity = '0';
        setTimeout(() => {
          legacyDesc.textContent = localityDescriptions[locKey];
          legacyDesc.style.opacity = '1';
        }, 200);
      }
    });
  });

  // ----------------- MODAL CONTROLS -----------------
  const connectModal = document.getElementById('connectModal');
  const searchModal = document.getElementById('searchModal');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  // Triggers
  const openConnectBtns = document.querySelectorAll('.open-connect-modal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const openMobileMenuBtn = document.getElementById('openMobileMenuBtn');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  // Open Connect Modal
  openConnectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
      }
      connectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Open Search Modal
  if (openSearchBtn) {
    openSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const searchInput = document.getElementById('searchInput');
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
    });
  }

  // Open Mobile Drawer
  if (openMobileMenuBtn) {
    openMobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  // Close Modals
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on Backdrop Click
  window.addEventListener('click', (e) => {
    if (e.target === connectModal || e.target === searchModal) {
      closeAllModals();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    if (connectModal) connectModal.classList.remove('active');
    if (searchModal) searchModal.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Drawer Nav link clicks
  const drawerLinks = document.querySelectorAll('.drawer-links a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // ----------------- SEARCH FUNCTIONALITY -----------------
  const searchInput = document.getElementById('searchInput');
  const searchChips = document.querySelectorAll('.suggestion-chip');

  searchChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = chip.textContent.trim();
        performSearch(chip.textContent.trim());
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }

  function performSearch(query) {
    const q = query.toLowerCase();
    closeAllModals();
    
    if (q.includes('powai') || q.includes('thane') || q.includes('legacy') || q.includes('mumbai')) {
      document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('quality') || q.includes('tower') || q.includes('craftsmanship') || q.includes('residence')) {
      document.getElementById('aesthetics')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('connect') || q.includes('contact') || q.includes('price') || q.includes('inquiry')) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('skylines')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ----------------- FORM SUBMISSIONS -----------------
  const inquiryForms = document.querySelectorAll('.ajax-inquiry-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for contacting Trivedi Associates! Our senior architectural relationship manager will contact you promptly at your provided details.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeAllModals();
      }, 900);
    });
  });
});
