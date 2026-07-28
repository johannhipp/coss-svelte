<script lang="ts">
import { Copy, ExternalLink, FolderPlus, Pencil, Trash2 } from "@lucide/svelte";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuGroup,
	ContextMenuGroupLabel,
	ContextMenuItem,
	ContextMenuLinkItem,
	ContextMenuPopup,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubPopup,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "coss-svelte";

let showDetails = $state(true);
let sort = $state("name");
let lastAction = $state("No action selected");

function selectAction(action: string) {
	lastAction = action;
}
</script>

<div class="grid w-full max-w-sm gap-3">
	<ContextMenu>
		<ContextMenuTrigger
			class="grid min-h-44 place-items-center rounded-xl border border-dashed bg-muted/35 p-6 text-center outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
			tabindex={0}
			aria-label="Project files context menu"
		>
			<div class="grid gap-1">
				<strong class="font-medium text-sm">Project files</strong>
				<span class="text-muted-foreground text-xs">Right-click or press Shift + F10</span>
			</div>
		</ContextMenuTrigger>

		<ContextMenuPopup class="w-56">
			<ContextMenuGroup>
				<ContextMenuGroupLabel>File</ContextMenuGroupLabel>
				<ContextMenuItem onSelect={() => selectAction("Renamed file")}>
					<Pencil aria-hidden="true" />
					Rename
					<ContextMenuShortcut>F2</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem onSelect={() => selectAction("Copied file")}>
					<Copy aria-hidden="true" />
					Copy
					<ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem disabled>
					Share
					<ContextMenuShortcut>⌘S</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuGroup>

			<ContextMenuSeparator />

			<ContextMenuCheckboxItem bind:checked={showDetails} closeOnSelect={false}>
				Show details
			</ContextMenuCheckboxItem>

			<ContextMenuSub>
				<ContextMenuSubTrigger>
					<FolderPlus aria-hidden="true" />
					Sort by
				</ContextMenuSubTrigger>
				<ContextMenuSubPopup class="w-40">
					<ContextMenuRadioGroup bind:value={sort}>
						<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
						<ContextMenuRadioItem value="date">Date modified</ContextMenuRadioItem>
						<ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuSubPopup>
			</ContextMenuSub>

			<ContextMenuLinkItem
				href="https://coss.com/ui/docs"
				target="_blank"
				rel="noreferrer"
				onSelect={() => selectAction("Opened documentation")}
			>
				<ExternalLink aria-hidden="true" />
				Open documentation
			</ContextMenuLinkItem>

			<ContextMenuSeparator />

			<ContextMenuItem variant="destructive" onSelect={() => selectAction("Deleted file")}>
				<Trash2 aria-hidden="true" />
				Delete
				<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
			</ContextMenuItem>
		</ContextMenuPopup>
	</ContextMenu>

	<p class="m-0 text-muted-foreground text-xs" aria-live="polite">
		{lastAction} · sorted by {sort}{showDetails ? " · details visible" : ""}
	</p>
</div>
