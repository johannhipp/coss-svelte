# apps/www

SvelteKit + Vite documentation site for coss-svelte.

It mirrors the role of `cosscom/coss` `apps/www`, while using SvelteKit routes and Svelte-native examples. The target visual direction is the COSS UI docs experience at `https://coss.com/ui/docs`: clean navigation, readable component docs, examples, and copy-and-own installation guidance.

## Commands

```sh
pnpm --filter @coss-svelte/www dev
pnpm --filter @coss-svelte/www check
pnpm --filter @coss-svelte/www build
```

Keep docs examples aligned with `packages/coss-svelte` exports and registry metadata.

## Deployment

The Vercel project builds from the monorepo root with `pnpm vercel:build`. Vercel builds select
`@sveltejs/adapter-vercel`; ordinary local builds keep `@sveltejs/adapter-node` so the production
server and browser smoke tests remain runnable with `pnpm --filter @coss-svelte/www start`.

The Vercel Git connection tracks `main`, so merged changes produce the production deployment and
other branches receive preview deployments.
