#!/bin/bash
# GeoWire — Deploy to GitHub → Vercel
# Double-click this file or run: bash deploy.sh

cd "$(dirname "$0")"

echo "🚀 GeoWire Deploy Script"
echo "========================"
echo ""

# Init git if needed
if [ ! -d ".git" ]; then
  git init
  git remote add origin https://github.com/khaghani1/geowire-static.git
  echo "✓ Git initialized"
fi

# Make sure remote is set
git remote set-url origin https://github.com/khaghani1/geowire-static.git

# Stage all files
git add -A
echo "✓ Files staged"

# Commit
git commit -m "Complete rebuild: all 14 pages, production GEOWIRE/UI/API namespace, 4 new pages (what-changed, exposure-calculator, narrative-war, powermap)"
echo "✓ Committed"

# Push (force to overwrite old structure)
echo ""
echo "Pushing to GitHub... (you may be prompted for your GitHub credentials)"
echo ""
git push origin HEAD:main --force

echo ""
echo "✅ Done! Vercel will auto-deploy in ~30 seconds."
echo "   Check: https://vercel.com/dashboard"
