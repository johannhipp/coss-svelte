# Upstream Reference Cache

This repository keeps raw upstream references in `.cache/upstream`, which is intentionally ignored by git. The cache provides local source material for implementation work without bloating the publishable repository.

Refresh it with:

```bash
pnpm fetch:upstream
```

Current cache manifest, generated on 2026-06-10:

| Source                                           | Purpose                                                                   | Revision / version | Local cache                             |
| ------------------------------------------------ | ------------------------------------------------------------------------- | ------------------ | --------------------------------------- |
| `https://github.com/cosscom/coss.git`            | Target design language, registry shape, docs structure, particle examples | `68bf668`          | `.cache/upstream/coss`                  |
| `https://github.com/huntabyte/shadcn-svelte.git` | Svelte registry/CLI/build workflow reference                              | `496daed`          | `.cache/upstream/shadcn-svelte`         |
| `https://github.com/huntabyte/bits-ui.git`       | Svelte-native primitive behavior and docs                                 | `f153675`          | `.cache/upstream/bits-ui`               |
| `https://coss.com/ui/llms.txt`                   | Live COSS docs map                                                        | fetched 2026-06-10 | `.cache/upstream/coss-llms.txt`         |
| installed COSS skill references                  | Local component/pitfall summaries generated from COSS docs and particles  | copied 2026-06-10  | `.cache/upstream/coss-skill-references` |

## Relevant Upstream Paths

COSS:

- `.cache/upstream/coss/apps/ui/content/docs/components`
- `.cache/upstream/coss/apps/ui/registry/default/ui`
- `.cache/upstream/coss/apps/ui/registry/default/particles`
- `.cache/upstream/coss/apps/ui/public/r`
- `.cache/upstream/coss/apps/ui/components`
- `.cache/upstream/coss/apps/www`

shadcn-svelte:

- `.cache/upstream/shadcn-svelte/docs/src/lib/registry/ui`
- `.cache/upstream/shadcn-svelte/docs/src/lib/registry/styles`
- `.cache/upstream/shadcn-svelte/docs/scripts`
- `.cache/upstream/shadcn-svelte/packages/cli`
- `.cache/upstream/shadcn-svelte/packages/registry`
- `.cache/upstream/shadcn-svelte/registry-template`

Bits UI:

- `.cache/upstream/bits-ui/docs/content/components`
- `.cache/upstream/bits-ui/packages/bits-ui/src/lib/bits`

## Usage Rule

Use tracked docs for planning and the ignored cache for source inspection. Do not copy upstream React component code into coss-svelte implementation files. Port behavior and visual contracts onto Svelte-native components.
