# Forms & Validation

Components in this category: 4

## Form

- Purpose: A complete form implementation with validation and submission handling.
- Registry name: `Form`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/form.md`; [docs](https://coss.com/ui/docs/components/form.md); 2 particles
- Install: `npx shadcn@latest add @coss/form`
- Manual dependencies: `npm install @base-ui/react zod`
- Canonical exports: `Field`, `FieldDescription`, `FieldError`, `FieldLabel`, `Form`, `Input`

### Covers

- Structured form validation and submission flows.
- Forms with field-level labels, descriptions, and errors.
- Integrations with external form libraries (for example React Hook Form / TanStack Form).

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- `Form` usage in particles is intentionally lightweight; use the Base UI forms handbook patterns below for deeper validation/library integrations.
- **Dialog / sheet / drawer:** Header **outside** the form; **`Form className="contents"`** wraps **panel + footer** only (`p-dialog-1`, `p-sheet-1`, `p-sheet-2`, `p-drawer-10`, `p-drawer-12`).

### Common Pitfalls

- Using `Form` without field-level structure (`Field`, label, error).
- Missing control `name` (field not present in form submission payload).
- Missing input `type` and button `type`.
- Showing validation messages without matching invalid semantics.
- Using grouped checkboxes/radios without proper group legend/structure.
- Not forwarding refs in RHF/TanStack integration, which breaks focus-on-error behavior.

### Canonical Import Shape

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
```

### Particle Coverage

- `p-form-1`: Input in a form ([JSON](https://coss.com/ui/r/p-form-1.json))
- `p-form-2`: Form with zod validation ([JSON](https://coss.com/ui/r/p-form-2.json))

---

## Field

- Purpose: A wrapper component for form inputs with labels and validation.
- Registry name: `Field`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/field.md`; [docs](https://coss.com/ui/docs/components/field.md); 18 particles
- Install: `npx shadcn@latest add @coss/field`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Field`, `FieldDescription`, `FieldError`, `FieldLabel`, `FieldValidity`, `Input`

### Covers

- Accessible field wrappers with labels, descriptions, and errors.
- Form control state wiring (`invalid`, `required`, touched/error messaging).

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- Field control IDs resolve in this order: an explicit control ID, the enclosing Field control ID, then a component-generated ID.
- Explicit control `disabled`, `required`, and invalid values override Field state; otherwise Field state reaches the actual checkbox, switch, group, trigger, or input.
- `aria-describedby` is the deduplicated union of caller IDs and the Field description/error IDs.
- Accessible names preserve caller `aria-labelledby`, then caller `aria-label`, then the native Field label association, then component convenience labels.
- In compound Select, Combobox, and Autocomplete usage, apply an explicit ID to the semantic Trigger/Input part; root convenience IDs apply only to generated controls.

### Common Pitfalls

- Rendering errors detached from the related control, breaking context.
- Missing `name` in form flows, causing silent submit omissions.
- Using field wrapper without corresponding label/description/error semantics.

### Canonical Import Shape

```tsx
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldValidity,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
```

### Particle Coverage

- `p-field-1`: Field with description ([JSON](https://coss.com/ui/r/p-field-1.json))
- `p-field-2`: Field with required indicator ([JSON](https://coss.com/ui/r/p-field-2.json))
- `p-field-3`: Field in disabled state ([JSON](https://coss.com/ui/r/p-field-3.json))
- `p-field-4`: Field showing validation error ([JSON](https://coss.com/ui/r/p-field-4.json))
- `p-field-5`: Show field validity state ([JSON](https://coss.com/ui/r/p-field-5.json))
- `p-field-6`: Input group with field ([JSON](https://coss.com/ui/r/p-field-6.json))
- `p-field-7`: Field with autocomplete ([JSON](https://coss.com/ui/r/p-field-7.json))
- `p-field-8`: Field with combobox ([JSON](https://coss.com/ui/r/p-field-8.json))
- `p-field-9`: Field with multiple selection combobox ([JSON](https://coss.com/ui/r/p-field-9.json))
- `p-field-10`: Field with textarea ([JSON](https://coss.com/ui/r/p-field-10.json))
- `p-field-11`: Field with select ([JSON](https://coss.com/ui/r/p-field-11.json))
- `p-field-12`: Field with checkbox ([JSON](https://coss.com/ui/r/p-field-12.json))
- `p-field-13`: Field with checkbox group ([JSON](https://coss.com/ui/r/p-field-13.json))
- `p-field-14`: Field with radio group ([JSON](https://coss.com/ui/r/p-field-14.json))
- `p-field-15`: Field with toggle switch ([JSON](https://coss.com/ui/r/p-field-15.json))
- `p-field-16`: Field with slider ([JSON](https://coss.com/ui/r/p-field-16.json))
- `p-field-17`: Field with number field ([JSON](https://coss.com/ui/r/p-field-17.json))
- `p-field-18`: Complete form built with field ([JSON](https://coss.com/ui/r/p-field-18.json))

---

## Fieldset

- Purpose: A group of related form fields with a common label.
- Registry name: `Fieldset`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/fieldset.md`; [docs](https://coss.com/ui/docs/components/fieldset.md); 1 particle
- Install: `npx shadcn@latest add @coss/fieldset`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Fieldset`, `FieldsetLegend`

### Covers

- Grouped related controls under one legend/description.
- Complex forms requiring semantic grouping for radios/checkboxes.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using ad-hoc div wrappers instead of semantic fieldset for grouped controls.
- Omitting `FieldsetLegend`, reducing accessibility context.
- Placing unrelated controls inside one fieldset, hurting form clarity.

### Canonical Import Shape

```tsx
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
```

### Particle Coverage

- `p-fieldset-1`: Fieldset with multiple fields ([JSON](https://coss.com/ui/r/p-fieldset-1.json))

---

## Label

- Purpose: Renders an accessible label associated with controls.
- Registry name: `Label`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/label.md`; [docs](https://coss.com/ui/docs/components/label.md); 0 particles
- Install: `npx shadcn@latest add @coss/label`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Label`

### Covers

- Visible accessible labels for inputs and controls.
- Simple `htmlFor`/`id` associations in forms and settings UIs.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using `aria-label` when visible `Label` text exists and can be associated.
- Mismatching `htmlFor`/`id` between label and control.
- Using label component as generic typography instead of form labeling.

### Canonical Import Shape

```tsx
import { Label } from "@/components/ui/label";
```

### Particle Coverage

- No particle examples listed in the installed coss-particles skill.
