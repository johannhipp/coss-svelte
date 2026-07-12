<script lang="ts">
import { X } from "@lucide/svelte";
import { cubicOut } from "svelte/easing";
import { fade, fly } from "svelte/transition";
import DocsSidebar from "$lib/components/docs/docs-sidebar.svelte";
import { sidebarGroups } from "$lib/docs/navigation.js";

let { open = $bindable(false) }: { open?: boolean } = $props();

const mobileBackdropTransition = { duration: 140, easing: cubicOut };
const mobileDrawerTransition = { duration: 180, easing: cubicOut, x: -28 };

function closeMenu() {
	open = false;
}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 bg-foreground/35 backdrop-blur-[3px] md:hidden"
		role="presentation"
		onclick={closeMenu}
		transition:fade={mobileBackdropTransition}
	></div>
	<div
		class="docs-mobile-menu-scroll fixed top-0 bottom-0 left-0 z-50 w-[min(42rem,88vw)] overflow-y-auto border-border border-r bg-background px-8 py-8 shadow-[10px_0_32px_rgb(0_0_0_/_0.08)] md:hidden sm:px-10 sm:py-10"
		role="dialog"
		aria-modal="true"
		aria-label="Menu"
		transition:fly={mobileDrawerTransition}
	>
		<div class="mb-8 flex items-center justify-between gap-4">
			<h2 class="font-semibold text-xl leading-none">Menu</h2>
			<button
				class="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
				type="button"
				aria-label="Close menu"
				onclick={closeMenu}
			>
				<X size={20} strokeWidth={2.1} />
			</button>
		</div>
		<nav
			class="mb-12 flex flex-col gap-6 text-xl leading-tight"
			aria-label="Primary mobile navigation"
		>
			<a class="text-muted-foreground no-underline hover:text-foreground" href="/" onclick={closeMenu}>Home</a>
			<a
				class="text-muted-foreground no-underline hover:text-foreground"
				href="/docs/introduction"
				onclick={closeMenu}
			>Docs</a>
			<a
				class="text-muted-foreground no-underline hover:text-foreground"
				href="/particles"
				onclick={closeMenu}
			>Particles</a>
		</nav>
		<DocsSidebar
			groups={sidebarGroups}
			class="block bg-transparent p-0"
			onNavigate={closeMenu}
			variant="mobile"
		/>
	</div>
{/if}
