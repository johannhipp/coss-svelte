<script lang="ts">
import { Select } from "coss-svelte";
</script>

<Select
	value="next"
	options={[
		{ label: "Next.js", value: "next" },
		{ label: "Vite", value: "vite" },
		{ label: "Astro", value: "astro" },
	]}
/>
