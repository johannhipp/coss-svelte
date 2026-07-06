# Agent Docs and Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `coss-svelte` agent-readable in the same spirit as COSS UI, then publish a `coss-svelte` implementation skill to `johannhipp/skills`.

**Architecture:** Mirror COSS UI where it fits: `/llms.txt`, `.md` documentation routes, Copy Markdown, a Skills docs page, and an installable skill with progressively loaded references. Adapt the internals to `coss-svelte` because this repo is metadata-driven SvelteKit docs, not a Next/Fumadocs MDX site.

**Tech Stack:** SvelteKit, Svelte 5, Bits UI, Tailwind CSS 4, Node test runner, GitHub PR workflow, Agent Skills format.

---

## Scope Decisions

- Implement `/llms.txt`: appropriate and directly aligned with COSS UI.
- Implement `.md` docs URLs: appropriate, but generated from `coss-svelte` metadata and docs helpers instead of COSS UI's MDX raw route.
- Keep and improve Copy Markdown: appropriate, and it should share generation logic with raw Markdown endpoints.
- Add `/docs/skills`: appropriate, mirroring COSS UI's agent-skills documentation.
- Defer `llms-full.txt`: COSS UI does not use it, and the current docs surface is better served by `/llms.txt` plus per-page Markdown.
- Defer a separate `coss-svelte-particles` skill: COSS UI has hundreds of installable particle manifests; `coss-svelte` currently has a visual particle browser, but not an equivalent registry-backed particle corpus.

## Files and Responsibilities

### `johannhipp/coss-svelte`

- Create `apps/www/src/lib/docs/markdown.js`: source of truth for agent-readable Markdown strings.
- Create `apps/www/src/routes/docs/components/[slug].md/+server.js`: raw component docs endpoint.
- Create `apps/www/src/routes/docs/[slug].md/+server.js`: raw overview/resource docs endpoint.
- Create `apps/www/src/routes/llms.txt/+server.js` or `apps/www/static/llms.txt`: agent docs map. Prefer a server route if SvelteKit static routing cannot keep it generated from metadata; prefer static if generation/check tooling is straightforward.
- Modify `apps/www/src/lib/components/docs/component-doc-page.svelte`: Copy Markdown uses shared Markdown helper.
- Modify `apps/www/src/lib/components/docs/content-page.svelte`: Copy Markdown uses shared Markdown helper where applicable.
- Modify `apps/www/src/lib/docs/navigation.js`: add Skills to Resources.
- Create `apps/www/src/routes/docs/skills/+page.svelte`: human page explaining skill installation through `johannhipp/skills`.
- Modify `apps/www/src/routes/docs/llms/+page.svelte`: turn the current route list into an agent resource page.
- Modify `apps/www/src/routes/docs/getting-started/+page.svelte`: add a concise "Working with LLMs" section.
- Create `scripts/generate-agent-docs.mjs`: optional if `/llms.txt` is checked in; required if the implementation chooses a static file with `--check`.
- Create `tests/agent-docs.test.mjs`: tests for generated map, raw docs coverage, navigation, and sync.

### `johannhipp/skills`

- Create `coss-svelte/SKILL.md`: root skill, close in structure to COSS UI's `coss` skill but written for Svelte.
- Create `coss-svelte/references/component-registry.md`: component index generated from `componentMetadata`.
- Create `coss-svelte/references/cli.md`: install and local development workflow.
- Create `coss-svelte/references/rules/styling.md`: Tailwind 4, COSS tokens, sizing, icons, and theme rules.
- Create `coss-svelte/references/rules/composition.md`: Svelte/Bits UI composition rules for overlays, triggers, grouped controls, and slots.
- Create `coss-svelte/references/rules/forms.md`: Field/Form/Input validation patterns.
- Create `coss-svelte/references/rules/migration.md`: COSS React/Base UI and shadcn/Radix assumptions that must not leak into `coss-svelte`.
- Create `coss-svelte/references/primitives/*.md`: one concise reference per component.
- Create `coss-svelte/agents/openai.yaml` if the skills repo uses that metadata convention.

## Task 1: Shared Agent Markdown in `coss-svelte`

- [x] Inspect `packages/coss-svelte/src/metadata.js`, `apps/www/src/lib/docs/navigation.js`, and the current docs pages.
- [x] Create `apps/www/src/lib/docs/markdown.js` with pure helpers:
  - `createComponentMarkdown(component)`
  - `createContentMarkdown({ title, description, sections })`
  - `createSkillsMarkdown()`
  - `createLlmsTxt({ baseUrl })`
- [x] Include component title, description, status, category, foundation, install command, imports, anatomy, particle count, and source caveats.
- [x] Keep output concise and stable so tests can snapshot meaningful fragments.

## Task 2: Raw Markdown Routes

- [x] Add `.md` SvelteKit server routes for component and resource pages.
- [x] Return `text/plain; charset=utf-8`.
- [x] Return 404 for unknown component slugs or unsupported docs slugs.
- [x] Ensure `/docs/components/button.md` and `/docs/skills.md` work locally.

## Task 3: `/llms.txt`

- [x] Implement `/llms.txt` in the COSS UI style:
  - product heading
  - short description
  - Overview links
  - Components links
  - Resources links
- [x] Link to `.md` URLs, not HTML pages.
- [x] Include `Skills` as a resource once the page exists.
- [x] Use metadata order consistently; alphabetical component order is acceptable because current docs already sort that way.

## Task 4: Docs UI Integration

- [x] Update Copy Markdown in component docs to use shared Markdown generation.
- [x] Update generic content pages to use shared Markdown where the page content is metadata-backed.
- [x] Expand `/docs/llms` into a resource page that points to `/llms.txt`, raw Markdown routes, and the Skills page.
- [x] Add `/docs/skills` with install guidance for the future `johannhipp/skills` PR.
- [x] Add "Working with LLMs" to Getting Started, modeled after COSS UI but specific to `coss-svelte`.

## Task 5: `coss-svelte` Tests

- [x] Add `tests/agent-docs.test.mjs`.
- [x] Assert every component in `componentMetadata` appears in `/llms.txt` as `/docs/components/<slug>.md`.
- [x] Assert raw Markdown helpers return install, usage/imports, anatomy, status, and foundation sections.
- [x] Assert navigation exposes both `LLMs` and `Skills` resources.
- [x] If `/llms.txt` is static, add a `--check` path to `scripts/generate-agent-docs.mjs` and test that it passes. Dynamic `/llms.txt` was chosen, so no static sync script is required.
- [x] Run:

```bash
cd coss-svelte
pnpm test
pnpm check
```

Expected result: both commands pass.

## Task 6: Prepare the `johannhipp/skills` Workspace

- [x] Locate an existing local `johannhipp/skills` checkout or clone it into a temporary working directory.
- [x] Inspect its skill layout, validation scripts, and metadata conventions before creating files.
- [x] Create branch `johann/coss-svelte-skill`.
- [x] Do not change unrelated skills.

## Task 7: Create the `coss-svelte` Skill

- [x] Create `coss-svelte/SKILL.md` using COSS UI's skill structure as the model.
- [x] Frontmatter:
  - `name: coss-svelte`
  - description triggers on Svelte, SvelteKit, Bits UI, `coss-svelte`, COSS-style components, migration from React COSS/shadcn/Radix assumptions, forms, overlays, selection controls, and styling.
- [x] Body sections:
  - what the skill is for
  - source of truth
  - out of scope
  - principles for agent output
  - critical usage rules
  - rule references
  - component discovery
  - usage workflow
  - installation reference
  - high-risk primitives
  - output checklist
- [x] Replace all COSS React assumptions with Svelte-specific guidance:
  - Svelte 5 snippets and component syntax
  - Bits UI foundations
  - `coss-svelte` package imports
  - no React/Base UI source copying
  - no `asChild`/`render` assumptions unless a `coss-svelte` component actually supports an equivalent API

## Task 8: Create Skill References

- [x] Generate or hand-author `references/component-registry.md` from `componentMetadata`.
- [x] Create `references/cli.md` with current local install and development commands.
- [x] Create rules references for styling, composition, forms, and migration.
- [x] Create primitive references for stable, experimental, and deferred components.
- [x] Each primitive reference includes:
  - purpose
  - status
  - import names
  - minimal Svelte usage
  - anatomy
  - composition rules
  - common pitfalls
  - relevant docs URL from `coss-svelte`
- [x] Mark `Drawer`, `Sidebar`, and `Toast` as experimental and `NumberField` as deferred.

## Task 9: Validate and Open the Skills PR

- [x] Run the skills repo validation command if one exists. No built-in validator exists; a structural Node validation checked the generated package.
- [x] Manually inspect `SKILL.md` and references for React-specific leakage.
- [x] Commit only the new `coss-svelte` skill files.
- [x] Push branch `johann/coss-svelte-skill`.
- [x] Open a PR against `johannhipp/skills`.
- [x] Capture the PR URL for the `coss-svelte` docs update if the docs page should link directly to it before merge. PR: https://github.com/johannhipp/skills/pull/1. Docs use the stable repo-level install command.

## Task 10: Final Cross-Repo Verification

- [x] Confirm `coss-svelte` docs point to the correct `johannhipp/skills` install path.
- [x] Confirm `/llms.txt` points to raw `.md` routes that resolve locally.
- [x] Confirm Copy Markdown output matches the raw Markdown route for at least one component page.
- [x] Confirm tests pass in `coss-svelte`.
- [x] Confirm the skills PR contains only the intended skill package.

## Execution Notes

- Keep COSS UI similarity in shape, not implementation internals.
- Prefer generated docs from metadata where the repo already has structured metadata.
- Keep skill references concise; use progressive disclosure instead of one giant `SKILL.md`.
- Avoid creating a separate particles skill until `coss-svelte` has real registry-backed Svelte particle manifests.
- Do not implement any of this plan until the user explicitly asks to start execution.
