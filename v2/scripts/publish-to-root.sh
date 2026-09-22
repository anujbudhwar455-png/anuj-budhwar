#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT/v2"
npm run build
cd "$ROOT"
rm -rf _next books music projects images icons 404
rm -f index.html index.txt 404.html favicon.ico robots.txt sitemap.xml
cp -a v2/out/. .
touch .nojekyll
echo "Published v2/out → repo root"
