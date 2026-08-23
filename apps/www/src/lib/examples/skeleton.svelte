<script lang="ts">
import { Skeleton } from "coss-svelte";
</script>

<div class="flex w-full max-w-md flex-col gap-8">
	{#each [0, 1, 2] as row (row)}
		<div class="flex items-center gap-4">
			<Skeleton class="size-10 shrink-0 rounded-full" />
			<div class="grid flex-1 gap-2">
				<Skeleton class="h-4 w-full" />
				<div class="flex gap-2">
					<Skeleton class="h-4 w-2/5" />
					<Skeleton class="h-4 w-2/5" />
				</div>
			</div>
			<Skeleton class="h-8 w-24 shrink-0 rounded-lg" />
		</div>
	{/each}
</div>
