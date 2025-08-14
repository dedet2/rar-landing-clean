# Rest as Resistance — Japan 2025

This repository contains a complete **static** build for **Dr. Dédé’s** inaugural “Rest as Resistance” luxury healing journey in Japan. The site is designed to be deployed on a static host such as Vercel or GitHub Pages and draws inspiration from the client’s existing landing pages and marketing materials.

## Features

* **Dark, luxurious palette:** Deep purples, forest greens and warm golds evoke a moody autumnal Japan. Photorealistic imagery of lakes, torii gates and misty hot springs (generated specifically for this page) anchor each section.
* **Hero section with countdown:** A full‑width hero image sets the mood and includes a live countdown to the **early‑bird** deadline (September 15 2025) to encourage timely bookings. Badge text notes there are **6–8 client spots** available.
* **Image‑driven itinerary:** Each itinerary highlight pairs copy with a photorealistic image of the destination (Tokyo, Kamakura, Beppu, Miyajima). This layout gives visitors a vivid sense of the experience.
* **Inclusions & workshops:** A dedicated section lists what’s included (hotels & ryokans, transport, onsen rituals, Iwaso stay and concierge) alongside details of the Rest as Resistance workshops and good‑to‑know cultural tips.
* **Value breakdown & pricing:** Two panels summarise the estimated total value of the trip and the tiered launch pricing (Tier 1 $7,600; Tier 2 $10,100; Tier 3 $12,400) with a clear call‑to‑action.
* **Inquiry and deposit form:** A simple form allows guests to send an enquiry or proceed to secure their deposit (replace the form’s `action` attribute with your booking provider URL, e.g. Podia).  The form now includes guidance for connecting to your payment platform.
* **Testimonials & FAQs:** A new testimonials section features quotes from past guests, while a succinct FAQ answers common questions about who this trip is for, what’s included, how to book and cancellation policies.
* **Citations:** Inline footnotes cite authoritative sources on forest bathing, onsen culture, Beppu’s springs and Iwaso Ryokan【28705490375020†L387-L419】【654498561893934†L28-L37】【751175373135778†L49-L60】【652895566235836†L101-L110】.

## Structure

```
rest_as_resistance_full_build/
├── images/
│   └── hero.jpg         # Hero background photo (replace with your own)
├── index.html           # Main HTML document
├── styles.css           # All page styles
├── script.js            # Countdown timer logic
├── vercel.json          # Vercel configuration (optional)
└── README.md            # This file
```

## Deployment

1. The `images/` directory contains photorealistic hero and destination images generated for the December retreat. You can swap them out with your own high‑resolution photos by replacing the files (e.g. `hero.jpg`, `kamakura.jpg`, `beppu.jpg`, `miyajima.jpg`). Ensure they’re optimized for the web.
2. If you adjust the early‑bird date, edit the `targetDate` constant in `script.js` (currently set to `2025‑09‑15T00:00:00‑07:00`).
3. If you use a form provider (e.g. Podia, Typeform), set the `action` attribute of the form in `index.html` accordingly.
4. Deploy this directory as a **static site**. On Vercel, create a new project and select this directory as the root. When configuring, choose the “Other” framework and **do not** set a build command—this tells Vercel to serve the HTML directly. Alternatively, adjust your existing project’s root directory to point to this folder. The included `vercel.json` uses [`cleanUrls`](https://vercel.com/docs/concepts/edge-network/clean-urls) to serve the site without `.html` extensions.

## Notes

* The trip data (dates, pricing, itinerary) is based on the Vercel preview and additional research. Adjust any details to match your final itinerary.
* The design emphasises softness and tranquility; tweak the colours in `styles.css` if you prefer a darker or more vibrant palette.
* This build is 100 % static—no external dependencies besides Google Fonts and Font Awesome. Feel free to extend functionality (e.g. analytics, form handling) as needed.