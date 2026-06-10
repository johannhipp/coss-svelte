# Layout & Navigation

Components in this category: 8

## Tabs

- Purpose: A navigation component for switching between different views or content panels.
- Registry name: `Tabs`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/tabs.md`; [docs](https://coss.com/ui/docs/components/tabs.md); 13 particles
- Install: `npx shadcn@latest add @coss/tabs`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Tabs`, `TabsList`, `TabsPanel`, `TabsTab`

### Covers

- Mutually exclusive content panels in one region.
- Settings/detail screens split into scoped views.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- underline variant: `p-tabs-2`
- vertical orientation: `p-tabs-3`
- underline with vertical orientation: `p-tabs-4`

### Common Pitfalls

- Mismatching `TabsTab value` and `TabsPanel value` pairs.
- Using tabs for workflows that require route-level navigation instead.
- Mounting expensive panel content without considering visibility/performance.

### Canonical Import Shape

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
```

### Particle Coverage

- `p-tabs-1`: Basic tabs ([JSON](https://coss.com/ui/r/p-tabs-1.json))
- `p-tabs-2`: Tabs with underline ([JSON](https://coss.com/ui/r/p-tabs-2.json))
- `p-tabs-3`: Vertical tabs ([JSON](https://coss.com/ui/r/p-tabs-3.json))
- `p-tabs-4`: Vertical tabs with underline ([JSON](https://coss.com/ui/r/p-tabs-4.json))
- `p-tabs-5`: Tabs with full rounded triggers ([JSON](https://coss.com/ui/r/p-tabs-5.json))
- `p-tabs-6`: Tabs with icon before name ([JSON](https://coss.com/ui/r/p-tabs-6.json))
- `p-tabs-7`: Tabs with icon before name and underline ([JSON](https://coss.com/ui/r/p-tabs-7.json))
- `p-tabs-8`: Tabs with icon only ([JSON](https://coss.com/ui/r/p-tabs-8.json))
- `p-tabs-9`: Tabs with underline and icon on top ([JSON](https://coss.com/ui/r/p-tabs-9.json))
- `p-tabs-10`: Tabs with count badge ([JSON](https://coss.com/ui/r/p-tabs-10.json))
- `p-tabs-11`: Vertical tabs with underline and icon before name ([JSON](https://coss.com/ui/r/p-tabs-11.json))
- `p-tabs-12`: Tabs with icon only and count badge ([JSON](https://coss.com/ui/r/p-tabs-12.json))
- `p-tabs-13`: Tabs with icon only and grouped tooltips ([JSON](https://coss.com/ui/r/p-tabs-13.json))

---

## Accordion

- Purpose: A set of collapsible panels with headings.
- Registry name: `Accordion`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/accordion.md`; [docs](https://coss.com/ui/docs/components/accordion.md); 4 particles
- Install: `npx shadcn@latest add @coss/accordion`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Accordion`, `AccordionItem`, `AccordionPanel`, `AccordionTrigger`

### Covers

- Expandable multi-section content regions.
- FAQs and settings pages with progressive disclosure.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Placing `AccordionTrigger`/`AccordionPanel` outside `AccordionItem`.
- Omitting `value` on `AccordionItem`, which breaks item identity and controlled behavior.
- Applying Radix mental models like `type="single" | "multiple"` instead of coss `multiple` + array values.
- Treating controlled `value` as scalar instead of `string[]`.

### Canonical Import Shape

```tsx
import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";
```

### Particle Coverage

- `p-accordion-1`: Basic accordion ([JSON](https://coss.com/ui/r/p-accordion-1.json))
- `p-accordion-2`: Accordion with one panel open ([JSON](https://coss.com/ui/r/p-accordion-2.json))
- `p-accordion-3`: Accordion allowing multiple panels open ([JSON](https://coss.com/ui/r/p-accordion-3.json))
- `p-accordion-4`: Controlled accordion ([JSON](https://coss.com/ui/r/p-accordion-4.json))

---

## Collapsible

- Purpose: A component that toggles visibility of content sections.
- Registry name: `Collapsible`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/collapsible.md`; [docs](https://coss.com/ui/docs/components/collapsible.md); 1 particle
- Install: `npx shadcn@latest add @coss/collapsible`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Collapsible`, `CollapsiblePanel`, `CollapsibleTrigger`

### Covers

- Progressive disclosure of optional content.
- Expandable help/settings sections without leaving the page.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Placing trigger/panel outside the same collapsible root.
- Assuming panel content is always visible/mounted for dependent logic.
- Using modal-like interactions where collapsible disclosure is more appropriate.

### Canonical Import Shape

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible";
```

### Particle Coverage

- `p-collapsible-1`: Basic collapsible ([JSON](https://coss.com/ui/r/p-collapsible-1.json))

---

## Sidebar

- Purpose: A collapsible side panel for navigation and secondary content.
- Registry name: `Sidebar`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/sidebar.md`; [docs](https://coss.com/ui/docs/components/sidebar.md); 0 particles
- Install: `npx shadcn@latest add @coss/sidebar`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarInset`, `SidebarMenu`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`, `useSidebar`

### Covers

- Persistent app shell navigation and grouped links.
- Collapsible/structured side navigation for dashboard layouts.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- Wrap app with `SidebarProvider` at the layout level.
- Use `SidebarContent` (not "SidebarPanel") as the scrollable body between header/footer. It uses `ScrollArea` with `fill` so flex children (e.g. `mt-auto` footers) can pin to the bottom.
- Navigation items use `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton`.
- For link items, use `render` composition: `<SidebarMenuButton render={<a href="..." />}>`. Do not use `asChild` -- sidebar follows the same `render` pattern as all other coss primitives.
- Use `SidebarTrigger` for the collapse/expand toggle.
- Use `SidebarInset` for the main content area next to the sidebar.
- `SidebarRail` adds a slim hover-to-expand rail in collapsed state.

### Common Pitfalls

- Using non-existent parts like "SidebarPanel" or "SidebarItem" -- the correct names are `SidebarContent` and `SidebarMenuItem`.
- Forgetting `SidebarProvider` wrapper, which manages collapse state and mobile responsiveness.
- Skipping the `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton` hierarchy for nav items.
- Missing responsive collapse strategy for narrow/mobile layouts.
- Replacing `SidebarContent`'s scroll area with a raw `ScrollArea` without `fill` when the body uses `mt-auto` to pin footers-use `fill` (see scroll-area primitive docs).

### Canonical Import Shape

```tsx
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
```

### Particle Coverage

- No particle examples listed in the installed coss-particles skill.

---

## Breadcrumb

- Purpose: Displays the path to the current resource using a hierarchy of links.
- Registry name: `Breadcrumb`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/breadcrumb.md`; [docs](https://coss.com/ui/docs/components/breadcrumb.md); 7 particles
- Install: `npx shadcn@latest add @coss/breadcrumb`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Breadcrumb`, `BreadcrumbEllipsis`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbList`, `BreadcrumbPage`, `BreadcrumbSeparator`

### Covers

- Hierarchy/location indicators for current page context.
- Compact navigation trails for nested routes and detail pages.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using breadcrumb as primary nav menu instead of contextual trail.
- Omitting `aria-label` on icon-only breadcrumb items.
- Adding deep breadcrumb chains without meaningful hierarchy.

### Canonical Import Shape

```tsx
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
```

### Particle Coverage

- `p-breadcrumb-1`: Breadcrumb with menu example ([JSON](https://coss.com/ui/r/p-breadcrumb-1.json))
- `p-breadcrumb-2`: Breadcrumb with custom separator ([JSON](https://coss.com/ui/r/p-breadcrumb-2.json))
- `p-breadcrumb-3`: Breadcrumb with home icon for home link only ([JSON](https://coss.com/ui/r/p-breadcrumb-3.json))
- `p-breadcrumb-4`: Breadcrumb with folders icon menu ([JSON](https://coss.com/ui/r/p-breadcrumb-4.json))
- `p-breadcrumb-5`: Breadcrumb with icons before text ([JSON](https://coss.com/ui/r/p-breadcrumb-5.json))
- `p-breadcrumb-6`: Breadcrumb with dot separators ([JSON](https://coss.com/ui/r/p-breadcrumb-6.json))
- `p-breadcrumb-7`: Breadcrumb with select dropdown ([JSON](https://coss.com/ui/r/p-breadcrumb-7.json))

---

## Pagination

- Purpose: A pagination with page navigation, next and previous links.
- Registry name: `Pagination`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/pagination.md`; [docs](https://coss.com/ui/docs/components/pagination.md); 3 particles
- Install: `npx shadcn@latest add @coss/pagination`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`

### Covers

- Paged navigation over long result sets.
- Prev/next and index controls paired with data tables/lists.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using pagination controls without synchronizing data/page state.
- Mixing pagination with infinite-scroll UX in the same surface.
- Missing disabled-state handling on prev/next boundaries.

### Canonical Import Shape

```tsx
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
```

### Particle Coverage

- `p-pagination-1`: Pagination example ([JSON](https://coss.com/ui/r/p-pagination-1.json))
- `p-pagination-2`: Pagination with previous and next buttons only ([JSON](https://coss.com/ui/r/p-pagination-2.json))
- `p-pagination-3`: Pagination with select, and previous and next buttons ([JSON](https://coss.com/ui/r/p-pagination-3.json))

---

## Toolbar

- Purpose: A container for grouping related actions or controls.
- Registry name: `Toolbar`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/toolbar.md`; [docs](https://coss.com/ui/docs/components/toolbar.md); 1 particle
- Install: `npx shadcn@latest add @coss/toolbar`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Button`, `ToggleGroup`, `ToggleGroupItem`, `Toolbar`, `ToolbarButton`, `ToolbarGroup`, `ToolbarSeparator`

### Covers

- Grouped command/action strips.
- Editor-like tool controls and mode toggles.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- **Part composition via `render`**: use `ToolbarButton render={<ToggleGroupItem ... />}` or `render={<Button ... />}` instead of re-implementing button behavior.
- **Grouped layout**: use `ToolbarGroup` boundaries with `ToolbarSeparator` between logical command clusters.
- **Icon-only controls**: pair icon buttons with explicit `aria-label`; combine with `Tooltip` for discoverability.
- **Embedded selects**: wrap `SelectTrigger` with `ToolbarButton render={...}` to keep visual consistency in mixed control bars.
- **Formatting rows**: combine `ToggleGroup` + `ToolbarButton` for alignment/formatting command sets.

### Common Pitfalls

- Dropping `ToolbarSeparator`, causing unrelated command clusters to collapse visually.
- Missing `aria-label` on icon-only toolbar actions.
- Rendering raw `Button`/`ToggleGroupItem` next to toolbar controls without `ToolbarButton`, creating inconsistent density/spacing.
- Treating Toolbar as a state manager; control selection/toggle state through composed primitives (`ToggleGroup`, `Select`, etc.).

### Canonical Import Shape

```tsx
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";
```

### Particle Coverage

- `p-toolbar-1`: Toolbar with toggles, buttons, and select ([JSON](https://coss.com/ui/r/p-toolbar-1.json))

---

## Scroll Area

- Purpose: A container with custom scrollbars for overflow content.
- Registry name: `ScrollArea`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/scroll-area.md`; [docs](https://coss.com/ui/docs/components/scroll-area.md); 5 particles
- Install: `npx shadcn@latest add @coss/scroll-area`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `ScrollArea`

### Covers

- Constrained-height scroll containers with styled viewport.
- Scrollable lists/logs/panels embedded in fixed layouts.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Forgetting explicit height/constraint, resulting in non-scrollable container.
- Nesting multiple scroll areas that compete for wheel/touch events.
- Using scroll area where native page scrolling is simpler and clearer.
- Using `fill` on every scroll area-default is `false`; opt in only for flex layouts that need full viewport height (e.g. `mt-auto` footers). Pair with `flex-1 min-h-0` on the root and `h-full flex-col` on the inner wrapper.
- Disabling `clampContentMinWidth` unless horizontal scroll actually regresses-default `true` fixes spurious horizontal bars in vertical-first layouts.

### Canonical Import Shape

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";
```

### Particle Coverage

- `p-scroll-area-1`: Basic scroll area ([JSON](https://coss.com/ui/r/p-scroll-area-1.json))
- `p-scroll-area-2`: Horizontal scroll area ([JSON](https://coss.com/ui/r/p-scroll-area-2.json))
- `p-scroll-area-3`: Scroll area with both directions ([JSON](https://coss.com/ui/r/p-scroll-area-3.json))
- `p-scroll-area-4`: Scroll area with fading edges ([JSON](https://coss.com/ui/r/p-scroll-area-4.json))
- `p-scroll-area-5`: Horizontal scroll area with scrollbar gutter ([JSON](https://coss.com/ui/r/p-scroll-area-5.json))
