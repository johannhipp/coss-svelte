<script lang="ts">
import { Check, Info, Link2, Search, Tag, X } from "@lucide/svelte";
import {
	Button,
	Card,
	CardFooter,
	CardPanel,
	Combobox,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxPopup,
} from "coss-svelte";
import { onDestroy, tick } from "svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";
import type { LocalExample } from "$lib/docs/types.js";

let {
	particles,
}: {
	particles: LocalExample[];
} = $props();

const particleFilterPopupId = "particle-filter-popup";

let query = $state("");
let selectedParticleSlugs = $state(getSelectedParticleSlugsFromUrl());
let filterOpen = $state(false);
let searchInput = $state<HTMLInputElement | null>(null);
let copiedParticle = $state("");
let copyResetTimer: ReturnType<typeof setTimeout> | undefined;

let normalizedQuery = $derived(query.trim().toLowerCase());
let particleOptions = $derived(
	particles.map((particle) => ({
		label: particle.title,
		value: particle.slug,
	}))
);
let matchingParticleOptions = $derived(
	normalizedQuery.length === 0
		? particleOptions
		: particleOptions.filter((option) =>
				`${option.label} ${option.value}`.toLowerCase().includes(normalizedQuery)
			)
);
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

function handleSelectedParticleSlugsChange(nextSlugs: string[]) {
	query = "";
	updateSelectedParticleSlugs(nextSlugs);
	filterOpen = true;

	void tick().then(() => {
		if (!searchInput || searchInput.value.length === 0) return;
		searchInput.value = "";
		searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
	});
}

function handleSearchInput(event: Event) {
	if (!(event.currentTarget instanceof HTMLInputElement)) return;
	query = event.currentTarget.value;
	filterOpen = true;
}

function handleSearchKeydown(event: KeyboardEvent) {
	if (
		(event.key === "Backspace" || event.key === "Delete") &&
		query.length === 0 &&
		selectedParticleSlugs.length > 0
	) {
		event.preventDefault();
		updateSelectedParticleSlugs(selectedParticleSlugs.slice(0, -1));
	}
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
		<Combobox
			type="multiple"
			items={matchingParticleOptions}
			inputValue={query}
			value={selectedParticleSlugs}
			bind:open={filterOpen}
			class="!w-full"
			onValueChange={handleSelectedParticleSlugsChange}
		>
			<div class="flex min-h-13 items-center gap-1.5 rounded-xl border border-border bg-card p-1.5 px-3 shadow-sm">
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
					<ComboboxInput
						bind:ref={searchInput}
						id="particle-search"
						class="!min-h-7 !h-7 !min-w-28 !flex-1 !border-0 !bg-transparent !px-1 !text-sm !shadow-none !outline-none placeholder:text-muted-foreground"
						type="search"
						showTrigger={false}
						aria-label="Search particles"
						aria-controls={particleFilterPopupId}
						aria-haspopup="listbox"
						onfocus={() => {
							filterOpen = true;
						}}
						oninput={handleSearchInput}
						onkeydown={handleSearchKeydown}
					/>
				</div>
			</div>
			<ComboboxPopup
				id={particleFilterPopupId}
				data-particle-filter-popup
				aria-label="Particle filters"
				align="end"
				sideOffset={8}
				class="!max-h-[min(32rem,calc(100vh-8rem))] !w-[min(42rem,calc(100vw-2rem))] !min-w-0 !rounded-xl !p-3"
			>
				<ComboboxEmpty
					role="option"
					aria-disabled="true"
					class="px-2 py-6 text-center text-muted-foreground text-sm"
				>
					No filters found.
				</ComboboxEmpty>
				<ComboboxList>
					<ComboboxGroup>
						<ComboboxGroupLabel>Filter particles</ComboboxGroupLabel>
						{#each matchingParticleOptions as option, index}
							<ComboboxItem
								value={option.value}
								label={option.label}
								tabindex={index === 0 ? 0 : -1}
								class="min-h-9 font-medium"
							>
								<Tag class="size-4 shrink-0" strokeWidth={2.25} />
								<span class="truncate">{option.label}</span>
							</ComboboxItem>
						{/each}
					</ComboboxGroup>
				</ComboboxList>
			</ComboboxPopup>
		</Combobox>
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
