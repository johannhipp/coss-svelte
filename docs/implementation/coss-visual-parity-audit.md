# COSS Visual Parity Audit

This audit records the component-by-component visual comparison pass for the Svelte port.

## Source Of Truth

- COSS docs map: <https://coss.com/ui/llms.txt> (rechecked 2026-06-13)
- COSS registry source: <https://github.com/cosscom/coss/tree/main/apps/ui/registry/default/ui>
- Upstream commit inspected locally: `68bf668d2da94e0921c3e67f252b0d36531382f8`
- Theme source inspected locally: `packages/ui/src/styles/globals.css`
- Screenshot and manifest artifacts are generated locally and intentionally not tracked in git. Regenerate them into `.cache/visual-parity` with `pnpm parity:evidence` or `pnpm parity:interactive`.

## Key Finding

The mismatch was not caused by SvelteKit + Vite by itself. It came from the port using Svelte components plus a hand-written `.cn-*` CSS shim, while COSS uses React components whose visual system is encoded as Tailwind v4 utility recipes, data-slot selectors, pseudo-elements, and COSS theme tokens.

The current mitigation updates `packages/theme/src/style-coss.css` to use COSS-like tokens and COSS-like default recipes for the generated Svelte components. This is a broad visual parity pass, not a final pixel-perfect port of every React/Tailwind class and DOM slot.

## Pass Summary

| Area | Before | Current mitigation | Remaining full-parity requirement |
| --- | --- | --- | --- |
| Tokens | Local approximations with different neutral surfaces, radii, borders, and focus rings. | Added COSS-style Tailwind v4 directives, tokens, radius scale, border/input/ring colors, and mapped old `--cn-*` variables to those tokens. | Port exact Tailwind v4 token pipeline and any theme presets COSS ships later. |
| Sizing | Many controls used larger generic padding and line-height. | Buttons, badges, inputs, selects, tabs, toggles, and grouped inputs now follow COSS mobile and desktop heights more closely. | Implement component `size` variants at the prop/API level instead of only CSS classes. |
| Active states | Tabs/toggles used primary filled states. | Tabs now use muted track + raised active surface; toggles use input/64 active state. | Add COSS tab indicator DOM/animation and underline variant. |
| Surfaces | Cards, overlays, menus, and grouped content had heavier card-like styling. | Reworked toward COSS popover/card/muted surfaces, border opacity, smaller radii, and lighter shadows. | Port exact pseudo-element inset shadows and per-slot clipping from COSS recipes. |
| Complex primitives | Some wrappers use simplified Bits UI/native structure. | Styling was aligned where the current DOM exposes the required slots. | For exact parity, port React component slot structure one component at a time. |

## Screenshot Evidence Passes

Coverage note: all 53 currently scoped components, excluding the deferred `NumberField`, now have screenshot evidence across the recorded passes. `Date Picker` is intentionally source-mapped as a COSS composition pattern: the COSS docs state it is built from Calendar, Popover, and Button, and the source is represented by `p-date-picker-*` particles rather than a standalone `registry/default/ui/date-picker.tsx` file. `Sidebar` now has registry-source follow-up screenshots and a COSS-shaped local compound API, but remains marked incomplete because COSS exposes installable registry source at `/ui/r/sidebar.json` while the live docs markdown endpoint `/ui/docs/components/sidebar.md` returns `404` and the local upstream cache has no docs page or particle for it.

### 2026-06-11 Controls Pass

This pass captured local and live COSS screenshots at `1440x1200` for Button, Checkbox, Dialog, Input, Select, and Tabs.

Evidence: generated locally with `pnpm parity:evidence -- --slugs button,checkbox,dialog,input,select,tabs`.

Findings:

| Component | Screenshot-backed finding | Mitigation applied |
| --- | --- | --- |
| Button | Local preview showed five variants in the first preview, while COSS default preview shows a single default `Button`; focused follow-up also showed the local preview frame was shorter than COSS. | Local docs preview now renders the default `Button` example first, the preview frame now matches COSS height more closely, and `Button` accepts upstream-compatible `default`, `destructive-outline`, `link`, `xs`, `xl`, and icon-size aliases plus loading state. |
| Checkbox | Local preview showed a checked product-updates example, while COSS default preview shows an unchecked terms checkbox. | Local docs preview now uses `Accept terms and conditions` unchecked. |
| Dialog | Local preview uses the Svelte/Bits dialog composition and remains structurally similar, but COSS docs expose additional API/example sections and header actions. | No component code change in this pass; keep dialog for a later overlay-specific screenshot pass. |
| Input | Input control metrics are close, but local preview used `jane@example.com` and a wider centered input; COSS uses `Enter text` and a narrower input. | Local docs preview now uses `Enter text` with a `w-64` input. |
| Select | Local trigger lacked the visible chevrons affordance that COSS renders via `SelectPrimitive.Icon`; local example value also differed. | `Select` and `SelectTrigger` now render a `select-icon` chevrons slot; local preview now uses the `Next.js` default-style example. |
| Tabs | Trigger strip was close, but local preview used `Overview/API/Examples` and a bordered content panel; COSS default uses `Tab 1/2/3` with simple content. COSS docs also expose `TabsTab`, `TabsPanel`, and `TabsIndicator` naming. | Local docs preview now uses `Tab 1/2/3` and unframed muted panel text. API naming/indicator parity remains a component API task. |

All-component source mapping also found one unresolved upstream asymmetry in this cache: `sidebar` has registry source but no cached docs page. `date-picker` is handled as a composition-backed component because COSS itself documents it as a Calendar + Popover + Button pattern and ships `p-date-picker-*` particles.

### 2026-06-11 Display Controls Pass

This pass captured local and live COSS screenshots at `1440x1200` for Accordion, Alert, Avatar, Badge, Breadcrumb, Separator, Skeleton, Spinner, and Switch. Card, Kbd, and Progress initially captured local screenshots but their live COSS captures timed out at the default `30s` cap.

Evidence: generated locally with `pnpm parity:evidence` display-control slug batches, including a longer timeout for Card, Kbd, and Progress.

Findings:

| Component | Screenshot-backed finding | Mitigation applied |
| --- | --- | --- |
| Accordion | Local preview showed one collapsed text-only row with no indicator, while COSS shows three FAQ rows, one open panel, row dividers, and built-in chevrons. | `Accordion` and `AccordionTrigger` now render a themed `accordion-indicator` chevron slot. Local docs preview now uses the three COSS FAQ rows with the third item open. |
| Alert | Local preview included an action button and different copy, while COSS default is a neutral alert with `Heads up!` and a short description only. | Local docs preview now uses the COSS default title/description and no action. |
| Avatar | Local and COSS are structurally close: circular 32px avatar with fallback. | No code change in this pass. Remaining differences are asset/crop and exact fallback timing. |
| Badge | Local preview showed three variants, while COSS default preview shows a single default `Badge`. | Local docs preview now renders one default `Badge`. |
| Breadcrumb | Local and COSS both show inline breadcrumb navigation. | No code change in this pass. Remaining differences are exact separator icon and overflow/ellipsis examples. |
| Card | Initial live COSS capture timed out, then succeeded with a `60s` screenshot timeout. Local example is still a simplified card compared with COSS card/frame examples. | No component code change in this pass; evidence capture script now supports `--timeout-ms` for slower live COSS pages. |
| Kbd | Initial live COSS capture timed out, then succeeded with a `60s` screenshot timeout. Local visual is close but uses `Cmd K` text rather than the richer shortcut examples. | No code change in this pass. |
| Progress | Initial live COSS capture timed out, then succeeded with a `60s` screenshot timeout. Local progress track/fill is close enough for first pass. | No code change in this pass. |
| Separator | Local and COSS both show a subtle horizontal divider. | No code change in this pass. |
| Skeleton | Local and COSS both show a muted animated placeholder surface. | No code change in this pass. |
| Spinner | Local and COSS both show a compact animated loader. | No code change in this pass. |
| Switch | Local preview was checked and labeled `Enable notifications`; COSS default is unchecked and labeled `Marketing emails`. | Local docs preview now renders the unchecked `Marketing emails` example. |

### 2026-06-13 Form Controls Pass

This pass captured local and live COSS screenshots at `1440x1200` for Checkbox Group, Field, Fieldset, Form, Input Group, Label, Radio Group, and Textarea. Follow-up passes recaptured the components whose previews or slot structure changed.

Evidence: generated locally with `pnpm parity:evidence` form-control slug batches.

Findings:

| Component | Screenshot-backed finding | Mitigation applied |
| --- | --- | --- |
| Checkbox Group | Local preview used a boxed `Channels` group with `Email/Product updates`; COSS default is an unframed framework group with `Next.js/Vite/Astro`, first item checked. | Local preview now mirrors the COSS particle. `cn-choice-group` no longer adds a card border/padding by default. |
| Field | Local preview showed required, validity, and error states at once; COSS default is a simple `Name` field with placeholder and description. | Local preview now mirrors the COSS `p-field-1` particle. |
| Fieldset | Local preview showed a bordered `Preferences` surface; COSS default is an unframed `Billing Details` section with two fields. | Local preview now mirrors the COSS particle, and `cn-fieldset` no longer adds border/radius/padding by default. |
| Form | Local preview included a description and wider form; COSS default is a compact email field and full-width submit button. | Local preview now uses `you@example.com`, compact width, and a full-width submit button. Error text is omitted in the default visual sample because the current Svelte wrapper does not hide `FieldError` until invalid. |
| Input Group | Local preview was a label plus plain input, then first follow-up showed the search icon on the wrong side and full-width stretching. COSS default is a constrained search input with a leading icon addon. | Added `InputGroupAddon`, `InputGroupInput`, `InputGroupText`, and `InputGroupTextarea`; local preview now uses the COSS search example with a leading addon and constrained wrapper. |
| Label | Local and COSS are structurally close: label above email input. | No code change in this pass. |
| Radio Group | Local preview used a boxed `Plan` group; COSS default is an unframed `Next.js/Vite/Astro` group with the first item selected. | Local preview now mirrors the COSS particle and inherits the unframed choice-group styling. |
| Textarea | Local placeholder differed from COSS. | Local preview now uses `Type your message here`. |

### 2026-06-13 Overlay And Disclosure Pass

This pass captured local and live COSS screenshots at `1440x1200` for Alert Dialog, Collapsible, Dialog, Drawer, Menu, Popover, Preview Card, Sheet, and Tooltip. The local preview source was also aligned with the upstream first particle for each component where the current Svelte APIs make that possible.

Evidence: generated locally with `pnpm parity:evidence` overlay and Popover follow-up slug batches.

Important limitation: this static pass captures page-load states. For overlay primitives, it proves trigger-state parity and source/example parity; open popup parity is covered separately by the interactive open-state pass below.

Findings:

| Component | Screenshot/source-backed finding | Mitigation applied |
| --- | --- | --- |
| Alert Dialog | Local preview used generic discard/confirm copy and lacked COSS header/footer sections. COSS first particle uses `Delete Account`, destructive-outline trigger, `Are you absolutely sure?`, and cancel/delete actions. | Added `AlertDialogHeader` and `AlertDialogFooter`; local preview now mirrors the COSS destructive account deletion example. |
| Collapsible | Local preview used generic details copy. COSS first particle uses `Show recovery keys`, a chevron, and mono recovery-key rows. | Local preview now mirrors the COSS recovery-key trigger/content and `cn-collapsible` was made borderless like the upstream example. |
| Dialog | Local preview was a generic title/description/save/close popup. COSS first particle uses an edit-profile form with header, panel, and footer sections. | Added `DialogHeader`, `DialogPanel`, and `DialogFooter`; local preview now uses the edit-profile form copy and field structure. |
| Drawer | Local preview used generic drawer copy and body panel content. COSS first particle uses a bottom drawer with handle, centered `Notifications` header, description, and close footer. | Local preview now mirrors the COSS notifications drawer content and omits the extra panel from the default example. |
| Menu | Local preview used a small workspace menu. COSS first particle is the full playback menu with icons, disabled item, checkbox/radio groups, switch item, nested playlist menu, and destructive delete item. | Local preview now mirrors the COSS playback menu source and menu CSS now covers disabled, destructive, and switch item states. Open-state evidence is recorded in the interactive pass. |
| Popover | Local preview used generic popover content. COSS first particle is a feedback form with title, description, textarea, and submit button. | Added `PopoverTitle` and `PopoverDescription`; local preview now mirrors the feedback form source. Open-state evidence is recorded in the interactive pass. |
| Preview Card | Local preview used placeholder text. COSS first particle shows `coss.com/ui`, descriptive copy, TypeScript language dot, stars, and forks. | Local preview now mirrors the COSS preview-card content and metadata row. Hover/open-state evidence is recorded in the interactive pass. |
| Sheet | Local preview used generic sheet copy and panel text. COSS first particle is an edit-profile side sheet with header, two fields, cancel, and save. | Local preview now mirrors the COSS edit-profile sheet content and uses the existing Sheet header/panel/footer parts. |
| Tooltip | Local preview used `Tooltip trigger`/`Tooltip content`. COSS first particle uses `Hover me` and `Helpful hint`. | Local preview now mirrors the COSS tooltip copy. Hover/open-state evidence is recorded in the interactive pass. |

### 2026-06-13 Interactive Open-State Pass

This pass clicked or hovered the local and live COSS examples for the 13 components whose important visual state is hidden until interaction: Alert Dialog, Autocomplete, Combobox, Command, Date Picker, Dialog, Drawer, Menu, Popover, Preview Card, Select, Sheet, and Tooltip. It captured paired screenshots for each local route and COSS route using the current local docs app at `http://127.0.0.1:5175`.

Evidence: generated locally with `pnpm parity:interactive`.

Important limitations: this pass proves that local and COSS examples can be opened and visually compared in their interactive states. It does not prove pixel-perfect equivalence, keyboard flows, nested submenu collision behavior, swipe/drag behavior, or delayed tooltip timing. `Date Picker` is marked captured with a composition-source note because COSS does not ship a standalone `date-picker.tsx`; its source-of-truth example is `p-date-picker-1.tsx` plus the required Calendar, Popover, and Button primitives.

Findings:

| Component | Interaction captured | Screenshot-backed finding | Follow-up implication |
| --- | --- | --- | --- |
| Alert Dialog | Click `Delete Account` | Local and COSS now both expose the destructive account-deletion modal state for direct comparison. | Remaining gap is exact dialog action spacing and responsive sizing, not lack of open-state evidence. |
| Autocomplete | Focus `Search items...` and type | Local and COSS both open the fruit-search list state. | Remaining gap is exact popup filtering, item height, and async/status variants. |
| Combobox | Focus `Select a item...` and type | Local and COSS both open the fruit-selection popup state. | Remaining gap is exact input-trigger icon alignment, highlighted item behavior, and richer multi/object-value examples. |
| Command | Click `Open Command Palette` | Local and COSS both open the command dialog with grouped entries and footer hints. The local preview was corrected to render `CommandPanel` inside `CommandList`, matching the Bits UI context requirement. | Remaining gap is exact filter semantics, selected item state, and keyboard shortcut copy. |
| Date Picker | Click `Pick a date` | Local and COSS both open a calendar popup for visual comparison. Source mapping is complete as a composition pattern through `p-date-picker-1.tsx` and related particles. | Remaining gap is exact calendar/popover composition behavior, not missing upstream source. |
| Dialog | Click `Open Dialog` | Local and COSS both open the edit-profile dialog state. | Remaining gap is exact close affordance, panel clipping, and responsive dialog sizing. |
| Drawer | Click `Open drawer` | Local and COSS both open the bottom notifications drawer state. | Drag/snap behavior and animation remain outside this screenshot pass. |
| Menu | Click `Open menu` | Local and COSS both open the playback menu state. | Nested submenu, checkbox/radio indicator, and collision behavior still need focused interaction checks if 100% parity is required. |
| Popover | Click `Open Popover` | Local and COSS both open the feedback form popover state. | Remaining gap is exact trigger text/case, popup offset, and popover arrow/positioning behavior. |
| Preview Card | Hover `coss.com/ui` | Local and COSS both open the preview-card hover state. | Remaining gap is hover delay, side/align behavior, and exact metadata row sizing. |
| Select | Click `select-trigger` | Local and COSS both open the `Next.js` select popup state. | Remaining gap is exact selected indicator grid, viewport sizing, and positioner animation. |
| Sheet | Click `Open Sheet` | Local and COSS both open the edit-profile side sheet state. | Remaining gap is exact side animation, close affordance, and mobile width recipe. |
| Tooltip | Hover `Hover me` | Local and COSS both expose the `Helpful hint` tooltip state. | Remaining gap is delay timing, side/align, and animation parity. |

### 2026-06-13 Selection And Data Controls Pass

This pass captured local and live COSS screenshots at `1440x1200` for Autocomplete, Calendar, Combobox, Command, Date Picker, Meter, OTP Field, Pagination, Scroll Area, and Slider. The local preview source was aligned to the upstream first particle for each component where the current Svelte/Bits APIs make that practical.

Evidence: generated locally with `pnpm parity:evidence` selection and data-control slug batches.

Important limitation: this static pass captures trigger/input states for Autocomplete, Combobox, Command, and Date Picker. Popup and dialog-open evidence is covered separately by the interactive pass above. Date Picker is source-mapped via the upstream `p-date-picker-*` particles because COSS documents it as a composition pattern rather than a standalone UI primitive.

Findings:

| Component | Screenshot/source-backed finding | Mitigation applied |
| --- | --- | --- |
| Autocomplete | Local preview used framework/team data, a visible trigger, group label, separator, and status row. COSS first particle is a simple fruit search input without trigger, groups, or status. | Local preview now uses the fruit list, `Search items…`, `No items found.`, and a simple list. `AutocompleteInput` still supports optional `showTrigger`, but the default visual mirrors COSS. |
| Calendar | Local initially rendered a single calendar, but selected-day state and root surface treatment still drifted from COSS. | Focused follow-up now binds the local example to the same selected day visible in the live COSS capture and removes the extra inner calendar border/surface. |
| Combobox | Local preview used team data plus separate trigger/value/clear controls. COSS first particle is a fruit combobox with an integrated input trigger. | Local preview now uses the fruit list and `Select a item…`; `ComboboxInput` now renders a COSS-like integrated trigger by default. |
| Command | Local preview used a small generic actions menu. COSS first particle uses an `Open Command Palette` outline trigger with `⌘ J`, suggestions/commands groups, shortcuts, and footer keyboard hints. | Local preview now mirrors the grouped command source, trigger shortcut, and footer hint layout. Static screenshot still only proves trigger-state parity. |
| Date Picker | Local preview used `Choose delivery date`, then the trigger stretched wider than the COSS example. COSS first particle and usage snippet use a calendar-icon outline trigger with `Pick a date`, constrained to roughly `280px`, and a calendar popup. | Local `DatePicker` now uses the COSS trigger copy/icon, the docs preview constrains the trigger to `17.5rem`, and focused trigger/open follow-up screenshots are recorded. Calendar nav buttons now render chevrons instead of literal previous/next text. | Full composition parity remains pending because the Svelte component is still a simplified Calendar + Bits DatePicker composition rather than the exact React Popover + Calendar + Button particle. |
| Meter | Local preview was an unlabeled track. COSS first particle shows `Storage usage`, value text, track, and indicator. | Added `MeterLabel`, `MeterValue`, `MeterTrack`, and `MeterIndicator` helper parts; local preview now mirrors the labeled COSS meter example. |
| OTP Field | Local preview used `OTPFieldCell`; COSS first particle uses `OTPFieldInput` slots with per-character labels. | Added `OTPFieldInput` alias/helper and updated the default preview to render six labeled inputs. |
| Pagination | Local preview used Bits button parts directly. COSS first particle uses `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, and `PaginationEllipsis`. | Added COSS-facing pagination helper parts and updated the default preview to the upstream `1 2 3 …` structure. |
| Scroll Area | Local preview used generic `Scrollable row` content and was clamped by old scroll-area CSS. COSS first particle shows a bordered `h-64` tags list. | Local preview now renders the `Tags` list with 50 `v1.0.0-alpha.*` rows, and scroll-area CSS no longer forces the old 8rem max-height. |
| Slider | Local preview showed ticks and value labels. COSS first particle is a plain `Slider defaultValue={50}`. | Local preview now renders only the range and thumb for value `50`, while the extra tick/label exports remain available for richer examples. |

### 2026-06-13 Layout And Action Controls Pass

This pass captured local and live COSS screenshots at `1440x1200` for Empty, Frame, Group, Sidebar, Table, Toast, Toggle, Toggle Group, and Toolbar. The local preview source was aligned to the upstream first particle for each component where the current Svelte/Bits APIs make that practical.

Evidence: generated locally with `pnpm parity:evidence` layout/action slug batches, plus a Sidebar registry follow-up batch.

Important limitations: Sidebar remains source-incomplete because COSS has `registry/default/ui/sidebar.tsx` and a live `/ui/r/sidebar.json` registry item, but the live markdown docs endpoint `/ui/docs/components/sidebar.md` returns `404` and no first-particle file exists in the upstream cache. The follow-up pass compares against that registry-only state: local now renders a COSS-shaped static app-shell example, while the live COSS component route still captures the not-found page. Toast static screenshots prove the trigger/default page state only; COSS toast-manager behavior still needs a later interactive/runtime pass.

Findings:

| Component | Screenshot/source-backed finding | Mitigation applied |
| --- | --- | --- |
| Empty | Local preview used a generic results/reset state. COSS first particle uses a centered upcoming-meetings empty state with icon media and two actions. | Local preview now mirrors the upcoming-meetings particle, and `EmptyMedia` supports the icon-media variant styling. |
| Frame | Local preview used generic `Frame` copy and a badge footer. COSS first particle uses section header/description, a muted frame with panel text, and a text footer. | Local preview now mirrors the section-header particle. |
| Group | Local preview was two grouped buttons. COSS first particle is a file-actions group with separators, icons, and a menu trigger. | Added `GroupSeparator`, exported it, and updated the preview to the file/media/menu composition. |
| Sidebar | COSS live route returns a not-found page and no upstream docs/particle source exists in the local cache, but `registry/default/ui/sidebar.tsx` exposes a compound app-shell API. | Added COSS-shaped Svelte sidebar parts (`SidebarProvider`, `SidebarContent`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuButton`, `SidebarInset`, rail/trigger/separator/footer/header helpers) and updated the default preview to a static app-shell example. The component remains experimental because responsive collapse, mobile Sheet mode, persistence, and keyboard toggle behavior are not implemented. |
| Table | Local preview was a tiny two-column team table. COSS first particle is a current-projects budget table with status badges and footer total. | Local preview now mirrors the projects table and adds status-dot theme helpers. |
| Toast | Local preview rendered a static toast surface, while COSS first particle shows a `Default Toast` trigger button before interaction. | Local preview now shows the COSS trigger state and keeps the local `Toast` component hidden for coverage. |
| Toggle | Local preview was pressed by default, while COSS first particle is an unpressed `Toggle`. | Local preview now renders the unpressed state. |
| Toggle Group | Local preview used text labels; COSS first particle uses bold/italic/underline icon items with bold selected. | Local preview now mirrors the icon group and selected value. |
| Toolbar | Local preview was a small text toolbar. COSS first particle is a formatting toolbar with alignment, currency/percent, font select, separators, and Save. | Added `ToolbarSeparator`, exported it, and updated the preview to a COSS-like formatting toolbar using the Svelte/Bits toolbar-group constraints. |

## Component Audit

| Component | Difference found | Mitigation in this pass | Remaining gap to 100% |
| --- | --- | --- | --- |
| Accordion | Trigger/content initially looked like generic panels; the follow-up also found the preview width and copy did not match the COSS `p-accordion-1` particle. | Tightened item borders, trigger typography, padding, hover state, content spacing, chevron rotation, default-open third item, full-width preview, and upstream particle copy. | Remaining gap is exact Base UI panel height variable behavior and transition lifecycle attributes rather than default screenshot layout. |
| Alert | Default color read as custom info callout. | Moved to neutral bordered alert with COSS-like title/description/action spacing. | Add all semantic alert variants from the upstream recipe. |
| Alert Dialog | Popup and actions were too generic. | Aligned popup background, overlay, radius, shadow, title/description, and trigger/action button treatment. | Port exact action layout and responsive dialog sizing. |
| Autocomplete | Input and popup did not match COSS control metrics. | Aligned input height, border, focus ring, popup surface, item hover, empty, separator, and group labels. | Add exact async/loading/status patterns from COSS particles. |
| Avatar | Shape and fallback were close but token mismatch affected look. | Aligned border/ring/fallback muted surface and image clipping. | Add upstream size variants and grouped avatar overlap recipes. |
| Badge | Badges were larger and rounder. | Matched rounded-sm feel, compact height/min-width, default/secondary/destructive and semantic color surfaces. | Add exact `sm`, `default`, and `lg` APIs plus button/link interaction overlays. |
| Breadcrumb | Separator and text treatment diverged. | Aligned muted separators, current item color, inline spacing, and wrapping. | Add menu-backed overflow/ellipsis parity. |
| Button | Buttons had non-COSS sizing, API names, surface treatment, and preview-shell context. | Aligned radius, mobile/desktop heights, primary/secondary/outline/ghost/destructive/destructive-outline/link variants, upstream size aliases (`default`, `xs`, `xl`, icon sizes), loading-friendly positioning, focus ring, and the default preview frame. | Remaining gap is exact Base UI `render` composition semantics, pseudo-element inset shadows, pointer-coarse hit-area pseudo-elements, and the full set of 40 button particles. |
| Calendar | Grid, selected day styling, root surface, and nav buttons were generic; Date Picker open-state evidence showed literal `Previous`/`Next` labels where COSS uses chevrons. | Aligned calendar header, chevron nav buttons, fit-content root, unframed surface, grid, day cells, hover, and selected state; focused screenshots are recorded. | Add full range, outside-day, disabled, today marker, weekday formatting, dropdown navigation, and multi-month recipe parity. |
| Card | Cards had padding on root and different rounding. | Root is now a COSS-like bordered rounded-2xl surface with section-level padding. | Add CardFrame exact clipping and pseudo-element inset shadow behavior. |
| Checkbox | Checked state and box metrics drifted. | Aligned compact size, border/input token, primary checked fill, focus, disabled, and label grouping. | Add exact indicator icon sizing and invalid state parity. |
| Checkbox Group | Default preview was boxed and used different labels. | Local default preview now mirrors the COSS unframed `Next.js/Vite/Astro` example, and shared choice groups no longer add a border surface. | Add upstream disabled, parent/nested, and form-integration particles. |
| Collapsible | Looked like a card instead of disclosure and used generic copy. | Reduced to COSS-like trigger/content disclosure styling and aligned the default preview to the recovery-key particle. | Open-state animation needs an interactive screenshot pass against COSS. |
| Combobox | Trigger/input/popup were taller and heavier. | Aligned input/trigger heights, popup surface, item states, separators, labels, and empty state. | Add exact multi-select/value chip and object-value examples. |
| Command | Palette surface and items were too large. | Aligned command shell, input, list gap, item height, shortcuts, separators, footer, empty, and dialog popup. | Add full command-dialog composition and filtering behavior parity. |
| Date Picker | Trigger height, width, icon treatment, popup surface, and calendar nav drifted. | Aligned trigger with COSS outline button metrics, `Pick a date` copy, calendar icon, `280px` demo width, popover surface, and chevron calendar navigation. | Replace simplified calendar composition with the full upstream Popover + Calendar + Button composition semantics, including exact selected/today/outside-day styling and date-range/input/preset examples. |
| Dialog | Popup, overlay, title, and triggers diverged; default preview was too generic. | Added header/panel/footer helpers and aligned the default preview to the COSS edit-profile form; open-state screenshots are recorded. | Exact popup layout, close affordance, and responsive sizing remain to be tightened. |
| Drawer | Simplified drawer looked unlike COSS advanced drawer and default copy differed. | Aligned overlay, bottom sheet surface, handle, centered notifications header, and footer close action; open-state screenshots are recorded. | Experimental; drag/snap, nested behavior, and animation remain deferred. |
| Empty | Looked like a card and used generic reset-filter copy. | Removed card framing, added icon-media styling, and aligned the default preview to the COSS upcoming-meetings particle. | Add all upstream empty variants and illustrative media recipes. |
| Field | Default preview showed too many states at once. | Local default preview now mirrors the COSS `Name` field with description only. | Add complete aria wiring helpers and invalid data-state styling. |
| Fieldset | Default preview and root styling were incorrectly card-like. | Fieldset is now unframed by default, and the local preview mirrors the COSS `Billing Details` particle. | Add disabled group propagation and richer form-section particles. |
| Form | Default preview used different copy, width, and helper text. | Local preview now matches the compact COSS email form more closely. | Add SvelteKit enhance and validation-adapter examples; implement hidden-until-invalid `FieldError` behavior. |
| Frame | Looked like a card and used generic copy. | Reworked as a muted preview/media frame and aligned the default preview to the COSS section-header particle. | Add exact upstream frame clipping/aspect variants. |
| Group | Looked like another card and lacked separators/menu composition. | Added `GroupSeparator`, reduced the root to an attached grouping shell, and aligned the default preview to the COSS file-actions particle. | Add segmented/attached control variants and exact render-composition parity. |
| Input | Too tall and used generic padding. | Aligned COSS input control height, desktop height, border/input token, focus ring, shadow, and text sizing. | Add wrapper span/pseudo-element parity, size prop variants, file/search edge cases. |
| Input Group | Subparts were missing and default preview was not the COSS search example. | Added `InputGroupAddon`, `InputGroupInput`, `InputGroupText`, and `InputGroupTextarea`; preview now mirrors the leading-icon search input. | Add strict COSS DOM-order invariants, block-start/end addons, button/badge/kbd examples, and textarea mode parity. |
| Kbd | Shortcut chips were close but token mismatch showed. | Aligned compact border/background, mono font, radius, and muted text. | Add exact size variants and command-key examples. |
| Label | Weight/color drifted with local token set. | Aligned to COSS foreground, inline-flex, gap, and medium weight. | Add disabled/peer state propagation. |
| Menu | Popup/items had heavier custom styling and the default example was much smaller than COSS. | Aligned default preview to the COSS playback menu, added disabled/destructive/switch item styling, and recorded open-state screenshots. | Popup positioning, nested menu collision, and indicators still need focused parity work. |
| Meter | Colors and sizing drifted. | Aligned track, fill, compact height, radius, and semantic token usage. | Add threshold color recipes. |
| Number Field | Component is not implemented in v0.1. | Documented as deferred. | Needs a full accessible spinbutton implementation before visual parity is meaningful. |
| OTP Field | Cells were large/generic. | Aligned cell size, border/input token, radius, shadow, and typography. | Add grouped separators and paste/focus state parity. |
| Pagination | Buttons used generic controls. | Aligned compact button styling and active primary state. | Add exact COSS pagination exports and icon sizing. |
| Popover | Surface and trigger were generic; default content did not match COSS. | Added title/description helpers, aligned the default source to the COSS feedback form, and recorded open-state screenshots. | Popup offset, arrow/positioning behavior, and trigger text normalization remain open. |
| Preview Card | Popup followed generic overlay styling and default content was placeholder text. | Aligned popover-like surface, default content to the COSS `coss.com/ui` preview card, and recorded hover-state screenshots. | Hover delay, side/align behavior, and exact metadata row sizing remain open. |
| Progress | Track/fill sizes diverged. | Aligned compact track, rounded fill, and primary token. | Add indeterminate animation parity. |
| Radio Group | Default preview was boxed and used different labels. | Local default preview now mirrors the COSS unframed `Next.js/Vite/Astro` example. | Add card-option particles and invalid state parity. |
| Scroll Area | Scrollbars and viewport looked heavy. | Aligned rounded surface, thumb, viewport padding, and scrollbar metrics. | Add exact orientation/corner behavior. |
| Select | Trigger and popup were too tall/generic. | Aligned trigger height, border/input token, icon gap, popup, viewport, group labels, items, checked/highlighted state. | Add exact item indicator grid and positioner animation. |
| Separator | Token mismatch affected subtlety. | Aligned border color and orientation sizing. | Add decorative semantics and menu/card-specific variants. |
| Sheet | Dialog-derived sheet looked generic and default content differed. | Aligned overlay, side panel surface, title/description/header/footer/panel spacing and edit-profile default content; open-state screenshots are recorded. | Exact side animation, close affordance, and responsive width recipes remain open. |
| Sidebar | Experimental shell was a bare link list and did not expose the COSS compound API. | Added registry-shaped Sidebar parts and aligned the preview/theme to a muted app-shell surface with grouped menu buttons, active rows, badge, rail, trigger, footer, and inset content. | Experimental; controlled collapse state, mobile drawer mode, persistence cookie, keyboard shortcut, tooltip-on-collapsed behavior, and full responsive app-shell parity remain deferred. |
| Skeleton | Animation and surface were generic. | Aligned muted animated gradient and radius. | Add all COSS skeleton shape recipes. |
| Slider | Track/thumb colors and sizes drifted. | Aligned track, range, thumb, ticks, labels, focus, and disabled states. | Add exact multi-thumb and value-label parity. |
| Spinner | Size/color close but token mismatch affected output. | Aligned stroke color and compact sizing. | Add upstream size variants and reduced-motion behavior. |
| Switch | Track/thumb metrics drifted. | Aligned compact track, thumb, checked primary state, focus, and disabled opacity. | Add invalid state and label-row particles. |
| Table | Table was boxed differently and the default preview was too small/simple. | Aligned wrapper, border, caption, th/td padding, head typography, row borders, and default preview content to the COSS current-projects table. | Add exact table container/export naming and density variants. |
| Tabs | Active tabs looked like primary buttons. | Reworked to COSS muted tabs list, transparent triggers, raised active surface, hover, desktop height, and focus-friendly controls. | Add upstream `TabsPrimitive.Indicator`, underline variant, and orientation-specific indicator animation. |
| Textarea | Placeholder differed from the COSS first particle. | Local default preview now uses the COSS placeholder while preserving textarea sizing/focus parity. | Add autosize guidance and InputGroup textarea mode. |
| Toast | Toast surface was generic and the default screenshot state did not match COSS. | Aligned the static surface styling and changed the default preview to the COSS `Default Toast` trigger state. | Experimental; full toast manager, promise/update helpers, swipe behavior, and viewport parity remain deferred. |
| Toggle | Pressed state used primary fill and the preview started pressed. | Reworked pressed state to COSS `input/64`-style neutral active surface and changed the default preview to unpressed. | Add exact outline variant and all size variants. |
| Toggle Group | Active items used primary fill and the preview used text labels. | Reworked active group items to neutral input active surface and aligned the default preview to the bold/italic/underline icon group. | Add roving focus, single/multiple state styling, and attached-group variants. |
| Toolbar | Active items and buttons were generic and there was no separator-rich formatting example. | Added `ToolbarSeparator`, aligned button/group item surfaces, and changed the default preview to a COSS-like formatting toolbar. | Add exact React-style render composition, tooltip wrapping, focus behavior, and separator sizing parity. |
| Tooltip | Popup tokens drifted and default copy differed. | Aligned compact dark popover styling and default copy to `Hover me` / `Helpful hint`; hover-state screenshots are recorded. | Delay, side/align, and animation parity remain open. |

## Implementation Notes

- Keep using Biome; no ESLint config should be introduced.
- For future parity work, copy each upstream component's slot structure and class recipe first, then map it to the closest Svelte/Bits UI primitive.
- Treat `style-coss.css` as the compatibility layer for the current generated demo, not as the final architecture for a polished package.
- Full 100% parity requires DOM, state attributes, animations, icons, and examples to match upstream, not only colors and dimensions.
