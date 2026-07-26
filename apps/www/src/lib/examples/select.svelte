<script lang="ts">
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "coss-svelte";

const items = [
	{ label: "Next.js", value: "next" },
	{ label: "Vite", value: "vite" },
	{ label: "Astro", value: "astro" },
];
</script>

<Select value="next" options={items}>
	<SelectTrigger aria-label="Select framework"><SelectValue /></SelectTrigger>
	<SelectPopup>
		{#each items as item}
			<SelectItem value={item.value} label={item.label}>{item.label}</SelectItem>
		{/each}
	</SelectPopup>
</Select>
