# Visual Parity Evidence Manifest

Generated: 2026-06-12T23:06:14.877Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Popover | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Popover | [local](http://127.0.0.1:5175/docs/components/popover) | [coss](https://coss.com/ui/docs/components/popover) | `.cache/upstream/coss/apps/ui/content/docs/components/popover.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/popover.tsx` | 3 | [png](screenshots/popover-local.png) | [png](screenshots/popover-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
