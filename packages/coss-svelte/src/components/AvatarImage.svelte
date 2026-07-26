<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof AvatarPrimitive.Image>;
let { class: className = "", ...rest }: Props = $props();
</script>

<AvatarPrimitive.Image
	data-slot="avatar-image"
	class={cn("cn-avatar-image", className)}
	{...rest}
/>
