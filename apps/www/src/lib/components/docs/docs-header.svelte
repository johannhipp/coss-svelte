<script lang="ts">
import { GitBranch, Menu, Moon, Sun } from "@lucide/svelte";
import { onMount } from "svelte";
import DocsSearch from "$lib/components/docs/docs-search.svelte";

const themeStorageKey = "coss-svelte-theme";

let { onMenu }: { onMenu?: () => void } = $props();

let darkMode = $state(
	typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
);

function getStoredTheme() {
	try {
		return localStorage.getItem(themeStorageKey);
	} catch {
		return null;
	}
}

function persistTheme(nextDarkMode: boolean) {
	try {
		localStorage.setItem(themeStorageKey, nextDarkMode ? "dark" : "light");
	} catch {
		// The visual toggle should keep working even when storage is unavailable.
	}
}

function applyTheme(nextDarkMode: boolean, { persist = true }: { persist?: boolean } = {}) {
	darkMode = nextDarkMode;
	document.documentElement.classList.toggle("dark", nextDarkMode);

	if (persist) {
		persistTheme(nextDarkMode);
	}
}

function toggleTheme() {
	applyTheme(!darkMode);
}

onMount(() => {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const storedTheme = getStoredTheme();

	applyTheme(storedTheme ? storedTheme === "dark" : mediaQuery.matches, { persist: false });

	function handlePreferenceChange(event: MediaQueryListEvent) {
		if (!getStoredTheme()) {
			applyTheme(event.matches, { persist: false });
		}
	}

	mediaQuery.addEventListener("change", handlePreferenceChange);

	return () => {
		mediaQuery.removeEventListener("change", handlePreferenceChange);
	};
});
</script>

<header
	class="sticky top-0 z-40 w-full bg-muted/45 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/70"
>
	<div class="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-2 px-4 sm:px-10">
		<button
			class="-ms-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
			type="button"
			aria-label="Open menu"
			onclick={onMenu}
		>
			<Menu size={21} strokeWidth={2.25} />
		</button>
		<a
			class="-mt-0.5 flex min-w-0 shrink-0 items-baseline gap-1.5 font-heading font-semibold text-2xl text-foreground no-underline sm:text-[1.625rem]"
			href="/docs/introduction"
			aria-label="coss-svelte home"
		>
			<span class="truncate">coss-svelte</span>
			<span class="font-semibold text-muted-foreground/70">ui</span>
		</a>

		<div class="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
			<nav class="hidden items-center gap-1 text-sm lg:flex" aria-label="Primary navigation">
				<a
					class="rounded-md bg-muted px-3 py-1.5 font-medium text-foreground no-underline shadow-sm"
					href="/docs/introduction"
				>
					Docs
				</a>
				<a
					class="rounded-md px-3 py-1.5 font-medium text-foreground/85 no-underline hover:bg-muted"
					href="/particles"
				>
					Particles
				</a>
			</nav>
			<DocsSearch />
			<a
				class="hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground no-underline hover:bg-muted hover:text-foreground sm:inline-flex"
				href="https://github.com/johannhipp/coss-svelte"
				rel="noreferrer"
				target="_blank"
				aria-label="Open coss-svelte GitHub repository"
			>
				<GitBranch size={15} strokeWidth={2.25} />
			</a>
			<button
				class="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-muted"
				type="button"
				aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
				aria-pressed={darkMode}
				onclick={toggleTheme}
			>
				{#if darkMode}
					<Sun size={16} strokeWidth={2.25} />
				{:else}
					<Moon size={16} strokeWidth={2.25} />
				{/if}
			</button>
		</div>
	</div>
</header>
