# Anuj Budhwar — Portfolio

Premium personal portfolio (Next.js static export) for [Anuj Budhwar](https://anujbudhwar455-png.github.io/anuj-budhwar/).

**Live:** https://anujbudhwar455-png.github.io/anuj-budhwar/

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Framer Motion + React Three Fiber (lazy 3D with reduced-motion / mobile fallback)
- Static export for GitHub Pages (`basePath: /anuj-budhwar`)

## Develop

```bash
cd v2
npm install
npm run build   # outputs to v2/out
```

Source lives in `v2/`. Production static files are published from the repository root (GitHub Pages).

## Content rules

- Books: only Amazon-live series from `research/catalog.json`
- Songs: only the 12 Spotify tracks in the catalog
- No unpublished fiction projects on the site
- No phone, address, secrets, or patient data
