# Interactive Visual Parity Evidence Manifest

Generated: 2026-06-13T10:08:24.423Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 1

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Date Picker | captured | standalone UI source absent; composition source mapped via 9 particles

## Interaction And Screenshot Map

| Component | Interaction | Local route | COSS route | Local screenshot | COSS screenshot | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Date Picker | `clickText:Pick a date` | [local](http://127.0.0.1:5175/docs/components/date-picker) | [coss](https://coss.com/ui/docs/components/date-picker) | [png](screenshots/date-picker-local-open.png) | [png](screenshots/date-picker-coss-open.png) | standalone UI source absent; composition source mapped via 9 particles

## How To Regenerate

```bash
node scripts/capture-interactive-visual-parity-evidence.mjs
node scripts/capture-interactive-visual-parity-evidence.mjs -- --slugs dialog,menu,tooltip
```
