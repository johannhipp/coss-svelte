<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Viewport>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Viewport
	bind:ref
	data-slot="combobox-list"
	class={cn("cn-combobox-list", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
