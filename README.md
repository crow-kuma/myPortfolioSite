# myPortfolioSite

# 🖼️ Portfolio Site (Astro + react + Sanity)

This is a personal illustration portfolio site powered by **Astro**, **React**, and **Sanity** (Headless CMS).

## 📁 Project Structure

```
portfolio/
├── portfolioAstro/ # Frontend (Astro + react)
├── portfolioSanity/ # CMS backend (Sanity Studio)
├── bin/
│ └── run.sh # Script to run both Astro and Sanity dev servers
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies (both frontend & CMS)

cd portfolio/portfolioAstro
npm install

cd ../portfolioSanity
npm install

### 2. Start both Astro and Sanity development servers

You can run both servers at once using the provided shell script:

./bin/run.sh

This runs:

- `npm run dev` in `portfolioAstro` (usually at http://localhost:4321)
- `npm run dev` in `portfolioSanity` (usually at http://localhost:3333)

---

## 🧠 Technologies Used
 
- [Astro](https://astro.build/) (`7.3.5`) – Static site generator for modern web (Target: Netlify static).
- [Vite](https://vitejs.dev/) (`8.3.0`) – Build tool used by Astro for lightning-fast bundling.
- [React](https://react.dev/) (`19.3.0`) – UI framework for client interactivity.
- [Sanity](https://www.sanity.io/) (`6.16.0` Studio, `8.6.2` Client) – Headless CMS backend with live editor.
- [Biome](https://biomejs.dev/) (`2.5.14`) – Fast formatter and linter for the web.
- [Stylelint](https://stylelint.io/) (`17.15.0`) – Linter for CSS/SCSS and Astro files.
 
---
 
## 🧹 Linting & Formatting
 
The project uses **Biome** for formatting and linting (JS/TS, React, Astro, JSON) and **Stylelint** for CSS/SCSS.
 
### Biome
Run these commands within `portfolioAstro` or `portfolioSanity`:
 
- `npm run format` – Format files with Biome.
- `npm run lint` – Run Biome linter.
- `npm run check` – Run both and apply safe fixes.
 
### Stylelint
Run from `portfolioAstro`:
 
- `npm run lint:css` – Run Stylelint on CSS, SCSS, and Astro files.
- `npm run lint:css:fix` – Run Stylelint and automatically fix issues.

---

## 📦 Build (Astro only)

To generate a production build locally:

cd portfolioAstro
npm run build

The output will be generated in `portfolioAstro/dist` and configured for deployment on **Netlify**.

---

## 📝 Notes

- Git is initialized at the root `portfolio/` directory, tracking both `portfolioAstro` and `portfolioSanity`.
- `.gitignore` entries are configured to exclude Node modules, build artifacts, and sensitive files from both sub-projects.
- You can push to GitHub from the `portfolio` directory as a mono-repo.
- This structure allows independent development and clean separation of frontend and CMS.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) unless otherwise noted.
