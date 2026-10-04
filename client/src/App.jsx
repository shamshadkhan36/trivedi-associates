import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpandableServices from './components/ExpandableServices';
import CompanyMarquee from './components/CompanyMarquee';
import EnquiryForm from './components/EnquiryForm';
import Aesthetics from './components/Aesthetics';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import { ConnectModal, SearchModal, MobileDrawer } from './components/Modals';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        onOpenSearch={() => setIsSearchOpen(true)}
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
              Headquartered in Mumbai, <strong>Trivedi Associates</strong> is a premier multidisciplinary consultancy uniting master design planning, rigorous project management (PMC), municipal &amp; government liaisoning, and IGBC/LEED green building advisory under one integrated practice.
            </p>
            <p className="about-paragraph">
              From luxury residential towers and township developments to high-compliance commercial landmarks across Powai, Thane, and South Mumbai, we partner with India’s foremost developers to deliver statutory certainty and design distinction.
            </p>
          </div>
          <div className="about-metrics-grid">
            <div className="about-metric-card">
              <div className="metric-number">04</div>
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

      {/* 7. Architectural & Regulatory Insights */}
      <section className="insights-section" id="insights">
        <div className="insights-container">
          <div className="services-header-wrap">
            <div className="services-eyebrow">KNOWLEDGE &amp; ADVISORY &bull; INSIGHTS</div>
            <h2 className="services-main-title">
              Technical Briefs &amp; <br />
              <span className="italic-serif">Industry Perspectives</span>
            </h2>
          </div>
          <div className="insights-grid">
            <article className="insight-card">
              <span className="insight-tag">LIAISONING &amp; APPROVALS</span>
              <h3 className="insight-title">Navigating DCPR 2034 &amp; Fast-Track BMC Sanctions in Mumbai</h3>
              <p className="insight-desc">Strategic frameworks for optimizing FSI utilization, fungible compensatory areas, and streamlined IOD-to-OC approval workflows.</p>
              <a href="#enquiry-form-section" className="insight-link">Request Advisory Brief &rarr;</a>
            </article>
            <article className="insight-card">
              <span className="insight-tag">GREEN BUILDING</span>
              <h3 className="insight-title">IGBC &amp; LEED Platinum Certification: ROI for Modern Developments</h3>
              <p className="insight-desc">How passive solar orientation, energy modeling, and sustainable material selection unlock additional incentive FSI and lower lifecycle costs.</p>
              <a href="#enquiry-form-section" className="insight-link">Request Advisory Brief &rarr;</a>
            </article>
            <article className="insight-card">
              <span className="insight-tag">PROJECT MANAGEMENT (PMC)</span>
              <h3 className="insight-title">Zero-Deviation Execution: Cost &amp; Quality Audits in High-Rise Construction</h3>
              <p className="insight-desc">Implementing multi-stage structural quality audits, BOQ cost controls, and milestone tracking for on-schedule delivery.</p>
              <a href="#enquiry-form-section" className="insight-link">Request Advisory Brief &rarr;</a>
            </article>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Action Controls */}
      <FloatingControls onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Modals */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
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
