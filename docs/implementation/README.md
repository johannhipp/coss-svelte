# Implementation Docs

This folder is the operating plan for `coss-svelte`. It turns the broad COSS inventory into the first SvelteKit-native component library scope.

## Read By Question

| Question | File |
| --- | --- |
| What is stable, experimental, or deferred in v0.1? | [v0.1 Scope Decisions](./v0.1-scope-decisions.md) |
| Why did we choose those scope boundaries? | [Decision Records](./decision-records.md) |
| What order should implementation follow? | [Implementation Phases](./phases.md) |
| What could not be implemented cleanly yet? | [Unimplemented Components And Parity Gaps](./unimplemented-components.md) |
| What is the gap from the first 90% to full COSS parity? | [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md) |
| Which visual differences were found against COSS and mitigated? | [COSS Visual Parity Audit](./coss-visual-parity-audit.md) |

## Current Scope

| Status | Components / Work |
| --- | --- |
| Stable v0.1 | Broad component surface using native markup, Svelte, and Bits UI where possible. |
| Experimental v0.1 | Drawer, Sidebar, and Toast. |
| Deferred | Number Field, full Drawer parity, full Toast parity, full particle parity, CLI installer, multiple style presets, and core form-library adapters. |

## Decision Trail

1. `docs/scope` records the upstream COSS surface.
2. [v0.1 Scope Decisions](./v0.1-scope-decisions.md) defines what `coss-svelte` will ship first.
3. [Decision Records](./decision-records.md) explains the tradeoffs.
4. [Implementation Phases](./phases.md) sequences the work.
5. [Unimplemented Components And Parity Gaps](./unimplemented-components.md) tracks anything skipped during implementation.
6. [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md) tracks the path from broad first release to full COSS parity.
7. [COSS Visual Parity Audit](./coss-visual-parity-audit.md) records the current visual comparison and mitigation pass.

## Maintenance Rules

- Use Biome for linting and formatting. Do not introduce ESLint or Prettier.
- If implementation changes a core decision, update [Decision Records](./decision-records.md) first.
- If a component is intentionally partial, update [Unimplemented Components And Parity Gaps](./unimplemented-components.md).
- If deferred work belongs to the parity roadmap, update [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).
