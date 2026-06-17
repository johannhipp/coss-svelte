<script>
import ContentPage from "$lib/components/docs/content-page.svelte";

const toc = [
	{ href: "#what-this-site-covers", title: "What this site covers" },
	{ href: "#design-target", title: "Design target" },
];
</script>

<svelte:head>
	<title>Introduction - coss-svelte</title>
	<meta
		name="description"
		content="A SvelteKit-native implementation map for the COSS component surface."
	/>
</svelte:head>

<ContentPage
	title="Introduction"
	description="coss-svelte mirrors the clean COSS component language in a SvelteKit-native package."
	{toc}
>
	<section id="what-this-site-covers" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">What this site covers</h2>
		<p class="text-muted-foreground leading-7">
			The docs are scoped to local coss-svelte components. Sidebar links open local SvelteKit
			routes, and every component page renders a local preview instead of sending you back to the
			COSS React docs.
		</p>
	</section>

	<section id="design-target" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Design target</h2>
		<p class="text-muted-foreground leading-7">
			The information architecture follows Bits UI: one route per component, generated sidebar
			navigation, and focused previews. The visual shell follows COSS: compact header, framed page
			surface, neutral preview cards, and a right-side table of contents on wide screens.
		</p>
	</section>
</ContentPage>
