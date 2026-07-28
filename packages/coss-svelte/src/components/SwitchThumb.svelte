<script lang="ts">
import { Switch as SwitchPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SwitchPrimitive.Thumb>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children: thumbChildren = undefined,
	...rest
}: Props = $props();
</script>

<SwitchPrimitive.Thumb
	bind:ref
	data-slot="switch-thumb"
	class={cn("cn-switch-thumb", className)}
	{...rest}
>
	{#snippet children(snippetProps)}
		{@render thumbChildren?.(snippetProps)}
	{/snippet}
</SwitchPrimitive.Thumb>
