<script lang="ts">
import { ScrollArea } from "coss-svelte";
</script>

<ScrollArea class="h-40 w-64 rounded-lg border border-border p-4">
	<div class="grid gap-3">
		{#each Array.from({ length: 8 }, (_, index) => `Scrollable item ${index + 1}`) as item}
			<p class="text-sm">{item}</p>
		{/each}
	</div>
</ScrollArea>
