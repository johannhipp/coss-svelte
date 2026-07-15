<script lang="ts">
import { PinInput as PinInputPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<
	ComponentProps<typeof PinInputPrimitive.Root>,
	"children" | "child" | "maxlength"
> & {
	value?: string;
	length?: number;
	class?: string;
	children?: Snippet<[unknown]>;
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
	{#snippet children({ cells })}
		{#if rootChildren}
			{@render rootChildren({ cells })}
		{:else}
			{#each cells as cell}
				<PinInputPrimitive.Cell data-slot="otp-field-cell" class="cn-otp-cell" {cell}>
					{cell.char ?? ""}
				</PinInputPrimitive.Cell>
			{/each}
		{/if}
	{/snippet}
</PinInputPrimitive.Root>
