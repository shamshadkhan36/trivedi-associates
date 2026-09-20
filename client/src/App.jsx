import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skylines from './components/Skylines';
import Aesthetics from './components/Aesthetics';
import Legacy from './components/Legacy';
import PerfectSpace from './components/PerfectSpace';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import { ConnectModal, SearchModal, MobileDrawer } from './components/Modals';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [projectsRefreshKey, setProjectsRefreshKey] = useState(0);

  // Check if URL hash has #admin on initial load or change
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

  const handleProjectsUpdated = () => {
    setProjectsRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="trivedi-app">
      {/* Top Sticky Luxury Navigation */}
      <Navbar
        onOpenConnect={() => setIsConnectOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Section 1: Hero (Image 1) */}
      <Hero onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Section 2: Shaping Skylines with Timeless Design (Image 2) */}
      <Skylines />

      {/* Section 3: A Seamless Blend of Purpose and Aesthetics (Image 3) */}
      <Aesthetics refreshTrigger={projectsRefreshKey} />

      {/* Section 4: Our Legacy (Image 4) */}
      <Legacy />

      {/* Section 5: Find your perfect space with us (Image 5) */}
      <PerfectSpace onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Section 6: Consultation & Direct Contact Cards */}
      <ContactSection />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Action Controls */}
      <FloatingControls onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Modals & Drawers */}
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

      {/* Admin Panel Modal / View */}
      {isAdminOpen && (
        <AdminPanel
          onClose={handleCloseAdmin}
          onProjectsUpdated={handleProjectsUpdated}
        />
      )}
    </div>
  );
}
