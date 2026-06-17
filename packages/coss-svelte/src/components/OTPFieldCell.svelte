<script>
import { PinInput as PinInputPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PinInputPrimitive.Cell
	data-slot="otp-field-cell"
	class={cn("cn-otp-cell", className)}
	{...rest}
>
	{@render children?.()}
</PinInputPrimitive.Cell>
