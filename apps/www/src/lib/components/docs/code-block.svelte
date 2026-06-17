<script lang="ts">
import { Check, Copy, SquareTerminal } from "@lucide/svelte";

let { code, language = "svelte" }: { code: string; language?: string } = $props();

const packageManagers = ["bun", "npm", "pnpm", "yarn"];

let selectedPackageManager = $state("npm");
let copied = $state(false);
let timeoutId: ReturnType<typeof setTimeout> | undefined;

let isShell = $derived(["bash", "sh", "shell", "zsh"].includes(language));
let displayedCode = $derived(isShell ? getShellCommand(code, selectedPackageManager) : code);
let highlightedCode = $derived(isShell ? escapeHtml(displayedCode) : highlightCode(displayedCode));

function getShellCommand(value: string, manager: string) {
	const trimmed = value.trim();
	const match = trimmed.match(/^(pnpm|npm|yarn|bun)\s+add\s+(.+)$/);

	if (!match) {
		return trimmed;
	}

	const packages = match[2];

	switch (manager) {
		case "bun":
			return `bun add ${packages}`;
		case "pnpm":
			return `pnpm add ${packages}`;
		case "yarn":
			return `yarn add ${packages}`;
		default:
			return `npm install ${packages}`;
	}
}

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function highlightCode(value: string) {
	const escaped = escapeHtml(value);

	return escaped
		.replaceAll(
			/\b(import|from|const|let|export|return|function|type|interface)\b/g,
			'<span class="docs-code-token-keyword">$1</span>'
		)
		.replaceAll(/\b([A-Z][A-Za-z0-9_]*)\b/g, '<span class="docs-code-token-symbol">$1</span>')
		.replaceAll(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="docs-code-token-string">$1</span>');
}

async function copyCode() {
	try {
		await navigator.clipboard.writeText(displayedCode);
		copied = true;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			copied = false;
		}, 2200);
	} catch {
		copied = false;
	}
}
</script>

<figure class="docs-code-block">
	{#if isShell}
		<div class="docs-code-toolbar">
			<SquareTerminal size={17} strokeWidth={2.1} />
			<div class="docs-code-tabs" role="tablist" aria-label="Package manager">
				{#each packageManagers as manager}
					<button
						type="button"
						role="tab"
						aria-selected={selectedPackageManager === manager}
						class:active={selectedPackageManager === manager}
						onclick={() => {
							selectedPackageManager = manager;
						}}
					>
						{manager}
					</button>
				{/each}
			</div>
		</div>
	{/if}
	<button class="docs-code-copy" type="button" aria-label="Copy code" onclick={copyCode}>
		{#if copied}
			<Check size={18} strokeWidth={2.1} />
		{:else}
			<Copy size={18} strokeWidth={2.1} />
		{/if}
	</button>
	<pre class="m-0 overflow-x-auto p-4 text-[13px] leading-6"><code>{@html highlightedCode}</code></pre>
</figure>
