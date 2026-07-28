<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

type Props = ContextMenuPrimitive.RadioGroupProps;
let { value = $bindable(""), class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.RadioGroup
	bind:value
	data-slot="context-menu-radio-group"
	class={cn("cn-menu-radio-group", className)}
	{...rest}
>
	{@render children?.()}
</ContextMenuPrimitive.RadioGroup>
