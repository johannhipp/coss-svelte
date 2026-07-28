<script lang="ts">
import ContextMenu from "../src/components/ContextMenu.svelte";
import ContextMenuCheckboxItem from "../src/components/ContextMenuCheckboxItem.svelte";
import ContextMenuGroup from "../src/components/ContextMenuGroup.svelte";
import ContextMenuGroupLabel from "../src/components/ContextMenuGroupLabel.svelte";
import ContextMenuItem from "../src/components/ContextMenuItem.svelte";
import ContextMenuLinkItem from "../src/components/ContextMenuLinkItem.svelte";
import ContextMenuPopup from "../src/components/ContextMenuPopup.svelte";
import ContextMenuRadioGroup from "../src/components/ContextMenuRadioGroup.svelte";
import ContextMenuRadioItem from "../src/components/ContextMenuRadioItem.svelte";
import ContextMenuSeparator from "../src/components/ContextMenuSeparator.svelte";
import ContextMenuShortcut from "../src/components/ContextMenuShortcut.svelte";
import ContextMenuSub from "../src/components/ContextMenuSub.svelte";
import ContextMenuSubPopup from "../src/components/ContextMenuSubPopup.svelte";
import ContextMenuSubTrigger from "../src/components/ContextMenuSubTrigger.svelte";
import ContextMenuTrigger from "../src/components/ContextMenuTrigger.svelte";

let open = $state(false);
let checked = $state(false);
let sort = $state("name");
let selected = $state("none");
</script>

<ContextMenu bind:open>
	<ContextMenuTrigger role="button" tabindex={0} aria-label="File actions">
		Open file actions
	</ContextMenuTrigger>
	<ContextMenuPopup portalProps={{ disabled: true }}>
		<ContextMenuGroup>
			<ContextMenuGroupLabel>File</ContextMenuGroupLabel>
			<ContextMenuItem onSelect={() => (selected = "rename")}>
				Rename
				<ContextMenuShortcut>F2</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem disabled>Unavailable</ContextMenuItem>
		</ContextMenuGroup>
		<ContextMenuSeparator />
		<ContextMenuCheckboxItem bind:checked closeOnSelect={false}>
			Show details
		</ContextMenuCheckboxItem>
		<ContextMenuSub>
			<ContextMenuSubTrigger>Sort by</ContextMenuSubTrigger>
			<ContextMenuSubPopup portalProps={{ disabled: true }}>
				<ContextMenuRadioGroup bind:value={sort}>
					<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
					<ContextMenuRadioItem value="date">Date</ContextMenuRadioItem>
				</ContextMenuRadioGroup>
			</ContextMenuSubPopup>
		</ContextMenuSub>
		<ContextMenuLinkItem href="/files/report" target="_blank" rel="noreferrer">
			Open report
		</ContextMenuLinkItem>
	</ContextMenuPopup>
</ContextMenu>

<output data-testid="context-open">{String(open)}</output>
<output data-testid="context-checked">{String(checked)}</output>
<output data-testid="context-sort">{sort}</output>
<output data-testid="context-selected">{selected}</output>
