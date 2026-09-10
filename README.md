# YECEF Global — website

Multi-page site for Youths Emerge for Christ Empowerment Foundation.
React + Vite, plain CSS (no Tailwind), no build-time dependency on anything
but Node.

---

## Open it right now, no install

```bash
npx serve dist
```

Then open the URL it prints. `dist/` is the built site; it needs to be served
rather than double-clicked, because the site uses clean URLs (`/about`, not
`/#/about`) and absolute asset paths.

## Edit it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # rebuilds dist/
```

## Deploy it

**Netlify (fastest):** drag the **`dist`** folder onto
[app.netlify.com/drop](https://app.netlify.com/drop). Live in about
20 seconds, no account required to test.

**From git:** build command `npm run build`, publish directory `dist`.
`netlify.toml` is already set up.

---

## The one file you'll actually edit

**`src/data/site.js`** holds every fact the site states — org details, event
details, the 13 axes, ministers, past editions, giving. Change it there and it
updates on every page. Nothing is hardcoded into the components.

Anything marked `TODO` in that file is something I could not verify. The site
handles each one honestly rather than inventing a value:

| What's missing | What the site does instead | Where |
|---|---|---|
| **Facebook / YouTube URLs** | **Those footer links don't render at all** | `org.facebook`, `org.youtube` |
| **Hero background image** | Hero falls back to the ember gradient | `event.heroImage` |
| **Event flyer** | The flyer band doesn't render | `event.flyer` |
| Bus departure times | "Time to be confirmed — ask your coordinator" | `axes[].departs` |
| Pickup landmarks | "Your coordinator will send the exact spot" | `axes[].landmark` |
| JAMB / widows numbers | "Ongoing" instead of a count | `programmes[].stat` |
| Coach hire cost | Give page shows a note instead of fake amounts | `giving.coachCostNaira` |
| Paystack page | Give button stays inert until you add the URL | `giving.paystackUrl` |
| 2024 theme / venue | "To be added" | `editions[2]` |
| Contact email | Contact routes to Instagram DM | `org.email` |
| CAC number | Footer shows a tagline instead | `org.cacNumber` |
| Volunteer form | Serve page routes to Instagram DM | `pages/Serve.jsx` |

### Registration goes to Luma

Every "Reserve your seat" button points at the Luma event — one source of
truth, as the team asked. The coordinator headcount form stays a Google Form,
because that's a different audience doing a different job.

⚠️ **One thing to fix on Luma.** The old Google Form asked which pickup axis a
person was coming from, and that answer is what tells each coordinator how many
coaches to hire. Luma doesn't ask it by default. Add a required registration
question — *"Which pickup point will you use?"* with the 13 axes as options —
or the axis headcounts stop arriving.

### The homepage changes itself after the event

`eventIsPast()` in `site.js` compares now against `event.endsAt`. Until Fresh
Fire ends, the homepage leads with the countdown, the bus promise and the bus
finder. From Sunday it leads with the foundation and its three programmes, and
the event content stays on `/fresh-fire`. No edit needed on the day.

To test what the post-event homepage looks like, temporarily set
`event.endsAt` to a past date.

### Hero and flyer images

- `event.heroImage` — **landscape**, 1920×1080 or wider. Sits behind the
  homepage and event heroes under a two-layer scrim, so the headline stays
  readable over a busy image. The landscape flyer works well here.
- `event.flyer` — the **portrait** flyer. Renders as an image block on
  `/fresh-fire` with a "send this to someone" panel and a download button.

Compress both before adding (squoosh.app). The hero especially — it's the
first thing that loads on a metered connection.

**Fill in the departure times first.** It's the single most useful thing on
the site and the only reason most visitors will open it this week.

---

## Photos

Drop them in **`public/images/`** and reference them in `src/data/site.js`:

```js
{ year: 2025, theme: 'Holy Spirit My Ally', photo: '/images/2025-hall.jpg', ... }
```

Any edition with no photo renders a typographic plate — the page never shows a
broken image.

Still to add: a real photo from 2024 or 2025 to replace the archive
placeholders. Phone footage of a full hall beats any stock image, and stock
worship photography would undercut the whole positioning.

Compress before uploading (squoosh.app, ~200KB each). Most of your visitors
are on metered mobile data.

---

## Brand assets

All cut from the logo you supplied and already wired into the site.

| File | What it is | Used by |
|---|---|---|
| `yecef-logo-dark.png` | Full lockup, **cream** wordmark, transparent | dark theme — footer, About hero |
| `yecef-logo-light.png` | Full lockup, **charcoal** wordmark, transparent | light theme — same places |
| `yecef-mark.png` | The flame alone, transparent | nav (the lockup can't be read at 30px) |
| `favicon-32/180/512.png` | The mark, squared | browser tab, iOS home screen |
| `og-fresh-fire.jpg` | 1200×630 share card | WhatsApp / social link previews |

Both lockup variants ship on every page; CSS shows whichever matches the
viewer's theme, using the same three-state pattern as the colour tokens
(`.logo--dark` / `.logo--light` in `components.css`).

**Replace the OG card once you have a photo** — a real shot of a full hall
will out-pull a typographic card every time. Keep it 1200×630.

The palette in `tokens.css` is sampled straight off the logo, so nothing
clashes with it:

| Token | Value | Where it comes from |
|---|---|---|
| `--ember` | `#F6372B` | the mark's red tail |
| `--ember-mid` | `#FD6421` | mid-gradient |
| `--amber` | `#FFA805` | the flame tip |
| `--charcoal` | `#3E4550` | the wordmark grey |

`--ember-fill` (`#D93A20`) is a touch deeper than `--ember` and is used only
for button backgrounds, so white button text clears 4.5:1 contrast. Both read
as the same brand red.

## How it's built

```
index.html              meta tags, fonts, Event schema for Google
src/
  data/site.js          ← every fact lives here
  styles/
    tokens.css          ← the design system. Colours, type, spacing.
    base.css            reset, typography, layout primitives
    components.css      nav, hero, finder, cards, footer
  components/
    Nav.jsx             sticky nav + theme toggle + mobile menu
    Footer.jsx
    Countdown.jsx       auto-demotes itself after the event
    AxisFinder.jsx      the search — searches names and keywords
    StickyCta.jsx       mobile-only bottom bar
  pages/                Home, FreshFire, About, Editions, Give, Serve, 404
```

### Design system

Set in `src/styles/tokens.css`. Change a value there, it changes everywhere.

- **Palette** — a flame's hottest point is blue. Ember `#E24A1E` and amber
  `#F2A03D` carry emotion; the blue core `#6D86E0` carries structure (links,
  data, secondary buttons). Neutrals are warm-biased, never neutral grey.
- **Type** — Archivo (display/UI), Source Serif 4 (reading), IBM Plex Mono
  (labels and numbers). Three roles, no drift.
- **Radius** — 2px on containers, 999px on pills. Nothing in between. The
  uniform `rounded-lg` look is what makes a build read as generated.
- **Accent discipline** — ember appears at most twice per viewport. If two
  things are ember, neither is urgent.
- **Themes** — dark by default, follows the OS, and the toggle overrides in
  both directions. Every colour comes from a token, so nothing breaks in
  either theme.

### Routing

`BrowserRouter`, so URLs are clean (`/about`, `/give`). The SPA redirect in
`netlify.toml` sends every path back to `index.html` so a direct link or a
refresh on `/give` works. `src/main.jsx` falls back to hash routing if the
file is ever opened straight off disk with `file://`.

---

## Before Saturday

1. Departure times and pickup landmarks for all 13 axes → `src/data/site.js`
2. `og-fresh-fire.jpg` at 1200×630 → `public/images/`
3. Deploy `dist/` to Netlify, get the URL
4. Point the QR codes at the new URL, not the Google Form directly — then the
   form link can change without reprinting anything
5. Put the URL in the Instagram bio and the Luma listing

## After Saturday

The countdown demotes itself automatically. Then:

1. Add the 2026 photos and headcount to `editions[0]`
2. Publish what the coaches actually cost on `/give`
3. Set `editions[0].upcoming = false` and add a 2027 entry when the date is set
