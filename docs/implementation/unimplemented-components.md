# Unimplemented Components And Parity Gaps

This file tracks components or behaviors skipped because implementing them now would be brittle, incomplete, or too far beyond the v0.1 scope decisions.

Use this file for factual limitations of the current implementation. Use
[Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md) for prioritization and
promotion criteria beyond the first release.

## Status Semantics

| Status | Meaning |
| --- | --- |
| Deferred | Not part of stable v0.1. Do not implement until its spec and tests are ready. |
| Stable partial | Stable enough for v0.1, but not a full COSS/Base UI parity clone. |
| Experimental | Exported or demonstrated only with explicit caveats. Must not be marketed as stable. |
| Cross-cutting deferred | Applies across multiple components, docs, registry, examples, or tests. |

## Deferred From Stable v0.1

No canonical component root is currently deferred. Number Field moved to the
stable surface after its spinbutton, keyboard, bounds, locale, formatting,
pointer, form, reset, SSR, and Field-integration contracts were implemented and
tested.

## Stable Components With Known Parity Gaps

| Item | Status | Implemented Now | Missing For Full Parity |
| --- | --- | --- | --- |
| Autocomplete | Stable partial | Combobox-backed root, input, popup, list, group, item, separator, empty, status, collection parts, and documented `showTrigger` input affordance. | True free-text autocomplete semantics, `useAutocompleteFilter`, async loading/error state helpers, result limiting, `showClear` input affordance, and object result stringification policy. |
| Combobox | Stable partial | Bits UI root, input, trigger, popup, list, group, item, separator, and structural clear/value/empty/collection parts. | Automatic `ComboboxClear` state reset, render-prop collection semantics, `useComboboxFilter`, async/loading examples, object value serialization policy, and empty state tied to filtered results. |
| Command | Stable partial | Bits UI command root, dialog shell, trigger, popup, input, empty, list, group, collection, item, panel, separator, footer, and shortcut parts. | Global keyboard shortcut wiring, action execution conventions, grouped async command examples, destructive-action confirmation patterns, and full dialog focus restoration tests. |
| Context Menu | Stable partial | Complete Bits UI-backed root, keyboard-capable trigger, popup and portal, action/link/checkbox/radio items, groups, labels, separator, shortcut, and submenu family. | Additional COSS particle examples and maintained visual regression baselines; core component behavior is implemented. |
| Menu | Stable partial | Bits UI root, trigger, popup, item, checkbox item, radio group/item, group, group label, separator, submenu, submenu trigger/popup, and shortcut helper. | Drawer menu responsive variants, hover-open tuning, COSS `MenuLinkItem` parity if Bits UI adds a matching DropdownMenu link primitive, switch-style checkbox item variant, and menu-to-dialog cross-flow examples. |
| Number Field | Stable partial | Custom finite-number state, locale-aware editing/formatting, decimal-safe steps, bounds, scrub and wheel input, press-and-hold controls, native form serialization/reset, Field integration, and SSR behavior. | Additional particle examples and assistive-technology lab coverage; the published component contract is implemented. |
| Sheet | Stable partial | Dialog-backed root, trigger, popup, title, description, header, content, panel, footer, close, and side placement classes. | Inset variants, responsive sheet/drawer switching examples, side-specific animation tokens, and focus restoration browser coverage. |

## Experimental Implementations

| Item | Status | Implemented Now | Missing For Stable |
| --- | --- | --- | --- |
| Drawer | Experimental | Dialog-backed bottom panel with trigger, popup, handle, title, description, content, footer, close, focus handling, escape, and outside-click dismiss. | Drag gestures, snap points, nested drawers, physics, mobile swipe tuning, drawer menu variants, and responsive dialog/drawer switching examples. |
| Sidebar | Experimental | Provider-owned bindable open state, functional trigger and rail toggles, expanded/collapsed data state, grouped menu structure, inset content, badge, skeleton, and sub-menu helpers. | Persistence, mobile drawer mode, keyboard shortcut policy, complete collapsed-icon/tooltips behavior, layout token decisions, and broader browser coverage. |
| Toast | Experimental | Provider, viewport, basic manager add flow, bindable/dismissible live-region surface, and runtime lifecycle tests. | Queue and auto-dismiss policy, update/dedupe/upsert and promise helpers, pause-on-hover, action focus, anchored/multiple viewports, reduced motion, and swipe gestures. |

## Cross-Cutting Deferred Work

- Standalone `CheckboxIndicator` part. Bits UI Checkbox exposes checked and indeterminate state through the root children snippet instead of a separate indicator primitive, so the current Svelte wrapper renders its indicator internally. Adding a standalone indicator without a real context API would be brittle.
- Full COSS particle parity.
- Registry install/update CLI.
- Visual regression against coss.com reference pages.
- Full Base UI behavior compatibility where Bits UI does not provide a matching Svelte primitive.
- Optional Superforms/formsnap/Zod adapters in core.
- Multiple visual style presets.

## Update Rules

- Add a row here when implementation skips behavior that appears in the COSS source inventory.
- Keep the "Implemented Now" column factual and specific.
- Move items out of this file only after implementation and verification are both complete.
- If an item is large enough to need roadmap sequencing, mirror it in [Post-v0.1 Parity Backlog](./post-v0.1-parity-backlog.md).
