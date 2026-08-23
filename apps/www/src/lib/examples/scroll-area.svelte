<script lang="ts">
import { ScrollArea } from "coss-svelte";

const tags = Array.from({ length: 50 }, (_, index) => `v1.0.0-alpha.${index}`);
</script>

<ScrollArea class="h-64 w-64 rounded-lg border">
	<div class="px-4 py-2">
		<h4 class="mb-2 font-medium text-sm">Tags</h4>
		<div class="flex flex-col gap-1">
			{#each tags as tag}
				<div class="text-sm">{tag}</div>
			{/each}
		</div>
	</div>
</ScrollArea>
