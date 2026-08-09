# Thirdwurld Premium Product Launch Overhaul

## Goal

Rebuild the public demo into an investor-ready product launch experience that feels authored by a mature product, design, and engineering team while preserving the unmistakable Thirdwurld identity.

## Audience and outcome

The primary audience is an investor or strategic partner receiving a private preview link. The experience must communicate, in order:

1. Thirdwurld is a real, functioning private MVP.
2. Multiple AI residents already live inside the world.
3. The world provides places, continuity, relationships, private surfaces, and human governance.
4. The technology is credible without exposing source code, credentials, or private infrastructure.
5. The product is intentionally not launched and remains under active iteration.
6. A deeper private walkthrough is available by invitation.

## Brand system to preserve

- Lowercase `thirdwurld°` wordmark everywhere.
- Nocturnal forest green foundation with warm amber light.
- Botanical, lantern, memory, and lived-in world motifs.
- Editorial serif display voice paired with clear sans-serif body copy and restrained mono labels.
- Real in-game captures as evidence, with generated imagery used only as labeled atmosphere.
- Resident-centered language that treats invitations as invitations and keeps human authority explicit.
- No em dashes in public copy.

The redesign must not become a generic SaaS site, a neon gaming landing page, or a conventional pitch-deck template.

## Experience direction

Use a premium editorial product-launch approach. The site should feel deliberate, quiet, cinematic, and expensive. Motion supports orientation and atmosphere instead of competing for attention.

### Typography

- Page titles: `clamp(3rem, 5vw, 5rem)` on desktop and `clamp(2.35rem, 11vw, 3.4rem)` on mobile.
- Section headings: `clamp(2rem, 3.5vw, 3.25rem)` on desktop and `clamp(1.85rem, 8vw, 2.5rem)` on mobile.
- Card headings: `1.35rem` to `2rem` depending on hierarchy.
- Body copy: `1.05rem` to `1.2rem` with comfortable line height.
- Labels and metadata: never below `0.7rem`.
- Large display lines must not overpower the supporting evidence.

The sentence “Human authority stays human.” is a section heading, not a hero title.

### Navigation

- Keep the navigation visible and consistent across all pages.
- Desktop uses a compact premium top bar with clear current-page state.
- Mobile uses a concise menu plus the existing four-item quick dock.
- Use plain, predictable labels: World, Residents, Places, Gallery, Technology, Economics, Status, Preview.
- Every page must provide a clear next step in the pitch narrative.

### Page flow

1. **World:** emotional premise, real current status, and primary entry into the experience.
2. **Residents:** grounded resident behavior, conversation, relationships, continuity, quiet time, and boundaries.
3. **Places:** authored destinations and why location matters to social memory.
4. **Gallery:** a scrapbook viewer containing all nine collected screenshots.
5. **Technology:** current foundation, authoritative flow, memory model, optional server-side providers, and privacy boundary.
6. **Economics:** clearly illustrative operating assumptions and possible product models.
7. **Status:** working private MVP, gated surfaces, and active iteration.
8. **Preview:** concise investor close, playable synthetic capsule, member journey, and invitation CTA.

### Scrapbook Gallery

- Present one screenshot at a time in a fixed, consistent image frame.
- Use `object-fit: contain` so no image content is cropped.
- Add previous and next page controls, page count, keyboard arrows, and touch swipe.
- Add a numbered thumbnail strip for direct navigation.
- Give each page a title, truthful evidence label, and concise caption.
- Use paper texture, subtle tape or corner details, and restrained page-turn motion.
- Preserve the global navigation while the scrapbook is open.
- Keep the full-screen lightbox as an optional closer view.

### Content and claims

- Rewrite copy to be concise, specific, and capability-grounded.
- Lead with outcomes and visible evidence rather than abstract AI language.
- Keep distinctions among real in-game capture, public product surface, privacy-safe sample, and illustrative atmosphere.
- Do not imply public access to the private world, source code, owner-private data, or credentials.
- Do not claim unbounded resident autonomy.
- Avoid repeated explanations across pages.

### Interaction and motion

- Use subtle background drift, amber focus glow, page transitions, and tactile controls.
- Respect `prefers-reduced-motion`.
- Ensure keyboard access, visible focus states, semantic controls, and correct dialog behavior.
- Motion must not obscure copy, delay navigation, or cause layout shifts.

## Responsive requirements

- Support widths from 320px upward without horizontal overflow.
- Preserve complete screenshots at every breakpoint.
- Keep body copy readable without zoom.
- Stack complex layouts before they become cramped.
- Ensure sticky navigation never covers headings or controls.
- Test at 1440px, 768px, 390px, and 360px.

## Technical approach

- Keep the current static GitHub Pages architecture.
- Retain the toggleable navigation configuration in `app.js`.
- Consolidate the shared type scale and visual tokens in `responsive.css` and existing design-system styles.
- Replace the Gallery grid behavior with a small stateful scrapbook controller in vanilla JavaScript.
- Reuse existing local assets only. Do not collect or generate additional media.
- Add focused Node test coverage for navigation, scrapbook controls, asset references, and truthful labels.

## Verification

- Run `node --check app.js`.
- Run `node --test tests/*.test.mjs`.
- Run `git diff --check`.
- Visually inspect every primary page at desktop and mobile widths.
- Exercise scrapbook previous, next, direct page selection, keyboard navigation, swipe, and lightbox behavior.
- Confirm no browser console errors and no horizontal overflow.
- Publish only after the exact pushed commit reports a successful GitHub Pages build.

## Out of scope

- Opening the private application or source repository.
- Exposing provider keys or creating a public provider endpoint.
- New screenshots, video recording, or image generation.
- Changing the private MVP itself.
- Presenting illustrative pricing as final commercial pricing.
