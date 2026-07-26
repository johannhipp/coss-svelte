<script lang="ts">
import { RadioGroup } from "coss-svelte";
</script>

<RadioGroup
	label="Plan"
	value="pro"
	options={[
		{ label: "Free", value: "free" },
		{ label: "Pro", value: "pro" },
	]}
/>
