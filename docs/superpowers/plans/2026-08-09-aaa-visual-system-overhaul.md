# AAA thirdwurld visual system Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the thirdwurld public demo feel like a cinematic, funded product launch with consistent readable typography, a visible interactive lantern atmosphere, and responsive layout quality at every viewport.

**Architecture:** Keep the existing static HTML and page router. Add one final visual-system layer in `responsive.css`, a small pointer-light controller in `app.js`, and focused regression assertions in `tests/design-system.test.mjs`. The final layer intentionally overrides legacy rules instead of restructuring page markup.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript, Node built-in test runner.

## Global Constraints

- Product name is lowercase `thirdwurld` everywhere.
- Hero headlines cap at `clamp(2.75rem, 5.2vw, 4rem)`.
- Section headlines cap at `clamp(2rem, 3.4vw, 2.9rem)`.
- Body copy is at least `1rem`; UI labels are at least `.75rem` / `12px`.
- No horizontal overflow or clipped source imagery at 390px, 768px, 1024px, 1440px, or 1920px.
- Reduced motion keeps the glow field visible but disables movement.

### Task 1: Replace competing type overrides with final tokens

**Files:**
- Modify: `responsive.css` final override section
- Test: `tests/design-system.test.mjs`

- [ ] Add `--tw-display-1`, `--tw-display-2`, `--tw-display-3`, `--tw-body`, and `--tw-ui` values matching the spec.
- [ ] Override all shared `h1`, `h2`, `h3`, body lead, body detail, eyebrow, navigation, button, and control selectors in one final block.
- [ ] Remove mobile rules that reintroduce oversized headings or sub-12px labels.
- [ ] Add assertions that inspect the source for the token values and lowercase wordmark rule.
- [ ] Run `node --test tests/design-system.test.mjs` and confirm it passes.

### Task 2: Make the lantern atmosphere the shared visible background

**Files:**
- Modify: `responsive.css`
- Modify: `app.js`
- Test: `tests/design-system.test.mjs`

- [ ] Move `.world-atmosphere` into a positive page-local stacking layer, keep content above it, and make `.world-hero-image` transparent rather than hiding the atlas.
- [ ] Add a shared `.thirdwurld-page::after` bloom/grain layer and page-level atmospheric background so non-world routes inherit the same visual language.
- [ ] Add `data-pointer-x` and `data-pointer-y` CSS variables on pointer movement, clamped to the viewport and disabled for touch/reduced-motion.
- [ ] Add slow keyframe drift for the atlas and bloom layers without changing layout.
- [ ] Assert the positive stacking context, pointer variables, and reduced-motion rule.

### Task 3: Normalize responsive composition and image behavior

**Files:**
- Modify: `responsive.css`
- Test: `tests/design-system.test.mjs`

- [ ] Set shared page content width, readable text measure, section rhythm, and button/control heights.
- [ ] Preserve image aspect ratios with `object-fit: cover` only inside intentional frames and remove tablet square/letterbox overrides.
- [ ] At widths below 900px, stack console/reel layouts and scale hero spacing without changing the type floor.
- [ ] Add assertions for the responsive breakpoints, `overflow-x: clip`, and source-ratio image rules.

### Task 4: Verify the visual system

**Files:**
- Modify: `index.html` cache version if needed
- Test: `tests/design-system.test.mjs`, existing focused tests

- [ ] Run `node --test tests/design-system.test.mjs tests/public-demo.test.mjs tests/member-demo.test.mjs tests/next-demo.test.mjs tests/try-demo.test.mjs`.
- [ ] Serve the site locally and inspect 390px and 1440px screenshots for heading scale, visible glow, nav consistency, and image cropping.
- [ ] Confirm no all-caps `THIRDWURLD` or `Thirdwurld` wordmark remains in rendered source.
- [ ] Commit the implementation as `feat: establish thirdwurld aaa visual system`.
