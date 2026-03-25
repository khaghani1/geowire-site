#!/bin/bash
# GeoWire — Deploy to geowire-site (the live Vercel repo)
cd "$(dirname "$0")"

echo "🚀 GeoWire → geowire.org Deploy"
echo "================================"

# Point at the LIVE repo (geowire-site, not geowire-static)
git init 2>/dev/null
git remote remove origin 2>/dev/null
git remote add origin https://github.com/khaghani1/geowire-site.git

git add -A
git commit -m "Complete rebuild: 14 pages, GEOWIRE/UI/API namespace, 4 new pages" 2>/dev/null || echo "(nothing new to commit)"

echo ""
echo "Pushing to geowire-site → Vercel will auto-deploy to geowire.org"
git push origin HEAD:main --force

echo ""
echo "✅ Done! Check https://geowire.org in ~60 seconds."
