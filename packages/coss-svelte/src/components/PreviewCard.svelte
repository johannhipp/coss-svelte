<script>
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	href = "#",
	label = "Preview",
	title = "Preview",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<LinkPreviewPrimitive.Root {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<LinkPreviewPrimitive.Trigger data-slot="preview-card-trigger" class="cn-preview-card-trigger" {href}>
			{label}
		</LinkPreviewPrimitive.Trigger>
		<LinkPreviewPrimitive.Portal>
			<LinkPreviewPrimitive.Content data-slot="preview-card-popup" class={cn("cn-preview-card", className)}>
				<h3>{title}</h3>
				{#if description}
					<p>{description}</p>
				{/if}
			</LinkPreviewPrimitive.Content>
		</LinkPreviewPrimitive.Portal>
	{/if}
</LinkPreviewPrimitive.Root>
