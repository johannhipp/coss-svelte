<script>
import ContentPage from "$lib/components/docs/content-page.svelte";

const toc = [
	{ href: "#how-it-works", title: "How It Works" },
	{ href: "#built-on-bits-ui", title: "Built on Bits UI" },
	{ href: "#primitives-and-particles", title: "Primitives and Particles" },
];
</script>

<svelte:head>
	<title>Introduction - coss-svelte</title>
	<meta
		name="description"
		content="A SvelteKit-native component library inspired by the COSS component language."
	/>
</svelte:head>

<ContentPage
	title="Introduction"
	description="A Svelte-native component library inspired by coss ui. Built for SvelteKit apps, local previews, and components you can understand and own."
	{toc}
>
	<div class="docs-intro-flow">
		<div class="docs-intro-note">
			<p class="font-medium text-foreground">Early Access</p>
			<p>
				All coss-svelte components are ready to use, though some may still be rough around the
				edges. If you encounter an issue, please
				<a
					class="font-medium text-foreground underline underline-offset-4"
					href="https://github.com/johannhipp/coss-svelte/issues"
				>
					report it on GitHub
				</a>.
			</p>
		</div>

		<section id="how-it-works" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">How It Works</h2>
			<p class="text-muted-foreground leading-7">
				The local coss-svelte docs are scoped to Svelte components in this repo. Sidebar links
				open local SvelteKit routes, and every component page renders a local preview instead of
				sending you back to the COSS React docs.
			</p>
			<p class="text-muted-foreground leading-7">
				The point is still to copy, paste, and own the implementation details: examples stay
				readable, source files stay close to the docs, and the registry output remains small
				enough to adapt inside real applications.
			</p>
		</section>

		<section id="built-on-bits-ui" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">Built on Bits UI, Designed for Svelte</h2>
			<p class="text-muted-foreground leading-7">
				COSS uses Base UI for its React primitives. coss-svelte maps that component language onto
				Bits UI and Svelte-native components, keeping the accessible behavior, keyboard patterns,
				and focus management close to the underlying Svelte ecosystem.
			</p>
			<p class="text-muted-foreground leading-7">
				The visual shell follows COSS: compact navigation, neutral surfaces, focused previews, and
				a right-side table of contents on wider screens. The wording here stays local to what this
				repository actually ships today.
			</p>
		</section>

		<section id="primitives-and-particles" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">Primitives and Particles</h2>
			<p class="text-muted-foreground leading-7">
				Primitives are the foundation: buttons, fields, overlays, menus, and other accessible
				building blocks. They expose Svelte component parts that are intended to be composed,
				styled, and inspected directly.
			</p>
			<p class="text-muted-foreground leading-7">
				Particles are local examples assembled from those primitives. Use the Particles page to
				review each component in context, then open the component docs when you want source,
				metadata, and implementation notes.
			</p>
		</section>
	</div>
</ContentPage>
