# Visual Parity Evidence Manifest

Generated: 2026-06-13T10:20:54.786Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Calendar | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Calendar | [local](http://127.0.0.1:5175/docs/components/calendar) | [coss](https://coss.com/ui/docs/components/calendar) | `.cache/upstream/coss/apps/ui/content/docs/components/calendar.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/calendar.tsx` | 24 | [png](screenshots/calendar-local.png) | [png](screenshots/calendar-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
