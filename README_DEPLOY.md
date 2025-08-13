
# RAR Landing — Final Overwrite Bundle

## Deploy (clean & quick)
1) Upload these files to your GitHub repo **root** (overwrite same‑named files) and commit to `main`.
2) Vercel auto‑deploys to Production.

## Environment variables (optional)
- NEXT_PUBLIC_PODIA_BASE_URL – Podia checkout URL. UTMs + ?tier= appended automatically.
- SLACK_WEBHOOK_URL – Slack Incoming Webhook (Inquiry API pings here).
- EMAIL_CONTACT – Mailto fallback (defaults to info@incluu.us).
- NEXT_PUBLIC_GA_ID – GA4 ID (e.g., G‑XXXXXXXXXX).
- NEXT_PUBLIC_SITE_URL – canonical URL for UTM generation (optional).

## Notes
- One full‑page gradient (deep purple → forest green → golden bronze).
- Hero: Kamakura/Shōnan coast via Unsplash Source with graceful fallback.
- Gallery: Kamakura coast, Beppu onsen steam, Miyajima torii — each with graceful fallbacks.
- Tier buttons set the form’s selected tier + smooth scroll.
- Podia buttons include UTMs and ?tier=. 
- Inquiry API → Slack (or mailto fallback if webhook absent).
