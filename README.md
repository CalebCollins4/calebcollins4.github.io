# calebcollins4.github.io

Personal portfolio for Caleb Collins — built with React + Vite and deployed to GitHub Pages.

## Local development

```powershell
npm install
npm run dev
```

Open http://localhost:5173 to preview. The dev server has hot reload.

Other scripts:

- `npm run build` — Production build into `dist/`
- `npm run preview` — Serves the production build locally on port 4173
- `npm run lint` — Runs ESLint

## Deployment

This repo is the GitHub user site for [CalebCollins4](https://github.com/CalebCollins4), so it ships to `https://calebcollins4.github.io/`.

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Installs dependencies with `npm install`
2. Builds the site with `vite build` (output goes to `dist/`)
3. Uploads `dist/` as a Pages artifact
4. Publishes to GitHub Pages via `actions/deploy-pages`

### One-time GitHub setup

In **Settings -> Pages**, set **Source** to **GitHub Actions**. No further configuration is needed — the workflow handles artifact upload and publishing.

### Manual deploy

From the **Actions** tab you can also run the workflow manually via `workflow_dispatch`.

## Project structure

```
.
|-- .github/workflows/deploy.yml   # CI/CD to GitHub Pages
|-- public/                        # Static assets served at the site root
|   |-- Caleb_Collins_Resume_Brief.pdf
|   |-- favicon.svg
|   +-- icons.svg
|-- resume/                        # LaTeX source for the resume (not shipped)
|-- src/
|   |-- App.jsx                    # Top-level layout and section scaffolding
|   |-- App.css                    # Global + section styling
|   |-- index.css                  # Typography, colors, reset
|   |-- components/                # UI components
|   |-- data/                      # Project + skill content (source of truth)
|   +-- assets/                    # Logos and the headshot
|-- index.html
|-- vite.config.js
+-- package.json
```
