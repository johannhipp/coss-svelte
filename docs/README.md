# Documentation Map

This docs tree has two jobs:

1. Preserve the full COSS source inventory.
2. Track what `coss-svelte` is actually implementing first.

When those disagree, follow [v0.1 Scope Decisions](./implementation/v0.1-scope-decisions.md). The scope inventory is intentionally broad; the implementation docs decide what ships, what is experimental, and what is deferred.

## Start Here

| Need | Read |
| --- | --- |
| Current implementation scope | [Implementation](./implementation/README.md) |
| Stable, experimental, and deferred v0.1 surface | [v0.1 Scope Decisions](./implementation/v0.1-scope-decisions.md) |
| Why each scope decision was made | [Decision Records](./implementation/decision-records.md) |
| What could not be implemented cleanly yet | [Unimplemented Components And Parity Gaps](./implementation/unimplemented-components.md) |
| Full COSS inventory and source audit | [Scope](./scope/README.md) |
| Monorepo package boundaries | [Architecture](./architecture/monorepo-structure.md) |
| Upstream cache and version notes | [References](./references/upstream-cache.md) |

## Folder Roles

| Folder | Role | Source Of Truth For |
| --- | --- | --- |
| [scope](./scope/README.md) | Imported COSS docs, particles, hooks, and generated planning surfaces. | What COSS contains. |
| [implementation](./implementation/README.md) | Current coss-svelte decisions, phase order, status, and parity gaps. | What coss-svelte ships first. |
| [architecture](./architecture/monorepo-structure.md) | Workspace layout and package ownership. | Where code and generated artifacts belong. |
| [references](./references/upstream-cache.md) | Upstream cache notes, version baseline, and migration references. | Which external versions informed the work. |

## Update Rule

- Add new source discoveries under `docs/scope`.
- Add implementation decisions and gap tracking under `docs/implementation`.
- Keep `docs/scope` descriptive and `docs/implementation` prescriptive.
