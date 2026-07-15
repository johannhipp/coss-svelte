<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../utils.js";

let { type = "button", class: className = "", children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
	data-slot="sidebar-group-action"
	data-sidebar="group-action"
	class={cn("cn-sidebar-group-action", className)}
	{type}
	{...rest}
>
	{@render children?.()}
</button>
