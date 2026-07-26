<script lang="ts">
import { Menu } from "coss-svelte";
</script>

<Menu
	label="Open menu"
	items={[
		"Play",
		{ label: "Pause", disabled: true },
		"Previous",
		"Next",
		"Shuffle",
		"Repeat",
	]}
/>
