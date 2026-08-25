<script>
import ContentPage from "$lib/components/docs/content-page.svelte";

const toc = [
	{ href: "#why", title: "Why?" },
	{ href: "#built-on-bits-ui", title: "Built on Bits UI" },
	{ href: "#primitives-and-particles", title: "Primitives and Particles" },
];
</script>

{#snippet introDescription()}
	coss-svelte is a Svelte 5-native component library inspired by coss. Built for SvelteKit apps
	and built on top of Bits UI.
{/snippet}

<svelte:head>
	<title>Introduction - coss-svelte</title>
	<meta
		name="description"
		content="A SvelteKit-native component library inspired by the COSS component language."
	/>
</svelte:head>

<ContentPage
	title="Introduction"
	description="coss-svelte is a Svelte 5-native component library inspired by coss. Built for SvelteKit apps and built on top of Bits UI."
	descriptionContent={introDescription}
	{toc}
>
	<div class="docs-intro-flow">
		<div class="docs-intro-note">
			<p class="font-medium text-foreground">Preview</p>
			<p>
				All coss-svelte components are ready to use, though some may still be rough around the
				edges. If you encounter an issue, please
				<a
					class="font-medium text-foreground underline underline-offset-4"
					href="https://github.com/johannhipp/coss-svelte/issues"
				>
					report it on GitHub
				</a> :)
			</p>
		</div>

		<section id="why" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">Why?</h2>
			<p class="text-muted-foreground leading-7">
				Svelte 5 is highly performant, and I want to see it used more. But polished Svelte component
				libraries are scarce because React and Next.js patterns do not translate cleanly.
				coss-svelte aims to fill that gap on Svelte's own terms.
			</p>
		</section>

		<section id="built-on-bits-ui" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">Built on Bits UI, Designed for Svelte</h2>
			<p class="text-muted-foreground leading-7">
				coss builds its React primitives on Base UI. coss-svelte brings the same component language
				and compact visual shell to native Svelte, using Bits UI for accessible behavior, keyboard
				interactions, and focus management.
			</p>
		</section>

		<section id="primitives-and-particles" class="grid scroll-mt-20 gap-4">
			<h2 class="font-semibold text-2xl">Primitives and Particles</h2>
			<p class="text-muted-foreground leading-7">
				Primitives are composable Svelte building blocks such as buttons, fields, menus, and
				overlays. Particles combine them into practical examples. Browse Particles for context;
				open a component page for its source, metadata, and implementation notes.
			</p>
		</section>
	</div>
</ContentPage>
