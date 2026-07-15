<script lang="ts">
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<LinkPreviewPrimitive.Trigger
	data-slot="preview-card-trigger"
	class={cn("cn-preview-card-trigger", className)}
	{...rest}
>
	{@render children?.()}
</LinkPreviewPrimitive.Trigger>
