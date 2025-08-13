# Rest as Resistance — Japan 2025

This repository contains a complete static build for **Dr. Dédé’s** inaugural “Rest as Resistance” luxury healing journey in Japan. The site is designed to be deployed on a static host such as Vercel or GitHub Pages and draws inspiration from the client’s existing landing pages and marketing materials.

## Features

* **Soft, restorative palette:** A calming combination of deep greens, teals and pastel neutrals evokes the serene landscapes of Japan. The design is inspired by the Gamma presentation provided and is fully responsive across devices.
* **Hero section with countdown:** A full‑width hero image sets the mood and includes a live countdown to the journey’s start date.
* **Timeline & experiences:** A four‑step timeline introduces each phase of the journey—from Kamakura serenity through Shichirigahama healing and Beppu immersion to the sacred finale on Miyajima Island. Dedicated sections highlight onsen rituals, forest‑bathing practices and nourishment & nurturing.
* **Value breakdown & tiered pricing:** Clear cards outline the three packages—Essential, Private Indulgence and VIP Sanctuary—with detailed inclusions and transparent value breakdown.
* **Inquiry and deposit form:** A simple form allows guests to send an enquiry or proceed to secure their deposit (replace the form `action` with your booking provider, e.g. Podia).
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

1. Replace placeholder images in the `images/` directory with high‑resolution photos that reflect the mood of your retreat. Ensure they’re optimized for the web.
2. Update the early‑bird expiry date in `script.js` if necessary.
3. If you use a form provider (e.g. Podia, Typeform), set the `action` attribute of the form in `index.html` accordingly.
4. Commit and push the folder to your GitHub repository, then connect the repo to Vercel. The included `vercel.json` uses [`cleanUrls`](https://vercel.com/docs/concepts/edge-network/clean-urls) to serve the site without `.html` extensions.

## Notes

* The trip data (dates, pricing, itinerary) is based on the Vercel preview and additional research. Adjust any details to match your final itinerary.
* The design emphasises softness and tranquility; tweak the colours in `styles.css` if you prefer a darker or more vibrant palette.
* This build is 100 % static—no external dependencies besides Google Fonts and Font Awesome. Feel free to extend functionality (e.g. analytics, form handling) as needed.