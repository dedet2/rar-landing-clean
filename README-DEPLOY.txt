DEPLOY INSTRUCTIONS (DFY)

1) Upload these two files to your GitHub repo (same project already on Vercel):
   - api/send-inquiry.js
   - script.js   (ensure your index.html includes: <script src="/script.js" defer></script> before </body>)

2) In Vercel → Project → Settings → Environment Variables, add:
   - SENDGRID_API_KEY = <your key>
   - INQUIRY_TO       = info@incluu.us
   - INQUIRY_FROM     = info@incluu.us   (you can use a verified single-sender; no custom domain needed)

3) Redeploy on Vercel.
   - “Send Inquiry” form will POST to /api/send-inquiry and send you an email via SendGrid.
   - “Reserve Now” auto-links to the right Stripe Checkout by reading your existing “Pay Deposit” buttons in the cards.
   - FAQs updated in-place; deposit policy set to 60 days.
   - SEO meta tags are injected at runtime (you can later paste permanent tags into <head> if you prefer).
