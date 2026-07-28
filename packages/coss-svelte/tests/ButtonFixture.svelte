<script lang="ts">
import Button from "../src/components/Button.svelte";

let anchorClicks = $state(0);
let buttonClicks = $state(0);
</script>

<Button
	href=""
	loading
	data-testid="loading-anchor"
	onclick={() => {
		anchorClicks += 1;
	}}
>
	Empty URL
</Button>
<Button
	loading
	data-testid="loading-button"
	onclick={() => {
		buttonClicks += 1;
	}}
>
	Submit
</Button>

<output data-testid="anchor-clicks">{anchorClicks}</output>
<output data-testid="button-clicks">{buttonClicks}</output>
