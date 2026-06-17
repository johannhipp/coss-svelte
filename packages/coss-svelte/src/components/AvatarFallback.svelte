<script>
import { Avatar as AvatarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AvatarPrimitive.Fallback
	data-slot="avatar-fallback"
	class={cn("cn-avatar-fallback", className)}
	{...rest}
>
	{@render children?.()}
</AvatarPrimitive.Fallback>
