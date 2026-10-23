<p align="center"><img src="build/icon.png" width="128" alt="Blokk icon"></p>

<h1 align="center">Blokk</h1>

<p align="center">A drag-and-drop CV builder. Snap sections and entries in and out, pick a template, let it auto-fit to one page, export a clean PDF.<br><sub>Formerly CV Blocks. Your CVs carry over automatically.</sub></p>

---

## Download & install

Go to the **[Releases page](../../releases/latest)** and download the file for your computer:

| Computer | File |
| --- | --- |
| Mac with Apple chip (M1/M2/M3/M4) | `Blokk-x.x.x-mac-arm64.dmg` |
| Mac with Intel chip | `Blokk-x.x.x-mac-x64.dmg` |
| Windows | `Blokk-Setup-x.x.x.exe` |

Not sure which Mac you have? Apple menu → **About This Mac** → look at "Chip".

### Mac
1. Open the `.dmg` and drag **Blokk** into **Applications**.
2. Open it from Applications. The first time, macOS will say it can't verify the developer (the app isn't signed with a paid Apple certificate). Click **Done**.
3. Open **System Settings → Privacy & Security**, scroll down, and click **Open Anyway** next to Blokk. You only have to do this once.

### Windows
1. Run `Blokk-Setup-x.x.x.exe`.
2. If Windows SmartScreen appears, click **More info → Run anyway** (the app isn't signed with a paid certificate).
3. Follow the installer. It adds Desktop and Start Menu shortcuts.

## Your data stays on your computer

- Your CV is saved only on your own computer, inside the app's data folder. Nothing is uploaded, ever.
- The app is locked so it **cannot make network requests at all**: only its own local files can load, and no permissions (camera, location, etc.) are ever granted.
- Back up with **⋯ → Download backup**; restore on another computer with **⋯ → Restore from backup**.

## Using it

- **Library (left):** all your content. Drag a single block, or a whole section by its header, onto the page.
- **Remove:** drag a block back to the library, or hover it and click **×**. It stays in your library.
- **Reorder:** drag blocks within a section, or drag a section heading to move the whole section.
- **Edit:** click any block. Untick a bullet, or the whole "Classes" line, to hide it in the current version only; the text stays shared. Wrap words in `**double stars**` for bold.
- **Auto-fit:** spacing (and, if needed, text size) adjusts so the CV fills exactly one page.
- **Version tabs:** the tabs above the page are different versions of your CV (e.g. "Embedded roles", "Product"). They all share the same library: edit a block once and every version that uses it updates. Each tab remembers its own layout, which blocks are on the page and in what order, and saves automatically. **+** starts a new version as a copy of the current one; double-click a tab to rename it.
- **Duplicate:** make a variant of a block to keep two different wordings of the same job.
- **Templates:** the template button in the toolbar switches the look: **Classic** (LaTeX style), **Blue Accent**, **Timeline** (dates in a left column) or **Executive** (traditional centred format). Your content stays the same; each version tab remembers its own template.
- **Export PDF:** button at the top right, or **⌘E** / **Ctrl+E**.
- **Start fresh:** the app opens with a sample CV (the fictional "Jake Ryan") so you can see how blocks work. **⋯ → Start a blank CV** clears it so you can enter your own details.

Your work is saved automatically on your computer. Use **⋯ → Download backup** now and then to keep a copy.

## For developers

```bash
npm install
npm start          # run the app
npm run dist:mac   # build .dmg files into dist/
npm run dist:win   # build the Windows installer into dist/
```

The whole interface is in `index.html`. `main.js` is the Electron shell, and PDF export uses Chromium's `printToPDF` with the page's print styles.

### Publishing a release

Pushing a version tag builds the Mac and Windows installers on GitHub Actions and attaches them to a draft release:

```bash
npm version patch      # bumps package.json, e.g. 1.0.0 → 1.0.1, and creates tag v1.0.1
git push --follow-tags
```

Then open **Releases** on GitHub, review the draft and click **Publish**.

## Credits

The Classic template and the sample content are adapted from [Jake's Resume](https://github.com/jakegut/resume) by Jake Gutierrez (MIT). The Timeline template is inspired by [moderncv](https://github.com/moderncv/moderncv)'s classic style. Fonts: CMU Serif by Andrey V. Panov and Lato by Łukasz Dziedzic (both SIL OFL 1.1). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Blokk is released under the [MIT License](LICENSE).
