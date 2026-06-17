# Visual Parity Evidence Manifest

Generated: 2026-06-13T10:12:13.878Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Accordion | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Accordion | [local](http://127.0.0.1:5175/docs/components/accordion) | [coss](https://coss.com/ui/docs/components/accordion) | `.cache/upstream/coss/apps/ui/content/docs/components/accordion.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/accordion.tsx` | 4 | [png](screenshots/accordion-local.png) | [png](screenshots/accordion-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
