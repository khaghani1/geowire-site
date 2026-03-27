#!/bin/bash
# GeoWire — Session 7 Push Script
# Run this from your terminal inside the GeoWire folder

cd "$(dirname "$0")"

echo "→ Removing stale git lock..."
rm -f .git/index.lock

echo "→ Staging all changes..."
git add -A

echo "→ Committing..."
git commit -m "Session 7: Recession-first identity + SEO + Bug Fixes

- Rebuild index.html as recession intelligence platform (10 sections)
- Update siteMeta, navigationItems (7 primary), secondaryNavItems in content.js
- Update renderHeader/renderNav/renderFooter in ui.js (recession branding)
- Fix factor.html: shows all-10-factor index when no ?f= param
- Add about.html with methodology, model, data sources, editorial principles
- Add robots.txt and sitemap.xml
- Fix all page titles + canonical tags on all 19 HTML pages
- Remove all AdSense scripts/meta tags from every page
- Remove all Leaflet imports from homepage
- Make war day counter dynamic everywhere
- Add #crisis-context-grid mobile responsive CSS"

echo "→ Pushing to GitHub..."
git push origin master

echo ""
echo "✓ Done! Vercel will auto-deploy from GitHub in ~30 seconds."
echo "  Check: https://geowire.org"
