<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<form data-slot="form" class={cn("cn-form", className)} {...rest}>
	{@render children?.()}
</form>
