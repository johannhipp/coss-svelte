# Content & Display

Components in this category: 9

## Card

- Purpose: A content container for grouping related information.
- Registry name: `Card`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/card.md`; [docs](https://coss.com/ui/docs/components/card.md); 11 particles
- Install: `npx shadcn@latest add @coss/card`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Card`, `CardDescription`, `CardFooter`, `CardHeader`, `CardPanel`, `CardTitle`

### Covers

- Structured surface sections for grouped content.
- Settings, dashboard, and preview layouts with header/panel/footer semantics.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Skipping `CardHeader`/`CardPanel`/`CardFooter` structure in composed cards.
- Mixing unrelated layout wrappers that break spacing between card sections.
- Using cards as generic wrappers when `Frame` or plain layout would be clearer.

### Canonical Import Shape

```tsx
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@/components/ui/card";
```

### Particle Coverage

- `p-card-1`: A basic card with header and footer ([JSON](https://coss.com/ui/r/p-card-1.json))
- `p-card-2`: Authentication card with actions ([JSON](https://coss.com/ui/r/p-card-2.json))
- `p-card-3`: Authentication card with separators ([JSON](https://coss.com/ui/r/p-card-3.json))
- `p-card-4`: Framed card with footer ([JSON](https://coss.com/ui/r/p-card-4.json))
- `p-card-5`: Framed card with header ([JSON](https://coss.com/ui/r/p-card-5.json))
- `p-card-6`: Framed card with header and footer ([JSON](https://coss.com/ui/r/p-card-6.json))
- `p-card-7`: Framed card with no rounded bottom ([JSON](https://coss.com/ui/r/p-card-7.json))
- `p-card-8`: Card within a frame and footer ([JSON](https://coss.com/ui/r/p-card-8.json))
- `p-card-9`: Card within a frame and footer ([JSON](https://coss.com/ui/r/p-card-9.json))
- `p-card-10`: Card within a frame with header and footer ([JSON](https://coss.com/ui/r/p-card-10.json))
- `p-card-11`: CardFrame with header action ([JSON](https://coss.com/ui/r/p-card-11.json))

---

## Frame

- Purpose: A container component for displaying content in a frame.
- Registry name: `Frame`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/frame.md`; [docs](https://coss.com/ui/docs/components/frame.md); 4 particles
- Install: `npx shadcn@latest add @coss/frame`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Frame`, `FrameDescription`, `FrameFooter`, `FrameHeader`, `FramePanel`, `FrameTitle`

### Covers

- Bordered app surfaces around content blocks.
- Container wrapper for data components like table, cards, and panes.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using nested frames excessively, causing dense double borders.
- Applying frame as layout grid replacement instead of content surface wrapper.
- Forgetting to align inner component width expectations (table/list full width).

### Canonical Import Shape

```tsx
import {
	Frame,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
```

### Particle Coverage

- `p-frame-1`: Basic frame ([JSON](https://coss.com/ui/r/p-frame-1.json))
- `p-frame-3`: Frame with multiple separated panels ([JSON](https://coss.com/ui/r/p-frame-3.json))
- `p-frame-4`: Frame with multiple stacked panels ([JSON](https://coss.com/ui/r/p-frame-4.json))
- `p-frame-2`: Frame with collapsible content and delete button ([JSON](https://coss.com/ui/r/p-frame-2.json))

---

## Table

- Purpose: A structured data display component with rows and columns.
- Registry name: `Table`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/table.md`; [docs](https://coss.com/ui/docs/components/table.md); 8 particles
- Install: `npx shadcn@latest add @coss/table`
- Manual dependencies: `npm install @tanstack/react-table`
- Canonical exports: `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow`

### Covers

- Structured tabular datasets.
- Sortable/filterable row and column displays.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- **Semantic baseline**: start with `TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell`, then add `TableCaption` and `TableFooter` as needed.
- **Card variant**: set `variant="card"` on `Table` for rounded, card-like rows and separated borders (`p-table-5`). Combine with `Frame` for app-surface framing (`p-table-2`), with `CardFrame` for static tables in a card shell (`p-table-7`), or with TanStack inside `CardFrame` for selection (`p-table-6`) or sorting and pagination (`p-table-8`).
- **Status-rich rows**: combine `Badge` and decorative dots/icons for state columns while keeping text primary.
- **Interactive data grids**: pair coss table parts with TanStack Table (`flexRender`, row models, selection state) for sorting/pagination/selection.
- **No-results state**: always render an explicit empty-state row with `colSpan` matching visible columns.
- **Fixed layout control**: use `className="table-fixed"` and column width styles when predictable column sizing is required.

### Common Pitfalls

- Assuming `Table` itself provides sorting/filter/pagination state; these come from your data layer (for example TanStack Table).
- Mixing header/body cell semantics (`TableHead` in body rows or `TableCell` in headers).
- Forgetting to align `colSpan` with actual visible columns in footer/empty rows.
- Using table patterns where card/list layouts are more suitable on small screens without responsive handling.
- Omitting `aria-label` for row-selection checkboxes in interactive tables.

### Canonical Import Shape

```tsx
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
```

### Particle Coverage

- `p-table-1`: Basic table ([JSON](https://coss.com/ui/r/p-table-1.json))
- `p-table-2`: Frame with card-style table ([JSON](https://coss.com/ui/r/p-table-2.json))
- `p-table-3`: Table with TanStack Table and checkboxes ([JSON](https://coss.com/ui/r/p-table-3.json))
- `p-table-4`: Table with TanStack Table, sorting, and pagination ([JSON](https://coss.com/ui/r/p-table-4.json))
- `p-table-5`: Card-style table variant ([JSON](https://coss.com/ui/r/p-table-5.json))
- `p-table-7`: CardFrame with card-style table ([JSON](https://coss.com/ui/r/p-table-7.json))
- `p-table-6`: CardFrame with TanStack Table and checkboxes ([JSON](https://coss.com/ui/r/p-table-6.json))
- `p-table-8`: CardFrame with TanStack Table, sorting, and pagination ([JSON](https://coss.com/ui/r/p-table-8.json))

---

## Avatar

- Purpose: A visual representation of a user or entity.
- Registry name: `Avatar`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/avatar.md`; [docs](https://coss.com/ui/docs/components/avatar.md); 14 particles
- Install: `npx shadcn@latest add @coss/avatar`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Avatar`, `AvatarFallback`, `AvatarImage`

### Covers

- Identity visuals for users/teams in compact spaces.
- Image + fallback initials patterns in cards, lists, and menus.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Omitting `AvatarFallback`, causing broken image states with no identity fallback.
- Using non-descriptive `alt` text on `AvatarImage` in accessible contexts.
- Relying on oversized custom wrappers instead of built-in size variants/classes.

### Canonical Import Shape

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
```

### Particle Coverage

- `p-avatar-1`: Avatar with image and fallback ([JSON](https://coss.com/ui/r/p-avatar-1.json))
- `p-avatar-2`: Fallback-only avatar ([JSON](https://coss.com/ui/r/p-avatar-2.json))
- `p-avatar-3`: Avatars with different sizes ([JSON](https://coss.com/ui/r/p-avatar-3.json))
- `p-avatar-4`: Avatars with different radii ([JSON](https://coss.com/ui/r/p-avatar-4.json))
- `p-avatar-5`: Overlapping avatar group ([JSON](https://coss.com/ui/r/p-avatar-5.json))
- `p-avatar-6`: Avatar with user icon fallback ([JSON](https://coss.com/ui/r/p-avatar-6.json))
- `p-avatar-7`: Avatar with emerald status dot ([JSON](https://coss.com/ui/r/p-avatar-7.json))
- `p-avatar-8`: Avatar with muted status dot ([JSON](https://coss.com/ui/r/p-avatar-8.json))
- `p-avatar-9`: Rounded avatar with top-right emerald status ([JSON](https://coss.com/ui/r/p-avatar-9.json))
- `p-avatar-10`: Avatar with notification badge ([JSON](https://coss.com/ui/r/p-avatar-10.json))
- `p-avatar-11`: Rounded avatar with notification badge ([JSON](https://coss.com/ui/r/p-avatar-11.json))
- `p-avatar-12`: Avatar with verified badge ([JSON](https://coss.com/ui/r/p-avatar-12.json))
- `p-avatar-13`: Small overlapping avatar group ([JSON](https://coss.com/ui/r/p-avatar-13.json))
- `p-avatar-14`: Large overlapping avatar group ([JSON](https://coss.com/ui/r/p-avatar-14.json))

---

## Badge

- Purpose: A small status indicator or label component.
- Registry name: `Badge`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/badge.md`; [docs](https://coss.com/ui/docs/components/badge.md); 20 particles
- Install: `npx shadcn@latest add @coss/badge`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Badge`

### Covers

- Short status/category labels and counts.
- Inline metadata chips paired with buttons, tables, and cards.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using badge as interactive button without proper button semantics.
- Applying raw palette classes instead of semantic tokens/variants for status.
- Overloading badge content with long text that should be normal body copy.

### Canonical Import Shape

```tsx
import { Badge } from "@/components/ui/badge";
```

### Particle Coverage

- `p-badge-1`: Basic badge ([JSON](https://coss.com/ui/r/p-badge-1.json))
- `p-badge-2`: Outline badge ([JSON](https://coss.com/ui/r/p-badge-2.json))
- `p-badge-3`: Secondary badge ([JSON](https://coss.com/ui/r/p-badge-3.json))
- `p-badge-4`: Destructive badge ([JSON](https://coss.com/ui/r/p-badge-4.json))
- `p-badge-5`: Info badge ([JSON](https://coss.com/ui/r/p-badge-5.json))
- `p-badge-6`: Success badge ([JSON](https://coss.com/ui/r/p-badge-6.json))
- `p-badge-7`: Warning badge ([JSON](https://coss.com/ui/r/p-badge-7.json))
- `p-badge-8`: Error badge ([JSON](https://coss.com/ui/r/p-badge-8.json))
- `p-badge-9`: Small badge ([JSON](https://coss.com/ui/r/p-badge-9.json))
- `p-badge-10`: Large badge ([JSON](https://coss.com/ui/r/p-badge-10.json))
- `p-badge-11`: Badge with icon ([JSON](https://coss.com/ui/r/p-badge-11.json))
- `p-badge-12`: Badge with link ([JSON](https://coss.com/ui/r/p-badge-12.json))
- `p-badge-13`: Badge with count ([JSON](https://coss.com/ui/r/p-badge-13.json))
- `p-badge-14`: Full rounded badge (pill) ([JSON](https://coss.com/ui/r/p-badge-14.json))
- `p-badge-15`: Badge with number after text ([JSON](https://coss.com/ui/r/p-badge-15.json))
- `p-badge-16`: Status badge - Paid ([JSON](https://coss.com/ui/r/p-badge-16.json))
- `p-badge-17`: Status badge - Pending ([JSON](https://coss.com/ui/r/p-badge-17.json))
- `p-badge-18`: Status badge - Failed ([JSON](https://coss.com/ui/r/p-badge-18.json))
- `p-badge-19`: Selectable badge with checkbox ([JSON](https://coss.com/ui/r/p-badge-19.json))
- `p-badge-20`: Removable badge ([JSON](https://coss.com/ui/r/p-badge-20.json))

---

## Kbd

- Purpose: A component for displaying keyboard keys and shortcuts.
- Registry name: `Kbd`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/kbd.md`; [docs](https://coss.com/ui/docs/components/kbd.md); 1 particle
- Install: `npx shadcn@latest add @coss/kbd`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Kbd`, `KbdGroup`

### Covers

- Keyboard shortcut keycaps near commands.
- Single or grouped key hint display in action UIs.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- input group integration: `p-input-group-11`

### Common Pitfalls

- Placing multi-key sequences in a single `Kbd` when `KbdGroup` is clearer.
- Using decorative keycaps without tying them to nearby actionable controls.
- Overusing kbd hints in simple UIs, adding noise instead of clarity.

### Canonical Import Shape

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd";
```

### Particle Coverage

- `p-kbd-1`: Keyboard shortcuts display ([JSON](https://coss.com/ui/r/p-kbd-1.json))

---

## Separator

- Purpose: A visual divider for separating content sections.
- Registry name: `Separator`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/separator.md`; [docs](https://coss.com/ui/docs/components/separator.md); 1 particle
- Install: `npx shadcn@latest add @coss/separator`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Separator`

### Covers

- Visual/semantic separation between related blocks.
- Section dividers in menus, cards, and grouped controls.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Adding separators between every small element, creating visual clutter.
- Using separators where spacing alone communicates grouping better.
- Forgetting orientation/context in dense vertical command layouts.

### Canonical Import Shape

```tsx
import { Separator } from "@/components/ui/separator";
```

### Particle Coverage

- `p-separator-1`: Separator with horizontal and vertical orientations ([JSON](https://coss.com/ui/r/p-separator-1.json))

---

## Group

- Purpose: A container component for grouping related content with consistent styling.
- Registry name: `Group`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/group.md`; [docs](https://coss.com/ui/docs/components/group.md); 22 particles
- Install: `npx shadcn@latest add @coss/group`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Button`, `Group`, `GroupSeparator`

### Covers

- Connected controls with shared visual boundary.
- Composed action clusters using buttons, toggles, and menu triggers.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Forgetting `GroupSeparator` between controls in connected groups.
- Mixing control sizes/variants that break shared group silhouette.
- Using standalone controls where a grouped action model is expected.

### Canonical Import Shape

```tsx
import { Button } from "@/components/ui/button";
import { Group, GroupSeparator } from "@/components/ui/group";
```

### Particle Coverage

- `p-group-1`: Basic group ([JSON](https://coss.com/ui/r/p-group-1.json))
- `p-group-2`: Group with input ([JSON](https://coss.com/ui/r/p-group-2.json))
- `p-group-3`: Small group ([JSON](https://coss.com/ui/r/p-group-3.json))
- `p-group-4`: Large group ([JSON](https://coss.com/ui/r/p-group-4.json))
- `p-group-5`: Group with disabled button ([JSON](https://coss.com/ui/r/p-group-5.json))
- `p-group-6`: Group with default button ([JSON](https://coss.com/ui/r/p-group-6.json))
- `p-group-7`: Group with start text ([JSON](https://coss.com/ui/r/p-group-7.json))
- `p-group-8`: Group with end text ([JSON](https://coss.com/ui/r/p-group-8.json))
- `p-group-9`: Vertical group ([JSON](https://coss.com/ui/r/p-group-9.json))
- `p-group-10`: Nested groups ([JSON](https://coss.com/ui/r/p-group-10.json))
- `p-group-11`: Group with popup ([JSON](https://coss.com/ui/r/p-group-11.json))
- `p-group-12`: Group with input group ([JSON](https://coss.com/ui/r/p-group-12.json))
- `p-group-13`: Group with menu ([JSON](https://coss.com/ui/r/p-group-13.json))
- `p-group-14`: Group with select ([JSON](https://coss.com/ui/r/p-group-14.json))
- `p-group-15`: Group with search ([JSON](https://coss.com/ui/r/p-group-15.json))
- `p-group-16`: Group with add button and input ([JSON](https://coss.com/ui/r/p-group-16.json))
- `p-group-17`: Group with input and currency text ([JSON](https://coss.com/ui/r/p-group-17.json))
- `p-group-18`: Group with select and input ([JSON](https://coss.com/ui/r/p-group-18.json))
- `p-group-19`: Group with input and select ([JSON](https://coss.com/ui/r/p-group-19.json))
- `p-group-20`: Group with input and text button ([JSON](https://coss.com/ui/r/p-group-20.json))
- `p-group-22`: Group with two number inputs for range ([JSON](https://coss.com/ui/r/p-group-22.json))
- `p-group-23`: Group with filter label, combobox multi-select, and remove button ([JSON](https://coss.com/ui/r/p-group-23.json))

---

## Empty

- Purpose: A container for displaying empty state information.
- Registry name: `Empty`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/empty.md`; [docs](https://coss.com/ui/docs/components/empty.md); 1 particle
- Install: `npx shadcn@latest add @coss/empty`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Empty`, `EmptyContent`, `EmptyDescription`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`

### Covers

- No-data/no-results states with guidance.
- Action-oriented recovery UIs when content lists are empty.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Presenting empty states without actionable next step.
- Using empty state component for loading/error states instead of dedicated primitives.
- Copy-only empty states with no context-specific guidance for recovery.

### Canonical Import Shape

```tsx
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
```

### Particle Coverage

- `p-empty-1`: Empty state with icon and actions ([JSON](https://coss.com/ui/r/p-empty-1.json))
