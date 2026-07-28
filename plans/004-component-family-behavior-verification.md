# Plan 004: Add component-family behavioral verification

> **Executor instructions**: Execute after plans 002, 003, 008, and 009 so this
> matrix records final contracts instead of institutionalizing known defects.
> Reuse focused tests delivered by those plans and add only missing behavior.
> Update `plans/README.md` whenever this plan’s status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte/tests tests scripts apps/www/src/routes apps/www/src/lib/examples package.json`

## Status

- **Status**: DONE
- **Priority**: P1
- **Effort**: L
- **Risk**: LOW
- **Depends on**:
  `plans/002-coherent-composition-overlays-portals.md`,
  `plans/003-form-accessibility-locale-contracts.md`,
  `plans/008-implement-number-field.md`, and
  `plans/009-implement-context-menu.md`
- **Category**: tests, release
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Create a durable, metadata-covered verification matrix that maps every public
root to an implementation family and proves the relevant behavior—rendering,
bindings, keyboard navigation, focus, portals, forms, disabled state, locale,
reduced motion, and accessibility—through real runtime tests.

## Proven current state

- `scripts/smoke-docs-browser.mjs` currently exercises the docs shell,
  theme/search, and axe; plan 007 adds one representative component route.
- Package Vitest coverage is focused on a small set of components.
- Several Node tests validate source shape with regular expressions. Those are
  useful for generator/policy invariants but cannot prove focus, keyboard,
  portal, or FormData behavior.
- Every implemented root has an executable public-package example, but those
  examples do not expose every state needed for deterministic interaction
  testing.
- ADR-008 names controlled/uncontrolled state, keyboard, focus restoration,
  portal, and form behavior as release expectations where relevant.

## Scope

**In scope**

- A checked-in component-family matrix and evidence registry
- Focused package runtime fixtures for deterministic state/form behavior
- A browser-only fixture route built entirely from public `coss-svelte` exports
- Modular Playwright cases and release-script integration
- Serious/critical axe checks and reduced-motion usability

**Out of scope**

- Pixel screenshots as CI assertions
- VoiceOver/NVDA automation
- Testing private Bits UI state or duplicating upstream’s full suite
- Re-running every behavior for styled aliases that share one implementation
- Promoting Drawer, Sidebar, or Toast from experimental

## Verification model

### Closed gate vocabulary

Use only these gates:

```js
[
  "ssr",
  "hydrate",
  "binding",
  "keyboard",
  "focus",
  "portal",
  "form",
  "disabled",
  "locale",
  "reduced-motion",
  "axe"
]
```

Not every root requires every gate. Presentational roots normally require SSR,
hydration, and axe. A modal requires keyboard, focus, portal, disabled where
applicable, reduced motion, and axe. Form controls require binding, keyboard,
form, disabled, and axe.

### Implementation families

Use at least these families, splitting them if the implementation evidence
shows materially different state code:

| Family | Representative roots | Required behavior |
|---|---|---|
| `modal` | Dialog, AlertDialog, Sheet, Drawer, CommandDialog | open binding, focus trap/restore, Escape, backdrop, portal |
| `floating` | Popover, Tooltip, PreviewCard | trigger keyboard, Escape/outside, portal, focus |
| `menu` | Menu, ContextMenu | roving focus, typeahead/selection, disabled skip, submenu, portal |
| `listbox` | Select, Combobox, Autocomplete | open/value binding, arrows, selection, form, disabled |
| `choice` | Checkbox, CheckboxGroup, Switch, RadioGroup, Toggle, ToggleGroup | binding, keyboard, disabled, form where supported |
| `disclosure` | Accordion, Collapsible, Tabs | open/value binding, arrows where defined, focus |
| `date-range` | Calendar, DatePicker, Slider, NumberField | value binding, keyboard, bounds, locale/form where defined |
| `native-form` | Input, Textarea, OTPField | input, disabled, form only where supported |
| `managed-feedback` | Toast | provider/store lifecycle, focus/action, reduced motion |
| `presentational` | Alert, Card, Badge, Table, Skeleton, etc. | SSR, hydration, axe |

Drawer, Sidebar, and Toast remain experimental rows. Experimental status changes
which release failures block publishing only if repository policy says so; it
does not permit a missing row.

## Implementation

### Step 1: Add the machine-readable matrix

Add:

- `tests/component-family-matrix.mjs`
- `tests/component-family-matrix.test.mjs`

Each row contains:

```js
{
  root: "Dialog",
  family: "modal",
  implementation: "bits-dialog",
  required: ["ssr", "hydrate", "binding", "keyboard", "focus", "portal", "reduced-motion", "axe"],
  evidence: {
    keyboard: ["browser:dialog-escape"],
    focus: ["browser:dialog-focus-restore"],
    portal: ["browser:dialog-custom-target"]
  }
}
```

Create one evidence registry whose IDs point to an executable test case and
runner (`vitest`, `ssr-vitest`, or `browser`). Do not use free-form prose links.
The coverage test must fail when:

- a metadata root is missing or appears twice;
- a matrix row names an unknown root/family/gate;
- a required gate has no evidence ID;
- an evidence ID is unknown or has no executable handler/test registration;
- a stable root is marked exempt without a non-empty reason and issue/plan
  reference.

Use implementation keys to share evidence only when wrappers truly delegate the
same behavior. Wrapper-owned behavior—especially each modal popup’s backdrop
path—must retain per-root evidence.

**Verify**:

```sh
node --test tests/component-family-matrix.test.mjs
```

### Step 2: Reconcile and fill package-level evidence

Inventory existing Vitest cases from plans 002, 003, 008, and 009. Register
their evidence IDs rather than copying the assertions.

Add only missing deterministic cases under
`packages/coss-svelte/tests/`:

- controlled/bindable callback counts for single and multiple roots;
- disabled-state suppression;
- FormData outcomes not already covered in plan 003/008;
- SSR/hydration ID stability;
- managed Toast state where browser behavior is unnecessary.

Test titles should include their evidence ID, for example:

```ts
test("[runtime:select-single-binding] updates one bound value", ...)
```

The matrix test may scan registered test titles to prove linkage, but the
evidence itself must remain a real runtime assertion.

**Verify**:

```sh
pnpm --filter coss-svelte test
pnpm --filter coss-svelte test:ssr
```

### Step 3: Add a production-build browser fixture

Add a non-navigation route:

`apps/www/src/routes/__test__/component-families/+page.svelte`

and `+page.server.ts`. Read `COSS_ENABLE_TEST_FIXTURES` from
`$env/dynamic/private` so the built adapter-node server evaluates the guard at
process runtime. Call SvelteKit's `error(404)` unless its exact value is `"1"`.
Browser scripts start the built server with that variable; normal production
deployment leaves the fixture inaccessible. Do not use `$env/static/private`,
which would bake the build machine's value into the bundle.

Requirements:

- import only public exports from `"coss-svelte"`;
- no private package source, docs-only behavioral wrapper, or copied example;
- deterministic controls and output nodes with semantic roles plus stable
  `data-testid` anchors;
- one custom portal Element host and one selector host;
- enough fixtures to run all browser evidence IDs;
- `<meta name="robots" content="noindex">`;
- no animation-duration sleeps baked into fixture state.

Group fixtures by family in one route to avoid repeated app startup, but keep
each case independent and resettable. The unguarded route must be tested to
return 404.

**Verify**:

1. build the docs app;
2. start one server without the environment variable, assert 404, then stop it;
3. start a fresh server with it set to `1` and assert 200 plus every required
   fixture anchor.

### Step 4: Modularize browser evidence

Refactor browser code into:

- `scripts/smoke-docs-browser.mjs` as server/browser orchestration;
- `scripts/browser/docs-shell-cases.mjs`;
- `scripts/browser/component-family-cases.mjs`.

The default `pnpm test:browser` runs both suites after one docs build/server.
Support:

```sh
node scripts/smoke-docs-browser.mjs --suite components
node scripts/smoke-docs-browser.mjs --family modal
```

Reject unknown suite/family values with a useful nonzero error. Set
`COSS_ENABLE_TEST_FIXTURES=1` only for the spawned test server.

Browser cases must cover:

- Tab/Shift+Tab and family-appropriate arrow navigation;
- Enter/Space selection;
- Escape closure and trigger focus restoration;
- modal backdrop closure without Content closure;
- custom portal target and inline portal mode;
- disabled item/control suppression and menu disabled-item skipping;
- single/multiple controlled values;
- Number Field bounds and Context Menu keyboard alternative;
- DatePicker locale display.

Await roles, attributes, focus, and bound-output text. No fixed sleep may be
used except where the product behavior itself is time-based (Number Field
repeat or Context Menu long press). Keep those durations as named test-harness
constants tied to the documented contract (700ms for installed Bits UI's
non-mouse Context Menu long press) plus a bounded margin; do not add timing
constants to the public package solely for tests.

### Step 5: Add accessibility and reduced-motion cases

Run axe with WCAG A/AA tags and fail on serious/critical violations for:

- the full fixture page in its default state;
- an open modal;
- an open Menu and Context Menu submenu;
- the form-control group;
- one dark-theme state.

Use a separate browser context with `reducedMotion: "reduce"` and prove that a
modal, floating popup, Preview/Code tab, and managed feedback surface can open,
close, and restore focus within semantic timeouts. Do not assert computed
transition durations or pixel frames.

Use a 390×844 context for one modal, listbox, Number Field, and Context Menu
path. Assert no document-level horizontal overflow and that floating content
intersects the viewport.

### Step 6: Integrate without duplicate builds

Keep one root `test:browser` command that builds docs once and runs both suites.
Add a focused `test:browser:components` alias only if it reuses an existing
build or clearly documents that it performs its own build. Update
`tests/publication-readiness.test.mjs` when the exact `release:check` contract
changes.

Include the matrix coverage test and the default browser suite in
`release:check`. Document the focused family command in contributor docs.

**Verify**:

```sh
node --test tests/component-family-matrix.test.mjs
pnpm test:browser
pnpm release:check
```

## Acceptance criteria

- [ ] Every stable, experimental, and newly added root appears exactly once.
- [ ] Every required gate resolves to an executable evidence ID.
- [ ] Shared evidence is limited to a truthful implementation key.
- [ ] Browser fixtures import only the public package and are 404 in normal
      production mode.
- [ ] Keyboard, focus, portal, form, disabled, locale, and reduced-motion
      behavior execute in the appropriate real/runtime environment.
- [ ] Axe has no serious/critical findings in the specified states.
- [ ] Browser tests use semantic waits and one production-build server.
- [ ] `pnpm release:check` passes.

## STOP conditions

- Stop if a fixture needs a private import; fix the public contract first.
- Stop if a failure reproduces in raw Bits UI 2.18.1; record a minimal upstream
  reproduction and isolate the expectation rather than adding wrapper hacks.
- Stop if a test remains timing-flaky after replacing sleeps with semantic
  state; do not weaken it into a source-regex check.
- Stop if exposing the guarded test route in normal deployment cannot be
  prevented.
- Stop if the matrix grows into one bespoke test per presentational alias;
  revisit implementation-family sharing.

## Maintenance notes

New roots must add a matrix row and evidence in the same change. A dependency
upgrade requires rerunning the family suite, not just declaration generation.
Keep evidence IDs stable so failures point to a public behavior, not a line
number or implementation detail.
