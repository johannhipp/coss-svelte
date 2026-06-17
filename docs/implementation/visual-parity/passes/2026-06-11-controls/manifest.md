# Visual Parity Evidence Manifest

Generated: 2026-06-11T13:53:16.168Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 6

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Button | captured | Screenshot/source evidence collected.
| Checkbox | captured | Screenshot/source evidence collected.
| Dialog | captured | Screenshot/source evidence collected.
| Input | captured | Screenshot/source evidence collected.
| Select | captured | Screenshot/source evidence collected.
| Tabs | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Button | [local](http://127.0.0.1:5175/docs/components/button) | [coss](https://coss.com/ui/docs/components/button) | `.cache/upstream/coss/apps/ui/content/docs/components/button.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/button.tsx` | 40 | [png](screenshots/button-local.png) | [png](screenshots/button-coss.png)
| Checkbox | [local](http://127.0.0.1:5175/docs/components/checkbox) | [coss](https://coss.com/ui/docs/components/checkbox) | `.cache/upstream/coss/apps/ui/content/docs/components/checkbox.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/checkbox.tsx` | 10 | [png](screenshots/checkbox-local.png) | [png](screenshots/checkbox-coss.png)
| Dialog | [local](http://127.0.0.1:5175/docs/components/dialog) | [coss](https://coss.com/ui/docs/components/dialog) | `.cache/upstream/coss/apps/ui/content/docs/components/dialog.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/dialog.tsx` | 6 | [png](screenshots/dialog-local.png) | [png](screenshots/dialog-coss.png)
| Input | [local](http://127.0.0.1:5175/docs/components/input) | [coss](https://coss.com/ui/docs/components/input) | `.cache/upstream/coss/apps/ui/content/docs/components/input.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/input.tsx` | 47 | [png](screenshots/input-local.png) | [png](screenshots/input-coss.png)
| Select | [local](http://127.0.0.1:5175/docs/components/select) | [coss](https://coss.com/ui/docs/components/select) | `.cache/upstream/coss/apps/ui/content/docs/components/select.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/select.tsx` | 23 | [png](screenshots/select-local.png) | [png](screenshots/select-coss.png)
| Tabs | [local](http://127.0.0.1:5175/docs/components/tabs) | [coss](https://coss.com/ui/docs/components/tabs) | `.cache/upstream/coss/apps/ui/content/docs/components/tabs.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/tabs.tsx` | 13 | [png](screenshots/tabs-local.png) | [png](screenshots/tabs-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
```
