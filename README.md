# N.B. Plastics — Minimalist Static Website

A high-performance, minimalist static website designed and built for **N.B. Plastics** (Sector 10, Noida, Uttar Pradesh), specializing in the wholesale distribution of plastic raw materials, polymer granules, and color masterbatches since 2003.

---

## 🌟 Key Features

* **Minimalist Aesthetic:** Clean Swiss/editorial industrial layout, precision typography (`Plus Jakarta Sans` & `Space Grotesk`), subtle borders, zero unnecessary visual noise.
* **Light / Dark Mode:** Native theme switcher with system preference auto-detection and persistent `localStorage` memory.
* **Interactive Polymer Catalog:** Instant category filtering across:
  * Polyolefins (Polypropylene PP, HDPE, LDPE, LLDPE)
  * Engineering Resins (ABS, POM/Polyacetal, Nylon 6/66)
  * Color Compounds (Plastic Dana in Red, Blue, Green, Masterbatches, and Reprocessed lots)
* **Instant B2B RFQ & WhatsApp Dispatch Sheet:** Form pre-formats structured material requirements with company name, quantity, and destination to launch straight into WhatsApp for instant rate quotes.
* **Technical Quality Standards:** Clearly highlights MFI (Melt Flow Index) & density verification, Sector 10 Noida hub location, and direct wholesale pricing.
* **SEO & Local Business Schema:** Pre-configured with OpenGraph tags, semantic HTML5, and schema.org `WholesaleStore` JSON-LD structured data for Google rankings in Noida/NCR industrial searches.
* **100% Dependency-Free:** Zero heavy frameworks, zero runtime bloat. Instant load times and 100/100 Lighthouse performance.

---

## 📁 File Structure

```text
Websiteminimal/
├── index.html        # Main semantic HTML5 webpage with JSON-LD SEO schema
├── styles.css        # Clean CSS design system with CSS custom properties (variables)
├── script.js         # Lightweight Vanilla JavaScript for filters, theme, and RFQ
├── logo.png          # Official N.B. Plastics logo asset
├── favicon.png       # High-res favicon and touch icon
├── favicon.svg       # Vector fallback favicon
└── README.md         # Documentation & setup guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using any local HTTP server:

### Option 1: Python HTTP Server (Built-in)
```bash
# In the Websiteminimal directory
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 2: Direct File Open
Double-click `index.html` or open it with your browser:
```bash
open index.html
```

---

## 🛠️ Customization Guide

### 1. Official Contact Number Configured
Configured with **+91 97112 83371** in `script.js` and `index.html`.
```javascript
const defaultWhatsAppNumber = "919711283371"; // Official 10-digit number (prefixed with country code 91)
```

In `index.html`:
```html
<a href="https://wa.me/919711283371?text=..." class="btn btn-emerald btn-block">
```

### 2. Adding or Modifying Polymer Grades
In `index.html`, locate `<div class="catalog-grid" id="materials-grid">`. You can duplicate any `<article class="material-card">` block and update the `data-category` attribute (`polyolefins`, `engineering`, or `color`).

---

## 🌐 Deployment

Because this project is completely static (HTML, CSS, JS), it can be deployed for free in under 60 seconds on:
* **GitHub Pages:** Push repo, enable Pages under Repository Settings.
* **Vercel / Netlify / Cloudflare Pages:** Drag-and-drop the `Websiteminimal` folder into the dashboard.
* **Apache / Nginx:** Upload files directly to `/var/www/html/`.
