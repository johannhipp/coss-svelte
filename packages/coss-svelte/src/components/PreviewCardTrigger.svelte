<script>
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<LinkPreviewPrimitive.Trigger
	data-slot="preview-card-trigger"
	class={cn("cn-preview-card-trigger", className)}
	{...rest}
>
	{@render children?.()}
</LinkPreviewPrimitive.Trigger>
