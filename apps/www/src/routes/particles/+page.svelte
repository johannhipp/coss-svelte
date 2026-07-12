<script lang="ts">
import DocsHeader from "$lib/components/docs/docs-header.svelte";
import DocsMobileMenu from "$lib/components/docs/docs-mobile-menu.svelte";
import ParticlesBrowser from "$lib/components/docs/particles-browser.svelte";

type Particle = {
	description: string;
	href: string;
	name: string;
	registryUrl: string;
	slug: string;
	title: string;
};

let {
	data,
}: {
	data: {
		particleCount: number;
		particles: Particle[];
	};
} = $props();

let mobileNavOpen = $state(false);

let description = $derived(
	`Discover ${data.particleCount} ready-to-use particles, the building blocks of your design system. Filter by component to find the perfect example for your project.`
);
</script>

<svelte:head>
	<title>Browse Particles - coss-svelte ui</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="min-h-svh bg-muted/30 text-foreground">
	<DocsHeader onMenu={() => (mobileNavOpen = true)} />
	<DocsMobileMenu bind:open={mobileNavOpen} />
	<main class="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-10 lg:py-10">
		<header class="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
			<h1 class="font-heading font-semibold text-3xl tracking-normal sm:text-4xl">Browse Particles</h1>
			<p class="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg leading-7">{description}</p>
		</header>

		<ParticlesBrowser particles={data.particles} />
	</main>
</div>
