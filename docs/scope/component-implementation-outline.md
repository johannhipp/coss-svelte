# Component Implementation Outline

This document expands the feature scope into implementation intent for each component. It is not component code.

The implementation strategy is to preserve COSS's visual language and copy-and-own ergonomics, while replacing the React/Base UI primitive layer with Svelte-native Bits UI or native Svelte markup.

## Composition contract

Root components use one consistent composition model: custom `children` snippets
always take precedence, and convenience props render an explicit fallback only
when no children are supplied. This keeps the compound-part API composable while
making small examples possible without hidden root modes. New roots must follow
the same rule, and their fallback props must be listed in the docs API reference.

The model is recorded as `compositionModel` in the package metadata so registry,
docs, and validation tooling can refer to the same contract. Components with
specialized payloads (for example, calendar dates or slider values) still own
their payload normalization; the shared rule governs only root content selection.

## Dialog

- Category: Overlays & Popups
- COSS scope: A modal overlay for displaying content that requires user interaction.
- COSS docs: https://coss.com/ui/docs/components/dialog.md
- Particle examples: 6
- Svelte foundation: Dialog (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Dialog root, trigger, portal, overlay, content, close, title, and description; add COSS header, panel, footer, and scroll behavior.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/dialog.md

## Alert Dialog

- Category: Overlays & Popups
- COSS scope: A modal dialog that interrupts the user workflow for critical confirmations.
- COSS docs: https://coss.com/ui/docs/components/alert-dialog.md
- Particle examples: 2
- Svelte foundation: AlertDialog (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Map COSS Alert Dialog sections onto Bits UI AlertDialog root, trigger, portal, overlay, content, title, description, action, and cancel parts.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/alert-dialog.md

## Sheet

- Category: Overlays & Popups
- COSS scope: A flyout that opens from the side of the screen, based on the dialog component.
- COSS docs: https://coss.com/ui/docs/components/sheet.md
- Particle examples: 3
- Svelte foundation: Dialog (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Compose Dialog with side placement classes, overlay/content exports, responsive widths, and close behavior matching COSS Sheet.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/sheet.md

## Drawer

- Category: Overlays & Popups
- COSS scope: A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.
- COSS docs: https://coss.com/ui/docs/components/drawer.md
- Particle examples: 14
- Svelte foundation: Dialog accessibility shell + custom motion (custom)
- Implementation tier: custom compound

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Start from Dialog semantics for focus/portal/escape handling, then layer edge placement, drag/snap behavior, nested drawers, and responsive dialog-drawer switching.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/drawer.md

## Popover

- Category: Overlays & Popups
- COSS scope: A floating container that appears near a trigger element.
- COSS docs: https://coss.com/ui/docs/components/popover.md
- Particle examples: 3
- Svelte foundation: Popover (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Popover with trigger/content/arrow exports, portal forwarding, collision options, and form/filter examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/popover.md

## Tooltip

- Category: Overlays & Popups
- COSS scope: A small overlay that provides contextual information on hover or focus.
- COSS docs: https://coss.com/ui/docs/components/tooltip.md
- Particle examples: 4
- Svelte foundation: Tooltip (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Tooltip provider/root/trigger/content/arrow with delay, side/align options, and icon-button guidance.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/tooltip.md

## Preview Card

- Category: Overlays & Popups
- COSS scope: A rich preview component for displaying linked content.
- COSS docs: https://coss.com/ui/docs/components/preview-card.md
- Particle examples: 1
- Svelte foundation: LinkPreview (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI LinkPreview with trigger/content exports and rich preview card styling for links, users, and resources.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/preview-card.md

## Menu

- Category: Overlays & Popups
- COSS scope: A list of actions or options revealed on demand.
- COSS docs: https://coss.com/ui/docs/components/menu.md
- Particle examples: 9
- Svelte foundation: DropdownMenu / ContextMenu / Menu (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Map COSS Menu exports to Bits UI menu primitives, covering trigger, popup, item, checkbox/radio items, submenus, separators, labels, and shortcuts.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/menu.md

## Command

- Category: Overlays & Popups
- COSS scope: A command palette component built with Dialog and Autocomplete for searching and executing commands.
- COSS docs: https://coss.com/ui/docs/components/command.md
- Particle examples: 2
- Svelte foundation: Command + Dialog (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Compose Bits UI Command with Dialog for palette use, define groups/items/shortcuts, and keep keyboard navigation and filtering behavior native.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/command.md

## Select

- Category: Selection & Input
- COSS scope: A common form component for choosing a predefined value in a dropdown menu.
- COSS docs: https://coss.com/ui/docs/components/select.md
- Particle examples: 23
- Svelte foundation: Select (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Map COSS items-first Select patterns to Bits UI Select with trigger/value/content/item/group/label exports, object values, multiple mode, and form serialization.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/select.md

## Combobox

- Category: Selection & Input
- COSS scope: An input combined with a list of predefined items to select.
- COSS docs: https://coss.com/ui/docs/components/combobox.md
- Particle examples: 18
- Svelte foundation: Combobox (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Combobox with trigger/input/content/item exports, object value handling, async examples, multi-select patterns, and Field integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/combobox.md

## Autocomplete

- Category: Selection & Input
- COSS scope: An input that suggests options as you type.
- COSS docs: https://coss.com/ui/docs/components/autocomplete.md
- Particle examples: 15
- Svelte foundation: Combobox (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Build an autocomplete wrapper around Bits UI Combobox with input-first filtering, item rendering, empty state, grouped options, and form field composition.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/autocomplete.md

## Input

- Category: Selection & Input
- COSS scope: A native input element.
- COSS docs: https://coss.com/ui/docs/components/input.md
- Particle examples: 19
- Svelte foundation: native input (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement styled input with sizing, invalid/disabled states, file input handling, leading/trailing icon compatibility, and Field integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/input.md

## Textarea

- Category: Selection & Input
- COSS scope: A multi-line text input for longer content.
- COSS docs: https://coss.com/ui/docs/components/textarea.md
- Particle examples: 15
- Svelte foundation: native textarea (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement styled textarea with autosize guidance, invalid/disabled states, InputGroup compatibility, and Field integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/textarea.md

## Input Group

- Category: Selection & Input
- COSS scope: A flexible component for grouping inputs with addons, buttons, and other elements.
- COSS docs: https://coss.com/ui/docs/components/input-group.md
- Particle examples: 28
- Svelte foundation: native markup (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Build strict-order addons, controls, buttons, textareas, and prefix/suffix composition with layout invariants documented in examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/input-group.md

## OTP Field

- Category: Selection & Input
- COSS scope: A segmented input for one-time passwords and verification codes.
- COSS docs: https://coss.com/ui/docs/components/otp-field.md
- Particle examples: 9
- Svelte foundation: PinInput (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI PinInput as OTPField with one input per character, separators, grouped layouts, paste handling, and verification form examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/otp-field.md

## Number Field

- Category: Selection & Input
- COSS scope: A specialized input for numeric values with increment/decrement controls.
- COSS docs: https://coss.com/ui/docs/components/number-field.md
- Particle examples: 11
- Svelte foundation: custom spinbutton (custom)
- Implementation tier: custom primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement an accessible spinbutton-style input with increment/decrement controls, min/max/step, formatting hooks, and Field integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/number-field.md

## Slider

- Category: Selection & Input
- COSS scope: A draggable control for selecting values from a continuous range.
- COSS docs: https://coss.com/ui/docs/components/slider.md
- Particle examples: 23
- Svelte foundation: Slider (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Slider with thumb/range/track exports, scalar and range modes, value labels, marks, and Field integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/slider.md

## Calendar

- Category: Selection & Input
- COSS scope: A date picker for selecting single dates, ranges, or multiple dates.
- COSS docs: https://coss.com/ui/docs/components/calendar.md
- Particle examples: 24
- Svelte foundation: Calendar / RangeCalendar (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Calendar and RangeCalendar with COSS month grid styling, navigation controls, range/multiple modes, disabled dates, and locale-aware examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/calendar.md

## Date Picker

- Category: Selection & Input
- COSS scope: A date selection component, often combined with a calendar in a popover or input.
- COSS docs: https://coss.com/ui/docs/components/date-picker.md
- Particle examples: 9
- Svelte foundation: DatePicker / DateRangePicker (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Prefer Bits UI DatePicker where it matches COSS; otherwise compose Popover, Button, and Calendar with formatter, range, and form examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: no
- COSS live docs: https://coss.com/ui/docs/components/date-picker.md

## Form

- Category: Forms & Validation
- COSS scope: A complete form implementation with validation and submission handling.
- COSS docs: https://coss.com/ui/docs/components/form.md
- Particle examples: 2
- Svelte foundation: native form (native)
- Implementation tier: integration layer

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Keep framework-agnostic form sections first; add SvelteKit enhance examples and optional validation adapters without hard-coding a form library.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/form.md

## Field

- Category: Forms & Validation
- COSS scope: A wrapper component for form inputs with labels and validation.
- COSS docs: https://coss.com/ui/docs/components/field.md
- Particle examples: 18
- Svelte foundation: Label + native semantics (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Create Field root, label, description, error, and control conventions with aria-describedby wiring and invalid/required data attributes.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/field.md

## Fieldset

- Category: Forms & Validation
- COSS scope: A group of related form fields with a common label.
- COSS docs: https://coss.com/ui/docs/components/fieldset.md
- Particle examples: 1
- Svelte foundation: native fieldset (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap fieldset/legend semantics with Field-compatible description and error slots for grouped controls.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/fieldset.md

## Label

- Category: Forms & Validation
- COSS scope: Renders an accessible label associated with controls.
- COSS docs: https://coss.com/ui/docs/components/label.md
- Particle examples: 0
- Svelte foundation: Label (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Label with consistent typography, disabled state propagation, and Field-compatible usage.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/label.md

## Checkbox

- Category: Toggle & Choice
- COSS scope: A binary toggle input for selecting one or multiple options.
- COSS docs: https://coss.com/ui/docs/components/checkbox.md
- Particle examples: 5
- Svelte foundation: Checkbox (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Checkbox root/indicator, add icon rendering, invalid/disabled states, Field integration, and row/card checkbox particle patterns.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/checkbox.md

## Checkbox Group

- Category: Toggle & Choice
- COSS scope: A collection of related checkboxes with group-level control.
- COSS docs: https://coss.com/ui/docs/components/checkbox-group.md
- Particle examples: 5
- Svelte foundation: Checkbox + custom group (custom)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Compose Checkbox with group-level value management, Fieldset semantics, validation messages, and horizontal/vertical option layouts.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/checkbox-group.md

## Radio Group

- Category: Toggle & Choice
- COSS scope: A set of mutually exclusive options presented as radio buttons.
- COSS docs: https://coss.com/ui/docs/components/radio-group.md
- Particle examples: 6
- Svelte foundation: RadioGroup (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI RadioGroup with item/indicator exports, card options, Fieldset composition, and keyboard testing.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/radio-group.md

## Switch

- Category: Toggle & Choice
- COSS scope: A toggle control for binary on/off states.
- COSS docs: https://coss.com/ui/docs/components/switch.md
- Particle examples: 6
- Svelte foundation: Switch (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Switch with thumb styling, labels, Field composition, and settings-row particle patterns.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/switch.md

## Toggle

- Category: Toggle & Choice
- COSS scope: A button that switches between two states.
- COSS docs: https://coss.com/ui/docs/components/toggle.md
- Particle examples: 8
- Svelte foundation: Toggle (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Toggle with button variants, pressed state styling, icon-only accessibility, and toolbar examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/toggle.md

## Toggle Group

- Category: Toggle & Choice
- COSS scope: A group of toggle buttons where one or multiple can be selected.
- COSS docs: https://coss.com/ui/docs/components/toggle-group.md
- Particle examples: 9
- Svelte foundation: ToggleGroup (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI ToggleGroup with single/multiple modes, roving focus, item variants, and segmented-control examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/toggle-group.md

## Tabs

- Category: Layout & Navigation
- COSS scope: A navigation component for switching between different views or content panels.
- COSS docs: https://coss.com/ui/docs/components/tabs.md
- Particle examples: 13
- Svelte foundation: Tabs (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Tabs list/trigger/content with variant styling, orientation support, and dashboard/settings examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/tabs.md

## Accordion

- Category: Layout & Navigation
- COSS scope: A set of collapsible panels with headings.
- COSS docs: https://coss.com/ui/docs/components/accordion.md
- Particle examples: 4
- Svelte foundation: Accordion (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Accordion parts with COSS-compatible item, trigger, and content styling; preserve array-style value handling and collapsible examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/accordion.md

## Collapsible

- Category: Layout & Navigation
- COSS scope: A component that toggles visibility of content sections.
- COSS docs: https://coss.com/ui/docs/components/collapsible.md
- Particle examples: 1
- Svelte foundation: Collapsible (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Collapsible with trigger/content exports, animation data attributes, and simple disclosure examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/collapsible.md

## Sidebar

- Category: Layout & Navigation
- COSS scope: A collapsible side panel for navigation and secondary content.
- COSS docs: https://coss.com/ui/docs/components/sidebar.md
- Particle examples: 0
- Svelte foundation: Collapsible + native navigation (compound)
- Implementation tier: compound primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Build app-shell sidebar primitives around nav markup, collapsible groups, controlled collapsed state, responsive drawer mode, and persistent layout tokens.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/sidebar.md

## Breadcrumb

- Category: Layout & Navigation
- COSS scope: Displays the path to the current resource using a hierarchy of links.
- COSS docs: https://coss.com/ui/docs/components/breadcrumb.md
- Particle examples: 7
- Svelte foundation: native nav (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Use nav/ol/li markup with separators, ellipsis, current page semantics, truncation behavior, and optional menu-backed overflow.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/breadcrumb.md

## Pagination

- Category: Layout & Navigation
- COSS scope: A pagination with page navigation, next and previous links.
- COSS docs: https://coss.com/ui/docs/components/pagination.md
- Particle examples: 3
- Svelte foundation: Pagination (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Pagination with previous/next/items/ellipsis exports and routing-friendly link rendering for SvelteKit.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/pagination.md

## Toolbar

- Category: Layout & Navigation
- COSS scope: A container for grouping related actions or controls.
- COSS docs: https://coss.com/ui/docs/components/toolbar.md
- Particle examples: 1
- Svelte foundation: Toolbar (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Toolbar with group/separator/button composition, roving focus, and editor/action-bar examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/toolbar.md

## Scroll Area

- Category: Layout & Navigation
- COSS scope: A container with custom scrollbars for overflow content.
- COSS docs: https://coss.com/ui/docs/components/scroll-area.md
- Particle examples: 5
- Svelte foundation: ScrollArea (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI ScrollArea with viewport/scrollbar/thumb exports and table, menu, and long-content examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/scroll-area.md

## Card

- Category: Content & Display
- COSS scope: A content container for grouping related information.
- COSS docs: https://coss.com/ui/docs/components/card.md
- Particle examples: 11
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Create Card root/header/title/description/content/footer sections with data-slot styling and dense product UI examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/card.md

## Frame

- Category: Content & Display
- COSS scope: A container component for displaying content in a frame.
- COSS docs: https://coss.com/ui/docs/components/frame.md
- Particle examples: 4
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement framed preview/media containers with aspect constraints, subtle borders, loading/error slots, and code-preview use cases.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/frame.md

## Table

- Category: Content & Display
- COSS scope: A structured data display component with rows and columns.
- COSS docs: https://coss.com/ui/docs/components/table.md
- Particle examples: 8
- Svelte foundation: native table (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement table section components with responsive overflow wrapper, density variants, numeric alignment, empty rows, and toolbar integration.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/table.md

## Avatar

- Category: Content & Display
- COSS scope: A visual representation of a user or entity.
- COSS docs: https://coss.com/ui/docs/components/avatar.md
- Particle examples: 14
- Svelte foundation: Avatar (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Avatar image/fallback parts and add COSS sizing, grouping, stacked avatar, status, and image fallback patterns.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/avatar.md

## Badge

- Category: Content & Display
- COSS scope: A small status indicator or label component.
- COSS docs: https://coss.com/ui/docs/components/badge.md
- Particle examples: 20
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement span/a/button-compatible badge variants with semantic color tokens, compact sizing, icon slots, and removable badge examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/badge.md

## Kbd

- Category: Content & Display
- COSS scope: A component for displaying keyboard keys and shortcuts.
- COSS docs: https://coss.com/ui/docs/components/kbd.md
- Particle examples: 1
- Svelte foundation: native kbd (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Style keyboard shortcut tokens with compact sizing, command-key normalization examples, and inline/list usage.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/kbd.md

## Separator

- Category: Content & Display
- COSS scope: A visual divider for separating content sections.
- COSS docs: https://coss.com/ui/docs/components/separator.md
- Particle examples: 1
- Svelte foundation: Separator (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Separator with orientation variants, decorative semantics, and menu/card separation examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/separator.md

## Group

- Category: Content & Display
- COSS scope: A container component for grouping related content with consistent styling.
- COSS docs: https://coss.com/ui/docs/components/group.md
- Particle examples: 22
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Create grouping primitives for attached controls, segmented surfaces, and density-consistent product layouts using data-slot selectors.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/group.md

## Empty

- Category: Content & Display
- COSS scope: A container for displaying empty state information.
- COSS docs: https://coss.com/ui/docs/components/empty.md
- Particle examples: 1
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Build Empty root/icon/title/description/actions sections for product empty states with compact and illustrated variants.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/empty.md

## Alert

- Category: Feedback & Status
- COSS scope: A callout for displaying important information.
- COSS docs: https://coss.com/ui/docs/components/alert.md
- Particle examples: 7
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement as styled region/callout primitives with variant classes, icon slot support, title, description, and accessible role guidance.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/alert.md

## Toast

- Category: Feedback & Status
- COSS scope: A temporary notification message that appears and disappears automatically.
- COSS docs: https://coss.com/ui/docs/components/toast.md
- Particle examples: 13
- Svelte foundation: custom store + portal (custom)
- Implementation tier: custom compound

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Build a Svelte toast manager with provider, viewport, toast root/title/description/action/close, swipe/dismiss behavior, and promise/update helpers.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/toast.md

## Progress

- Category: Feedback & Status
- COSS scope: A visual indicator showing the completion status of a task.
- COSS docs: https://coss.com/ui/docs/components/progress.md
- Particle examples: 3
- Svelte foundation: Progress (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Progress with determinate/indeterminate styling, labels, stacked examples, and semantic value text.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/progress.md

## Meter

- Category: Feedback & Status
- COSS scope: A visual representation of a value within a known range.
- COSS docs: https://coss.com/ui/docs/components/meter.md
- Particle examples: 4
- Svelte foundation: Meter (bits)
- Implementation tier: direct primitive

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Wrap Bits UI Meter with value/label exports, thresholds, color states, and compact status examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/meter.md

## Spinner

- Category: Feedback & Status
- COSS scope: An indicator that can be used to show a loading state.
- COSS docs: https://coss.com/ui/docs/components/spinner.md
- Particle examples: 1
- Svelte foundation: native SVG/CSS (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Create accessible loading indicator variants with size, label, reduced-motion, and button/input loading composition examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/spinner.md

## Skeleton

- Category: Feedback & Status
- COSS scope: A placeholder for loading content.
- COSS docs: https://coss.com/ui/docs/components/skeleton.md
- Particle examples: 2
- Svelte foundation: native markup (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Implement animated placeholder blocks with shape variants, reduced-motion handling, and page/card/table skeleton examples.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/skeleton.md

## Button

- Category: Actions
- COSS scope: A button or a component that looks like a button.
- COSS docs: https://coss.com/ui/docs/components/button.md
- Particle examples: 40
- Svelte foundation: native button/link (native)
- Implementation tier: presentational

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. Define Button with explicit variant and size maps; support native button and link rendering, icon sizes, loading state, and button-group data styling.
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: yes
- COSS live docs: https://coss.com/ui/docs/components/button.md
