<script lang="ts">
import { Label as LabelPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof LabelPrimitive.Root>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<LabelPrimitive.Root bind:ref data-slot="label" class={cn("cn-label", className)} {...rest}>
	{@render children?.()}
</LabelPrimitive.Root>
