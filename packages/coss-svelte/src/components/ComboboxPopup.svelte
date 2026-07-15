<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Portal>
	<ComboboxPrimitive.Content
		data-slot="combobox-popup"
		class={cn("cn-combobox-popup", className)}
		{...rest}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
