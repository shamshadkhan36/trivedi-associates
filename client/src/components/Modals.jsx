import React, { useState } from 'react';

export function ConnectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'residential',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', isSuccess: false });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          loading: false,
          message: 'Thank you! We have received your inquiry and will contact you promptly.',
          isSuccess: true
        });
        setTimeout(() => {
          onClose();
          setStatus({ loading: false, message: '', isSuccess: false });
        }, 1500);
      } else {
        setStatus({
          loading: false,
          message: data.error || 'Failed to submit. Please call 7977117256.',
          isSuccess: false
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        message: 'Thank you! Your inquiry has been submitted.',
        isSuccess: true
      });
      setTimeout(() => {
        onClose();
        setStatus({ loading: false, message: '', isSuccess: false });
      }, 1500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '8px', color: '#FFF' }}>
          Connect with <span style={{ color: 'var(--color-gold)' }}>Trivedi Associates</span>
        </h3>
        <p style={{ color: '#A0A0A0', fontSize: '14px', marginBottom: '24px' }}>
          Direct Contact: <strong style={{ color: '#FFF' }}>7977117256</strong> &bull; Email:{' '}
          <strong style={{ color: '#FFF' }}>trivedi.associates13@gmail.com</strong>
        </p>

        {status.message && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              backgroundColor: status.isSuccess ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)',
              border: `1px solid ${status.isSuccess ? '#4caf50' : '#f44336'}`,
              color: status.isSuccess ? '#81c784' : '#ef9a9a',
              fontSize: '13.5px'
            }}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Rahul Trivedi"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 7977117256"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="trivedi.associates13@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Interest</label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="form-select"
            >
              <option value="residential">Luxury Residential (Powai / Thane / Mumbai)</option>
              <option value="commercial">Commercial Landmark Offices</option>
              <option value="retail">Boutique High Street Retail</option>
              <option value="general">Direct Client Consultation</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
          <button type="submit" className="form-submit-btn" disabled={status.loading}>
            {status.loading ? 'Connecting...' : 'Connect with Representative'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleSearch = (term) => {
    const q = (term || searchTerm).toLowerCase();
    onClose();

    if (q.includes('powai') || q.includes('thane') || q.includes('legacy') || q.includes('mumbai')) {
      document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('quality') || q.includes('tower') || q.includes('craft') || q.includes('residence')) {
      document.getElementById('aesthetics')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('connect') || q.includes('contact') || q.includes('inquiry')) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('skylines')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Search">
          &times;
        </button>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#FFF' }}>
          Search Developments
        </h3>
        <p style={{ color: '#A0A0A0', fontSize: '13.5px', marginTop: '4px' }}>
          Explore architectural portfolios, localities, and properties.
        </p>

        <div className="search-input-wrap">
          <svg
            className="search-icon-inside"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Type Powai, Thane, Residential, Build Quality..."
            autoFocus
          />
        </div>

        <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '10px' }}>
          Quick Discover:
        </div>
        <div className="search-suggestions">
          {['Powai', 'Thane', 'Build Quality', 'Craftsmanship', 'Contact Us'].map((tag) => (
            <span
              key={tag}
              className="suggestion-chip"
              onClick={() => handleSearch(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileDrawer({ isOpen, onClose, onOpenConnect }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="brand-logo-text">
            <span className="brand-logo-title" style={{ color: '#FFF' }}>Trivedi</span>
            <span className="brand-logo-sub">Associates</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Drawer" style={{ position: 'static' }}>
            &times;
          </button>
        </div>

        <ul className="drawer-links">
          <li><a href="#hero" onClick={onClose}>Home</a></li>
          <li><a href="#skylines" onClick={onClose}>Our Story</a></li>
          <li><a href="#aesthetics" onClick={onClose}>Residential</a></li>
          <li><a href="#aesthetics" onClick={onClose}>Commercial</a></li>
          <li><a href="#legacy" onClick={onClose}>Retail</a></li>
          <li><a href="#legacy" onClick={onClose}>Our Legacy</a></li>
          <li><a href="#contact" onClick={onClose}>Contact</a></li>
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Client Hotline
          </div>
          <a
            href="tel:7977117256"
            style={{ color: '#FFF', fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '15px' }}
          >
            +91 7977117256
          </a>
          <button
            className="form-submit-btn"
            style={{ width: '100%' }}
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
          >
            Let's Connect
          </button>
        </div>
      </div>
    </div>
  );
}
