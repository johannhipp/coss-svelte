# coss-svelte

Svelte 5 component primitives inspired by COSS UI.

This package is the publishable component surface for the `coss-svelte` monorepo. It exports Svelte components, component metadata, and small shared utilities.

The package is not published to npm yet. Once published, install it with its peer dependencies:

```sh
pnpm add coss-svelte bits-ui svelte
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

- `src/components` - Svelte component source.
- `src/index.js` - public component and metadata exports.
- `src/index.d.ts` - public type declarations.
- `src/metadata.js` - component status and registry metadata.
- `src/utils.js` - shared utility exports.

The npm package is constrained to `src`, `README.md`, `LICENSE`, and `package.json`.

## Release Checks

From the monorepo root:

```sh
pnpm release:check
```
