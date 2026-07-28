# First Public Release Readiness Plan

Status: implementation in progress; publishing and deployment are intentionally deferred

Target: first public `coss-svelte` release, recommended as `0.1.0`

Last reconciled with the repository: 2026-07-28.

## Purpose and boundary

This is the active plan for turning the repository into a production-ready component library. It distinguishes work that can be completed while implementation is still changing from actions that must wait for the final release decision.

The first public release promises an honest, documented Svelte component library with a reproducible install path. It does not promise full upstream parity, a finished CLI, or that every experimental component is stable.

Do **not** publish to npm, create a GitHub release or tag, make the repository public, or deploy the docs site as part of this readiness work. Those are separate, explicit final-release actions listed below.

## Work completed since the original audit

- [x] The package and getting-started instructions install `coss-svelte`, `bits-ui`, and `@coss-svelte/theme`, then import `@coss-svelte/theme/style-coss.css` from the consumer's global stylesheet.
- [x] The docs app imports the public theme entry point, so it exercises the documented styling contract rather than only local CSS.
- [x] The package README describes the actual published `dist` contents.
- [x] The registry declares the theme dependency and the CSS import contract for non-deferred components.
- [x] Registry documentation URLs point to local component documentation rather than upstream COSS URLs.
- [x] Registry source-closure generation includes every resolved local file and preserves `.ts` targets for TypeScript helpers. Generated registry output is regenerated and checked for drift.
- [x] The docs server serves generated registry items at `/r/*` and schemas at `/schema/*` from `apps/registry/static`; `/llms.txt` and representative registry/schema routes have production-server smoke coverage.
- [x] A clean temporary SvelteKit fixture packs the component and theme packages, installs only the tarballs and declared dependencies, writes generated registry copies of Button, Number Field, and Context Menu, then runs Svelte type checking and a production Vite build.
- [x] A real Chromium smoke test runs against the built adapter-node docs server. It verifies hydration, theme switching, command-dialog keyboard dismissal, Preview/Code behavior, Number Field and Context Menu interactions, 390px layouts, reduced motion, and no serious or critical axe WCAG violations on its audited routes and states.
- [x] The browser check found and corrected a dark-mode contrast failure in the introductory notice.
- [x] CI remains non-publishing and now runs the complete `pnpm release:check` gate after installing Chromium.
- [x] Package declarations are generated from real Svelte component sources,
  checked for broad escape hatches, and exercised by an external type consumer.
- [x] Field label, description, error, invalid, required, disabled, SSR, and
  hydration associations have focused runtime coverage.
- [x] Generated registry JSON has deterministic build/check coverage, complete
  source-closure tests, and served schema smoke checks.
- [x] Docs examples have one executable source per implemented component, and
  Markdown/source views consume the same files.
- [x] Sidebar provider state and the basic Toast provider/manager lifecycle
  have focused runtime tests while remaining explicitly experimental.
- [x] The current docs bundle warning is accepted behind the maintained
  `pnpm docs:bundle-report` 700 kB safety threshold.
- [x] Canonical metadata, package source/exports/declarations, examples,
  registry items, and built HTML/Markdown routes agree on 55 roots: 52 stable,
  3 experimental, and none deferred.

## Remaining implementation work before release freeze

### 1. Lock the public contract

- [ ] Confirm the release version, package names, and whether `coss-svelte` remains unscoped before any public publication. Package renames after the first release are disruptive.
- [ ] Write the supported environment matrix: Node and package-manager versions, Svelte, Bits UI, SvelteKit/Vite, Tailwind v4, and supported browser policy.
- [x] Record the 52 stable roots, experimental `Drawer`, `Sidebar`, and `Toast`,
  and the absence of deferred canonical roots in docs and metadata. Final
  release-note wording remains part of the release freeze.
- [ ] Decide whether registry installation is supported at `0.1.0` or explicitly experimental. The generated output is now consumable in a clean fixture, but its support promise still needs a product decision.
- [ ] Confirm source distribution is intentional and document the bundler expectations for consumers outside SvelteKit.
- [ ] Update `docs/references/version-baseline.md` and `docs/scope/component-implementation-outline.md` whenever final dependency versions or component strategies change.

### 2. Complete package and theme quality

- [x] Generate component declarations from the real Svelte sources and reject
  broad handwritten component escape hatches.
- [x] Exercise public package exports and component prop types through the
  external TypeScript/Svelte consumer fixture; deep imports remain unsupported.
- [ ] Verify npm, pnpm, and the supported SvelteKit install path. The current clean fixture proves pnpm; add another package-manager fixture only if it changes the supported claim.
- [ ] Review runtime versus peer dependencies and remove unused published dependencies. Document why `svelte` and `bits-ui` are peers.
- [ ] Confirm `@coss-svelte/theme` can be claimed and published under the intended npm scope, has a final version, and remains synchronized with `coss-svelte`.
- [ ] Test CSS ordering, custom themes, dark mode, Tailwind scanning/purging, and production styling with representative components. Keep docs-only styles out of the published theme contract.
- [ ] Review the npm tarballs one final time for ignored caches, repository-only paths, source maps, credentials, tests, and unintended files.

### 3. Raise component behavior and accessibility coverage

- [ ] Add focused browser tests for the remaining representative button/link,
  form, overlay, navigation, selection, and layout families. The current browser
  smoke protects the docs shell, Preview/Code, Number Field, and Context Menu;
  it is not a substitute for the remaining component-family coverage.
- [ ] Expand SSR and hydration coverage beyond the existing package, Field, and
  docs smoke paths to include a representative interactive overlay.
- [ ] Test keyboard navigation, focus restoration, Escape behavior, disabled/invalid/loading states, controlled and uncontrolled bindings, and portal/scroll-lock behavior where applicable.
- [x] Resolve and test the documented `Field` association contract (`id`,
  label, description, `aria-describedby`, `aria-invalid`, explicit IDs, and
  repeated fields) across runtime, SSR, and hydration.
- [ ] Manually verify the highest-risk overlays and form controls with keyboard-only use and a screen reader. Record the tested platform and outstanding limitations.
- [ ] Review experimental component limitations and ensure they are visible wherever those components are documented or listed.

### 4. Finish registry and documentation product work

- [x] Validate generated registry structure and source closure
  deterministically, serve the registry schemas, and smoke-test the production
  schema routes.
- [x] Exercise Button, the custom multi-part Number Field, and the Bits-backed
  multi-part Context Menu registry items together in the clean fixture.
- [ ] Document the supported registry workflow: how a consumer downloads an item, writes files, installs dependencies, imports the theme, and updates copied code.
- [ ] Confirm public documentation examples match the external fixture's exact commands and import paths line by line.
- [x] Accept the current docs client-chunk warning temporarily and monitor it
  with the maintained bundle report and 700 kB threshold.
- [ ] Add standard site metadata and policy before deployment: canonical URL, favicon, Open Graph/Twitter metadata, robots, sitemap, 404 behavior, and a concise project description.
- [ ] Complete the final docs-wide mobile, reduced-motion, dark-mode,
  deep-link, copy-control, and broken-link review. Automated coverage already
  protects the high-risk Number Field and Context Menu routes.

### 5. Repository governance and security

- [ ] Review the complete git history and current tree for credentials, local paths, private URLs, ignored upstream snapshots, generated media, and third-party asset provenance.
- [ ] Confirm copyright, licensing, attribution, trademark, font, icon, and upstream-reference obligations.
- [ ] Add or finalize issue templates, pull-request template, labels/support guidance, `CODEOWNERS` if applicable, and a maintainer ownership model.
- [ ] Define branch protection/rulesets and required CI checks for the public default branch.
- [ ] Enable Dependabot or an equivalent dependency-update process.
- [ ] Update `SECURITY.md` with the actual supported-version policy and a working private-report channel once public reporting infrastructure exists.
- [ ] Run production dependency audits and a license review. Resolve high/critical findings or record an explicit, reviewed exception; reassess the existing low-severity transitive `cookie` advisory when dependencies change.

## Explicitly deferred until final changes are complete

These are required release activities, but they must not happen while the component surface is still changing.

- [ ] Freeze final component/API/theme changes and update changelog, READMEs, docs, metadata, and version baselines together.
- [ ] Select final versions for **both** publishable packages and update the changelog/release notes.
- [ ] Run `pnpm install --frozen-lockfile` and `pnpm release:check` from a fresh checkout; archive the results with the release record.
- [ ] Rehearse a release candidate in a fresh external SvelteKit project using the exact packed tarballs, then review SSR, hydration, styles, browser behavior, and registry installation.
- [ ] Deploy the docs app to a preview environment using its adapter-node contract; test deep links, `/r/*`, `/schema/*`, `llms.txt`, 404s, metadata, and browser smoke against that preview.
- [ ] Choose and configure the production host, custom domain, TLS, environment variables, uptime/error monitoring, rollback path, and deployment ownership.
- [ ] Make the GitHub repository public only after the history/governance review; configure branch protection and repository security settings.
- [ ] Create the intentional release commit, immutable `v0.1.0` tag, and GitHub Release from the same verified commit.
- [ ] Publish `@coss-svelte/theme` before `coss-svelte` if the public package contract requires it; use manual maintainer publication, never ordinary CI.
- [ ] Verify npm metadata, contents, README instructions, and a fresh external install after publishing.
- [ ] Deploy the verified docs production build and verify that GitHub, npm, registry/schema URLs, and the hosted site identify the same release.
- [ ] Announce only after all public surfaces agree on scope, supported versions, experimental status, theme requirements, and security reporting.

## Product scope deliberately deferred beyond `0.1.0`

These items remain out of the stable first-release promise unless an implementation change makes one necessary for an advertised path.

- [ ] Full CLI implementation and automated npm publishing.
- [ ] Full Drawer, Sidebar, and Toast parity; they remain experimental.
- [ ] Complete particle/example parity and additional presets.
- [ ] Form-library adapters.
- [ ] Pixel-perfect parity with upstream React components.
- [ ] Broad gesture support and an advanced device/browser matrix.

## Release gate and evidence

Run the following while implementation continues:

```sh
pnpm install --frozen-lockfile
pnpm release:check
```

`release:check` is intentionally non-publishing. It verifies package declarations and contents, formatting, workspace checks, generated package/scope/registry/theme/example contracts, type and clean-consumer fixtures, unit/SSR tests, built docs routes and registry assets, production Chromium/axe smoke coverage, and the npm pack dry run.

Before changing publish-facing files, also inspect [`docs/release.md`](release.md), [`CHANGELOG.md`](../CHANGELOG.md), [`SECURITY.md`](../SECURITY.md), the package manifests, and [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## Ready-to-cut criteria

The project is ready to begin the deferred final-release sequence only when every remaining implementation item that applies to the chosen public contract is checked off, the release gate passes from a fresh checkout, and no undocumented limitation would surprise an external user. The actual tag, publication, deployment, and announcement remain separate approval steps.
