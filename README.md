# Ahmed Sinan Hayder — Portfolio (Vite)

Single-page portfolio for Ahmed Sinan Hayder — software engineer in Mosul, Iraq.
Full-screen scroll sections (Welcome · Work · Events · Contact · Resume) with
light/dark themes.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # eslint
```

## Structure

- `src/locales/en.json` — all copy
- `src/components/` — Welcome (hero + hover cards), CardSlideshow (projects),
  Contact, Resume, SocialBar, TopBar (theme toggle)
- `public/img/` — photos, project diagrams (light `-l` / dark `-d` variants),
  CV preview
- `public/files/` — the CV PDF opened from the Resume section

The served CV is `public/files/ahmed-sinan-hayder-cv.pdf`; keep the site's
claims in sync with it.

## Credits & licenses

- Design and code based on [ruizterce/portfolio](https://github.com/ruizterce/portfolio)
  (GPL-3.0). This derivative remains under GPL-3.0 — see `LICENSE`.
  Site content (text, photos, CV) © Ahmed Sinan Hayder.
- Tech logos from [Devicon](https://github.com/devicons/devicon) (MIT).
- Nunito and Nunito Sans fonts (SIL OFL), bundled in `public/fonts/`.
