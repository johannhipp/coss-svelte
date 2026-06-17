# Visual Parity Evidence Manifest

Generated: 2026-06-11T14:29:45.946Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 3

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Card | captured | Screenshot/source evidence collected.
| Kbd | captured | Screenshot/source evidence collected.
| Progress | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Card | [local](http://127.0.0.1:5175/docs/components/card) | [coss](https://coss.com/ui/docs/components/card) | `.cache/upstream/coss/apps/ui/content/docs/components/card.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/card.tsx` | 11 | [png](screenshots/card-local.png) | [png](screenshots/card-coss.png)
| Kbd | [local](http://127.0.0.1:5175/docs/components/kbd) | [coss](https://coss.com/ui/docs/components/kbd) | `.cache/upstream/coss/apps/ui/content/docs/components/kbd.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/kbd.tsx` | 1 | [png](screenshots/kbd-local.png) | [png](screenshots/kbd-coss.png)
| Progress | [local](http://127.0.0.1:5175/docs/components/progress) | [coss](https://coss.com/ui/docs/components/progress) | `.cache/upstream/coss/apps/ui/content/docs/components/progress.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/progress.tsx` | 3 | [png](screenshots/progress-local.png) | [png](screenshots/progress-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
