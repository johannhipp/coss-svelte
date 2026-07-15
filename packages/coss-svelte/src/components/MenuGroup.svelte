<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.Group
	data-slot="menu-group"
	class={cn("cn-menu-group", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Group>
