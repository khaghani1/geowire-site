#!/bin/bash
# GeoWire Static Site — GitHub Push Script
# Run this once from inside the geowire-static/ folder on your Mac:
#   chmod +x push-to-github.sh && ./push-to-github.sh

set -e

REPO_NAME="geowire-static"
GITHUB_USER="khaghani1"
REMOTE="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  GeoWire Static Site — GitHub Push"
echo "═══════════════════════════════════════════════════"
echo ""

# Clean up any broken .git
if [ -d ".git" ]; then
  echo "→ Removing broken .git folder..."
  rm -rf .git
fi

# Init fresh repo
echo "→ Initializing git repo..."
git init
git config user.email "ali.khaghani@gmail.com"
git config user.name "Ali Khaghani"
git branch -M main

# Stage and commit all files
echo "→ Staging 22 files..."
git add .

echo "→ Creating commit..."
git commit -m "Phase 1 + 2: GeoWire static site — 22 files

Phase 1 (13 files): content.js, ui.js, api.js, styles.css,
index.html, energy.html, countries.html, scenarios.html,
trade.html, us-impact.html, humanitarian.html,
geopolitical.html, analysis.html

Phase 2 (9 files): article-template.html, article-ghalibaf.html,
map-component.js, what-changed.html, exposure-calculator.html,
powermap.html, narrative-war.html, sitemap.xml, robots.txt

Pure static HTML/CSS/JS. No build step. FRED + CoinGecko + GDELT + EIA.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

echo ""
echo "→ Creating GitHub repo '${REPO_NAME}' (requires gh CLI)..."

# Try gh CLI first (recommended)
if command -v gh &> /dev/null; then
  gh repo create "${GITHUB_USER}/${REPO_NAME}" \
    --public \
    --description "GeoWire static intelligence site — Operation Epic Fury tracker" \
    --source=. \
    --remote=origin \
    --push
  echo ""
  echo "✅ Done! Repo live at: https://github.com/${GITHUB_USER}/${REPO_NAME}"
else
  # Fall back to manual instructions
  echo ""
  echo "  gh CLI not found. Manual steps:"
  echo ""
  echo "  1. Create repo at: https://github.com/new"
  echo "     Name: ${REPO_NAME}"
  echo "     Visibility: Public"
  echo "     Do NOT initialize with README"
  echo ""
  echo "  2. Then run:"
  echo "     git remote add origin ${REMOTE}"
  echo "     git push -u origin main"
  echo ""
  echo "  Or with HTTPS:"
  echo "     git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
  echo "     git push -u origin main"
fi
