<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<AvatarPrimitive.Image
	data-slot="avatar-image"
	class={cn("cn-avatar-image", className)}
	{...rest}
/>
