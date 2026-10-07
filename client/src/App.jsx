import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpandableServices from './components/ExpandableServices';
import CompanyMarquee from './components/CompanyMarquee';
import EnquiryForm from './components/EnquiryForm';
import Aesthetics from './components/Aesthetics';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import { ConnectModal, MobileDrawer } from './components/Modals';
import AdminPanel from './components/AdminPanel';
import BlogSection from './components/BlogSection';

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [projectsRefreshKey, setProjectsRefreshKey] = useState(0);

  // Redirect #admin or /admin to standalone admin.html
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        window.location.href = '/admin.html';
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleSelectServiceFromCard = (serviceTitle) => {
    setSelectedService(serviceTitle);
    const formEl = document.getElementById('enquiry-form-section');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="trivedi-app minimalist-theme">
      {/* 0. Top Navigation */}
      <Navbar
        onOpenConnect={() => setIsConnectOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 1. Hero Section */}
      <Hero onOpenConnect={() => setIsConnectOpen(true)} />

      {/* 2. Four Main Headings (Expand on Click) from Whiteboard */}
      <ExpandableServices onSelectService={handleSelectServiceFromCard} />

      {/* 3. Infinite Marquee Moving Company */}
      <CompanyMarquee />

      {/* 4. Enquiry Form ("Form fill data to help us reach you") */}
      <EnquiryForm preselectedService={selectedService} />

      {/* 5. Featured Architectural Projects Carousel (Dynamic via Admin Panel) */}
      <Aesthetics refreshTrigger={projectsRefreshKey} />

      {/* 6. About Trivedi Associates */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-text-col">
            <span className="services-eyebrow">ABOUT THE PRACTICE &bull; TRIVEDI ASSOCIATES</span>
            <h2 className="services-main-title" style={{ textAlign: 'left', marginBottom: '18px' }}>
              Engineering Landmarks with <br />
              <span className="italic-serif">Timeless Precision</span>
            </h2>
            <p className="about-paragraph">
              Headquartered in Mumbai, <strong>Trivedi Associates</strong> is a premier multidisciplinary consultancy uniting master design planning, rigorous project management (PMC), municipal &amp; government liaisoning, IGBC/LEED green building advisory, and technical auditing under one integrated practice.
            </p>
            <p className="about-paragraph">
              From luxury residential towers and township developments to high-compliance commercial landmarks across Powai, Thane, and South Mumbai, we partner with India’s foremost developers to deliver statutory certainty and design distinction.
            </p>
          </div>
          <div className="about-metrics-grid">
            <div className="about-metric-card">
              <div className="metric-number">05</div>
              <div className="metric-label">Core Consulting Verticals</div>
            </div>
            <div className="about-metric-card">
              <div className="metric-number">100%</div>
              <div className="metric-label">Statutory &amp; BMC Compliance</div>
            </div>
            <div className="about-metric-card">
              <div className="metric-number">IGBC</div>
              <div className="metric-label">&amp; LEED Certified Advisory</div>
            </div>
            <div className="about-metric-card">
              <div className="metric-number">360&deg;</div>
              <div className="metric-label">Concept to OC Turnkey Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Blog & Industry Insights Section */}
      <BlogSection />

      {/* 8. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Action Controls */}
      <FloatingControls onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Modals */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenConnect={() => setIsConnectOpen(true)}
      />

      {/* Admin Panel Console */}
      {isAdminOpen && (
        <AdminPanel
          onClose={handleCloseAdmin}
          onProjectsUpdated={() => setProjectsRefreshKey((prev) => prev + 1)}
        />
      )}
    </div>
  );
}
