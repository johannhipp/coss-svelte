<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<SelectPrimitive.Group
	data-slot="select-group"
	class={cn("cn-select-group", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Group>
