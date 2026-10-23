# Company Design System

**Owner:** Miguel Morales · **As of:** 2026-10-20 · **Status:** working draft (v1)

> One visual language across **Clover**, **Kinmap**, and **Afoot** — enough shared DNA that they read as a family, enough freedom that each keeps its own personality. This is the parent-brand design doc referenced by the [Company Roadmap & Launch Plan](./Company-Roadmap-and-Launch-Plan.md).

---

## 1. Brand idea

The company builds **AI-assisted tools for real life** — your neighborhood (Clover), your family (Kinmap), and your local scene (Afoot). The shared feeling across all three: **warm, human, trustworthy, and quietly delightful** — technology that helps real people connect, never cold or extractive.

**Parent brand:** SomeDude (working name; verify name, domain, and trademark availability before public launch). Keep the company identity understated while the apps lead. A truthful founder note can say this is an independent, solo-built studio creating sustainable products to support its founder's family; sharing personal family details is optional and should remain within the founder's comfort.

**Design principles (apply to all three apps):**
1. **Human warmth over slick.** Rounded, friendly, hand-made touches beat sterile minimalism.
2. **Clarity first.** A person glances before they read; lead with the thing they need.
3. **Delight in the details.** Small animations, characters, and textures — never at the cost of speed or legibility.
4. **Trust by design.** Privacy-respecting defaults, honest states, no dark patterns.
5. **Accessible by default.** Works at phone width, in dark mode, with reduced motion, at AA contrast.

---

## 2. Brand architecture

- **Parent brand is quiet.** Each app keeps its own name, logo, and mood. The company is the calm parent (think "a Nest product" / "a Linear product"), surfaced mainly in the shared account, the footer, and the landing site.
- **Family resemblance comes from the *system*, not a single color.** Shared type, spacing, radius, motion, iconography, and component anatomy make them siblings; each app's **accent palette and illustration mood** make them distinct.

| | Clover | Kinmap | Afoot |
|---|---|---|---|
| **Mood** | Cozy, playful, Animal-Crossing | Warm, heritage, intimate | Dark, modern, nightlife energy |
| **Default theme** | Light, nature | Light, archival warmth | Dark, neon-accented |
| **Accent** | Coral + teal + leaf green | Deep amber / sepia + sage | Electric magenta/cyan on near-black |
| **Illustration** | Cute characters + themed scenes | Soft portrait frames, tree lines | Photographic, map-forward |

---

## 3. Color

Architecture: **a shared neutral spine** + **one accent family per app**. Define everything as CSS custom properties (tokens) on `:root`, redefine for dark mode, so theming is swappable.

**Shared neutrals (both modes):** surface, surface-2, surface-3, line, ink, muted. Keep these consistent across apps so layout chrome feels related.

**Per-app accent tokens** (each app sets its own, same variable *names*):
- `--accent` / `--accent-ink` — primary action color + its readable on-text.
- `--brand-2` — a secondary (Clover's teal, Kinmap's sage, Afoot's cyan).
- `--good` / `--warn` / `--bad` — semantic states, shared hues, app-tuned.

**Clover** already implements this cleanly (coral `--accent:#f08a63`, teal `--teal:#2ca397`, leaf, with full dark-mode token overrides). **Use Clover's token file as the reference implementation**; Kinmap and Afoot adopt the same variable names with their own values.

**Rules:**
- Define tokens on `:root`; redefine under `@media (prefers-color-scheme: dark)` (guarded) and `:root[data-theme="dark"]`. Always set an explicit `body` background.
- Meet **WCAG AA** contrast (4.5:1 body text, 3:1 large text/icons). Verify accent-on-surface both modes.
- Never encode meaning in color alone (pair with label/icon) — e.g., Clover's trust rings also carry text.

---

## 4. Typography

**Pairing (shared):**
- **Display / headings:** a rounded, friendly geometric — **Baloo 2** (already Clover's `--font-display`). Warm, legible, on-brand for "human."
- **Body / UI:** a clean neutral sans — system UI stack or Inter. Keep body calm so display carries the personality.
- Afoot may use a slightly tighter, more "night" display weight, but the **same families** keep the family resemblance.

**Scale (rem-based, shared):** 12 / 13 / 15 (body) / 17 / 20 / 23 / 28. Line-height ~1.15 for display, ~1.45 for body. Sentences < 25 words; paragraphs ≤ 3 sentences.

---

## 5. Space, shape, elevation

- **Spacing scale:** 4 · 8 · 12 · 14 · 16 · 22 · 32 (px). 16px side gutter at phone width; never horizontal page scroll.
- **Radius:** small 12, medium 14–16, large 20–26, pill 999. (Clover's `--r-*`.) Rounded = friendly; keep it consistent.
- **Elevation:** one soft shadow token (`--shadow-soft`) for cards, one stronger for sheets/modals. Prefer soft, diffuse shadows over hard lines.
- **Touch targets:** ≥ 44×44px. Bottom-sheet pattern for actions on mobile (Clover's `SheetHost` is the reference).

---

## 6. Motion

- **Purposeful and quick:** 150–220ms for UI transitions; ease-out for enters.
- **Delight, sparingly:** Clover's holographic card foil/glare and wandering villagers are the brand's "signature joy" — reserve showy motion for moments that reward, not everyday chrome.
- **Always honor `prefers-reduced-motion`** — disable ambient/looping animation (Clover's cards already do this).

---

## 7. Iconography & illustration

- **Icons:** one set, rounded, 2px stroke feel. Consistent metaphors across apps.
- **Emoji as accent, not crutch** — fine for warmth (Clover uses them well); never the only signal.
- **Illustration is where apps diverge the most — and that's good:**
  - **Clover:** the **character system** (cute humans + animals, themed scenes, trading cards) is a genuine brand asset. It could even become a parent-brand mascot language.
  - **Kinmap:** soft portrait frames, gentle tree/line work, archival paper textures — heritage warmth.
  - **Afoot:** map-forward, photographic venue imagery, neon accents on dark.
- Keep a **shared "cute-but-credible" line quality** so even different illustration styles feel related.

---

## 8. Shared component library (build once)

Namespace a `@company/ui` package (see roadmap §4.4) with the primitives every app repeats:

- **Buttons** (primary / ghost / secondary), **inputs / fields / selects / textareas**, **chips/toggles** (shared `[aria-pressed]` pattern), **sliders**.
- **Cards** (content card anatomy: media, title, meta, actions).
- **Bottom sheet / modal** (Clover's `SheetHost`), **toasts/notifications**, **empty states**, **avatars** (+ Clover's trust-ring variants).
- **Auth screens** (one shared sign-in used by all three).
- **Map + "near me"** component (shared geo primitive).

Each app themes these via tokens; behavior and a11y are shared.

---

## 9. Accessibility (non-negotiable, all apps)

- AA contrast both modes; visible focus rings; full keyboard operability.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Minimum 44px targets; readable at 320px width; scalable text.
- Meaning never by color alone; alt text on meaningful imagery.

---

## 10. How each app applies this (and what to change)

- **Clover** — *already the reference.* Keep its token file, Baloo 2, sheet pattern, character system. Action: promote its tokens/components into the shared `@company/ui` so the others inherit them.
- **Kinmap** — adopt the shared tokens (rename its ad-hoc styles to the `--accent`/`--brand-2` system), the Baloo 2 + body pairing, the shared sheet/field/button components, and the shared auth screen. Keep its heritage illustration mood.
- **Afoot** — it's Tailwind + dark; map Tailwind theme values to the **same token names** (so a shared sign-in and shared cards match), keep its dark/neon personality, and adopt the shared auth + avatar + map components.

> A short **`DESIGN.md`** has been added to each app's folder pointing back to this document with app-specific notes. Clover's own (Claude) design doc now references this company system as the source of truth for shared tokens.

---

## 11. Open decisions

- **Company name + logo/wordmark** (see roadmap §9) — drives the parent-brand mark and the shared favicon/app-icon language.
- **Body font:** system stack (free, fast) vs. Inter (more control). Recommend system stack to start.
- **Mascot language:** whether Clover's character system becomes a parent-brand asset or stays Clover-only.
- **One or two shared themes** (light + dark) company-wide, with per-app accent overrides.
