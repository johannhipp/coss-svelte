<script lang="ts">
import Checkbox from "../src/components/Checkbox.svelte";
import CheckboxGroup from "../src/components/CheckboxGroup.svelte";

let value = $state(["next"]);
</script>

<CheckboxGroup aria-label="Frameworks" bind:value>
	<Checkbox aria-label="Next.js" value="next" />
	<Checkbox aria-label="Vite" value="vite" />
</CheckboxGroup>

<output>{value.join(",")}</output>
