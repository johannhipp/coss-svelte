<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	title = "Saved",
	description = "",
	open = $bindable(true),
	dismissible = true,
	closeLabel = "Dismiss notification",
	ondismiss,
	class: className = "",
	children,
	...rest
}: NativeProps & {
	title?: string;
	description?: string;
	open?: boolean;
	dismissible?: boolean;
	closeLabel?: string;
	ondismiss?: () => void;
} = $props();

function dismiss() {
	open = false;
	ondismiss?.();
}
</script>

{#if open}
	<aside data-slot="toast" class={cn("cn-toast", className)} role="status" aria-live="polite" {...rest}>
		<strong>{title}</strong>
		{#if description}
			<p>{description}</p>
		{/if}
		{@render children?.()}
		{#if dismissible}
			<button class="cn-toast-close" type="button" aria-label={closeLabel} onclick={dismiss}>×</button>
		{/if}
	</aside>
{/if}
