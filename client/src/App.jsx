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

  // Check URL hash for #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
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

      {/* 6. Footer */}
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
