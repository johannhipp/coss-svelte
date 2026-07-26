<script lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "coss-svelte";
</script>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Component</TableHead>
			<TableHead>Status</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell>Tabs</TableCell>
			<TableCell>Stable</TableCell>
		</TableRow>
		<TableRow>
			<TableCell>Tooltip</TableCell>
			<TableCell>Stable</TableCell>
		</TableRow>
	</TableBody>
</Table>
