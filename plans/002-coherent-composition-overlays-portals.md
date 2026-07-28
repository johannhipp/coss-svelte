# Plan 002: Define composition, overlay dismissal, and portal contracts

> **Executor instructions**: Plan 001 must be complete. Preserve the live,
> uncommitted Alert Dialog and docs changes. Reconcile them in Step 0 rather
> than replaying the baseline implementation. Update `plans/README.md` whenever
> this plan’s status changes.
>
> **Drift check (run first)**:
> `git diff --stat aced7142d97c241fb8cf62d613b72f819f883476..HEAD -- packages/coss-svelte/src/components packages/coss-svelte/src/metadata.js docs/scope tests apps/registry`
>
> Then inspect:
> `git diff -- packages/coss-svelte/src/components/AlertDialog.svelte packages/coss-svelte/src/components/AlertDialogPopup.svelte packages/coss-svelte/src/metadata.js`

## Status

- **Status**: DONE
- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**:
  `plans/001-restore-bits-ui-type-fidelity.md`
- **Category**: bug, accessibility, API
- **Planned at**: commit
  `aced7142d97c241fb8cf62d613b72f819f883476`, 2026-07-28

## Goal

Replace the false global composition promise with a truthful per-root contract,
add exact Bits UI portal forwarding to every documented popup, and make all
modal backdrop dismissal flow through one Bits-owned state transition.

## Proven current state

- `compositionModel` globally claims `children-first-convenience`.
- Dialog, Sheet, Drawer, and AlertDialog branch on
  `title || description`; Accordion and ToggleGroup branch on `items.length`;
  RadioGroup branches on `options.length`; Tabs can place supplied children in
  only the first generated panel.
- Collapsible intentionally treats children as convenience content paired with
  `title`, while Sidebar intentionally renders legacy `items` plus additional
  children. A blanket “children always replace everything” migration would
  break both APIs.
- Scope docs promise `portalProps` on 12 popup surfaces, but none currently
  forwards portal options.
- Installed Bits UI 2.18.1 defines Portal as:

  ```ts
  {
    to?: Element | string;
    disabled?: boolean;
    children?: Snippet;
  }
  ```

  Existing scope prose incorrectly names React/Base UI-only `container` and
  `keepMounted`.
- The live AlertDialog work combines
  `interactOutsideBehavior="close"`, direct Overlay `onclick`, and a string-keyed
  close context. Bits Dialog Content already closes on an outside pointer
  interaction unless its callback prevents the event.
- Installed Bits UI's public `AlertDialog.Content` type deliberately omits
  `onInteractOutside`, even though its internal implementation uses the event
  to close. Standard Dialog Content exposes the callback. Do not invent an
  Alert Dialog cancellation prop merely to make the families look identical.
- Product requirement: clicking the dimmed backdrop closes every modal surface
  by default.

## Scope

**In scope**

- One explicit composition mode for every metadata root
- Behavior corrections for roots that disagree with their selected mode
- DialogPopup, AlertDialogPopup, SheetPopup, DrawerPopup,
  CommandDialogPopup, MenuPopup, PopoverPopup, TooltipPopup,
  PreviewCardPopup, AutocompletePopup, ComboboxPopup, and SelectPopup
- Dialog, AlertDialog, Sheet, Drawer, and CommandDialog backdrop behavior
- Metadata, scope prose, type/runtime/browser tests, examples where needed, and
  regenerated registry output

**Out of scope**

- Escape-key, focus-trap, Drawer gesture, or animation redesign
- React/Base UI portal aliases
- Adding portal props to convenience roots; custom-target consumers use the
  compound Popup API
- Context Menu, which adds the 13th popup surface in plan 009
- Deprecating Sidebar’s legacy `items` API

## Contract decisions

### Composition vocabulary

Every component root must have exactly one mode:

| Mode | Contract | Representative roots |
|---|---|---|
| `compound` | Children are the complete part hierarchy; no convenience fallback exists. | CommandDialog and composed-only roots |
| `children-first-fallback` | Children replace the entire generated convenience hierarchy. | Accordion, Dialog family, Menu, Select family, RadioGroup, Tabs, ToggleGroup |
| `content-children` | The wrapper generates structure and children are the content of that structure. | Collapsible with `title` |
| `payload-snippet` | The primitive invokes children with typed state/collection payload. | Calendar, Pagination |
| `additive` | Convenience data and children intentionally render together. | legacy Sidebar |
| `presentational` | Native children are simply element content. | Card, Badge, other native display roots |

The examples above are not the inventory. Every key in `componentMetadata`
must be classified.

Keep the existing exported `compositionModel` object for compatibility, but
describe it as the legacy/default children-first model. Add an authoritative
`componentComposition` map, or an equivalent `composition` field on every
metadata entry. A test must prove exact key equality with `componentMetadata`
and reject values outside the closed vocabulary.

### Portal options

Each Popup owns Portal’s children and exposes only Portal options:

```ts
type PortalOptions = Omit<
  ComponentProps<typeof DialogPrimitive.Portal>,
  "children"
>;

type Props = ContentProps & {
  portalProps?: PortalOptions;
};
```

Public option names are `to` and `disabled`. `portalProps.children`,
`container`, and `keepMounted` must be compile-time errors.

### Modal dismissal

Dialog-family popups fix `interactOutsideBehavior="close"` and omit that enum
from their public passthrough. Dialog, Sheet, Drawer, and CommandDialog retain
their primitive's `onInteractOutside`, so a consumer can deliberately call
`preventDefault()` for an exceptional workflow. AlertDialog keeps its exact
primitive type and does not add that omitted callback. There must be no direct
Overlay click handler, parallel close context, or second manual `open = false`
path.

## Implementation

### Step 0: Reconcile the live Alert Dialog work

Before editing:

1. list every dirty AlertDialog, metadata, registry, docs, and test file;
2. separate visual changes from close-state changes;
3. keep the visual work;
4. remove only redundant dismissal machinery as Step 3 specifies;
5. do not run generators until the retained source/metadata state is coherent.

**Verify**: capture `git diff --stat` in the handoff and confirm no unrelated
dirty file was reverted.

### Step 1: Encode and enforce per-root composition

Classify every metadata root with the vocabulary above. Then inspect every
`children-first-fallback` implementation and make supplied children the first
branch; title/description, options/items/tabs, default trigger, and generated
popup/list content must be ignored in that branch.

Required corrections:

- Dialog, AlertDialog, Sheet, and Drawer must not wrap compound children inside
  a generated title/description popup.
- Accordion, ToggleGroup, and RadioGroup must not prefer non-empty convenience
  arrays over compound children.
- Tabs must not render compound children inside only its first generated panel.
- Menu, Select, Combobox, and Autocomplete must retain their already-correct
  children-first structure.

Required exceptions:

- Collapsible retains `title + children` as trigger plus content.
- Sidebar retains `items + children` additive behavior and documents it as a
  legacy convenience mode.
- Calendar and Pagination retain typed payload snippets.

Replace the current source-only composition test with:

1. metadata coverage/valid-mode assertions;
2. rendered conflict fixtures for each children-first implementation family;
3. rendered exception fixtures for Collapsible and Sidebar;
4. type/runtime payload assertions for Calendar and Pagination.

**Verify**:

```sh
pnpm --filter coss-svelte test
node --test tests/composition-contract.test.mjs
```

Both commands exit 0.

### Step 2: Add exact portal forwarding to all 12 Popup parts

For each listed Popup:

1. derive its own primitive Portal options;
2. omit Portal `children`;
3. destructure `portalProps`;
4. spread `portalProps` only on Portal;
5. preserve Content props, Content ref/bindings, classes, and `data-slot`;
6. avoid generic `Record<string, unknown>` helpers.

TooltipPopup currently owns only Content. Move the Tooltip Portal into
TooltipPopup and remove the corresponding wrapper from Tooltip’s convenience
path so convenience and compound modes each render exactly one Portal.

Add type-consumer cases:

- accept `portalProps={{ to: "#portal-host" }}`;
- accept an Element target and `{ disabled: true }`;
- reject `container`, `keepMounted`, and `children`.

Add browser fixtures that prove:

- an Element target contains the popup;
- a selector target contains the popup;
- no duplicate popup remains under `document.body`;
- `disabled: true` renders inline.

Use representative runtime tests for each primitive namespace (Dialog, Menu,
Popover/Tooltip/LinkPreview, Combobox, Select) plus structural/type coverage for
all 12 wrappers.

**Verify**:

```sh
pnpm test:type-consumer
pnpm --filter coss-svelte test
```

### Step 3: Reduce every modal to one Bits-owned close path

For Dialog, AlertDialog, Sheet, Drawer, and CommandDialog:

1. set Content’s outside behavior to `close`;
2. omit `interactOutsideBehavior` from the wrapper’s public props;
3. forward `onInteractOutside` without overwriting it where the exact primitive
   exposes it; do not add it to AlertDialog;
4. remove Overlay `onclick`;
5. remove contexts or manual setters used only for backdrop closing;
6. leave Content clicks untouched;
7. preserve Escape behavior and trigger focus restoration.

Playwright must use real pointer interaction against a visible part of the
overlay. For every modal family assert:

- backdrop pointer interaction closes;
- Content pointer interaction does not close;
- Escape closes;
- focus returns to the trigger;
- `bind:open`, `onOpenChange`, and `onOpenChangeComplete` do not receive
  duplicate transitions;
- an `onInteractOutside` handler that prevents default keeps Dialog, Sheet,
  Drawer, and CommandDialog open;
- AlertDialog's generated props reject the callback while backdrop interaction
  still closes it.

Run the family at desktop and a 390×844 viewport. Await semantic open/closed
state, never an arbitrary animation sleep.

### Step 4: Correct docs, metadata, and generated output

- Explain every composition mode and the per-root source of truth.
- Replace all portal references to `container`/`keepMounted` with
  `to`/`disabled`.
- State that custom portal targets are a Popup-part capability.
- State default modal backdrop dismissal, the cancellable standard-dialog
  exception, and AlertDialog's fixed public surface.
- Preserve the user’s Alert Dialog visual and copy changes.
- Run package/scope/registry generators; do not hand-edit generated JSON.

**Verify**:

```sh
pnpm package:index:check
pnpm scope:check
pnpm registry:check
pnpm examples:check
```

### Step 5: Run publish-facing verification

Run focused browser tests first, then:

```sh
pnpm release:check
```

Record the commands, exit codes, and any intentionally retained dirty files.

## Acceptance criteria

- [ ] Every metadata root has exactly one valid composition mode.
- [ ] Children-first roots and all named exceptions match their mode at runtime.
- [ ] All 12 Popup surfaces expose exact Bits `{ to, disabled }` options.
- [ ] Portal-owned children and React/Base UI aliases are rejected by types.
- [ ] Every modal backdrop closes through one Bits UI path.
- [ ] Content clicks do not close, Escape still closes, and focus restores.
- [ ] Alert Dialog has no overlay close handler or close-only context.
- [ ] Controlled callbacks observe one transition; cancellation works only on
      the four primitive surfaces that expose it.
- [ ] Scope, registry, declarations, tests, and `pnpm release:check` pass.

## STOP conditions

- Stop if a `content-children`, `payload-snippet`, or `additive` root would need
  a breaking semantic change; create a separate deprecation plan instead.
- Stop if TooltipPopup cannot own exactly one Portal in both convenience and
  compound modes.
- Stop if Bits UI cannot dismiss Alert Dialog through its normal dismissible
  layer; produce a minimal reproduction before adding wrapper state.
- Stop if the user-owned Alert Dialog edits cannot be cleanly separated from
  the dismissal change.
- Stop if a generator would overwrite unreconciled source or metadata work.

## Maintenance notes

The composition map is a public design contract: adding a root requires a mode
in the same change. Portal tests must use actual DOM targets after Bits UI
upgrades. Event reviewers should specifically look for duplicate close paths,
because a visually correct overlay can still emit duplicate state callbacks.
