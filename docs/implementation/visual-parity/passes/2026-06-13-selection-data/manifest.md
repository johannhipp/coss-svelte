# Visual Parity Evidence Manifest

Generated: 2026-06-13T06:07:22.099Z

Local base URL: http://127.0.0.1:5175
COSS base URL: https://coss.com/ui
Components in this pass: 10

## Evidence Status

| Component | Evidence status | Notes |
| --- | --- | --- |
| Autocomplete | captured | Screenshot/source evidence collected.
| Calendar | captured | Screenshot/source evidence collected.
| Combobox | captured | Screenshot/source evidence collected.
| Command | captured | Screenshot/source evidence collected.
| Date Picker | captured | standalone UI source absent; composition source mapped via 9 particles
| Meter | captured | Screenshot/source evidence collected.
| OTP Field | captured | Screenshot/source evidence collected.
| Pagination | captured | Screenshot/source evidence collected.
| Scroll Area | captured | Screenshot/source evidence collected.
| Slider | captured | Screenshot/source evidence collected.

## Source And Screenshot Map

| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| Autocomplete | [local](http://127.0.0.1:5175/docs/components/autocomplete) | [coss](https://coss.com/ui/docs/components/autocomplete) | `.cache/upstream/coss/apps/ui/content/docs/components/autocomplete.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/autocomplete.tsx` | 15 | [png](screenshots/autocomplete-local.png) | [png](screenshots/autocomplete-coss.png)
| Calendar | [local](http://127.0.0.1:5175/docs/components/calendar) | [coss](https://coss.com/ui/docs/components/calendar) | `.cache/upstream/coss/apps/ui/content/docs/components/calendar.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/calendar.tsx` | 24 | [png](screenshots/calendar-local.png) | [png](screenshots/calendar-coss.png)
| Combobox | [local](http://127.0.0.1:5175/docs/components/combobox) | [coss](https://coss.com/ui/docs/components/combobox) | `.cache/upstream/coss/apps/ui/content/docs/components/combobox.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/combobox.tsx` | 18 | [png](screenshots/combobox-local.png) | [png](screenshots/combobox-coss.png)
| Command | [local](http://127.0.0.1:5175/docs/components/command) | [coss](https://coss.com/ui/docs/components/command) | `.cache/upstream/coss/apps/ui/content/docs/components/command.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/command.tsx` | 2 | [png](screenshots/command-local.png) | [png](screenshots/command-coss.png)
| Date Picker | [local](http://127.0.0.1:5175/docs/components/date-picker) | [coss](https://coss.com/ui/docs/components/date-picker) | `.cache/upstream/coss/apps/ui/content/docs/components/date-picker.mdx` | composition: `.cache/upstream/coss/apps/ui/registry/default/particles/p-date-picker-1.tsx` | 9 | [png](screenshots/date-picker-local.png) | [png](screenshots/date-picker-coss.png)
| Meter | [local](http://127.0.0.1:5175/docs/components/meter) | [coss](https://coss.com/ui/docs/components/meter) | `.cache/upstream/coss/apps/ui/content/docs/components/meter.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/meter.tsx` | 4 | [png](screenshots/meter-local.png) | [png](screenshots/meter-coss.png)
| OTP Field | [local](http://127.0.0.1:5175/docs/components/otp-field) | [coss](https://coss.com/ui/docs/components/otp-field) | `.cache/upstream/coss/apps/ui/content/docs/components/otp-field.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/otp-field.tsx` | 9 | [png](screenshots/otp-field-local.png) | [png](screenshots/otp-field-coss.png)
| Pagination | [local](http://127.0.0.1:5175/docs/components/pagination) | [coss](https://coss.com/ui/docs/components/pagination) | `.cache/upstream/coss/apps/ui/content/docs/components/pagination.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/pagination.tsx` | 3 | [png](screenshots/pagination-local.png) | [png](screenshots/pagination-coss.png)
| Scroll Area | [local](http://127.0.0.1:5175/docs/components/scroll-area) | [coss](https://coss.com/ui/docs/components/scroll-area) | `.cache/upstream/coss/apps/ui/content/docs/components/scroll-area.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/scroll-area.tsx` | 5 | [png](screenshots/scroll-area-local.png) | [png](screenshots/scroll-area-coss.png)
| Slider | [local](http://127.0.0.1:5175/docs/components/slider) | [coss](https://coss.com/ui/docs/components/slider) | `.cache/upstream/coss/apps/ui/content/docs/components/slider.mdx` | `.cache/upstream/coss/apps/ui/registry/default/ui/slider.tsx` | 23 | [png](screenshots/slider-local.png) | [png](screenshots/slider-coss.png)

## How To Regenerate

```bash
pnpm parity:evidence
pnpm parity:evidence -- --slugs button,input,tabs
pnpm parity:evidence -- --timeout-ms 60000
```
