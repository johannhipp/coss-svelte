<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps & { label?: string };

let { label = "Loading", class: className = "", ...rest }: Props = $props();
</script>

<span data-slot="spinner" class={cn("cn-spinner", className)} role="status" {...rest}>
	<span class="cn-sr-only">{label}</span>
</span>
