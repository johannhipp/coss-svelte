# coss-svelte

Svelte 5 component primitives inspired by COSS UI.

This package is the public component surface for the `coss-svelte` monorepo. It exports Svelte components, component metadata, and small shared utilities. SvelteKit and Vite are the verified application path.

Start from a Svelte 5 application, then install the package, shared theme, and Bits UI peer:

```sh
pnpm add coss-svelte @coss-svelte/theme bits-ui
```

Import the shared theme from your global stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";
```

The package exports 52 stable component roots. Drawer, Sidebar, and Toast are experimental in `0.1.0`; consult their component pages for current limitations. The generated copy-and-own registry is a preview and may evolve between minor releases.

## Usage

```svelte
<script>
	import { Button, Card, CardPanel, CardTitle } from "coss-svelte";
</script>

<Card>
	<CardPanel>
		<CardTitle>Project status</CardTitle>
		<Button>Open</Button>
	</CardPanel>
</Card>
```

## Package Contents

- `dist/components` - packaged Svelte components and generated declarations.
- `dist/index.js` and `dist/index.d.ts` - public component and metadata exports.
- `dist/metadata.js` and `dist/metadata.d.ts` - component status and registry metadata.
- `dist/utils.js` and `dist/utils.d.ts` - shared utility exports.

The npm package is constrained to `dist`, `README.md`, `LICENSE`, and `package.json`.

## Release Checks

From the monorepo root:

```sh
pnpm release:check
```
