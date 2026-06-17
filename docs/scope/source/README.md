# COSS UI Component Scope

Generated: 2026-06-09

This folder is a structured inventory of the COSS UI component library based on the installed `coss` skill, the installed `coss-particles` skill, and the live docs map at [coss.com/ui/llms.txt](https://coss.com/ui/llms.txt).

Treat this folder as source evidence. Implementation decisions live in [../../implementation](../../implementation/README.md).

## Scope Summary

- Components covered: 54
- Hooks covered from live docs: 2
- Particle examples indexed: 484 across 52 component types
- Local primitive references used: 53
- Live-doc addition not present in the local primitive references: Date Picker

## File Map

- [00 Component Index](00-component-index.md) - every component, category, purpose, source status, and particle count.
- [01 Source Audit](01-source-audit.md) - source counts and the live `llms.txt` cross-check.
- [02 Installation And Usage](02-installation-and-usage.md) - CLI, manual install, composition, forms, styling, portal, and migration boundaries.
- [Overlays & Popups](10-overlays-and-popups.md)
- [Selection & Input](11-selection-and-input.md)
- [Forms & Validation](12-forms-and-validation.md)
- [Toggle & Choice](13-toggle-and-choice.md)
- [Layout & Navigation](14-layout-and-navigation.md)
- [Content & Display](15-content-and-display.md)
- [Feedback & Status](16-feedback-and-status.md)
- [Actions](17-actions.md)
- [90 Particle Coverage](90-particle-coverage.md) - full particle catalog grouped by component type.
- [91 Hooks](91-hooks.md) - hooks discovered in live `llms.txt`.

## Reading Guide

Use the component index to find a component quickly. Use the category files when you need scope, "use this versus that" guidance, canonical exports, common pitfalls, and all matching particles for a component. Use the source audit when you need to understand what came from local skills versus the live docs map.

For implementation status, use [v0.1 Scope Decisions](../../implementation/v0.1-scope-decisions.md) and [Unimplemented Components And Parity Gaps](../../implementation/unimplemented-components.md).
