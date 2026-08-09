# Thirdwurld Public Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a private-product-safe, GitHub-Pages-ready interactive Thirdwurld demonstration that persuades without exposing application access or source.

**Architecture:** Keep the demo dependency-free and static. A shared visual system powers four toggleable page views: Overview, Living Proof, Product Economics, and Architecture. Generated, project-owned stills provide a cinematic world; a lightweight in-page reel sequences those images and a synthetic resident conversation instead of exposing live world data.

**Tech Stack:** Semantic HTML, modern CSS, vanilla JavaScript, Node 22 built-in test runner, generated WebP/PNG assets.

## Global Constraints

- Preserve the existing dark dusk, parchment, lantern-amber Thirdwurld visual language.
- Never include private source, credentials, database records, production resident data, or access to the private world.
- Describe only verified MVP behavior as live; visually label product pricing and operating economics as illustrative.
- Make all navigation views independently addressable and hideable through one configuration object.
- Support 320px+ viewports, keyboard navigation, reduced motion, and no-JavaScript reading order.

---

### Task 1: Establish the public demo shell

**Files:**
- Create: `tests/public-demo.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`
- Create: `app.js`

**Interfaces:**
- Produces: `window.THIRDWURLD_DEMO_NAV`, an ordered array of `{ id, label, enabled }` records.
- Produces: `data-page` sections with matching nav `href` values.

- [ ] **Step 1: Write the failing test**

```js
test('exposes four named, toggleable public-demo pages', () => {
  assert.match(script, /THIRDWURLD_DEMO_NAV/)
  for (const page of ['overview', 'proof', 'economics', 'architecture']) {
    assert.match(html, new RegExp(`data-page=["']${page}["']`))
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL because `app.js` and the four named pages do not exist.

- [ ] **Step 3: Write minimal implementation**

Create the nav configuration and named page sections. Hide disabled items and switch visible pages from URL hash links.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.

### Task 2: Add cinematic world proof

**Files:**
- Create: `assets/thirdwurld-night-market.webp`
- Create: `assets/thirdwurld-resident-conversation.webp`
- Create: `assets/thirdwurld-garden-memory.webp`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

**Interfaces:**
- Consumes: the page shell from Task 1.
- Produces: a button-controlled `.demo-reel` whose panels contain captions and images.

- [ ] **Step 1: Write the failing test**

```js
test('contains a captioned resident conversation and replayable demo reel', () => {
  assert.match(html, /A conversation becomes a shared memory/i)
  assert.match(html, /data-reel-next/)
  assert.match(html, /data-reel-panel/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL because the proof content and reel controls are absent.

- [ ] **Step 3: Write minimal implementation**

Add image-led proof sections, a synthetic transcript marked as illustrative, and a reduced-motion-safe reel state controller.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.

### Task 3: Explain product economics and system boundaries

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `data-page="economics"` and `data-page="architecture"` from Task 1.
- Produces: a visually labeled illustrative pricing grid, operating-cost model, and private-source boundary.

- [ ] **Step 1: Write the failing test**

```js
test('labels pricing and operating figures as illustrative', () => {
  assert.match(html, /Illustrative pricing/i)
  assert.match(html, /Illustrative operating model/i)
  assert.match(html, /The core application remains private/i)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL because the economics and clear public boundary are absent.

- [ ] **Step 3: Write minimal implementation**

Add customer pricing, a transparent scenario model, capability ledger, and simplified system diagram. Avoid providing private implementation details.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.

### Task 4: Validate, document, and prepare GitHub Pages delivery

**Files:**
- Modify: `README.md`
- Modify: `tests/public-demo.test.mjs`

**Interfaces:**
- Consumes: complete static demo.
- Produces: launch instructions and a test suite that rejects missing assets, disabled accessibility controls, and accidental private-code links.

- [ ] **Step 1: Write the failing test**

```js
test('references every local visual asset and does not link to the private app', () => {
  for (const asset of localAssets) assert.ok(existsSync(asset))
  assert.doesNotMatch(html, /thurdwurldbby-production/i)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL until the visual assets and boundary copy are complete.

- [ ] **Step 3: Write minimal implementation**

Add a public-demo run/deploy section to the README and complete static quality assertions.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.
