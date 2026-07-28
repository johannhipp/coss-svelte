<script lang="ts">
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof LinkPreviewPrimitive.Trigger>, "children" | "child"> & {
	children?: Snippet;
};

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<LinkPreviewPrimitive.Trigger
	bind:ref
	data-slot="preview-card-trigger"
	class={cn("cn-preview-card-trigger", className)}
	{...rest}
>
	{@render children?.()}
</LinkPreviewPrimitive.Trigger>
