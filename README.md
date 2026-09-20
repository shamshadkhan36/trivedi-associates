# Trivedi Associates (.Com) - Full-Stack React & Node.js Website with Admin Panel

An ultra-luxurious, responsive website crafted for **Trivedi Associates**, replicating the signature neoclassical elegance, layout, typography, and palette of the reference design (House of Hiranandani aesthetic) in modern **React** and **Node.js (Express)**, complete with a secure **Admin Panel** for live project and customer inquiry management.

---

## Client Contact & Identity Details

- **Brand Name:** Trivedi Associates (`Trivedi Associates . Com`)
- **Direct Phone:** `+91 7977117256` (1-click calling enabled: `tel:7977117256`)
- **WhatsApp Direct:** `+91 7977117256` (1-click WhatsApp message enabled)
- **Official Email:** `trivedi.associates13@gmail.com` (1-click direct mailto enabled)

---

## Admin Panel Access & Credentials

The Admin Panel allows authorized personnel to manage development projects, publish new projects to the website carousel, and view/contact prospective clients who submitted inquiries.

- **Access URL:** Click the **Lock Icon** in the top navigation, or click **"Admin Portal"** in the footer, or visit `/#admin`
- **Username / Email:** `admin@trivediassociates.com` (or `admin`)
- **Password:** `Trivedi@2026`

### Admin Features:
1. **Projects Management:** View all active projects with image previews, category tags, and delete capabilities.
2. **Publish New Project:** Add projects with Primary Title, Accent Italic Title, Subtitle, Category, and choose from curated neoclassical image presets or custom URLs. Published projects appear immediately on the live website carousel.
3. **Client Inquiries / Leads:** Real-time table of customer consultations with 1-click **WhatsApp** and **Direct Call** shortcuts.

---

## Architecture & Layout

### 1. Frontend (React + Vite)
- **`Navbar.jsx`**: Translucent/scrolled header, custom `TA` architectural monogram emblem, navigation links, search trigger, mobile drawer, admin lock icon, and "LET'S CONNECT" CTA.
- **`Hero.jsx`**: Neoclassical colonnade hero background with subtle animated zoom, typography, and animated mouse scroll indicator.
- **`Skylines.jsx`**: Colonnade arch cut-out on left, deep wine burgundy typography, and smooth statistical counter animations (45+ Years, 27,041 Homes, 95,288 Clients, 50.85 Mn. sq. ft., 69,357+ Trees).
- **`Aesthetics.jsx`**: Dark theme (`#111111`) with dynamic project card carousel linked to the projects API (*Superior Build Quality*, *Meticulous Craftsmanship*, *Sustainable Living*, *Architectural Finesse*).
- **`Legacy.jsx`**: Neoclassical grand pediment on right, interactive locality switcher tabs (**Powai**, **Thane**, **South Mumbai**) with dynamic narrative updates.
- **`PerfectSpace.jsx`**: Neoclassical estate backdrop under golden sky with double-bordered gold/brass "LET'S CONNECT" CTA.
- **`ContactSection.jsx`**: Contact cards for Phone, WhatsApp, Email, and Domain, connected to the Node.js Express backend API (`/api/contact`).
- **`AdminPanel.jsx`**: Full-featured admin login and management dashboard.
- **`Modals.jsx`**: "LET'S CONNECT" popup inquiry modal, quick project search modal, and mobile slide-out navigation drawer.
- **`FloatingControls.jsx`**: Floating circular gold `TA` emblem seal and circular black "Back to Top" button.
- **`Footer.jsx`**: Full luxury footer with brand story, portfolio links, admin link, and copyright.

### 2. Backend (Node.js + Express)
- **`POST /api/admin/login`**: Authenticates admin and issues secure token.
- **`GET /api/projects`**: Public endpoint returning active projects for the carousel.
- **`POST /api/admin/projects`**: Admin endpoint to add a new project to `server/data/projects.json`.
- **`DELETE /api/admin/projects/:id`**: Admin endpoint to delete a project.
- **`POST /api/contact`**: Validates visitor inquiries and persists them to `server/data/inquiries.json`.
- **`GET /api/admin/inquiries`**: Admin endpoint to retrieve all leads.
- **`DELETE /api/admin/inquiries/:id`**: Admin endpoint to delete lead record.
- **`GET /api/health`**: Health check route.

---

## How to Run

### Development Mode

1. **Start Backend Server (Port 5000):**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend Client (Port 3000):**
   ```bash
   cd client
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### Production Mode

1. **Build the React frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Run the Node.js production server:**
   ```bash
   cd server
   npm start
   ```
   Open `http://localhost:5000` in your browser.
