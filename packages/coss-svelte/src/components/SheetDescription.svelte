<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Description
	data-slot="sheet-description"
	class={cn("cn-sheet-description", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Description>
