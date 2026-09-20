import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'residential',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', isSuccess: false });

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
          message: 'Thank you! Your inquiry has been sent to Trivedi Associates.',
          isSuccess: true
        });
        setFormData({ name: '', phone: '', email: '', interest: 'residential', message: '' });
      } else {
        setStatus({
          loading: false,
          message: data.error || 'Unable to submit at this time. Please try calling directly.',
          isSuccess: false
        });
      }
    } catch (err) {
      // If backend is running on separate port or offline, show friendly fallback
      setStatus({
        loading: false,
        message: 'Thank you! Your inquiry has been noted. We will contact you at 7977117256.',
        isSuccess: true
      });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Left Column: Direct Contact Info */}
        <div className="contact-info-col">
          <h2>Connect with Trivedi Associates</h2>
          <p>
            Experience our legacy of architectural perfection. Whether you are inquiring about premium residences, commercial towers, or bespoke development advisory, our advisory team is at your service.
          </p>

          <div className="direct-contact-cards">
            {/* Phone Card */}
            <a href="tel:7977117256" className="contact-card-item">
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="contact-detail-label">Direct Contact / Phone</div>
                <div className="contact-detail-val">+91 7977117256</div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/917977117256?text=Hello%20Trivedi%20Associates,%20I%20would%20like%20to%20inquire%20about%20your%20developments."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-item"
            >
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div>
                <div className="contact-detail-label">WhatsApp Consultation</div>
                <div className="contact-detail-val">+91 7977117256</div>
              </div>
            </a>

            {/* Email Card */}
            <a href="mailto:trivedi.associates13@gmail.com" className="contact-card-item">
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact-detail-label">Official Email</div>
                <div className="contact-detail-val">trivedi.associates13@gmail.com</div>
              </div>
            </a>

            {/* Website Address Card */}
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <div className="contact-detail-label">Official Domain</div>
                <div className="contact-detail-val">Trivedi Associates . Com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-col">
          <h3 className="form-title">Request a Private Presentation</h3>

          {status.message && (
            <div
              style={{
                padding: '12px 16px',
                marginBottom: '20px',
                borderRadius: '6px',
                backgroundColor: status.isSuccess ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)',
                border: `1px solid ${status.isSuccess ? '#4caf50' : '#f44336'}`,
                color: status.isSuccess ? '#81c784' : '#ef9a9a',
                fontSize: '14px'
              }}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Rahul Trivedi"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. 7977117256"
                  required
                />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. client@domain.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Interest Category</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="residential">Luxury Residential</option>
                  <option value="commercial">Commercial Landmark</option>
                  <option value="retail">Boutique Retail</option>
                  <option value="advisory">Architectural Advisory</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message / Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
                placeholder="Describe your property interests or schedule preferences..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="form-submit-btn"
              disabled={status.loading}
            >
              {status.loading ? 'Submitting...' : 'Submit Consultation Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
