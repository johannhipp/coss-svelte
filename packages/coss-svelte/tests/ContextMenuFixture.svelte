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

let {
	dir = "ltr",
	disabled = false,
	preventKeyboard = false,
	preventContextMenu = false,
	startIndeterminate = false,
	onOpenChange,
}: {
	dir?: "ltr" | "rtl";
	disabled?: boolean;
	preventKeyboard?: boolean;
	preventContextMenu?: boolean;
	startIndeterminate?: boolean;
	onOpenChange?: (open: boolean) => void;
} = $props();

let open = $state(false);
let checked = $state(false);
// svelte-ignore state_referenced_locally
let indeterminate = $state(startIndeterminate);
let sort = $state("name");
let selected = $state("none");
let subOpen = $state(false);
let openChanges = $state<boolean[]>([]);
let canceledSelections = $state(0);
let contextPoint = $state("none");
let linkRef = $state<HTMLAnchorElement | null>(null);

function recordOpenChange(nextOpen: boolean) {
	openChanges.push(nextOpen);
	onOpenChange?.(nextOpen);
}

function handleKeydown(event: KeyboardEvent) {
	if (preventKeyboard) event.preventDefault();
}

function handleContextMenu(event: MouseEvent) {
	contextPoint = `${Math.round(event.clientX)},${Math.round(event.clientY)}`;
	if (preventContextMenu) event.preventDefault();
}
</script>

<ContextMenu bind:open {dir} onOpenChange={recordOpenChange}>
	<ContextMenuTrigger
		role="button"
		tabindex={0}
		aria-label="File actions"
		{disabled}
		onkeydown={handleKeydown}
		oncontextmenu={handleContextMenu}
	>
		Open file actions
	</ContextMenuTrigger>
	<ContextMenuPopup
		portalProps={{ disabled: true }}
		avoidCollisions={false}
		preventScroll={false}
	>
		<ContextMenuGroup>
			<ContextMenuGroupLabel>File</ContextMenuGroupLabel>
			<ContextMenuItem onSelect={() => (selected = "rename")}>
				Rename
				<ContextMenuShortcut>F2</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem disabled>Unavailable</ContextMenuItem>
			<ContextMenuItem
				onSelect={(event) => {
					event.preventDefault();
					canceledSelections += 1;
				}}
			>
				Keep open
			</ContextMenuItem>
		</ContextMenuGroup>
		<ContextMenuSeparator />
		<ContextMenuCheckboxItem bind:checked bind:indeterminate closeOnSelect={false}>
			Show details
		</ContextMenuCheckboxItem>
		<ContextMenuSub bind:open={subOpen}>
			<ContextMenuSubTrigger>Sort by</ContextMenuSubTrigger>
			<ContextMenuSubPopup
				portalProps={{ disabled: true }}
				avoidCollisions={false}
			>
				<ContextMenuRadioGroup bind:value={sort}>
					<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
					<ContextMenuRadioItem value="date">Date</ContextMenuRadioItem>
				</ContextMenuRadioGroup>
			</ContextMenuSubPopup>
		</ContextMenuSub>
		<ContextMenuLinkItem
			bind:ref={linkRef}
			href="/files/report"
			target="_blank"
			rel="noreferrer"
		>
			Open report
		</ContextMenuLinkItem>
	</ContextMenuPopup>
</ContextMenu>

<button data-testid="context-outside" type="button">Outside target</button>
<output data-testid="context-open">{String(open)}</output>
<output data-testid="context-checked">{String(checked)}</output>
<output data-testid="context-indeterminate">{String(indeterminate)}</output>
<output data-testid="context-sort">{sort}</output>
<output data-testid="context-selected">{selected}</output>
<output data-testid="context-sub-open">{String(subOpen)}</output>
<output data-testid="context-open-changes">{openChanges.join(",")}</output>
<output data-testid="context-canceled">{canceledSelections}</output>
<output data-testid="context-point">{contextPoint}</output>
<output data-testid="context-link-ref">{linkRef?.tagName ?? "none"}</output>
