<script lang="ts">
import OTPFieldCell, { type OTPFieldCellProps } from "./OTPFieldCell.svelte";

let { cell, children, ...rest }: OTPFieldCellProps = $props();
</script>

<OTPFieldCell data-slot="otp-field-input" {cell} {...rest}>
	{@render children?.()}
</OTPFieldCell>
