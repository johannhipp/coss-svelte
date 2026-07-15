# Repository Cleanup Plans

Generated from a repository-wide maintainability audit on 2026-07-15 at commit
`5d8ebb6`. The implementation pass has completed plans 001 through 005.
Execute future cleanup work in priority order unless dependency notes say
otherwise. Each executor must read its plan fully, honor its STOP conditions,
and update the status row when done.

## Audit coverage

- Reviewed all 463 tracked text files (42,460 lines). Generated registry JSON,
  the generated scope catalog, and the lockfile were parsed and checked as
  generated data sets; handwritten source, tests, configuration, and
  documentation were read directly.
- Compared the 256 Svelte source files with the public exports, declarations,
  component metadata, registry items, docs navigation, preview branches, and
  scope catalog.
- Ran `pnpm install --frozen-lockfile` successfully.
- The current verification pass runs `pnpm biome:ci`, recursive `pnpm check`,
  `pnpm test` (82 repository tests plus Field runtime tests), package type
  consumer compilation, registry/theme/scope/index checks, and the docs app
  production build successfully.

## Findings and task list

Priorities are ordered by user impact and by how much later cleanup depends on
the work. Confidence reflects the evidence available in the current tree.

| Priority | Task | Evidence | Impact | Effort | Change risk | Confidence | Detailed plan |
|---|---|---|---|---|---|---|---|
| P1 | Make one component catalog authoritative and generate its derivative views. | `metadata.js` repeats status, parts, and full metadata; Badge currently advertises Meter parts, while Group, Meter, and Toolbar omit real parts. `index.js`, scope scripts, and tests repeat the same lists again. | Removes proven drift and makes exports, docs, registry, and tests change together. | L | MED | HIGH | [001](./001-consolidate-component-catalog.md) |
| P1 | Add a real package validation and declaration pipeline. | All 256 exports are declared as `AnyComponent = Component<Record<string, unknown>>`; the package has no check script; a direct package check finds four warnings that the green release gate misses. | Restores consumer prop safety and makes release checks cover the actual library. | L | HIGH | HIGH | [002](./002-make-package-contracts-real.md) |
| P1 | Split consumer theme CSS from docs CSS and make registry entries self-contained. | The private theme is documented as required, scans repo-relative app paths, applies global reset/body rules, and contains 24 `docs-*` selectors. All 54 registry items have an incomplete direct file/dependency closure; NumberField is emitted with no files. | Makes copy-and-own output buildable and prevents the published theme from depending on repository layout. | L | HIGH | HIGH | [003](./003-make-theme-and-registry-consumer-safe.md) |
| P1 | Replace the three mirrored demo catalogs with one executable example source per component. | The docs renderer, code strings, and scope demo each contain 54 slug branches (3,076 lines combined). The renderer statically imports 228 package exports and contributes to a 637.83 kB client chunk. | Stops example drift, removes duplicate state/types/markup, and restores route-level code splitting. | L | MED | HIGH | [004](./004-consolidate-examples-and-particles.md) |
| P1 | Complete the stable Field contract and add runtime component tests. | ADR-003 requires id, description, invalid, required, and disabled wiring; `Field.svelte` only renders visual text/state, and the docs manually add ARIA attributes. Existing tests never render a Svelte component. | Fixes a stable accessibility contract and creates the harness needed for later interactive work. | M | HIGH | HIGH | [005](./005-complete-field-semantics.md) |
| P2 | Decide and enforce one composition model for root components. | At least 17 roots conditionally switch between custom compound children and a built-in convenience layout. The fallback layout often duplicates exported part markup. | Reduces conditional APIs and prevents the root and compound forms from diverging. Prefer explicit recipe components (for example, `DialogExample` or a documented convenience wrapper) over hidden root modes. | L | HIGH | HIGH | — |
| P2 | Consolidate behavior shared by component families. | Autocomplete and Combobox repeat option normalization; Calendar and DatePicker repeat the month grid; Meter and Progress repeat unsafe range normalization; Input/InputGroupInput and Textarea/InputGroupTextarea repeat native control forwarding. | Centralizes edge cases without collapsing the public compound-part surface. | L | MED | HIGH | — |
| P2 | Finish or quarantine experimental abstractions. | SidebarProvider owns `open`, but Sidebar owns an independent `state` and SidebarTrigger/SidebarRail never toggle it. Toast is a static 13-line status surface. The ADR intentionally marks Drawer, Sidebar, and Toast experimental. | Prevents experimental names from implying behavior they do not provide. Complete them behind runtime tests or remove them from installable/default surfaces while retaining explicit experimental metadata. | XL | HIGH | HIGH | — |
| P2 | Replace source-shape tests with contract and behavior tests. | 17 of 20 test files read source text; 77 tests contain 333 match/includes assertions; no test mounts or renders a component. Several tests maintain their own component/part lists. | Tests behavior and generated invariants instead of freezing implementation text. Keep a small number of intentional source-policy tests only. | L | MED | HIGH | Plans 001, 002, and 005 establish the migration path. |
| P2 | Consolidate or delete stale generators and parity harness code. | `generate-v0-components.mjs` is an unreferenced 3,532-line whole-library overwriter. The two parity scripts repeat argument parsing, source lookup, report tables, and browser-selection expressions. The interactive Combobox selector says `Select a item`, while the local example says `Select an item...`. | Removes dangerous dead code and makes visual evidence reproducible. | M | LOW | HIGH | Plan 001 removes the obsolete generator; shared visual-parity source lookup now lives in `scripts/visual-parity-source.mjs`. |
| P2 | Centralize docs domain types and authored page content. | `Particle`, `TocItem`, API element, sidebar, and component-page shapes are redeclared across Svelte and JSDoc files. `navigation.js` and the particles loader use `@ts-nocheck`. Introduction/getting-started facts are duplicated between route markup and `markdown.js`. | Removes duplicate types and keeps rendered pages, Markdown endpoints, search, and LLM output aligned. | M | MED | HIGH | Fold into plan 004 or execute afterward. |
| P2 | Split and document the internal native-wrapper strategy. | 52 parts use `internal/Block.svelte`, while comparable parts hand-code native elements; 17 large groups share nearly identical wrapper structure after names/classes are normalized. | Keeps one public file per composable part while making wrapper generation and prop forwarding consistent. Use code generation for mechanical wrappers; do not build one runtime mega-component. | M | MED | MED | — |
| P2 | Refresh stale repository guidance. | `AGENTS.md` says no components or test/docs infrastructure exist; `apps/www/src/README.md` says source will be added later; `packages/registry/src/README.md` says no registry code exists. | Stops agents and contributors from following obsolete phase instructions. | S | LOW | HIGH | — |
| P3 | Remove dead dependencies, aliases, and lint exemptions. | `tailwind-variants` is unused in both the package and docs app; `$components` is unused and `$registry` points to a missing directory; five renderer imports are unused because Svelte unused checks are disabled. | Shrinks install/configuration surface and lets tooling detect dead code. | S | LOW | HIGH | — |
| P3 | Clear remaining tooling warnings and deployment placeholders. | Biome reports two CSS specificity warnings; both SvelteKit apps use adapter-auto with no production target; `pnpm-workspace.yaml` contains the literal placeholder `sharp: set this to true or false` (the frozen install still succeeds). | Produces a warning-free baseline and explicit deployment/configuration ownership. | S–M | LOW | HIGH | — |

## Execution order and status

| Plan | Title | Priority | Effort | Depends on | Status |
|---|---|---|---|---|---|
| 001 | Consolidate the component catalog and generated views | P1 | L | — | DONE |
| 002 | Make package validation and public contracts real | P1 | L | 001 | DONE |
| 003 | Make the theme and registry consumer-safe | P1 | L | 001, 002 | DONE |
| 004 | Consolidate examples and particle catalogs | P1 | L | 001, 003 | DONE |
| 005 | Complete Field semantics with runtime tests | P1 | M | 002 | DONE |

Status values: `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED` (with a one-line
reason), or `REJECTED` (with a one-line rationale).

## Follow-up cleanup status

The P2/P3 follow-up findings were implemented alongside plans 001–005:

| Finding | Status | Evidence |
|---|---|---|
| Root composition model | DONE | `compositionModel` metadata, the composition contract in `docs/scope/component-implementation-outline.md`, and `tests/composition-contract.test.mjs`. |
| Shared family behavior | DONE | `normalizeOptions` and `clampPercentage` are shared by option/range families and covered by `packages/coss-svelte/tests/internal-props.test.ts`; Calendar/DatePicker retain separate primitive namespaces by design. |
| Experimental Sidebar/Toast behavior | DONE | Sidebar provider context/toggle semantics and dismissible live Toast behavior are covered by `packages/coss-svelte/tests/experimental-components.test.ts`. |
| Source-shape test migration | DONE | Runtime Field, Sidebar, Toast, and internal utility tests now cover the highest-risk behavior; source scans remain only for generated/source-policy invariants. |
| Parity harness duplication | DONE | Shared source lookup/notes helper is used by both parity scripts. |
| Docs domain types | DONE | Shared `TocItem`, API, component-page, and particle types live in `apps/www/src/lib/docs/types.ts`. |
| Native wrapper strategy | DONE | `Block.svelte` remains the narrow wrapper for mechanical native parts; Bits-backed parts keep their real primitives, as documented in the rejected mega-wrapper rationale above. |
| Repository guidance | DONE | AGENTS, app, registry, and CLI READMEs describe the implemented surfaces and release checks. |
| Dependencies, aliases, deployment target | DONE | `tailwind-variants` and stale aliases are removed; docs uses adapter-node with a `node build` start script and explicit `sharp` build approval. |
| Tooling warnings/placeholders | DONE | Biome is clean, the workspace placeholder is resolved, and docs bundle checks retain the existing 700 kB safety threshold for the known chunk-size warning. |

## Dependency notes

- Plan 001 must land first because every later plan needs a trustworthy list of
  implemented roots, parts, statuses, and slugs.
- Plan 002 precedes registry and behavior work so new files and props are
  checked by the package itself and produce real consumer declarations.
- Plan 003 precedes particle consolidation because local particle install URLs
  must point at complete local registry entries, not the upstream React
  registry.
- Plan 005 can run in parallel with plans 003 and 004 after plan 002.

## Findings considered and rejected

- **Delete meaningless comments:** rejected. There are no TODO/FIXME/HACK/XXX
  comments and no broad comment-noise problem. The two Drawer pointer-capture
  comments and the docs storage fallback comment explain non-obvious failure
  handling. JSDoc type blocks should disappear through a TypeScript/shared-type
  migration, not through blind comment deletion.
- **Collapse public compound parts into fewer files:** rejected. The separate
  part files are the composable public API. Consolidate their contracts,
  generation, and shared behavior instead.
- **Implement NumberField during cleanup:** rejected. ADR-006 deliberately
  defers it until an accessibility specification and interaction tests exist.
  Remove its empty install artifact, but do not smuggle a spinbutton
  implementation into a deduplication change.
- **Delete `docs/scope/source`:** rejected. Those files are upstream provenance
  and planning inputs. Stop treating them as parallel runtime truth, but retain
  the raw research record.
- **Replace every thin wrapper with `Block.svelte`:** rejected. Bits UI parts
  need their real primitives and native elements need precise attribute types.
  Mechanical source generation is safer than a runtime polymorphic abstraction
  that erases semantics.

## Repository rules for every plan

- Do not copy React/Base UI source into Svelte. Use Bits UI or native Svelte
  markup.
- Keep component source under `packages/coss-svelte` and generated registry
  output under `apps/registry`.
- Use Biome only. Do not add ESLint or Prettier.
- Update `docs/references/version-baseline.md` when core dependency versions
  change and `docs/scope/component-implementation-outline.md` when a component
  strategy changes.
- Before committing, configure `.gitmessage.txt` and use Conventional Commits
  as documented in `docs/commit-standards.md`.
