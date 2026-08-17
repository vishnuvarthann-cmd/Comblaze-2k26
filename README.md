# MAMCE × COMBLAZE2K26 — Futuristic Anime College Symposium Web App

A high-performance, futuristic, anime-inspired college symposium website built for **M.A.M. College of Engineering (MAMCE)** — **COMBLAZE2K26**.

The web application combines futuristic UI, scientific/tech visuals, anime cyberpunk mascot artwork, RGB glitch effects, glassmorphic HUD overlays, live per-second countdown, dynamic multi-event registration, Indian payment gateway (Razorpay) integration, instant downloadable PDF receipts, and an Express backend API service.

---

## 🚀 Technology Stack

- **Frontend Core**: React.js, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System, Custom Glassmorphic & Neon Utility classes
- **Animations & Effects**: Framer Motion, HTML5 Interactive Particle Canvas, RGB Glitch Component
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Receipt & Utilities**: jsPDF, html2canvas, canvas-confetti
- **Backend API**: Node.js, Express, Razorpay SDK, Crypto (HMAC SHA256 verification)
- **Map Integration**: Google Maps Embed API

---

## 🎨 Symposium Identity & Pages

- **Institution**: M.A.M. College of Engineering (MAMCE), Siruganur, Tiruchirappalli, Tamil Nadu
- **Department**: Department of Computer Science & Engineering / Information Technology
- **Symposium**: COMBLAZE2K26
- **Tagline**: *"Where Innovation Meets Imagination"*

### Available Pages:
1. `Home` (`/`): Full-screen Hero with RGB glitch logo, live countdown timer, interactive symposium timeline, department preview, college preview, featured technical & non-technical events preview.
2. `Technical Events` (`/events/technical`): Code Clash, Tech Quiz, Project Expo.
3. `Non-Technical Events` (`/events/non-technical`): IPL Auction, Connections, Meme Battle.
4. `Individual Event Details` (`/event/:eventId`): Detailed poster, rules, schedule, prizes, hall venues, and faculty/student coordinators.
5. `Registration` (`/register`): Cyberpunk holographic registration panel with live fee calculation and Razorpay checkout trigger.
6. `About Department` (`/about-department`): Vision, Mission, modern AI & Cloud labs.
7. `About College` (`/about-college`): MAMCE history, campus overview, accredited achievements, student life gallery.
8. `Contact & Coordinators` (`/contact`): Committee directory, phone/email, inquiry form, Google Maps embed.
9. `Registration Success` (`/success`): Instant ticket generation (`COMBLAZE-2K26-XXXX`), summary, downloadable PDF receipt.
10. `404 Cyber Glitch Page` (`*`)

---

## 🛠️ Project Structure

```text
mamce-comblaze2k26/
│
├── server/                    # Backend Node.js Express API Service
│   ├── server.js              # Payment order creation & verification endpoints
│   ├── package.json           # Server dependencies (Express, Razorpay, Cors)
│   ├── .env                   # Environment variables
│   └── data/
│       └── registrations.json # Persistent registration data file
│
├── src/
│   ├── assets/                # Generated anime cyberpunk visual assets
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Countdown.jsx
│   │   ├── Timeline.jsx
│   │   ├── EventCard.jsx
│   │   ├── GlitchText.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── ScanlineOverlay.jsx
│   │   ├── Map.jsx
│   │   └── RegistrationForm.jsx
│   │
│   ├── pages/                 # React Router view pages
│   │   ├── Home.jsx
│   │   ├── TechnicalEvents.jsx
│   │   ├── NonTechnicalEvents.jsx
│   │   ├── EventPage.jsx
│   │   ├── Register.jsx
│   │   ├── AboutDepartment.jsx
│   │   ├── AboutCollege.jsx
│   │   ├── Contact.jsx
│   │   ├── Success.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/                  # Centralized configuration & data files
│   │   ├── config.js          # Event dates, college info, map URLs, Razorpay keys
│   │   ├── events.js          # Technical & Non-Technical event details
│   │   ├── timeline.js        # Agenda itinerary schedule
│   │   └── coordinators.js    # Committee faculty & student leads
│   │
│   ├── App.jsx                # Main Application layout & Router
│   ├── index.css              # Design system & keyframe glitch animations
│   └── main.jsx
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 💻 How to Run Locally

### 1. Start the Backend API Server

```bash
cd server
npm install
npm start
```
The server will start on `http://localhost:5000`.

### 2. Start the Frontend Vite Development Server

Open a new terminal window in the project root:

```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables Setup

Edit `server/.env`:
```env
PORT=5000
RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_HERE
```

Edit frontend `.env` (optional):
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_YOUR_ACTUAL_KEY_HERE
```

> **Note**: If Razorpay credentials are not provided, the application operates in **Demo Mode**, allowing complete end-to-end registration testing, receipt creation, and PDF download without requiring live keys.

---

## 📦 Production Build

To build the static web application for deployment:

```bash
npm run build
```

Deploy the `dist/` directory to Vercel, Netlify, or GitHub Pages, and host the `server/` on Render, Railway, or AWS EC2.
