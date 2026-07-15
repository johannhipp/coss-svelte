<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps & { orientation?: "horizontal" | "vertical" };

let { orientation = "vertical", class: className = "", ...rest }: Props = $props();
</script>

<span
	data-slot="toolbar-separator"
	data-orientation={orientation}
	class={cn("cn-toolbar-separator", className)}
	aria-hidden="true"
	{...rest}
></span>
