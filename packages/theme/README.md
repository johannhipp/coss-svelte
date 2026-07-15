# packages/theme

Design token and Tailwind CSS contracts.

This package defines the visual translation layer from COSS's product UI language to Svelte/Tailwind v4:

- CSS variables
- density and radius scales
- semantic color tokens
- `cn-*` placeholder class strategy, if adopted
- Tailwind CSS v4 imports/preset helpers

The public CSS entry is `@coss-svelte/theme/style-coss.css`; optional sub-entries are `tokens.css` and `components.css`.
