# 0.2.0 Quality Review

Reviewed on 2026-09-06 from baseline commit `a9b3d9a`. This is an unreleased quality update for the component library and shared theme; it preserves the public APIs, 52 stable roots, and three experimental roots.

## Confirmed defects and changes

| Area | Defect and correction | Source |
| --- | --- | --- |
| Tabs | The first convenience panel discarded its supplied content. All generated object panels now render their content. | `packages/coss-svelte/src/components/Tabs.svelte` |
| Field | Convenience message IDs were captured once; compound custom IDs diverged from registered references. Current message IDs are combined with reactive compound registrations, and native text controls deduplicate caller IDs. Initial SSR registration is preserved. | `packages/coss-svelte/src/internal/field-context.svelte.ts`, `FieldDescription.svelte`, `FieldError.svelte`, `Input.svelte`, `Textarea.svelte` under `packages/coss-svelte/src/components` |
| Toast | Replacing a timed toast with a persistent toast left the old dismissal timer active. Replacement clears the prior timer before scheduling a new one. | `packages/coss-svelte/src/toast-manager.ts` |
| NumberField | Reset state changed before later listeners could cancel the event. Reset now waits until the next task, respects cancellation, and clears pending work on teardown. | `packages/coss-svelte/src/components/NumberField.svelte` |
| Slider | Vertical track and range styling retained horizontal dimensions. Orientation-specific geometry supports single and multiple thumbs and consumer size overrides. | `packages/theme/src/components.css` |
| Switch | Checked thumbs translated outside their tracks in RTL layouts, and ContextMenu switches rendered a duplicate pseudo thumb. RTL translation is corrected, the duplicate is removed, and optimized production CSS is verified because the optimizer rewrites `:dir()` selectors. | `packages/theme/src/components.css` |
| Skeleton | Reduced-motion animation already stopped, but left a frozen bright shimmer gradient. Reduced motion now uses a static muted fill; normal motion retains the shimmer. | `packages/theme/src/components.css` |

Regression coverage includes real component state, SSR and hydration associations, fake-timer lifecycles, geometry, and browser interactions. For NumberField, a trusted Chromium reset event demonstrated that a microtask can run before a subsequent cancellation listener. The browser regression therefore covers later form and ancestor cancellation, submitted values, callback counts, native sibling behavior, and successful reset behavior.

## Repository and deployment checks

These checks preceded implementation. The public GitHub repository `johannhipp/coss-svelte` is linked to Vercel project `t3nseds-projects/coss-svelte`. The production branch is `main`, Git deployment creation is enabled, and the ignored-build command is unset. Existing evidence includes:

- Ready Git production deployment `dpl_9GveULeX3GD9ysLZvpna3nbkZktp` from `main` at `a9b3d9a`.
- Ready Git preview deployment `dpl_AF7phG2EPEeeRMdNJ25hrxMdmDXY` from `johann/npm-homepage-url`.
- A passing main-branch Verify workflow.

This supports the configured branch-preview and main-production workflow. No deployment configuration was changed. Authored commits use Conventional Commits; historical merge subjects are exceptions. This update retains the documented convention without adding an enforcement mechanism. npm publication remains manual.

## Visual coverage and limits

The baseline review captured and inspected all 55 component demo preview surfaces at desktop width 1440 in light mode and mobile width 390 in dark mode: 110 screenshots. No page-level horizontal overflow was observed. Fourteen overlay types were opened and visually inspected in both modes, including PreviewCard.

Additional browser fixtures exercised the public components for vertical Slider defaults, explicit sizes and multiple thumbs; checked and unchecked Switch and ContextMenu states in LTR and RTL; and reduced-motion Skeleton behavior. Screenshots and local inspection harnesses remain ignored artifacts rather than committed binaries. Both the theme executor and reviewer inspected corrected light and dark variant screenshots. The reviewer then recaptured all 55 demos from the final optimized production build at desktop width 1440 in light mode and mobile width 390 in dark mode (110 screenshots), inspected all 12 final contact sheets, and observed no page overflow or page errors. Integrated light/dark contract screenshots and an RTL ContextMenu crop confirmed visible vertical Slider ranges, contained Switch thumbs, and muted reduced-motion Skeleton fills.

On the integrated implementation, `pnpm install --frozen-lockfile` and `pnpm release:check` passed. The gate included 91 package tests in 19 files, five SSR tests in four files, clean consumer verification, API/registry/Biome/type checks with zero errors or warnings, all 55 HTML and Markdown routes, the complete Chromium browser suite including catalog accessibility checks, and both `0.2.0` tarballs. This final documentation amendment records those results without changing implementation. Packages remain unpublished.

Coverage is Chromium with selected component states, viewport sizes, and themes. It does not establish behavior in every browser, every prop combination, or every application composition. No supported security-advisory reachability was established. Experimental Drawer, Sidebar, and Toast status remains intentional. A new Textarea binding API is a deferred feature, not a confirmed defect. Field's existing error-derived invalid fallback was regression-tested and already reactive, so it was preserved.
