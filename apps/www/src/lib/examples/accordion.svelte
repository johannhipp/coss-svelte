<script lang="ts">
import { Accordion } from "coss-svelte";
</script>

<Accordion
	value="item-1"
	items={[
		{ title: "Is it accessible?", content: "Yes. It follows the WAI-ARIA accordion pattern." },
		{ title: "Can it be animated?", content: "Yes. The panel opens and closes smoothly." },
	]}
/>
