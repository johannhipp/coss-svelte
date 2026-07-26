<script lang="ts">
import { ArrowLeft, Atom, BookOpen, Search } from "@lucide/svelte";
import {
	Command,
	CommandCollection,
	CommandDialog,
	CommandDialogPopup,
	CommandDialogTrigger,
	CommandEmpty,
	CommandFooter,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandList,
	CommandPanel,
	CommandShortcut,
} from "coss-svelte";
import { onMount, tick } from "svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { componentDocs, searchGroups as docsSearchGroups } from "$lib/docs/navigation.js";

type SearchItem = {
	description?: string;
	group: string;
	href: string;
	index: number;
	isComponent: boolean;
	keywords: string[];
	title: string;
	value: string;
};

type SearchGroup = {
	items: SearchItem[];
	limit: number;
	title: string;
};

type SearchPage = {
	description?: string;
	group: string;
	href: string;
	slug?: string;
	title: string;
};

const searchGroups: SearchGroup[] = [
	...docsSearchGroups.map((group) => ({
		items: group.items.map((item, index) => createSearchItem(item, index)),
		limit: group.title === "Components" ? componentDocs.length : 12,
		title: group.title,
	})),
].sort((a, b) => getSearchGroupPriority(a.title) - getSearchGroupPriority(b.title));

let open = $state(false);
let searchValue = $state("");
let canScrollUp = $state(false);
let canScrollDown = $state(true);

let normalizedQuery = $derived(searchValue.trim().toLowerCase());
let filteredGroups = $derived(
	searchGroups
		.map((group) => ({
			...group,
			items: group.items
				.map((item) => ({ item, score: getSearchScore(item, normalizedQuery) }))
				.filter((result) => result.score > 0)
				.sort((a, b) =>
					normalizedQuery
						? b.score - a.score || a.item.title.localeCompare(b.item.title)
						: a.item.index - b.item.index
				)
				.map((result) => result.item)
				.slice(0, normalizedQuery ? Math.max(24, group.limit) : group.limit),
		}))
		.filter((group) => group.items.length > 0)
);
let resultCount = $derived(filteredGroups.reduce((total, group) => total + group.items.length, 0));

function getSearchGroupPriority(title: string) {
	if (title === "Pages") {
		return 0;
	}

	if (title === "Components") {
		return 1;
	}

	if (title === "Overview") {
		return 2;
	}

	return 3;
}

function createSearchItem(page: SearchPage, index: number): SearchItem {
	const description = page.description ?? "";
	const href = page.href ?? (page.slug ? `/docs/components/${page.slug}` : "/docs/introduction");
	const value = `${page.group} ${page.title} ${description} ${href}`;

	return {
		description,
		group: page.group,
		href,
		index,
		isComponent: page.group === "Components",
		keywords: [page.title, description, page.group, href].filter(Boolean),
		title: page.title,
		value,
	};
}

function getSearchScore(item: SearchItem, query: string) {
	if (!query) {
		if (item.group === "Pages") {
			return 100;
		}

		if (item.group === "Overview") {
			return 80;
		}

		if (item.group === "Components") {
			return 60;
		}

		return 40;
	}

	const terms = query.split(/\s+/).filter(Boolean);
	const title = item.title.toLowerCase();
	const href = item.href.toLowerCase();
	const haystack = [item.title, item.description, item.group, item.href]
		.filter(Boolean)
		.join(" ")
		.toLowerCase();

	if (!terms.every((term) => haystack.includes(term))) {
		return 0;
	}

	let score = 10;

	if (title === query) {
		score += 80;
	} else if (title.startsWith(query)) {
		score += 50;
	} else if (title.includes(query)) {
		score += 30;
	}

	if (href.includes(query.replaceAll(" ", "-"))) {
		score += 20;
	}

	if (item.group === "Components") {
		score += 5;
	}

	return score;
}

function isEditableTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	const tagName = target.tagName.toLowerCase();

	return (
		tagName === "input" ||
		tagName === "textarea" ||
		tagName === "select" ||
		target.isContentEditable
	);
}

function handleGlobalKeydown(event: KeyboardEvent) {
	if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
		event.preventDefault();
		open = !open;
		return;
	}

	if (event.key === "/" && !open && !isEditableTarget(event.target)) {
		event.preventDefault();
		open = true;
	}
}

async function selectItem(href: string) {
	open = false;
	searchValue = "";

	if (page.url.pathname !== href) {
		await goto(href);
	}
}

function handleItemClick(event: MouseEvent, href: string) {
	event.preventDefault();
	void selectItem(href);
}

function updateScrollFade(panel: HTMLElement) {
	const edgeTolerance = 1;
	canScrollUp = panel.scrollTop > edgeTolerance;
	canScrollDown = panel.scrollTop + panel.clientHeight < panel.scrollHeight - edgeTolerance;
}

function handlePanelScroll(event: Event) {
	updateScrollFade(event.currentTarget as HTMLElement);
}

onMount(() => {
	document.addEventListener("keydown", handleGlobalKeydown);

	return () => {
		document.removeEventListener("keydown", handleGlobalKeydown);
	};
});

$effect(() => {
	if (open && resultCount >= 0) {
		tick().then(() => {
			document.getElementById("docs-search-input")?.focus();
			const panel = document.querySelector<HTMLElement>(".docs-search-panel");

			if (panel) {
				updateScrollFade(panel);
			}
		});
	} else {
		searchValue = "";
		canScrollUp = false;
		canScrollDown = true;
	}
});
</script>

<CommandDialog bind:open>
	<CommandDialogTrigger
		class="hidden h-8 items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-muted-foreground text-sm shadow-sm hover:bg-muted hover:text-foreground sm:inline-flex"
		type="button"
		aria-label="Search docs"
	>
		<Search size={14} strokeWidth={2.25} />
		<span class="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] leading-none">
			⌘ K
		</span>
	</CommandDialogTrigger>
	<CommandDialogPopup class="docs-search-dialog">
		<Command label="Search documentation" shouldFilter={false} class="docs-search-command">
			<div class="docs-search-input-row">
				<CommandInput
					id="docs-search-input"
					bind:value={searchValue}
					placeholder="Search documentation..."
					class="docs-search-input"
				/>
			</div>
			<CommandList class="docs-search-list">
				<CommandPanel
					class={`docs-search-panel${canScrollUp ? " can-scroll-up" : ""}${canScrollDown ? " can-scroll-down" : ""}`}
					onscroll={handlePanelScroll}
				>
					{#if resultCount === 0}
						<CommandEmpty forceMount class="docs-search-empty">No results found.</CommandEmpty>
					{:else}
						{#each filteredGroups as group}
							<CommandGroup forceMount class="docs-search-group">
								<CommandGroupLabel class="docs-search-group-label">{group.title}</CommandGroupLabel>
								<CommandCollection>
									{#each group.items as item}
										<CommandItem
											forceMount
											class="docs-search-item"
											value={item.value}
											keywords={item.keywords}
											data-search-href={item.href}
											aria-label={`${item.title} ${item.group}`}
											onclick={(event: MouseEvent) => handleItemClick(event, item.href)}
											onSelect={() => selectItem(item.href)}
										>
													<span class="docs-search-icon">
														{#if item.isComponent}
															<Atom size={20} strokeWidth={1.9} />
														{:else}
															<BookOpen size={20} strokeWidth={1.9} />
														{/if}
													</span>
													<span class="truncate">{item.title}</span>
												</CommandItem>
									{/each}
								</CommandCollection>
							</CommandGroup>
						{/each}
					{/if}
				</CommandPanel>
				<CommandFooter class="docs-search-footer items-center">
					<span>Go to Page</span>
					<CommandShortcut class="docs-search-return-key">
						<ArrowLeft size={14} strokeWidth={2.25} class="-scale-x-100" />
					</CommandShortcut>
				</CommandFooter>
			</CommandList>
		</Command>
	</CommandDialogPopup>
</CommandDialog>
