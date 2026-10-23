---
name: Blokk
description: A calm Mac document app around a sacred A4 CV page.
colors:
  ink: "#1d1d1f"
  ink-2: "#3a3a3c"
  muted: "#6e6e73"
  faint: "#8e8e93"
  bar: "#f6f6f8"
  side: "#f2f2f4"
  panel: "#fbfbfc"
  field: "#ffffff"
  canvas: "#eceef1"
  grid: "#e0e3e7"
  grid-major: "#d6dae0"
  accent: "#007aff"
  accent-fill: "#0068d6"
  accent-hover: "#005bbf"
  ok: "#28a745"
  warn: "#e8890c"
  danger: "#d93025"
  warn-text: "#9a5a00"
  grip: "#b4b4ba"
  scrollbar: "rgba(0,0,0,.2)"
typography:
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 650
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  control:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "12.5px"
    fontWeight: 500
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "11.5px"
    fontWeight: 600
  brand:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 650
  meta:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "11px"
    fontWeight: 400
rounded:
  page: "2px"
  checkbox: "4px"
  control: "6px"
  button: "7px"
  menu: "12px"
  drag: "9px"
  scrollbar: "8px"
  switch: "16px"
  capsule: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  canvas: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent-fill}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    height: "28px"
    padding: "0 12px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-toolbar:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.button}"
    height: "28px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "6px 9px"
  library-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "6px 8px 6px 10px"
  library-row-editing:
    backgroundColor: "rgba(0,122,255,.12)"
    textColor: "{colors.accent-fill}"
---

# Design System: Blokk

## Overview

Blokk is a standard Mac document app played straight: a unified toolbar on top, a solid sidebar library on the left, an inspector on the right, and the A4 CV page in the middle on a faint squared-grid canvas. The CV page is never styled by the app; the chrome frames it and stays quiet so the page is always the brightest, most important object.

Liquid Glass is reserved for layers that float over the canvas: the version-tab capsule, the fit status bar, the More menu, toasts, the remove-from-CV zone, and the drag preview. Fixed structure (toolbar, sidebar, inspector) is solid.

## Colors

### Primary
- **System Blue** `#007aff` (`accent`): the only accent. Selection, the edited block's outline, toggles, checkboxes, focus rings.
- **Blue Fill** `#0068d6` (`accent-fill`): any blue surface carrying white text (Export PDF, menu highlight, Add hover), for 4.5:1 contrast.

### Neutral
- `bar` toolbar, `side` sidebar, `panel` inspector, `field` inputs, `canvas` + `grid`/`grid-major` the document canvas.
- Text: `ink` primary, `ink-2` controls and labels, `muted` secondary (≥4.5:1 on all chrome surfaces), `faint` only for non-essential marks (ticks, chevrons).

### Named Rules
- **One Blue Rule:** blue marks the single active thing (selected or edited block, primary action, on-state). Never decorative.
- **State colours only for state:** `ok` and `warn` appear only in the fit status; `danger` only on destructive actions and the remove zone.
- **The page keeps its own colours:** each CV template (Classic, Blue Accent, Timeline, Executive) has its own fonts, colours and spacing in the `.tpl-<id>` blocks of index.html. They are deliberately outside this chrome system: never reuse them in the app chrome, and never let chrome styles leak onto the page.

## Typography

System stack (SF Pro on Mac, Segoe UI on Windows). Hierarchy by size and weight only: 15/650 panel titles, 13 body, 12.5/500 controls and rows, 11.5/600 field labels and section heads, 11 meta. Counts, zoom and fit figures use tabular numerals.

## Layout

Grid: 52px toolbar row; 280px sidebar (`--side-w`); fluid canvas; 340px inspector (`--ed-w`) that slides in over the canvas's right edge. Canvas padding 64px top (room for the tab capsule), 48px sides, 78px bottom (clears the 30px fit status bar). Floating canvas elements centre on the visible canvas, shifting left when the inspector is open. Desktop only, minimum window 1080x680.

## Elevation & Depth

- Solid chrome separates with 1px hairlines (`rgba(0,0,0,.1)`), not shadows.
- The A4 page: hairline plus a soft offset shadow `0 12px 32px rgba(20,30,50,.1)`.
- Glass: `rgba(255,255,255,.6)`, `blur(18px) saturate(180%)`, a bright 1px top edge, hairline and soft shadow (`--shadow-glass`). Menus use a denser glass (`.72`, `blur(24px)`).

## Shapes

6px inputs, 7px buttons and rows, 12px menus, full capsules for floating tab and toast. Icons are drawn SVG, 2px stroke, round caps, 14–16px. The app icon is the Stack mark in cream blocks (`#f4f3ef`) on a near-black tile (`#1d1d1f`); it was inverted from cream-tile so it survives macOS's Dark icon style .

## Components

### Buttons
Toolbar buttons are borderless, 28px tall, grey hover fill. Primary (Export PDF, Add to CV) is Blue Fill. Inspector footer buttons are white with a hairline; Delete is red text, filled red on hover, and set apart from the others.

### Library rows
Compact rows: title (12.5/500) and one-line meta. Blocks on the CV show a quiet grey tick; blocks off the CV show a white "Add" button, so the exception stands out. The edited block's row is tinted blue. Section heads are 11.5/600 with right-aligned tabular counts; the drag grip appears on hover.

### Inputs / Fields
White, 6px radius, hairline; focus is a blue ring. Checkboxes are 16px rounded squares, blue when checked.

### Navigation
Version tabs: glass capsule above the page; active tab is a white pill.

### Fit status bar
Translucent bar along the bottom of the canvas: green tick + "Fits on one page" with spacing/text percentages, or amber "!" + "Runs onto N pages". Never overlaps the page at rest.

## Do's and Don'ts

### Do:
- Keep the CV page exactly as the CV styles define it.
- Use glass only for things floating above the canvas.
- Use one blue for the active thing; state colours only for state.

### Don't:
- Don't put glass, gradients or shadows on fixed chrome.
- Don't use Unicode characters or emoji as icons.
- Don't place floating UI over CV text.
