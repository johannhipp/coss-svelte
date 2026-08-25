# coss-svelte

`coss-svelte` is a Svelte 5 component library inspired by the clean product design of COSS UI.

The package is not on npm yet, so this repository is the best place to follow its development.

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
- [`apps/www`](apps/www) contains the documentation site.
- [`docs`](docs) contains contribution and release guides.

## Contributing

Before committing, read the [commit guide](docs/commit-standards.md). For release work, follow the [release guide](docs/release.md) and run:

```sh
pnpm release:check
```

Releases are manual, and the check does not publish anything.
