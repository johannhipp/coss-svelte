<script lang="ts">
import Toast from "../src/components/Toast.svelte";

let open = $state(true);
</script>

<Toast bind:open title="Saved" description="Your changes are safe." />
