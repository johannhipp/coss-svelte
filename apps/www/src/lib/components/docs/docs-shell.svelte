<script lang="ts">
import type { Snippet } from "svelte";
import DocsHeader from "$lib/components/docs/docs-header.svelte";
import DocsSidebar from "$lib/components/docs/docs-sidebar.svelte";
import { sidebarGroups } from "$lib/docs/navigation.js";

let { children }: { children?: Snippet } = $props();

let mobileNavOpen = $state(false);
</script>

<div class="min-h-svh bg-muted/30 text-foreground">
	<DocsHeader onMenu={() => (mobileNavOpen = true)} />
	{#if mobileNavOpen}
		<div
			class="fixed inset-0 z-50 bg-foreground/35 backdrop-blur-[2px] md:hidden"
			role="presentation"
			onclick={() => (mobileNavOpen = false)}
		></div>
		<div
			class="fixed top-0 bottom-0 left-0 z-50 w-[min(21rem,78vw)] overflow-y-auto border-border border-r bg-background px-6 py-7 shadow-2xl md:hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
		>
			<div class="mb-10 flex items-center justify-between gap-4">
				<h2 class="font-medium text-2xl leading-none">Menu</h2>
				<button
					class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
					type="button"
					aria-label="Close menu"
					onclick={() => (mobileNavOpen = false)}
				>
					<svg
						aria-hidden="true"
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			</div>
			<nav class="mb-12 flex flex-col gap-5 text-[1.35rem]" aria-label="Primary mobile navigation">
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/" onclick={() => (mobileNavOpen = false)}>Home</a>
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/docs/introduction" onclick={() => (mobileNavOpen = false)}>Docs</a>
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/particles" onclick={() => (mobileNavOpen = false)}>Particles</a>
			</nav>
			<DocsSidebar
				groups={sidebarGroups}
				class="block bg-transparent p-0"
				onNavigate={() => (mobileNavOpen = false)}
			/>
		</div>
	{/if}
	<div
		class="mx-auto flex w-full max-w-[1440px] flex-1 items-start px-3 md:grid md:grid-cols-[208px_minmax(0,1fr)] md:gap-0 lg:px-10"
	>
		<DocsSidebar
			groups={sidebarGroups}
			class="sticky top-14 z-30 hidden h-[calc(100svh-3.5rem)] shrink-0 overflow-y-auto bg-transparent px-4 py-8 md:block"
		/>
		<div class="min-w-0 flex-1">
			{@render children?.()}
		</div>
	</div>
</div>
