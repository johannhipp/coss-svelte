# Plan 009: Implement Context Menu as a complete Bits UI family

> **Executor instructions**: Plans 001, 002, 005, and 007 must be complete.
> Reconcile the current uncommitted 15-component family, tests, example,
> metadata, API prose, theme selectors, registry output, and scope decisions
> before changing it. Update `plans/README.md` whenever this plan's status
> changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte apps/www docs tests packages/theme`
>
> Then inspect:
> `git status --short -- packages/coss-svelte apps/www/src/lib/examples/context-menu.svelte apps/www/src/lib/docs/api-reference.js packages/theme apps/registry docs tests`

## Status

- **Status**: DONE
- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**:
  `plans/001-restore-bits-ui-type-fidelity.md`,
  `plans/002-coherent-composition-overlays-portals.md`,
  `plans/005-truthful-api-docs-and-dev-loop.md`,
  `plans/007-preview-and-code-infrastructure.md`
- **Category**: feature, accessibility, API
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Add the newer COSS Context Menu root as one complete, stable, Bits UI-backed
vertical slice:

- `ContextMenu`
- `ContextMenuCheckboxItem`
- `ContextMenuGroup`
- `ContextMenuGroupLabel`
- `ContextMenuItem`
- `ContextMenuLinkItem`
- `ContextMenuPopup`
- `ContextMenuRadioGroup`
- `ContextMenuRadioItem`
- `ContextMenuSeparator`
- `ContextMenuShortcut`
- `ContextMenuSub`
- `ContextMenuSubPopup`
- `ContextMenuSubTrigger`
- `ContextMenuTrigger`

The family must support pointer context menus, Bits-owned long press, an
explicit keyboard alternative, links, check/radio items, submenus, exact Portal
options, generated registry installation, and a production docs route.

Use `ContextMenu` from installed `bits-ui@2.18.1`. Do not copy the React/Base UI
registry implementation.

## Proven Current State

- The original 54-root scope did not include Context Menu, but current roadmap
  prose recognizes it as a required later catalog addition.
- The canonical COSS anatomy has one root and 14 parts. It has eight particles.
  It does **not** include a public `ContextMenuCheckboxGroup`, even though Bits
  UI exposes that primitive.
- Installed Bits UI provides Root, Trigger, Portal, Content, Item,
  CheckboxItem, Group, GroupHeading, RadioGroup, RadioItem, Separator, Sub,
  SubTrigger, and SubContent.
- Installed Root owns `open`, `onOpenChange`, `onOpenChangeComplete`, and `dir`.
- Installed Trigger:
  - renders a div by default and supports `child`;
  - opens from `contextmenu`;
  - starts a 700ms non-mouse long-press timer;
  - cancels long press on move, up, cancel, disabled, and destroy;
  - sets `tabindex="-1"` unless the caller supplies another value;
  - does not handle Shift+F10 or the Context Menu key.
- A direct headless interaction check confirms that Shift+F10 on the stock div
  trigger does not emit `contextmenu`.
- Installed Content defaults to `loop=true`, `preventScroll=true`,
  `side="right"`, `sideOffset=2`, and `align="start"`, and owns virtual-pointer
  positioning, collision handling, outside dismissal, Escape, and focus.
- Installed Portal's complete option contract is:

  ```ts
  {
    to?: Element | string;
    disabled?: boolean;
    children?: Snippet;
  }
  ```

- The dirty worktree now contains the complete 15-file family, an example,
  theme rules, stable metadata, package index/registry output, API/decision
  prose, a runtime fixture/test, and type/contract changes.
- Current runtime tests prove a basic pointer open/select flow, Shift+F10,
  checkbox binding with `closeOnSelect={false}`, a link anchor, and entry into a
  radio submenu. This is useful spike evidence, not the complete contract.
- Current source diverges from the contract below in material ways:
  - the keyboard handler positions/dispatches from `event.target`, uses the
    ambient `MouseEvent`, and prevents the original key only if dispatch
    reports cancellation;
  - Popup inherits Bits' right/start/2 defaults instead of the deliberate COSS
    bottom/center/4 defaults;
  - Root carries no direction context, SubPopup is always physically right,
    and SubTrigger's chevron is LTR-only;
  - Sub inserts a presentational `<span>` into the menu hierarchy to carry a
    class even though the primitive root has no element;
  - SubTrigger omits Bits' `child` composition;
  - CheckboxItem does not explicitly preserve bindable `indeterminate`;
  - LinkItem's actual anchor/ref/declaration contract is not yet proven.
- No current evidence covers the Context Menu key, prevented/disabled keyboard
  paths, duplicate-open suppression, long-press cleanup, outside/Escape focus
  restoration, typeahead/loop, selection cancellation, portal targets/inline
  mode, RTL, nested Escape order, declaration fidelity, docs axe/mobile
  behavior, or clean registry consumption.

## Scope

**In scope**

- All 15 canonical exports
- Pointer/right-click and installed Bits UI long-press behavior
- Shift+F10 and Context Menu key enhancement on a focusable trigger
- Item, navigation-link, checkbox/switch, radio, grouping, shortcut, and
  submenu contracts
- LTR/RTL-aware submenu placement and chevron
- Exact Portal forwarding on Popup and SubPopup
- Shared Menu styling, metadata/scope/API docs, one executable example,
  generated package/registry output, and focused tests

**Out of scope**

- A public checkbox-group export not present in canonical COSS anatomy
- Reimplementing roving focus, typeahead, virtual positioning, long press,
  dismissal, or focus scopes already owned by Bits UI
- A React `render` prop, `closeOnClick` alias, or Portal `container`/
  `keepMounted` aliases
- Making arbitrary trigger surfaces focusable inside the library
- Porting all eight particles as local examples
- Global operating-system context-menu suppression

## Foundation and Deliberate Svelte Differences

Use the installed primitive as the behavioral authority:

- snippets and `child` composition replace React `render`;
- `bind:open`, `bind:checked`, `bind:indeterminate`, and `bind:value` replace
  React controlled-state conventions;
- `closeOnSelect` remains the Bits/Svelte name;
- Portal options are `to` and `disabled`;
- Bits owns roving focus, typeahead, selection, submenu timing, pointer
  positioning, long press, Escape, and outside interaction.

The wrapper deliberately changes two defaults:

1. Root Popup defaults to COSS's pointer presentation:
   `side="bottom"`, `align="center"`, `sideOffset=4`.
2. SubPopup defaults to logical inline-end placement:
   physical `right` in LTR and `left` in RTL, `align="start"`,
   `sideOffset=0`, and an `alignOffset` of `-5` when alignment is not center.

Forward explicit consumer placement values over these defaults. Record these
defaults in the curated API contract so they do not depend silently on a Bits
upgrade.

## Public Contract

### Root

Derive from `ComponentProps<typeof ContextMenuPrimitive.Root>`, omit only
wrapper-owned children, and forward `bind:open`, `onOpenChange`,
`onOpenChangeComplete`, and `dir`.

`ContextMenu` is `compound`: it has no convenience target or items API.
Children are the complete hierarchy.

Store the effective `dir` (`"ltr"` by default) in a private nested context for
SubPopup placement and the SubTrigger chevron. This context contains no open or
selection state; Bits remains the state owner.

### Trigger

Derive Trigger props exactly after plan 001 and preserve Bits' `child` snippet.

- Default element remains a `<div>`.
- Do not add `role="button"` or force `tabindex="0"`.
- Forward `disabled`, ref, class/style, ARIA, pointer/context-menu handlers,
  `tabindex`, child, and children according to the primitive type.
- The docs target supplies `tabindex="0"` and an accessible label.
- Consumers may instead apply the child props to an already-focusable element.

#### Keyboard enhancement

Compose one wrapper `onkeydown`:

1. call the consumer handler first;
2. stop if it prevented default, the trigger is disabled, or the key is not
   Shift+F10/`ContextMenu`;
3. resolve `event.currentTarget` and its `ownerDocument.defaultView`;
4. prevent the original keyboard default so the platform does not open a
   duplicate native menu;
5. dispatch one bubbling, cancelable, composed `MouseEvent("contextmenu")` on
   the trigger with:
   - `button: 2`;
   - `clientX/clientY` at the trigger rectangle's center;
   - the target document's Window as `view`.

Bits receives the synthetic event through its existing Trigger handler and
opens at the virtual center point. Do not mutate Root state directly or call a
private Bits API. Construct the event only inside the handler so SSR imports do
not touch `window`.

Observable requirements:

- one keydown creates one open transition;
- the user's prevented keydown creates none;
- disabled creates none;
- no native context menu follows;
- focus moves into the menu and returns to the original trigger on close.

### Popup and Portal

`ContextMenuPopup` owns one Portal and one Content:

```ts
type PortalOptions = Omit<
	ComponentProps<typeof ContextMenuPrimitive.Portal>,
	"children"
>;

type Props = Omit<
	ComponentProps<typeof ContextMenuPrimitive.Content>,
	"children" | "child"
> & {
	portalProps?: PortalOptions;
	children?: Snippet;
};
```

The wrapper owns Content's element so it can guarantee its class, data slot,
scroll surface, and rendered children. Forward every other supported Content
prop and ref without converting the type to `Record<string, unknown>`.

`portalProps` accepts only `to` and `disabled`. Apply it only to Portal.
`children`, `container`, and `keepMounted` are compile-time errors. With
`disabled: true`, Content renders inline; otherwise it portals to `to` or the
default body.

Keep Bits' `loop`, `preventScroll`, `forceMount`, collision, outside-interaction,
Escape, and auto-focus props. Consumer handlers may prevent the corresponding
Bits event where the primitive supports cancellation.

`ContextMenuSubPopup` has the same Portal option type but renders
`ContextMenuPrimitive.SubContent`. It owns exactly one Portal; do not nest it in
`ContextMenuPopup`, which would render the wrong primitive. Derive its default
side from the private root direction unless the caller supplies `side`.

### Actions and visual variants

`ContextMenuItem`:

- derives from Bits Item;
- adds `variant?: "default" | "destructive"` and `inset?: boolean`;
- defaults `variant="default"`;
- forwards `disabled`, `textValue`, `onSelect`, `closeOnSelect`, ref, and
  deliberate `child` composition;
- puts `data-slot`, `data-variant`, `data-inset`, and the shared class on the
  actual item element.

For delegating `child` composition, require callers to spread the merged
primitive props onto the actual target. Test that role/data/ref/handlers reach
that target.

`ContextMenuCheckboxItem`:

- explicitly forwards `bind:checked` and `bind:indeterminate` plus their
  callbacks;
- adds `variant?: "default" | "switch"`;
- preserves the primitive's typed `{ checked, indeterminate }` child payload;
- default variant renders a decorative check/indeterminate indicator before
  the caller label;
- switch variant renders caller label plus a decorative track/thumb;
- keeps the item itself as `menuitemcheckbox`; indicators are `aria-hidden`.

`ContextMenuRadioGroup` explicitly forwards `bind:value` and
`onValueChange`. `ContextMenuRadioItem` requires `value`, preserves the typed
`{ checked }` child payload, and renders a decorative selected indicator.

Do not export Bits' CheckboxGroup. Independently bindable checkbox items cover
the canonical COSS contract without inventing a 16th export.

### Grouping and helpers

- `ContextMenuGroup` wraps Bits Group.
- `ContextMenuGroupLabel` wraps Bits `GroupHeading` and adds `inset`.
- `ContextMenuSeparator` wraps Bits Separator.
- `ContextMenuShortcut` is a native `<kbd>`.

Each uses a context-menu-specific `data-slot` and the corresponding shared
`cn-menu-*` visual class. Native Shortcut supports actual `<kbd>` attributes
and children without pretending to be a Bits primitive.

### Link Item

Bits has no LinkItem, but Item's `child` snippet provides merged interaction
props. `ContextMenuLinkItem` owns a semantic anchor and accepts:

- required `href: string`;
- `target`, `rel`, `download`, `hreflang`, and `referrerpolicy`;
- Bits Item interaction props excluding the public `child`;
- `variant?: "default" | "destructive"`;
- `inset?: boolean`, class, and children.

Implementation shape:

```svelte
<ContextMenuPrimitive.Item ...>
	{#snippet child({ props })}
		<a {...props} {href} ...>
			{@render children?.()}
		</a>
	{/snippet}
</ContextMenuPrimitive.Item>
```

The merged Bits props, item class, data attributes, role, ref attachment, and
handlers must land on the anchor itself. There must be no wrapper div and no
nested interactive element.

Reconcile the current file's ref typing against the actual anchor: do not expose
Bits' div-ref type as an anchor ref. If a safely merged public anchor ref cannot
be expressed with the current Svelte/Bits child contract, omit that extra ref
surface rather than cast it.

Router-specific navigation uses `ContextMenuItem child` so the consumer can
apply merged props to its link component. Do not add a React `render` prop.

### Submenus

`ContextMenuSub` explicitly forwards `bind:open`, `onOpenChange`, and
`onOpenChangeComplete`.

`ContextMenuSubTrigger`:

- derives from Bits SubTrigger;
- adds `inset`;
- forwards `openDelay`, disabled, textValue, onSelect, ref, and deliberate
  child composition;
- renders a decorative inline-end chevron in the owned-element path;
- flips the chevron through the root direction context;
- relies on Bits for pointer grace, keyboard open/close, and focus.

`ContextMenuSubPopup` uses the Portal/directional placement contract above.
Escape first closes the submenu and restores focus to SubTrigger; a later
Escape closes the root.

## Styling Strategy

Reuse the mature Menu surface instead of forking it:

- Popup/SubPopup: `cn-menu-popup`/`cn-menu-sub-popup`
- items: `cn-menu-item`
- checkbox/radio/group/label/separator/shortcut/sub-trigger: their existing
  `cn-menu-*` classes

Add context-menu-specific classes only for behavior that Menu does not have:

- trigger display hook;
- popup overscroll containment;
- label/indicator layout;
- switch track/thumb translation;
- RTL submenu chevron direction if a data attribute is required.

The dirty theme already contains several such selectors. Reconcile and retain
only selectors used by final markup. Ensure every class is in the theme's class
map/contract. The switch thumb transition must honor the repository's
reduced-motion rule.

Do not add hover logic that competes with Bits' `data-highlighted`, or CSS that
changes Menu behavior without a shared reason.

## Implementation Sequence

### Step 0: Reconcile the live vertical-slice edits

1. Inventory all 15 dirty components, fixtures/tests, example, metadata, API,
   decisions, theme, package index, registry, scope, and browser changes.
2. Retain correct canonical anatomy, primitive mappings, and shared styles.
3. Reconcile every divergence listed in **Proven Current State**; do not
   preserve a behavior merely because the small current runtime suite passes.
4. Correct aspirational prose that says the complete behavior is already
   implemented.
5. Move hand-authored API details into plan 005's curated source.
6. Type-check the LinkItem pattern before using it as the family template.
7. Do not rerun generators until all 15 source contracts and retained metadata
   are coherent.

**Verify**: handoff records which live edits were retained, revised, or deferred.

### Step 1: Implement Root, Trigger, Popup, and portal tests

Build the minimal menu:

```svelte
<ContextMenu>
	<ContextMenuTrigger tabindex={0}>Right-click here</ContextMenuTrigger>
	<ContextMenuPopup>
		<ContextMenuItem>Copy</ContextMenuItem>
	</ContextMenuPopup>
</ContextMenu>
```

Prove right-click, both keyboard keys, disabled/prevented paths, open binding,
outside click, Escape/focus restoration, long-press ownership, and Portal
targets before adding the rest of the anatomy.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run context-menu-root
pnpm --filter coss-svelte check
pnpm --filter coss-svelte test:ssr
```

### Step 2: Implement action, selection, link, and grouping parts

Add Item/LinkItem, checkbox/switch, radio, group/label, separator, and shortcut.
Use observable role, binding, selection, close, navigation, and typeahead
assertions. Do not test Bits implementation details.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run context-menu-items
pnpm test:type-consumer
```

### Step 3: Implement submenu direction and portal behavior

Add Sub/SubTrigger/SubPopup, private direction context, logical placement, and
nested portal tests. Cover LTR and RTL, pointer and keyboard entry, focus
return, outside dismissal, and nested Escape sequence.

**Verify**:

```sh
pnpm --filter coss-svelte exec vitest run context-menu-submenu
```

### Step 4: Add docs, API, metadata, and scope

Create one focused example:

- a focusable 20–24rem wide, 9–10rem high dashed target;
- visible `"Right-click here"` and `"or press Shift+F10"` hint;
- accessible target label;
- common actions with shortcuts;
- one disabled action, separator, destructive action, and one submenu;
- imports only from public `"coss-svelte"` and declared icon dependencies.

Checkbox/radio variants remain in API anatomy and tests; the main preview need
not demonstrate every part.

Add Context Menu after Menu in source scope, record the complete-vertical-slice
admission rule, and remove it from current unimplemented-roadmap prose only
after all gates pass. Do not claim all eight particles were locally ported.

Use plan 007's raw source pipeline for the exact Code tab and plan 005's
declaration-backed API output.

### Step 5: Generate package, scope, and registry output

```sh
pnpm package:index
pnpm scope:build
pnpm registry:build
```

Inspect `context-menu.json`. Its closure must contain all 15 public components,
any private direction helper, `utils.js`, `bits-ui`, and the theme dependency.
It must contain no React, Base UI, Next.js, or ignored-upstream paths.

## Files

### Add

- `packages/coss-svelte/src/internal/context-menu.ts` if the direction context
  cannot live cleanly in the root module
- `packages/coss-svelte/src/components/ContextMenu.svelte`
- `packages/coss-svelte/src/components/ContextMenuCheckboxItem.svelte`
- `packages/coss-svelte/src/components/ContextMenuGroup.svelte`
- `packages/coss-svelte/src/components/ContextMenuGroupLabel.svelte`
- `packages/coss-svelte/src/components/ContextMenuItem.svelte`
- `packages/coss-svelte/src/components/ContextMenuPopup.svelte`
- `packages/coss-svelte/src/components/ContextMenuRadioGroup.svelte`
- `packages/coss-svelte/src/components/ContextMenuRadioItem.svelte`
- `packages/coss-svelte/src/components/ContextMenuSeparator.svelte`
- `packages/coss-svelte/src/components/ContextMenuShortcut.svelte`
- `packages/coss-svelte/src/components/ContextMenuSub.svelte`
- `packages/coss-svelte/src/components/ContextMenuSubPopup.svelte`
- `packages/coss-svelte/src/components/ContextMenuSubTrigger.svelte`
- `packages/coss-svelte/src/components/ContextMenuTrigger.svelte`
- focused package fixtures/tests for root, items, submenu, SSR, and cleanup
- `apps/www/src/lib/examples/context-menu.svelte`

### Reconcile existing uncommitted files

- `packages/coss-svelte/src/components/ContextMenuLinkItem.svelte`
- `packages/coss-svelte/src/metadata.js`
- `apps/www/src/lib/docs/api-reference.js` into plan 005's curated source
- `packages/theme/src/components.css`
- current implementation-decision/backlog edits

### Modify

- `packages/coss-svelte/tests/type-consumer.ts`
- theme class map/contract if required
- `tests/bits-primitive-parts.test.mjs`
- `docs/scope/source/00-component-index.md`
- `docs/scope/source/01-source-audit.md`
- `docs/scope/source/10-overlays-and-popups.md`
- `docs/scope/source/90-particle-coverage.md`
- `docs/scope/source/README.md`
- `docs/implementation/decision-records.md`
- `docs/implementation/v0.1-scope-decisions.md`
- `docs/implementation/unimplemented-components.md`
- `docs/implementation/post-v0.1-parity-backlog.md`

### Generate

- `packages/coss-svelte/src/index.js`
- generated declarations
- `docs/scope/README.md`
- `docs/scope/component-implementation-matrix.md`
- `docs/scope/component-implementation-outline.md`
- `apps/registry/static/r/context-menu.json`
- `apps/registry/static/r/index.json`
- plan 005's generated API output

No dependency or version-baseline change is expected.

## Test Matrix

### Runtime and interaction tests

- right-click virtual position and one open callback
- caller-prevented contextmenu
- 700ms touch/pen long press, plus move/up/cancel/destroy cleanup
- Shift+F10 and Context Menu key from a focusable default/child trigger
- consumer-prevented keydown, disabled trigger, and no duplicate open
- Arrow navigation, loop option, typeahead, Enter/Space selection
- selection cancellation and `closeOnSelect={false}`
- outside dismissal, Escape, and trigger focus restoration
- checkbox/indeterminate binding and switch state
- radio single selection
- destructive/inset attributes on actual elements
- semantic LinkItem anchor, href attributes, selection, keyboard activation,
  and closure
- Sub open delay, keyboard direction, pointer entry, nested focus, Escape order
- LTR-right/RTL-left default submenu placement
- Popup/SubPopup selector target, Element target, and inline Portal modes

Fake timers are limited to documented long-press and submenu-delay boundaries.
Await semantic state/focus rather than sleeping through animation.

### Contract and type tests

- all Bits-backed parts import `ContextMenu` from `bits-ui`
- Shortcut alone is classified as a native helper
- all parts have context-specific data slots
- Root/Sub/Checkbox/Radio bindings compile
- Popup Portal accepts `to`/`disabled`
- Portal rejects `children`, `container`, and `keepMounted`
- LinkItem accepts only the closed anchor/navigation surface and required href
- variants reject arbitrary strings
- declarations preserve child payloads and contain no `any`

### Browser tests

On the real docs route:

1. open by pointer and assert the popup is near the requested point;
2. navigate/select and verify focus restoration;
3. reopen with Shift+F10 and Context Menu key;
4. enter/exit a submenu with keyboard;
5. exercise one link without leaving the fixture unexpectedly;
6. switch Preview/Code and verify exact public Svelte source;
7. run axe with root and submenu open;
8. repeat layout checks at 390x844 and in RTL;
9. prove the popup intersects the viewport and creates no document-level
   overflow.

If Playwright cannot emit a reliable non-mouse pointer for long press, keep
that proof in the runtime fixture and record the browser limitation. Do not add
flaky real-time waits.

## Verification

Focused:

```sh
pnpm --filter coss-svelte exec vitest run context-menu
pnpm --filter coss-svelte check
pnpm --filter coss-svelte test:ssr
pnpm test:type-consumer
node --test tests/bits-primitive-parts.test.mjs tests/api-reference.test.mjs tests/example-contract.test.mjs tests/registry-metadata.test.mjs tests/registry-closure.test.mjs
```

Generated and docs:

```sh
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm theme:check
pnpm examples:check
pnpm docs:smoke
pnpm test:browser
```

Final publish-facing gate:

```sh
pnpm install --frozen-lockfile
pnpm biome:ci
pnpm check
pnpm release:check
```

Visual review:

```sh
pnpm --filter @coss-svelte/www dev --host 127.0.0.1 --port 5175
pnpm parity:evidence -- --slugs context-menu
```

Inspect ignored local/COSS evidence for popup density, radius, shadow,
highlight, destructive state, switch motion, submenu placement, and light/dark
presentation. Record intentional Svelte/Bits differences in durable prose.

## Acceptance Criteria

- Context Menu is a stable 55th metadata root with exactly 14 canonical parts.
- All 15 exports have generated, `any`-free declarations.
- Pointer, installed long press, keyboard enhancement, focus, selection,
  checkbox/radio, link, portal, and submenu behavior have observable tests.
- Keyboard opening composes through Bits Trigger and produces one transition.
- LinkItem's actual anchor participates in Bits item behavior.
- Popup and SubPopup expose only exact Bits Portal options.
- Submenu placement/chevron follow LTR and RTL direction.
- Theme styling reuses Menu instead of creating a parallel system.
- Package, metadata, scope, API, exact example, docs routes, and registry agree.
- The registry item's source closure passes focused checks and is ready for
  plan 010's final packed clean-consumer gate; this plan does not depend on
  that downstream integration plan.
- Deferred prose is removed without claiming full particle parity.

## Stop Conditions

Stop and reassess if:

- the pinned Bits UI API differs from the locally inspected contracts;
- keyboard opening requires direct mutation of private Bits state;
- LinkItem cannot place merged item props on the actual anchor without a cast or
  invalid ref type;
- Popup/SubPopup would own multiple portals;
- logical submenu placement requires replacing Bits floating behavior;
- shared Menu classes cannot represent the component without regressing Menu;
- generation would overwrite unreconciled user changes;
- implementation starts reproducing Base UI instead of wrapping Bits UI.
