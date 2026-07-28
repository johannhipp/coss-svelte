<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Input>, "children" | "child"> & {
	value?: string;
	class?: string;
};

let {
	ref = $bindable(null),
	value = $bindable(""),
	class: className = "",
	...rest
}: Props = $props();
</script>

<span data-slot="command-input-group" class="cn-command-input-group">
	<span data-slot="command-icon" class="cn-command-input-icon" aria-hidden="true">
		<svg
			aria-hidden="true"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-3.5-3.5" />
		</svg>
	</span>
	<CommandPrimitive.Input
	bind:ref
		data-slot="command-input"
		class={cn("cn-command-input", className)}
		bind:value
		{...rest}
	/>
</span>
