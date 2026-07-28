<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AvatarPrimitive.Root>, "children" | "child"> & {
	src?: string;
	alt?: string;
	fallback?: string;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	loadingStatus = $bindable("loading"),
	src = "",
	alt = "",
	fallback = "",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<AvatarPrimitive.Root
	bind:ref
	bind:loadingStatus
	data-slot="avatar"
	class={cn("cn-avatar", className)}
	{...rest}
>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		{#if src}
			<AvatarPrimitive.Image data-slot="avatar-image" class="cn-avatar-image" {src} {alt} />
		{/if}
		<AvatarPrimitive.Fallback data-slot="avatar-fallback" class="cn-avatar-fallback">
			{fallback || alt || "?"}
		</AvatarPrimitive.Fallback>
	{/if}
</AvatarPrimitive.Root>
