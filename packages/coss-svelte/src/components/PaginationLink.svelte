<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps<HTMLAnchorElement> & {
	href?: string;
	isActive?: boolean;
	children?: Snippet;
};

let { class: className = "", isActive = false, children, ...rest }: Props = $props();
</script>

<a
	data-slot="pagination-link"
	data-active={isActive ? "true" : undefined}
	aria-current={isActive ? "page" : undefined}
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</a>
