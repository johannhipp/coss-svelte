<script lang="ts">
import { page } from "$app/state";

type SidebarItem = {
	href: string;
	status?: string;
	title: string;
};

type SidebarGroup = {
	items: SidebarItem[];
	title: string;
};

type SidebarVariant = "desktop" | "mobile";

let {
	class: className = "",
	groups,
	onNavigate,
	variant = "desktop",
}: {
	class?: string;
	groups: SidebarGroup[];
	onNavigate?: () => void;
	variant?: SidebarVariant;
} = $props();

function isActive(href: string) {
	return page.url.pathname === href;
}
</script>

<aside class={className} aria-label="Documentation navigation">
	{#each groups as group}
		<section class={variant === "mobile" ? "mb-10" : "mb-6"}>
			<h2
				class={variant === "mobile"
					? "mb-2 flex min-h-7 items-center px-0 font-semibold text-sm text-foreground leading-tight"
					: "mb-1 flex min-h-7 items-center px-0 font-medium text-muted-foreground text-xs leading-tight"}
			>
				{group.title}
			</h2>
			<nav class={variant === "mobile" ? "flex flex-col gap-1.5" : "flex flex-col gap-0.5"} aria-label={group.title}>
				{#each group.items as item}
					<a
						class={[
							variant === "mobile"
								? "flex min-h-11 items-center justify-between gap-2 rounded-lg ps-0 pe-0 text-base leading-tight no-underline transition-colors"
								: "flex min-h-8 items-center justify-between gap-2 rounded-md ps-3.5 pe-2 text-[13.5px] leading-tight no-underline transition-colors",
							isActive(item.href)
								? "bg-muted font-medium text-foreground"
								: "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
						]}
						href={item.href}
						aria-current={isActive(item.href) ? "page" : undefined}
						onclick={onNavigate}
					>
						<span class="truncate">{item.title}</span>
						{#if item.status === "experimental"}
							<span class="shrink-0 text-[10px] text-muted-foreground uppercase tracking-wide">
								Experimental
							</span>
						{/if}
					</a>
				{/each}
			</nav>
		</section>
	{/each}
</aside>
