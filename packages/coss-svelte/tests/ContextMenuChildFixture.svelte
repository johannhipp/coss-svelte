<script lang="ts">
import ContextMenu from "../src/components/ContextMenu.svelte";
import ContextMenuItem from "../src/components/ContextMenuItem.svelte";
import ContextMenuPopup from "../src/components/ContextMenuPopup.svelte";
import ContextMenuTrigger from "../src/components/ContextMenuTrigger.svelte";

let open = $state(false);
let triggerRef = $state<HTMLElement | null>(null);
let itemRef = $state<HTMLElement | null>(null);
let selected = $state(false);
</script>

{#snippet triggerChild({ props })}
	<button {...props} type="button">Child trigger</button>
{/snippet}

{#snippet itemChild({ props })}
	<button {...props} type="button">Child action</button>
{/snippet}

<ContextMenu bind:open>
	<ContextMenuTrigger bind:ref={triggerRef} child={triggerChild} />
	<ContextMenuPopup portalProps={{ disabled: true }}>
		<ContextMenuItem
			bind:ref={itemRef}
			child={itemChild}
			inset
			variant="destructive"
			onSelect={() => (selected = true)}
		/>
	</ContextMenuPopup>
</ContextMenu>

<output data-testid="child-open">{String(open)}</output>
<output data-testid="child-selected">{String(selected)}</output>
<output data-testid="child-trigger-ref">{triggerRef?.tagName ?? "none"}</output>
<output data-testid="child-item-ref">{itemRef?.tagName ?? "none"}</output>
