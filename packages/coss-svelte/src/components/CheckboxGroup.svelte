<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps<HTMLElement> & { label?: string; children?: Snippet };

let { label = "", class: className = "", children, ...rest }: Props = $props();
</script>

<fieldset data-slot="checkbox-group" class={cn("cn-choice-group", className)} {...rest}>
	{#if label}
		<legend>{label}</legend>
	{/if}
	<div class="cn-choice-stack">
		{@render children?.()}
	</div>
</fieldset>
