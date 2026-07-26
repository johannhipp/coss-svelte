<script lang="ts">
import { ChevronDown } from "@lucide/svelte";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "coss-svelte";
</script>

<Collapsible>
	<CollapsibleTrigger class="inline-flex items-center gap-2 font-medium text-sm">
		Show recovery keys
		<ChevronDown class="size-4" />
	</CollapsibleTrigger>
	<CollapsibleContent>
		<ul class="flex flex-col gap-1 py-2 text-muted-foreground text-sm">
			<li class="rounded-sm bg-muted px-2 py-1 font-mono">4829-1735-6621</li>
			<li class="rounded-sm bg-muted px-2 py-1 font-mono">9182-6407-5532</li>
			<li class="rounded-sm bg-muted px-2 py-1 font-mono">3051-7924-9018</li>
		</ul>
	</CollapsibleContent>
</Collapsible>
