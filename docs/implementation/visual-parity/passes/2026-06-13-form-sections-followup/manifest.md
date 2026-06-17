# Visual Parity Evidence Manifest

Generated: 2026-06-12T22:49:54.504Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 3

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Field | captured | Screenshot/source evidence collected.
| Fieldset | captured | Screenshot/source evidence collected.
| Form | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Field | [local](http://127.0.0.1:5175/docs/components/field) | [coss](https://coss.com/ui/docs/components/field) | `.cache/upstream/coss/apps/ui/content/docs/components/field.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/field.tsx` | 18 | [png](screenshots/field-local.png) | [png](screenshots/field-coss.png)
| Fieldset | [local](http://127.0.0.1:5175/docs/components/fieldset) | [coss](https://coss.com/ui/docs/components/fieldset) | `.cache/upstream/coss/apps/ui/content/docs/components/fieldset.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/fieldset.tsx` | 1 | [png](screenshots/fieldset-local.png) | [png](screenshots/fieldset-coss.png)
| Form | [local](http://127.0.0.1:5175/docs/components/form) | [coss](https://coss.com/ui/docs/components/form) | `.cache/upstream/coss/apps/ui/content/docs/components/form.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/form.tsx` | 2 | [png](screenshots/form-local.png) | [png](screenshots/form-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
