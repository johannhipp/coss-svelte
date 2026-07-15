<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../utils.js";
import type { NativeProps } from "./props.js";

type Props = NativeProps & { as?: string; dataSlot?: string; children?: Snippet };

let { as = "div", dataSlot = "", class: className = "", children, ...rest }: Props = $props();
</script>

<svelte:element this={as} data-slot={dataSlot || undefined} class={cn(className)} {...rest}>
	{@render children?.()}
</svelte:element>
