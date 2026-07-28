<script lang="ts">
import ContextMenu from "../src/components/ContextMenu.svelte";
import ContextMenuItem from "../src/components/ContextMenuItem.svelte";
import ContextMenuPopup from "../src/components/ContextMenuPopup.svelte";
import ContextMenuTrigger from "../src/components/ContextMenuTrigger.svelte";
</script>

<ContextMenu>
	<ContextMenuTrigger id="server-context-target" tabindex={0}>
		Server context target
	</ContextMenuTrigger>
	<ContextMenuPopup portalProps={{ disabled: true }}>
		<ContextMenuItem>Server action</ContextMenuItem>
	</ContextMenuPopup>
</ContextMenu>

<ContextMenu dir="rtl">
	<ContextMenuTrigger tabindex={0}>Second context target</ContextMenuTrigger>
	<ContextMenuPopup portalProps={{ disabled: true }}>
		<ContextMenuItem>Second action</ContextMenuItem>
	</ContextMenuPopup>
</ContextMenu>
