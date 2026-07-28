# Source Audit

Generated: 2026-06-09

## Sources

- Installed `coss` skill: `/Users/johann/.agents/skills/coss`
- Installed `coss-particles` skill: `/Users/johann/.agents/skills/coss-particles/SKILL.md`
- Live docs map: [https://coss.com/ui/llms.txt](https://coss.com/ui/llms.txt)
- Live supplemental docs fetched for additions: [Date Picker](https://coss.com/ui/docs/components/date-picker.md), [useMediaQuery](https://coss.com/ui/docs/hooks/use-media-query.md), [useCopyToClipboard](https://coss.com/ui/docs/hooks/use-copy-to-clipboard.md)

## Counts

- Local registry components with primitive references: 54
- Live `llms.txt` components: 55
- Live `llms.txt` hooks: 2
- Particle component types: 53
- Particle examples: 492
- Union component scope in these files: 55

## Cross-check Results

- In live `llms.txt` but not in the installed local primitive references: `date-picker`
- In local primitive references but not in live `llms.txt`: none
- Particle categories without a local primitive reference: `date-picker`
- Components with no particles in the installed particle skill: `label`, `sidebar`

## Interpretation

The live docs map expands the local skill scope with `Date Picker`, which is documented as a composition pattern using Calendar, Popover, and Button rather than as a standalone primitive file. The live docs map also lists two hooks. The installed particle skill already includes Date Picker examples, so this generated inventory treats Date Picker as a first-class component scope entry while marking its source as live docs plus particles.
