# Visual Parity Evidence Manifest

Generated: 2026-06-12T23:04:22.905Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 9

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Alert Dialog | captured | Screenshot/source evidence collected.
| Collapsible | captured | Screenshot/source evidence collected.
| Dialog | captured | Screenshot/source evidence collected.
| Drawer | captured | Screenshot/source evidence collected.
| Menu | captured | Screenshot/source evidence collected.
| Popover | captured | Screenshot/source evidence collected.
| Preview Card | captured | Screenshot/source evidence collected.
| Sheet | captured | Screenshot/source evidence collected.
| Tooltip | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Alert Dialog | [local](http://127.0.0.1:5175/docs/components/alert-dialog) | [coss](https://coss.com/ui/docs/components/alert-dialog) | `.cache/upstream/coss/apps/ui/content/docs/components/alert-dialog.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/alert-dialog.tsx` | 2 | [png](screenshots/alert-dialog-local.png) | [png](screenshots/alert-dialog-coss.png)
| Collapsible | [local](http://127.0.0.1:5175/docs/components/collapsible) | [coss](https://coss.com/ui/docs/components/collapsible) | `.cache/upstream/coss/apps/ui/content/docs/components/collapsible.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/collapsible.tsx` | 1 | [png](screenshots/collapsible-local.png) | [png](screenshots/collapsible-coss.png)
| Dialog | [local](http://127.0.0.1:5175/docs/components/dialog) | [coss](https://coss.com/ui/docs/components/dialog) | `.cache/upstream/coss/apps/ui/content/docs/components/dialog.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/dialog.tsx` | 6 | [png](screenshots/dialog-local.png) | [png](screenshots/dialog-coss.png)
| Drawer | [local](http://127.0.0.1:5175/docs/components/drawer) | [coss](https://coss.com/ui/docs/components/drawer) | `.cache/upstream/coss/apps/ui/content/docs/components/drawer.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/drawer.tsx` | 14 | [png](screenshots/drawer-local.png) | [png](screenshots/drawer-coss.png)
| Menu | [local](http://127.0.0.1:5175/docs/components/menu) | [coss](https://coss.com/ui/docs/components/menu) | `.cache/upstream/coss/apps/ui/content/docs/components/menu.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/menu.tsx` | 9 | [png](screenshots/menu-local.png) | [png](screenshots/menu-coss.png)
| Popover | [local](http://127.0.0.1:5175/docs/components/popover) | [coss](https://coss.com/ui/docs/components/popover) | `.cache/upstream/coss/apps/ui/content/docs/components/popover.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/popover.tsx` | 3 | [png](screenshots/popover-local.png) | [png](screenshots/popover-coss.png)
| Preview Card | [local](http://127.0.0.1:5175/docs/components/preview-card) | [coss](https://coss.com/ui/docs/components/preview-card) | `.cache/upstream/coss/apps/ui/content/docs/components/preview-card.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/preview-card.tsx` | 1 | [png](screenshots/preview-card-local.png) | [png](screenshots/preview-card-coss.png)
| Sheet | [local](http://127.0.0.1:5175/docs/components/sheet) | [coss](https://coss.com/ui/docs/components/sheet) | `.cache/upstream/coss/apps/ui/content/docs/components/sheet.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/sheet.tsx` | 3 | [png](screenshots/sheet-local.png) | [png](screenshots/sheet-coss.png)
| Tooltip | [local](http://127.0.0.1:5175/docs/components/tooltip) | [coss](https://coss.com/ui/docs/components/tooltip) | `.cache/upstream/coss/apps/ui/content/docs/components/tooltip.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/tooltip.tsx` | 4 | [png](screenshots/tooltip-local.png) | [png](screenshots/tooltip-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
