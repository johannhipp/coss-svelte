<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AvatarPrimitive.Image>, "child">;
let { ref = $bindable(null), class: className = "", ...rest }: Props = $props();
</script>

<AvatarPrimitive.Image
	bind:ref
	data-slot="avatar-image"
	class={cn("cn-avatar-image", className)}
	{...rest}
/>
