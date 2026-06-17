# Interactive Visual Parity Evidence Manifest

Generated: 2026-06-13T03:25:09.577Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 2

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Dialog | captured | Open-state screenshots captured.
| Tooltip | captured | Open-state screenshots captured.

## Interaction And Screenshot Map

| Component | Interaction | Local route | COSS route | Local screenshot | COSS screenshot | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Dialog | `clickText:Open Dialog` | [local](http://127.0.0.1:5175/docs/components/dialog) | [coss](https://coss.com/ui/docs/components/dialog) | [png](screenshots/dialog-local-open.png) | [png](screenshots/dialog-coss-open.png) | open-state screenshots captured
| Tooltip | `hoverText:Hover me` | [local](http://127.0.0.1:5175/docs/components/tooltip) | [coss](https://coss.com/ui/docs/components/tooltip) | [png](screenshots/tooltip-local-open.png) | [png](screenshots/tooltip-coss-open.png) | open-state screenshots captured

## How To Regenerate

```bash
node scripts/capture-interactive-visual-parity-evidence.mjs
node scripts/capture-interactive-visual-parity-evidence.mjs -- --slugs dialog,menu,tooltip
```
