<script lang="ts">
import { Info, Search, X } from "@lucide/svelte";
import { Badge, Button, Card, CardFooter, CardPanel } from "coss-svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";

type Particle = {
	category: string;
	description: string;
	href: string;
	name: string;
	slug: string;
	status: string;
	statusLabel: string;
	title: string;
};

let {
	categories,
	particles,
}: {
	categories: string[];
	particles: Particle[];
} = $props();

let query = $state("");
let selectedCategories = $state(getSelectedCategoriesFromUrl());

let normalizedQuery = $derived(query.trim().toLowerCase());
let filteredParticles = $derived(
	particles.filter((particle) => {
		const matchesCategory =
			selectedCategories.length === 0 || selectedCategories.includes(particle.category);
		const matchesQuery =
			normalizedQuery.length === 0 ||
			[particle.title, particle.description, particle.category, particle.name]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery);

		return matchesCategory && matchesQuery;
	})
);

function toggleCategory(category: string) {
	const nextCategories = selectedCategories.includes(category)
		? selectedCategories.filter((item) => item !== category)
		: [...selectedCategories, category];

	updateSelectedCategories(nextCategories);
}

function clearFilters() {
	query = "";
	updateSelectedCategories([]);
}

function getSelectedCategoriesFromUrl() {
	return (page.url.searchParams.get("tags") ?? "")
		.split(",")
		.map((category) => category.trim())
		.filter((category) => categories.includes(category));
}

function updateSelectedCategories(nextCategories: string[]) {
	selectedCategories = nextCategories;

	const nextUrl = new URL(page.url);

	if (nextCategories.length) {
		nextUrl.searchParams.set("tags", nextCategories.join(","));
	} else {
		nextUrl.searchParams.delete("tags");
	}

	void goto(`${nextUrl.pathname}${nextUrl.search}`, {
		keepFocus: true,
		noScroll: true,
		replaceState: false,
	});
}

$effect(() => {
	selectedCategories = getSelectedCategoriesFromUrl();
});
</script>

<section class="mb-6 md:mb-8" aria-label="Filter particles">
	<div class="mx-auto max-w-2xl">
		<div class="rounded-xl border border-border bg-card p-2 shadow-sm">
			<div class="flex min-h-11 items-center gap-2 px-2">
				<Search class="size-5 shrink-0 text-muted-foreground" strokeWidth={2.25} />
				<div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
					{#each selectedCategories as category}
						<button
							class="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-muted px-2 font-medium text-foreground text-xs"
							type="button"
							aria-label={`Remove ${category} filter`}
							onclick={() => toggleCategory(category)}
						>
							{category}
							<X class="size-3.5" strokeWidth={2.25} />
						</button>
					{/each}
					<label class="sr-only" for="particle-search">Search particles</label>
					<input
						id="particle-search"
						class="min-h-8 min-w-36 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
						bind:value={query}
						placeholder={selectedCategories.length ? "Search selected particles" : "Search particles"}
						type="search"
					/>
				</div>
			</div>
			<div class="mt-2 border-border border-t pt-2">
				<div class="flex items-center justify-between gap-3 px-2 pb-2">
					<p class="font-medium text-muted-foreground text-xs">Filter particles</p>
					{#if selectedCategories.length || query}
						<button
							class="font-medium text-muted-foreground text-xs hover:text-foreground"
							type="button"
							onclick={clearFilters}
						>
							Clear
						</button>
					{/if}
				</div>
				<div class="flex flex-wrap gap-1.5">
					<button
						class={[
							"h-8 rounded-md px-2.5 font-medium text-sm",
							selectedCategories.length === 0 ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted",
						]}
						type="button"
						aria-pressed={selectedCategories.length === 0}
						onclick={() => updateSelectedCategories([])}
					>
						All
					</button>
					{#each categories as category}
						<button
							class={[
								"h-8 rounded-md px-2.5 font-medium text-sm",
								selectedCategories.includes(category)
									? "bg-muted text-foreground"
									: "text-muted-foreground hover:bg-muted",
							]}
							type="button"
							aria-pressed={selectedCategories.includes(category)}
							onclick={() => toggleCategory(category)}
						>
							{category}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

{#if filteredParticles.length}
	<section
		class="grid flex-1 items-stretch gap-9 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-9"
		aria-label="Local particles"
	>
		{#each filteredParticles as particle}
			<article class="relative flex min-w-0" aria-labelledby={`${particle.slug}-particle-title`}>
				<Card class="w-full after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/60">
					<CardPanel class="flex min-h-44 flex-1 items-center justify-center overflow-x-auto bg-background p-5 lg:px-8 lg:py-10">
						<ComponentPreviewRenderer slug={particle.slug} />
					</CardPanel>
					<CardFooter class="flex items-center gap-3 p-2">
						<p class="flex min-w-0 flex-1 gap-1.5 truncate text-muted-foreground text-xs">
							<Info class="mt-0.5 size-3.5 shrink-0" strokeWidth={2.25} />
							<span class="truncate">{particle.description}</span>
						</p>
						<div class="flex shrink-0 items-center gap-1.5">
							{#if particle.status !== "stable"}
								<Badge variant={particle.status === "experimental" ? "accent" : "secondary"}>
									{particle.statusLabel}
								</Badge>
							{/if}
							<Button size="sm" variant="outline" type="button">{particle.name}</Button>
							<Button size="sm" variant="outline" href={particle.href}>View docs</Button>
						</div>
					</CardFooter>
				</Card>
				<h2 id={`${particle.slug}-particle-title`} class="sr-only">{particle.title} particle</h2>
			</article>
		{/each}
	</section>
{:else}
	<div class="rounded-xl border border-border bg-card px-6 py-12 text-center">
		<p class="font-medium text-foreground">No particles found for the selected filters</p>
		<p class="mt-2 text-muted-foreground text-sm">Try another category or clear the search field.</p>
	</div>
{/if}
