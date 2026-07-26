<script lang="ts">
import { PinInput as PinInputPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof PinInputPrimitive.Root>;
type Props = Omit<RootProps, "children" | "child" | "maxlength"> & {
	value?: string;
	length?: number;
	class?: string;
	children?: RootProps["children"];
};

let {
	value = $bindable(""),
	length = 6,
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<PinInputPrimitive.Root
	data-slot="otp-field"
	class={cn("cn-otp-field", className)}
	bind:value
	maxlength={length}
	{...rest}
>
	{#snippet children(snippetProps)}
		{#if rootChildren}
			{@render rootChildren(snippetProps)}
		{:else}
			{#each snippetProps.cells as cell}
				<PinInputPrimitive.Cell data-slot="otp-field-cell" class="cn-otp-cell" {cell}>
					{cell.char ?? ""}
				</PinInputPrimitive.Cell>
			{/each}
		{/if}
	{/snippet}
</PinInputPrimitive.Root>
