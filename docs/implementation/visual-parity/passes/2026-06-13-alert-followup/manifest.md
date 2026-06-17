# Visual Parity Evidence Manifest

Generated: 2026-06-13T10:32:20.536Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Alert | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Alert | [local](http://127.0.0.1:5175/docs/components/alert) | [coss](https://coss.com/ui/docs/components/alert) | `.cache/upstream/coss/apps/ui/content/docs/components/alert.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/alert.tsx` | 9 | [png](screenshots/alert-local.png) | [png](screenshots/alert-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
