<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { setSidebarContext } from "../internal/sidebar-context.svelte.js";
import { cn } from "../utils.js";

let {
	defaultOpen = true,
	open = $bindable(defaultOpen),
	class: className = "",
	children,
	...rest
}: NativeProps & { defaultOpen?: boolean; open?: boolean; children?: Snippet } = $props();

let state = $derived(open ? "expanded" : "collapsed");

function toggle() {
	open = !open;
}

setSidebarContext({
	get open() {
		return open;
	},
	toggle,
});
</script>

<div
	data-slot="sidebar-wrapper"
	data-state={state}
	data-sidebar-state={state}
	class={cn("cn-sidebar-wrapper", className)}
	{...rest}
>
	{@render children?.()}
</div>
