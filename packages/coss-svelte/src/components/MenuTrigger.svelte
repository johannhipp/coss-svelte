<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.Trigger
	data-slot="menu-trigger"
	class={cn("cn-menu-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Trigger>
