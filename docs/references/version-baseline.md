# Version Baseline

Core versions captured from npm on 2026-06-10. The PostCSS security floor was
verified on 2026-07-28.

| Package                        |    Version | Role                                                        |
| ------------------------------ | ---------: | ----------------------------------------------------------- |
| `svelte`                       |   `5.56.3` | Svelte runtime/compiler                                     |
| `@sveltejs/kit`                |   `2.64.0` | Documentation app framework                                 |
| `vite`                         |   `8.0.16` | Dev server and build tool                                   |
| `postcss`                      |   `8.5.23` | CSS parser used by Vite/Tailwind; transitive security floor |
| `bits-ui`                      |   `2.18.1` | Svelte-native headless primitive layer                      |
| `tailwindcss`                  |    `4.3.0` | Styling engine                                              |
| `@tailwindcss/vite`            |    `4.3.0` | Tailwind/Vite integration                                   |
| `@sveltejs/vite-plugin-svelte` |    `7.1.2` | Svelte/Vite integration                                     |
| `@sveltejs/adapter-node`       |    `5.5.7` | Explicit Node deployment target for the docs app            |
| `@types/node`                  | `22.15.30` | Node types for adapter-node and server-side docs modules    |
| `@sveltejs/package`            |    `2.5.8` | Package declaration/build pipeline                          |
| `vitest`                       |   `4.1.10` | Component runtime tests                                     |
| `@testing-library/svelte`      |    `5.4.2` | DOM component test harness                                  |
| `jsdom`                        |   `29.1.1` | Browser-like test environment                               |
| `@lucide/svelte`               |   `1.17.0` | Default icon set                                            |
| `tailwind-merge`               |    `3.6.0` | Class merge helper                                          |
| `clsx`                         |    `2.1.1` | Conditional class helper                                    |
| `tw-animate-css`               |    `1.4.0` | Tailwind animation utilities                                |
| `svelte-check`                 |    `4.6.0` | Svelte type checking                                        |
| `typescript`                   |    `6.0.3` | TypeScript compiler                                         |
| `@biomejs/biome`               |   `2.4.16` | Formatting and linting                                      |
| `pnpm`                         |   `11.5.2` | Workspace package manager                                   |

## Policy

- Keep Svelte, SvelteKit, Vite, Bits UI, and Tailwind on current stable releases while this project is pre-implementation.
- Avoid compatibility shims for older Svelte versions in the first implementation pass.
- Record any dependency downgrade in an ADR before changing manifests.
- Keep the root PostCSS override until an ordinary lockfile refresh resolves
  every copy to `>=8.5.18` without it.
