# shadcn-svelte Migration Model

shadcn-svelte is the best local reference for how to port a React/Radix/shadcn-style component system into Svelte without pretending the source can be copied directly.

## Useful Patterns To Borrow

- Component source lives in a registry-like tree.
- Docs and installed code share the same source of truth.
- `index.ts` files expose ergonomic names and aliases.
- Svelte-native primitives power the behavior layer.
- Styling is expressed through Tailwind classes and CSS variables.
- Registry build scripts validate metadata and emit static install artifacts.
- The CLI owns install/update concerns rather than hiding the copied code in a package.

## Important Difference

coss-svelte should not become a visual clone of shadcn-svelte. Use shadcn-svelte for process, file shape, registry mechanics, and Svelte idioms. Use COSS for visual language, component scope, examples, and product UI density.

## Local Reference Paths

- `.cache/upstream/shadcn-svelte/docs/src/lib/registry/ui`
- `.cache/upstream/shadcn-svelte/docs/src/lib/registry/styles`
- `.cache/upstream/shadcn-svelte/docs/scripts/build-registry.ts`
- `.cache/upstream/shadcn-svelte/packages/cli`
- `.cache/upstream/shadcn-svelte/registry-template`
