# Visual Parity Evidence Manifest

Generated: 2026-06-12T22:47:37.698Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 4

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Checkbox Group | captured | Screenshot/source evidence collected.
| Input Group | captured | Screenshot/source evidence collected.
| Radio Group | captured | Screenshot/source evidence collected.
| Textarea | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Checkbox Group | [local](http://127.0.0.1:5175/docs/components/checkbox-group) | [coss](https://coss.com/ui/docs/components/checkbox-group) | `.cache/upstream/coss/apps/ui/content/docs/components/checkbox-group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/checkbox-group.tsx` | 5 | [png](screenshots/checkbox-group-local.png) | [png](screenshots/checkbox-group-coss.png)
| Input Group | [local](http://127.0.0.1:5175/docs/components/input-group) | [coss](https://coss.com/ui/docs/components/input-group) | `.cache/upstream/coss/apps/ui/content/docs/components/input-group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/input-group.tsx` | 28 | [png](screenshots/input-group-local.png) | [png](screenshots/input-group-coss.png)
| Radio Group | [local](http://127.0.0.1:5175/docs/components/radio-group) | [coss](https://coss.com/ui/docs/components/radio-group) | `.cache/upstream/coss/apps/ui/content/docs/components/radio-group.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/radio-group.tsx` | 6 | [png](screenshots/radio-group-local.png) | [png](screenshots/radio-group-coss.png)
| Textarea | [local](http://127.0.0.1:5175/docs/components/textarea) | [coss](https://coss.com/ui/docs/components/textarea) | `.cache/upstream/coss/apps/ui/content/docs/components/textarea.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/textarea.tsx` | 15 | [png](screenshots/textarea-local.png) | [png](screenshots/textarea-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
