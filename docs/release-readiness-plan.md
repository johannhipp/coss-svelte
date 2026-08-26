# First Public Release Checklist

Status: remaining work only; no publishing action is authorized by this checklist

Target: first public `coss-svelte` release, recommended as `0.1.0`

Last reconciled: 2026-08-26.

## Release boundary

This is a lightweight checklist for a small open-source release. Every checkbox is still actionable. Completed deployment, CI, registry, consumer-fixture, component-test, and skills.sh work has been removed.

The first release should provide installable packages, clear documentation, a publicly reachable repository, and a repeatable manual release path. It does not need production operations, broad compatibility certification, or full upstream parity.

Do not make the repository public, create a tag or GitHub Release, or publish either npm package until the applicable step below is reached.

## 1. Confirm what is being released

- [ ] Approve the initial version and package names. **Recommendation:** release `coss-svelte@0.1.0` and `@coss-svelte/theme@0.1.0` from the same commit and keep their versions synchronized initially.
- [ ] State the basic compatibility contract. **Recommendation:** document Node 22+ and pnpm 11 for repository development, Svelte 5 and the declared Bits UI peer range for consumers, Tailwind CSS 4 for the supplied theme, and SvelteKit/Vite as the verified application path.
- [ ] Decide how to describe the registry. **Recommendation:** call it a preview in `0.1.0`; the documented installation path works, but copied source and schemas may change between minor releases.
- [ ] Confirm component status wording. **Recommendation:** describe the 52 stable roots normally and label Drawer, Sidebar, and Toast as experimental in component docs and release notes.

## 2. Confirm npm access

- [ ] Authenticate the release machine with npm and confirm the maintainer account.
- [ ] Confirm that the unscoped `coss-svelte` name can be published. **Recommendation:** do this before changing versions or finalizing public installation instructions.
- [ ] Create or claim the `@coss-svelte` scope and verify permission to publish `@coss-svelte/theme`. **Recommendation:** resolve this first because the theme must be available before the component package.

## 3. Finish the package contract

- [ ] Review the published dependencies. **Recommendation:** keep `svelte` and `bits-ui` as peer dependencies and remove any package that is not used by shipped runtime code.
- [ ] Verify the theme in a representative consumer build. **Recommendation:** import Tailwind first and `@coss-svelte/theme/style-coss.css` second, then confirm representative components receive the expected styles in a production build.
- [ ] Add both packages to the tarball check. **Recommendation:** make the root dry run inspect `@coss-svelte/theme` as well as `coss-svelte` and fail if either contains unintended files.
- [ ] Update the release instructions for both packages. **Recommendation:** document manual theme-first publication and publish the exact tarballs that were inspected.
- [ ] Verify a clean consumer installation. **Recommendation:** install both local tarballs into a fresh SvelteKit project, run Svelte checking, and build it once before the release.

## 4. Finish the public documentation

- [ ] Align all installation commands. **Recommendation:** use one canonical command and theme import across the root README, package README, Getting Started, component pages, registry docs, and the external skill.
- [ ] Document the registry workflow. **Recommendation:** provide one short example covering item download, files, dependencies, theme import, and ownership of copied code.
- [ ] Replace implementation-plan text for experimental components. **Recommendation:** give Drawer, Sidebar, and Toast short, user-facing status notes.
- [ ] Add basic site identity. **Recommendation:** add a default page description and consistent project title; no favicon is required for `0.1.0`.
- [ ] Do a final documentation pass. **Recommendation:** check the main navigation, installation instructions, component links, Markdown routes, registry URLs, and schema URLs against the built site.
- [ ] Bring public project files up to date. **Recommendation:** review `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, and `docs/release.md` so they describe the actual first release.

## 5. Prepare the release candidate

- [ ] Freeze package, component, theme, registry, and documentation changes. **Recommendation:** allow only release-blocking fixes after this point and rerun the affected checks after any change.
- [ ] Create one release change for both packages. **Recommendation:** set both manifests to the approved version, replace `Unreleased` with dated release notes, and update all public availability wording together.
- [ ] Verify the exact release commit from a fresh checkout. **Recommendation:** run `pnpm install --frozen-lockfile` and `pnpm release:check`.
- [ ] Inspect the exact tarballs. **Recommendation:** confirm both names, versions, exports, peer dependencies, README files, licenses, and file lists before publication.
- [ ] Repeat the clean consumer installation with those exact tarballs. **Recommendation:** do not rebuild different artifacts between this check and npm publication.

## 6. Make the repository public

- [ ] Make `johannhipp/coss-svelte` public after the release candidate passes. **Recommendation:** verify the README, license, issues, source links, and package metadata are accessible without authentication.
- [ ] Verify the public docs deployment. **Recommendation:** confirm the existing `t3nsed` Vercel project is Ready, serves the release commit, and exposes the documented registry, schema, Markdown, and `llms.txt` routes.

## 7. Tag and publish

- [ ] Create and push `v0.1.0` on the verified release commit.
- [ ] Publish `@coss-svelte/theme` manually from the inspected tarball.
- [ ] Confirm the published theme metadata and CSS exports.
- [ ] Publish `coss-svelte` manually from the inspected tarball.
- [ ] Confirm the published package metadata, peer dependencies, README, and repository links.
- [ ] Install both packages from npm in a fresh SvelteKit project and repeat the documented theme and representative registry path.
- [ ] Publish the GitHub Release from the existing tag. **Recommendation:** include installation instructions, the theme requirement, registry preview status, and experimental component status.

## 8. Synchronize

- [ ] Verify GitHub, npm, Vercel, docs, registry URLs, schemas, and `llms.txt` all describe the same version.
- [ ] Update the separate public `johannhipp/skills` repository. **Recommendation:** replace its unpublished and `0.0.0` wording with the verified npm release, then confirm the skills.sh page and install command still work.

## Not required for `0.1.0`

- Full CLI implementation or automated npm publishing.
- Stable parity for Drawer, Sidebar, and Toast.
- Complete particle/example parity and additional presets.
- Form-library adapters.
- Pixel-perfect parity with upstream React components.
- Full support guarantees for bundlers outside SvelteKit/Vite.

Before changing publish-facing files, inspect [`docs/release.md`](release.md), [`CHANGELOG.md`](../CHANGELOG.md), both public package manifests, and [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).
