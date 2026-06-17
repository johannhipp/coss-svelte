# Interactive Visual Parity Evidence Manifest

Generated: 2026-06-13T06:09:09.819Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 13

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Alert Dialog | captured | Open-state screenshots captured.
| Autocomplete | captured | Open-state screenshots captured.
| Combobox | captured | Open-state screenshots captured.
| Command | captured | Open-state screenshots captured.
| Date Picker | captured | standalone UI source absent; composition source mapped via 9 particles
| Dialog | captured | Open-state screenshots captured.
| Drawer | captured | Open-state screenshots captured.
| Menu | captured | Open-state screenshots captured.
| Popover | captured | Open-state screenshots captured.
| Preview Card | captured | Open-state screenshots captured.
| Select | captured | Open-state screenshots captured.
| Sheet | captured | Open-state screenshots captured.
| Tooltip | captured | Open-state screenshots captured.

## Interaction And Screenshot Map

| Component | Interaction | Local route | COSS route | Local screenshot | COSS screenshot | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Alert Dialog | `clickText:Delete Account` | [local](http://127.0.0.1:5175/docs/components/alert-dialog) | [coss](https://coss.com/ui/docs/components/alert-dialog) | [png](screenshots/alert-dialog-local-open.png) | [png](screenshots/alert-dialog-coss-open.png) | open-state screenshots captured
| Autocomplete | `focusPlaceholder:Search items` | [local](http://127.0.0.1:5175/docs/components/autocomplete) | [coss](https://coss.com/ui/docs/components/autocomplete) | [png](screenshots/autocomplete-local-open.png) | [png](screenshots/autocomplete-coss-open.png) | open-state screenshots captured
| Combobox | `focusPlaceholder:Select a item` | [local](http://127.0.0.1:5175/docs/components/combobox) | [coss](https://coss.com/ui/docs/components/combobox) | [png](screenshots/combobox-local-open.png) | [png](screenshots/combobox-coss-open.png) | open-state screenshots captured
| Command | `clickText:Open Command Palette` | [local](http://127.0.0.1:5175/docs/components/command) | [coss](https://coss.com/ui/docs/components/command) | [png](screenshots/command-local-open.png) | [png](screenshots/command-coss-open.png) | open-state screenshots captured
| Date Picker | `clickText:Pick a date` | [local](http://127.0.0.1:5175/docs/components/date-picker) | [coss](https://coss.com/ui/docs/components/date-picker) | [png](screenshots/date-picker-local-open.png) | [png](screenshots/date-picker-coss-open.png) | standalone UI source absent; composition source mapped via 9 particles
| Dialog | `clickText:Open Dialog` | [local](http://127.0.0.1:5175/docs/components/dialog) | [coss](https://coss.com/ui/docs/components/dialog) | [png](screenshots/dialog-local-open.png) | [png](screenshots/dialog-coss-open.png) | open-state screenshots captured
| Drawer | `clickText:Open drawer` | [local](http://127.0.0.1:5175/docs/components/drawer) | [coss](https://coss.com/ui/docs/components/drawer) | [png](screenshots/drawer-local-open.png) | [png](screenshots/drawer-coss-open.png) | open-state screenshots captured
| Menu | `clickText:Open menu` | [local](http://127.0.0.1:5175/docs/components/menu) | [coss](https://coss.com/ui/docs/components/menu) | [png](screenshots/menu-local-open.png) | [png](screenshots/menu-coss-open.png) | open-state screenshots captured
| Popover | `clickText:Open Popover` | [local](http://127.0.0.1:5175/docs/components/popover) | [coss](https://coss.com/ui/docs/components/popover) | [png](screenshots/popover-local-open.png) | [png](screenshots/popover-coss-open.png) | open-state screenshots captured
| Preview Card | `hoverText:coss.com/ui` | [local](http://127.0.0.1:5175/docs/components/preview-card) | [coss](https://coss.com/ui/docs/components/preview-card) | [png](screenshots/preview-card-local-open.png) | [png](screenshots/preview-card-coss-open.png) | open-state screenshots captured
| Select | `clickSlot:select-trigger` | [local](http://127.0.0.1:5175/docs/components/select) | [coss](https://coss.com/ui/docs/components/select) | [png](screenshots/select-local-open.png) | [png](screenshots/select-coss-open.png) | open-state screenshots captured
| Sheet | `clickText:Open Sheet` | [local](http://127.0.0.1:5175/docs/components/sheet) | [coss](https://coss.com/ui/docs/components/sheet) | [png](screenshots/sheet-local-open.png) | [png](screenshots/sheet-coss-open.png) | open-state screenshots captured
| Tooltip | `hoverText:Hover me` | [local](http://127.0.0.1:5175/docs/components/tooltip) | [coss](https://coss.com/ui/docs/components/tooltip) | [png](screenshots/tooltip-local-open.png) | [png](screenshots/tooltip-coss-open.png) | open-state screenshots captured

## How To Regenerate

```bash
node scripts/capture-interactive-visual-parity-evidence.mjs
node scripts/capture-interactive-visual-parity-evidence.mjs -- --slugs dialog,menu,tooltip
```
