import React, { useState, useEffect } from 'react';

export default function AdminPanel({ onClose, onProjectsUpdated }) {
  const [token, setToken] = useState(() => localStorage.getItem('ta_admin_token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ta_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [loginCreds, setLoginCreds] = useState({
    username: 'admin@trivediassociates.com',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'add' | 'inquiries'
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // New Project Form
  const [newProject, setNewProject] = useState({
    titleMain: '',
    titleItalic: '',
    subtitle: '',
    category: 'Residential',
    image: '/assets/images/project_card_1.jpg'
  });

  const presetImages = [
    { label: 'Neoclassical Facade', url: '/assets/images/project_card_1.jpg' },
    { label: 'Signature Tower', url: '/assets/images/project_card_2.jpg' },
    { label: 'Lush Residence', url: '/assets/images/project_card_3.jpg' },
    { label: 'Imperial Crest', url: '/assets/images/project_card_4.jpg' }
  ];

  // Fetch projects and inquiries if logged in
  useEffect(() => {
    if (token) {
      fetchProjects();
      fetchInquiries();
    }
  }, [token]);

  const fetchProjects = async () => {
    try {
      setLoadingData(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchInquiries = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries', err);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginCreds)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('ta_admin_token', data.token);
        localStorage.setItem('ta_admin_user', JSON.stringify(data.user));
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Could not connect to server. Please ensure backend is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('ta_admin_token');
    localStorage.removeItem('ta_admin_user');
  };

  // Handle Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!newProject.titleMain || !newProject.titleItalic || !newProject.image) {
      setStatusMsg({ type: 'error', text: 'Please provide Main Title, Italic Accent, and Image URL.' });
      return;
    }

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProject)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Project published successfully!' });
        setNewProject({
          titleMain: '',
          titleItalic: '',
          subtitle: '',
          category: 'Residential',
          image: '/assets/images/project_card_1.jpg'
        });
        fetchProjects();
        if (onProjectsUpdated) onProjectsUpdated();
        setTimeout(() => {
          setActiveTab('projects');
          setStatusMsg({ type: '', text: '' });
        }, 1200);
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to add project' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error publishing project' });
    }
  };

  // Handle Delete Project
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchProjects();
        if (onProjectsUpdated) onProjectsUpdated();
      } else {
        alert(data.error || 'Could not delete project');
      }
    } catch (err) {
      alert('Error connecting to backend');
    }
  };

  // Handle Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchInquiries();
      }
    } catch (err) {
      alert('Error deleting inquiry');
    }
  };

  // ==================== 1. LOGIN SCREEN ====================
  if (!token) {
    return (
      <div style={styles.overlay}>
        <div style={styles.loginCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={styles.logoIcon}>
                <svg viewBox="0 0 100 100" width="22" height="22">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M30 36 L70 36 M50 36 L50 78 M38 78 L62 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FFF' }}>
                  Trivedi Associates
                </h2>
                <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                  Admin Operations Console
                </div>
              </div>
            </div>
            <button onClick={onClose} style={styles.closeBtn} title="Back to Website">&times;</button>
          </div>

          <p style={{ color: '#A0A0A0', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
            Enter your authorized administrative credentials to manage development projects, portfolio showcases, and client inquiries.
          </p>

          {loginError && (
            <div style={styles.errorBanner}>{loginError}</div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={styles.label}>Admin Email / Username</label>
              <input
                type="text"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                style={styles.input}
                placeholder="admin@trivediassociates.com"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                style={styles.input}
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={styles.primaryBtn}
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Admin Portal'}
            </button>
          </form>

          <div style={styles.credentialHint}>
            <span style={{ color: 'var(--color-gold)' }}>Default Credentials:</span><br />
            Username: <code>admin@trivediassociates.com</code><br />
            Password: <code>Trivedi@2026</code>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={onClose} style={{ color: '#888', fontSize: '13px', textDecoration: 'underline' }}>
              &larr; Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 2. ADMIN DASHBOARD ====================
  return (
    <div style={styles.overlay}>
      <div style={styles.dashboardContainer}>
        {/* Top Console Bar */}
        <header style={styles.consoleHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={styles.logoIcon}>
              <svg viewBox="0 0 100 100" width="22" height="22">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M30 36 L70 36 M50 36 L50 78 M38 78 L62 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '1.5px', color: '#FFF', textTransform: 'uppercase' }}>
                Trivedi Associates
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '1.8px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Management Console &bull; Logged in as {user?.username || 'Admin'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onClose} style={styles.secondaryBtn}>
              &larr; View Live Website
            </button>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Dashboard Navigation Tabs */}
        <div style={styles.tabBar}>
          <button
            style={activeTab === 'projects' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('projects')}
          >
            All Projects ({projects.length})
          </button>
          <button
            style={activeTab === 'add' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('add')}
          >
            + Add New Project
          </button>
          <button
            style={activeTab === 'inquiries' ? styles.tabActive : styles.tab}
            onClick={() => {
              setActiveTab('inquiries');
              fetchInquiries();
            }}
          >
            Client Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Content Body */}
        <div style={styles.contentBody}>
          {/* TAB 1: ALL PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#FFF' }}>
                    Active Development Projects
                  </h3>
                  <p style={{ color: '#888', fontSize: '14px' }}>
                    These projects appear live on the website's luxury carousel ("A Seamless Blend of Purpose and Aesthetics").
                  </p>
                </div>
                <button onClick={() => setActiveTab('add')} style={styles.goldBtn}>
                  + Add New Project
                </button>
              </div>

              {loadingData ? (
                <div style={{ color: '#AAA', padding: '40px', textAlign: 'center' }}>Loading project portfolio...</div>
              ) : projects.length === 0 ? (
                <div style={{ color: '#AAA', padding: '40px', textAlign: 'center' }}>No projects found. Add your first project!</div>
              ) : (
                <div style={styles.projectsGrid}>
                  {projects.map((proj) => (
                    <div key={proj.id} style={styles.projectAdminCard}>
                      <div style={styles.projectCardImgWrap}>
                        <img src={proj.image} alt={proj.titleMain} style={styles.projectImg} />
                        <span style={styles.categoryBadge}>{proj.category}</span>
                      </div>
                      <div style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '20px', color: '#FFF', marginBottom: '4px' }}>
                          {proj.titleMain} <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>{proj.titleItalic}</span>
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#888', marginBottom: '16px' }}>{proj.subtitle}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                          <span style={{ fontSize: '11px', color: '#666' }}>ID: {proj.id.slice(-5)}</span>
                          <button
                            onClick={() => handleDeleteProject(proj.id, `${proj.titleMain} ${proj.titleItalic}`)}
                            style={styles.deleteBtn}
                          >
                            Delete Project
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADD NEW PROJECT */}
          {activeTab === 'add' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#FFF' }}>
                  Publish New Architectural Project
                </h3>
                <p style={{ color: '#888', fontSize: '14px' }}>
                  Enter project details. Upon publishing, it will immediately display in the website's project showcase.
                </p>
              </div>

              {statusMsg.text && (
                <div style={statusMsg.type === 'success' ? styles.successBanner : styles.errorBanner}>
                  {statusMsg.text}
                </div>
              )}

              <form onSubmit={handleAddProject} style={styles.formCard}>
                <div style={styles.row}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Primary Title (Clean Sans)</label>
                    <input
                      type="text"
                      value={newProject.titleMain}
                      onChange={(e) => setNewProject({ ...newProject, titleMain: e.target.value })}
                      style={styles.input}
                      placeholder="e.g. Imperial, Superior, Iconic"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Accent Title (Italic Serif)</label>
                    <input
                      type="text"
                      value={newProject.titleItalic}
                      onChange={(e) => setNewProject({ ...newProject, titleItalic: e.target.value })}
                      style={styles.input}
                      placeholder="e.g. Heights, Craftsmanship, Villa"
                      required
                    />
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Locality / Property Subtitle</label>
                    <input
                      type="text"
                      value={newProject.subtitle}
                      onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                      style={styles.input}
                      placeholder="e.g. Trivedi Powai Sanctuary"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Development Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      style={styles.select}
                    >
                      <option value="Residential">Luxury Residential</option>
                      <option value="Commercial">Signature Commercial</option>
                      <option value="Retail">Boutique Retail</option>
                      <option value="Township">Integrated Township</option>
                    </select>
                  </div>
                </div>

                {/* Preset Image Chooser */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={styles.label}>Select Curated Neoclassical Image Preset</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '8px' }}>
                    {presetImages.map((preset) => (
                      <div
                        key={preset.url}
                        onClick={() => setNewProject({ ...newProject, image: preset.url })}
                        style={{
                          ...styles.presetCard,
                          borderColor: newProject.image === preset.url ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '70px', objectFit: 'cover' }} />
                        <span style={{ fontSize: '11px', color: '#BBB', display: 'block', padding: '6px', textAlign: 'center' }}>
                          {preset.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={styles.label}>Or Custom Image URL</label>
                  <input
                    type="text"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    style={styles.input}
                    placeholder="/assets/images/project_card_1.jpg or https://..."
                    required
                  />
                </div>

                {/* Live Card Preview */}
                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    Live Carousel Card Preview:
                  </div>
                  <div style={{ width: '320px', height: '220px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <img src={newProject.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '16px', background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
                      <div style={{ fontSize: '18px', color: '#FFF' }}>
                        {newProject.titleMain || 'Project'} <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>{newProject.titleItalic || 'Title'}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#AAA' }}>{newProject.subtitle || 'Trivedi Associates'}</div>
                    </div>
                  </div>
                </div>

                <button type="submit" style={styles.goldBtn}>
                  Publish Project to Website
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES / LEADS */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#FFF' }}>
                    Customer Consultation Inquiries
                  </h3>
                  <p style={{ color: '#888', fontSize: '14px' }}>
                    Real-time leads submitted by visitors through website contact forms.
                  </p>
                </div>
                <button onClick={fetchInquiries} style={styles.secondaryBtn}>
                  &#x21bb; Refresh Leads
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div style={{ color: '#AAA', padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  No customer inquiries received yet. New inquiries submitted on the website will display here in real time.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Client Name</th>
                        <th style={styles.th}>Contact Number</th>
                        <th style={styles.th}>Email Address</th>
                        <th style={styles.th}>Interest</th>
                        <th style={styles.th}>Client Message</th>
                        <th style={styles.th}>Direct Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => (
                        <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={styles.td}>{new Date(inq.createdAt).toLocaleDateString()}</td>
                          <td style={{ ...styles.td, fontWeight: '600', color: '#FFF' }}>{inq.name}</td>
                          <td style={styles.td}>
                            <a href={`tel:${inq.phone}`} style={{ color: 'var(--color-gold)' }}>{inq.phone}</a>
                          </td>
                          <td style={styles.td}>
                            <a href={`mailto:${inq.email}`} style={{ color: '#CCC' }}>{inq.email}</a>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.interestBadge}>{inq.interest}</span>
                          </td>
                          <td style={{ ...styles.td, maxWidth: '240px', color: '#AAA', fontSize: '13px' }}>
                            {inq.message || 'No additional message provided.'}
                          </td>
                          <td style={styles.td}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <a
                                href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.actionBtnGreen}
                                title="Chat on WhatsApp"
                              >
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${inq.phone}`}
                                style={styles.actionBtnCall}
                                title="Call Client"
                              >
                                Call
                              </a>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                style={styles.actionBtnDel}
                                title="Delete Record"
                              >
                                &times;
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------- INLINE LUXURY STYLES -----------------
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(12px)',
    zIndex: 3000,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  loginCard: {
    background: '#161616',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '480px',
    padding: '40px',
    marginTop: '60px',
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)'
  },
  dashboardContainer: {
    background: '#141414',
    border: '1px solid rgba(197, 168, 128, 0.25)',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '1280px',
    minHeight: '85vh',
    margin: '20px auto',
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column'
  },
  consoleHeader: {
    padding: '20px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#181818'
  },
  logoIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '1.5px solid var(--color-gold)',
    color: 'var(--color-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBtn: {
    color: '#888',
    fontSize: '28px',
    lineHeight: 1,
    padding: '4px 8px',
    borderRadius: '4px'
  },
  tabBar: {
    display: 'flex',
    gap: '4px',
    padding: '12px 32px 0 32px',
    background: '#161616',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
  },
  tab: {
    padding: '12px 24px',
    color: '#999',
    fontSize: '13.5px',
    fontWeight: '500',
    borderBottom: '2px solid transparent'
  },
  tabActive: {
    padding: '12px 24px',
    color: '#FFF',
    fontSize: '13.5px',
    fontWeight: '600',
    borderBottom: '2px solid var(--color-gold)'
  },
  contentBody: {
    padding: '32px',
    flex: 1
  },
  label: {
    display: 'block',
    fontSize: '11.5px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#B0B0B0',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '6px',
    color: '#FFF',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    background: '#222',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '6px',
    color: '#FFF',
    fontSize: '14px'
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '32px'
  },
  primaryBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--color-wine)',
    color: '#FFF',
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    borderRadius: '6px'
  },
  goldBtn: {
    padding: '12px 24px',
    background: 'var(--color-wine)',
    color: '#FFF',
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '1px',
    borderRadius: '6px',
    border: '1px solid var(--color-wine)'
  },
  secondaryBtn: {
    padding: '8px 18px',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#EEE',
    borderRadius: '6px',
    fontSize: '13px',
    border: '1px solid rgba(255, 255, 255, 0.15)'
  },
  logoutBtn: {
    padding: '8px 18px',
    background: 'rgba(211, 47, 47, 0.2)',
    color: '#ff8a80',
    borderRadius: '6px',
    fontSize: '13px',
    border: '1px solid rgba(211, 47, 47, 0.4)'
  },
  deleteBtn: {
    padding: '5px 12px',
    background: 'rgba(211, 47, 47, 0.15)',
    color: '#ff8a80',
    borderRadius: '4px',
    fontSize: '11.5px',
    border: '1px solid rgba(211, 47, 47, 0.3)'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  },
  projectAdminCard: {
    background: '#1A1A1A',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  projectCardImgWrap: {
    width: '100%',
    height: '180px',
    position: 'relative'
  },
  projectImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '4px 10px',
    background: 'rgba(0, 0, 0, 0.75)',
    border: '1px solid var(--color-gold)',
    color: 'var(--color-gold)',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
  },
  presetCard: {
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    overflow: 'hidden',
    cursor: 'pointer',
    background: '#222'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '14px 16px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--color-gold)'
  },
  td: {
    padding: '16px',
    fontSize: '13.5px',
    color: '#DDD'
  },
  interestBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    background: 'rgba(131, 36, 56, 0.25)',
    color: '#ff80ab',
    fontSize: '11.5px'
  },
  actionBtnGreen: {
    padding: '6px 12px',
    background: 'rgba(46, 125, 50, 0.2)',
    border: '1px solid #4caf50',
    color: '#81c784',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'inline-block'
  },
  actionBtnCall: {
    padding: '6px 12px',
    background: 'rgba(197, 168, 128, 0.2)',
    border: '1px solid var(--color-gold)',
    color: 'var(--color-gold)',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'inline-block'
  },
  actionBtnDel: {
    padding: '6px 10px',
    background: 'rgba(211, 47, 47, 0.2)',
    border: '1px solid #e57373',
    color: '#e57373',
    borderRadius: '4px',
    fontSize: '12px'
  },
  errorBanner: {
    padding: '12px',
    marginBottom: '20px',
    background: 'rgba(211, 47, 47, 0.2)',
    border: '1px solid #d32f2f',
    color: '#ff8a80',
    borderRadius: '6px',
    fontSize: '13px'
  },
  successBanner: {
    padding: '12px',
    marginBottom: '20px',
    background: 'rgba(46, 125, 50, 0.2)',
    border: '1px solid #4caf50',
    color: '#81c784',
    borderRadius: '6px',
    fontSize: '13px'
  },
  credentialHint: {
    marginTop: '24px',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#888',
    lineHeight: '1.7',
    border: '1px dashed rgba(255, 255, 255, 0.15)'
  }
};
