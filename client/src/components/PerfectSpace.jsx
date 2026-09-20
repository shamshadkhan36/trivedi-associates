import React from 'react';

export default function PerfectSpace({ onOpenConnect }) {
  return (
    <section className="perfect-space-section">
      <img
        src="/assets/images/perfect_space_bg.jpg"
        alt="Trivedi Associates Grandeur"
        className="perfect-space-bg"
      />
      <div className="perfect-space-overlay"></div>

      <div className="perfect-space-content">
        <h2 className="perfect-space-title">
          Find your <span className="italic-serif">perfect</span> <br />
          <span className="italic-serif">space</span> with us
        </h2>
        <button
          className="btn-double-border"
          onClick={onOpenConnect}
        >
          Let's Connect
        </button>
      </div>
    </section>
  );
}
