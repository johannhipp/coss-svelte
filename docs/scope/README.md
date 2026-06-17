# Scope Documentation

This directory records the COSS source inventory. It is descriptive input material, not the final `coss-svelte` implementation plan.

For the current plan, start with [v0.1 Scope Decisions](../implementation/v0.1-scope-decisions.md).

## What This Folder Answers

| Question | File |
| --- | --- |
| Which COSS components exist? | [source/00-component-index.md](./source/00-component-index.md) |
| Where did the inventory come from? | [source/01-source-audit.md](./source/01-source-audit.md) |
| What does each component cover in COSS? | [source category files](./source/README.md) |
| How many particles exist by component? | [source/90-particle-coverage.md](./source/90-particle-coverage.md) |
| Which hooks appeared in live docs? | [source/91-hooks.md](./source/91-hooks.md) |
| How might the inventory map to Svelte foundations? | [Component Implementation Matrix](./component-implementation-matrix.md) |
| What is the detailed generated outline? | [Component Implementation Outline](./component-implementation-outline.md) |

## Boundaries

- `docs/scope/source` is the raw structured inventory from COSS docs, particles, skills, and `llms.txt`.
- `component-implementation-matrix.md` and `component-implementation-outline.md` are generated planning aids.
- `docs/implementation` is the source of truth for current `coss-svelte` scope and status.

## Implementation Principle

Do not port Base UI directly. Port the component contract, visual tokens, examples, and documentation shape onto Svelte-native foundations, primarily Bits UI.
