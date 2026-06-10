# Toggle & Choice

Components in this category: 6

## Checkbox

- Purpose: A binary toggle input for selecting one or multiple options.
- Registry name: `Checkbox`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/checkbox.md`; [docs](https://coss.com/ui/docs/components/checkbox.md); 5 particles
- Install: `npx shadcn@latest add @coss/checkbox`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Checkbox`

### Covers

- Single boolean consent/selection controls.
- Standalone yes/no options with explicit labeling.

### Out Of Scope / Use Another Primitive

- If the control is a preference toggle (on/off) in settings -> use Switch instead.
- If selecting from mutually exclusive options -> use RadioGroup instead.
- If multiple checkboxes share grouped state -> use CheckboxGroup instead.

### Key Patterns And Invariants

- disabled: `p-checkbox-2`
- with description: `p-checkbox-3`
- card style: `p-checkbox-4`
- form integration: `p-checkbox-5`

### Common Pitfalls

- Using checkbox for exclusive single-choice options that should be radios.
- Missing visible label association (`Label` or `FieldLabel`) for each checkbox.
- Treating `onCheckedChange` values as plain boolean without handling indeterminate where relevant.

### Canonical Import Shape

```tsx
import { Checkbox } from "@/components/ui/checkbox";
```

### Particle Coverage

- `p-checkbox-1`: Basic checkbox ([JSON](https://coss.com/ui/r/p-checkbox-1.json))
- `p-checkbox-2`: Disabled checkbox ([JSON](https://coss.com/ui/r/p-checkbox-2.json))
- `p-checkbox-3`: Checkbox with description ([JSON](https://coss.com/ui/r/p-checkbox-3.json))
- `p-checkbox-4`: Card-style checkbox ([JSON](https://coss.com/ui/r/p-checkbox-4.json))
- `p-checkbox-5`: Checkbox form ([JSON](https://coss.com/ui/r/p-checkbox-5.json))

---

## Checkbox Group

- Purpose: A collection of related checkboxes with group-level control.
- Registry name: `CheckboxGroup`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/checkbox-group.md`; [docs](https://coss.com/ui/docs/components/checkbox-group.md); 5 particles
- Install: `npx shadcn@latest add @coss/checkbox-group`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Checkbox`, `CheckboxGroup`

### Covers

- Multi-select option groups with shared label context.
- Collecting multiple values under one field name.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using checkbox group when only one option should be selected.
- Missing group label/legend context for assistive technology.
- Incorrectly handling submitted values as scalar instead of array/list.

### Canonical Import Shape

```tsx
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
```

### Particle Coverage

- `p-checkbox-group-1`: Basic checkbox group ([JSON](https://coss.com/ui/r/p-checkbox-group-1.json))
- `p-checkbox-group-2`: Checkbox group with disabled items ([JSON](https://coss.com/ui/r/p-checkbox-group-2.json))
- `p-checkbox-group-3`: Checkbox group with parent checkbox ([JSON](https://coss.com/ui/r/p-checkbox-group-3.json))
- `p-checkbox-group-4`: Nested checkbox group with parent ([JSON](https://coss.com/ui/r/p-checkbox-group-4.json))
- `p-checkbox-group-5`: Checkbox group form ([JSON](https://coss.com/ui/r/p-checkbox-group-5.json))

---

## Radio Group

- Purpose: A set of mutually exclusive options presented as radio buttons.
- Registry name: `RadioGroup`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/radio-group.md`; [docs](https://coss.com/ui/docs/components/radio-group.md); 6 particles
- Install: `npx shadcn@latest add @coss/radio-group`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Label`, `Radio`, `RadioGroup`

### Covers

- Mutually exclusive option selection.
- Single-choice settings with clear option labels.

### Out Of Scope / Use Another Primitive

- If multiple options can be selected -> use CheckboxGroup instead.
- If options are many and need search/filtering -> use Select or Combobox instead.
- If the choices are binary (on/off) -> use Switch or Checkbox instead.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using radios for multi-select behavior that requires checkbox group.
- Missing label association for each radio option.
- Handling selected value as array when radio group returns single value.

### Canonical Import Shape

```tsx
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
```

### Particle Coverage

- `p-radio-group-1`: Basic radio group ([JSON](https://coss.com/ui/r/p-radio-group-1.json))
- `p-radio-group-2`: Disabled radio group ([JSON](https://coss.com/ui/r/p-radio-group-2.json))
- `p-radio-group-3`: Radio group with description ([JSON](https://coss.com/ui/r/p-radio-group-3.json))
- `p-radio-group-4`: Radio group card ([JSON](https://coss.com/ui/r/p-radio-group-4.json))
- `p-radio-group-5`: Radio group in form ([JSON](https://coss.com/ui/r/p-radio-group-5.json))
- `p-radio-group-6`: Theme selector with image cards ([JSON](https://coss.com/ui/r/p-radio-group-6.json))

---

## Switch

- Purpose: A toggle control for binary on/off states.
- Registry name: `Switch`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/switch.md`; [docs](https://coss.com/ui/docs/components/switch.md); 6 particles
- Install: `npx shadcn@latest add @coss/switch`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Switch`

### Covers

- Binary preference toggles in settings flows.
- Immediate on/off state controls with explicit labels.

### Out Of Scope / Use Another Primitive

- If the control is a pressable command (not a preference) -> use Toggle instead.
- If you need grouped toggle selection -> use ToggleGroup instead.
- If it's a form agreement (terms/conditions) -> use Checkbox instead.

### Key Patterns And Invariants

- disabled: `p-switch-2`
- with description: `p-switch-3`
- customizing size: `p-switch-6`
- card style: `p-switch-4`
- form integration: `p-switch-5`

### Common Pitfalls

- Using switch for multi-option selection that should use radio/toggle-group.
- Omitting visible label or explicit `aria-label` for icon-only switch controls.
- Treating switch as form value without verifying checked-state wiring.

### Canonical Import Shape

```tsx
import { Switch } from "@/components/ui/switch";
```

### Particle Coverage

- `p-switch-1`: Basic switch ([JSON](https://coss.com/ui/r/p-switch-1.json))
- `p-switch-2`: Disabled switch ([JSON](https://coss.com/ui/r/p-switch-2.json))
- `p-switch-3`: Switch with description ([JSON](https://coss.com/ui/r/p-switch-3.json))
- `p-switch-4`: Switch card ([JSON](https://coss.com/ui/r/p-switch-4.json))
- `p-switch-5`: Switch in form ([JSON](https://coss.com/ui/r/p-switch-5.json))
- `p-switch-6`: Custom size switch ([JSON](https://coss.com/ui/r/p-switch-6.json))

---

## Toggle

- Purpose: A button that switches between two states.
- Registry name: `Toggle`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/toggle.md`; [docs](https://coss.com/ui/docs/components/toggle.md); 8 particles
- Install: `npx shadcn@latest add @coss/toggle`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Toggle`

### Covers

- Pressable two-state commands (formatting/tool modes).
- Single-command active/inactive interactions without group state.

### Out Of Scope / Use Another Primitive

- If the control is a binary preference setting -> use Switch instead.
- If multiple toggles share state -> use ToggleGroup instead.

### Key Patterns And Invariants

- outline: `p-toggle-2`
- with icon: `p-toggle-3`
- small / large size: `p-toggle-4`, `p-toggle-5`
- disabled: `p-toggle-6`
- icon group: `p-toggle-7`

### Common Pitfalls

- Using toggle for destructive/submit actions better represented by `Button`.
- Missing pressed-state semantics in controlled toggle flows.
- Using standalone toggles when mutually exclusive behavior needs `ToggleGroup`.

### Canonical Import Shape

```tsx
import { Toggle } from "@/components/ui/toggle";
```

### Particle Coverage

- `p-toggle-1`: Basic toggle ([JSON](https://coss.com/ui/r/p-toggle-1.json))
- `p-toggle-2`: Toggle with outline ([JSON](https://coss.com/ui/r/p-toggle-2.json))
- `p-toggle-3`: Toggle with icon ([JSON](https://coss.com/ui/r/p-toggle-3.json))
- `p-toggle-4`: Small toggle ([JSON](https://coss.com/ui/r/p-toggle-4.json))
- `p-toggle-5`: Large toggle ([JSON](https://coss.com/ui/r/p-toggle-5.json))
- `p-toggle-6`: Disabled toggle ([JSON](https://coss.com/ui/r/p-toggle-6.json))
- `p-toggle-7`: Toggle icon group ([JSON](https://coss.com/ui/r/p-toggle-7.json))
- `p-toggle-8`: Bookmark toggle with tooltip and success toast ([JSON](https://coss.com/ui/r/p-toggle-8.json))

---

## Toggle Group

- Purpose: A group of toggle buttons where one or multiple can be selected.
- Registry name: `ToggleGroup`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/toggle-group.md`; [docs](https://coss.com/ui/docs/components/toggle-group.md); 9 particles
- Install: `npx shadcn@latest add @coss/toggle-group`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `ToggleGroup`, `ToggleGroupItem`

### Covers

- Grouped pressed-state controls (single or multiple).
- Formatting/action sets needing button-like toggles with shared state.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using toggle-group when plain buttons (no pressed state) are more appropriate.
- Wrong value shape for mode (`multiple` array vs single selection).
- Missing accessible labels on icon-only toggle items.

### Canonical Import Shape

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
```

### Particle Coverage

- `p-toggle-group-1`: Basic toggle group ([JSON](https://coss.com/ui/r/p-toggle-group-1.json))
- `p-toggle-group-2`: Small toggle group ([JSON](https://coss.com/ui/r/p-toggle-group-2.json))
- `p-toggle-group-3`: Large toggle group ([JSON](https://coss.com/ui/r/p-toggle-group-3.json))
- `p-toggle-group-4`: Toggle group with outline ([JSON](https://coss.com/ui/r/p-toggle-group-4.json))
- `p-toggle-group-5`: Vertical toggle group with outline ([JSON](https://coss.com/ui/r/p-toggle-group-5.json))
- `p-toggle-group-6`: Disabled toggle group ([JSON](https://coss.com/ui/r/p-toggle-group-6.json))
- `p-toggle-group-7`: Toggle group with disabled item ([JSON](https://coss.com/ui/r/p-toggle-group-7.json))
- `p-toggle-group-8`: Multiple selection toggle group ([JSON](https://coss.com/ui/r/p-toggle-group-8.json))
- `p-toggle-group-9`: Toggle group with tooltips ([JSON](https://coss.com/ui/r/p-toggle-group-9.json))
