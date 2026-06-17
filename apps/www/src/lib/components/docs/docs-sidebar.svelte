<script lang="ts">
import { page } from "$app/state";

type SidebarItem = {
	href: string;
	navBadge?: string;
	status?: string;
	title: string;
};

type SidebarGroup = {
	items: SidebarItem[];
	title: string;
};

let {
	class: className = "",
	groups,
	onNavigate,
}: { class?: string; groups: SidebarGroup[]; onNavigate?: () => void } = $props();

function isActive(href: string) {
	return page.url.pathname === href;
}
</script>

<aside class={className} aria-label="Documentation navigation">
	{#each groups as group}
		<section class="mb-6">
			<h2 class="mb-1 flex h-7 items-center px-0 font-medium text-muted-foreground text-xs">
				{group.title}
			</h2>
			<nav class="flex flex-col gap-0.5" aria-label={group.title}>
				{#each group.items as item}
					<a
						class={[
							"flex h-8 items-center justify-between gap-2 rounded-md ps-3.5 pe-2 text-[13.5px] leading-none no-underline transition-colors",
							isActive(item.href)
								? "bg-muted font-medium text-foreground"
								: "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
						]}
						href={item.href}
						aria-current={isActive(item.href) ? "page" : undefined}
						onclick={onNavigate}
					>
						<span class="truncate">{item.title}</span>
						{#if item.navBadge}
							<span
								class="rounded-md bg-info/10 px-1.5 py-0.5 font-medium text-[10px] text-info-foreground leading-none"
							>
								{item.navBadge}
							</span>
						{/if}
					</a>
				{/each}
			</nav>
		</section>
	{/each}
</aside>
