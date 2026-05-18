# MedRad Clinics — Website

Medical clinic website (interventional radiology). The homepage has been
rebuilt as a **PHP partials + SCSS** component architecture under `src/`.
The remaining pages are still standalone static HTML at the project root.

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| PHP  | 8.5+    | `scoop install php` (Scoop: https://get.scoop.sh) |
| Sass | 1.99+   | `npm install -g sass` |

## Run the site

The PHP built-in server uses **`src/` as the document root**.

```bash
# from the project root
php -S localhost:8000 -t src
```

Then open **http://localhost:8000/** (serves `src/index.php`).

> `src/assets` is a junction to the project `assets/` folder, and
> `src/script.js` is a hard link to the root `script.js`, so both resolve
> under the `src/` document root. If either link is missing, recreate them:
>
> ```bat
> mklink /J  src\assets     ..\assets
> mklink /H  src\script.js  ..\script.js
> ```

## Build the CSS

SCSS lives next to each PHP partial. `src/index.scss` bundles everything.

```bash
# one-off build
sass src/index.scss src/styles.css

# rebuild on every change (run while developing)
sass --watch src/index.scss:src/styles.css
```

## Project structure (`src/`)

```
src/
├── index.php              page — assembles all partials via include
├── index.scss             SCSS bundle — @use foundation + every section
├── styles.css             compiled output (do not edit by hand)
├── assets/                junction → ../assets
├── script.js              hard link → ../script.js
├── shared/
│   ├── head.php
│   ├── header.php   header.scss     site nav
│   ├── footer.php   footer.scss     site footer
│   └── foundation.scss              globals: variables, reset, typography,
│                                    container, buttons, section base, card,
│                                    responsive, utilities
└── home/
    ├── hero.*                 trust-strip.*
    ├── featured-procedures.*  visual-break.*
    ├── procedures-directory.* diagnostic-imaging.*
    ├── interactive-tool.*     reviews.*
    ├── treatment-cases.*      specialists.*
    ├── contact.*              assess-overlay.*
    └── page-scripts.php       homepage inline JS
```

Each section = one `.php` partial + one `.scss` partial. There is **one
source of truth per section** — no `v1`/`v2` split. `foundation.scss` holds
the globals; `index.scss` `@use`s foundation first, then every section so
section rules win the cascade.

## Editing workflow

1. Run `sass --watch src/index.scss:src/styles.css` in one terminal.
2. Run `php -S localhost:8000 -t src` in another.
3. Edit the `.php` partial for markup, the matching `.scss` partial for styles.
4. Refresh the browser.
