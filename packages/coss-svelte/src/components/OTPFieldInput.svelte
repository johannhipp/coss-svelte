<script>
import OTPFieldCell from "./OTPFieldCell.svelte";

let { children, ...rest } = $props();
</script>

<OTPFieldCell data-slot="otp-field-input" {...rest}>
	{@render children?.()}
</OTPFieldCell>
