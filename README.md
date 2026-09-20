# Trivedi Associates (.Com) - Full-Stack React & Node.js Website

An ultra-luxurious, responsive website crafted for **Trivedi Associates**, replicating the signature neoclassical elegance, layout, typography, and palette of the reference design (House of Hiranandani aesthetic) in modern **React** and **Node.js (Express)**.

---

## Client Contact & Identity Details

- **Brand Name:** Trivedi Associates (`Trivedi Associates . Com`)
- **Direct Phone:** `+91 7977117256` (1-click calling enabled: `tel:7977117256`)
- **WhatsApp Direct:** `+91 7977117256` (1-click WhatsApp message enabled)
- **Official Email:** `trivedi.associates13@gmail.com` (1-click direct mailto enabled)

---

## Architecture & Layout

### 1. Frontend (React + Vite)
- **`Navbar.jsx`**: Translucent/scrolled header, custom `TA` architectural monogram emblem, navigation links, search trigger, mobile drawer, and "LET'S CONNECT" CTA.
- **`Hero.jsx`**: Neoclassical colonnade hero background with subtle animated zoom, typography, and animated mouse scroll indicator.
- **`Skylines.jsx`**: Colonnade arch cut-out on left, deep wine burgundy typography, and smooth statistical counter animations (45+ Years, 27,041 Homes, 95,288 Clients, 50.85 Mn. sq. ft., 69,357+ Trees).
- **`Aesthetics.jsx`**: Dark theme (`#111111`) with interactive project card carousel (*Superior Build Quality*, *Meticulous Craftsmanship*, *Sustainable Living*, *Architectural Finesse*) and next/prev controls.
- **`Legacy.jsx`**: Neoclassical grand pediment on right, interactive locality switcher tabs (**Powai**, **Thane**, **South Mumbai**) with dynamic narrative updates.
- **`PerfectSpace.jsx`**: Neoclassical estate backdrop under golden sky with double-bordered gold/brass "LET'S CONNECT" CTA.
- **`ContactSection.jsx`**: Contact cards for Phone, WhatsApp, Email, and Domain, connected to the Node.js Express backend API (`/api/contact`).
- **`Modals.jsx`**: "LET'S CONNECT" popup inquiry modal, quick project search modal, and mobile slide-out navigation drawer.
- **`FloatingControls.jsx`**: Floating circular gold `TA` emblem seal and circular black "Back to Top" button.
- **`Footer.jsx`**: Full luxury footer with brand story, portfolio links, and copyright.

### 2. Backend (Node.js + Express)
- **`server/index.js`**: Express server handling API requests.
- **`POST /api/contact`**: Validates input, saves inquiries to `server/data/inquiries.json` (persistent lead storage), and returns success confirmation.
- **`GET /api/inquiries`**: Admin endpoint to view leads.
- **`GET /api/health`**: Server health check.
- In production, Express automatically serves the built React frontend from `client/dist`.

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
   Open `http://localhost:3000` in your browser. All API requests (`/api/*`) are automatically proxied to the backend.

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
