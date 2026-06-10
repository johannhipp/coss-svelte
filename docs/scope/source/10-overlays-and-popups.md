# Overlays & Popups

Components in this category: 9

## Dialog

- Purpose: A modal overlay for displaying content that requires user interaction.
- Registry name: `Dialog`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/dialog.md`; [docs](https://coss.com/ui/docs/components/dialog.md); 6 particles
- Install: `npx shadcn@latest add @coss/dialog`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Dialog`, `DialogClose`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogPanel`, `DialogPopup`, `DialogTitle`, `DialogTrigger`

### Covers

- Modal overlays that require user focus and explicit action.
- Multi-section popup flows with header/body/footer structure.

### Out Of Scope / Use Another Primitive

- If the overlay should slide from the edge -> use Sheet or Drawer instead.
- If the interaction is a destructive confirmation -> use AlertDialog instead.
- If the content is non-blocking contextual info -> use Popover instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `DialogPopup` -> Base UI `Dialog.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).
- **Section structure invariant**: keep `DialogHeader`, `DialogPanel`, and `DialogFooter` as direct sections in `DialogPopup` to preserve built-in layout/styling behavior.
- **Form in dialog**: keep **`DialogHeader`** outside the form; wrap **`DialogPanel`** + **`DialogFooter`** in **`<Form className="contents">`** (or native `<form className="contents">`) so the popup's flex column treats header, panel, and footer as direct layout sections.
- **Action buttons**: use `DialogClose` with `render={<Button ... />}` for cancel/close actions and set explicit `type` on submit/action buttons.
- **Scrollable content**: keep long content inside `DialogPanel` to preserve dialog scroll behavior.
- **Footer variants**: use `DialogFooter variant="bare"` when border/background framing should be removed.
- **Controlled open state**: for cross-component flows (for example menu item opens dialog), control with `open` + `onOpenChange`.
- **Detached trigger option (advanced)**: when the opener cannot live in the same subtree, use a detached/external trigger pattern via controlled state (`open` + `onOpenChange`) instead of forcing local `DialogTrigger` composition.
- **Close confirmation flow**: when unsaved changes exist, combine controlled `Dialog` with `AlertDialog` confirmation before closing.
- **Nested dialogs**: supported; use clear trigger hierarchy and consider disabling default close buttons with `showCloseButton={false}` when custom actions are preferred.
- **Responsive dialog/drawer variant**: for form-heavy overlays, use `Dialog` on desktop and switch to `Drawer` on mobile (`useMediaQuery("max-md")`), keeping the same `Form` structure in both.

### Common Pitfalls

- Omitting `render={<Button ... />}` composition on trigger/close actions.
- Forgetting title/description structure in real dialogs.
- Wrapping dialog sections with extra containers that break `DialogHeader`/`DialogPanel`/`DialogFooter` layout; prefer **header outside**, **`Form className="contents"`** around **panel + footer** only.
- Putting large body content outside `DialogPanel` when scrolling is needed.
- Missing explicit button `type` inside dialog forms/actions.
- Using uncontrolled dialog patterns when the flow requires cross-component state coordination.
- Using non-coss composition APIs without verifying docs.

### Canonical Import Shape

```tsx
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
```

### Particle Coverage

- `p-dialog-1`: Dialog with form ([JSON](https://coss.com/ui/r/p-dialog-1.json))
- `p-dialog-6`: Dialog with bare footer ([JSON](https://coss.com/ui/r/p-dialog-6.json))
- `p-dialog-2`: Dialog opened from menu ([JSON](https://coss.com/ui/r/p-dialog-2.json))
- `p-dialog-3`: Nested dialogs ([JSON](https://coss.com/ui/r/p-dialog-3.json))
- `p-dialog-4`: Dialog with close confirmation ([JSON](https://coss.com/ui/r/p-dialog-4.json))
- `p-dialog-5`: Dialog with long content ([JSON](https://coss.com/ui/r/p-dialog-5.json))

---

## Alert Dialog

- Purpose: A modal dialog that interrupts the user workflow for critical confirmations.
- Registry name: `AlertDialog`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/alert-dialog.md`; [docs](https://coss.com/ui/docs/components/alert-dialog.md); 2 particles
- Install: `npx shadcn@latest add @coss/alert-dialog`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `AlertDialog`, `AlertDialogClose`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogPopup`, `AlertDialogTitle`, `AlertDialogTrigger`

### Covers

- Critical confirmation flows before destructive actions.
- Blocking decisions that require explicit acknowledgement.

### Out Of Scope / Use Another Primitive

- If the content is informational (no destructive action) -> use Dialog instead.
- If the message is transient feedback -> use Toast instead.
- If the content is contextual and non-blocking -> use Popover instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `AlertDialogPopup` -> Base UI `AlertDialog.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).
- **Section structure**: keep `AlertDialogHeader` and `AlertDialogFooter` as direct sections of `AlertDialogPopup` (there is no `AlertDialogPanel`; add a `div` or fragment between them only if you need extra body content).
- **Action composition**: use `AlertDialogClose render={<Button ... />}` for cancel/confirm actions to preserve button semantics and styling.
- **Destructive affordance**: pair destructive trigger/confirm variants (`destructive-outline`, `destructive`) for clear risk signaling.
- **Footer variants**: use `AlertDialogFooter variant="bare"` when border/background framing should be removed.
- **Close confirmation chain**: for unsaved changes in broader workflows, pair with dialog flows like `p-dialog-4`.

### Common Pitfalls

- Using AlertDialog as a generic content modal instead of high-risk confirmation UI.
- Omitting explicit destructive/cancel action distinction.
- Wrapping dialog sections in extra containers that break built-in layout (use `className="contents"` only when needed).
- Mixing Dialog/Popover composition APIs without validating this primitive's parts.
- Skipping focus-return and escape-key verification on real trigger flows.

### Canonical Import Shape

```tsx
import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
```

### Particle Coverage

- `p-alert-dialog-1`: Alert dialog ([JSON](https://coss.com/ui/r/p-alert-dialog-1.json))
- `p-alert-dialog-2`: Alert dialog with bare footer ([JSON](https://coss.com/ui/r/p-alert-dialog-2.json))

---

## Sheet

- Purpose: A flyout that opens from the side of the screen, based on the dialog component.
- Registry name: `Sheet`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/sheet.md`; [docs](https://coss.com/ui/docs/components/sheet.md); 3 particles
- Install: `npx shadcn@latest add @coss/sheet`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Sheet`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetPanel`, `SheetPopup`, `SheetTitle`, `SheetTrigger`

### Covers

- Side-panel overlays for settings/details/workflows.
- Persistent context panels opened from main content area.

### Out Of Scope / Use Another Primitive

- If the overlay should be centered and focused -> use Dialog instead.
- If the overlay is a mobile-only bottom panel -> use Drawer instead.
- If the flow is a destructive confirmation -> use AlertDialog instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `SheetPopup` -> Base UI `Dialog.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Using sheet for simple tooltip/popover hints that do not need panel behavior.
- Missing close actions and focus-return verification on open/close cycle.
- Overloading sheet with multi-step form logic better handled by dedicated route/modal flow.

### Canonical Import Shape

```tsx
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetPanel,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
```

### Particle Coverage

- `p-sheet-1`: Basic sheet ([JSON](https://coss.com/ui/r/p-sheet-1.json))
- `p-sheet-2`: Sheet inset ([JSON](https://coss.com/ui/r/p-sheet-2.json))
- `p-sheet-3`: Sheet position ([JSON](https://coss.com/ui/r/p-sheet-3.json))

---

## Drawer

- Purpose: A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.
- Registry name: `Drawer`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/drawer.md`; [docs](https://coss.com/ui/docs/components/drawer.md); 14 particles
- Install: `npx shadcn@latest add @coss/drawer`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Drawer`, `DrawerCreateHandle`, `DrawerClose`, `DrawerContent`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerMenu`, `DrawerMenuCheckboxItem`, `DrawerMenuGroup`, `DrawerMenuGroupLabel`, `DrawerMenuItem`, `DrawerMenuRadioGroup`, `DrawerMenuRadioItem`, `DrawerMenuSeparator`, `DrawerPanel`, `DrawerPopup`, `DrawerMenuTrigger`, `DrawerTitle`, `DrawerTrigger`

### Covers

- Mobile-first overlay panels and bottom sheets.
- Form-heavy or multi-step overlays where popover is too constrained.

### Out Of Scope / Use Another Primitive

- If the overlay should be a centered modal -> use Dialog instead.
- If the overlay should be a persistent side panel on desktop -> use Sheet instead.
- If you need a simple confirmation -> use AlertDialog instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `DrawerPopup` -> Base UI `Drawer.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Using drawer for desktop modal flows where dialog/sheet is clearer.
- Forgetting responsive switch logic when drawer is mobile-only variant.
- Breaking section layout by putting the whole dialog in a block-level `<form>`; prefer **header outside**, **`Form className="contents"`** around **panel + footer** (see dialog/form skills).

### Canonical Import Shape

```tsx
import {
	Drawer,
	DrawerCreateHandle,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerMenu,
	DrawerMenuCheckboxItem,
	DrawerMenuGroup,
	DrawerMenuGroupLabel,
	DrawerMenuItem,
	DrawerMenuRadioGroup,
	DrawerMenuRadioItem,
	DrawerMenuSeparator,
	DrawerPanel,
	DrawerPopup,
	DrawerMenuTrigger,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
```

### Particle Coverage

- `p-drawer-1`: Simple bottom drawer with close button ([JSON](https://coss.com/ui/r/p-drawer-1.json))
- `p-drawer-2`: Bottom drawer without drag bar ([JSON](https://coss.com/ui/r/p-drawer-2.json))
- `p-drawer-3`: Drawer with close button ([JSON](https://coss.com/ui/r/p-drawer-3.json))
- `p-drawer-4`: Inset variant drawers for all four positions ([JSON](https://coss.com/ui/r/p-drawer-4.json))
- `p-drawer-5`: Straight variant drawers for all four positions ([JSON](https://coss.com/ui/r/p-drawer-5.json))
- `p-drawer-6`: Scrollable content with terms and conditions ([JSON](https://coss.com/ui/r/p-drawer-6.json))
- `p-drawer-7`: Nested bottom drawers with centered content ([JSON](https://coss.com/ui/r/p-drawer-7.json))
- `p-drawer-8`: Nested right drawers with inset variant ([JSON](https://coss.com/ui/r/p-drawer-8.json))
- `p-drawer-9`: Bottom drawer with snap points ([JSON](https://coss.com/ui/r/p-drawer-9.json))
- `p-drawer-10`: Edit profile form with default and bare footer variants ([JSON](https://coss.com/ui/r/p-drawer-10.json))
- `p-drawer-11`: Mobile menu drawer from the left ([JSON](https://coss.com/ui/r/p-drawer-11.json))
- `p-drawer-12`: Responsive edit profile: dialog on desktop, drawer on mobile ([JSON](https://coss.com/ui/r/p-drawer-12.json))
- `p-drawer-13`: Responsive actions menu: menu on desktop, drawer on mobile ([JSON](https://coss.com/ui/r/p-drawer-13.json))
- `p-drawer-14`: Left drawer with swipe area ([JSON](https://coss.com/ui/r/p-drawer-14.json))

---

## Popover

- Purpose: A floating container that appears near a trigger element.
- Registry name: `Popover`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/popover.md`; [docs](https://coss.com/ui/docs/components/popover.md); 3 particles
- Install: `npx shadcn@latest add @coss/popover`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Popover`, `PopoverClose`, `PopoverCreateHandle`, `PopoverDescription`, `PopoverPopup`, `PopoverTitle`, `PopoverTrigger`

### Covers

- Contextual floating content near a trigger.
- Inline editing/help panels without full modal lock.

### Out Of Scope / Use Another Primitive

- If the content requires user focus/action before dismissal -> use Dialog instead.
- If the content is just a short text hint -> use Tooltip instead.
- If it's a list of actions -> use Menu instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `PopoverPopup` -> Base UI `Popover.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).
- **Form-in-popover**: use `PopoverPopup` as a lightweight form container (for example feedback forms with `Form` + `Field` + `Textarea`).
- **Dismiss controls**: use `PopoverClose` both for footer actions and icon close buttons (`aria-label` + `render={<Button size="icon" .../>}`).
- **Tooltip-like popovers**: use `tooltipStyle` for info-icon helper content where tooltip density is preferred.
- **Detached triggers**: use `PopoverCreateHandle` + shared `handle`/`payload` on multiple `PopoverTrigger`s to animate one popup across triggers.
- **Position tuning**: only add `side`, `align`, `sideOffset`, `alignOffset` when default anchoring is not sufficient.

### Common Pitfalls

- Treating Popover as a modal replacement when the flow needs full modal behavior (use Dialog/AlertDialog instead).
- Forgetting `render` composition on trigger/close when using coss buttons.
- Missing accessible names on icon-only triggers or close controls.
- Using detached trigger handles without stable payload/content mapping.
- Copying Tooltip patterns directly without checking `tooltipStyle` and popover semantics.

### Canonical Import Shape

```tsx
import {
	Popover,
	PopoverClose,
	PopoverCreateHandle,
	PopoverDescription,
	PopoverPopup,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
```

### Particle Coverage

- `p-popover-1`: Popover with a form ([JSON](https://coss.com/ui/r/p-popover-1.json))
- `p-popover-2`: Popover with close button ([JSON](https://coss.com/ui/r/p-popover-2.json))
- `p-popover-3`: Animated popovers ([JSON](https://coss.com/ui/r/p-popover-3.json))

---

## Tooltip

- Purpose: A small overlay that provides contextual information on hover or focus.
- Registry name: `Tooltip`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/tooltip.md`; [docs](https://coss.com/ui/docs/components/tooltip.md); 4 particles
- Install: `npx shadcn@latest add @coss/tooltip`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Tooltip`, `TooltipCreateHandle`, `TooltipPopup`, `TooltipProvider`, `TooltipTrigger`

### Covers

- Short helper text on hover/focus for controls and icons.
- Non-blocking contextual hints without modal behavior.

### Out Of Scope / Use Another Primitive

- If the content is interactive (links, buttons) -> use Popover instead.
- If the content is rich (images, forms) -> use PreviewCard or Popover instead.
- If the hint should persist until dismissed -> use Popover instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `TooltipPopup` -> Base UI `Tooltip.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Placing interactive controls inside tooltip content (tooltip should stay informational).
- Relying on tooltip as sole label for icon-only controls (still provide accessible name).
- Using tooltip for long-form content that should be popover/dialog.

### Canonical Import Shape

```tsx
import {
	Tooltip,
	TooltipCreateHandle,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
```

### Particle Coverage

- `p-tooltip-1`: Basic tooltip ([JSON](https://coss.com/ui/r/p-tooltip-1.json))
- `p-tooltip-2`: Grouped tooltips ([JSON](https://coss.com/ui/r/p-tooltip-2.json))
- `p-tooltip-3`: Toggle group animated tooltip ([JSON](https://coss.com/ui/r/p-tooltip-3.json))
- `p-tooltip-4`: Vertical group with animated tooltip ([JSON](https://coss.com/ui/r/p-tooltip-4.json))

---

## Preview Card

- Purpose: A rich preview component for displaying linked content.
- Registry name: `PreviewCard`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/preview-card.md`; [docs](https://coss.com/ui/docs/components/preview-card.md); 1 particle
- Install: `npx shadcn@latest add @coss/preview-card`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Button`, `PreviewCard`, `PreviewCardPopup`, `PreviewCardTrigger`

### Covers

- Hover/focus-triggered rich preview content.
- Contextual details for users/entities without full navigation.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `PreviewCardPopup` -> Base UI `PreviewCard.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Using preview card for critical workflows requiring explicit modal interaction.
- Missing accessible trigger labels when using icon-only triggers.
- Rendering heavy async content on every hover without throttling/caching strategy.

### Canonical Import Shape

```tsx
import { Button } from "@/components/ui/button";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/components/ui/preview-card";
```

### Particle Coverage

- `p-preview-card-1`: Preview card with popup ([JSON](https://coss.com/ui/r/p-preview-card-1.json))

---

## Menu

- Purpose: A list of actions or options revealed on demand.
- Registry name: `Menu`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/menu.md`; [docs](https://coss.com/ui/docs/components/menu.md); 9 particles
- Install: `npx shadcn@latest add @coss/menu`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Menu`, `MenuCheckboxItem`, `MenuGroup`, `MenuGroupLabel`, `MenuItem`, `MenuPopup`, `MenuRadioGroup`, `MenuRadioItem`, `MenuSeparator`, `MenuShortcut`, `MenuSub`, `MenuSubPopup`, `MenuSubTrigger`, `MenuTrigger`

### Covers

- Contextual action lists and dropdown commands.
- Mixed item types (regular, checkbox, radio, nested submenu).

### Out Of Scope / Use Another Primitive

- If the user needs to search/filter actions -> use Command instead.
- If the content is rich informational (not actions) -> use Popover instead.
- If the overlay is a full modal flow -> use Dialog instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `MenuPopup` -> Base UI `Menu.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).
- Use `MenuTrigger render={<Button ... />}` as the default trigger composition.
- Use `openOnHover` on `MenuTrigger` only for explicit hover-driven UX.
- Use `MenuItem render={<Link ... />}` for navigational entries.
- Use `MenuItem closeOnClick` for action menus where selection should always dismiss the popup.
- Use `MenuCheckboxItem variant="switch"` for toggle-style preferences.
- Use `MenuRadioGroup` + `MenuRadioItem` with a `defaultValue` when enforcing single-choice selection.
- Use `MenuShortcut` to display keyboard hints in dense command menus.
- Use `variant="destructive"` on dangerous actions.
- For responsive action menus, keep desktop on `Menu` and switch mobile to `DrawerMenu` / `DrawerMenuTrigger` / `DrawerMenuItem` patterns.
- In `DrawerMenu` flows, wrap actionable rows with `DrawerClose render={<DrawerMenuItem />}` when selection should dismiss the drawer.

### Common Pitfalls

- Forgetting `MenuGroup` around grouped structures.
- Missing submenu pair (`MenuSubTrigger` + `MenuSubPopup`) for nested actions.
- Mixing navigation and action items without clear close behavior (`closeOnClick`) and semantics.

### Canonical Import Shape

```tsx
import {
	Menu,
	MenuCheckboxItem,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
} from "@/components/ui/menu";
```

### Particle Coverage

- `p-menu-1`: Basic menu ([JSON](https://coss.com/ui/r/p-menu-1.json))
- `p-menu-2`: Menu with hover ([JSON](https://coss.com/ui/r/p-menu-2.json))
- `p-menu-3`: Menu with checkbox ([JSON](https://coss.com/ui/r/p-menu-3.json))
- `p-menu-9`: Menu with checkbox items as switches ([JSON](https://coss.com/ui/r/p-menu-9.json))
- `p-menu-4`: Menu with radio group ([JSON](https://coss.com/ui/r/p-menu-4.json))
- `p-menu-5`: Menu with link ([JSON](https://coss.com/ui/r/p-menu-5.json))
- `p-menu-6`: Menu with group labels ([JSON](https://coss.com/ui/r/p-menu-6.json))
- `p-menu-7`: Nested menu ([JSON](https://coss.com/ui/r/p-menu-7.json))
- `p-menu-8`: Menu close on click ([JSON](https://coss.com/ui/r/p-menu-8.json))

---

## Command

- Purpose: A command palette component built with Dialog and Autocomplete for searching and executing commands.
- Registry name: `Command`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/command.md`; [docs](https://coss.com/ui/docs/components/command.md); 2 particles
- Install: `npx shadcn@latest add @coss/command`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Command`, `CommandCollection`, `CommandDialog`, `CommandDialogPopup`, `CommandDialogTrigger`, `CommandEmpty`, `CommandFooter`, `CommandGroup`, `CommandGroupLabel`, `CommandInput`, `CommandItem`, `CommandList`, `CommandPanel`, `CommandSeparator`, `CommandShortcut`, `Button`

### Covers

- Command palette and keyboard-navigable action menus.
- Fast action discovery for power-user and app shortcut workflows.

### Out Of Scope / Use Another Primitive

- If the list is a simple set of actions without search -> use Menu instead.
- If the user is selecting from a predefined list -> use Select or Combobox instead.
- If the flow is a data form -> use Form instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `CommandDialogPopup` -> Base UI `Dialog.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Using command list without clear grouping and action labels.
- Binding critical destructive actions without confirmation pathway.
- Missing keyboard accessibility checks for arrow/select/escape interactions.

### Canonical Import Shape

```tsx
import {
	Command,
	CommandCollection,
	CommandDialog,
	CommandDialogPopup,
	CommandDialogTrigger,
	CommandEmpty,
	CommandFooter,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandList,
	CommandPanel,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
```

### Particle Coverage

- `p-command-1`: Command palette with dialog ([JSON](https://coss.com/ui/r/p-command-1.json))
- `p-command-2`: Command palette with AI assistant ([JSON](https://coss.com/ui/r/p-command-2.json))
