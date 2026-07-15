<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps & { variant?: string; children?: Snippet };

let { variant = "neutral", class: className = "", children, ...rest }: Props = $props();
</script>

<span data-slot="badge" class={cn("cn-badge", `cn-badge-${variant}`, className)} {...rest}>
	{@render children?.()}
</span>
