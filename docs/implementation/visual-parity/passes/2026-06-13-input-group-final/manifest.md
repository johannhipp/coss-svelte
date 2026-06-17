# Visual Parity Evidence Manifest

Generated: 2026-06-12T22:50:59.295Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Input Group | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Input Group | [local](http://127.0.0.1:5175/docs/components/input-group) | [coss](https://coss.com/ui/docs/components/input-group) | `.cache/upstream/coss/apps/ui/content/docs/components/input-group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/input-group.tsx` | 28 | [png](screenshots/input-group-local.png) | [png](screenshots/input-group-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
