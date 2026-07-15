# First Public Release Readiness Plan

Status: planning only
Target: first public `coss-svelte` release
Recommended version: `0.1.0`

## Purpose

This document turns the current repository audit into a staged plan for making the Svelte component library safe to publish, understandable to consumers, and maintainable after the first public release.

The first release should establish a trustworthy package contract. It does not need to claim complete parity with upstream COSS UI, a finished CLI, or a fully mature design system. It does need to make every advertised installation path work in a clean external project.

## Current baseline

The repository is currently on `main` at `510e234`, with a clean worktree. The existing internal release gate passes:

- Biome CI passes, with one existing warning in the theme stylesheet.
- Svelte checks pass for the workspace applications.
- The existing test suite passes: 68 tests.
- Package dry-run succeeds for `coss-svelte@0.0.0`.
- The package contains 256 component files and exports the same 256 component names from its JavaScript entry point.
- The documented component scope is 50 stable components, 3 experimental components (`Drawer`, `Sidebar`, `Toast`), and 1 deferred component (`NumberField`).

The public-release surface is not yet live or verifiable:

- The GitHub repository is private and has no releases or tags.
- `coss-svelte` is not published on npm.
- No deployment target is configured in the repository for `apps/www`.
- The expected `coss-svelte.dev` host was not publicly resolvable during the audit.

The most important distinction is that the monorepo is internally coherent in several places, but the clean-consumer paths have not yet been proven. A production-ready release must test the package, theme, registry, and docs from outside the workspace.

## Release position to adopt

Before implementation begins, agree on this public contract:

- Release `coss-svelte@0.1.0`, not `1.0.0`. The scope and implementation notes still describe experimental and deferred areas.
- Treat the npm package as the primary distribution path.
- Keep `Drawer`, `Sidebar`, and `Toast` available but clearly marked experimental in metadata and documentation.
- Keep `NumberField`, the CLI, full particle parity, and additional presets out of the first stable promise.
- Decide explicitly whether the theme is a required second package, a bundled stylesheet, or a generated consumer stylesheet. The current docs describe it as required, but `@coss-svelte/theme` is private and its CSS is not currently consumer-safe.
- Decide whether the registry is a supported public installation path for `0.1.0`. If it is not ready, label it preview-only or defer it rather than presenting a broken generated API.
- Define the supported environment matrix: Node, pnpm/npm, Svelte, SvelteKit, Tailwind, browser support, and whether non-SvelteKit Svelte consumers are supported.

## Work phases

### Phase 0: Freeze the release contract

Write down the decisions that every later phase depends on.

- Define the stable, experimental, and deferred component lists.
- Define the supported Svelte and Bits UI version ranges.
- Decide whether the package is source-distributed or compiled. The current tarball ships raw `.svelte` and JavaScript source, so verify that this is intentional and works in Vite, SvelteKit, and other supported bundlers.
- Decide whether consumers must install Tailwind CSS and whether the library supports Tailwind v4 only.
- Decide how styles are delivered:
  - package CSS import;
  - separate public theme package;
  - generated registry CSS; or
  - some combination with explicit boundaries.
- Decide whether registry-generated items are a supported product surface for the first release.
- Define the support policy for experimental components and the first supported version range.
- Record any dependency or implementation-strategy changes in the version baseline and component implementation outline required by the repository rules.

Deliverable: a short, authoritative release contract referenced by the README, package README, docs site, metadata, and release notes.

### Phase 1: Make the npm package a real external package

The package metadata in `packages/coss-svelte/package.json` is close to publishable, but the package must be validated from a clean consumer project.

- Set the first package version and ensure the changelog and release notes agree with it.
- Verify `name`, `repository`, `bugs`, `homepage`, keywords, license, engine constraints, and public access settings.
- Decide whether `coss-svelte` should remain unscoped or move to a scoped name before publishing. Make this decision before the first release because npm package renaming is disruptive.
- Review the `exports` map for the root package and metadata subpath. Add correct type conditions for every public subpath.
- Replace the broad `AnyComponent` declarations in `src/index.d.ts` with useful component-specific prop and event types, or generate declarations from the actual Svelte sources. Consumers should receive autocomplete and type errors for public props instead of `Record<string, unknown>`.
- Ensure the metadata module has a matching declaration file and that TypeScript, Svelte language tooling, and common bundlers resolve it.
- Audit dependency placement:
  - keep runtime dependencies that the distributed source actually imports;
  - keep `svelte` and `bits-ui` as peer dependencies if that remains the intended contract;
  - remove unused dependencies such as `tailwind-variants` if they are not part of the published runtime;
  - document why every peer dependency is required.
- Verify the package works with npm, pnpm, and a normal SvelteKit install where practical, not only through workspace aliases.
- Add an automated pack-content assertion: no workspace-only files, ignored upstream cache, credentials, private package references, or repository-relative paths may enter the tarball.
- Consider adding a package build step if source distribution causes compatibility or performance problems. If source distribution remains intentional, document the required consumer toolchain.

Required proof:

1. Pack the package.
2. Create a clean temporary SvelteKit consumer.
3. Install the tarball plus its declared peer dependencies.
4. Import representative components and metadata.
5. Run type checking, development build, production build, SSR, and browser smoke tests.

### Phase 2: Make styling and theming consumer-safe

This is a first-release blocker because the documented install path depends on theme behavior that currently lives in a private package.

- Decide whether `@coss-svelte/theme` becomes public. If it does:
  - give it a real version and public package metadata;
  - publish it as part of the same release train;
  - document installation and upgrade compatibility;
  - add it to the external-consumer fixture.
- Remove repository-relative assumptions from published CSS. The current theme uses `@source` paths that point into the monorepo, so they cannot be assumed to resolve in an installed package.
- Separate library theme CSS from docs-only helper styles. The theme currently includes `.docs-*` rules and repository-specific source globs.
- Define the supported Tailwind contract, including whether consumers must add their own source globs and which files need to be scanned.
- Ensure all classes emitted by the library have a documented and reproducible style path.
- Reconcile the theme variable set with the registry variable set. The registry currently exposes only a subset of the variables present in the theme.
- Decide whether `cn-*` placeholder classes are part of the public contract or an internal intermediate representation. If they remain public, document their purpose and validate them in a clean consumer.
- Test custom themes, dark mode, CSS ordering, content scanning, and production purging.
- Add a no-workspace fixture that proves the package still renders correctly after installation from a tarball.

Required proof: a fresh application can install the documented dependencies, import the documented CSS, render a representative component set, and produce the expected styles in a production build without access to this repository.

### Phase 3: Harden component behavior, accessibility, and API quality

The internal static tests are useful but do not yet prove runtime behavior. The first public release needs a browser-level quality bar.

- Add browser tests for representative component families:
  - buttons and links;
  - inputs, labels, fields, validation, and form controls;
  - dialogs, drawers, popovers, menus, and tooltips;
  - tabs, accordions, collapsibles, and navigation;
  - selects, comboboxes, date pickers, and other Bits UI wrappers;
  - tables, cards, badges, and layout primitives.
- Test SSR output and hydration with representative interactive components.
- Test keyboard navigation, focus management, Escape handling, disabled states, loading states, invalid states, and controlled/uncontrolled behavior.
- Add automated accessibility checks where practical and manually verify the highest-risk overlays and form controls with a screen reader and keyboard-only navigation.
- Resolve the mismatch between the Field decision record and implementation. `Field.svelte` currently renders state and helper content but does not appear to complete the documented `id`, `aria-describedby`, and `aria-invalid` wiring.
- Verify labels and descriptions remain associated when components are nested, repeated, conditionally rendered, or used with custom controls.
- Verify portal/overlay behavior under SSR, nested dialogs, scroll locking, viewport changes, and reduced motion.
- Verify events, snippets, bindings, and public prop names are consistent across component families.
- Add runtime tests for components currently marked experimental and make their limitations visible in metadata and docs.
- Decide whether all 256 source components are intended to be public exports. If not, reduce the public entry point or clearly separate internal parts from supported components.
- Check naming consistency, file casing, import paths, and whether deep imports are intentionally supported.

Release rule: a component should not be called stable solely because it exists in the source tree. It should have a documented API, runtime smoke coverage, accessibility coverage appropriate to its role, and a clean-consumer example.

### Phase 4: Make the registry a supported product surface or explicitly defer it

The generated registry is currently useful as an internal artifact, but there are consumer-path gaps that must be resolved before advertising it.

- Fix registry items that import `../utils.js` without shipping `utils.js`. Most generated component files currently have this dependency.
- Ensure every registry item includes all local files it needs, including utilities, shared parts, styles, and types where applicable.
- Make dependency metadata complete. A registry item should declare every external package it imports, not only selected Bits UI components.
- Decide whether registry output contains placeholder classes or resolved Tailwind classes. Keep the output and docs consistent with the chosen model.
- Replace upstream COSS documentation URLs if the local registry is meant to be hosted by this project.
- Provide the registry index and schema at URLs that the deployed site actually serves. The current docs reference a local schema and registry host, while some app code still points to the upstream `coss.com` registry.
- Decide whether registry source files are copy/paste artifacts, installable files, or both. Document the exact workflow.
- Add a clean-registry-consumer test that downloads the index and a representative set of item JSON files, writes them into a fresh app, installs declared dependencies, and builds the app.
- Add schema validation for generated JSON and verify deterministic output.
- If these requirements cannot be completed for `0.1.0`, remove registry installation from first-release messaging and label the generated output experimental.

### Phase 5: Make the documentation site deployable and trustworthy

`apps/www` uses `adapter-node` and targets a standard Node server deployment.

- Document the Node runtime and `node build`/`node build/index.js` deployment
  commands in the docs release checklist.
- Build the site in CI using the same command and environment as production.
- Add a deployment preview and production smoke test for:
  - the root redirect;
  - introduction and getting-started pages;
  - representative component pages;
  - dynamic docs routes;
  - registry routes and schema URLs;
  - `llms.txt` if it remains public;
  - 404 behavior.
- Add standard site metadata: favicon, canonical URLs, Open Graph/Twitter metadata, robots policy, sitemap, and a clear project description.
- Verify code examples use the exact install and import paths that a clean consumer uses.
- Remove or clearly distinguish internal/demo-only examples from public installation instructions.
- Fix the current production bundle warning or document why it is acceptable. The docs build emitted a client chunk around 633 kB before gzip and should be profiled for unnecessary registry, icon, font, or page-wide imports.
- Test mobile layout, keyboard navigation, reduced motion, dark mode, deep links, refreshes, and copy buttons on the deployed site.
- Add uptime/error monitoring appropriate to the chosen host, even if only lightweight deployment logs and a broken-link check are used initially.

### Phase 6: Prepare the public GitHub repository and project governance

Before making the repository public, treat the full git history and repository configuration as public.

- Scan the complete history and current files for tokens, credentials, private URLs, local paths, caches, screenshots, and downloaded upstream material.
- Confirm ignored `.cache/upstream` content is not present in git history or release artifacts.
- Review copyright, license, attribution, trademark, and provenance obligations for any copied ideas, assets, fonts, icons, or generated examples.
- Make the GitHub repository public only after the repository and history are ready.
- Add repository-level issue templates and pull request templates.
- Add `CODEOWNERS` if there is more than one maintainer or if sensitive release files need explicit review.
- Configure branch protection or rulesets for the default branch once the repository plan supports it.
- Require CI checks before merging and prohibit direct pushes where appropriate.
- Enable Dependabot or an equivalent dependency update process.
- Decide whether GitHub Discussions, issue labels, and a support channel are part of the public support model.
- Update `SECURITY.md` with the actual supported-version policy and a working private-reporting path after the repository is public.
- Update the README so it no longer says “not published” once publication occurs and so the first-release scope is explicit.

### Phase 7: Build a release-quality CI and release process

The current CI covers formatting, checks, tests, and package dry-run, but it does not yet cover the full public-release contract.

Add or plan CI jobs for:

- frozen dependency installation;
- Biome CI with zero new warnings;
- workspace type checks;
- unit and static contract tests;
- package build and tarball inspection;
- clean external-consumer install from the tarball;
- theme installation and production CSS verification;
- registry generation, schema validation, and clean registry consumer build;
- docs application build with the selected adapter;
- browser smoke tests and accessibility checks;
- broken-link and metadata checks;
- production dependency audit and license review.

Define release controls:

- Keep npm publishing out of ordinary pull-request CI.
- Use a documented manual release procedure initially, or adopt npm trusted publishing/OIDC after the workflow is understood and tested.
- Require a release commit, changelog entry, version/tag agreement, and successful release gates before publishing.
- Use immutable tags such as `v0.1.0` and publish GitHub release notes from the same commit.
- Decide who can publish to npm and who can create GitHub releases.
- Keep a rollback procedure: npm deprecation guidance, patch release process, GitHub release correction, and docs rollback.
- Consider Changesets or another versioning tool once multiple public packages are released together. Do not introduce it merely for the first release unless it reduces risk immediately.

### Phase 8: Resolve dependency and security findings

The audit found a low-severity `cookie` advisory through the SvelteKit dependency tree. It is not a release-stopping high or critical finding, but it should be handled deliberately.

- Check whether the patched version is available through an updated SvelteKit or transitive dependency.
- Record the decision if the advisory cannot be upgraded before release.
- Define the severity policy for release blocking.
- Run production-only audits against the package and the docs application separately.
- Review license compatibility for runtime and peer dependencies.
- Review the published tarball for accidental source maps, test fixtures, internal docs, or environment data.
- Ensure error pages and generated docs do not expose local filesystem paths or build-time secrets.

### Phase 9: Run a release candidate rehearsal

Before the final release, rehearse the entire process with a release candidate or a private tarball.

- Create a clean external SvelteKit app outside this repository.
- Install the exact package tarball, theme package if applicable, and declared peers.
- Exercise the stable component matrix and at least one experimental component.
- Validate TypeScript/Svelte language tooling, SSR, hydration, styles, keyboard behavior, and production build output.
- Download and consume registry artifacts if they are in scope.
- Deploy the docs site to a preview environment and test deep links and generated URLs.
- Verify the package’s README instructions line by line against the clean app.
- Review the generated tarball, GitHub release draft, changelog, docs version, and npm metadata together.
- Run the release checklist from a fresh checkout to avoid workspace-only assumptions.

Exit criteria for the rehearsal: an external user can follow the documented instructions without knowledge of the monorepo, private packages, ignored caches, or local path aliases.

### Phase 10: Execute the first public release

Recommended order:

1. Merge the release-readiness work into the default branch.
2. Confirm the worktree and CI are clean from a fresh checkout.
3. Update package versions, changelog, documentation, metadata, and support policy in one intentional release change.
4. Run the complete release gate and record its result.
5. Create and push the immutable `v0.1.0` tag.
6. Create the GitHub Release with installation instructions, scope, known limitations, and migration/support notes.
7. Deploy the docs site and verify production URLs before announcing them.
8. Publish npm packages in dependency order, if more than one package is public.
9. Verify npm metadata, tarball contents, install instructions, and a fresh external install.
10. Verify docs package links, registry endpoints, and GitHub links.
11. Announce the release only after all three public surfaces agree: GitHub, npm, and the deployed website.

The first release announcement should clearly state what is stable, what is experimental, what is deferred, supported versions, styling requirements, and how to report security issues.

## First-release blockers

These should be treated as blockers for calling the library production-ready:

- The documented npm install does not work in a clean external app.
- Public types are effectively `AnyComponent` and do not provide useful prop checking.
- The required theme package is private or depends on repository-relative paths.
- Registry items omit required local files or dependencies while being advertised as installable.
- `Field` and other form primitives do not satisfy their documented accessibility contract.
- No browser-level verification exists for interactive overlays, forms, and focus behavior.
- The docs site has no explicit production adapter or its public URLs are not verifiable.
- The package, tag, changelog, docs, and GitHub release disagree about version or scope.
- The repository or history contains credentials, ignored upstream material, or unreviewed third-party assets.

## Good candidates to defer

The following are reasonable post-`0.1.0` work unless they are necessary to make an advertised path honest:

- Full CLI implementation.
- Full Drawer, Sidebar, and Toast parity; these can remain experimental.
- NumberField.
- Complete particle/example parity.
- Multiple theme presets.
- Form-library adapters.
- Pixel-perfect parity with upstream React components.
- Broad gesture support and advanced browser/device matrices.
- Automated npm publishing before the manual process has been rehearsed.

## Definition of done

The first public release is ready when all of the following are true:

- A clean external Svelte/SvelteKit app can install the published tarball and follow the README successfully.
- Public exports, metadata, subpath exports, and TypeScript/Svelte types resolve correctly.
- Styling works without monorepo paths, private workspace packages, or undocumented setup.
- Stable components have documented APIs and runtime coverage appropriate to their behavior.
- Forms, overlays, focus management, keyboard behavior, SSR, and hydration have been tested.
- Experimental and deferred scope is visible in metadata, docs, and release notes.
- Registry output is either fully consumable and hosted or explicitly excluded from the stable promise.
- The docs site has an explicit deployment target, working deep links, correct metadata, and production smoke coverage.
- CI exercises the package, consumer, registry, docs, browser, accessibility, and security paths.
- High and critical dependency/security findings are resolved or explicitly accepted with a documented reason.
- The public GitHub repository has clean history, governance files, support guidance, and release automation boundaries.
- The GitHub tag/release, npm package metadata, changelog, and deployed docs all identify the same release.

## Files and systems to keep synchronized

The implementation work should regularly cross-check these surfaces:

- [`packages/coss-svelte/package.json`](../packages/coss-svelte/package.json)
- [`packages/coss-svelte/src/index.js`](../packages/coss-svelte/src/index.js)
- [`packages/coss-svelte/src/index.d.ts`](../packages/coss-svelte/src/index.d.ts)
- [`packages/coss-svelte/src/metadata.js`](../packages/coss-svelte/src/metadata.js)
- [`packages/coss-svelte/README.md`](../packages/coss-svelte/README.md)
- [`packages/theme/package.json`](../packages/theme/package.json)
- [`packages/theme/src/style-coss.css`](../packages/theme/src/style-coss.css)
- [`packages/registry/src/index.js`](../packages/registry/src/index.js)
- [`apps/registry/static/r/index.json`](../apps/registry/static/r/index.json)
- [`apps/www/svelte.config.js`](../apps/www/svelte.config.js)
- [`apps/www/src/routes`](../apps/www/src/routes)
- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)
- [`docs/release.md`](release.md)
- [`CHANGELOG.md`](../CHANGELOG.md)
- [`SECURITY.md`](../SECURITY.md)

## Audit limits

This plan is based on repository inspection, local build/check/test execution, package dry-run inspection, npm/GitHub metadata checks, and a deployment-host check. No source or configuration implementation changes were made while producing it.

The actual deployed website could not be visually inspected because no publicly verifiable deployment was available at audit time. A manual screen-reader/device matrix and a real external consumer installation still need to be performed during the implementation phases above.
