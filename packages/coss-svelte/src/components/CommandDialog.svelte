<script>
import { Dialog as DialogPrimitive } from "bits-ui";

let { open = $bindable(false), children, ...rest } = $props();
</script>

<DialogPrimitive.Root data-slot="command-dialog" bind:open {...rest}>
	{@render children?.()}
</DialogPrimitive.Root>
