<script lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "coss-svelte";
</script>

<Tabs value="tab-1">
	<TabsList>
		<TabsTrigger value="tab-1">Tab 1</TabsTrigger>
		<TabsTrigger value="tab-2">Tab 2</TabsTrigger>
		<TabsTrigger value="tab-3">Tab 3</TabsTrigger>
	</TabsList>
	<TabsContent value="tab-1">
		<p class="p-4 text-center text-muted-foreground text-xs">Tab 1 content</p>
	</TabsContent>
	<TabsContent value="tab-2">
		<p class="p-4 text-center text-muted-foreground text-xs">Tab 2 content</p>
	</TabsContent>
	<TabsContent value="tab-3">
		<p class="p-4 text-center text-muted-foreground text-xs">Tab 3 content</p>
	</TabsContent>
</Tabs>
