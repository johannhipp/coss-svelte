<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<MenuPrimitive.RadioGroup
	data-slot="menu-radio-group"
	class={cn("cn-menu-radio-group", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.RadioGroup>
