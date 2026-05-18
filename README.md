# MedRad Clinics — Website

Medical clinic website (interventional radiology). The homepage has been
rebuilt as a **PHP partials + SCSS** component architecture under `src/`.
The remaining pages are still standalone static HTML at the project root.

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| PHP  | 8.3+    | see platform notes below |
| Sass | 1.99+   | `npm install -g sass` |

### Windows

```bat
scoop install php
```

([Scoop](https://get.scoop.sh) must be installed first.)

### macOS (phpenv + Homebrew)

Install phpenv and the php-build plugin:

```bash
git clone https://github.com/phpenv/phpenv.git ~/.phpenv
git clone https://github.com/php-build/php-build ~/.phpenv/plugins/php-build
```

Add phpenv to your shell (`~/.zshrc` or `~/.bash_profile`):

```bash
export PHPENV_ROOT="$HOME/.phpenv"
export PATH="$PHPENV_ROOT/bin:$PATH"
eval "$(phpenv init -)"
```

Install PHP 8.3 via the shivammathur pre-built tap (no source compile needed):

```bash
brew tap shivammathur/php
brew install shivammathur/php/php@8.3

# link it into phpenv
ln -sf $(brew --prefix php@8.3) ~/.phpenv/versions/8.3.31
phpenv global 8.3.31
```

Open a new terminal, then verify:

```bash
php --version   # should print PHP 8.3.x
```

To install additional PHP versions later, repeat the `brew install` + `ln -sf` steps with a different version (e.g. `php@8.2`) and switch with `phpenv global` or `phpenv local`.

## Dev environment

Install dependencies first:

```bash
npm install
```

Then start the full dev environment (PHP server + Sass watcher) in one command:

```bash
npm run dev
```

This runs concurrently:
- **PHP** — built-in server at **http://localhost:8080/** (`src/` as document root)
- **Sass** — watches `src/index.scss` → `src/styles.css`, rebuilds on every change

You can also run each individually:

```bash
npm run dev:php    # PHP server only
npm run dev:sass   # Sass watcher only
```

> `src/assets` must be a symlink to the project `assets/` folder so the PHP
> server can serve images. These links are not committed to git — create them
> once after cloning:
>
> **macOS / Linux**
> ```bash
> ln -s ../assets src/assets
> ```
>
> **Windows**
> ```bat
> mklink /J  src\assets  ..\assets
> ```

## Project structure (`src/`)

```
src/
├── index.php              page — assembles all partials via include
├── index.scss             SCSS bundle — @use tokens + foundation + sections
├── styles.css             compiled output (do not edit by hand, gitignored)
├── assets/                junction → ../assets
├── script.js              hard link → ../script.js
├── shared/                shared layout partials — one folder each
│   ├── head/              head.php
│   ├── header/            header.php + header.scss
│   └── footer/            footer.php + footer.scss
├── styles/                global styles — flat
│   ├── breakpoints.scss   resolution mixins
│   ├── colors.scss        palette + colour utilities
│   ├── spacing.scss       scale + spacing utilities
│   ├── typography.scss    font() mixin + type scale
│   └── foundation.scss    reset, container, buttons, section base, utilities
├── sections/
│   └── home/              one folder per homepage section
│       ├── hero/          hero.php + hero.scss
│       ├── trust-strip/   trust-strip.php + trust-strip.scss
│       ├── …              (12 sections in total)
│       └── page-scripts/  page-scripts.php  (homepage inline JS)
└── preview/               design-system specimen pages
    └── index.php  typography.php  colors.php  spacing.php
```

Each section is its own folder under `sections/home/` holding a matching
`.php` + `.scss`. There is **one source of truth per section** — no
`v1`/`v2` split. `index.scss` `@use`s the global styles + foundation first,
then every section, then the colour/spacing utility classes last so they win
the cascade.

## Editing workflow

1. Run `npm run dev` — starts PHP + Sass watcher together.
2. Edit the `.php` partial for markup, the matching `.scss` partial for styles.
3. Refresh the browser.
