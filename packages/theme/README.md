# @coss-svelte/theme

Consumer-safe design tokens and component styles for coss-svelte, verified with Tailwind CSS 4 in SvelteKit and Vite.

```sh
pnpm add coss-svelte @coss-svelte/theme bits-ui
```

This package defines the visual translation layer from COSS's product UI language to Svelte/Tailwind v4:

- CSS variables
- density and radius scales
- semantic color tokens
- `cn-*` component classes
- Tailwind CSS 4 imports

The public CSS entry is `@coss-svelte/theme/style-coss.css`; optional sub-entries are `tokens.css` and `components.css`.

Import the public entry after Tailwind from the global stylesheet loaded by your app layout:

```css
@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";
```

Use this package at the same version as `coss-svelte` for the `0.1.x` release line.
