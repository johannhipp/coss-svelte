<script lang="ts">
import { Check, Info, Link2, Search, Tag, X } from "@lucide/svelte";
import { Button, Card, CardFooter, CardPanel } from "coss-svelte";
import { onDestroy } from "svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";
import type { LocalExample } from "$lib/docs/types.js";

let {
	particles,
}: {
	particles: LocalExample[];
} = $props();

let query = $state("");
let selectedParticleSlugs = $state(getSelectedParticleSlugsFromUrl());
let copiedParticle = $state("");
let copyResetTimer: ReturnType<typeof setTimeout> | undefined;

let normalizedQuery = $derived(query.trim().toLowerCase());
let selectedParticles = $derived(
	selectedParticleSlugs
		.map((slug) => particles.find((particle) => particle.slug === slug))
		.filter((particle): particle is LocalExample => Boolean(particle))
);
let hasActiveFilters = $derived(normalizedQuery.length > 0 || selectedParticleSlugs.length > 0);
let filteredParticles = $derived(
	hasActiveFilters
		? particles.filter((particle) => {
				const matchesSelectedComponents =
					selectedParticleSlugs.length === 0 || selectedParticleSlugs.includes(particle.slug);
				const matchesQuery =
					normalizedQuery.length === 0 ||
					[particle.title, particle.description, particle.name, particle.slug]
						.join(" ")
						.toLowerCase()
						.includes(normalizedQuery);

				return matchesSelectedComponents && matchesQuery;
			})
		: []
);

function toggleParticle(slug: string) {
	const nextSlugs = selectedParticleSlugs.includes(slug)
		? selectedParticleSlugs.filter((item) => item !== slug)
		: [...selectedParticleSlugs, slug];

	updateSelectedParticleSlugs(nextSlugs);
}

function clearFilters() {
	query = "";
	updateSelectedParticleSlugs([]);
}

async function copyRegistryUrl(particle: LocalExample) {
	try {
		await navigator.clipboard.writeText(particle.registryUrl);
		copiedParticle = particle.slug;
		clearTimeout(copyResetTimer);
		copyResetTimer = setTimeout(() => {
			copiedParticle = "";
		}, 2200);
	} catch {
		copiedParticle = "";
	}
}

function getSelectedParticleSlugsFromUrl() {
	return (page.url.searchParams.get("tags") ?? "")
		.split(",")
		.map((slug) => slug.trim())
		.filter((slug) => particles.some((particle) => particle.slug === slug));
}

function updateSelectedParticleSlugs(nextSlugs: string[]) {
	selectedParticleSlugs = nextSlugs;

	const nextUrl = new URL(page.url);

	if (nextSlugs.length) {
		nextUrl.searchParams.set("tags", nextSlugs.join(","));
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
	selectedParticleSlugs = getSelectedParticleSlugsFromUrl();
});

onDestroy(() => {
	clearTimeout(copyResetTimer);
});
</script>

<section class="mb-5 md:mb-6" aria-label="Filter particles">
	<div class="mx-auto max-w-2xl">
		<div class="rounded-xl border border-border bg-card p-1.5 shadow-sm">
			<div class="flex min-h-10 items-center gap-1.5 px-1.5">
				<Search class="size-4.5 shrink-0 text-muted-foreground" strokeWidth={2.25} />
				<div class="flex min-w-0 flex-1 flex-wrap items-center gap-1">
					{#each selectedParticles as particle}
						<button
							class="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-muted px-1.5 font-medium text-foreground text-xs"
							type="button"
							aria-label={`Remove ${particle.title} filter`}
							onclick={() => toggleParticle(particle.slug)}
						>
							<Tag class="size-3 shrink-0 text-muted-foreground" strokeWidth={2.25} />
							{particle.title}
							<X class="size-3" strokeWidth={2.25} />
						</button>
					{/each}
					<label class="sr-only" for="particle-search">Search particles</label>
					<input
						id="particle-search"
						class="min-h-7 min-w-28 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
						bind:value={query}
						placeholder={selectedParticleSlugs.length ? "" : "Search particles"}
						type="search"
					/>
					<details class="relative shrink-0">
						<summary
							class="flex size-7 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
							aria-label="Filter particles"
							title="Filter particles"
						>
							<Tag class="size-4" strokeWidth={2.25} />
						</summary>
						<div class="absolute top-full -right-[0.8125rem] z-20 mt-2 w-[min(42rem,calc(100vw-2rem))] rounded-xl border border-border bg-card p-3 shadow-lg">
							<div class="flex items-center justify-between gap-3 px-1 pb-2">
								<p class="font-medium text-muted-foreground text-sm">Filter particles</p>
								{#if selectedParticleSlugs.length || query}
									<button
										class="font-medium text-muted-foreground text-xs hover:text-foreground"
										type="button"
										onclick={clearFilters}
									>
										Clear
									</button>
								{/if}
							</div>
							<div class="grid max-h-[min(32rem,calc(100vh-8rem))] gap-0.5 overflow-y-auto">
								{#each particles as particle}
									<button
										class={[
											"flex min-h-9 w-full items-center gap-2 rounded-md px-2 text-left font-medium text-sm",
											selectedParticleSlugs.includes(particle.slug)
												? "bg-muted text-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground",
										]}
										type="button"
										aria-pressed={selectedParticleSlugs.includes(particle.slug)}
										onclick={() => toggleParticle(particle.slug)}
									>
										<Tag class="size-4 shrink-0" strokeWidth={2.25} />
										<span class="truncate">{particle.title}</span>
									</button>
								{/each}
							</div>
						</div>
					</details>
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
					<CardFooter class="flex min-h-12 items-center gap-3 border-border border-t bg-muted/35 p-2.5">
						<p class="flex min-w-0 flex-1 gap-1.5 truncate text-muted-foreground text-xs">
							<Info class="mt-0.5 size-3.5 shrink-0" strokeWidth={2.25} />
							<span class="truncate">{particle.description}</span>
						</p>
						<div class="flex shrink-0 items-center gap-1.5">
							<Button
								size="icon-sm"
								variant="outline"
								type="button"
								aria-label="Copy Registry URL"
								title="Copy Registry URL"
								aria-live="polite"
								onclick={() => copyRegistryUrl(particle)}
							>
								{#if copiedParticle === particle.slug}
									<Check size={15} strokeWidth={2.25} />
								{:else}
									<Link2 size={15} strokeWidth={2.25} />
								{/if}
							</Button>
							<Button size="sm" variant="outline" href={particle.href}>View code</Button>
						</div>
					</CardFooter>
				</Card>
				<h2 id={`${particle.slug}-particle-title`} class="sr-only">{particle.title} particle</h2>
			</article>
		{/each}
	</section>
{:else if hasActiveFilters}
	<div class="rounded-xl border border-border bg-card px-6 py-12 text-center">
		<p class="font-medium text-foreground">No particles found for the selected filters</p>
		<p class="mt-2 text-muted-foreground text-sm">Try another component or clear the search field.</p>
	</div>
{/if}
