<script lang="ts">
import { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof LinkPreviewPrimitive.Root>, "children" | "child"> & {
	href?: string;
	label?: string;
	title?: string;
	description?: string;
	class?: string;
	children?: Snippet;
};

let {
	open = $bindable(false),
	href = "#",
	label = "Preview",
	title = "Preview",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<LinkPreviewPrimitive.Root bind:open {...rest}>
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
