<script>
import ContentPage from "$lib/components/docs/content-page.svelte";
import { componentDocs } from "$lib/docs/navigation.js";

const toc = [{ href: "#component-routes", title: "Component routes" }];
</script>

<svelte:head>
	<title>LLMs - coss-svelte</title>
</svelte:head>

<ContentPage
	title="LLMs"
	description="A compact local map of the coss-svelte component surface for agents and implementation work."
	{toc}
>
	<section id="component-routes" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Component routes</h2>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each componentDocs as component}
				<a
					class="rounded-lg border border-border p-3 no-underline hover:bg-muted/50"
					href={component.href}
				>
					<span class="block font-medium">{component.title}</span>
					<span class="block text-muted-foreground text-sm">{component.statusLabel}</span>
				</a>
			{/each}
		</div>
	</section>
</ContentPage>
