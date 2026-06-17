<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<span
	data-slot="drawer-create-handle"
	class={cn("cn-drawer-handle", className)}
	aria-hidden="true"
	{...rest}
></span>
