# apps/registry

Generated registry artifacts live here.

- Build command: `pnpm registry:build`
- Output directory: `apps/registry/static/r`
- Index file: `apps/registry/static/r/index.json`
- The docs app serves this directory at `/r` and `/schema` through its SvelteKit asset configuration.

Responsibilities:

- produce shadcn-compatible registry JSON
- publish component metadata and dependency graphs
- export example and particle entries for `apps/www`
- keep generated output separate from source components
- declare the required `@coss-svelte/theme` package and CSS import for every installable item
