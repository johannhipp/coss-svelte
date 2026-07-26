<script lang="ts">
import { Label as LabelPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof LabelPrimitive.Root>;

let { class: className = "", children, ...rest }: Props = $props();
</script>

<LabelPrimitive.Root data-slot="label" class={cn("cn-label", className)} {...rest}>
	{@render children?.()}
</LabelPrimitive.Root>
