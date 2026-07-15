<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	children?: Snippet;
};

let { open = $bindable(false), children, ...rest }: Props = $props();
</script>

<div data-slot="command-dialog">
	<DialogPrimitive.Root bind:open {...rest}>
		{@render children?.()}
	</DialogPrimitive.Root>
</div>
