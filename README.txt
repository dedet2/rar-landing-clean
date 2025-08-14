Rest as Resistance Launch Bundle
===============================

This bundle contains everything you need to publish your updated sales page, send a five‑day email series and schedule social media posts. The project is organised as follows:

```
launch_bundle/
├─ vercel/        # Static site to deploy on Vercel
│  ├─ index.html  # Sales page markup
│  ├─ styles.css  # Styles using your colour palette and hero image
│  ├─ script.js   # Handles tier selection and Stripe links
│  └─ images/     # All images used on the site
├─ email/         # Five HTML templates for your email drip
├─ buffer/        # Social captions for Facebook, Instagram, LinkedIn & Threads
├─ tracker/       # CSV schedule for posts and emails
└─ README.txt     # This file
```

## Deploying the Sales Page

1. **Prepare your repository.** Use the contents of `vercel/` as the root of a new GitHub repository. Commit `index.html`, `styles.css`, `script.js` and the `images` directory.
2. **Create a Vercel project.** In your Vercel dashboard, create a new project from this repository. Select **Other / Static** when prompted for a framework.
3. **Deploy.** Vercel will serve your files as a static site. No build step is required.
4. **Customising.** If you wish to change the hero photo or gallery images, replace the corresponding files in `vercel/images/` and adjust `styles.css` comments indicate which class maps to which photo. To change Stripe links (e.g. if you create new payment links), update the `links` object in `script.js`.

## Sending the Emails

The `email/` folder contains five HTML files (`day1.html` … `day5.html`). Each file is a standalone email:

1. Open the HTML file in a browser to preview. To send from Gmail, create a new message, click the three‑dot menu and choose **Raw HTML** (requires Gmail’s “Insert HTML” lab) or copy‑paste the email into the Gmail compose window. Alternatively, use a newsletter service that accepts HTML templates.
2. Update the salutation or any personal details if needed.
3. Send to your list. The subject lines can be taken from the `<title>` tag of each file (e.g. “Rest as Resistance – Day 1”).
4. Schedule according to the dates and times in `tracker/posts_tracker.csv` or adjust to suit your launch calendar.

## Scheduling Social Posts

Use the `buffer/` folder and `tracker/posts_tracker.csv` for your social media schedule:

1. In Buffer (or your preferred scheduler), create a new post for each row in the CSV.
2. Copy the text from the referenced file (e.g. `buffer/facebook/day1.txt`) into the post caption.
3. Upload the corresponding image from `vercel/images/` (e.g. `miyajima.jpg`).
4. For platforms that allow links (Facebook and LinkedIn), include the Stripe link provided. For Instagram and Threads, instruct your audience to “Link in bio”.
5. Schedule on the date and time specified. Feel free to adjust timings to align with your audience’s active hours.

## Payment Links

The Stripe links embedded in the site and CTA buttons correspond to the three tiers:

- **Tier 1 – Essential:** Deposit – `https://buy.stripe.com/00wfZh2uq8jH6GG3GV7kc01`, Full – `https://buy.stripe.com/5kQfZh7OKgQd8OOelz7kc02`
- **Tier 2 – Private Indulgence:** Deposit – `https://buy.stripe.com/aFaaEX5GCdE14yy4KZ7kc03`, Full – `https://buy.stripe.com/bJeaEXc509nL2qqfpD7kc04`
- **Tier 3 – VIP Sanctuary:** Deposit – `https://buy.stripe.com/fZucN53yu0Rf0ii6T77kc05`, Full – `https://buy.stripe.com/bJecN5d946bz6GGelz7kc06`

You can update these in `script.js` if you create new links. The marketing materials use the Tier 1 deposit link by default; adjust as necessary.

## Notes

- All dates and times in the tracker use the America/Los_Angeles timezone.
- The images provided are licensed for your promotional use. If you wish to replace them, ensure new photos are sized similarly to avoid breaking layouts.
- When adding more posts or emails, follow the structure in this bundle for consistency.

Good luck with your launch!