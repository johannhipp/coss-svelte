# coss-svelte

Svelte 5 component primitives inspired by COSS UI.

This package is the publishable component surface for the `coss-svelte` monorepo. It exports Svelte components, component metadata, and small shared utilities.

The package is not published to npm yet. Once published, install it with its peer dependencies:

```sh
pnpm add coss-svelte bits-ui svelte @coss-svelte/theme
```

Import the shared theme from your global stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";
```

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
