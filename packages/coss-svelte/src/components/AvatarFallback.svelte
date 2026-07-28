<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AvatarPrimitive.Fallback>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	data-slot="avatar-fallback"
	class={cn("cn-avatar-fallback", className)}
	{...rest}
>
	{@render children?.()}
</AvatarPrimitive.Fallback>
