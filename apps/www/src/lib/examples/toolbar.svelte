<script lang="ts">
import { AlignCenter, AlignLeft, AlignRight, DollarSign, Percent } from "@lucide/svelte";
import {
	Button,
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
	ToggleGroup,
	ToggleGroupItem,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator,
} from "coss-svelte";

const fonts = [
	{ label: "Helvetica", value: "helvetica" },
	{ label: "Arial", value: "arial" },
	{ label: "Times New Roman", value: "times-new-roman" },
];
</script>

<Toolbar aria-label="Formatting options">
	<ToggleGroup class="border-none bg-transparent p-0 shadow-none" value="left">
		<ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
		<ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
		<ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
	</ToggleGroup>
	<ToolbarSeparator />
	<ToolbarGroup>
		<ToolbarButton aria-label="Format as currency"><DollarSign class="size-4" /></ToolbarButton>
		<ToolbarButton aria-label="Format as percent"><Percent class="size-4" /></ToolbarButton>
	</ToolbarGroup>
	<ToolbarSeparator />
	<Select value="helvetica" options={fonts}>
		<SelectTrigger aria-label="Font family" class="w-44"><SelectValue /></SelectTrigger>
		<SelectPopup>
			{#each fonts as font}
				<SelectItem value={font.value} label={font.label}>{font.label}</SelectItem>
			{/each}
		</SelectPopup>
	</Select>
	<ToolbarSeparator />
	<Button>Save</Button>
</Toolbar>
