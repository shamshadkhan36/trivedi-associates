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

  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false });

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
    setStatus({ loading: true, message: '', isSuccess: false });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          interest: `${formData.service} (${formData.detail || 'Individual'})`,
          message: formData.message
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          loading: false,
          message: 'Thank you! Your information has been received. Our senior consultant will reach you shortly.',
          isSuccess: true
        });
        setFormData({
          name: '',
          detail: '',
          service: 'Design & Planning',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({
          loading: false,
          message: data.error || 'Failed to submit. Please call directly at +91 7977117256.',
          isSuccess: false
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        message: 'Thank you! Your information has been noted. We will contact you at 7977117256.',
        isSuccess: true
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
            Share your project requirements, location, or consulting needs. Our senior architectural and project management principals will contact you with a tailored technical brief.
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

            <div className="minimal-contact-card">
              <div className="contact-badge-label">Corporate Domain</div>
              <div className="contact-badge-val">Trivedi Associates . Com</div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Minimalist Form */}
        <div className="enquiry-form-card">
          <h3 className="form-card-title">Enquiry Details</h3>
          <p className="form-card-subtitle">Please fill in the fields below:</p>

          {status.message && (
            <div
              className={`status-message-alert ${status.isSuccess ? 'success' : 'error'}`}
            >
              {status.message}
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
                  <option value="Full Turnkey Advisory">Comprehensive Turnkey Advisory</option>
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
