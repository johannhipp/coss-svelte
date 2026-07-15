<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps<HTMLElement> & {
	legend?: string;
	description?: string;
	children?: Snippet;
};

let { legend = "", description = "", class: className = "", children, ...rest }: Props = $props();
</script>

<fieldset data-slot="fieldset" class={cn("cn-fieldset", className)} {...rest}>
	{#if legend}
		<legend class="cn-fieldset-legend">{legend}</legend>
	{/if}
	{#if description}
		<p class="cn-fieldset-description">{description}</p>
	{/if}
	{@render children?.()}
</fieldset>
