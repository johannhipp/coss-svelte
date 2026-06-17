# apps/registry

Generated registry artifacts live here.

- Build command: `pnpm registry:build`
- Output directory: `apps/registry/static/r`
- Index file: `apps/registry/static/r/index.json`

Responsibilities:

- produce shadcn-compatible registry JSON
- publish component metadata and dependency graphs
- export example and particle entries for `apps/www`
- keep generated output separate from source components
