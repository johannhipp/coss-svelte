<script lang="ts">
import Tabs from "../src/components/Tabs.svelte";
import TabsContent from "../src/components/TabsContent.svelte";
import TabsList from "../src/components/TabsList.svelte";
import TabsTrigger from "../src/components/TabsTrigger.svelte";
</script>

<Tabs value="first">
	<TabsList>
		<TabsTrigger value="first">First</TabsTrigger>
		<TabsTrigger value="second">Second</TabsTrigger>
	</TabsList>
	<TabsContent value="first">Compound first</TabsContent>
	<TabsContent value="second">Compound second</TabsContent>
</Tabs>
