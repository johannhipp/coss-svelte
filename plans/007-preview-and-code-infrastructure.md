# Plan 007: Harden docs motion, in-page navigation, and Preview/Code infrastructure

## Status

- **Status**: IN PROGRESS — Preview/Code and production routes are verified;
  route-motion, TOC, and copy-rail browser evidence remains
- **Priority**: P0
- **Effort**: M/L
- **Risk**: MED
- **Depends on**: none
- **Category**: docs, motion, accessibility, production runtime
- **Planned at**:
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Apply the Introduction's restrained entrance motion to every normal sidebar
destination, make "On This Page" links scroll rather than jump, make component
documentation routes work from the built Node server, and upgrade Preview/Code
to the current COSS presentation while retaining real Svelte Tabs semantics and
exact Svelte source.

This plan is a prerequisite for the Number Field and Context Menu vertical
slices. Neither is shippable if its production docs page fails before rendering
the preview.

## Baseline failure and live reconciliation state

At the planning baseline, `apps/www/src/lib/examples/source.server.ts`
contained:

```ts
import { readFile } from "node:fs/promises";

return readFile(new URL(`${metadata.slug}.svelte`, import.meta.url), "utf8");
```

This works while source files are adjacent to the module in development. In the
adapter-node build, `import.meta.url` resolves inside
`apps/www/build/server/chunks`, and the original `.svelte` examples are not
copied there. The resulting `ENOENT` causes every implemented component page to
return 500.

`scripts/smoke-docs-server.mjs:42` waits only for `/docs/introduction`, and the
browser smoke script also stays on the introduction page. Both therefore report
success while component routes are broken.

At the baseline, the preview UI in
`apps/www/src/lib/components/docs/component-preview-tabs.svelte` has the correct
basic pieces, but:

- the surface is 420 pixels rather than the COSS 450-pixel presentation;
- its visual hierarchy is a generic Tabs card rather than a docs-specific
  preview frame;
- the code block adds its own border/radius inside the preview border;
- long code and preview panels do not share an explicit height/overflow
  contract;
- production tests do not prove that the Code tab contains the same `.svelte`
  source that rendered the preview.

The live worktree now contains an uncommitted partial implementation:

- `source.server.ts` uses a typed eager `?raw` glob;
- CodeBlock has `standalone`/`embedded` modes;
- Preview/Code has a docs-specific frame and `align` prop;
- example/export counts derive from metadata;
- shared `.docs-page-flow` entrance styles now reuse the Introduction keyframes
  in ContentPage and keyed component pages;
- DocsToc intercepts unmodified hash links and chooses smooth/auto
  `scrollIntoView` from the reduced-motion preference;
- the live production server script already attempts an all-component crawl
  and the browser script attempts Preview/Code plus new-component canaries;
- current source-level tests only prove that the Introduction uses its motion
  classes; route-to-route replay and reduced-motion behavior are not proven;
- the TOC handler has no browser proof for history, final offset, smooth motion,
  reduced motion, or progressive anchor behavior;
- the current copy control is opaque and absolutely positioned, but uses a
  one-sided shadow rather than a proven protected rail;
- the long-line/copy-button treatment has not yet been proven geometrically in
  a browser.

Treat correct live work as retained implementation. Do not replace it merely
because the code differs from snippets in this plan.

## Design Decisions

1. **Reuse one restrained page entrance.** The Introduction establishes the
   motion: opacity plus a 0.375rem rise over 420ms with the shared ease-out.
   Apply it to route-level content groups, not every nested text node or
   interactive state change.
2. **Keep in-page navigation local.** Intercept only same-page, unmodified hash
   links with an existing target. Preserve real `href` fallback and use
   `scrollIntoView`; do not set global smooth scrolling.
3. **Respect reduced motion.** Page entrance becomes no animation and TOC
   navigation becomes immediate when `prefers-reduced-motion: reduce`.
4. **Bundle example source through Vite.** Use one eager `?raw` glob in the
   server-only module. Do not read source from the runtime filesystem.
5. **Keep one source of truth.** `apps/www/src/lib/examples/<slug>.svelte`
   remains both the executable module and the text shown in Code.
6. **Keep real tabs.** Continue using `Tabs`, `TabsList`, `TabsTrigger`, and
   `TabsContent` from `coss-svelte`; do not reproduce the React component’s
   custom active-panel machinery.
7. **Match the presentation, not the React implementation.** Use a compact
   transparent Preview/Code selector, a rounded 12-pixel bordered surface, a
   450-pixel desktop viewport, centered preview content by default, and an
   embedded scrollable code panel with a copy affordance.
8. **No new syntax-highlighting dependency.** Retain the existing lightweight
   highlighter in this phase. The component source must stay legible and
   copyable even if highlighting is imperfect.
9. **Make catalog tests data-driven.** Remove hardcoded `53` example and `258`
   export counts before adding new roots.
10. **Follow the observed COSS layering, not its React code.** The live COSS
   site places an opaque copy control above a separately scrollable code
   viewport, uses a full-width/max-content pre, and masks scroll edges. Our
   Svelte docs may use simpler CSS, but code must be visually occluded—not
   faintly visible—under the copy control.

## Implementation

### 0. Reconcile and verify the live diff

Inspect:

```bash
git diff -- apps/www/src/lib/examples/source.server.ts \
  apps/www/src/lib/components/docs/code-block.svelte \
  apps/www/src/lib/components/docs/component-preview-tabs.svelte \
  apps/www/src/app.css scripts/smoke-docs-server.mjs \
  scripts/smoke-docs-browser.mjs tests/example-contract.test.mjs \
  tests/package-contract.test.mjs
```

For each following step, keep code that already satisfies the target and add
only missing behavior/tests. Record retained versus newly added work in the
handoff.

### 1. Generalize the proven Introduction entrance

Modify only the shared docs wrappers and styles:

- `apps/www/src/lib/components/docs/content-page.svelte`
- `apps/www/src/lib/components/docs/component-doc-page.svelte`
- `apps/www/src/app.css`

First confirm that the Introduction visibly uses `docs-intro-enter`; this is the
user's condition for generalizing it. Keep that same motion vocabulary:

- opacity `0 -> 1`;
- vertical translation `0.375rem -> 0`;
- 420ms `var(--ease-out)`;
- 60ms top-level staggering, capped at 180ms so long API pages do not make
  readers wait;
- transform/opacity only, so no layout shift.

Apply motion to route-level blocks:

- ContentPage's header and direct content blocks;
- ComponentDocPage's header, Preview/Code, sections, and pagination;
- the Introduction keeps its existing nested `docs-intro-flow` stagger instead
  of receiving the outer animation twice.

Key ContentPage's animated wrapper by its verified-unique page `title`; retain
ComponentDocPage's existing `page.slug` key. This makes sidebar navigation
between routes replay the entrance but does not replay it for Tabs, form edits,
open popups, or other state changes inside the page.

Audit `sidebarGroups`: overview/resource routes must use ContentPage and the
dynamic component route must use ComponentDocPage. `/docs` redirect markup and
the separate Particles browsing surface are not content-animation targets.

Under `prefers-reduced-motion: reduce`, set these route-level animations to
`none`. Because base content has no hidden opacity, the reduced path must render
fully visible on its first frame.

Add browser proof:

1. start on Introduction and follow a real sidebar link to Get Started;
2. inspect direct route-block animations through `Element.getAnimations()` and
   verify the expected duration/keyframe name;
3. wait for their `finished` promises and verify final opacity/transform;
4. navigate to two component slugs and prove the keyed wrapper receives a new
   animation while the old page is gone;
5. repeat in a reduced-motion context and prove no route-block animation runs.

Do not assert an arbitrary sleep or animate every nested paragraph separately.

### 2. Smooth only explicit "On This Page" navigation

Reconcile `apps/www/src/lib/components/docs/docs-toc.svelte`.

Keep every entry as a real `<a href="#section-id">`. For a primary,
unmodified click only:

1. safely decode the fragment and resolve `document.getElementById`;
2. if no target exists, do nothing and allow native navigation;
3. prevent the instantaneous default jump;
4. push a current-page history entry when the hash changes, or replace the
   same hash rather than adding duplicates;
5. call:

   ```ts
   target.scrollIntoView({
     behavior: prefersReducedMotion ? "auto" : "smooth",
     block: "start",
   });
   ```

Targets retain their existing `scroll-margin-top` so the sticky header does not
cover the heading. Do not change focus to the section: the activated TOC link
retains keyboard focus, matching ordinary in-page navigation. Modified clicks,
middle clicks, missing targets, and JavaScript-disabled navigation keep native
anchor semantics.

Do not add global `html { scroll-behavior: smooth }`; that would animate
unrelated history restoration and programmatic scrolling.

Browser proof must:

- click at least two Introduction TOC links;
- record `scrollIntoView` options without replacing its real behavior;
- assert `behavior: "smooth"`, the URL hash, and the final target position
  below the sticky-header offset;
- click the same hash again and prove history length does not grow;
- run a reduced-motion context and assert `behavior: "auto"`;
- verify a modifier click is not intercepted.

This plan does not add scroll-spy/active-section behavior.

### 3. Bundle exact example source

Modify `apps/www/src/lib/examples/source.server.ts`.

Replace `node:fs/promises` with an eager raw-source map:

```ts
const rawExamples = import.meta.glob<string>("./*.svelte", {
	eager: true,
	import: "default",
	query: "?raw",
});
```

`readExampleSource(slug)` must:

1. resolve metadata by slug;
2. return `null` for an unknown or intentionally deferred slug;
3. look up `./${metadata.slug}.svelte`;
4. throw a descriptive invariant error if metadata says a root is implemented
   but its raw source is absent;
5. return the source string without trimming or rewriting it.

Do not add a second manifest. The executable glob in
`apps/www/src/lib/examples/index.ts` and the raw glob must use the same
`./*.svelte` key shape.

### 4. Give CodeBlock an embedded mode and a protected copy rail

Modify:

- `apps/www/src/lib/components/docs/code-block.svelte`
- `apps/www/src/app.css`

Add a docs-only prop such as:

```ts
mode?: "standalone" | "embedded";
```

Default it to `standalone` so installation snippets and other existing blocks do
not change. Put `data-mode={mode}` on the `<figure>`.

For `mode="embedded"`:

- remove the code block’s own border, radius, and shadow;
- inherit the preview frame radius;
- fill the panel’s minimum height;
- keep the copy button sticky/visible over horizontally scrolled code;
- give the copy button/rail an opaque `var(--code)` surface and an
  inline-start scrim or mask so highlighted tokens are never legible beneath
  the icon;
- reserve enough inline-end space for the button at the initial scroll
  position;
- make the `<pre>` vertically and horizontally scrollable without growing the
  outer preview frame;
- preserve the standalone package-manager toolbar behavior.

The scroll viewport and the control are siblings in the same positioned
figure; scrolling code must not move the copy control. Prefer a small
pseudo-element/rail over a large shadow. Account for focus ring and 44px coarse
pointer hit area without covering the horizontal scrollbar.

Add a deterministic long-line fixture containing syntax-colored tokens. In
Chromium, grant clipboard read/write permission for the loopback origin (or
instrument `navigator.clipboard.writeText` before page code runs when the CI
browser cannot grant it). At `scrollLeft = 0` and at a nonzero scroll position,
assert:

- `pre.scrollWidth > pre.clientWidth`;
- the copy button rectangle is unchanged after scrolling;
- the button/rail computed background is non-transparent;
- the copy control remains clickable and copies the full unmodified source;
- the code frame does not create document-level horizontal overflow.

Merge these styles into the current uncommitted `apps/www/src/app.css`. Preserve
the user’s existing copy-button background and page-motion changes.

### 5. Polish the Preview/Code frame

Modify
`apps/www/src/lib/components/docs/component-preview-tabs.svelte`.

Keep the public inputs `code`, `slug`, and `title`, and add an optional:

```ts
align?: "start" | "center" | "end";
```

Default `align` to `center`. Use it as a data attribute or a closed class map;
do not construct arbitrary Tailwind classes dynamically.

Required structure:

- outer Tabs root: `mt-4 mb-12`, column layout, 0.5rem gap;
- docs-specific Tabs list: transparent background, no surrounding muted pill,
  compact triggers, and the existing shared animated indicator;
- frame: `position: relative`, `overflow: hidden`, `rounded-xl`, one border,
  card/background tokens, and no nested border;
- preview content:
  - desktop `min-height: 28.125rem` (450px);
  - mobile `min-height: min(28.125rem, 70svh)`;
  - `width: 100%`, `overflow: auto`;
  - 1rem mobile padding and 2.5rem desktop padding;
  - `align-items` derived from the closed `align` union;
- code content:
  - the same minimum height as preview;
  - `CodeBlock mode="embedded"`;
  - independent scrolling;
- tab changes must not move focus into the panel or reset the live example;
- tab labels and panels must retain Bits UI’s `role`, `aria-selected`,
  `aria-controls`, and keyboard behavior.

Use `bg-background`, `bg-card`, border, foreground, muted, and code tokens
already in the docs theme. Do not copy upstream JSX or Base UI class strings.

### 6. Make contract tests growth-safe

Modify `tests/example-contract.test.mjs`.

- Replace `assert.equal(files.size, 53)` with a count derived from non-deferred
  metadata.
- Replace the regex that requires `readFile(new URL(...))` with checks for the
  eager `import.meta.glob`, `query: "?raw"`, and `import: "default"` contract.
- Assert the executable and raw glob patterns have the same source directory and
  extension.
- Continue asserting every implemented example imports from the public
  `coss-svelte` package and is non-empty.

Modify `tests/package-contract.test.mjs`.

- Import `componentMetadata` and derive the expected generated component export
  count as the sum of each non-deferred root plus its canonical parts.
- Remove the brittle literal `258`.
- Keep the declaration checks that reject `any` escape hatches.

These changes must land before plans 008 and 009 so adding roots does not
require temporarily updating magic numbers.

### 7. Cover real production component routes

Modify `scripts/smoke-docs-server.mjs`.

Make the request helper return response text when requested. After the server is
ready:

1. request `/docs/components/button`;
2. assert HTTP 200 and `text/html`;
3. assert the body identifies the Button preview and exposes Preview, Code, and
   Copy code controls;
4. request `/docs/components/button.md`;
5. assert HTTP 200 and compare its example section with the normalized contents
   of `apps/www/src/lib/examples/button.svelte`.

Do not rely only on substring “Button”; use stable identifiers such as
`data-preview-slug="button"` and the exact import line.

Modify `scripts/smoke-docs-browser.mjs`.

After the introduction checks:

1. navigate to `/docs/components/button`;
2. wait for `[data-preview-slug="button"]`;
3. verify the Preview tab is selected;
4. activate Code through its accessible tab role;
5. verify the embedded code and Copy code button are visible;
6. verify the code contains the public `coss-svelte` import;
7. switch back to Preview and verify the Button remains interactive;
8. run axe on the component page as well as the introduction page.

The all-component production crawl belongs to plan 010; this phase adds one
representative route so this specific regression can never hide again.

## Tests To Add Or Update

| Test | Proof |
| --- | --- |
| docs route-motion browser case | every shared sidebar destination reuses the subtle Introduction entrance and reduced motion disables it |
| DocsToc browser case | hash/history, smooth scroll, sticky offset, modifier fallback, and reduced-motion auto scroll work |
| `tests/example-contract.test.mjs` | executable/raw manifests stay aligned and counts derive from metadata |
| `tests/package-contract.test.mjs` | generated export count grows from canonical metadata |
| `scripts/smoke-docs-server.mjs` | built component HTML and markdown routes return real source |
| `scripts/smoke-docs-browser.mjs` | Preview/Code keyboard interaction and component-page axe scan work |
| browser long-line case | scrollable code never becomes legible under the stationary copy rail |

## Verification

Run, in order:

```bash
pnpm biome:ci
pnpm --filter @coss-svelte/www check
node --test tests/example-contract.test.mjs tests/package-contract.test.mjs
pnpm docs:smoke
pnpm test:browser
```

Manual visual check:

```bash
pnpm --filter @coss-svelte/www dev --host 127.0.0.1 --port 5175
```

Inspect one short example and one long example in light/dark themes at:

- 1440px desktop;
- 390px mobile;
- 200% zoom;
- `prefers-reduced-motion: reduce`.

The preview and code panels should occupy the same frame height, the code should
scroll rather than expand the page, and the tab indicator should not animate
when reduced motion is requested.

## Acceptance Criteria

- A freshly built `/docs/components/button` route returns 200.
- The `.md` route contains the exact source from `button.svelte`.
- No runtime code reads `.svelte` examples through `node:fs`.
- Every normal destination represented in the docs sidebar renders through a
  keyed shared page-flow wrapper.
- Sidebar route changes reuse the Introduction's restrained entrance and do not
  replay it for local component state changes.
- Reduced-motion users receive fully visible content without route animation.
- "On This Page" links retain real hash anchors, update history, and scroll
  smoothly only when motion is allowed.
- Preview/Code uses real Tabs semantics and is keyboard operable.
- Preview and Code share a 450-pixel desktop frame with clean mobile behavior.
- Copy remains available in embedded and standalone code blocks.
- Long syntax-highlighted lines scroll beneath an opaque control rail without
  becoming visible through the copy button.
- Existing installation/usage code blocks retain their prior layout.
- No hardcoded example/export total needs changing when plans 008 and 009 add
  components.

## Stop Conditions

Stop and reconcile before editing if:

- the uncommitted `apps/www/src/app.css` changes now overlap the code-block or
  preview selectors in a contradictory way;
- Vite’s raw glob returns a non-string shape under the pinned Vite version;
- applying page motion would require hiding content in base styles or animating
  every nested text node; keep the route-level grouping subtle;
- smooth TOC scrolling would require replacing semantic hash anchors or
  ignoring reduced-motion preference; retain progressive anchor behavior;
- the production build still resolves example source through filesystem paths
  after the raw glob is introduced;
- matching COSS’s frame would require changing public `coss-svelte` Tabs
  behavior. Keep docs-specific styling local instead.
- protecting the copy control would require clipping/removing source text or
  disabling horizontal scrolling; preserve complete copyable source and solve
  only the layering.
