<script lang="ts">
import { Label as LabelPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<LabelPrimitive.Root data-slot="label" class={cn("cn-label", className)} {...rest}>
	{@render children?.()}
</LabelPrimitive.Root>
