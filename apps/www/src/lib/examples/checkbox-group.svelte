<script lang="ts">
import { Checkbox, CheckboxGroup, Label } from "coss-svelte";
</script>

<CheckboxGroup aria-label="Select frameworks" value={["next"]}>
	<Label><Checkbox value="next" /> Next.js</Label>
	<Label><Checkbox value="vite" /> Vite</Label>
	<Label><Checkbox value="astro" /> Astro</Label>
</CheckboxGroup>
