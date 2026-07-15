<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Title
	data-slot="sheet-title"
	class={cn("cn-sheet-title", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
