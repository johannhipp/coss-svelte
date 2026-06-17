<script>
import { Avatar as AvatarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	src = "",
	alt = "",
	fallback = "",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<AvatarPrimitive.Root data-slot="avatar" class={cn("cn-avatar", className)} {...rest}>
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
