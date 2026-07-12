<script lang="ts">
import type { Snippet } from "svelte";
import DocsHeader from "$lib/components/docs/docs-header.svelte";
import DocsMobileMenu from "$lib/components/docs/docs-mobile-menu.svelte";
import DocsSidebar from "$lib/components/docs/docs-sidebar.svelte";
import { sidebarGroups } from "$lib/docs/navigation.js";

let { children }: { children?: Snippet } = $props();

let mobileNavOpen = $state(false);
</script>

<div class="min-h-svh bg-muted/30 text-foreground">
	<DocsHeader onMenu={() => (mobileNavOpen = true)} />
	<DocsMobileMenu bind:open={mobileNavOpen} />
	<div
		class="mx-auto flex w-full max-w-[1440px] flex-1 items-start px-3 md:grid md:grid-cols-[208px_minmax(0,1fr)] md:gap-0 lg:px-10"
	>
		<DocsSidebar
			groups={sidebarGroups}
			class="docs-sidebar-scroll sticky top-14 z-30 hidden h-[calc(100svh-3.5rem)] shrink-0 overflow-y-auto bg-transparent px-4 py-8 md:block"
		/>
		<div class="min-w-0 flex-1">
			{@render children?.()}
		</div>
	</div>
</div>
