# Feedback & Status

Components in this category: 6

## Alert

- Purpose: A callout for displaying important information.
- Registry name: `Alert`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/alert.md`; [docs](https://coss.com/ui/docs/components/alert.md); 7 particles
- Install: `npx shadcn@latest add @coss/alert`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Alert`, `AlertAction`, `AlertDescription`, `AlertTitle`

### Covers

- Inline status messaging in content flows.
- Semantic feedback variants (`info`, `success`, `warning`, `error`) with optional icons and actions.

### Out Of Scope / Use Another Primitive

- If the message is transient and should auto-dismiss -> use Toast instead.
- If the message requires user action before proceeding -> use AlertDialog instead.
- If it's a brief hover hint -> use Tooltip instead.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using alert variants for passive decoration instead of meaningful semantic status.
- Missing title/description structure in complex alerts, reducing scannability.
- Hiding semantic alert icons with `aria-hidden` when they convey status meaning.

### Canonical Import Shape

```tsx
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
```

### Particle Coverage

- `p-alert-1`: Basic alert ([JSON](https://coss.com/ui/r/p-alert-1.json))
- `p-alert-2`: Alert with icon ([JSON](https://coss.com/ui/r/p-alert-2.json))
- `p-alert-3`: Alert with icon and action buttons ([JSON](https://coss.com/ui/r/p-alert-3.json))
- `p-alert-4`: Info alert ([JSON](https://coss.com/ui/r/p-alert-4.json))
- `p-alert-5`: Success alert ([JSON](https://coss.com/ui/r/p-alert-5.json))
- `p-alert-6`: Warning alert ([JSON](https://coss.com/ui/r/p-alert-6.json))
- `p-alert-7`: Error alert ([JSON](https://coss.com/ui/r/p-alert-7.json))

---

## Toast

- Purpose: A temporary notification message that appears and disappears automatically.
- Registry name: `Toast`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/toast.md`; [docs](https://coss.com/ui/docs/components/toast.md); 13 particles
- Install: `npx shadcn@latest add @coss/toast`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `AnchoredToastProvider`, `ToastProvider`, `anchoredToastManager`, `toastManager`

### Covers

- Temporary in-app feedback notifications.
- Anchored contextual toasts tied to a target element.

### Out Of Scope / Use Another Primitive

- If the message requires user acknowledgment before proceeding -> use AlertDialog instead.
- If the feedback is inline and persistent -> use Alert instead.
- If the notification is anchored to a specific element without toastManager -> use Tooltip or Popover instead.

### Key Patterns And Invariants

- **Stacked notifications**: use `toastManager.add(...)` for global app feedback with typed variants and optional actions.
- **Anchored notifications**: use `anchoredToastManager.add(...)` with `positionerProps.anchor` for contextual, element-tied toasts.
- **Lifecycle-driven flows**: use loading/promise patterns and explicit close/update handling for async operations.
- **Deduplication / upsert**: pass a stable `id` on `toastManager.add`. If that `id` is already shown, Base UI updates the toast in place and the UI replays a short re-notify animation via `updateKey` instead of adding another surface.

### Common Pitfalls

- Forgetting provider setup before calling managers.
- Using anchored toasts without a valid `anchor`.
- Assuming tooltip-style anchored toasts show full content (only title is shown with `tooltipStyle`).
- Copy/pasting Sonner examples (`toast(...)` options shape) without adapting to `toastManager` / `anchoredToastManager`.

### Canonical Import Shape

```tsx
import {
	AnchoredToastProvider,
	ToastProvider,
	anchoredToastManager,
	toastManager,
} from "@/components/ui/toast";
```

### Particle Coverage

- `p-toast-1`: Default stacked toast with title and description ([JSON](https://coss.com/ui/r/p-toast-1.json))
- `p-toast-2`: Stacked toasts by semantic type (success, error, info, warning) ([JSON](https://coss.com/ui/r/p-toast-2.json))
- `p-toast-3`: Loading-state stacked toast ([JSON](https://coss.com/ui/r/p-toast-3.json))
- `p-toast-4`: Stacked toast with primary action (undo) ([JSON](https://coss.com/ui/r/p-toast-4.json))
- `p-toast-5`: Promise-based stacked toast ([JSON](https://coss.com/ui/r/p-toast-5.json))
- `p-toast-6`: Stacked toasts with varying content height ([JSON](https://coss.com/ui/r/p-toast-6.json))
- `p-toast-7`: Anchored tooltip-style toast after copy ([JSON](https://coss.com/ui/r/p-toast-7.json))
- `p-toast-8`: Anchored error toast after async failure ([JSON](https://coss.com/ui/r/p-toast-8.json))
- `p-toast-9`: Long-running promise toast with cancel ([JSON](https://coss.com/ui/r/p-toast-9.json))
- `p-toast-10`: Deduplicated success toast ([JSON](https://coss.com/ui/r/p-toast-10.json))
- `p-toast-11`: Deduplicated error toast ([JSON](https://coss.com/ui/r/p-toast-11.json))
- `p-toast-12`: Anchored deduplicated success toast ([JSON](https://coss.com/ui/r/p-toast-12.json))
- `p-toast-13`: Anchored deduplicated error toast ([JSON](https://coss.com/ui/r/p-toast-13.json))

---

## Progress

- Purpose: A visual indicator showing the completion status of a task.
- Registry name: `Progress`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/progress.md`; [docs](https://coss.com/ui/docs/components/progress.md); 3 particles
- Install: `npx shadcn@latest add @coss/progress`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Progress`, `ProgressLabel`, `ProgressValue`

### Covers

- Task completion and async operation progress bars.
- Indeterminate or determinate status during loading pipelines.

### Out Of Scope / Use Another Primitive

- If displaying a bounded measurement (not task completion) -> use Meter instead.
- If the loading state is indeterminate with no percentage -> consider Spinner.

### Key Patterns And Invariants

- with label and value: `p-progress-2`
- with formatted value: `p-progress-3`

### Common Pitfalls

- Using progress without text/context for what operation is progressing.
- Using determinate values when state is actually unknown/indeterminate.
- Using progress for static score displays that should use `Meter`.

### Canonical Import Shape

```tsx
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
```

### Particle Coverage

- `p-progress-1`: Basic progress bar ([JSON](https://coss.com/ui/r/p-progress-1.json))
- `p-progress-2`: Progress with label and value ([JSON](https://coss.com/ui/r/p-progress-2.json))
- `p-progress-3`: Progress with formatted value ([JSON](https://coss.com/ui/r/p-progress-3.json))

---

## Meter

- Purpose: A visual representation of a value within a known range.
- Registry name: `Meter`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/meter.md`; [docs](https://coss.com/ui/docs/components/meter.md); 4 particles
- Install: `npx shadcn@latest add @coss/meter`
- Manual dependencies: `npm install @base-ui/react`
- Canonical exports: `Meter`, `MeterLabel`, `MeterValue`

### Covers

- Bounded scalar measurement display (not task progress).
- Quality/capacity indicators with min/max semantics.

### Out Of Scope / Use Another Primitive

- If displaying task completion or async progress -> use Progress instead.
- If the indicator is indeterminate -> use Spinner or Progress instead.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using meter to represent completion tasks better suited for `Progress`.
- Missing min/max context when values are not obvious to the user.
- Treating meter as interactive control rather than read-only indicator.

### Canonical Import Shape

```tsx
import { Meter, MeterLabel, MeterValue } from "@/components/ui/meter";
```

### Particle Coverage

- `p-meter-1`: Basic meter ([JSON](https://coss.com/ui/r/p-meter-1.json))
- `p-meter-2`: Simple meter ([JSON](https://coss.com/ui/r/p-meter-2.json))
- `p-meter-3`: Meter with formatted value ([JSON](https://coss.com/ui/r/p-meter-3.json))
- `p-meter-4`: Meter with range ([JSON](https://coss.com/ui/r/p-meter-4.json))

---

## Spinner

- Purpose: An indicator that can be used to show a loading state.
- Registry name: `Spinner`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/spinner.md`; [docs](https://coss.com/ui/docs/components/spinner.md); 1 particle
- Install: `npx shadcn@latest add @coss/spinner`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Spinner`

### Covers

- Indeterminate loading indicator for ongoing work.
- Inline pending state in buttons, forms, and async panels.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- No dedicated bullets found in the local reference.

### Common Pitfalls

- Using spinner without accessible label/context for screen readers.
- Showing spinner with no cancel/retry pathway in long-running operations.
- Using spinner when determinate progress value is available.

### Canonical Import Shape

```tsx
import { Spinner } from "@/components/ui/spinner";
```

### Particle Coverage

- `p-spinner-1`: Basic spinner ([JSON](https://coss.com/ui/r/p-spinner-1.json))

---

## Skeleton

- Purpose: A placeholder for loading content.
- Registry name: `Skeleton`
- Source coverage: local primitive, live docs, particles when available
- Sources: local: `./references/primitives/skeleton.md`; [docs](https://coss.com/ui/docs/components/skeleton.md); 2 particles
- Install: `npx shadcn@latest add @coss/skeleton`
- Manual dependencies: Use the component docs for manual install details.
- Canonical exports: `Skeleton`

### Covers

- Loading placeholders matching final layout density.
- Perceived-performance improvement during fetch/render latency.

### Out Of Scope / Use Another Primitive

- No explicit out-of-scope guidance found in the local reference.

### Key Patterns And Invariants

- skeleton-only layout: `p-skeleton-2`
- full loading-to-loaded flow: `p-skeleton-1`

### Common Pitfalls

- Mismatch between skeleton layout and final content layout causing jarring swap.
- Leaving skeleton visible after load completion due missing state transition.
- Using skeleton for very short operations where spinner/text is clearer.

### Canonical Import Shape

```tsx
import { Skeleton } from "@/components/ui/skeleton";
```

### Particle Coverage

- `p-skeleton-1`: Basic skeleton ([JSON](https://coss.com/ui/r/p-skeleton-1.json))
- `p-skeleton-2`: Skeleton only ([JSON](https://coss.com/ui/r/p-skeleton-2.json))
