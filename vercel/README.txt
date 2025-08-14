Rest as Resistance Retreat – Vercel Deployment
=============================================

This folder contains the static files for your updated sales page. Follow these steps to deploy on Vercel:

1. Create a new repository on GitHub (or clean your existing one) and ensure it only contains the files in this `vercel` folder.
2. Upload the contents of this folder (index.html, styles.css, script.js, images directory) to the root of your repository.
3. In Vercel, create a new project from this repository. When asked for the framework, choose **Other / Static** so Vercel treats it as a static site and skips any build step.
4. Deploy the site. Once live, users can select their tier and pay via Stripe using the links embedded in the buttons.

No build steps or `npm install` are required. If you need to update images or text in future, edit the files locally, commit the changes and redeploy.