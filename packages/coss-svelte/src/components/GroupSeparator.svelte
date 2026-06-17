<script>
import { cn } from "../utils.js";

let { orientation = "vertical", class: className = "", ...rest } = $props();
</script>

<span
	data-slot="group-separator"
	data-orientation={orientation}
	class={cn("cn-group-separator", className)}
	aria-hidden="true"
	{...rest}
></span>
