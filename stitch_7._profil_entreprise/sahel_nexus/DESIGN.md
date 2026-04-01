# Design System Document

## 1. Overview & Creative North Star

### The Creative North Star: "The Professional Bridge"
This design system is built to facilitate high-stakes professional transitions within the Burkinabè job market. It rejects the generic "job board" aesthetic in favor of a **High-End Editorial** experience. We aim to balance the technical precision of platforms like Linear with the human-centric mission of professional growth in Burkina Faso.

The system moves beyond the standard grid through **Intentional Asymmetry** and **Tonal Depth**. By utilizing layered surfaces rather than rigid borders, we create an interface that feels like a curated workspace—sophisticated, calm, and authoritative.

---

## 2. Colors

Our palette is anchored in trust and clarity. We utilize deep oceanic blues and soft architectural grays to establish a workspace that feels premium and focused.

### Core Palette
- **Primary (`#00288E`)**: Our anchor. Used for primary actions and brand presence.
- **Secondary (`#0058BE`)**: Used for interactive highlights and secondary emphasis.
- **Surface (`#F7F9FB`)**: The base of our canvas. A cool, clean white that prevents eye fatigue.
- **On-Surface (`#191C1E`)**: High-contrast slate for maximum readability.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or layout containment. 
Boundaries must be defined solely through background color shifts. For example, a search section (`surface-container-low`) should sit on a background (`surface`) without a stroke. The contrast between the two tones is sufficient to define the edge.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. Use the following tiers to create depth:
1. **Surface (Base)**: The global background.
2. **Surface-Container-Low**: Secondary content areas or sidebar backgrounds.
3. **Surface-Container-Lowest**: Floating cards or modal content to create the "closest" layer to the user.

### The "Glass & Gradient" Rule
To elevate the experience above "template" layouts:
- **Glassmorphism:** Use semi-transparent `surface` colors with a 20px backdrop-blur for global headers and floating navigation.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#00288E) to `primary_container` (#1E40AF) on main CTAs. This creates a "gemstone" depth that flat hex codes cannot replicate.

---

## 3. Typography

The typography system uses **Inter** to convey a sense of modern engineering and reliability.

| Token | Size | Weight | Use Case |
| :--- | :--- | :--- | :--- |
| **Display-LG** | 3.5rem | 700 (Bold) | Hero headlines with high impact. |
| **Headline-SM** | 1.5rem | 600 (Semi-Bold) | Section headers. |
| **Title-MD** | 1.125rem | 500 (Medium) | Card titles and prominent labels. |
| **Body-LG** | 1rem | 400 (Regular) | Primary reading text, job descriptions. |
| **Label-MD** | 0.75rem | 600 (Semi-Bold) | Metadata, chips, and small caps navigation. |

**Editorial Contrast:** Create visual interest by pairing large `Display-LG` headlines with significantly smaller, wide-spaced `Label-MD` metadata. This "Big & Small" approach mimics premium magazine layouts.

---

## 4. Elevation & Depth

We achieve hierarchy through **Tonal Layering** rather than traditional structural lines.

### The Layering Principle
Stacking surface-container tiers creates natural lift. Place a `surface-container-lowest` card on a `surface-container-low` section. The change in tone provides the "edge" without the visual noise of a border.

### Ambient Shadows
Shadows are never "black." Use the `on-surface` color at 4%–8% opacity with a large blur radius (32px–64px) and a Y-offset of 8px. This mimics a soft, overhead office light, making cards appear to hover gently.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in high-contrast modes), use the `outline_variant` token at **10% opacity**. 100% opaque borders are strictly forbidden.

### Glassmorphism Depth
For the "StageLink Burkina" header, use:
- **Background:** `rgba(255, 255, 255, 0.7)`
- **Backdrop-Blur:** `16px`
- **Edge:** A top-only "Ghost Border" to define the top of the viewport.

---

## 5. Components

### Buttons
- **Primary:** `primary` background, `on-primary` text. `2xl` (1.5rem) corner radius. Hover state: subtle shift to `secondary`.
- **Secondary:** `surface-container-highest` background. No border.
- **Tertiary:** Text-only in `primary` weight 600. No background until hover (then use `surface-variant` at 50% opacity).

### Cards & Lists
**Strict Rule:** No divider lines between list items.
- Separate items using vertical white space (use `Spacing-6` or `Spacing-8`).
- For job lists, use a background color shift on hover (`surface-container-low`) to indicate interactivity.

### Input Fields
- **Container:** `surface-container-lowest` with a `2xl` corner radius.
- **State:** On focus, use a `2px` outer glow (Shadow) in `primary` at 20% opacity. Do not change the border color to a heavy solid.

### Additional Components: The "Burkina Localizer"
- **Stage Progress Chips:** Use `secondary_fixed` for "In Progress" applications.
- **Trust Badges:** Small, glass-morphic icons for "Verified Company" status.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts (e.g., a left-aligned headline with a right-shifted search bar).
- **Do** use the `2xl` (1.5rem) roundedness scale for all large components to maintain a soft, approachable professional feel.
- **Do** leave generous "breathing room" (use `Spacing-16` or `20` between major sections).

### Don't
- **Don't use Green.** Even for success states, use the `secondary` blue or a "Check" icon to denote success.
- **Don't** use standard 1px borders. If you feel you need one, try a background color change first.
- **Don't** use pure black shadows. Always tint shadows with the `on-surface` color.
- **Don't** crowd the interface. If a screen feels busy, increase the spacing tokens rather than adding dividers.