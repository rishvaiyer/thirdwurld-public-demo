# Desktop Screenshot Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing mixed proof gallery with a polished, responsive showcase of the nine screenshots already collected on the Desktop.

**Architecture:** Keep the existing single-page Gallery route, filter controls, and dialog lightbox. Copy the source images into a dedicated public asset directory, render them as source-aware editorial cards, and preserve the current vanilla HTML, CSS, and JavaScript interaction model.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Do not collect or generate any new media.
- Keep Desktop originals untouched.
- Never crop meaningful screenshot content.
- Preserve the lowercase Thirdwurld wordmark and existing dusk and amber design language.
- Use truthful, privacy-safe captions and expose no private code or credentials.
- Use no em dashes in public copy.

---

### Task 1: Lock the gallery contract with tests

**Files:**
- Modify: `tests/public-demo.test.mjs`
- Modify: `tests/design-system.test.mjs`

**Interfaces:**
- Consumes: Static markup in `index.html` and assets below `assets/gallery/`.
- Produces: Assertions for all nine stable filenames, four filter groups, truthful labels, and stylesheet cache version 6.

- [ ] **Step 1: Write the failing test**

Add an assertion loop for the nine `assets/gallery/*.png` paths, assert the `world`, `resident`, `places`, and `capabilities` filter values, and update the shared stylesheet assertion to accept version 6.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/public-demo.test.mjs tests/design-system.test.mjs`

Expected: FAIL because the new stable gallery assets and filter values are not yet present.

- [ ] **Step 3: Keep the test focused**

Remove the obsolete gallery requirement for a Pollinator Garden historical QA card while retaining public-proof and privacy-label coverage elsewhere.

### Task 2: Import and present the nine screenshots

**Files:**
- Create: `assets/gallery/resident-gate.png`
- Create: `assets/gallery/residents-chatting.png`
- Create: `assets/gallery/poker-nearby-chat.png`
- Create: `assets/gallery/blueberry-resident-encounter.png`
- Create: `assets/gallery/world-menu-memory-tree.png`
- Create: `assets/gallery/corner-cup-exterior.png`
- Create: `assets/gallery/avatar-studio.png`
- Create: `assets/gallery/wardrobe-interior.png`
- Create: `assets/gallery/town-overview.png`
- Modify: `index.html`

**Interfaces:**
- Consumes: Nine source PNGs in `/Users/unevil-warden-scallion-princess-no-rollback/Desktop/thirdwurld Screenshots`.
- Produces: Nine `button.gallery-card` elements with `data-gallery-item`, `data-gallery-src`, `data-gallery-title`, and `data-gallery-note` attributes used by `app.js`.

- [ ] **Step 1: Copy each source image without modifying the original**

Create `assets/gallery/` and copy the screenshots in chronological order to the stable filenames listed above.

- [ ] **Step 2: Replace the gallery toolbar and card markup**

Use filters All, World, Residents, Places, and Capabilities. Lead with `town-overview.png`, preserve every source orientation, and apply `gallery-wide` or `gallery-portrait` only as a layout hint.

- [ ] **Step 3: Run the focused tests**

Run: `node --test tests/public-demo.test.mjs tests/design-system.test.mjs`

Expected: gallery contract passes after markup and assets exist.

### Task 3: Finish responsive editorial styling

**Files:**
- Modify: `responsive.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: `.gallery-card`, `.gallery-wide`, `.gallery-portrait`, and `.gallery-lightbox` markup classes.
- Produces: A two-column desktop gallery, source-aware portrait treatment, one-column mobile layout, and uncropped lightbox presentation.

- [ ] **Step 1: Update Gallery CSS**

Use intrinsic image sizing inside a contained dark frame, varied desktop spans, visible focus states, and mobile layout without horizontal overflow. Keep `object-fit: contain` for both cards and lightbox.

- [ ] **Step 2: Bump the stylesheet cache key**

Change the `responsive.css` query version from 5 to 6 on all public pages.

- [ ] **Step 3: Run verification**

Run: `node --check app.js && node --test tests/*.test.mjs && git diff --check`

Expected: all checks pass with no syntax or whitespace errors.

- [ ] **Step 4: Visually inspect Gallery**

Serve the repository locally and verify the Gallery at a desktop viewport and a 390px mobile viewport. Confirm every image is fully visible, filters work, lightbox opens and closes, copy is readable, and no horizontal overflow appears.
