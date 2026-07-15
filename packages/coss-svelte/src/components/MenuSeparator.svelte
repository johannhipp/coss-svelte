<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.Separator
	data-slot="menu-separator"
	class={cn("cn-menu-separator", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Separator>
