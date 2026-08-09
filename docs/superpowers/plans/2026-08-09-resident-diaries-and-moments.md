# Resident Diaries and Moments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add readable resident diaries and memorable resident moments to the Residents page and Gallery.

**Architecture:** Keep the existing single-page demo architecture. Add semantic HTML for the editorial journal section, extend the existing `scrapbookPages` data set from nine to twelve records, and reuse the existing diary, world-moment, and resident-chat assets.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node test runner.

## Global Constraints

- Use only owner-approved resident material already present in the demo assets.
- Do not expose keys, private account identifiers, deployment details, or unrelated private mail.
- Do not add repetitive media disclaimers.
- Do not use em dashes in new public copy.
- Preserve keyboard, swipe, direct-page, and lightbox Gallery behavior.

---

### Task 1: Resident journal and moments section

**Files:**
- Modify: `tests/public-demo.test.mjs`
- Modify: `index.html`
- Modify: `responsive.css`

**Interfaces:**
- Consumes: existing `.residents-page`, `.frame`, and Thirdwurld design tokens.
- Produces: `.resident-journal`, `.diary-entry`, and `.resident-moment-card` surfaces.

- [ ] **Step 1: Write the failing public behavior test**

```js
test('shows resident diaries and memorable moments on Residents', () => {
  assert.match(html, /In their own words/i)
  assert.match(html, /The square felt different today/i)
  assert.match(html, /The gate opened/i)
  assert.match(html, /pressed lantern flower/i)
  assert.match(html, /Marvin[\s\S]*Blueberry/i)
})
```

- [ ] **Step 2: Run the focused test and verify it fails because the section is absent**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL on `In their own words`.

- [ ] **Step 3: Add semantic journal and moment markup**

Add one `.resident-journal` section after `.proof-split`. Render the two approved diary excerpts as blockquotes. Render the pressed lantern flower and Marvin/Blueberry banter as two accessible moment cards.

- [ ] **Step 4: Add responsive editorial styling**

Use a two-column layout above 850px, one column below 850px, and readable body type no smaller than `1rem`. Ensure cards use `min-width: 0` and never create page-level horizontal overflow.

- [ ] **Step 5: Run the focused test and verify it passes**

Run: `node --test tests/public-demo.test.mjs`

Expected: PASS.

### Task 2: Twelve-page scrapbook

**Files:**
- Modify: `tests/public-demo.test.mjs`
- Modify: `index.html`
- Modify: `app.js`

**Interfaces:**
- Consumes: `scrapbookPages`, `showScrapbookPage(index)`, and existing Gallery controls.
- Produces: twelve `scrapbookPages` entries and twelve direct page buttons.

- [ ] **Step 1: Write the failing Gallery behavior test**

```js
test('adds resident journals and moments to the twelve-page scrapbook', () => {
  assert.equal((html.match(/data-scrapbook-page=/g) || []).length, 12)
  for (const asset of ['resident-diary-real.png', 'world-moment-real.png', 'residents-chatting.png']) {
    assert.match(`${html}\n${script}`, new RegExp(asset.replaceAll('.', '\\.')))
  }
  assert.match(`${html}\n${script}`, /12 \/ 12/)
})
```

- [ ] **Step 2: Run the focused test and verify it fails at nine pages**

Run: `node --test tests/public-demo.test.mjs`

Expected: FAIL because the Gallery has nine page buttons.

- [ ] **Step 3: Extend the data and direct navigation**

Append these records to `scrapbookPages`:

```js
['assets/game/resident-diary-real.png', 'In their own words', 'Resident diary', 'Residents reflect on moments the world recorded.'],
['assets/game/world-moment-real.png', 'A small gift left behind', 'Memory and friendship', 'A resident placed a pressed lantern flower where a friend would find it.'],
['assets/gallery/residents-chatting.png', 'A little Night Market banter', 'Resident humor', 'Marvin and Blueberry turn a passing encounter into playful friction.'],
```

Add page buttons `10`, `11`, and `12`. Update visible Gallery copy and the initial counter from `09` to `12`.

- [ ] **Step 4: Run the focused test and full suite**

Run: `node --test tests/public-demo.test.mjs && node --test tests/*.test.mjs`

Expected: all tests pass.

- [ ] **Step 5: Verify desktop and mobile behavior**

At 1440x900 and 390x844, verify no page-level overflow. Exercise next, previous, direct page 12, keyboard arrows, swipe handling, and lightbox opening.

- [ ] **Step 6: Commit and publish**

```bash
git add index.html app.js responsive.css tests/public-demo.test.mjs docs/superpowers/plans/2026-08-09-resident-diaries-and-moments.md
git commit -m "Add resident diaries and memorable moments"
git push origin codex/thirdwurld-public-demo
```
