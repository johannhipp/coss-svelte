<script lang="ts">
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof LinkPreviewPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof LinkPreviewPrimitive.Content>, "children" | "child"> & {
	portalProps?: PortalOptions;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<LinkPreviewPrimitive.Portal {...portalProps}>
	<LinkPreviewPrimitive.Content
	bind:ref
		data-slot="preview-card-popup"
		class={cn("cn-preview-card", className)}
		{...rest}
	>
		{@render children?.()}
	</LinkPreviewPrimitive.Content>
</LinkPreviewPrimitive.Portal>
