<script lang="ts">
import type { Snippet } from "svelte";
import { type ToastData, toastManager } from "../toast-manager.js";
import Toast from "./Toast.svelte";

type Props = {
	children?: Snippet;
};

let { children }: Props = $props();
let toasts = $state<ToastData[]>([]);

$effect(() => toastManager.subscribe((current) => (toasts = current)));
</script>

{@render children?.()}

{#if toasts.length > 0}
	<div class="cn-toast-viewport" data-slot="toast-viewport" aria-label="Notifications">
		{#each toasts as toast (toast.id)}
			<Toast
				title={toast.title}
				description={toast.description}
				dismissible={toast.dismissible}
				ondismiss={() => toastManager.close(toast.id)}
			/>
		{/each}
	</div>
{/if}
