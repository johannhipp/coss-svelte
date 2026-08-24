<script lang="ts">
import { ArrowDown, ArrowUp, CornerDownLeft } from "@lucide/svelte";
import {
	Command,
	CommandDialog,
	CommandDialogPopup,
	CommandDialogTrigger,
	CommandEmpty,
	CommandFooter,
	CommandGroup,
	CommandGroupLabel,
	CommandInput,
	CommandItem,
	CommandList,
	CommandPanel,
	CommandSeparator,
	CommandShortcut,
	Kbd,
	KbdGroup,
} from "coss-svelte";

const groups = [
	{
		label: "Suggestions",
		items: [
			{ label: "Linear", shortcut: "⌘L", value: "linear" },
			{ label: "Figma", shortcut: "⌘F", value: "figma" },
			{ label: "Slack", shortcut: "⌘S", value: "slack" },
			{ label: "YouTube", shortcut: "⌘Y", value: "youtube" },
			{ label: "Raycast", shortcut: "⌘R", value: "raycast" },
		],
	},
	{
		label: "Commands",
		items: [
			{ label: "Clipboard History", shortcut: "⌘⇧C", value: "clipboard-history" },
			{ label: "Import Extension", shortcut: "⌘I", value: "import-extension" },
			{ label: "Create Snippet", shortcut: "⌘N", value: "create-snippet" },
			{ label: "System Preferences", shortcut: "⌘,", value: "system-preferences" },
			{ label: "Window Management", shortcut: "⌘⇧W", value: "window-management" },
		],
	},
];

let open = $state(false);

function handleKeydown(event: KeyboardEvent) {
	if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
		event.preventDefault();
		open = !open;
	}
}
</script>

<svelte:window onkeydown={handleKeydown} />

<CommandDialog bind:open>
	<CommandDialogTrigger>
		Open Command Palette
		<KbdGroup>
			<Kbd>⌘</Kbd>
			<Kbd>J</Kbd>
		</KbdGroup>
	</CommandDialogTrigger>
	<CommandDialogPopup>
		<Command label="Command palette">
			<CommandInput placeholder="Search for apps and commands..." />
			<CommandList>
				<CommandPanel>
					<CommandEmpty>No results found.</CommandEmpty>
					{#each groups as group, index}
						{#if index > 0}
							<CommandSeparator />
						{/if}
						<CommandGroup>
							<CommandGroupLabel>{group.label}</CommandGroupLabel>
							{#each group.items as item}
								<CommandItem value={item.value} onclick={() => (open = false)}>
									<span class="flex-1">{item.label}</span>
									<CommandShortcut>{item.shortcut}</CommandShortcut>
								</CommandItem>
							{/each}
						</CommandGroup>
					{/each}
				</CommandPanel>
			</CommandList>
			<CommandFooter>
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2">
						<KbdGroup>
							<Kbd><ArrowUp /></Kbd>
							<Kbd><ArrowDown /></Kbd>
						</KbdGroup>
						<span>Navigate</span>
					</div>
					<div class="flex items-center gap-2">
						<Kbd><CornerDownLeft /></Kbd>
						<span>Open</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<Kbd>Esc</Kbd>
					<span>Close</span>
				</div>
			</CommandFooter>
		</Command>
	</CommandDialogPopup>
</CommandDialog>
