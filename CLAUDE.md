# CLAUDE.md

Blokk (formerly CV Blocks): public, open-source drag-and-drop CV builder. Electron app for macOS and Windows, released from this repo (github.com/alimleahat/cv-blocks).

## Stack
- Electron, no framework, no UI build step. `index.html` holds the whole UI (CSS in `<style>`, vanilla JS in `<script>`).
- `main.js`: window, menu, PDF export (`printToPDF`), network lockdown, single-instance handling. `preload.js` exposes `window.cvApp`.
- `fonts/`: bundled CMU Serif (Classic) and Lato (Timeline), both OFL. `build/`: icons and ad-hoc signing.
- Releases: push a tag `v*`; `.github/workflows/release.yml` builds the Mac .dmg and Windows .exe into a draft release.

## Commands
- `npm start`: run in development. `npm run dist:mac`: build into `dist.noindex/` (the `.noindex` name stops Spotlight/Launchpad listing a second copy).
- `index.html` also opens in a normal browser (export falls back to the print dialog).

## Rules
- **Privacy:** CV content is user data. It lives only in localStorage (key `cvblocks.v1`) inside the app data folder `CV Blocks` (kept from the old name, set in main.js) and in backups the user saves. Never ship anyone's real CV in the code; the starter content is the fictional "Jake Ryan" from Jake's Resume (MIT). Never add network calls: main.js cancels every non-local request and index.html has a strict Content-Security-Policy.
- Do not change the storage key, the data folder or `appId` (com.alimleahat.cvblocks): existing users would lose their CVs or get a second app on Windows.
- Templates: `TEMPLATES` in index.html (name, description, `padY` = top+bottom page padding in pt) plus a `.tpl-<id>` CSS block; all templates share one markup from `itemInner()`/`renderCV()`. Each version tab stores its own `template`; default `classic`.
- Motion: transform/opacity only, 100-250ms ease-out, none on keyboard actions, `prefers-reduced-motion` fallback. Sounds: Web Audio, light and under 150ms, mute stored in `blokk.sound`. Visual system: DESIGN.md.
- No tests exist. Check UI changes in a browser or the running app; check each template still exports a one-page PDF.
