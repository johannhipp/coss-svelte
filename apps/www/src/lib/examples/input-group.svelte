<script lang="ts">
import { Search } from "@lucide/svelte";
import { InputGroup, InputGroupAddon, InputGroupInput } from "coss-svelte";
</script>

<InputGroup class="w-full max-w-sm">
	<InputGroupInput aria-label="Search" placeholder="Search" type="search" />
	<InputGroupAddon>
		<Search aria-hidden="true" />
	</InputGroupAddon>
</InputGroup>
