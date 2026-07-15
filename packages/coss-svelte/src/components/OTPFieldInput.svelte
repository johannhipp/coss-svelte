<script lang="ts">
import type { ComponentProps, Snippet } from "svelte";
import OTPFieldCell from "./OTPFieldCell.svelte";

type Props = ComponentProps<typeof OTPFieldCell>;
let { cell, children, ...rest }: Props = $props();
</script>

<OTPFieldCell data-slot="otp-field-input" {cell} {...rest}>
	{@render children?.()}
</OTPFieldCell>
