<script lang="ts">
import { Breadcrumb } from "coss-svelte";
</script>

<Breadcrumb
	items={[
		{ label: "Home", href: "/" },
		{ ellipsis: true },
		{ label: "Components", href: "/docs/components/accordion" },
		"Breadcrumb",
	]}
/>
