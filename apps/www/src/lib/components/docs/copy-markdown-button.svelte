<script lang="ts">
import { Check, Copy } from "@lucide/svelte";
import { Button } from "coss-svelte";
import { onDestroy } from "svelte";

let { label = "Copy Markdown", markdown = "" }: { label?: string; markdown?: string } = $props();

let copied = $state(false);
let timeoutId: ReturnType<typeof setTimeout> | undefined;

async function copyMarkdown() {
	if (!markdown) {
		return;
	}

	try {
		await navigator.clipboard.writeText(markdown);
		copied = true;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			copied = false;
		}, 2200);
	} catch {
		copied = false;
	}
}

onDestroy(() => {
	clearTimeout(timeoutId);
});
</script>

<Button
	size="sm"
	variant="outline"
	type="button"
	class="gap-1.5"
	aria-live="polite"
	onclick={copyMarkdown}
>
	{#if copied}
		<Check size={15} strokeWidth={2.25} />
		<span>Copied</span>
	{:else}
		<Copy size={15} strokeWidth={2.25} />
		<span>{label}</span>
	{/if}
</Button>
