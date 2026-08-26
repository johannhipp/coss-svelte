# coss-svelte 0.1.0 Release Record

Status: released on 2026-08-26

## Public contract

- `coss-svelte@0.1.0` and `@coss-svelte/theme@0.1.0` were released together.
- The verified consumer path is Svelte 5 with SvelteKit/Vite, Bits UI, and Tailwind CSS 4.
- The canonical install command is `pnpm add coss-svelte @coss-svelte/theme bits-ui`.
- The package contains 52 stable component roots. Drawer, Sidebar, and Toast are exported as experimental components with documented limitations.
- The copy-and-own registry is a preview and may evolve between minor releases.

## Source and delivery

- Verified `main` commit: `eab034754702ecfb964cc17fd089c715eb056e3d`.
- Release pull request: <https://github.com/johannhipp/coss-svelte/pull/20>.
- Tag and GitHub Release: <https://github.com/johannhipp/coss-svelte/releases/tag/v0.1.0>.
- Public repository: <https://github.com/johannhipp/coss-svelte>.
- Production docs: <https://coss-svelte.vercel.app>, deployed by Vercel project `t3nseds-projects/coss-svelte`. The `0.1.0` application build was verified from the release commit before this record-only update.
- Published packages: <https://www.npmjs.com/package/coss-svelte> and <https://www.npmjs.com/package/@coss-svelte/theme>.
- Skills update: <https://github.com/johannhipp/skills/pull/5>, merged as `a9eea876f3c1cda30f3377496fed6af1024dba9a`.

## Published artifacts

| Package | npm SHA-1 | Verified local SHA-256 |
| --- | --- | --- |
| `@coss-svelte/theme@0.1.0` | `af9abb0ef849a0920fab1a7c34ca98c46e68bc65` | `84dde52a7f30b42047d59533fe86b5873103d08f2c7ea863e46d369b98e6a754` |
| `coss-svelte@0.1.0` | `26592e6b82304f8fb3af75d7e616225b9cd0a39e` | `20a8d70d261200de5ae46c0e0cdf3b5ffec839fb7b029b1432ab3809b72fe96d` |

## Verification completed

- `pnpm install --frozen-lockfile` and `pnpm release:check` passed on the exact release commit locally and in CI.
- Both exact tarballs passed file-list inspection and a clean SvelteKit consumer build before publication.
- A second clean SvelteKit consumer passed using the published npm packages.
- The hosted Button, Number Field, and Context Menu registry manifests matched the tagged generated files byte-for-byte.
- The production docs, component Markdown, registry, schema, and `llms.txt` routes responded successfully.
- Vercel CLI confirmed the release deployment was Ready and built from commit `eab0347` in the `t3nsed` personal workspace before this record-only update.
- skills.sh served the updated coss-svelte skill, and a clean noninteractive Codex installation contained the public package and registry guidance.

No favicon, separate announcement campaign, automated npm publication, or broader production hardening was added for this lightweight release.
