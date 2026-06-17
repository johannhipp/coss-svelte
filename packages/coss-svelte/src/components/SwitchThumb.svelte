<script>
import { Switch as SwitchPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SwitchPrimitive.Thumb
	data-slot="switch-thumb"
	class={cn("cn-switch-thumb", className)}
	{...rest}
>
	{@render children?.()}
</SwitchPrimitive.Thumb>
