<script lang="ts">
import ContextMenu from "../src/components/ContextMenu.svelte";
import ContextMenuItem from "../src/components/ContextMenuItem.svelte";
import ContextMenuPopup from "../src/components/ContextMenuPopup.svelte";
import ContextMenuTrigger from "../src/components/ContextMenuTrigger.svelte";

let {
	mode,
}: {
	mode: "selector" | "element" | "inline";
} = $props();

let portalTarget = $state<HTMLDivElement | null>(null);
let portalProps = $derived(
	mode === "inline"
		? { disabled: true }
		: mode === "element" && portalTarget
			? { to: portalTarget }
			: { to: "#context-portal-target" }
);
</script>

<div id="context-portal-target" data-testid="context-portal-target" bind:this={portalTarget}></div>

<section data-testid="context-inline-parent">
	<ContextMenu>
		<ContextMenuTrigger role="button" tabindex={0}>Portal trigger</ContextMenuTrigger>
		<ContextMenuPopup {portalProps}>
			<ContextMenuItem>Portal item</ContextMenuItem>
		</ContextMenuPopup>
	</ContextMenu>
</section>
