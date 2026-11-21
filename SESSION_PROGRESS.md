# Portfolio & Engineering Blog — Session Progress & State

**Date:** November 21, 2026  
**Repository:** `Raafats-Portofolio`  
**Current Active Branch:** `main`  
**Production Branch:** `main`

---

## 1. Executive Summary

This session updated the portfolio's clients gallery, embedded playground, favorite creators, CV timeline, and responsive/XXL scroll behavior on `main`:
* **New Clients Added**: Added **Xceltra** (`xceltra.com`), **Agatel** (`agatel.co.uk`), and **Anavera** (`anavera.co.uk`) with official logos downloaded from their websites, and reordered the gallery (`Coins & Cloth` → `Spira` → `Xceltra` → `Agatel` → `Anavera` → `Kolr Perfumes` → `Maz Mrkt`).
* **Coins & Cloth Cover + Live Hover Iframes**: Updated Coins & Cloth's cover image and added lazy-mounted `LivePreviewIframe` previews on desktop card hover (`iframeAllowed: false` on Agatel due to `X-Frame-Options: SAMEORIGIN`).
* **Embedded TS Playground (`LearnTogether.tsx`)**: Replaced the custom textarea/output evaluator with an embedded `https://code.ibrahimraafat.com/` iframe inside the macOS window chrome.
* **Favorite Creators (`FavoriteCreators.tsx`)**: Replaced the broken YouTube thumbnail for ThePrimeagen's algorithms course with the official Master.dev posterframe (`public/images/primeagen-algorithms-cover.jpg`) and changed Ahmed Farghal's tag to `Distributed Systems`.
* **CV / Experience (`Experience.tsx`)**: Added **Coin & Cloth** (`Cairo, Egypt`, `Full Stack Engineer`, `2026 — Present` — ERP, e-commerce, mobile application, AI automations) and updated **Maz Mrkt**'s period to `Jul 2024 — 2026`.
* **Responsivity & XXL Scroll Fix**: Removed duplicate mobile client rows, fixed double horizontal padding in `Contact.tsx`, tightened `ClientsHoverGallery.tsx` (`h-[100dvh]`, `overflow-x-clip`, `clamp(170px,32vh,280px)`), switched GSAP `ScrollTrigger` from `scrub: 1` to `scrub: true` with `ResizeObserver` and `Math.max(0, ...)` clamping so the track, counter, and pin stay synchronized across all screen sizes.

---

## 2. Git & Branch Architecture

| Branch | Latest Commit | Status | Description |
| :--- | :--- | :--- | :--- |
| **`main`** | `a3855a1` | Pushed to `origin/main` | Clients update, live iframe previews, `code.ibrahimraafat.com` embed, CV update, responsive & XXL scroll fixes. |

### Recent Commits (`main`)
* `a3855a1` — `fix: sync ScrollTrigger scrub and handle XXL resize measurements`
* `52776c3` — `feat: update CV, embed code.ibrahimraafat.com, fix covers & responsive layout`
* `e3362d6` — `feat: update Coins & Cloth cover and add live iframe hover previews`
* `598bcc9` — `feat: add Xceltra, Agatel, and Anavera to clients gallery`

---

## 3. Verification & Health

* **TypeScript**: `npx tsc --noEmit` passes with **0 errors**.
* **Next.js Production Build**: `npm run build` compiled and generated all 8 routes cleanly.
* **Local Windows Build Note**: Installed `lightningcss-win32-x64-msvc@1.30.2` with `--no-save` so `npm run build` runs on Windows without modifying `package.json` or `package-lock.json`.

---

## 4. Open / Follow-Up Notes

1. **`public/resume.pdf`**: The downloadable résumé PDF is a static binary and still reflects the pre-Coin & Cloth CV if not regenerated separately.
2. **Untracked Directory**: `_archived_pages/` remains untracked locally (pre-existing).
3. **Minor Polish Ideas**:
   * Update the divider border on the dark featured card in `Experience.tsx` (`border-gray-100` → `border-white/10` when `idx === 0`).
   * Align section numbering (`01`, `01.5`, `02`, `02`, `03`, `05`).
