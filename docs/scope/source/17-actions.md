# Actions

Components in this category: 1

## Button

- Purpose: A button or a component that looks like a button.
- Registry name: `Button`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/button.md`; [docs](https://coss.com/ui/docs/components/button.md); 40 particles
- Install: `npx shadcn@latest add @coss/button`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Button`

### Covers

- Primary and secondary action triggers.
- Icon, loading, and shortcut-enhanced actions across forms and toolbars.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- default: `p-button-1`
- outline: `p-button-2`
- secondary: `p-button-3`
- destructive: `p-button-4`
- destructive outline: `p-button-5`
- ghost: `p-button-6`
- link: `p-button-7`
- extra-small size: `p-button-8`

### Common Pitfalls

- Omitting explicit `type` inside forms/dialogs and triggering unintended submit behavior.
- Using icon-only buttons without `aria-label` on the button.
- Rebuilding button state styling with ad-hoc classes instead of variants/sizes.
- Using `SelectButton` as if it were a general-purpose `Button`; `SelectButton` is a select-flavored trigger helper and should be treated as a `select`/`combobox` pattern.

### Canonical Import Shape

```tsx
import { Button } from "@/components/ui/button";
```

### Particle Coverage

- `p-button-1`: Default button ([JSON](https://coss.com/ui/r/p-button-1.json))
- `p-button-2`: Outline button ([JSON](https://coss.com/ui/r/p-button-2.json))
- `p-button-3`: Secondary button ([JSON](https://coss.com/ui/r/p-button-3.json))
- `p-button-4`: Destructive button ([JSON](https://coss.com/ui/r/p-button-4.json))
- `p-button-5`: Destructive outline button ([JSON](https://coss.com/ui/r/p-button-5.json))
- `p-button-6`: Ghost button ([JSON](https://coss.com/ui/r/p-button-6.json))
- `p-button-7`: Link button ([JSON](https://coss.com/ui/r/p-button-7.json))
- `p-button-8`: Extra-small button ([JSON](https://coss.com/ui/r/p-button-8.json))
- `p-button-9`: Small button ([JSON](https://coss.com/ui/r/p-button-9.json))
- `p-button-10`: Large button ([JSON](https://coss.com/ui/r/p-button-10.json))
- `p-button-11`: Extra-large button ([JSON](https://coss.com/ui/r/p-button-11.json))
- `p-button-12`: Disabled button ([JSON](https://coss.com/ui/r/p-button-12.json))
- `p-button-13`: Icon button ([JSON](https://coss.com/ui/r/p-button-13.json))
- `p-button-14`: Small icon button ([JSON](https://coss.com/ui/r/p-button-14.json))
- `p-button-15`: Large icon button ([JSON](https://coss.com/ui/r/p-button-15.json))
- `p-button-16`: Button with icon ([JSON](https://coss.com/ui/r/p-button-16.json))
- `p-button-17`: Link rendered as button ([JSON](https://coss.com/ui/r/p-button-17.json))
- `p-button-41`: Button using the built-in loading prop ([JSON](https://coss.com/ui/r/p-button-41.json))
- `p-button-18`: Custom loading button with manual Spinner ([JSON](https://coss.com/ui/r/p-button-18.json))
- `p-button-19`: Expandable show more/less toggle button ([JSON](https://coss.com/ui/r/p-button-19.json))
- `p-button-20`: Back link button with chevron ([JSON](https://coss.com/ui/r/p-button-20.json))
- `p-button-21`: Card-style button with heading and description ([JSON](https://coss.com/ui/r/p-button-21.json))
- `p-button-22`: Directional pad control buttons ([JSON](https://coss.com/ui/r/p-button-22.json))
- `p-button-23`: Outline like button with count ([JSON](https://coss.com/ui/r/p-button-23.json))
- `p-button-24`: Social login icon buttons ([JSON](https://coss.com/ui/r/p-button-24.json))
- `p-button-26`: Star button with count badge ([JSON](https://coss.com/ui/r/p-button-26.json))
- `p-button-27`: Button group with QR code icon and sign in ([JSON](https://coss.com/ui/r/p-button-27.json))
- `p-button-28`: Button with avatar ([JSON](https://coss.com/ui/r/p-button-28.json))
- `p-button-29`: Pill-shaped button with rounded-full styling ([JSON](https://coss.com/ui/r/p-button-29.json))
- `p-button-30`: Button with animated arrow on hover ([JSON](https://coss.com/ui/r/p-button-30.json))
- `p-button-31`: Button with keyboard shortcut indicator ([JSON](https://coss.com/ui/r/p-button-31.json))
- `p-button-32`: Button with notification badge ([JSON](https://coss.com/ui/r/p-button-32.json))
- `p-button-33`: Paired buttons (Cancel/Save) ([JSON](https://coss.com/ui/r/p-button-33.json))
- `p-button-34`: Button with animated status dot ([JSON](https://coss.com/ui/r/p-button-34.json))
- `p-button-35`: Icon-only copy button with feedback ([JSON](https://coss.com/ui/r/p-button-35.json))
- `p-button-36`: Copy button with feedback ([JSON](https://coss.com/ui/r/p-button-36.json))
- `p-button-37`: Rotating icon button (FAB-style toggle) ([JSON](https://coss.com/ui/r/p-button-37.json))
- `p-button-39`: Hamburger menu button with animated icon ([JSON](https://coss.com/ui/r/p-button-39.json))
- `p-button-40`: Download button with progress and cancel action ([JSON](https://coss.com/ui/r/p-button-40.json))
- `p-button-38`: Social login buttons (Google, X, GitHub) ([JSON](https://coss.com/ui/r/p-button-38.json))
