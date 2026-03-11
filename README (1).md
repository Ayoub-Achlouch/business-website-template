# ApexPro Local Service Website Template
## Quick Customization Guide

---

### 📁 File Structure
```
/website
  index.html   ← All content / copy
  style.css    ← All styles + design variables
  script.js    ← All interactions
  images/      ← Drop your photos here
```

---

### 🎨 1. Change Colors & Fonts (style.css — top of file)
```css
:root {
  --color-primary:      #c9a84c;  /* ← Your brand color */
  --color-dark:         #0e1525;  /* ← Background color */
  --font-display:       'Cormorant Garamond'; /* ← Heading font */
  --font-body:          'DM Sans';            /* ← Body font */
}
```

---

### 🏢 2. Change Company Name
Search the HTML for `ApexPro` and replace with your company name.
Also update the `<title>` tag at the top.

---

### 📞 3. Change Contact Information
Search for `<!-- CHANGE:` comments in index.html — every editable section is marked.

Key fields:
- Phone: `(214) 555-0100` → your number
- Email: `hello@apexpro.com` → your email
- Address / City → your location
- Google Maps embed → your address embed code

---

### 🖼️ 4. Add Your Images
Place images in the `/images/` folder and reference them:
```html
<!-- Hero background: edit hero-bg in style.css -->
background-image: url('images/hero.jpg');

<!-- About photo -->
<img src="images/about.jpg" alt="Our team">

<!-- Gallery photos -->
<img src="images/gallery-1.jpg" alt="Project">
```

Recommended image sizes:
- Hero: 1920×1080px
- About: 800×1000px
- Gallery: 800×600px

---

### ✏️ 5. Edit Services
Find the `services-grid` div in index.html.
Each `.service-card` has: icon SVG, title, description, link.

---

### 📊 6. Update Statistics
Find the `.stats-grid` section and update `data-target` values:
```html
<div class="stat-number" data-target="2400">0</div>
```
Change `2400` to your real numbers.

---

### 💬 7. Update Testimonials
Find `.testi-slide` divs and replace with real client reviews.
Each slide: stars, quote, client name, location + service.

---

### 🕐 8. Business Hours
Update in TWO places:
1. HTML: the `.hours-grid` section (display text)
2. JS: `script.js` — the "BUSINESS HOURS" section near the bottom (logic for open/closed badge)

---

### 📧 9. Wire Up the Contact Form
In `script.js`, find the comment:
```
/* ── TO ACTUALLY SUBMIT: Replace the setTimeout above with: ...
```
Replace with your form handler (EmailJS, Formspree, Netlify Forms, etc.)

---

### 🗺️ 10. Google Maps Embed
1. Go to maps.google.com
2. Search your address
3. Click Share → Embed a map
4. Copy the `<iframe>` code
5. Replace the existing `<iframe>` in index.html

---

### 🚀 Deployment
Works on any static host:
- Netlify (drag & drop the /website folder)
- Vercel
- GitHub Pages
- Traditional cPanel hosting

---

Made with ❤️ — Template version 1.0
