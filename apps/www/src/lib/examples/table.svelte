<script lang="ts">
import {
	Badge,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "coss-svelte";

const projects = [
	{ budget: "$12,500", dot: "bg-emerald-500", name: "Website Redesign", status: "Paid", team: "Frontend Team" },
	{ budget: "$8,750", dot: "bg-muted-foreground/64", name: "Mobile App", status: "Unpaid", team: "Mobile Team" },
	{ budget: "$5,200", dot: "bg-amber-500", name: "API Integration", status: "Pending", team: "Backend Team" },
	{ budget: "$3,800", dot: "bg-emerald-500", name: "Database Migration", status: "Paid", team: "DevOps Team" },
	{ budget: "$7,200", dot: "bg-emerald-500", name: "User Dashboard", status: "Paid", team: "UX Team" },
	{ budget: "$2,100", dot: "bg-red-500", name: "Security Audit", status: "Failed", team: "Security Team" },
];
</script>

<Table>
	<TableCaption>A list of current projects.</TableCaption>
	<TableHeader>
		<TableRow>
			<TableHead>Project</TableHead>
			<TableHead>Status</TableHead>
			<TableHead>Team</TableHead>
			<TableHead class="text-right">Budget</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each projects as project (project.name)}
			<TableRow>
				<TableCell class="font-medium">{project.name}</TableCell>
				<TableCell>
					<Badge variant="outline">
						<span aria-hidden="true" class={`size-1.5 rounded-full ${project.dot}`}></span>
						{project.status}
					</Badge>
				</TableCell>
				<TableCell>{project.team}</TableCell>
				<TableCell class="text-right">{project.budget}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
	<TableFooter>
		<TableRow>
			<TableCell colspan={3}>Total Budget</TableCell>
			<TableCell class="text-right">$39,550</TableCell>
		</TableRow>
	</TableFooter>
</Table>
