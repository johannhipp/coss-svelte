<script lang="ts">
import { Toggle as TogglePrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof TogglePrimitive.Root>, "children" | "child"> & {
	pressed?: boolean;
	class?: string;
	children?: Snippet;
};

let { pressed = $bindable(false), class: className = "", children, ...rest }: Props = $props();
</script>

<TogglePrimitive.Root
	data-slot="toggle"
	class={cn("cn-toggle", pressed && "cn-toggle-pressed", className)}
	bind:pressed
	{...rest}
>
	{@render children?.()}
</TogglePrimitive.Root>
