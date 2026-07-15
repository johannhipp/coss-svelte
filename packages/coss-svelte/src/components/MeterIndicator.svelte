<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<span data-slot="meter-indicator" class={cn("cn-meter-indicator", className)} {...rest}></span>
