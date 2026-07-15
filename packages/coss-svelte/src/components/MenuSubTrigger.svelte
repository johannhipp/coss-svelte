<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.SubTrigger
	data-slot="menu-sub-trigger"
	class={cn("cn-menu-sub-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.SubTrigger>
