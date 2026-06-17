<script>
import { cn } from "../utils.js";

let { orientation = "vertical", class: className = "", ...rest } = $props();
</script>

<span
	data-slot="toolbar-separator"
	data-orientation={orientation}
	class={cn("cn-toolbar-separator", className)}
	aria-hidden="true"
	{...rest}
></span>
