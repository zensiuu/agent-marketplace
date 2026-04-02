# Design System Strategy: Tactical Intelligence Interface

## 1. Overview & Creative North Star
**The Creative North Star: "The Sovereign Command Console"**

This design system is not a consumer app; it is a high-precision instrument. It draws inspiration from aerospace telemetry, brutalist architecture, and advanced military command-and-control (C2) systems. We are moving beyond "standard UI" by embracing a **High-Contrast Tactical Editorial** aesthetic. 

The experience is defined by **intentional asymmetry**—where heavy data blocks are balanced against expansive, dark voids—and **technical precision**. We eschew soft, rounded "friendly" interfaces in favor of sharp geometry and layered glass surfaces that suggest a multi-dimensional heads-up display (HUD). The goal is to make the user feel like an operator in a high-stakes environment, where every pixel serves a functional, mission-critical purpose.

---

## 2. Colors & Tonal Architecture
The palette is rooted in deep obsidian tones, punctuated by high-energy luminous accents.

### Color Tokens (Material Mapping)
*   **Surface-Primary (`#0a0a0a`):** The foundation. Used for the base environment.
*   **Surface-Container-Low (`#111111`):** Used for recessed areas or secondary structural panels.
*   **Primary / Electric Cyan (`#00d4ff`):** Systematic focus, data visualization, and primary actions.
*   **Secondary / Neon Purple (`#8b5cf6`):** Specialized "Deploy" actions and high-tier intelligence status.
*   **Tertiary / Success Green (`#22c55e`):** System health, active status, and validation.
*   **On-Surface (`#ffffff`):** Critical data and headers.
*   **On-Surface-Variant (`#888888`):** Meta-data, timestamps, and non-essential telemetry.

### The "No-Line" Rule
Prohibit the use of 1px solid borders for sectioning global layouts. Boundaries must be defined by:
1.  **Background Shifts:** Transitioning from `surface-container-lowest` to `surface-container-low`.
2.  **Grid Scaffolding:** Using the underlying grid pattern to imply structure.
3.  **Optical Separation:** Large, intentional gaps using the `24 (5.5rem)` spacing token.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical glass plates. 
*   **Base:** `surface-dim` (#0a0a0a) with a subtle grid overlay.
*   **Floating Panels:** Use `surface-container-high` with `backdrop-blur-xl`.
*   **Active Elements:** Use a subtle `linear-gradient` (0% opacity to 10% opacity of the accent color) to give containers "soul."

---

## 3. Typography: The Technical Voice
Typography is our primary tool for establishing the "Stark/Military" tone.

| Role | Font Family | Case | Tracking | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display/Headline** | Orbitron | ALL CAPS | 0.15em | Authoritative, Stencil-tech feel. |
| **Title/Subhead** | Orbitron | ALL CAPS | 0.1em | Structural hierarchy. |
| **Body/Data** | Rajdhani | Mixed | Normal | High-legibility technical sans-serif. |
| **Labels/Monospaced**| Rajdhani | ALL CAPS | 0.05em | Telemetry, timestamps, small caps. |

**The Signature Glow:** Headline elements (`display-lg`) should utilize a subtle `text-shadow` using the `primary` cyan token at 15% opacity to simulate a CRT/HUD emission.

---

## 4. Elevation & Depth: Tonal Layering
In this system, depth is a function of light emission, not shadows.

*   **The Layering Principle:** Stack `surface-container` tiers. A `surface-container-highest` card sits on a `surface-container-low` section. 
*   **Ambient Shadows:** Traditional drop shadows are forbidden. If a "lift" is required, use a **Glow Shadow**: a wide-spread blur (20px+) using the `primary` or `secondary` color at a maximum of 5% opacity.
*   **The "Ghost Border":** Where containment is required for data density, use the `outline-variant` token (`rgba(255, 255, 255, 0.1)`) at `1px`.
*   **Glassmorphism:** All modal or floating elements must use `backdrop-blur-xl`. This ensures the underlying grid remains visible but diffused, maintaining the "Control System" immersion.

---

## 5. Components

### Buttons (Tactical Trigger Points)
*   **Primary Button:** `Orbitron`, All Caps. Background: `linear-gradient(to right, #00d4ff, #0099cc)`. Corner radius: `0px`.
*   **Secondary Button:** `Orbitron`, All Caps. Border: `1px solid #00d4ff`. Transparent background. Hover state: 10% fill of Cyan.
*   **Deploy Button:** `Orbitron`, All Caps. Background: `linear-gradient(to right, #8b5cf6, #6d28d9)`. Use for high-impact actions only.

### Feature Cards (Data Modules)
*   **Construction:** Glass card (`backdrop-blur-xl`) with `1px` Ghost Border. 
*   **Interaction:** On hover, the border opacity increases from 10% to 40%, and a subtle `primary` glow appears at the top edge.
*   **Separation:** Use vertical white space (`spacing-8` or `spacing-12`) instead of horizontal rules.

### Input Fields (Telemetry Entry)
*   **Style:** Underlined only or full `surface-container-lowest` fill. 
*   **Active State:** The bottom border transforms into a `primary` cyan glow. Label moves to a "Label-SM" size in Orbitron font.

### Status Indicators
*   **Pulse Dots:** All status indicators (Success/Error/Warning) must feature a CSS `pulse` animation.
*   **Telemetry Chips:** Small, rectangular containers with `0px` radius, displaying system-level data (e.g., "LATENCY: 24MS").

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the Grid:** Use the background grid as a strict alignment guide. Elements should feel "locked in."
*   **Use Intentional Asymmetry:** If a dashboard has three columns, make them `25% / 50% / 25%` to create a focal point.
*   **Strict Geometry:** Maintain a `0px` border radius for all primary containers. Only small interactive elements like chips may use the `8px` max radius.

### Don't:
*   **No Rounded Buttons:** Avoid "pill" shapes. They break the military-spec aesthetic.
*   **No Solid Dividers:** Never use `#ffffff` at 100% opacity for lines. It creates visual noise. Use background tonal shifts.
*   **No Standard Easing:** Use `cubic-bezier(0.19, 1, 0.22, 1)` (Expo-Out) for all transitions to give a "snappy," high-performance feel.

### Accessibility Note:
Ensure all technical data in `Rajdhani` maintains a minimum contrast ratio of 4.5:1 against the `surface` colors. Use `primary-fixed-dim` for text that requires high visibility against dark backgrounds.