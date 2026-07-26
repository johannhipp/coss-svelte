<script lang="ts">
import Meter from "../src/components/Meter.svelte";
import MeterIndicator from "../src/components/MeterIndicator.svelte";
import MeterTrack from "../src/components/MeterTrack.svelte";
import MeterValue from "../src/components/MeterValue.svelte";
</script>

<Meter value={75}>
	<MeterValue />
	<MeterTrack><MeterIndicator /></MeterTrack>
</Meter>
