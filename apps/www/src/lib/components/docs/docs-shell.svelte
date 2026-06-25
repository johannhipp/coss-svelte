<script lang="ts">
import { X } from "@lucide/svelte";
import type { Snippet } from "svelte";
import { cubicOut } from "svelte/easing";
import { fade, fly } from "svelte/transition";
import DocsHeader from "$lib/components/docs/docs-header.svelte";
import DocsSidebar from "$lib/components/docs/docs-sidebar.svelte";
import { sidebarGroups } from "$lib/docs/navigation.js";

let { children }: { children?: Snippet } = $props();

let mobileNavOpen = $state(false);

const mobileBackdropTransition = { duration: 140, easing: cubicOut };
const mobileDrawerTransition = { duration: 180, easing: cubicOut, x: -28 };
</script>

<div class="min-h-svh bg-muted/30 text-foreground">
	<DocsHeader onMenu={() => (mobileNavOpen = true)} />
	{#if mobileNavOpen}
		<div
			class="fixed inset-0 z-50 bg-foreground/35 backdrop-blur-[3px] md:hidden"
			role="presentation"
			onclick={() => (mobileNavOpen = false)}
			transition:fade={mobileBackdropTransition}
		></div>
		<div
			class="docs-mobile-menu-scroll fixed top-0 bottom-0 left-0 z-50 w-[min(42rem,88vw)] overflow-y-auto border-border border-r bg-background px-8 py-8 shadow-[10px_0_32px_rgb(0_0_0_/_0.08)] md:hidden sm:px-10 sm:py-10"
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			transition:fly={mobileDrawerTransition}
		>
			<div class="mb-14 flex items-center justify-between gap-4">
				<h2 class="font-semibold text-[2rem] leading-none sm:text-[2.5rem]">Menu</h2>
				<button
					class="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
					type="button"
					aria-label="Close menu"
					onclick={() => (mobileNavOpen = false)}
				>
					<X size={28} strokeWidth={2.1} />
				</button>
			</div>
			<nav
				class="mb-16 flex flex-col gap-8 text-[1.7rem] leading-tight sm:text-[2rem]"
				aria-label="Primary mobile navigation"
			>
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/" onclick={() => (mobileNavOpen = false)}>Home</a>
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/docs/introduction" onclick={() => (mobileNavOpen = false)}>Docs</a>
				<a class="text-muted-foreground no-underline hover:text-foreground" href="/particles" onclick={() => (mobileNavOpen = false)}>Particles</a>
			</nav>
			<DocsSidebar
				groups={sidebarGroups}
				class="block bg-transparent p-0"
				onNavigate={() => (mobileNavOpen = false)}
				variant="mobile"
			/>
		</div>
	{/if}
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
