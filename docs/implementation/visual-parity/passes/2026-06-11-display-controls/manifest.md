# Visual Parity Evidence Manifest

Generated: 2026-06-11T14:17:27.053Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 12

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Accordion | captured | Screenshot/source evidence collected.
| Alert | captured | Screenshot/source evidence collected.
| Avatar | captured | Screenshot/source evidence collected.
| Badge | captured | Screenshot/source evidence collected.
| Breadcrumb | captured | Screenshot/source evidence collected.
| Card | source mapped | COSS screenshot failed (spawnSync /Applications/Google Chrome.app/Contents/MacOS/Google Chrome ETIMEDOUT)
| Kbd | source mapped | COSS screenshot failed (spawnSync /Applications/Google Chrome.app/Contents/MacOS/Google Chrome ETIMEDOUT)
| Progress | source mapped | COSS screenshot failed (spawnSync /Applications/Google Chrome.app/Contents/MacOS/Google Chrome ETIMEDOUT)
| Separator | captured | Screenshot/source evidence collected.
| Skeleton | captured | Screenshot/source evidence collected.
| Spinner | captured | Screenshot/source evidence collected.
| Switch | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Accordion | [local](http://127.0.0.1:5175/docs/components/accordion) | [coss](https://coss.com/ui/docs/components/accordion) | `.cache/upstream/coss/apps/ui/content/docs/components/accordion.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/accordion.tsx` | 4 | [png](screenshots/accordion-local.png) | [png](screenshots/accordion-coss.png)
| Alert | [local](http://127.0.0.1:5175/docs/components/alert) | [coss](https://coss.com/ui/docs/components/alert) | `.cache/upstream/coss/apps/ui/content/docs/components/alert.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/alert.tsx` | 9 | [png](screenshots/alert-local.png) | [png](screenshots/alert-coss.png)
| Avatar | [local](http://127.0.0.1:5175/docs/components/avatar) | [coss](https://coss.com/ui/docs/components/avatar) | `.cache/upstream/coss/apps/ui/content/docs/components/avatar.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/avatar.tsx` | 14 | [png](screenshots/avatar-local.png) | [png](screenshots/avatar-coss.png)
| Badge | [local](http://127.0.0.1:5175/docs/components/badge) | [coss](https://coss.com/ui/docs/components/badge) | `.cache/upstream/coss/apps/ui/content/docs/components/badge.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/badge.tsx` | 20 | [png](screenshots/badge-local.png) | [png](screenshots/badge-coss.png)
| Breadcrumb | [local](http://127.0.0.1:5175/docs/components/breadcrumb) | [coss](https://coss.com/ui/docs/components/breadcrumb) | `.cache/upstream/coss/apps/ui/content/docs/components/breadcrumb.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/breadcrumb.tsx` | 7 | [png](screenshots/breadcrumb-local.png) | [png](screenshots/breadcrumb-coss.png)
| Card | [local](http://127.0.0.1:5175/docs/components/card) | [coss](https://coss.com/ui/docs/components/card) | `.cache/upstream/coss/apps/ui/content/docs/components/card.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/card.tsx` | 11 | [png](screenshots/card-local.png) | not captured
| Kbd | [local](http://127.0.0.1:5175/docs/components/kbd) | [coss](https://coss.com/ui/docs/components/kbd) | `.cache/upstream/coss/apps/ui/content/docs/components/kbd.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/kbd.tsx` | 1 | [png](screenshots/kbd-local.png) | not captured
| Progress | [local](http://127.0.0.1:5175/docs/components/progress) | [coss](https://coss.com/ui/docs/components/progress) | `.cache/upstream/coss/apps/ui/content/docs/components/progress.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/progress.tsx` | 3 | [png](screenshots/progress-local.png) | not captured
| Separator | [local](http://127.0.0.1:5175/docs/components/separator) | [coss](https://coss.com/ui/docs/components/separator) | `.cache/upstream/coss/apps/ui/content/docs/components/separator.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/separator.tsx` | 1 | [png](screenshots/separator-local.png) | [png](screenshots/separator-coss.png)
| Skeleton | [local](http://127.0.0.1:5175/docs/components/skeleton) | [coss](https://coss.com/ui/docs/components/skeleton) | `.cache/upstream/coss/apps/ui/content/docs/components/skeleton.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/skeleton.tsx` | 2 | [png](screenshots/skeleton-local.png) | [png](screenshots/skeleton-coss.png)
| Spinner | [local](http://127.0.0.1:5175/docs/components/spinner) | [coss](https://coss.com/ui/docs/components/spinner) | `.cache/upstream/coss/apps/ui/content/docs/components/spinner.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/spinner.tsx` | 1 | [png](screenshots/spinner-local.png) | [png](screenshots/spinner-coss.png)
| Switch | [local](http://127.0.0.1:5175/docs/components/switch) | [coss](https://coss.com/ui/docs/components/switch) | `.cache/upstream/coss/apps/ui/content/docs/components/switch.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/switch.tsx` | 6 | [png](screenshots/switch-local.png) | [png](screenshots/switch-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
```
