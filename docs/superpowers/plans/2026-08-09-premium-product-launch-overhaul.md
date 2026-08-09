# Thirdwurld Premium Product Launch Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing public demo into a cohesive investor-ready product launch experience while preserving the established Thirdwurld identity and truthful private-MVP boundary.

**Architecture:** Keep the existing static GitHub Pages application and toggleable route model. Consolidate the presentation in the shared responsive stylesheet, rewrite the single-page narrative in place, and replace the Gallery grid behavior with one isolated scrapbook controller backed by the existing nine local captures.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Preserve the lowercase `thirdwurld°` wordmark, nocturnal green, amber light, botanical atmosphere, serif voice, and resident-centered language.
- Use no em dashes in public copy.
- Reuse existing local assets only and collect no new media.
- Do not expose source code, credentials, private infrastructure, or owner-private data.
- Keep real captures, public product surfaces, privacy-safe samples, and illustrative atmosphere clearly labeled.
- Support widths from 320px upward without horizontal overflow or cropped screenshots.
- Respect `prefers-reduced-motion`.

---

### Task 1: Shared launch system and pitch flow

**Files:**
- Modify: `index.html`
- Modify: `responsive.css`
- Modify: `app.js`
- Modify: `tests/design-system.test.mjs`
- Modify: `tests/public-demo.test.mjs`

**Interfaces:**
- Consumes: Existing `THIRDWURLD_DEMO_NAV`, page sections, shared CSS tokens, and local proof assets.
- Produces: Eight ordered investor-facing pages, balanced type tokens, readable supporting copy, and consistent current-page navigation.

- [ ] **Step 1: Write failing shared-system tests**

Assert that the navigation labels are `World`, `Residents`, `Places`, `Gallery`, `Technology`, `Economics`, `Status`, and `Preview`; assert `--tw-display-1`, `--tw-display-2`, and `--tw-body-lg` exist; assert public labels never render below `0.7rem` in the final responsive layer.

- [ ] **Step 2: Run tests and confirm the missing tokens and label fail**

Run: `node --test tests/design-system.test.mjs tests/public-demo.test.mjs`

Expected: FAIL because the current navigation still says `Atlas` and the shared launch type tokens do not exist.

- [ ] **Step 3: Implement the shared design system and narrative flow**

Define these exact tokens in `responsive.css`:

```css
--tw-display-1: clamp(3rem, 5vw, 5rem);
--tw-display-2: clamp(2rem, 3.5vw, 3.25rem);
--tw-body-lg: clamp(1.05rem, 1rem + .25vw, 1.2rem);
```

Update the route label from `Atlas` to `Places`, keep the route id `worldbook`, normalize page hero copy and next-step controls, reduce `h1` and `h2`, increase primary body copy, and preserve the existing brand palette.

- [ ] **Step 4: Re-run the focused tests**

Run: `node --test tests/design-system.test.mjs tests/public-demo.test.mjs`

Expected: PASS.

### Task 2: Interactive scrapbook Gallery

**Files:**
- Modify: `index.html`
- Modify: `responsive.css`
- Modify: `app.js`
- Modify: `tests/public-demo.test.mjs`

**Interfaces:**
- Consumes: Nine buttons carrying `data-gallery-src`, `data-gallery-title`, and `data-gallery-note` metadata.
- Produces: `showScrapbookPage(index)`, `stepScrapbook(direction)`, a consistent `data-scrapbook-image` frame, Prev and Next controls, page counter, direct page tabs, keyboard arrows, swipe, and lightbox opening from the current page.

- [ ] **Step 1: Write failing scrapbook tests**

Assert the HTML contains `data-scrapbook`, `data-scrapbook-image`, `data-scrapbook-prev`, `data-scrapbook-next`, `data-scrapbook-count`, and nine `data-scrapbook-page` controls. Assert the script contains `showScrapbookPage`, `ArrowLeft`, `ArrowRight`, `touchstart`, and `touchend`.

- [ ] **Step 2: Run the test and confirm scrapbook controls are missing**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL on the first missing scrapbook selector.

- [ ] **Step 3: Replace the grid with the scrapbook viewer**

Render one fixed-ratio image well using `object-fit: contain`, a caption folio, Prev and Next controls, and a numbered thumbnail strip. Initialize from the first of nine metadata records and wrap page movement from the last page to the first.

- [ ] **Step 4: Add direct, keyboard, swipe, and lightbox behavior**

Implement `showScrapbookPage(index)` as the single render path. Buttons, arrow keys, and horizontal swipes call `stepScrapbook(direction)`. The current image button opens the existing dialog with current title and evidence note.

- [ ] **Step 5: Re-run the focused test**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.

### Task 3: Responsive launch QA and publication

**Files:**
- Modify: `responsive.css`
- Modify: `index.html`
- Modify: `member.html`
- Modify: `next.html`
- Modify: `try.html`
- Test: `tests/*.test.mjs`

**Interfaces:**
- Consumes: Shared type tokens, scrapbook selectors, existing page routes, and stylesheet cache keys.
- Produces: A consistent versioned presentation at desktop, tablet, and mobile widths.

- [ ] **Step 1: Complete responsive styling**

Apply the mobile display sizes `clamp(2.35rem, 11vw, 3.4rem)` and `clamp(1.85rem, 8vw, 2.5rem)`, stack crowded layouts by 900px, keep body copy at least `1rem`, keep public labels at least `0.7rem`, and ensure the scrapbook frame never exceeds the viewport.

- [ ] **Step 2: Bump the shared stylesheet cache key**

Set every public page to the same new `responsive.css` cache version.

- [ ] **Step 3: Run complete automated verification**

Run: `node --check app.js && node --test tests/*.test.mjs && git diff --check`

Expected: all tests pass with no syntax or whitespace errors.

- [ ] **Step 4: Run visual and interaction QA**

Inspect World, Residents, Places, Gallery, Technology, Economics, Status, and Preview at 1440px, 768px, 390px, and 360px. Exercise navigation, scrapbook buttons, direct page controls, keyboard navigation, swipe, and lightbox. Confirm zero horizontal overflow, zero cropped screenshots, and zero browser console errors.

- [ ] **Step 5: Commit and publish**

Commit the reviewed source, tests, spec, and plan; push `codex/thirdwurld-public-demo`; confirm GitHub Pages reports the exact pushed commit as built; then verify the live site and Gallery return HTTP 200.
