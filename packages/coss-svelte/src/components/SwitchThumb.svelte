<script lang="ts">
import { Switch as SwitchPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<SwitchPrimitive.Thumb
	data-slot="switch-thumb"
	class={cn("cn-switch-thumb", className)}
	{...rest}
>
	{@render children?.()}
</SwitchPrimitive.Thumb>
