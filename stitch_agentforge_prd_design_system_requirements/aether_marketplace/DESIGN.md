```markdown
# Design System Specification: Future Tech Marketplace

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Exchange"**
This design system moves away from the aggressive, industrial "hacker" tropes of the past and leans into a sophisticated, editorial-grade marketplace for the future. The vibe is "High-End Digital Gallery"—where AI agents and tech solutions are treated like luxury artifacts. 

We break the "standard template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing wide horizontal tracking in headers and overlapping glass containers, we create a sense of vast, breathable space. This isn't just a tool; it's a curated experience that feels expensive, inclusive, and impossibly sharp.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones, punctuated by "Electric" light sources.

### Color Tokens (Material Design Mapping)
- **Core Background:** `#0e0e0e` (Surface/Background)
- **Primary Accent:** `#6dddff` (Electric Blue - Primary)
- **Secondary Accent:** `#ac8aff` (Vivid Purple - Secondary)
- **Success Tone:** `#c5ffc9` (Tertiary)
- **Surface Tiers:** 
  - `surface_container_lowest`: `#000000` (Pure abyss for deep embedding)
  - `surface_container_low`: `#131313` (Standard sectioning)
  - `surface_container_highest`: `#262626` (For elevated interactive elements)

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for defining sections. Boundaries must be established through **Tonal Shifts**. To separate a sidebar from a main feed, use a transition from `surface` to `surface_container_low`. 

### The Glass & Gradient Rule
To achieve "visual soul," all primary CTAs and hero headers should utilize a linear gradient from `primary` (#6dddff) to `primary_dim` (#00c3eb) at a 135-degree angle. This mimics the refraction of light through a lens rather than a flat digital fill.

---

## 3. Typography: The Editorial Edge
The type system balances the technical precision of **Orbitron** with the human-centric readability of **Rajdhani/Manrope**.

- **Display & Headlines (Orbitron/SpaceGrotesk):** These are our "Statement" pieces. Use `display-lg` (3.5rem) with `-0.02em` letter spacing for a sleek, compressed tech look. All caps should be reserved for `label-md` to denote metadata or category tags.
- **Body & UI (Rajdhani/Manrope):** Our workhorse. `body-md` (0.875rem) provides high legibility. Ensure line height is set to 1.6 for body text to maintain the "high-end editorial" breathing room.
- **Hierarchy of Authority:** Large-scale headlines paired with significantly smaller, muted secondary text (`on_surface_variant`) creates a dramatic contrast that signals a premium product.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to simulate height; we use **Light and Transparency**.

- **The Layering Principle:** Treat the UI as layers of "Frosted Obsidian." A card (`surface_container_high`) should sit atop a section (`surface_container_low`). The contrast between these shades provides all the "lift" required.
- **Ambient Glows:** Instead of black shadows, use "Atmospheric Glows." When an element is active, apply a drop-shadow with a 24px blur, 4% opacity, using the `primary` color token. This suggests the element is emitting light rather than casting a shadow.
- **Ghost Borders:** If a container requires a perimeter for accessibility, use the `outline_variant` at 10% opacity. It should be felt, not seen.
- **Glassmorphism:** Use `rgba(255, 255, 255, 0.03)` with a `backdrop-filter: blur(12px)`. This allows the "Grid Background" patterns to bleed through subtly, grounding the UI in a physical space.

---

## 5. Components Style Guide

### Buttons & Interaction
- **Primary Action:** 135° Gradient (`primary` to `primary_dim`). Sharp geometry (`rounded-sm`: 0.125rem). On hover, trigger a `subtle glow pulse`—a keyframe animation expanding the outer glow by 4px.
- **Secondary Action:** Ghost style with a `Ghost Border` and `primary` text. No fill.
- **Tertiary:** Pure text with an underline that expands from the center on hover.

### Inputs & Fields
- **Container:** `surface_container_highest` with a bottom-only border of 1px using `outline_variant`. 
- **Focus State:** The bottom border transitions to `primary` with a 2px height. No "halo" rings.

### Cards & Marketplace Showcase
- **Layout:** Strictly forbid divider lines. Use `1.5rem` (Spacing 6) of vertical whitespace to separate items.
- **Hover State:** Cards should transition from `surface_container_low` to `surface_container_highest` while scaling 1.02x.
- **Grid Pattern:** Apply a 20px repeating SVG grid line (0.05 opacity) to the `background`. This provides a "technical canvas" feel without the aggression of a radar/scanner.

### Specialized Marketplace Components
- **The "Agent Tier" Chip:** Use `secondary_container` with `on_secondary_container` text. These should be sharp-edged (0px radius) to contrast with the slightly rounded UI elements.
- **Status Indicators:** Use "Pulse Atoms"—small 6px circles using `tertiary` (Success) or `error` with a localized breathing animation.

---

## 6. Do’s and Don’ts

### DO:
- **Use Asymmetric Grids:** Align text to the left but allow imagery or glass cards to bleed off the right edge of the container for an editorial feel.
- **Embrace Wide Tracking:** Increase letter-spacing on `label-sm` elements to 0.1em for a "luxury tech" vibe.
- **Use Micro-Transitions:** Every state change should take 200ms with an `ease-out` curve.

### DON'T:
- **No Rounded Corners > 12px:** Anything "bubbly" breaks the futuristic tech aesthetic. Keep it sharp and intentional.
- **No Military Language:** Avoid "Target," "Deploy," "Mission," or "Combat." Use "Initialize," "Scale," "Release," and "Showcase."
- **No Solid Borders:** If you feel the need to draw a line, try using a slightly different background shade instead. 
- **No Aggressive Motion:** Avoid bouncing or jarring slides. Use opacity fades and subtle scale-ups.