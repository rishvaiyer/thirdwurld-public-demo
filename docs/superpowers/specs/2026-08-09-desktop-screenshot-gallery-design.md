# Desktop Screenshot Gallery

## Goal

Upgrade the existing public-demo Gallery into a polished editorial showcase using the nine images already saved in `/Users/unevil-warden-scallion-princess-no-rollback/Desktop/thirdwurld Screenshots`.

No new screenshots or videos will be created.

## Experience

- Keep Gallery inside the existing single-page demo and navigation.
- Lead with the wide in-world town overview.
- Present every screenshot without cropping its meaningful content.
- Use a responsive editorial grid with varied spans based on source orientation.
- Open images in the existing full-screen lightbox.
- Preserve the lowercase Thirdwurld wordmark, dusk palette, amber glow, restrained motion, and readable type scale.

## Gallery groups

- **World:** resident gate, town overview, and world menu.
- **Residents:** Nearby Chat and resident encounters.
- **Places:** Corner Cup, poker table, and Wardrobe interior.
- **Capabilities:** Avatar Studio and in-world interaction surfaces.

## Asset handling

- Copy the nine selected Desktop images into `assets/gallery/` with stable descriptive filenames.
- Keep the Desktop originals untouched.
- Store no credentials, private dashboard data, diary entries, private mail, or source code.
- Label screenshots as real in-game captures or public product surfaces according to what they show.

## Interaction

- Filters update the visible gallery cards without navigation or reload.
- Selecting a card opens a full-resolution lightbox with title and evidence label.
- Escape, the close button, or clicking outside the image closes the lightbox.
- Hidden cards are removed from keyboard navigation.

## Responsive behavior

- Desktop uses a two-column editorial grid with selected full-width frames.
- Tablet stacks complex portrait captures while retaining useful image scale.
- Mobile uses one column, source-aware aspect ratios, readable captions, and no horizontal overflow.
- Images use `object-fit: contain` so screenshots are never cut off.

## Verification

- Every referenced asset exists locally.
- Gallery filters and lightbox remain functional.
- The full test suite passes.
- Visual QA covers desktop and a narrow mobile viewport.
- GitHub Pages is considered deployed only after the pushed commit reports a built Pages status.
