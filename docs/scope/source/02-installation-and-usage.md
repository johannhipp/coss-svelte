# Installation And Usage Scope

This file summarizes the cross-cutting rules from the COSS skill references. It is not a replacement for each component's docs; it records the boundaries that apply across the library.

## Library Base

- COSS UI is a React component library built on Base UI and styled with Tailwind CSS v4.
- The component model is copy-paste-and-own, installed through the shadcn CLI registry path.
- Prefer styled COSS exports first. Use `*Primitive` exports only for advanced custom composition.

## Recommended CLI Paths

```bash
# New projects with full style setup
npx shadcn@latest init @coss/style

# Existing projects, all primitives
npx shadcn@latest add @coss/ui

# Existing projects, full theme setup
npx shadcn@latest add @coss/style

# Existing projects, primitives plus neutral color tokens
npx shadcn@latest add @coss/ui @coss/colors-neutral
```

Add a single component with:

```bash
npx shadcn@latest add @coss/<component>
```

Useful preview commands when supported:

```bash
npx shadcn@latest add @coss/dialog --dry-run
npx shadcn@latest add @coss/dialog --diff
npx shadcn@latest add @coss/dialog --view
```

## Manual Install Boundary

- Read the target component docs before manual installation.
- Install exactly the dependencies listed there.
- Copy all required component files, including transitive local imports.
- Adjust import aliases for the target app.
- Include the COSS theme tokens and font variables when not using the CLI style setup.

## Composition Rules

- Use existing primitives and particle patterns before writing custom behavior.
- For trigger-based components, keep the documented trigger and popup hierarchy.
- Svelte composition uses snippets and the exact Bits `child` contract on parts that deliberately delegate their element; do not copy React `render` or Radix `asChild` props.
- Dialog-like components need their title, description, panel, and footer structures preserved when the flow uses them.
- Use controlled state for cross-component flows such as menu item opens dialog.
- Root behavior is classified in `componentComposition`: compound, children-first fallback, content children, payload snippet, additive, or presentational. Children replace the full convenience hierarchy only for roots classified `children-first-fallback`.

## Forms And Inputs

- Form-bound controls should usually be wrapped with `Field`, `FieldLabel`, `FieldDescription`, and `FieldError`.
- Specify `type` on inputs and buttons in form flows.
- Preserve visible label associations or provide `aria-label` where no label is visible.
- In `InputGroup`, place `InputGroupAddon` after `InputGroupInput` or `InputGroupTextarea` in DOM order.
- In `OTPField`, keep the root `length` synchronized with the number of rendered slots.

## Styling Scope

- Use semantic tokens such as `text-muted-foreground` and `bg-destructive`.
- Prefer component variants and size props before custom class overrides.
- Use `flex flex-col gap-*` layouts instead of `space-x-*` or `space-y-*`.
- Prefer `size-*` utilities for square sizing.
- Keep Tailwind v4 syntax, including COSS token usage like `--alpha()`.
- Do not add numeric icon `size` props by default; prefer inherited sizing or utility classes.

## Portal Forwarding

The `portalProps` escape hatch is available only on specific portaled surfaces:

- `DialogPopup`, `AlertDialogPopup`, `SheetPopup`, `DrawerPopup`, `CommandDialogPopup`
- `MenuPopup`, `PopoverPopup`, `TooltipPopup`, `PreviewCardPopup`, `AutocompletePopup`, `ComboboxPopup`, `SelectPopup`
- `ContextMenuPopup` and `ContextMenuSubPopup`

The exact Bits UI options are `to?: Element | string` and `disabled?: boolean`.
Use `to` for an element or selector target and `disabled` for inline rendering.
Popup components own Portal children; React/Base UI names such as `container`
and `keepMounted` are not part of the Svelte API. Placement still belongs to
the popup's placement props.

Dialog, Alert Dialog, Sheet, Drawer, and Command Dialog close from a backdrop
pointer interaction through the Bits dismissible layer. Dialog, Sheet, Drawer,
and Command Dialog can cancel an exceptional outside interaction through
`onInteractOutside(event.preventDefault())`; Alert Dialog deliberately retains
Bits UI's fixed public surface.

## Migration Boundaries

- Do not copy shadcn/Radix snippets and only change imports.
- Confirm exact COSS exports and child structure for each primitive.
- Convert `asChild` assumptions to documented COSS `render` composition where supported.
- For Select, prefer the `items`-first pattern and put placeholders on `SelectValue`.
- For Toggle Group, COSS uses array values and `multiple` semantics rather than Radix `type="single"` mental models.
- For Slider, COSS supports scalar single-value usage.
