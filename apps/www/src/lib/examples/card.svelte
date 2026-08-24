<script lang="ts">
import { CircleAlert } from "@lucide/svelte";
import {
	Button,
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardPanel,
	CardTitle,
	Field,
	FieldLabel,
	Form,
	Input,
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "coss-svelte";

const frameworkOptions = [
	{ label: "Next.js", value: "next" },
	{ label: "Vite", value: "vite" },
	{ label: "Remix", value: "remix" },
	{ label: "Astro", value: "astro" },
];
</script>

<Card class="w-full max-w-xs">
	<CardHeader>
		<CardTitle>Create project</CardTitle>
		<CardDescription>Deploy your new project in one-click.</CardDescription>
	</CardHeader>
	<CardPanel>
		<Form class="flex w-full flex-col gap-4">
			<Field>
				<FieldLabel>Name</FieldLabel>
				<Input placeholder="Name of your project" type="text" />
			</Field>
			<Field>
				<FieldLabel>Framework</FieldLabel>
				<Select value="next" options={frameworkOptions}>
					<SelectTrigger aria-label="Framework"><SelectValue /></SelectTrigger>
					<SelectPopup>
						{#each frameworkOptions as item}
							<SelectItem value={item.value} label={item.label}>{item.label}</SelectItem>
						{/each}
					</SelectPopup>
				</Select>
			</Field>
			<Button class="w-full" type="submit">Deploy</Button>
		</Form>
	</CardPanel>
	<CardFooter>
		<div class="flex gap-1 text-muted-foreground text-xs">
			<CircleAlert class="size-3 shrink-0" />
			<p>This will take a few seconds to complete.</p>
		</div>
	</CardFooter>
</Card>
