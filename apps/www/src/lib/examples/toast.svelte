<script lang="ts">
import { Button, ToastProvider, toastManager } from "coss-svelte";
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
