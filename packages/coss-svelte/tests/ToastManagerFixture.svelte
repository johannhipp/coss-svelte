<script lang="ts">
import Button from "../src/components/Button.svelte";
import ToastProvider from "../src/components/ToastProvider.svelte";
import { toastManager } from "../src/toast-manager.js";
</script>

<ToastProvider>
	<Button
		variant="outline"
		onclick={() =>
			toastManager.add({
				title: "Event has been created",
				description: "Monday, January 3rd at 6:00pm",
			})}>Default Toast</Button
	>
</ToastProvider>
