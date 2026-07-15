<script lang="ts">
import { Avatar as AvatarPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AvatarPrimitive.Fallback
	data-slot="avatar-fallback"
	class={cn("cn-avatar-fallback", className)}
	{...rest}
>
	{@render children?.()}
</AvatarPrimitive.Fallback>
