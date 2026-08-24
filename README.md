# Thorcast.AI — Landing Page

Static landing page for Thorcast.AI. No build step, no dependencies, no framework —
three files and two images.

Implemented from the Claude Design handoff `Thorcast Landing - Nuevo.dc.html`
(project *Mejorar interfaz de página*), which was designed at a fixed 1440px width.
This version keeps that desktop layout pixel-for-pixel and adds tablet and mobile
breakpoints.

## Run it

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Any static server works. Opening `index.html` directly over `file://` also works.

## Files

| File | What's in it |
| --- | --- |
| `index.html` | All page content. Every section is plain semantic HTML. |
| `styles.css` | Design tokens, layout, animations, responsive rules. Section-numbered. |
| `main.js` | Two behaviours only: the use-case tablist and the mobile nav drawer. |
| `assets/logo.jpg` | Thorcast wordmark. Black-background JPEG, composited with `mix-blend-mode: screen`. |
| `assets/mjo.jpg` | MJÖ™ orb. Used as the avatar, the section orb and the favicon. |

Both images came from the design bundle as `.png` but are actually JPEG data —
renamed to match their real format.

## Design tokens

Everything visual routes through custom properties at the top of `styles.css`:

```
--bg #0A0A0B   --surface #0F0F12   --card #18181B   --border #27272A
--text #F4F4F5 --muted #A1A1AA     --accent #00B0F0 --accent-deep #00749E
--green #91CC52
```

Type is **Geist** (UI) + **JetBrains Mono** (labels, numerals, tickers), loaded
from Google Fonts.

### Fluid scaling

Display type and section rhythm use `clamp()` calibrated so the values resolve to
the *exact* design numbers at 1440px and above:

```css
--fs-h1: clamp(38px, 4.9vw, 70px);   /* 70px at 1440 */
--fs-h2: clamp(30px, 3.65vw, 52px);  /* 52px at 1440 */
--pad:   clamp(20px, 3.9vw, 56px);   /* 56px at 1440 */
```

## Breakpoints

| Width | Change |
| --- | --- |
| ≤ 1200px | Hero stacks — console drops below the copy |
| ≤ 1080px | MJÖ section stacks |
| ≤ 980px | Nav collapses into a hamburger drawer |
| ≤ 900px | Platform cards → 1 col, use-case metrics → row, how-it-works → 2 col, blog → 2 col |
| ≤ 760px | Console rail hidden, stats → 2 col, footer stacks, nav CTA hidden |
| ≤ 620px | Everything single-column, language switcher hidden, full-width CTAs |
| ≤ 420px | Tighter padding, narrower chart bars |

## Animations

All CSS, all in section 13 of `styles.css`. Nothing is scroll- or JS-driven.

- `scan` — light sweep down the hero console (6s)
- `reveal` — hero pipeline steps fading in on an 8s loop, staggered 1.4s apart
- `fill` / `sweep` — the console rail and the how-it-works progress rule
- `step` — model-training and cutoff-chart bars breathing
- `pulse` — step status dots
- `glow` — hero and CTA radial glows
- `ticker` — the capability marquee (34s)
- `blink` — terminal carets

`prefers-reduced-motion: reduce` disables all of them and pins every animated
element to its resting, fully visible state.

## Accessibility

- Skip link, landmark elements, one `h1`
- Use-case tabs follow the WAI-ARIA tabs pattern with roving tabindex and arrow-key
  navigation; all four panels are in the DOM, so the page works without JavaScript
  (the first panel is simply the visible one)
- Decorative images have empty `alt`; animated chrome is `aria-hidden`
- Visible `:focus-visible` rings throughout

## Known gaps / next steps

These are deliberate — they weren't part of the design that was handed off:

1. **CTAs are `mailto:` links.** The prototype's buttons were inert. Every "Book a
   demo" / "Talk to sales" / "See it run on your data" now opens a pre-filled mail
   to `info@thorcast.ai`. Swap for a real contact modal or form when one exists —
   the design chat lists that modal as the next step.
2. **EN / ES / PT switcher is visual only.** ES and PT are marked
   `aria-disabled` with a "Coming soon" tooltip. No translations exist yet.
3. **Blog cards link to `#blog`.** Point them at real posts when they're published.
4. **Privacy link is a placeholder.**
5. One prototype bug was corrected: the console scan line used
   `translateY(2600%)` on a 2px element, which moved it only ~52px. It now sweeps
   the full height of the console, which is clearly what the animation intended.

## Deploying

Nothing to build — publish the directory as-is.

- **GitHub Pages** — Settings → Pages → deploy from `main` / root. (Private repos
  need GitHub Pro for Pages.)
- **Netlify / Vercel / Cloudflare Pages** — point at the repo, leave the build
  command empty, publish directory `.`.
