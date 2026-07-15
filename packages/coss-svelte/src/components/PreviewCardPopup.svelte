<script lang="ts">
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof LinkPreviewPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
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
