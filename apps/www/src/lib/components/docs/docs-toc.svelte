<script lang="ts">
import type { TocItem } from "$lib/docs/types.js";

let { items = [] }: { items?: TocItem[] } = $props();

function scrollToSection(event: MouseEvent, href: string) {
	if (
		event.button !== 0 ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		!href.startsWith("#")
	) {
		return;
	}

	let sectionId: string;
	try {
		sectionId = decodeURIComponent(href.slice(1));
	} catch {
		return;
	}

	const section = document.getElementById(sectionId);
	if (!section) {
		return;
	}

	event.preventDefault();
	if (window.location.hash === href) {
		window.history.replaceState(null, "", href);
	} else {
		window.history.pushState(null, "", href);
	}
	section.scrollIntoView({
		behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
		block: "start",
	});
}
</script>

<aside
	class="sticky top-14 z-20 hidden h-[calc(100svh-3.5rem)] w-72 shrink-0 overflow-y-auto overscroll-none py-8 xl:block"
	aria-label="On this page"
>
	<div class="flex flex-col gap-1 py-2 ps-6 pe-4 text-sm">
		<p class="flex h-7 items-center font-medium text-xs">On This Page</p>
		<nav
			class="relative ms-3.5 flex flex-col gap-0.5 before:absolute before:inset-y-0 before:-left-3 before:w-px before:bg-border"
		>
			{#each items as item, index}
			<a
				class={[
					"relative py-1 text-[13px] leading-[1.125rem] no-underline transition-colors before:absolute before:inset-y-px before:-left-3 before:rounded-full",
					index === 0
						? "text-foreground before:w-0.5 before:bg-primary"
						: "text-muted-foreground hover:text-foreground",
				]}
				href={item.href}
				onclick={(event) => scrollToSection(event, item.href)}
			>
				{item.title}
			</a>
			{/each}
		</nav>
	</div>
</aside>
