# RAR Landing — Fall DFY Bundle (Full Overwrite)

## Deploy
1) Upload *all files* to your repo root (overwrite). Commit to `main`.
2) Vercel auto-deploys to Production.

## Optional Environment Variables
- NEXT_PUBLIC_PODIA_BASE_URL — Podia checkout URL. We append UTM + ?tier=.
- SLACK_WEBHOOK_URL — Incoming webhook; new inquiries ping your Slack.
- EMAIL_CONTACT — Mailto fallback (default info@incluu.us).
- NEXT_PUBLIC_GA_ID — GA4 ID (G-XXXXXXXXXX).
- NEXT_PUBLIC_SITE_URL — Canonical URL for internal UTMs (optional).

## Notes
- Full-page fall gradient lives in `styles/globals.css`.
- Hero & gallery images are sourced via Unsplash with local SVG fallbacks in `public/images`.
- Buttons set tier + smooth scroll; Podia links include UTM + `?tier=`.
