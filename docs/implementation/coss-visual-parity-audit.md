# COSS Visual Parity Baseline

Status: historical baseline captured June 2026. This file records provenance
and methodology; it is not the source of truth for current component status.

## Reference

- COSS docs map: <https://coss.com/ui/llms.txt>, checked 2026-06-13.
- COSS registry source:
  <https://github.com/cosscom/coss/tree/main/apps/ui/registry/default/ui>.
- Upstream commit inspected: `68bf668d2da94e0921c3e67f252b0d36531382f8`.
- Theme source inspected: `packages/ui/src/styles/globals.css`.

The original pass compared every component in the then-current scope, including
interactive open states for overlays and selection controls. Screenshot and
manifest artifacts were removed from Git and remain reproducible through the
local harness.

## Durable Finding

The largest mismatch was architectural rather than framework-specific. COSS
encodes its visual system through Tailwind v4 recipes, semantic tokens,
data-slot selectors, pseudo-elements, and state attributes. The initial Svelte
port relied on a smaller hand-written CSS compatibility layer.

The current package and theme architecture keeps readable `cn-*` component
classes, validates their consumer styles, and separates consumer CSS from docs
application CSS. Exact parity still depends on component DOM, state, motion,
icons, and examples—not only colors and dimensions.

## Reproducing A Comparison

Refresh the ignored upstream cache when necessary, then run:

```sh
pnpm parity:evidence
pnpm parity:interactive
```

Generated evidence belongs under `.cache/visual-parity` and must not be
committed. The scripts share source lookup through
`scripts/visual-parity-source.mjs`.

For a useful comparison:

1. Record the upstream commit and local commit.
2. Compare the same example, viewport, theme, and interaction state.
3. Check semantic DOM and state attributes as well as screenshots.
4. Classify differences as defects, intentional Svelte/Bits UI differences, or
   deferred parity work.
5. Put current limitations in
   [Unimplemented Components And Parity Gaps](./unimplemented-components.md)
   and roadmap work in
   [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).

The detailed June 2026 component-by-component findings remain available in Git
history. They should not be copied forward as current facts without a new
comparison pass.
