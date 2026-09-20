# Trivedi Associates (.Com) - Architecture & Engineering Website

A minimalist luxury website for **Trivedi Associates**, custom-structured according to the client wireframe in modern **React 18 + Node.js (Express)**, featuring a secure **Admin Panel** for project and inquiry management.

---

## Client Contact & Identity Details

- **Brand Name:** Trivedi Associates (`Trivedi Associates . Com`)
- **Direct Phone:** `+91 7977117256` (1-click direct call: `tel:7977117256`)
- **WhatsApp Support:** `+91 7977117256` (1-click direct chat: `https://wa.me/917977117256`)
- **Official Email:** `trivedi.associates13@gmail.com` (1-click direct mailto: `mailto:trivedi.associates13@gmail.com`)

---

## Website Structure (Matches Client Whiteboard Wireframe)

1. **Minimalist Hero Section:**
   - Architectural visual with subtle ambient motion.
   - Clean luxury typography, brand monogram badge, and quick action buttons.
   - Minimalist animated scroll indicator.

2. **4 Main Expandable Pillars (Click to Expand):**
   - **01. Design & Planning**: Floor Planning, 3D Views & Photorealistic Modeling, Elevation Design & Facades, Interior Architecture.
   - **02. Project Management Consultant (PMC)**: On-Site Supervision & Execution, Cost Estimation & Budget Optimization, Quality Control & Structural Audit, Timeline & Milestone Management.
   - **03. Liaisoning & Approvals**: Municipal & BMC Approvals, Environmental & Coastal Clearances, Fire & Life Safety NOCs, Occupation Certificate (OC).
   - **04. Green Building Consultant**: IGBC & LEED Green Certification, Energy Modeling & Optimization, Sustainable Water & Waste Systems, Eco-Friendly Materials Advisory.
   - *Behavior:* Smooth interactive accordion with deliverable details and "Enquire for this service" quick-select.

3. **Infinite Company Marquee:**
   - Seamless continuous auto-scrolling ticker showcasing prominent developer partners and corporate clients (Hiranandani, Godrej, Lodha, Oberoi Realty, L&T, Shapoorji Pallonji, Tata Housing, K Raheja, Piramal, Kalpataru).
   - Pauses gracefully on hover.

4. **Enquiry Form ("Form fill data to help us reach you"):**
   - Full Name, Detail / Organization, Service Dropdown (the 4 pillars), Contact Number (`7977117256`), Email ID (`trivedi.associates13@gmail.com`), Message / Project Details.
   - Connected to the Node.js backend API (`POST /api/contact`) with persistent lead storage in `server/data/inquiries.json`.
   - 1-click direct hotline cards for Phone, WhatsApp, and Email.

5. **Featured Architectural Projects Showcase:**
   - Sleek dark carousel dynamically loaded from the projects API.

6. **Admin Panel (`/#admin`):**
   - Username: `admin@trivediassociates.com` (or `admin`)
   - Password: `Trivedi@2026`
   - Add new projects with live preview, delete existing projects, and track customer leads with 1-click WhatsApp/Call actions.

---

## How to Run

### Development Mode
```bash
# Terminal 1: Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: React Frontend (Port 3000)
cd client
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Mode
```bash
cd client
npm run build
cd ../server
npm start
```
Open `http://localhost:5000` in your browser.
