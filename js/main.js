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

        alert('Thank you! Your information has been received. Our senior consultant will reach you promptly.');
        enquiryForm.reset();
      } catch (err) {
        alert('Thank you! Your information has been noted. We will contact you at +91 7977117256.');
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

  if (cardsTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const cards = cardsTrack.querySelectorAll('.project-card');

    nextBtn.addEventListener('click', () => {
      currentSlide = currentSlide >= cards.length - 1 ? 0 : currentSlide + 1;
      cardsTrack.style.transform = `translateX(-${currentSlide * 568}px)`;
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = currentSlide <= 0 ? cards.length - 1 : currentSlide - 1;
      cardsTrack.style.transform = `translateX(-${currentSlide * 568}px)`;
    });
  }
});
