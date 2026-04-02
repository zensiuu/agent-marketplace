# Design System Specification: Sovereign Command Interface

## 1. Overview & Creative North Star

### Creative North Star: "The Tactical Vanguard"
This design system is not a mere utility; it is a high-performance instrument of authority. Moving away from the "friendly SaaS" aesthetic, it adopts an **Organic Tactical** approach—blending the stark, high-contrast rigidity of a military command center with the fluid, atmospheric depth of advanced aerospace software. 

The system rejects the "standard grid" in favor of **Intentional Asymmetry**. By utilizing significant whitespace, varying container heights, and overlapping glass layers, we create an editorial layout that feels curated and high-stakes. It is designed to make the user feel like a commander overlooking a vast, automated workforce.

---

## 2. Colors & Surface Philosophy

The palette is anchored in absolute depth, using high-chroma accents to guide the eye through the "fog of data."

### The Palette
- **Primary (Tactical Cyan):** `#a8e8ff` / `primary_container: #00d4ff`. Used for critical action paths and success states.
- **Secondary (Neon Psionics):** `#d0bcff` / `secondary_container: #571bc1`. Reserved for specialized workforce metrics and advanced analytics.
- **Background:** `#131313`. A deep, obsidian base that provides the stage for high-contrast elements.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for structural sectioning. Boundaries must be defined through **Background Color Shifts**. 
- Use `surface_container_low` for secondary sections sitting on a `surface` background.
- Use `surface_container_highest` only for the most critical interactive focal points.

### The Glass & Gradient Rule
To achieve "visual soul," primary CTAs and hero headers should utilize a subtle linear gradient from `primary` to `primary_container` (Cyan-to-Cyan) or a cross-spectrum blend into `secondary` for high-end "Pro" features. Floating panels must use **Glassmorphism**: `surface_variant` at 60% opacity with a `20px` backdrop blur to allow underlying data "glows" to bleed through.

---

## 3. Typography: The Voice of Command

The typography strategy leverages the contrast between rigid, geometric headers and highly legible technical UI text.

- **Display & Headlines (Orbitron):** Used for "Success Rate," "Workforce," and main dashboard titles. Orbitron’s wide stance conveys institutional stability and futuristic military precision.
- **Body & UI Text (Rajdhani):** A condensed, technical sans-serif used for "Analytics" data and "Deployments" logs. Its verticality allows for high data density without sacrificing readability.

| Level | Token | Font | Size | Case |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Orbitron | 3.5rem | All Caps |
| **Headline** | `headline-md` | Orbitron | 1.75rem | All Caps |
| **Title** | `title-lg` | Rajdhani | 1.375rem | Sentence |
| **Body** | `body-md` | Rajdhani | 0.875rem | Sentence |
| **Label** | `label-sm` | Rajdhani | 0.6875rem | All Caps (Tracked +10%) |

---

## 4. Elevation & Depth: Tonal Layering

We eschew traditional drop shadows for **Ambient Glows** and **Tonal Stacking**.

- **The Layering Principle:** Depth is achieved by "stacking" container tiers. A `surface_container_lowest` card placed on a `surface_container_low` background creates a natural recession, making the content feel "embedded" rather than "pasted."
- **Atmospheric Shadows:** For floating command modals, use an extra-diffused shadow: `blur: 40px`, `spread: -5px`, `opacity: 8%`, using a tinted version of the `primary` color (Cyan) instead of black. This mimics a screen glow in a dark room.
- **The "Ghost Border":** When structural definition is required for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
- **Sharp Geometry:** All containers are restricted to a `DEFAULT` radius of `0.25rem` (4px) or a `max` of `lg` (`0.5rem` / 8px). Rounded "pills" are strictly for selection chips, never for structural panels.

---

## 5. Components

### Buttons: The Kinetic Action
- **Primary:** Solid `primary_container` (Cyan). Sharp corners (4px). Label in `on_primary_fixed` (Deep Navy).
- **Secondary:** Ghost style. `Ghost Border` (Cyan at 20%) with `primary` text. No background fill until hover.
- **States:** On hover, primary buttons should emit a subtle `primary` outer glow (4px blur).

### Cards: The Intelligence Unit
- **Visuals:** Use vertical white space (`spacing-10`) to separate internal content. Never use horizontal divider lines.
- **Header:** Title in Orbitron, subtitle/metadata in Rajdhani `label-sm`.
- **Background:** `surface_container_low` with a 60% blur glass effect.

### Input Fields: The Data Uplink
- **Style:** Underline only or "Bracket" style (L-shaped corners). 
- **Focus:** The bottom border transitions from `outline` to a vibrant `primary` (Cyan) with a subtle 2px glow.

### Additional Component: Tactical Status HUD
A specialized component for "Deployments." A vertical strip using `primary_fixed_dim` color with a blinking "Active" pulse to indicate live agent workforce status.

---

## 6. Do’s and Don'ts

### Do:
- **Use Intentional Asymmetry:** Align certain "Analytics" modules to a 10-column grid while others span 12, creating an editorial, non-templated look.
- **Embrace Darkness:** Ensure the `background` (#0a0a0a) remains the dominant presence to allow Cyan and Purple accents to pop with "Sovereign" authority.
- **Use Rajdhani for Numbers:** Its technical feel is perfect for "Success Rate" percentages.

### Don't:
- **No 100% Opaque Borders:** Never use a solid, bright line to separate sections. It breaks the atmospheric immersion.
- **No Large Radii:** Avoid `xl` (12px) or `full` rounded corners for cards. This is a "Sovereign Command Console," not a consumer social app.
- **No Standard Grey Shadows:** If a shadow doesn't have a hint of Cyan or Purple in its tint, do not use it.