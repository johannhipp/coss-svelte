<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLFormAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type Props = Omit<HTMLFormAttributes, "id"> & {
	class?: string;
	id?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<form data-slot="form" class={cn("cn-form", className)} {...rest}>
	{@render children?.()}
</form>
