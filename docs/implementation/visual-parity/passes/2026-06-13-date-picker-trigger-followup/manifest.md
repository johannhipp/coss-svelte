# Visual Parity Evidence Manifest

Generated: 2026-06-13T10:08:28.567Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Date Picker | captured | standalone UI source absent; composition source mapped via 9 particles

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Date Picker | [local](http://127.0.0.1:5175/docs/components/date-picker) | [coss](https://coss.com/ui/docs/components/date-picker) | `.cache/upstream/coss/apps/ui/content/docs/components/date-picker.mdx` | composition: `.cache/upstream/coss/apps/ui/registry/default/particles/p-date-picker-1.tsx` | 9 | [png](screenshots/date-picker-local.png) | [png](screenshots/date-picker-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
