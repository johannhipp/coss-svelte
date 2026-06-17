# Visual Parity Evidence Manifest

Generated: 2026-06-13T06:26:54.219Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Sidebar | incomplete | upstream docs source missing

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Sidebar | [local](http://127.0.0.1:5175/docs/components/sidebar) | [coss](https://coss.com/ui/docs/components/sidebar) | missing | `.cache/upstream/coss/apps/ui/registry/default/ui/sidebar.tsx` | 0 | [png](screenshots/sidebar-local.png) | [png](screenshots/sidebar-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
