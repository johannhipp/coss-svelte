<script lang="ts">
import { Skeleton } from "coss-svelte";
</script>

<div class="flex w-64 items-center gap-3">
	<Skeleton class="h-10 w-10 rounded-full" />
	<div class="grid flex-1 gap-2">
		<Skeleton class="h-3 w-3/4" />
		<Skeleton class="h-3 w-1/2" />
	</div>
</div>
