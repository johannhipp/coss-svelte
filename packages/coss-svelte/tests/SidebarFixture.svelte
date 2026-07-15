<script lang="ts">
import Sidebar from "../src/components/Sidebar.svelte";
import SidebarProvider from "../src/components/SidebarProvider.svelte";
import SidebarTrigger from "../src/components/SidebarTrigger.svelte";
</script>

<SidebarProvider>
	{#snippet children()}
		<Sidebar>
			{#snippet children()}
				<nav aria-label="Primary"><a href="/">Home</a></nav>
			{/snippet}
		</Sidebar>
		<SidebarTrigger />
	{/snippet}
</SidebarProvider>
