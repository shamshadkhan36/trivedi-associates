import React, { useState, useEffect } from 'react';

export default function EnquiryForm({ preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    service: 'Design & Planning',
    phone: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false, waUrl: '' });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
      const formEl = document.getElementById('enquiry-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentName = formData.name.trim();
    const currentPhone = formData.phone.trim();
    const currentService = formData.service;
    const currentDetail = formData.detail.trim();
    const currentEmail = formData.email.trim();
    const currentMessage = formData.message.trim();

    if (!currentName || currentName.length < 2) {
      setStatus({ loading: false, message: 'Please enter your full name (minimum 2 characters).', isSuccess: false, waUrl: '' });
      return;
    }
    const cleanPhoneDigits = currentPhone.replace(/\D/g, '');
    if (!cleanPhoneDigits || cleanPhoneDigits.length < 8) {
      setStatus({ loading: false, message: 'Please provide a valid contact number (minimum 8 to 10 digits).', isSuccess: false, waUrl: '' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentEmail || !emailRegex.test(currentEmail)) {
      setStatus({ loading: false, message: 'Please enter a valid email address (e.g. yourname@domain.com).', isSuccess: false, waUrl: '' });
      return;
    }

    setStatus({ loading: true, message: '', isSuccess: false, waUrl: '' });

    const waText = `Hello Trivedi Associates,\n\nI have submitted an enquiry on your website.\n*Name:* ${currentName}\n*Organization:* ${currentDetail || 'N/A'}\n*Service:* ${currentService}\n*Phone:* ${currentPhone}\n*Email:* ${currentEmail}\n*Requirements:* ${currentMessage || 'N/A'}`;
    const waUrl = `https://wa.me/917977117256?text=${encodeURIComponent(waText)}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentName,
          phone: currentPhone,
          email: currentEmail,
          interest: `${currentService} (${currentDetail || 'Individual'})`,
          message: currentMessage
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Server error recording your enquiry.');
      }

      setStatus({
        loading: false,
        message: `Thank you, ${currentName}! Your project brief has been recorded. Our senior consultant will connect with you promptly at ${currentPhone}.`,
        isSuccess: true,
        waUrl
      });

      setFormData({
        name: '',
        detail: '',
        service: 'Design & Planning',
        phone: '',
        email: '',
        message: ''
      });
    } catch (err) {
      console.warn('POST /api/contact error:', err);
      setStatus({
        loading: false,
        message: err.message || 'Unable to submit enquiry. Please connect with us directly on WhatsApp.',
        isSuccess: false,
        waUrl: `https://wa.me/917977117256?text=${encodeURIComponent(waText)}`
      });
    }
  };

  return (
    <section className="enquiry-section" id="enquiry-form-section">
      <div className="enquiry-container">
        {/* Left Column: Direct Outreach & Minimalist Copy */}
        <div className="enquiry-info-column">
          <span className="enquiry-eyebrow">CONSULTATION &amp; ADVISORY</span>
          <h2 className="enquiry-main-heading">
            Fill in your data to <br />
            <span className="italic-serif">help us reach you</span>
          </h2>
          <p className="enquiry-description">
            Share your project requirements, location, or consulting needs. Our senior design and project management principals will contact you with a tailored technical brief.
          </p>

          <div className="direct-cards-wrapper">
            <a href="tel:7977117256" className="minimal-contact-card">
              <div className="contact-badge-label">Direct Phone Hotline</div>
              <div className="contact-badge-val">+91 7977117256</div>
            </a>

            <a
              href="https://wa.me/917977117256?text=Hello%20Trivedi%20Associates,%20I%20would%20like%20to%20consult%20regarding%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="minimal-contact-card"
            >
              <div className="contact-badge-label">WhatsApp Quick Connect</div>
              <div className="contact-badge-val">+91 7977117256</div>
            </a>

            <a href="mailto:trivedi.associates13@gmail.com" className="minimal-contact-card">
              <div className="contact-badge-label">Official Email Correspondence</div>
              <div className="contact-badge-val">trivedi.associates13@gmail.com</div>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Minimalist Form */}
        <div className="enquiry-form-card">
          <h3 className="form-card-title">Enquiry Details</h3>
          <p className="form-card-subtitle">Please fill in the fields below:</p>

          {status.message && (
            <div
              className={`status-message-alert ${status.isSuccess ? 'success' : 'error'}`}
              style={{ textAlign: 'center', padding: '18px', marginBottom: '20px' }}
            >
              <div style={{ marginBottom: status.waUrl ? '12px' : '0' }}>{status.message}</div>
              {status.waUrl && (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
                  <a
                    href={status.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      padding: '9px 18px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(37,211,102,0.3)'
                    }}
                  >
                    Direct WhatsApp &rarr;
                  </a>
                  <a
                    href="tel:7977117256"
                    style={{
                      background: 'var(--color-wine, #70341A)',
                      color: '#FFFFFF',
                      padding: '9px 18px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Call Hotline
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="minimal-form-layout">
            <div className="input-row-grid">
              <div className="input-field-group">
                <label className="minimal-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Trivedi"
                  className="minimal-input"
                  required
                />
              </div>

              <div className="input-field-group">
                <label className="minimal-label">Detail / Organization</label>
                <input
                  type="text"
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  placeholder="e.g. Developer / Landowner / Firm"
                  className="minimal-input"
                />
              </div>
            </div>

            <div className="input-row-grid">
              <div className="input-field-group">
                <label className="minimal-label">Select Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="minimal-select"
                >
                  <option value="Design & Planning">1. Design &amp; Planning</option>
                  <option value="Project Management Consultant (PMC)">2. Project Management Consultant (PMC)</option>
                  <option value="Liaisoning & Approvals">3. Liaisoning &amp; Approvals</option>
                  <option value="Green Building Consultant">4. Green Building Consultant</option>
                  <option value="Auditing and Cost Management">5. Auditing and Cost Management</option>
                  <option value="Comprehensive Advisory">Comprehensive Turnkey Advisory</option>
                </select>
              </div>

              <div className="input-field-group">
                <label className="minimal-label">Contact Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 7977117256"
                  className="minimal-input"
                  required
                />
              </div>
            </div>

            <div className="input-field-group">
              <label className="minimal-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. client@domain.com"
                className="minimal-input"
                required
              />
            </div>

            <div className="input-field-group">
              <label className="minimal-label">Project Details / Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe project scope, plot size, location, or stage of approval..."
                rows="4"
                className="minimal-textarea"
              ></textarea>
            </div>

            <button
              type="submit"
              className="minimal-submit-btn"
              disabled={status.loading}
            >
              {status.loading ? 'Transmitting Data...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
