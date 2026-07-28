<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type Props = Omit<HTMLAttributes<HTMLElement>, "children"> & {
	class?: string;
	children?: Snippet;
};
let { class: className = "", children, ...rest }: Props = $props();
</script>

<kbd
	data-slot="context-menu-shortcut"
	class={cn("cn-menu-shortcut", className)}
	{...rest}
>
	{@render children?.()}
</kbd>
