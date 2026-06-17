<script>
import { Avatar as AvatarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<AvatarPrimitive.Image
	data-slot="avatar-image"
	class={cn("cn-avatar-image", className)}
	{...rest}
/>
