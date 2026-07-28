<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type Props = Omit<HTMLAttributes<HTMLElement>, "children"> & {
	class?: string;
	ref?: HTMLElement | null;
	children?: Snippet;
};
let { class: className = "", ref = $bindable(null), children, ...rest }: Props = $props();
</script>

<kbd
	{...rest}
	bind:this={ref}
	data-slot="context-menu-shortcut"
	class={cn("cn-menu-shortcut", className)}
>
	{@render children?.()}
</kbd>
