# Visual Parity Evidence Manifest

Generated: 2026-06-13T03:16:24.082Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 9

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Empty | captured | Screenshot/source evidence collected.
| Frame | captured | Screenshot/source evidence collected.
| Group | captured | Screenshot/source evidence collected.
| Sidebar | incomplete | upstream docs source missing
| Table | captured | Screenshot/source evidence collected.
| Toast | captured | Screenshot/source evidence collected.
| Toggle | captured | Screenshot/source evidence collected.
| Toggle Group | captured | Screenshot/source evidence collected.
| Toolbar | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Empty | [local](http://127.0.0.1:5175/docs/components/empty) | [coss](https://coss.com/ui/docs/components/empty) | `.cache/upstream/coss/apps/ui/content/docs/components/empty.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/empty.tsx` | 1 | [png](screenshots/empty-local.png) | [png](screenshots/empty-coss.png)
| Frame | [local](http://127.0.0.1:5175/docs/components/frame) | [coss](https://coss.com/ui/docs/components/frame) | `.cache/upstream/coss/apps/ui/content/docs/components/frame.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/frame.tsx` | 4 | [png](screenshots/frame-local.png) | [png](screenshots/frame-coss.png)
| Group | [local](http://127.0.0.1:5175/docs/components/group) | [coss](https://coss.com/ui/docs/components/group) | `.cache/upstream/coss/apps/ui/content/docs/components/group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/group.tsx` | 22 | [png](screenshots/group-local.png) | [png](screenshots/group-coss.png)
| Sidebar | [local](http://127.0.0.1:5175/docs/components/sidebar) | [coss](https://coss.com/ui/docs/components/sidebar) | missing | `.cache/upstream/coss/apps/ui/registry/default/ui/sidebar.tsx` | 0 | [png](screenshots/sidebar-local.png) | [png](screenshots/sidebar-coss.png)
| Table | [local](http://127.0.0.1:5175/docs/components/table) | [coss](https://coss.com/ui/docs/components/table) | `.cache/upstream/coss/apps/ui/content/docs/components/table.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/table.tsx` | 8 | [png](screenshots/table-local.png) | [png](screenshots/table-coss.png)
| Toast | [local](http://127.0.0.1:5175/docs/components/toast) | [coss](https://coss.com/ui/docs/components/toast) | `.cache/upstream/coss/apps/ui/content/docs/components/toast.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/toast.tsx` | 13 | [png](screenshots/toast-local.png) | [png](screenshots/toast-coss.png)
| Toggle | [local](http://127.0.0.1:5175/docs/components/toggle) | [coss](https://coss.com/ui/docs/components/toggle) | `.cache/upstream/coss/apps/ui/content/docs/components/toggle.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/toggle.tsx` | 17 | [png](screenshots/toggle-local.png) | [png](screenshots/toggle-coss.png)
| Toggle Group | [local](http://127.0.0.1:5175/docs/components/toggle-group) | [coss](https://coss.com/ui/docs/components/toggle-group) | `.cache/upstream/coss/apps/ui/content/docs/components/toggle-group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/toggle-group.tsx` | 9 | [png](screenshots/toggle-group-local.png) | [png](screenshots/toggle-group-coss.png)
| Toolbar | [local](http://127.0.0.1:5175/docs/components/toolbar) | [coss](https://coss.com/ui/docs/components/toolbar) | `.cache/upstream/coss/apps/ui/content/docs/components/toolbar.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/toolbar.tsx` | 1 | [png](screenshots/toolbar-local.png) | [png](screenshots/toolbar-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
