<script lang="ts">
import { Input, Label } from "coss-svelte";
</script>

<div class="grid w-full max-w-sm gap-2">
	<Label for="label-email">Email address</Label>
	<Input id="label-email" type="email" placeholder="you@example.com" />
</div>
