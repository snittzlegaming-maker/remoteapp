# remoteapp
app for applying to jobs like tinder
# Handoff: Remote Job Swipe App — "Calm & Minimal" (1b)

## Overview
A mobile app that helps people apply to remote jobs daily. It aggregates listings from job boards (LinkedIn, Indeed, Wellfound, Greenhouse), lets the user swipe through curated matches (Tinder-style), and — on a right swipe/like — sends the job to an AI assistant that tailors the user's resume and cover letter for that specific posting, staged and ready for the user to review and submit later.

This package covers the **"Calm & Minimal"** direction (option 1b) the user selected: cool, quiet, professional — indigo accent on off-white, Inter typeface throughout, generous whitespace, thin hairline dividers instead of heavy cards/shadows.

## About the Design Files
The files in this bundle (`Remote Job Swipe App.dc.html`, `ios-frame.jsx`) are **design references built in HTML/React for prototyping only** — they show intended look, layout, and copy. They are not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React Native, SwiftUI, Kotlin/Compose, etc.) using its established patterns, navigation, and component library — or, if no mobile codebase exists yet, choose the most appropriate framework (React Native is a reasonable default for iOS+Android) and implement fresh.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy below are final for this direction. Recreate pixel-close using the target platform's native equivalents (e.g. SF Symbols/UIKit spring animations on iOS, Material motion on Android) rather than literally embedding HTML.

## Screens / Views

### 1. Onboarding — "Set your job radar"
**Purpose:** User defines what jobs to be shown and how sourcing/notifications work, before entering the swipe feed.

**Layout:** Single scrolling column, safe-area padding 24px sides, status bar clearance ~64px top. Content in this order, each with 8–28px vertical gaps:
1. Title: "Set your job radar" — 26px / 700 weight / color `oklch(0.2 0.01 240)` (near-black, cool)
2. Subtitle: "We scan every board and notify you the moment a match lands." — 14px / 400 / `oklch(0.5 0.01 240)`, line-height 1.5
3. Section label "LOOKING FOR" — 11px / 600 / uppercase / letter-spacing 0.08em / `oklch(0.55 0.01 240)`
4. Role chip row: filled chip "Product Designer" (bg `oklch(0.94 0.01 240)`, text `oklch(0.25 0.01 240)`, 14px/500, 8px radius, 8×14px padding) + outline "+ Add role" chip (1px border `oklch(0.88 0.01 240)`)
5. Section label "SOURCES", then a list of 4 rows, each 13px vertical padding, 1px bottom hairline `oklch(0.93 0.005 240)`: row = label (15px/500/`oklch(0.25 0.01 240)`) left, toggle switch right (40×24px pill, on = filled `oklch(0.52 0.14 265)` indigo w/ white 20px knob, off = `oklch(0.9 0.005 240)` track). Rows: LinkedIn (on), Indeed (on), Wellfound (off), Greenhouse boards (on).
6. "Minimum salary" row: label left (15px/500), value right "$120k+" (15px/700/indigo `oklch(0.52 0.14 265)`)
7. Slider track: 3px height, `oklch(0.9 0.005 240)` background, filled portion 55% width in indigo, round white knob (14px, 2px indigo border) centered on the fill edge
8. Two more toggle rows (no divider needed after last): "Remote only" (on), "Notify instantly" (on) — same toggle style as sources
9. Primary CTA button, full width: "Start swiping" — solid indigo `oklch(0.52 0.14 265)` fill, white text, 15px/600, 15px vertical padding, 12px corner radius

### 2. Swipe Feed — "Today's matches"
**Purpose:** Daily card stack of job matches; swipe/tap to pass or like each one.

**Layout:** Header row: "Today's matches" (20px/700/`oklch(0.2 0.01 240)`) left, "6 left" counter (13px/500/`oklch(0.5 0.01 240)`) right.

Card stack area (~560px tall): one faint card outline peeking behind (12px inset, 1px border, no fill emphasis) for depth, then the active card on top:
- White card, 1px border `oklch(0.9 0.005 240)`, 20px radius, soft shadow `0 12px 30px rgba(20,20,40,0.06)`, 22px padding
- Top row: company mark (48×48px, 10px radius, bg `oklch(0.94 0.01 240)`, initials "NH" 16px/700/`oklch(0.3 0.01 240)`) left; match badge right — outline pill, 1px border `oklch(0.75 0.06 165)` sage-green, text `oklch(0.4 0.08 165)`, "94% match" 13px/600
- Job title "Senior Product Designer" — 21px/700/`oklch(0.2 0.01 240)`
- Company · location "Northwind Health · Remote, US" — 14px/`oklch(0.5 0.01 240)`
- Salary "$130k – $165k" — 17px/600/`oklch(0.25 0.01 240)`
- Meta row (no chips, plain text, 16px gaps): "Full-time" · "Remote" · "Series C" — 12px/`oklch(0.5 0.01 240)`
- Description area: placeholder block filling remaining card height, 10px radius (real content: full job description, scrollable)
- Footer text "Posted 2h ago" — 12px/`oklch(0.6 0.01 240)`

Action row below the card, centered, 24px gap:
- Pass button: 54px circle, white fill, 1px border `oklch(0.9 0.005 240)`, gray "X" icon (18px, `oklch(0.5 0.01 240)`, 2px stroke)
- Like button: 54px circle, solid indigo `oklch(0.52 0.14 265)` fill, white heart icon

### 3. Application Tracker — "Applications"
**Purpose:** Shows every job the user has liked, with its AI-tailoring/apply status, plus weekly progress and streak.

**Layout:** Header row: "Applications" (24px/700) left, streak "5-day streak" (13px/600/indigo) right. Subtext line: "12 tailored this week · 4 ready · 1 applied" (13px/`oklch(0.5 0.01 240)`).

List of job rows (no card backgrounds — flat list with 1px bottom hairlines, 16px vertical padding, 14px gap between avatar/text/status):
- Avatar: 44×44px, 12px radius, neutral bg `oklch(0.92 0.01 240)`, initials 14px/700/`oklch(0.3 0.01 240)`
- Title (15px/600/`oklch(0.2 0.01 240)`, truncates) + company (13px/`oklch(0.5 0.01 240)`) stacked
- Status label, right-aligned, 12px/600, no background/pill (text-only in this direction): "Tailoring…" (amber `oklch(0.6 0.1 80)`), "Ready to apply" (sage `oklch(0.45 0.1 165)`), "Applied" (neutral `oklch(0.55 0.01 240)`), "Queued" (neutral `oklch(0.55 0.01 240)`)

Rows shown (top to bottom): Fielding Analytics / Staff Data Engineer — Tailoring…; Loopline / Growth Marketing Lead — Ready to apply; Basecamp Robotics / UX Researcher — Applied; Northwind Health / Senior Product Designer — Queued.

## Interactions & Behavior
- **Swipe feed:** drag card left → pass/reject (card exits left, next card in stack advances); drag right (or tap heart) → like (card exits right). On like: job is queued, an "AI tailoring" job kicks off in the background (resume + cover letter rewritten against the specific posting using the user's stored resume/cover-letter base and skills profile), and the app pushes a notification when tailoring completes ("Ready to apply" state in the tracker).
- **Ready to apply → Apply:** tapping a "Ready to apply" row opens a review screen (tailored resume + cover letter diff/preview) with an "Apply on [source]" action that deep-links out to the original posting (LinkedIn/Indeed/etc.) for the user to submit manually — the app does not auto-submit applications.
- **Notifications:** instant push when a new job matching saved filters appears from any connected source (respects the "Notify instantly" onboarding toggle).
- **Toggles/sliders:** standard native switch and slider components; state persists to user preferences immediately on change.
- **Streak:** increments once per calendar day the user reviews at least one new match; resets on a missed day.
- Transitions: card swipe exit ~250ms ease-out with slight rotation; screen-to-screen navigation should use the platform's standard push/modal transitions (no custom easing specified beyond the swipe gesture itself).

## State Management
- User profile: role(s) of interest, connected sources (LinkedIn/Indeed/Wellfound/Greenhouse + auth tokens), salary floor, remote-only flag, notify-instantly flag, base resume + cover letter + skills data for tailoring.
- Job feed: queue of unseen matches (fetched/merged from connected source APIs, deduplicated, ranked into a "match %"), current card index.
- Application records: per job — status enum (`queued` → `tailoring` → `ready` → `applied`), tailored resume doc, tailored cover letter doc, source URL, timestamps.
- Streak counter + weekly tailored/ready/applied counts (derived from application records, filtered to current week).

## Design Tokens

**Colors**
- Background: `oklch(0.985 0.004 240)` (near-white, cool)
- Primary text: `oklch(0.2 0.01 240)`
- Secondary text: `oklch(0.5 0.01 240)`
- Tertiary/hairline text: `oklch(0.55–0.6 0.01 240)`
- Accent (indigo): `oklch(0.52 0.14 265)`
- Success/ready (sage): `oklch(0.45 0.1 165)` text / `oklch(0.75 0.06 165)` border
- Warning/tailoring (amber): `oklch(0.6 0.1 80)`
- Neutral fill (chips/avatars): `oklch(0.94 0.01 240)` / `oklch(0.92 0.01 240)`
- Hairline border: `oklch(0.93 0.005 240)`

**Typography**
- Font: Inter (400/500/600/700)
- Scale used: 11px (eyebrow labels, uppercase, 0.08em tracking), 12–13px (meta/status), 14–15px (body/rows), 17px (salary), 20–21px (section/card titles), 24–26px (screen titles)

**Spacing / radius**
- Screen side padding: 24px
- Row vertical padding: 13–16px
- Card radius: 20px; chip/button radius: 8–12px; toggle pill: fully round; avatar radius: 10–12px

**Shadows**
- Card: `0 12px 30px rgba(20,20,40,0.06)` (very soft, low-opacity — keep shadows subtle in this direction)

## Assets
- Company marks/avatars are placeholder initials-on-tint blocks — replace with real company logos (fetched from source APIs or a logo service) at build time.
- No custom icons beyond simple line X and filled heart (see SVG paths in the HTML file) — recreate as native vector icons.
- No photography/imagery used in this direction.

## Files
- `Remote Job Swipe App.dc.html` — full prototype source (contains both explored directions; **this handoff is scoped to the "1b" / Calm & Minimal option** — ignore the "1a" bold/coral option in the same file).
- `ios-frame.jsx` — iPhone bezel/status-bar chrome used only for prototype presentation; not part of the app design itself.

