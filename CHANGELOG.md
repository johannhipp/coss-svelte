# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning. The component and theme packages use synchronized versions.

## 0.2.0 - Unreleased

- Render the first convenience Tabs panel's supplied content, including after switching away and back.
- Keep Field description and error associations current as messages appear, disappear, or receive custom IDs; deduplicate caller-provided IDs on Input and Textarea while preserving SSR associations.
- Cancel stale Toast timers when a timed toast is replaced with a persistent toast.
- Honor canceled NumberField form resets after event propagation and clear queued resets on teardown.
- Correct vertical Slider track and range geometry for single and multiple thumbs, while preserving utility and inline-style size overrides.
- Keep checked Switch thumbs inside their tracks in RTL layouts and remove the duplicate pseudo thumb from ContextMenu switches. Verify RTL styling in the optimized production build.
- Replace the frozen bright Skeleton shimmer gradient with a static muted fill when reduced motion is requested, while retaining the normal shimmer otherwise.
- Extend runtime, SSR, hydration, and Chromium browser regressions; record the component visual review and existing branch-preview/main-production deployment checks.
- Prepare synchronized `coss-svelte@0.2.0` and `@coss-svelte/theme@0.2.0` metadata and update the manual release instructions for the public repository. No packages have been published as part of this preparation.

## 0.1.1 - 2026-08-26

- Pointed both npm package homepages to the public coss-svelte documentation site.

## 0.1.0 - 2026-08-26

- Published 52 stable Svelte component roots with generated declarations and metadata.
- Included experimental Drawer, Sidebar, and Toast exports with documented limitations.
- Added the `@coss-svelte/theme` Tailwind CSS 4 theme package.
- Added the preview copy-and-own registry, schemas, Markdown routes, and `llms.txt` agent map.
- Added clean SvelteKit consumer, SSR, docs, browser, and two-package tarball release checks.
