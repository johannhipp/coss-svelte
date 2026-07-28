# Implementation Docs

This folder records the current product boundary for `coss-svelte`: what ships,
why the API differs from upstream COSS, which limitations remain, and what work
is deliberately deferred.

## Read By Question

| Question | File |
| --- | --- |
| What is stable, experimental, or deferred in v0.1? | [v0.1 Scope Decisions](./v0.1-scope-decisions.md) |
| Why did we choose those scope boundaries? | [Decision Records](./decision-records.md) |
| What could not be implemented cleanly yet? | [Unimplemented Components And Parity Gaps](./unimplemented-components.md) |
| What is the gap from the first 90% to full COSS parity? | [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md) |
| How is visual parity compared and what baseline informed the port? | [COSS Visual Parity Baseline](./coss-visual-parity-audit.md) |
| What remains before the first public release? | [Release Readiness](../release-readiness-plan.md) |

## Current Scope

| Status | Components / Work |
| --- | --- |
| Stable v0.1 | 52 canonical component roots using native markup, Svelte, and Bits UI where possible, including the complete Context Menu family and custom Number Field contract. |
| Experimental v0.1 | 3 roots: Drawer, provider-controlled Sidebar, and basic provider/manager-backed Toast. |
| Deferred | No canonical component root. Full Drawer/Toast/particle parity, the CLI installer, multiple style presets, and core form-library adapters remain deferred work. |

## Decision Trail

1. `docs/scope` records the upstream COSS surface.
2. [v0.1 Scope Decisions](./v0.1-scope-decisions.md) defines what `coss-svelte` will ship first.
3. [Decision Records](./decision-records.md) explains the tradeoffs.
4. [Unimplemented Components And Parity Gaps](./unimplemented-components.md)
   records concrete limitations of the current surface.
5. [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md) prioritizes work
   beyond the first stable release.
6. [COSS Visual Parity Baseline](./coss-visual-parity-audit.md) preserves the
   comparison method and historical upstream reference.

## Maintenance Rules

- Use Biome for linting and formatting. Do not introduce ESLint or Prettier.
- If implementation changes a core decision, update [Decision Records](./decision-records.md) first.
- If a component is intentionally partial, update [Unimplemented Components And Parity Gaps](./unimplemented-components.md).
- If deferred work belongs to the parity roadmap, update [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).
- Keep dated execution plans out of this folder after their work is complete;
  Git history is the archive.
