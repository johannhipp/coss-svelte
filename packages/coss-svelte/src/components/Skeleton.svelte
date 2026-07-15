<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<div data-slot="skeleton" class={cn("cn-skeleton", className)} aria-hidden="true" {...rest}></div>
