<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	open = $bindable(false),
	class: className = "",
	children,
	...rest
}: NativeProps & {
	open?: boolean;
} = $props();
</script>

<MenuPrimitive.Sub bind:open {...rest}>
	<span data-slot="menu-sub" class={cn("cn-menu-sub-shell", className)}>
		{@render children?.()}
	</span>
</MenuPrimitive.Sub>
