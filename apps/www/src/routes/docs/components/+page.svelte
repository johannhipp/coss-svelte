<script lang="ts">
import ContentPage from "$lib/components/docs/content-page.svelte";
import { componentDocs } from "$lib/docs/navigation.js";

const categories = [...new Set(componentDocs.map((component) => component.category))];
const componentGroups = categories.map((category) => ({
	category,
	components: componentDocs.filter((component) => component.category === category),
}));
</script>

<svelte:head>
	<title>Components - coss-svelte</title>
	<meta
		name="description"
		content="Browse every production-ready coss-svelte component, its preview, Svelte source, API, and registry entry."
	/>
</svelte:head>

<ContentPage
	title="Components"
	description="Browse the complete Svelte component catalog. Every entry includes a live preview, exact example source, API anatomy, and installable registry output."
>
	<div class="grid gap-10">
		{#each componentGroups as group (group.category)}
			<section class="grid gap-4">
				<div class="flex items-baseline justify-between gap-4 border-b pb-3">
					<h2 class="font-heading font-semibold text-xl">{group.category}</h2>
					<span class="text-muted-foreground text-xs">{group.components.length} components</span>
				</div>

				<div class="grid gap-3 sm:grid-cols-2">
					{#each group.components as component (component.slug)}
						<a
							class="group grid min-h-28 content-between gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
							href={component.href}
						>
							<div class="grid gap-1.5">
								<div class="flex items-center justify-between gap-3">
									<h3 class="font-medium">{component.title}</h3>
									{#if component.status !== "stable"}
										<span class="rounded-full border px-2 py-0.5 text-muted-foreground text-[0.6875rem]">
											{component.statusLabel}
										</span>
									{/if}
								</div>
								<p class="line-clamp-2 text-muted-foreground text-sm leading-5">
									{component.description}
								</p>
							</div>
							<span class="text-muted-foreground text-xs group-hover:text-foreground">
								{component.parts.length + 1} public export{component.parts.length === 0 ? "" : "s"} →
							</span>
						</a>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</ContentPage>
