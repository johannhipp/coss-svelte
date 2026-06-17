<script>
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<LinkPreviewPrimitive.Portal>
	<LinkPreviewPrimitive.Content
		data-slot="preview-card-popup"
		class={cn("cn-preview-card", className)}
		{...rest}
	>
		{@render children?.()}
	</LinkPreviewPrimitive.Content>
</LinkPreviewPrimitive.Portal>
