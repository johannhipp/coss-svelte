# Selection & Input

Components in this category: 11

## Select

- Purpose: A common form component for choosing a predefined value in a dropdown menu.
- Registry name: `Select`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/select.md`; [docs](https://coss.com/ui/docs/components/select.md); 23 particles
- Install: `npx shadcn@latest add @coss/select`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Select`, `SelectGroup`, `SelectGroupLabel`, `SelectItem`, `SelectLabel`, `SelectPopup`, `SelectSeparator`, `SelectTrigger`, `SelectValue`

### Covers

- Single-choice selection from a predefined list.
- Select-style triggers with popup options.

### Out Of Scope / Use Another Primitive

- If the user needs to type/filter options -> use Combobox instead.
- If the list is very short (2-3 items) with visible options -> consider RadioGroup.
- If the selection drives complex search/autocomplete -> use Autocomplete instead.

### Key Patterns And Invariants

- **Field composition**: in forms, place `Select` inside `Field` wrappers (see `p-select-23`, `p-form-1`, `p-form-2`).
- **Trigger composition**: keep `SelectTrigger` as the interaction entry point and avoid Radix `asChild` assumptions from other primitives; where composition is needed, prefer documented coss/Base UI `render` patterns for supported parts.
- **Multiple selection**: use `multiple` with array values (for example `defaultValue={["javascript", "typescript"]}`) and a custom `SelectValue` render function for compact summaries.
- **Object values**: use full objects in `SelectItem value={item}` with `itemToStringValue` for stable form value serialization.
- **Grouped options**: use `SelectGroup` + `SelectGroupLabel`; combine with `SelectSeparator` between groups when needed.
- **Disabled options**: pass `disabled` on individual `SelectItem` rows (for unavailable choices).
- **Rich row/trigger rendering**: render custom content (icons, avatars, secondary text) in both `SelectValue` and `SelectItem`; adjust row density via `className` where needed.
- **Alignment tuning**: use `alignItemWithTrigger={false}` only when the default selected-item alignment causes layout issues.

### Common Pitfalls

- Keeping children-only Radix select patterns without adding `items`.
- Forgetting to render `SelectValue` inside `SelectTrigger`.
- Placing placeholder on the wrong part; use `placeholder` on `SelectValue` when needed.
- Using object item values without `itemToStringValue` when stable string value serialization is required.
- Treating `multiple` select values as scalars instead of arrays.
- Mixing select and combobox APIs without validating docs.

### Canonical Import Shape

```tsx
import {
	Select,
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectLabel,
	SelectPopup,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
```

### Particle Coverage

- `p-select-1`: Basic select ([JSON](https://coss.com/ui/r/p-select-1.json))
- `p-select-2`: Small select ([JSON](https://coss.com/ui/r/p-select-2.json))
- `p-select-3`: Large select ([JSON](https://coss.com/ui/r/p-select-3.json))
- `p-select-4`: Disabled select ([JSON](https://coss.com/ui/r/p-select-4.json))
- `p-select-5`: Select without item alignment ([JSON](https://coss.com/ui/r/p-select-5.json))
- `p-select-6`: Select with groups ([JSON](https://coss.com/ui/r/p-select-6.json))
- `p-select-7`: Multiple select ([JSON](https://coss.com/ui/r/p-select-7.json))
- `p-select-8`: Select with icon ([JSON](https://coss.com/ui/r/p-select-8.json))
- `p-select-9`: Select options with icon ([JSON](https://coss.com/ui/r/p-select-9.json))
- `p-select-10`: Select with object values ([JSON](https://coss.com/ui/r/p-select-10.json))
- `p-select-12`: Select with disabled items ([JSON](https://coss.com/ui/r/p-select-12.json))
- `p-select-13`: Timezone select ([JSON](https://coss.com/ui/r/p-select-13.json))
- `p-select-14`: Status select with colored dot ([JSON](https://coss.com/ui/r/p-select-14.json))
- `p-select-15`: Pill-shaped select trigger ([JSON](https://coss.com/ui/r/p-select-15.json))
- `p-select-16`: Select with left text label ([JSON](https://coss.com/ui/r/p-select-16.json))
- `p-select-17`: Select with country flags ([JSON](https://coss.com/ui/r/p-select-17.json))
- `p-select-18`: Select with description in options only ([JSON](https://coss.com/ui/r/p-select-18.json))
- `p-select-19`: Select with avatars ([JSON](https://coss.com/ui/r/p-select-19.json))
- `p-select-20`: Rich select with avatars and usernames ([JSON](https://coss.com/ui/r/p-select-20.json))
- `p-select-21`: Auto width select ([JSON](https://coss.com/ui/r/p-select-21.json))
- `p-select-22`: Select with custom border and background ([JSON](https://coss.com/ui/r/p-select-22.json))
- `p-select-23`: Select with label ([JSON](https://coss.com/ui/r/p-select-23.json))
- `p-select-11`: Select in form ([JSON](https://coss.com/ui/r/p-select-11.json))

---

## Combobox

- Purpose: An input combined with a list of predefined items to select.
- Registry name: `Combobox`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/combobox.md`; [docs](https://coss.com/ui/docs/components/combobox.md); 18 particles
- Install: `npx shadcn@latest add @coss/combobox`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Combobox`, `ComboboxClear`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxInput`, `ComboboxItem`, `ComboboxList`, `ComboboxPopup`, `ComboboxSeparator`, `ComboboxValue`, `useComboboxFilter`

### Covers

- Searchable selection combining text input and list selection.
- Rich option rows with filtering and custom trigger behavior.

### Out Of Scope / Use Another Primitive

- If options are few and fixed (no search needed) -> use Select instead.
- If you need free-form text suggestions without strict selection -> use Autocomplete instead.
- If the user picks from a simple short list -> use RadioGroup or Select.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `ComboboxPopup` -> Base UI `Combobox.Portal` (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Mixing select and combobox APIs without validating item/value wiring.
- Using object values without stable string serialization where needed.
- Missing empty/loading states for remote or filtered datasets.

### Canonical Import Shape

```tsx
import {
	Combobox,
	ComboboxClear,
	ComboboxCollection,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxPopup,
	ComboboxSeparator,
	ComboboxValue,
	useComboboxFilter,
} from "@/components/ui/combobox";
```

### Particle Coverage

- `p-combobox-1`: Basic combobox ([JSON](https://coss.com/ui/r/p-combobox-1.json))
- `p-combobox-2`: Disabled combobox ([JSON](https://coss.com/ui/r/p-combobox-2.json))
- `p-combobox-3`: Small combobox ([JSON](https://coss.com/ui/r/p-combobox-3.json))
- `p-combobox-4`: Large combobox ([JSON](https://coss.com/ui/r/p-combobox-4.json))
- `p-combobox-5`: Combobox with label ([JSON](https://coss.com/ui/r/p-combobox-5.json))
- `p-combobox-6`: Combobox auto highlighting the first option ([JSON](https://coss.com/ui/r/p-combobox-6.json))
- `p-combobox-7`: Combobox with clear button ([JSON](https://coss.com/ui/r/p-combobox-7.json))
- `p-combobox-8`: Combobox with grouped items ([JSON](https://coss.com/ui/r/p-combobox-8.json))
- `p-combobox-9`: Combobox with multiple selection ([JSON](https://coss.com/ui/r/p-combobox-9.json))
- `p-combobox-10`: Combobox with input inside popup ([JSON](https://coss.com/ui/r/p-combobox-10.json))
- `p-combobox-11`: Combobox form ([JSON](https://coss.com/ui/r/p-combobox-11.json))
- `p-combobox-12`: Combobox multiple form ([JSON](https://coss.com/ui/r/p-combobox-12.json))
- `p-combobox-13`: Combobox with start addon ([JSON](https://coss.com/ui/r/p-combobox-13.json))
- `p-combobox-14`: Combobox multiple with start addon ([JSON](https://coss.com/ui/r/p-combobox-14.json))
- `p-combobox-15`: Pill-shaped combobox ([JSON](https://coss.com/ui/r/p-combobox-15.json))
- `p-combobox-16`: Timezone combobox ([JSON](https://coss.com/ui/r/p-combobox-16.json))
- `p-combobox-17`: Timezone combobox with search input ([JSON](https://coss.com/ui/r/p-combobox-17.json))
- `p-combobox-18`: Combobox with select trigger ([JSON](https://coss.com/ui/r/p-combobox-18.json))

---

## Autocomplete

- Purpose: An input that suggests options as you type.
- Registry name: `Autocomplete`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/autocomplete.md`; [docs](https://coss.com/ui/docs/components/autocomplete.md); 15 particles
- Install: `npx shadcn@latest add @coss/autocomplete`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Autocomplete`, `AutocompleteCollection`, `AutocompleteEmpty`, `AutocompleteGroup`, `AutocompleteGroupLabel`, `AutocompleteInput`, `AutocompleteItem`, `AutocompleteList`, `AutocompletePopup`, `AutocompleteSeparator`, `AutocompleteStatus`, `useAutocompleteFilter`

### Covers

- Search-driven suggestion pickers with free typing.
- Assisted text entry over a known option space with keyboard navigation.

### Out Of Scope / Use Another Primitive

- If options are predefined and don't need search -> use Select instead.
- If the user must pick from a strict set (no free text) -> use Combobox instead.
- If you need action commands, not data selection -> use Command instead.

### Key Patterns And Invariants

- **Portal forwarding**: optional `portalProps` on `AutocompletePopup` -> Base UI combobox/autocomplete portal (`keepMounted`, `container`, ...). See [portal forwarding](02-installation-and-usage.md#portal-forwarding).

### Common Pitfalls

- Omitting `AutocompleteEmpty`, leaving blank popups with no user feedback.
- Using object items in async/custom flows without `itemToStringValue`, which breaks stable string mapping.
- Mixing combobox/select assumptions into autocomplete APIs without checking docs.
- Missing explicit labels (`FieldLabel` or `aria-label`) on the input.
- Not handling async race/error states (`loading`, `error`, stale response cancellation).

### Canonical Import Shape

```tsx
import {
	Autocomplete,
	AutocompleteCollection,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteGroupLabel,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
	AutocompletePopup,
	AutocompleteSeparator,
	AutocompleteStatus,
	useAutocompleteFilter,
} from "@/components/ui/autocomplete";
```

### Particle Coverage

- `p-autocomplete-1`: Basic autocomplete ([JSON](https://coss.com/ui/r/p-autocomplete-1.json))
- `p-autocomplete-2`: Disabled autocomplete ([JSON](https://coss.com/ui/r/p-autocomplete-2.json))
- `p-autocomplete-3`: Small autocomplete ([JSON](https://coss.com/ui/r/p-autocomplete-3.json))
- `p-autocomplete-4`: Large autocomplete ([JSON](https://coss.com/ui/r/p-autocomplete-4.json))
- `p-autocomplete-5`: Autocomplete with label ([JSON](https://coss.com/ui/r/p-autocomplete-5.json))
- `p-autocomplete-6`: Autocomplete autofilling the input with the highlighted item ([JSON](https://coss.com/ui/r/p-autocomplete-6.json))
- `p-autocomplete-7`: Autocomplete auto highlighting the first option ([JSON](https://coss.com/ui/r/p-autocomplete-7.json))
- `p-autocomplete-8`: Autocomplete with clear button ([JSON](https://coss.com/ui/r/p-autocomplete-8.json))
- `p-autocomplete-9`: Autocomplete with trigger and clear buttons ([JSON](https://coss.com/ui/r/p-autocomplete-9.json))
- `p-autocomplete-10`: Autocomplete with grouped items ([JSON](https://coss.com/ui/r/p-autocomplete-10.json))
- `p-autocomplete-11`: Autocomplete with limited number of results ([JSON](https://coss.com/ui/r/p-autocomplete-11.json))
- `p-autocomplete-12`: Autocomplete with async items loading ([JSON](https://coss.com/ui/r/p-autocomplete-12.json))
- `p-autocomplete-13`: Autocomplete form ([JSON](https://coss.com/ui/r/p-autocomplete-13.json))
- `p-autocomplete-14`: Autocomplete form ([JSON](https://coss.com/ui/r/p-autocomplete-14.json))
- `p-autocomplete-15`: Pill-shaped autocomplete ([JSON](https://coss.com/ui/r/p-autocomplete-15.json))

---

## Input

- Purpose: A native input element.
- Registry name: `Input`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/input.md`; [docs](https://coss.com/ui/docs/components/input.md); 19 particles
- Install: `npx shadcn@latest add @coss/input`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Input`

### Covers

- Single-line text entry with variants and addons.
- Email/password/search/file and other typed input flows.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- small size: `p-input-2`
- large size: `p-input-3`
- disabled: `p-input-4`
- file: `p-input-5`
- with label: `p-input-6`
- with button: `p-input-7`
- form integration: `p-form-1`

### Common Pitfalls

- Omitting explicit `type` and relying on browser defaults.
- Using icon-only affordances without label/aria context.
- Applying heavy class overrides before using built-in size/variant props.

### Canonical Import Shape

```tsx
import { Input } from "@/components/ui/input";
```

### Particle Coverage

- `p-input-1`: Basic input ([JSON](https://coss.com/ui/r/p-input-1.json))
- `p-input-2`: Small input ([JSON](https://coss.com/ui/r/p-input-2.json))
- `p-input-3`: Large input ([JSON](https://coss.com/ui/r/p-input-3.json))
- `p-input-4`: Disabled input ([JSON](https://coss.com/ui/r/p-input-4.json))
- `p-input-5`: File input ([JSON](https://coss.com/ui/r/p-input-5.json))
- `p-input-6`: Input with label ([JSON](https://coss.com/ui/r/p-input-6.json))
- `p-input-7`: Input with button using Group ([JSON](https://coss.com/ui/r/p-input-7.json))
- `p-input-8`: Input with start text and end tooltip ([JSON](https://coss.com/ui/r/p-input-8.json))
- `p-input-9`: Password input with toggle visibility ([JSON](https://coss.com/ui/r/p-input-9.json))
- `p-input-10`: Input group mimicking a URL bar ([JSON](https://coss.com/ui/r/p-input-10.json))
- `p-input-11`: Input group with keyboard shortcut ([JSON](https://coss.com/ui/r/p-input-11.json))
- `p-input-12`: Input group with start loading spinner ([JSON](https://coss.com/ui/r/p-input-12.json))
- `p-input-13`: Input with label and required indicator ([JSON](https://coss.com/ui/r/p-input-13.json))
- `p-input-14`: Input with optional label ([JSON](https://coss.com/ui/r/p-input-14.json))
- `p-input-15`: Input with custom border and background ([JSON](https://coss.com/ui/r/p-input-15.json))
- `p-input-16`: Input group with end loading spinner ([JSON](https://coss.com/ui/r/p-input-16.json))
- `p-input-17`: Read-only input ([JSON](https://coss.com/ui/r/p-input-17.json))
- `p-input-18`: Input with characters remaining counter ([JSON](https://coss.com/ui/r/p-input-18.json))
- `p-input-19`: Pill-shaped input ([JSON](https://coss.com/ui/r/p-input-19.json))

---

## Textarea

- Purpose: A multi-line text input for longer content.
- Registry name: `Textarea`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/textarea.md`; [docs](https://coss.com/ui/docs/components/textarea.md); 15 particles
- Install: `npx shadcn@latest add @coss/textarea`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Textarea`

### Covers

- Multi-line text entry (notes, feedback, descriptions).
- Comment/message inputs where text length is variable.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using textarea when a constrained single-line input is expected.
- Missing labels/descriptions for required long-form fields.
- Forgetting explicit submit button type handling in textarea forms.
- Using `FieldControl render={<textarea .../>}` for basic textarea fields when `Textarea` already provides the correct control integration.

### Canonical Import Shape

```tsx
import { Textarea } from "@/components/ui/textarea";
```

### Particle Coverage

- `p-textarea-1`: Basic textarea ([JSON](https://coss.com/ui/r/p-textarea-1.json))
- `p-textarea-2`: Small textarea ([JSON](https://coss.com/ui/r/p-textarea-2.json))
- `p-textarea-3`: Large textarea ([JSON](https://coss.com/ui/r/p-textarea-3.json))
- `p-textarea-4`: Disabled textarea ([JSON](https://coss.com/ui/r/p-textarea-4.json))
- `p-textarea-5`: Textarea with label ([JSON](https://coss.com/ui/r/p-textarea-5.json))
- `p-textarea-6`: Textarea in form ([JSON](https://coss.com/ui/r/p-textarea-6.json))
- `p-textarea-7`: Textarea with label and required indicator ([JSON](https://coss.com/ui/r/p-textarea-7.json))
- `p-textarea-8`: Textarea with optional label ([JSON](https://coss.com/ui/r/p-textarea-8.json))
- `p-textarea-9`: Textarea with custom border and background ([JSON](https://coss.com/ui/r/p-textarea-9.json))
- `p-textarea-10`: Read-only textarea ([JSON](https://coss.com/ui/r/p-textarea-10.json))
- `p-textarea-11`: Textarea with characters remaining counter ([JSON](https://coss.com/ui/r/p-textarea-11.json))
- `p-textarea-12`: Textarea field with required indicator ([JSON](https://coss.com/ui/r/p-textarea-12.json))
- `p-textarea-13`: Shorter textarea with fixed height ([JSON](https://coss.com/ui/r/p-textarea-13.json))
- `p-textarea-14`: Textarea with button aligned right ([JSON](https://coss.com/ui/r/p-textarea-14.json))
- `p-textarea-15`: Textarea with button aligned left ([JSON](https://coss.com/ui/r/p-textarea-15.json))

---

## Input Group

- Purpose: A flexible component for grouping inputs with addons, buttons, and other elements.
- Registry name: `InputGroup`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/input-group.md`; [docs](https://coss.com/ui/docs/components/input-group.md); 28 particles
- Install: `npx shadcn@latest add @coss/input-group`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `InputGroup`, `InputGroupAddon`, `InputGroupInput`, `InputGroupText`

### Covers

- Inputs/textareas that need inline or block addons.
- Input composition with icons, buttons, labels, badges, and shortcuts.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using `Input`/`Textarea` directly instead of `InputGroupInput`/`InputGroupTextarea`.
- Wrong addon DOM order.
- Missing explicit input types.

### Canonical Import Shape

```tsx
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
```

### Particle Coverage

- `p-input-group-1`: Basic input group ([JSON](https://coss.com/ui/r/p-input-group-1.json))
- `p-input-group-2`: Input group with end icon ([JSON](https://coss.com/ui/r/p-input-group-2.json))
- `p-input-group-3`: Input group with start text ([JSON](https://coss.com/ui/r/p-input-group-3.json))
- `p-input-group-4`: Input group with end text ([JSON](https://coss.com/ui/r/p-input-group-4.json))
- `p-input-group-5`: Input group with start and end text ([JSON](https://coss.com/ui/r/p-input-group-5.json))
- `p-input-group-6`: Input group with number field ([JSON](https://coss.com/ui/r/p-input-group-6.json))
- `p-input-group-7`: Input group with end tooltip ([JSON](https://coss.com/ui/r/p-input-group-7.json))
- `p-input-group-8`: Input group with icon button ([JSON](https://coss.com/ui/r/p-input-group-8.json))
- `p-input-group-9`: Input group with button ([JSON](https://coss.com/ui/r/p-input-group-9.json))
- `p-input-group-10`: Input group with badge ([JSON](https://coss.com/ui/r/p-input-group-10.json))
- `p-input-group-11`: Input group with keyboard shortcut ([JSON](https://coss.com/ui/r/p-input-group-11.json))
- `p-input-group-12`: Input group with inner label ([JSON](https://coss.com/ui/r/p-input-group-12.json))
- `p-input-group-13`: Small input group ([JSON](https://coss.com/ui/r/p-input-group-13.json))
- `p-input-group-14`: Large input group ([JSON](https://coss.com/ui/r/p-input-group-14.json))
- `p-input-group-15`: Disabled input group ([JSON](https://coss.com/ui/r/p-input-group-15.json))
- `p-input-group-16`: Input group with loading spinner ([JSON](https://coss.com/ui/r/p-input-group-16.json))
- `p-input-group-17`: Input group with textarea ([JSON](https://coss.com/ui/r/p-input-group-17.json))
- `p-input-group-18`: Input group with badge and menu ([JSON](https://coss.com/ui/r/p-input-group-18.json))
- `p-input-group-19`: Mini editor built with input group and toggle ([JSON](https://coss.com/ui/r/p-input-group-19.json))
- `p-input-group-20`: Input group with search icon ([JSON](https://coss.com/ui/r/p-input-group-20.json))
- `p-input-group-21`: Input group with start tooltip ([JSON](https://coss.com/ui/r/p-input-group-21.json))
- `p-input-group-22`: Input group with clear button ([JSON](https://coss.com/ui/r/p-input-group-22.json))
- `p-input-group-23`: Search input group with loader and voice button ([JSON](https://coss.com/ui/r/p-input-group-23.json))
- `p-input-group-24`: Input group with character counter ([JSON](https://coss.com/ui/r/p-input-group-24.json))
- `p-input-group-26`: Password input with strength indicator ([JSON](https://coss.com/ui/r/p-input-group-26.json))
- `p-input-group-27`: Code snippet input with language selector ([JSON](https://coss.com/ui/r/p-input-group-27.json))
- `p-input-group-28`: Message composer with attachment buttons ([JSON](https://coss.com/ui/r/p-input-group-28.json))
- `p-input-group-29`: Chat input with voice and send buttons ([JSON](https://coss.com/ui/r/p-input-group-29.json))

---

## OTP Field

- Purpose: A segmented input for one-time passwords and verification codes.
- Registry name: `OTPField`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/otp-field.md`; [docs](https://coss.com/ui/docs/components/otp-field.md); 9 particles
- Install: `npx shadcn@latest add @coss/otp-field`
- Manual dependencies: `npm install @base-ui/react lucide-react`
- Canonical exports: `OTPField`, `OTPFieldInput`, `OTPFieldSeparator`

### Covers

- One-time passcode entry with segmented slots.
- Verification code flows with strict length formatting.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Slot count mismatch with `length`, causing broken OTP UX.
- Missing `aria-label` when no visible label is present.
- Using OTP slots for arbitrary text input instead of fixed verification codes.

### Canonical Import Shape

```tsx
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@/components/ui/otp-field";
```

### Particle Coverage

- `p-otp-field-1`: Basic OTP field ([JSON](https://coss.com/ui/r/p-otp-field-1.json))
- `p-otp-field-2`: Large OTP field ([JSON](https://coss.com/ui/r/p-otp-field-2.json))
- `p-otp-field-3`: OTP field with separator ([JSON](https://coss.com/ui/r/p-otp-field-3.json))
- `p-otp-field-4`: OTP field with label ([JSON](https://coss.com/ui/r/p-otp-field-4.json))
- `p-otp-field-6`: OTP field with custom sanitization ([JSON](https://coss.com/ui/r/p-otp-field-6.json))
- `p-otp-field-7`: OTP field with auto validation ([JSON](https://coss.com/ui/r/p-otp-field-7.json))
- `p-otp-field-8`: Alphanumeric OTP field ([JSON](https://coss.com/ui/r/p-otp-field-8.json))
- `p-otp-field-9`: OTP field with placeholder hints ([JSON](https://coss.com/ui/r/p-otp-field-9.json))
- `p-otp-field-10`: Masked OTP field ([JSON](https://coss.com/ui/r/p-otp-field-10.json))

---

## Number Field

- Purpose: A specialized input for numeric values with increment/decrement controls.
- Registry name: `NumberField`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/number-field.md`; [docs](https://coss.com/ui/docs/components/number-field.md); 11 particles
- Install: `npx shadcn@latest add @coss/number-field`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `NumberField`, `NumberFieldDecrement`, `NumberFieldGroup`, `NumberFieldIncrement`, `NumberFieldInput`, `NumberFieldScrubArea`

### Covers

- Numeric entry with increment/decrement controls.
- Bounded stepper-style quantity/amount inputs.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Treating number field value as free-form text without numeric bounds/steps.
- Missing increment/decrement controls in stepper-style UIs where expected.
- Not validating min/max constraints and resulting clamped behavior.

### Canonical Import Shape

```tsx
import {
	NumberField,
	NumberFieldDecrement,
	NumberFieldGroup,
	NumberFieldIncrement,
	NumberFieldInput,
	NumberFieldScrubArea,
} from "@/components/ui/number-field";
```

### Particle Coverage

- `p-number-field-1`: Basic number field ([JSON](https://coss.com/ui/r/p-number-field-1.json))
- `p-number-field-2`: Small number field ([JSON](https://coss.com/ui/r/p-number-field-2.json))
- `p-number-field-3`: Large number field ([JSON](https://coss.com/ui/r/p-number-field-3.json))
- `p-number-field-4`: Disabled number field ([JSON](https://coss.com/ui/r/p-number-field-4.json))
- `p-number-field-5`: Number field with label ([JSON](https://coss.com/ui/r/p-number-field-5.json))
- `p-number-field-6`: Number field with scrub ([JSON](https://coss.com/ui/r/p-number-field-6.json))
- `p-number-field-7`: Number field with range ([JSON](https://coss.com/ui/r/p-number-field-7.json))
- `p-number-field-8`: Number field with formatted value ([JSON](https://coss.com/ui/r/p-number-field-8.json))
- `p-number-field-9`: Number field with step ([JSON](https://coss.com/ui/r/p-number-field-9.json))
- `p-number-field-10`: Number field in form ([JSON](https://coss.com/ui/r/p-number-field-10.json))
- `p-number-field-11`: Pill-shaped number field ([JSON](https://coss.com/ui/r/p-number-field-11.json))

---

## Slider

- Purpose: A draggable control for selecting values from a continuous range.
- Registry name: `Slider`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/slider.md`; [docs](https://coss.com/ui/docs/components/slider.md); 23 particles
- Install: `npx shadcn@latest add @coss/slider`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Slider`, `SliderValue`

### Covers

- Continuous or ranged numeric tuning interactions.
- Volume/brightness/threshold controls with immediate feedback.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using slider for discrete option labels where select/radio is clearer.
- Not exposing current value context in nearby UI text when needed.
- Confusing single-value vs range value shapes in controlled mode.

### Canonical Import Shape

```tsx
import { Slider, SliderValue } from "@/components/ui/slider";
```

### Particle Coverage

- `p-slider-1`: Basic slider ([JSON](https://coss.com/ui/r/p-slider-1.json))
- `p-slider-2`: Slider with label and value ([JSON](https://coss.com/ui/r/p-slider-2.json))
- `p-slider-3`: Disabled slider ([JSON](https://coss.com/ui/r/p-slider-3.json))
- `p-slider-4`: Slider with reference labels ([JSON](https://coss.com/ui/r/p-slider-4.json))
- `p-slider-5`: Slider with ticks ([JSON](https://coss.com/ui/r/p-slider-5.json))
- `p-slider-6`: Slider with labels above ([JSON](https://coss.com/ui/r/p-slider-6.json))
- `p-slider-7`: Range slider ([JSON](https://coss.com/ui/r/p-slider-7.json))
- `p-slider-8`: Slider with 3 thumbs ([JSON](https://coss.com/ui/r/p-slider-8.json))
- `p-slider-9`: Range slider with collision behavior none ([JSON](https://coss.com/ui/r/p-slider-9.json))
- `p-slider-10`: Range slider with collision behavior swap ([JSON](https://coss.com/ui/r/p-slider-10.json))
- `p-slider-11`: Slider with icons ([JSON](https://coss.com/ui/r/p-slider-11.json))
- `p-slider-12`: Slider with input ([JSON](https://coss.com/ui/r/p-slider-12.json))
- `p-slider-13`: Range slider with inputs ([JSON](https://coss.com/ui/r/p-slider-13.json))
- `p-slider-14`: Slider with increment and decrement buttons ([JSON](https://coss.com/ui/r/p-slider-14.json))
- `p-slider-15`: Price range slider ([JSON](https://coss.com/ui/r/p-slider-15.json))
- `p-slider-16`: Emoji rating slider ([JSON](https://coss.com/ui/r/p-slider-16.json))
- `p-slider-17`: Vertical slider ([JSON](https://coss.com/ui/r/p-slider-17.json))
- `p-slider-18`: Vertical range slider ([JSON](https://coss.com/ui/r/p-slider-18.json))
- `p-slider-19`: Vertical slider with input ([JSON](https://coss.com/ui/r/p-slider-19.json))
- `p-slider-20`: Equalizer with vertical sliders ([JSON](https://coss.com/ui/r/p-slider-20.json))
- `p-slider-21`: Object position sliders with reset ([JSON](https://coss.com/ui/r/p-slider-21.json))
- `p-slider-22`: Price slider with histogram ([JSON](https://coss.com/ui/r/p-slider-22.json))
- `p-slider-23`: Slider in form ([JSON](https://coss.com/ui/r/p-slider-23.json))

---

## Calendar

- Purpose: A date picker for selecting single dates, ranges, or multiple dates.
- Registry name: `Calendar`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/calendar.md`; [docs](https://coss.com/ui/docs/components/calendar.md); 24 particles
- Install: `npx shadcn@latest add @coss/calendar`
- Manual dependencies: `npm install react-day-picker`
- Canonical exports: `Calendar`

### Covers

- Date selection interfaces and calendar-based scheduling UIs.
- Single-date, range, and constrained date picking patterns.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using calendar for free-text date input flows better handled by date fields.
- Missing locale/disabled-date constraints for business rules.
- Treating calendar as date-time picker without explicit time UI.

### Canonical Import Shape

```tsx
import { Calendar } from "@/components/ui/calendar";
```

### Particle Coverage

- `p-calendar-1`: Basic calendar ([JSON](https://coss.com/ui/r/p-calendar-1.json))
- `p-calendar-3`: Calendar with date range selection ([JSON](https://coss.com/ui/r/p-calendar-3.json))
- `p-calendar-4`: Calendar with month/year dropdown navigation ([JSON](https://coss.com/ui/r/p-calendar-4.json))
- `p-calendar-5`: Calendar with custom Select dropdown for month/year ([JSON](https://coss.com/ui/r/p-calendar-5.json))
- `p-calendar-6`: Calendar with Combobox dropdown for month/year ([JSON](https://coss.com/ui/r/p-calendar-6.json))
- `p-calendar-7`: Calendar with disabled dates ([JSON](https://coss.com/ui/r/p-calendar-7.json))
- `p-calendar-8`: Calendar with multiple date selection ([JSON](https://coss.com/ui/r/p-calendar-8.json))
- `p-calendar-2`: Calendar with custom cell size ([JSON](https://coss.com/ui/r/p-calendar-2.json))
- `p-calendar-9`: Calendar with rounded day buttons ([JSON](https://coss.com/ui/r/p-calendar-9.json))
- `p-calendar-10`: Calendar with rounded range selection style ([JSON](https://coss.com/ui/r/p-calendar-10.json))
- `p-calendar-11`: Calendar with right-aligned navigation ([JSON](https://coss.com/ui/r/p-calendar-11.json))
- `p-calendar-12`: Calendar with week numbers ([JSON](https://coss.com/ui/r/p-calendar-12.json))
- `p-calendar-13`: Calendar with year-only combobox dropdown ([JSON](https://coss.com/ui/r/p-calendar-13.json))
- `p-calendar-14`: Calendar without arrow navigation (dropdown only) ([JSON](https://coss.com/ui/r/p-calendar-14.json))
- `p-calendar-15`: Calendar with current month button ([JSON](https://coss.com/ui/r/p-calendar-15.json))
- `p-calendar-16`: Calendar with today button ([JSON](https://coss.com/ui/r/p-calendar-16.json))
- `p-calendar-17`: Calendar with date input ([JSON](https://coss.com/ui/r/p-calendar-17.json))
- `p-calendar-18`: Calendar with time input ([JSON](https://coss.com/ui/r/p-calendar-18.json))
- `p-calendar-19`: Calendar with time slots (appointment picker) ([JSON](https://coss.com/ui/r/p-calendar-19.json))
- `p-calendar-20`: Calendar with date presets ([JSON](https://coss.com/ui/r/p-calendar-20.json))
- `p-calendar-21`: Range calendar with date presets ([JSON](https://coss.com/ui/r/p-calendar-21.json))
- `p-calendar-22`: Two months calendar ([JSON](https://coss.com/ui/r/p-calendar-22.json))
- `p-calendar-23`: Three months calendar ([JSON](https://coss.com/ui/r/p-calendar-23.json))
- `p-calendar-24`: Pricing calendar with custom day buttons ([JSON](https://coss.com/ui/r/p-calendar-24.json))

---

## Date Picker

- Purpose: A date selection component, often combined with a calendar in a popover or input.
- Registry name: `Date Picker`
- Source coverage: live docs and particles; no local primitive reference in installed skill
- Sources: [docs](https://coss.com/ui/docs/components/date-picker.md); 9 particles
- Install: `npx shadcn@latest add @coss/calendar @coss/popover @coss/button`
- Manual dependencies: `npm install react-day-picker date-fns lucide-react @base-ui/react`
- Canonical exports: `Button`, `Calendar`, `Popover`, `PopoverPopup`, `PopoverTrigger`

### Covers

- Date selection flows built from Calendar and Popover.
- Single date, date range, preset, input-backed, dropdown-navigation, and close-on-select picker patterns.

### Out Of Scope / Use Another Primitive

- Not a standalone primitive file in the installed COSS skill; install Calendar, Popover, and Button.

### Key Patterns And Invariants

- Composes a Button trigger, Calendar content, and PopoverPopup alignment.
- Supports date range picker, dropdown navigation, presets, input integration, and closing the popover on selection.

### Common Pitfalls

- No explicit pitfalls listed in the local reference.

### Canonical Import Shape

```tsx
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
```

### Particle Coverage

- `p-date-picker-1`: Basic date picker ([JSON](https://coss.com/ui/r/p-date-picker-1.json))
- `p-date-picker-2`: Date range picker ([JSON](https://coss.com/ui/r/p-date-picker-2.json))
- `p-date-picker-9`: Two months calendar with range date ([JSON](https://coss.com/ui/r/p-date-picker-9.json))
- `p-date-picker-3`: Date picker with field and dropdown navigation ([JSON](https://coss.com/ui/r/p-date-picker-3.json))
- `p-date-picker-4`: Date picker with presets ([JSON](https://coss.com/ui/r/p-date-picker-4.json))
- `p-date-picker-5`: Date picker with input ([JSON](https://coss.com/ui/r/p-date-picker-5.json))
- `p-date-picker-6`: Date picker that closes on select ([JSON](https://coss.com/ui/r/p-date-picker-6.json))
- `p-date-picker-7`: Multiple dates picker ([JSON](https://coss.com/ui/r/p-date-picker-7.json))
- `p-date-picker-8`: Date picker with select-like trigger ([JSON](https://coss.com/ui/r/p-date-picker-8.json))
