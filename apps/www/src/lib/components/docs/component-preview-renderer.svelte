<script lang="ts">
import { loadExample } from "$lib/examples/index.js";

let { slug }: { slug: string } = $props();
</script>

{#await loadExample(slug) then result}
	{#if result.kind === "component"}
		{@const Example = result.component}
		<Example />
	{:else if result.kind === "deferred"}
		<p class="text-center text-muted-foreground text-sm">This component is not implemented yet.</p>
	{:else}
		<p class="text-center text-destructive text-sm">No local example is available for “{slug}”.</p>
	{/if}
{:catch}
	<p class="text-center text-destructive text-sm">The local example for “{slug}” could not be loaded.</p>
{/await}
