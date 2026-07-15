<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.GroupHeading
	data-slot="menu-group-label"
	class={cn("cn-menu-group-label", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.GroupHeading>
