<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content data-slot="select-popup" class={cn("cn-select-popup", className)} {...rest}>
		{@render children?.()}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
