# coss-svelte

`coss-svelte` is a Svelte 5 component library inspired by the clean product design of COSS UI.

It is verified with SvelteKit and Vite, uses Bits UI for primitive behavior, and ships a Tailwind CSS 4 theme.

## Install

Start from a Svelte 5 application, then install the component package, shared theme, and Bits UI peer:

```sh
pnpm add coss-svelte @coss-svelte/theme bits-ui
```

Import the theme after Tailwind from your global stylesheet:

```css
@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";
```

The package exports 52 stable component roots. Drawer, Sidebar, and Toast are included as experimental components. The generated copy-and-own registry is a preview and may evolve between minor releases.

## Get started

You'll need Node.js 22 or newer and pnpm 11 or newer.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

This starts the component library and documentation site together. Changes to components will appear in the docs as you work.

To check your work, run:

```sh
pnpm check
pnpm test
```

## What's in this repository

- [`packages/coss-svelte`](packages/coss-svelte) contains the component library.
- [`packages/theme`](packages/theme) contains the shared Tailwind CSS theme.
- [`apps/www`](apps/www) contains the documentation site.
- [`apps/registry`](apps/registry) contains the generated preview registry.
- [`docs`](docs) contains contribution and release guides.

## Contributing

Before committing, read the [commit guide](docs/commit-standards.md). For release work, follow the [release guide](docs/release.md) and run:

```sh
pnpm release:check
```

Releases are manual, and the check does not publish anything.
