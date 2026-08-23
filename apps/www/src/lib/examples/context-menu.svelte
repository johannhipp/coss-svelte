<script lang="ts">
import {
	ContextMenu,
	ContextMenuItem,
	ContextMenuPopup,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "coss-svelte";
</script>

<ContextMenu>
	<ContextMenuTrigger class="block w-full max-w-sm" aria-label="Demo area">
		<div
			class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm"
		>
			Right click here
		</div>
	</ContextMenuTrigger>
	<ContextMenuPopup>
		<ContextMenuItem>Back</ContextMenuItem>
		<ContextMenuItem>Forward</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem>Reload</ContextMenuItem>
	</ContextMenuPopup>
</ContextMenu>
