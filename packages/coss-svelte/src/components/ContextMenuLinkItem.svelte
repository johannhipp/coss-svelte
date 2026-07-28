<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type ContextMenuItemVariant = "default" | "destructive";
type AnchorProps = {
	href: string;
	target?: HTMLAnchorAttributes["target"];
	rel?: HTMLAnchorAttributes["rel"];
	download?: boolean | string;
	hreflang?: HTMLAnchorAttributes["hreflang"];
	referrerpolicy?: HTMLAnchorAttributes["referrerpolicy"];
};
type Props = Omit<
	ComponentProps<typeof ContextMenuPrimitive.Item>,
	"child" | "children" | "class" | "ref"
> &
	AnchorProps & {
		ref?: HTMLAnchorElement | null;
		inset?: boolean;
		variant?: ContextMenuItemVariant;
		class?: string;
		children?: Snippet;
	};

let {
	ref = $bindable(null),
	href,
	target,
	rel,
	download,
	hreflang,
	referrerpolicy,
	inset = false,
	variant = "default",
	class: className = "",
	children,
	...itemProps
}: Props = $props();
</script>

<ContextMenuPrimitive.Item
	{...itemProps}
	data-slot="context-menu-link-item"
	data-inset={inset ? "" : undefined}
	data-variant={variant}
	class={cn("cn-menu-item", className)}
>
	{#snippet child({ props })}
		<a
			bind:this={ref}
			{...props}
			{href}
			{target}
			{rel}
			{download}
			{hreflang}
			{referrerpolicy}
		>
			{@render children?.()}
		</a>
	{/snippet}
</ContextMenuPrimitive.Item>
