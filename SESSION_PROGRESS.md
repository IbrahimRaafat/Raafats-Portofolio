# Portfolio & Engineering Blog — Session Progress & State

**Date:** November 8, 2026  
**Repository:** `Raafats-Portofolio`  
**Current Active Branch:** `feat/wireshark-refresher`  
**Production Branch:** `main`  

---

## 1. Executive Summary

This session completed a full-stack enhancement across design, typography, client showcases, blog architecture, build stability, and technical content:
* **Tech Stack**: Replaced cluttered filter pills and static metric counters with a continuous, high-impact sliding marquee featuring 21+ official Wikimedia SVGs and a dynamic cursor-following inspection preview.
* **Clients Section**: Upgraded into a Dennis Snellenberg / Olivier Larose-style interactive floating gallery with live website screenshots (Spira, Kolr) and branded identity cards (Coins & Cloth, Maz Mrkt).
* **Vercel Build Fix**: Identified and eliminated platform-specific `lightningcss-win32-x64-msvc` dependency conflict, ensuring clean Linux deployments.
* **Blog Engine & Arabic RTL**: Added native Arabic support, Google `Cairo` font integration, LTR code block isolation, direction toggle buttons, and bilingual filtering tabs.
* **Content Publishing**:
  * **Article 1 (on `main`)**: *"Herdr: tmux Rebuilt for AI Coding Agents"* (English + Arabic companion).
  * **Article 2 (on `feat/wireshark-refresher`)**: *"The Network Under the Hood: A Developer's Refresher with Wireshark"*.

---

## 2. Git & Branch Architecture

| Branch | Latest Commit | Status | Description |
| :--- | :--- | :--- | :--- |
| **`main`** | `cf33a16` | Deployed on Vercel | Clean UI, Herdr debut article (EN + AR), Arabic RTL engine, clean production build. |
| **`feat/wireshark-refresher`** | `bb63fed` | Pushed to GitHub (Unmerged) | Standalone branch containing Article #2 on Wireshark, awaiting review. |

---

## 3. Key Milestones

### A. Design, Typography & UI Polish
* **Sans-Serif Standard**: Purged `Instrument_Serif` completely. Standardized on `Inter` for Latin scripts and Google `Cairo` for Arabic scripts.
* **Subtle Tactile Grain**: Added an ultra-light GPU-accelerated SVG fractal noise overlay (`.noise-overlay` at 2.8% opacity).
* **Restored Hero**: Maintained WebGL `Grainient` canvas, animated rotating words (`['Portfolio', 'Blog', 'World']`), and spinning `CircularText` badge (*"SCROLL DOWN"*).
* **Clutter Removal**:
  * Removed availability badge (*"Available for New Projects & Roles"*) from `Contact.tsx`.
  * Removed category filter pills and workbench card from `TechStack.tsx`.
  * Removed helper hint strings: *"Hover over any project to inspect live homepage preview →"* and *"Hover over any icon to inspect production role →"*.
  * Renamed blog section to **"Ibra's Blog"**.

### B. Clients Hover Gallery (`ClientsHoverGallery.tsx`)
* Implemented spring physics floating modal following the mouse cursor.
* High-res live captures of `spirahouse.com` and `kolr.store` in simulated browser chrome.
* Vector logo cards for `Coins & Cloth` and `Maz Mrkt`.

### C. Big-Icon Sliding Marquee (`TechStack.tsx`)
* Enlarged tech icons (64px–72px) with 21+ official Wikimedia vector SVGs.
* Dynamic cursor follower showing *"What I Did With This Technology"*, measured impact metrics, and project case study links.

### D. Blog Engine Architecture (`/blog`)
* **Subdirectory Strategy**: Retained blog under `ibrahimraafat.com/blog` (following industry standard used by Lee Robinson, Josh Comeau, and Paco Coursey) to preserve 100% of domain authority and SEO equity.
* **Arabic RTL Engine**:
  * Frontmatter `lang: "ar"` and `dir: "rtl"` support with auto-detection via Arabic Unicode range regex.
  * Localized reading times (e.g., `دقيقتان`, `٤ دقائق قراءة`).
  * Right-aligned typography with expanded line-height (`1.85-1.9`).
  * **Code block protection**: Code snippets and preformatted blocks are strictly forced to `direction: ltr !important; text-align: left; unicode-bidi: isolate;` to prevent punctuation inversions.
  * Interactive `[ ⇄ English (LTR) / عربي (RTL) ]` toggle on article pages.
  * Bilingual language filter tabs (`All Posts`, `English`, `العربية`) on `/blog`.

---

## 4. Content Library

| File | Language | Direction | Status | Covered Topics |
| :--- | :--- | :--- | :--- | :--- |
| `01-herdr-tmux-for-coding-agents.mdx` | English | LTR | Live on `main` | AI coding agents, terminal deadlocks, Herdr daemon, state tracking, socket API. |
| `02-herdr-tmux-ai-agents-ar.mdx` | Arabic | RTL | Live on `main` | Full Arabic translation and RTL showcase for the Herdr article. |
| `03-networking-refresher-wireshark.mdx` | English | LTR | On `feat/wireshark-refresher` | TCP handshakes, TLS 1.3 vs 1.2, DNS caching, connection pooling, Wireshark filters. |

---

## 5. Verification & Health

* **TypeScript**: `npx tsc --noEmit` passes with **0 errors**.
* **Next.js SSG Build**: `npm run build` prerenders all 11 routes in **~8.1s**.
* **Local Previews**: Captured and saved in `wireshark-preview.md`.

---

## 6. How to Resume Next Session

1. **To preview the Wireshark article locally**:
   ```bash
   git checkout feat/wireshark-refresher
   npm run dev -- -p 3000
   ```
   Open [http://localhost:3000/blog/networking-refresher-wireshark](http://localhost:3000/blog/networking-refresher-wireshark).

2. **To merge Wireshark article into `main` when ready**:
   ```bash
   git checkout main
   git merge feat/wireshark-refresher
   git push origin main
   ```

3. **To switch back to `main`**:
   ```bash
   git checkout main
   ```
