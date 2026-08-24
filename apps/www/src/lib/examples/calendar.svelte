<script lang="ts">
import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "coss-svelte";

let value = $state(today(getLocalTimeZone()));
</script>

<Calendar bind:value />
