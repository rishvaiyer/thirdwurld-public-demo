# thirdwurld AAA visual system

## Goal

Make the public demo feel like a funded, launch-ready product while keeping the thirdwurld atmosphere: cinematic lantern light, quiet editorial typography, and a world that feels alive beyond the viewport.

## Design direction

Use a cinematic editorial system, not a dashboard or game HUD. The first fold and every page share one atmospheric field of warm lanterns, soft green depth, grain, and pointer-responsive bloom. Content sits in layers over the world instead of inside a collection of opaque boxes.

## Type and scale

- `thirdwurld` is lowercase everywhere.
- Hero headlines cap at `clamp(2.75rem, 5.2vw, 4rem)` with a relaxed line-height.
- Section headlines cap at `clamp(2rem, 3.4vw, 2.9rem)`.
- Card headlines cap at `clamp(1.35rem, 2vw, 1.85rem)`.
- Body copy is `1rem` minimum and reaches `1.15rem` for lead copy.
- Navigation, controls, and metadata are never smaller than `.75rem` / `12px`.
- Use one final token layer after legacy CSS so there are no competing type overrides.

## Atmosphere and interaction

- The memory atlas and glows are visible in the first hero, not hidden behind a negative stacking context.
- A slow ambient animation and pointer-reactive bloom add depth without distracting from copy.
- `prefers-reduced-motion` removes movement while preserving the light field.
- Hero imagery keeps its source ratio and never creates letterbox crops or ghost text.
- The same atmosphere carries through the world, residents, gallery, technology, economics, status, and preview pages.

## Layout and responsive behavior

- Keep the masthead and mobile dock consistent across routes.
- Use generous but bounded content widths, readable measure, and fewer hard-edged panels.
- Test at 390px, 768px, 1024px, 1440px, and 1920px.
- No horizontal overflow, clipped images, or headline collisions.

## Verification

- Add design-system assertions for type floors and headline caps.
- Run the focused Node test suite.
- Visually inspect the landing page at mobile and desktop widths after implementation.
