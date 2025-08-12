
# RAR Landing — Final Bundle

## Deploy
1) Upload all files to your GitHub repo root (overwrite) → commit to `main`.
2) Vercel auto-deploys to Production.

## Optional environment variables (Vercel → Project → Settings → Environment Variables)
- NEXT_PUBLIC_PODIA_BASE_URL: your Podia checkout URL. The site appends UTM params and ?tier=.
- SLACK_WEBHOOK_URL: Incoming Webhook URL for Slack. New inquiries ping your channel.
- EMAIL_CONTACT: Mailto fallback for the form (default info@incluu.us).
- NEXT_PUBLIC_GA_ID: GA4 ID (e.g., G-XXXXXXXXXX). Auto-injected.
- NEXT_PUBLIC_SITE_URL: canonical URL used to generate internal UTMs (optional).

## Verify
- Tier buttons in cards and header scroll to the form and pre-select the chosen tier.
- Podia buttons open checkout with UTM + tier parameter.
- Submit form posts to /api/inquiry (Slack ping if webhook set; else mailto fallback).
