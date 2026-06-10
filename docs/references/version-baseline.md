# Version Baseline

Captured from npm on 2026-06-10.

| Package                        |  Version | Role                                   |
| ------------------------------ | -------: | -------------------------------------- |
| `svelte`                       | `5.56.3` | Svelte runtime/compiler                |
| `@sveltejs/kit`                | `2.64.0` | Documentation app framework            |
| `vite`                         | `8.0.16` | Dev server and build tool              |
| `bits-ui`                      | `2.18.1` | Svelte-native headless primitive layer |
| `tailwindcss`                  |  `4.3.0` | Styling engine                         |
| `@tailwindcss/vite`            |  `4.3.0` | Tailwind/Vite integration              |
| `@sveltejs/vite-plugin-svelte` |  `7.1.2` | Svelte/Vite integration                |
| `@sveltejs/adapter-auto`       |  `7.0.1` | Initial docs app adapter               |
| `@lucide/svelte`               | `1.17.0` | Default icon set                       |
| `tailwind-variants`            |  `3.2.2` | Variant API                            |
| `tailwind-merge`               |  `3.6.0` | Class merge helper                     |
| `clsx`                         |  `2.1.1` | Conditional class helper               |
| `tw-animate-css`               |  `1.4.0` | Tailwind animation utilities           |
| `svelte-check`                 |  `4.6.0` | Svelte type checking                   |
| `typescript`                   |  `6.0.3` | TypeScript compiler                    |
| `@biomejs/biome`               | `2.4.16` | Formatting and linting                 |
| `pnpm`                         | `11.5.2` | Workspace package manager              |

## Policy

- Keep Svelte, SvelteKit, Vite, Bits UI, and Tailwind on current stable releases while this project is pre-implementation.
- Avoid compatibility shims for older Svelte versions in the first implementation pass.
- Record any dependency downgrade in an ADR before changing manifests.
