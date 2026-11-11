<script lang="ts">
import AlertDialog from "../src/components/AlertDialog.svelte";
import AlertDialogPopup from "../src/components/AlertDialogPopup.svelte";
import AlertDialogTitle from "../src/components/AlertDialogTitle.svelte";
import AlertDialogTrigger from "../src/components/AlertDialogTrigger.svelte";

let { cancelAutofocus = false }: { cancelAutofocus?: boolean } = $props();
</script>

<AlertDialog>
	<AlertDialogTrigger>Open alert</AlertDialogTrigger>
	<AlertDialogPopup
		forceMount
		preventScroll={false}
		portalProps={{ disabled: true }}
		onOpenAutoFocus={(event) => {
			if (cancelAutofocus) event.preventDefault();
		}}
	>
		<AlertDialogTitle>Alert</AlertDialogTitle>
	</AlertDialogPopup>
</AlertDialog>
