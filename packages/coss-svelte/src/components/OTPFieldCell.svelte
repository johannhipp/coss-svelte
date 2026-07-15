<script lang="ts">
import { PinInput as PinInputPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PinInputPrimitive.Cell>;
let { cell, class: className = "", children, ...rest }: Props = $props();
</script>

<PinInputPrimitive.Cell
	data-slot="otp-field-cell"
	class={cn("cn-otp-cell", className)}
	{cell}
	{...rest}
>
	{@render children?.()}
</PinInputPrimitive.Cell>
