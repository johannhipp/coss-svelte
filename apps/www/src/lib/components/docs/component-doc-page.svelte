<script lang="ts">
import { Badge } from "coss-svelte";
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ComponentPreviewTabs from "$lib/components/docs/component-preview-tabs.svelte";
import CopyMarkdownButton from "$lib/components/docs/copy-markdown-button.svelte";
import DocsToc from "$lib/components/docs/docs-toc.svelte";

type ComponentPage = {
	category: string;
	description: string;
	firstImplementationPass?: string;
	foundation: string;
	href: string;
	imports: string[];
	name: string;
	particles: number;
	parts: string[];
	slug: string;
	status: string;
	statusLabel: string;
	title: string;
};

type TocItem = {
	href: string;
	title: string;
};

const scriptOpen = `<${"script"} lang="ts">`;
const scriptClose = `</${"script"}>`;

const previewUsageExamples: Record<string, string> = {
	"alert-dialog": `${scriptOpen}
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogPopup,
		AlertDialogTitle,
		AlertDialogTrigger,
	} from "coss-svelte";
${scriptClose}

<AlertDialog>
	<AlertDialogTrigger>Delete project</AlertDialogTrigger>
	<AlertDialogPopup>
		<AlertDialogHeader>
			<AlertDialogTitle>Delete project?</AlertDialogTitle>
			<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Delete</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogPopup>
</AlertDialog>`,
	button: `${scriptOpen}
	import { Button } from "coss-svelte";
${scriptClose}

<Button>Save changes</Button>
<Button variant="outline">Cancel</Button>`,
	card: `${scriptOpen}
	import { Button, Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "coss-svelte";
${scriptClose}

<Card>
	<CardHeader>
		<CardTitle>Workspace</CardTitle>
		<CardDescription>Configure billing and access.</CardDescription>
	</CardHeader>
	<CardPanel>3 members are active this week.</CardPanel>
	<CardFooter>
		<Button size="sm">Open settings</Button>
	</CardFooter>
</Card>`,
	command: `${scriptOpen}
	import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "coss-svelte";
${scriptClose}

<Command>
	<CommandInput placeholder="Search commands..." />
	<CommandList>
		<CommandGroup label="Actions">
			<CommandItem>Invite member</CommandItem>
			<CommandItem>Create project</CommandItem>
		</CommandGroup>
	</CommandList>
</Command>`,
	dialog: `${scriptOpen}
	import {
		Button,
		Dialog,
		DialogClose,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogPopup,
		DialogTitle,
		DialogTrigger,
	} from "coss-svelte";
${scriptClose}

<Dialog>
	<DialogTrigger>Edit profile</DialogTrigger>
	<DialogPopup>
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>Update the public details for this workspace.</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<DialogClose>Cancel</DialogClose>
			<Button type="submit">Save</Button>
		</DialogFooter>
	</DialogPopup>
</Dialog>`,
	drawer: `${scriptOpen}
	import { Button, Drawer, DrawerContent, DrawerFooter, DrawerPopup, DrawerTitle, DrawerTrigger } from "coss-svelte";
${scriptClose}

<Drawer>
	<DrawerTrigger>Open drawer</DrawerTrigger>
	<DrawerPopup>
		<DrawerTitle>Review changes</DrawerTitle>
		<DrawerContent>Confirm the settings before publishing.</DrawerContent>
		<DrawerFooter>
			<Button>Publish</Button>
		</DrawerFooter>
	</DrawerPopup>
</Drawer>`,
	form: `${scriptOpen}
	import { Button, Field, FieldError, FieldLabel, Form, Input } from "coss-svelte";
${scriptClose}

<Form>
	<Field>
		<FieldLabel>Email</FieldLabel>
		<Input type="email" placeholder="team@example.com" />
		<FieldError>Use a work email address.</FieldError>
	</Field>
	<Button type="submit">Submit</Button>
</Form>`,
	input: `${scriptOpen}
	import { Input } from "coss-svelte";
${scriptClose}

<Input aria-label="Project name" placeholder="Project name" />`,
	menu: `${scriptOpen}
	import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuShortcut, MenuTrigger } from "coss-svelte";
${scriptClose}

<Menu>
	<MenuTrigger>Open menu</MenuTrigger>
	<MenuPopup>
		<MenuItem>Rename <MenuShortcut>R</MenuShortcut></MenuItem>
		<MenuItem>Duplicate</MenuItem>
		<MenuSeparator />
		<MenuItem variant="destructive">Delete</MenuItem>
	</MenuPopup>
</Menu>`,
	popover: `${scriptOpen}
	import { Button, Input, Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "coss-svelte";
${scriptClose}

<Popover>
	<PopoverTrigger>Invite member</PopoverTrigger>
	<PopoverPopup>
		<PopoverTitle>Send invite</PopoverTitle>
		<PopoverDescription>Add an email address to invite a teammate.</PopoverDescription>
		<Input aria-label="Email" placeholder="name@example.com" />
		<Button size="sm" type="submit">Send</Button>
	</PopoverPopup>
</Popover>`,
	select: `${scriptOpen}
	import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue, SelectViewport } from "coss-svelte";
${scriptClose}

<Select value="editor">
	<SelectTrigger>
		<SelectValue placeholder="Select role" />
	</SelectTrigger>
	<SelectPopup>
		<SelectViewport>
			<SelectItem value="viewer">Viewer</SelectItem>
			<SelectItem value="editor">Editor</SelectItem>
			<SelectItem value="admin">Admin</SelectItem>
		</SelectViewport>
	</SelectPopup>
</Select>`,
	sheet: `${scriptOpen}
	import { Button, Sheet, SheetContent, SheetFooter, SheetPopup, SheetTitle, SheetTrigger } from "coss-svelte";
${scriptClose}

<Sheet side="right">
	<SheetTrigger>Open settings</SheetTrigger>
	<SheetPopup>
		<SheetTitle>Workspace settings</SheetTitle>
		<SheetContent>Review access, billing, and notification preferences.</SheetContent>
		<SheetFooter>
			<Button>Save changes</Button>
		</SheetFooter>
	</SheetPopup>
</Sheet>`,
	tabs: `${scriptOpen}
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "coss-svelte";
${scriptClose}

<Tabs value="overview">
	<TabsList>
		<TabsTrigger value="overview">Overview</TabsTrigger>
		<TabsTrigger value="activity">Activity</TabsTrigger>
	</TabsList>
	<TabsContent value="overview">Pipeline health and ownership.</TabsContent>
	<TabsContent value="activity">Recent changes from the team.</TabsContent>
</Tabs>`,
	tooltip: `${scriptOpen}
	import { Button, Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "coss-svelte";
${scriptClose}

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			<Button variant="outline">Export</Button>
		</TooltipTrigger>
		<TooltipPopup>Download a CSV report</TooltipPopup>
	</Tooltip>
</TooltipProvider>`,
};

let {
	next = null,
	page,
	previous = null,
	toc = [],
}: {
	next?: ComponentPage | null;
	page: ComponentPage;
	previous?: ComponentPage | null;
	toc?: TocItem[];
} = $props();

function createFallbackUsageCode(component: ComponentPage) {
	const imports = component.imports.join(", ");
	const primaryPart = component.parts[0];
	const body = primaryPart
		? `<${component.name}>
	<${primaryPart}>${component.title}</${primaryPart}>
</${component.name}>`
		: `<${component.name}>${component.title}</${component.name}>`;

	return `${scriptOpen}
	import { ${imports} } from "coss-svelte";
${scriptClose}

${body}`;
}

function createUsageCode(component: ComponentPage) {
	return previewUsageExamples[component.slug] ?? createFallbackUsageCode(component);
}

let usageCode = $derived(createUsageCode(page));
let importCode = $derived(`import { ${page.imports.join(", ")} } from "coss-svelte";`);
let markdown = $derived(`# ${page.title}

${page.description}

## Installation

\`\`\`bash
pnpm add coss-svelte bits-ui
\`\`\`

## Usage

\`\`\`ts
${importCode}
\`\`\`
`);
</script>

<div class="flex min-w-0 items-stretch">
	<article class="relative min-w-0 flex-1 py-5 lg:mt-8 lg:mr-4 lg:mb-8 lg:py-0">
		<div class="rounded-xl border border-border bg-card shadow-[0_8px_30px_rgb(0_0_0_/_0.035)]">
			<div class="px-4 py-6 sm:px-6 lg:p-8">
				<div class="mx-auto w-full max-w-3xl">
					<header class="mb-8 flex flex-col gap-2">
						<div class="flex flex-col gap-2">
							<div class="flex flex-wrap items-center gap-2">
								<h1
									class="scroll-m-20 font-heading font-semibold text-3xl text-foreground leading-tight xl:text-4xl"
								>
									{page.title}
								</h1>
								{#if page.status !== "stable"}
									<Badge variant={page.status === "experimental" ? "accent" : "secondary"}>
										{page.statusLabel}
									</Badge>
								{/if}
							</div>
							<p class="text-muted-foreground text-lg leading-7 sm:text-lg">{page.description}</p>
						</div>
						<div class="flex flex-wrap gap-2 pt-4">
							<CopyMarkdownButton {markdown} />
						</div>
					</header>

					<ComponentPreviewTabs slug={page.slug} title={page.title} code={usageCode} />

					<section id="installation" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Installation</h2>
						<p class="mb-4 text-muted-foreground leading-7">
							Install the local package, Bits UI peer primitives, and the shared COSS theme.
						</p>
						<CodeBlock language="bash" code="pnpm add coss-svelte bits-ui" />
					</section>

					<section id="usage" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Usage</h2>
						<p class="mb-4 text-muted-foreground leading-7">
							Import the Svelte component exports directly from the local package.
						</p>
						<CodeBlock language="ts" code={importCode} />
					</section>

					<section id="anatomy" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Anatomy</h2>
						{#if page.parts.length}
							<ul class="grid gap-2 sm:grid-cols-2">
								<li class="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
									{page.name}
								</li>
								{#each page.parts as part}
									<li class="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
										{part}
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-muted-foreground leading-7">
								{page.title} exposes a single component export for the current implementation.
							</p>
						{/if}
					</section>

					<section id="api-reference" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">API Reference</h2>
						<div class="grid gap-3 sm:grid-cols-2">
							<div class="rounded-lg border border-border bg-muted/30 p-4">
								<h3 class="mb-1 font-medium">Status</h3>
								<p class="text-muted-foreground text-sm">{page.statusLabel}</p>
							</div>
							<div class="rounded-lg border border-border bg-muted/30 p-4">
								<h3 class="mb-1 font-medium">Foundation</h3>
								<p class="text-muted-foreground text-sm">{page.foundation}</p>
							</div>
							<div class="rounded-lg border border-border bg-muted/30 p-4">
								<h3 class="mb-1 font-medium">Category</h3>
								<p class="text-muted-foreground text-sm">{page.category}</p>
							</div>
							<div class="rounded-lg border border-border bg-muted/30 p-4">
								<h3 class="mb-1 font-medium">Particles</h3>
								<p class="text-muted-foreground text-sm">{page.particles}</p>
							</div>
						</div>
					</section>

					{#if page.status !== "stable"}
						<section id="status" class="scroll-mt-20 border-border border-t py-8">
							<h2 class="mb-3 font-semibold text-2xl">Status</h2>
							<p class="text-muted-foreground leading-7">{page.firstImplementationPass}</p>
						</section>
					{/if}

					<nav
						class="mt-2 grid gap-3 border-border border-t pt-6 sm:grid-cols-2"
						aria-label="Component pagination"
					>
						{#if previous}
							<a class="rounded-lg border border-border p-4 no-underline hover:bg-muted/50" href={previous.href}>
								<span class="block text-muted-foreground text-sm">Previous</span>
								<span class="font-medium">{previous.title}</span>
							</a>
						{/if}
						{#if next}
							<a
								class="rounded-lg border border-border p-4 text-right no-underline hover:bg-muted/50 sm:col-start-2"
								href={next.href}
							>
								<span class="block text-muted-foreground text-sm">Next</span>
								<span class="font-medium">{next.title}</span>
							</a>
						{/if}
					</nav>
				</div>
			</div>
		</div>
	</article>

	<DocsToc items={toc} />
</div>
