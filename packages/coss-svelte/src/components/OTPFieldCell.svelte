<script module lang="ts">
import { PinInput as PinInputTypePrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";

export type OTPFieldCellProps = Omit<ComponentProps<typeof PinInputTypePrimitive.Cell>, "child">;
</script>

<script lang="ts">
import { PinInput as PinInputPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	ref = $bindable(null),
	cell,
	class: className = "",
	children,
	...rest
}: OTPFieldCellProps = $props();
</script>

<PinInputPrimitive.Cell
	bind:ref
	data-slot="otp-field-cell"
	class={cn("cn-otp-cell", className)}
	{cell}
	{...rest}
>
	{@render children?.()}
</PinInputPrimitive.Cell>
