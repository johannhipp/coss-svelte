# Visual Parity Evidence Manifest

Generated: 2026-06-13T10:27:59.486Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Button | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Button | [local](http://127.0.0.1:5175/docs/components/button) | [coss](https://coss.com/ui/docs/components/button) | `.cache/upstream/coss/apps/ui/content/docs/components/button.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/button.tsx` | 40 | [png](screenshots/button-local.png) | [png](screenshots/button-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
