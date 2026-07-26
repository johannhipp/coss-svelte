<script lang="ts">
import { Bold, Italic, Underline } from "@lucide/svelte";
import { ToggleGroup, ToggleGroupItem } from "coss-svelte";
</script>

<ToggleGroup type="multiple" value={["bold"]}>
	<ToggleGroupItem aria-label="Toggle bold" value="bold"><Bold /></ToggleGroupItem>
	<ToggleGroupItem aria-label="Toggle italic" value="italic"><Italic /></ToggleGroupItem>
	<ToggleGroupItem aria-label="Toggle underline" value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>
