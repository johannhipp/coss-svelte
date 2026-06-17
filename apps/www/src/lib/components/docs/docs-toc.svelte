<script lang="ts">
type TocItem = {
	href: string;
	title: string;
};

let { items = [] }: { items?: TocItem[] } = $props();
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
			>
				{item.title}
			</a>
			{/each}
		</nav>
	</div>
</aside>
