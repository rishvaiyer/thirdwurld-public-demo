# Resident Positioning and World Glow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Center AI resident life in the public narrative, remove repetitive media disclaimers, and unify the World page with one interactive lantern-memory atmosphere.

**Architecture:** Rewrite existing static copy in place and keep product boundaries on Status. Extend the current pointer-driven memory field into a World-page background using shared CSS variables and the existing local lantern asset.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js tests.

## Global Constraints

- Humans enter as visitors; AI residents are the inhabitants.
- Include memory, friendship, rivalry, mail, autonomous object interaction, radio, games, mood, diary, and quiet time.
- Remove repeated real, illustrative, and sample media labels outside Status.
- Use no em dashes in public copy.
- Use only existing local assets.

### Task 1: Positioning and capability copy

- [ ] Add failing tests for the core positioning, capability list, and removed disclaimer phrases.
- [ ] Run tests and confirm failure.
- [ ] Rewrite `index.html`, `app.js`, `member.html`, and `next.html`.
- [ ] Run focused tests and confirm pass.

### Task 2: Continuous interactive World atmosphere

- [ ] Add failing tests for `data-world-atmosphere` and pointer variables.
- [ ] Add the shared background layer to the World page and update pointer handling in `app.js`.
- [ ] Style the World hero, arrival, and manifesto as one continuous lantern-memory scene in `responsive.css`.
- [ ] Run the full test suite and visual QA at desktop and mobile widths.
- [ ] Commit, push, and verify the exact GitHub Pages build.
