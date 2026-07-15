<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<SelectPrimitive.GroupHeading
	data-slot="select-group-label"
	class={cn("cn-select-group-label", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
