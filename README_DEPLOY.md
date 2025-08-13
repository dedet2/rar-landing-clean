# RAR Landing — Final DFY Bundle

## Overwrite & Deploy (GitHub web UI)
1) In your repo root, click **Add file → Upload files** and select *everything in this ZIP* (including hidden `.github` and `.gitignore`).  
2) Commit directly to **main**. Vercel will auto-deploy to Production.

> If you want to first wipe the repo: go to **Actions → Repo Reset → Run workflow**. When it finishes, upload this bundle and commit to `main`.

## Optional environment variables (Vercel → Project → Settings → Environment Variables)
- `NEXT_PUBLIC_PODIA_BASE_URL` — your Podia checkout URL. We append UTM parameters + `?tier=`.
- `SLACK_WEBHOOK_URL` — Incoming Webhook; form pings the channel. If unset, mailto fallback triggers.
- `EMAIL_CONTACT` — mailto fallback (default `info@incluu.us`).
- `NEXT_PUBLIC_GA_ID` — GA4 ID (e.g., `G-XXXX...`) auto-injected.
- `NEXT_PUBLIC_SITE_URL` — canonical URL used for internal UTM generation.

## What’s in this build
- Fall/neutral theme + photorealistic hero and gallery (with graceful fallback to /images placeholders).
- Tier “Inquiry” buttons: set the Selected Tier **and** smooth-scroll to the form.
- “Pay Deposit” buttons: open Podia with UTM + `tier` param.
- Updated value stack + launch pricing and copy you approved.
- API `/api/inquiry` → Slack webhook, else mailto fallback.
- GA auto-inject (if GA env present).

## Quick test checklist
- Click each **Inquiry** button → page scrolls to the form and Tier select updates.
- Submit form with Slack set → message appears in your Slack. If not set → mail composer opens.
- Click **Proceed to Secure Deposit (Podia)** → opens your Podia with UTMs and `tier` param.

You’re good to market once buttons & analytics are verified.
