const scriptOpen = `<${"script"} lang="ts">`;
const scriptClose = `</${"script"}>`;
/** @param {string} value */
const indent = (value) => value.replace(/^/gm, "\t");

const fruitOptions = `const fruitOptions = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Orange", value: "orange" },
	{ label: "Grape", value: "grape" },
	{ label: "Strawberry", value: "strawberry" },
	{ label: "Mango", value: "mango" },
	{ label: "Pineapple", value: "pineapple" },
	{ label: "Kiwi", value: "kiwi" },
	{ label: "Peach", value: "peach" },
	{ label: "Pear", value: "pear" },
];`;

const basicOptions = `const basicOptions = [
	{ label: "Next.js", value: "next" },
	{ label: "SvelteKit", value: "sveltekit" },
	{ label: "Astro", value: "astro" },
];`;

/** @type {Record<string, string>} */
export const previewUsageExamples = {
	accordion: `${scriptOpen}
	import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from "coss-svelte";
${scriptClose}

<Accordion type="single" value="project" class="w-full">
	<AccordionItem value="base-ui">
		<AccordionHeader>
			<AccordionTrigger>What is Base UI?</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent>
			Base UI is a library of high-quality unstyled React components for design systems and web apps.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="getting-started">
		<AccordionHeader>
			<AccordionTrigger>How do I get started?</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent>
			Head to the "Quick start" guide in the docs. If you've used unstyled libraries before, you'll feel at home.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="project">
		<AccordionHeader>
			<AccordionTrigger>Can I use it for my project?</AccordionTrigger>
		</AccordionHeader>
		<AccordionContent>Of course! Base UI is free and open source.</AccordionContent>
	</AccordionItem>
</Accordion>`,
	alert: `${scriptOpen}
	import { Alert, AlertDescription, AlertTitle } from "coss-svelte";
${scriptClose}

<Alert>
	<AlertTitle>Heads up!</AlertTitle>
	<AlertDescription>Describe what can be done about it here.</AlertDescription>
</Alert>`,
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
	<AlertDialogTrigger class="cn-button-destructive-outline">Delete Account</AlertDialogTrigger>
	<AlertDialogPopup>
		<AlertDialogHeader>
			<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Delete Account</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogPopup>
</AlertDialog>`,
	autocomplete: `${scriptOpen}
	import {
		Autocomplete,
		AutocompleteCollection,
		AutocompleteEmpty,
		AutocompleteInput,
		AutocompleteItem,
		AutocompleteList,
		AutocompletePopup,
	} from "coss-svelte";

${indent(fruitOptions)}
${scriptClose}

<Autocomplete options={fruitOptions}>
	<AutocompleteInput aria-label="Search items" placeholder="Search items…" />
	<AutocompletePopup>
		<AutocompleteEmpty>No items found.</AutocompleteEmpty>
		<AutocompleteList>
			<AutocompleteCollection>
				{#each fruitOptions as option}
					<AutocompleteItem value={option.value} label={option.label}>
						{option.label}
					</AutocompleteItem>
				{/each}
			</AutocompleteCollection>
		</AutocompleteList>
	</AutocompletePopup>
</Autocomplete>`,
	avatar: `${scriptOpen}
	import { Avatar, AvatarFallback } from "coss-svelte";
${scriptClose}

<Avatar aria-label="coss-svelte">
	<AvatarFallback>coss</AvatarFallback>
</Avatar>`,
	badge: `${scriptOpen}
	import { Badge } from "coss-svelte";
${scriptClose}

<Badge>Badge</Badge>`,
	breadcrumb: `${scriptOpen}
	import { Breadcrumb } from "coss-svelte";

	const breadcrumbItems = [
		{ label: "Home", href: "/docs/introduction" },
		{ ellipsis: true },
		{ label: "Components", href: "/docs/components/badge" },
		{ label: "Breadcrumb" },
	];
${scriptClose}

<Breadcrumb items={breadcrumbItems} />`,
	button: `${scriptOpen}
	import { Button } from "coss-svelte";
${scriptClose}

<Button>Button</Button>`,
	calendar: `${scriptOpen}
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "coss-svelte";

	let calendarPreviewDate = $state(today(getLocalTimeZone()));
${scriptClose}

<Calendar bind:value={calendarPreviewDate} />`,
	card: `${scriptOpen}
	import { Button, Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "coss-svelte";
${scriptClose}

<Card class="w-full max-w-sm">
	<CardHeader>
		<CardTitle>Card</CardTitle>
		<CardDescription>A compact content surface.</CardDescription>
	</CardHeader>
	<CardPanel>
		<p>Panel content keeps body text separate from actions.</p>
	</CardPanel>
	<CardFooter>
		<Button size="sm" variant="secondary">Continue</Button>
	</CardFooter>
</Card>`,
	checkbox: `${scriptOpen}
	import { Checkbox } from "coss-svelte";
${scriptClose}

<Checkbox label="Accept terms and conditions" />`,
	"checkbox-group": `${scriptOpen}
	import { Checkbox, CheckboxGroup, Label } from "coss-svelte";
${scriptClose}

<CheckboxGroup aria-label="Select frameworks">
	<Label>
		<Checkbox value="next" checked />
		Next.js
	</Label>
	<Label>
		<Checkbox value="vite" />
		Vite
	</Label>
	<Label>
		<Checkbox value="astro" />
		Astro
	</Label>
</CheckboxGroup>`,
	collapsible: `${scriptOpen}
	import { ChevronDown } from "@lucide/svelte";
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "coss-svelte";
${scriptClose}

<Collapsible>
	<CollapsibleTrigger>
		Show recovery keys
		<ChevronDown aria-hidden="true" size={16} />
	</CollapsibleTrigger>
	<CollapsibleContent>
		<ul class="cn-recovery-list">
			<li>4829-1735-6621</li>
			<li>9182-6407-5532</li>
			<li>3051-7924-9018</li>
		</ul>
	</CollapsibleContent>
</Collapsible>`,
	combobox: `${scriptOpen}
	import {
		Combobox,
		ComboboxCollection,
		ComboboxEmpty,
		ComboboxInput,
		ComboboxItem,
		ComboboxList,
		ComboboxPopup,
	} from "coss-svelte";

${indent(fruitOptions)}
${scriptClose}

<Combobox options={fruitOptions}>
	<ComboboxInput aria-label="Select a item" placeholder="Select a item…" />
	<ComboboxPopup>
		<ComboboxEmpty>No items found.</ComboboxEmpty>
		<ComboboxList>
			<ComboboxCollection>
				{#each fruitOptions as option}
					<ComboboxItem value={option.value} label={option.label}>
						{option.label}
					</ComboboxItem>
				{/each}
			</ComboboxCollection>
		</ComboboxList>
	</ComboboxPopup>
</Combobox>`,
	command: `${scriptOpen}
	import { ArrowDown, ArrowUp, CornerDownLeft } from "@lucide/svelte";
	import {
		Command,
		CommandCollection,
		CommandDialog,
		CommandDialogPopup,
		CommandDialogTrigger,
		CommandEmpty,
		CommandFooter,
		CommandGroup,
		CommandGroupLabel,
		CommandInput,
		CommandItem,
		CommandList,
		CommandPanel,
		CommandSeparator,
		CommandShortcut,
		Kbd,
	} from "coss-svelte";

	let commandDialogOpen = $state(false);

	const commandGroups = [
		{
			items: [
				{ label: "Linear", shortcut: "⌘L", value: "linear" },
				{ label: "Figma", shortcut: "⌘F", value: "figma" },
				{ label: "Slack", shortcut: "⌘S", value: "slack" },
				{ label: "YouTube", shortcut: "⌘Y", value: "youtube" },
				{ label: "Raycast", shortcut: "⌘R", value: "raycast" },
			],
			value: "Suggestions",
		},
		{
			items: [
				{ label: "Clipboard History", shortcut: "⌘⇧C", value: "clipboard-history" },
				{ label: "Import Extension", shortcut: "⌘I", value: "import-extension" },
				{ label: "Create Snippet", shortcut: "⌘N", value: "create-snippet" },
				{ label: "System Preferences", shortcut: "⌘,", value: "system-preferences" },
				{ label: "Window Management", shortcut: "⌘⇧W", value: "window-management" },
			],
			value: "Commands",
		},
	];
${scriptClose}

<CommandDialog bind:open={commandDialogOpen}>
	<CommandDialogTrigger class="cn-command-demo-trigger">
		Open Command Palette
		<span class="cn-kbd-group">
			<Kbd>⌘</Kbd>
			<Kbd>J</Kbd>
		</span>
	</CommandDialogTrigger>
	<CommandDialogPopup>
		<Command>
			<CommandInput placeholder="Search for apps and commands..." />
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandList>
				<CommandPanel>
					{#each commandGroups as group}
						<CommandGroup>
							<CommandGroupLabel>{group.value}</CommandGroupLabel>
							<CommandCollection>
								{#each group.items as item}
									<CommandItem value={item.value}>
										<span class="flex-1">{item.label}</span>
										<CommandShortcut>{item.shortcut}</CommandShortcut>
									</CommandItem>
								{/each}
							</CommandCollection>
						</CommandGroup>
						<CommandSeparator />
					{/each}
				</CommandPanel>
			</CommandList>
			<CommandFooter class="cn-command-demo-footer">
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2">
						<span class="cn-kbd-group">
							<Kbd><ArrowUp aria-hidden="true" size={12} /></Kbd>
							<Kbd><ArrowDown aria-hidden="true" size={12} /></Kbd>
						</span>
						<span>Navigate</span>
					</div>
					<div class="flex items-center gap-2">
						<Kbd><CornerDownLeft aria-hidden="true" size={12} /></Kbd>
						<span>Open</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<Kbd>Esc</Kbd>
					<span>Close</span>
				</div>
			</CommandFooter>
		</Command>
	</CommandDialogPopup>
</CommandDialog>`,
	"date-picker": `${scriptOpen}
	import { DatePicker } from "coss-svelte";
${scriptClose}

<DatePicker label="Pick a date" class="cn-date-picker-demo" />`,
	dialog: `${scriptOpen}
	import {
		Button,
		Dialog,
		DialogClose,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogPanel,
		DialogPopup,
		DialogTitle,
		DialogTrigger,
		Field,
		FieldLabel,
		Form,
		Input,
	} from "coss-svelte";
${scriptClose}

<Dialog>
	<DialogTrigger>Open Dialog</DialogTrigger>
	<DialogPopup class="sm:max-w-sm">
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>
				Make changes to your profile here. Click save when you're done.
			</DialogDescription>
		</DialogHeader>
		<Form class="contents">
			<DialogPanel class="grid gap-4">
				<Field>
					<FieldLabel>Name</FieldLabel>
					<Input type="text" value="Margaret Welsh" />
				</Field>
				<Field>
					<FieldLabel>Username</FieldLabel>
					<Input type="text" value="@maggie.welsh" />
				</Field>
			</DialogPanel>
			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<Button type="submit">Save</Button>
			</DialogFooter>
		</Form>
	</DialogPopup>
</Dialog>`,
	drawer: `${scriptOpen}
	import {
		Drawer,
		DrawerClose,
		DrawerCreateHandle,
		DrawerDescription,
		DrawerFooter,
		DrawerHeader,
		DrawerPopup,
		DrawerTitle,
		DrawerTrigger,
	} from "coss-svelte";
${scriptClose}

<Drawer>
	<DrawerTrigger>Open drawer</DrawerTrigger>
	<DrawerPopup>
		<DrawerCreateHandle />
		<DrawerHeader class="text-center">
			<DrawerTitle>Notifications</DrawerTitle>
			<DrawerDescription>This is the description of the drawer.</DrawerDescription>
		</DrawerHeader>
		<DrawerFooter>
			<DrawerClose>Close</DrawerClose>
		</DrawerFooter>
	</DrawerPopup>
</Drawer>`,
	empty: `${scriptOpen}
	import { BookOpen, Route } from "@lucide/svelte";
	import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "coss-svelte";
${scriptClose}

<Empty>
	<EmptyHeader>
		<EmptyMedia variant="icon">
			<Route aria-hidden="true" size={24} strokeWidth={2} />
		</EmptyMedia>
		<EmptyTitle>No upcoming meetings</EmptyTitle>
		<EmptyDescription>Create a meeting to get started.</EmptyDescription>
	</EmptyHeader>
	<EmptyContent>
		<div class="flex gap-2">
			<Button size="sm">Create meeting</Button>
			<Button size="sm" variant="outline">
				<BookOpen aria-hidden="true" size={16} />
				View docs
			</Button>
		</div>
	</EmptyContent>
</Empty>`,
	field: `${scriptOpen}
	import { Field, FieldDescription, FieldLabel, Input } from "coss-svelte";
${scriptClose}

<Field class="w-full max-w-64">
	<FieldLabel>Name</FieldLabel>
	<Input placeholder="Enter your name" type="text" />
	<FieldDescription>Visible on your profile</FieldDescription>
</Field>`,
	fieldset: `${scriptOpen}
	import { Field, FieldDescription, FieldLabel, Fieldset, FieldsetLegend, Input } from "coss-svelte";
${scriptClose}

<Fieldset class="w-full max-w-64">
	<FieldsetLegend>Billing Details</FieldsetLegend>
	<Field>
		<FieldLabel>Company</FieldLabel>
		<Input placeholder="Enter company name" type="text" />
		<FieldDescription>The name that will appear on invoices.</FieldDescription>
	</Field>
	<Field>
		<FieldLabel>Tax ID</FieldLabel>
		<Input placeholder="Enter tax identification number" type="text" />
		<FieldDescription>Your business tax identification number.</FieldDescription>
	</Field>
</Fieldset>`,
	form: `${scriptOpen}
	import { Button, Field, FieldLabel, Form, Input } from "coss-svelte";
${scriptClose}

<Form class="w-full max-w-64">
	<Field>
		<FieldLabel for="form-email">Email</FieldLabel>
		<Input id="form-email" name="email" placeholder="you@example.com" type="email" />
	</Field>
	<Button type="button" class="w-full">Submit</Button>
</Form>`,
	frame: `${scriptOpen}
	import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "coss-svelte";
${scriptClose}

<Frame class="w-full max-w-sm">
	<FrameHeader>
		<FrameTitle>Section header</FrameTitle>
		<FrameDescription>Brief description about the section</FrameDescription>
	</FrameHeader>
	<FramePanel>
		<h2 class="font-semibold text-sm">Section title</h2>
		<p class="text-muted-foreground text-sm">Section description</p>
	</FramePanel>
	<FrameFooter>
		<p class="text-muted-foreground text-sm">Footer</p>
	</FrameFooter>
</Frame>`,
	group: `${scriptOpen}
	import { Archive, Edit, Ellipsis, Files, Film, Share, Trash } from "@lucide/svelte";
	import { Button, Group, GroupSeparator, Menu, MenuItem, MenuPopup, MenuTrigger } from "coss-svelte";
${scriptClose}

<Group aria-label="File actions">
	<Button variant="outline">
		<Files aria-hidden="true" size={16} />
		Files
	</Button>
	<GroupSeparator />
	<Button variant="outline">
		<Film aria-hidden="true" size={16} />
		Media
	</Button>
	<GroupSeparator />
	<Menu>
		<MenuTrigger aria-label="Menu" class="cn-button cn-button-outline cn-button-icon">
			<Ellipsis aria-hidden="true" size={16} />
		</MenuTrigger>
		<MenuPopup align="end">
			<MenuItem><Edit aria-hidden="true" size={16} />Edit</MenuItem>
			<MenuItem><Archive aria-hidden="true" size={16} />Archive</MenuItem>
			<MenuItem><Share aria-hidden="true" size={16} />Share</MenuItem>
			<MenuItem variant="destructive"><Trash aria-hidden="true" size={16} />Delete</MenuItem>
		</MenuPopup>
	</Menu>
</Group>`,
	input: `${scriptOpen}
	import { Input } from "coss-svelte";
${scriptClose}

<Input aria-label="Text" class="w-64" placeholder="Enter text" />`,
	"input-group": `${scriptOpen}
	import { Search } from "@lucide/svelte";
	import { InputGroup, InputGroupAddon, InputGroupInput } from "coss-svelte";
${scriptClose}

<div class="w-64">
	<InputGroup>
		<InputGroupInput aria-label="Search" placeholder="Search" type="search" />
		<InputGroupAddon>
			<Search aria-hidden="true" size={16} strokeWidth={2.1} />
		</InputGroupAddon>
	</InputGroup>
</div>`,
	kbd: `${scriptOpen}
	import { Kbd } from "coss-svelte";
${scriptClose}

<Kbd>Cmd K</Kbd>`,
	label: `${scriptOpen}
	import { Input, Label } from "coss-svelte";
${scriptClose}

<div class="grid gap-2">
	<Label for="label-preview">Email</Label>
	<Input id="label-preview" placeholder="jane@example.com" />
</div>`,
	menu: `${scriptOpen}
	import { Pause, Play, SkipBack, SkipForward, Trash } from "@lucide/svelte";
	import {
		Menu,
		MenuCheckboxItem,
		MenuGroup,
		MenuGroupLabel,
		MenuItem,
		MenuPopup,
		MenuRadioGroup,
		MenuRadioItem,
		MenuSeparator,
		MenuShortcut,
		MenuSub,
		MenuSubPopup,
		MenuSubTrigger,
		MenuTrigger,
	} from "coss-svelte";
${scriptClose}

<Menu>
	<MenuTrigger>Open menu</MenuTrigger>
	<MenuPopup>
		<MenuGroup>
			<MenuGroupLabel>Playback</MenuGroupLabel>
			<MenuItem><Play aria-hidden="true" size={16} />Play<MenuShortcut>⌘P</MenuShortcut></MenuItem>
			<MenuItem disabled><Pause aria-hidden="true" size={16} />Pause<MenuShortcut>⇧⌘P</MenuShortcut></MenuItem>
			<MenuItem><SkipBack aria-hidden="true" size={16} />Previous<MenuShortcut>⌘[</MenuShortcut></MenuItem>
			<MenuItem><SkipForward aria-hidden="true" size={16} />Next<MenuShortcut>⌘]</MenuShortcut></MenuItem>
		</MenuGroup>
		<MenuSeparator />
		<MenuCheckboxItem>Shuffle</MenuCheckboxItem>
		<MenuCheckboxItem>Repeat</MenuCheckboxItem>
		<MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
		<MenuSeparator />
		<MenuGroup>
			<MenuGroupLabel>Sort by</MenuGroupLabel>
			<MenuRadioGroup value="artist">
				<MenuRadioItem value="artist">Artist</MenuRadioItem>
				<MenuRadioItem value="album">Album</MenuRadioItem>
				<MenuRadioItem value="title">Title</MenuRadioItem>
			</MenuRadioGroup>
		</MenuGroup>
		<MenuSeparator />
		<MenuCheckboxItem variant="switch">Auto save</MenuCheckboxItem>
		<MenuSeparator />
		<MenuSub>
			<MenuSubTrigger>Add to Playlist</MenuSubTrigger>
			<MenuSubPopup>
				<MenuItem>Jazz</MenuItem>
				<MenuSub>
					<MenuSubTrigger>Rock</MenuSubTrigger>
					<MenuSubPopup>
						<MenuItem>Hard Rock</MenuItem>
						<MenuItem>Soft Rock</MenuItem>
						<MenuItem>Classic Rock</MenuItem>
					</MenuSubPopup>
				</MenuSub>
				<MenuItem>Pop</MenuItem>
			</MenuSubPopup>
		</MenuSub>
		<MenuSeparator />
		<MenuItem variant="destructive"><Trash aria-hidden="true" size={16} />Delete<MenuShortcut>⌘⌫</MenuShortcut></MenuItem>
	</MenuPopup>
</Menu>`,
	meter: `${scriptOpen}
	import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "coss-svelte";
${scriptClose}

<Meter value={75} class="w-full max-w-sm">
	<div class="flex items-center justify-between gap-2">
		<MeterLabel>Storage usage</MeterLabel>
		<MeterValue>75%</MeterValue>
	</div>
	<MeterTrack>
		<MeterIndicator />
	</MeterTrack>
</Meter>`,
	"number-field": `<div class="rounded-lg border border-border bg-background p-4 text-muted-foreground text-sm">
	NumberField is tracked as deferred and has no installable local component yet.
</div>`,
	"otp-field": `${scriptOpen}
	import { OTPField, OTPFieldInput } from "coss-svelte";

	type OtpSnippet = {
		cells: Array<{ char: string | null | undefined }>;
	};
${scriptClose}

<OTPField aria-label="One-time password" length={6}>
	{#snippet children({ cells }: OtpSnippet)}
		{#each cells as cell}
			<OTPFieldInput {cell} aria-label="One-time password character">
				{cell.char ?? ""}
			</OTPFieldInput>
		{/each}
	{/snippet}
</OTPField>`,
	pagination: `${scriptOpen}
	import {
		Pagination,
		PaginationContent,
		PaginationEllipsis,
		PaginationItem,
		PaginationLink,
		PaginationNext,
		PaginationPrevious,
	} from "coss-svelte";
${scriptClose}

<Pagination pages={6}>
	{#snippet children()}
		<PaginationContent>
			<PaginationItem><PaginationPrevious href="#" /></PaginationItem>
			<PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
			<PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
			<PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
			<PaginationItem><PaginationEllipsis /></PaginationItem>
			<PaginationItem><PaginationNext href="#" /></PaginationItem>
		</PaginationContent>
	{/snippet}
</Pagination>`,
	popover: `${scriptOpen}
	import {
		Button,
		Field,
		Form,
		Popover,
		PopoverClose,
		PopoverDescription,
		PopoverPopup,
		PopoverTitle,
		PopoverTrigger,
		Textarea,
	} from "coss-svelte";
${scriptClose}

<Popover>
	<PopoverTrigger>Open Popover</PopoverTrigger>
	<PopoverPopup class="w-80">
		<div class="mb-4">
			<PopoverTitle class="text-base">Send us feedback</PopoverTitle>
			<PopoverDescription>Let us know how we can improve.</PopoverDescription>
		</div>
		<Form class="flex w-full flex-col gap-4">
			<Field>
				<Textarea aria-label="Send feedback" id="feedback" placeholder="How can we improve?" />
			</Field>
			<Button type="submit">Send feedback</Button>
		</Form>
		<PopoverClose class="sr-only">Close</PopoverClose>
	</PopoverPopup>
</Popover>`,
	"preview-card": `${scriptOpen}
	import { CornerUpLeft, Star } from "@lucide/svelte";
	import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "coss-svelte";
${scriptClose}

<PreviewCard>
	<PreviewCardTrigger href="/docs/components/preview-card">coss-svelte</PreviewCardTrigger>
	<PreviewCardPopup>
		<div class="cn-preview-card-demo">
			<div class="cn-preview-card-main">
				<h4>coss-svelte</h4>
				<p>Beautifully designed components that you can copy and paste into your apps.</p>
			</div>
			<div class="cn-preview-card-meta">
				<span><span class="cn-language-dot" aria-hidden="true"></span>TypeScript</span>
				<span><Star aria-hidden="true" size={12} />58.2k</span>
				<span><CornerUpLeft aria-hidden="true" size={12} />5.1k</span>
			</div>
		</div>
	</PreviewCardPopup>
</PreviewCard>`,
	progress: `${scriptOpen}
	import { Progress } from "coss-svelte";
${scriptClose}

<Progress value={72} />`,
	"radio-group": `${scriptOpen}
	import { Label, RadioGroup, RadioGroupItem } from "coss-svelte";
${scriptClose}

<RadioGroup value="next">
	<Label><RadioGroupItem value="next">Next.js</RadioGroupItem></Label>
	<Label><RadioGroupItem value="vite">Vite</RadioGroupItem></Label>
	<Label><RadioGroupItem value="astro">Astro</RadioGroupItem></Label>
</RadioGroup>`,
	"scroll-area": `${scriptOpen}
	import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "coss-svelte";

	const tags = Array.from({ length: 50 }, (_, index) => \`v1.0.0-alpha.\${index}\`);
${scriptClose}

<ScrollArea class="h-64 w-72 rounded-lg border">
	<ScrollAreaViewport>
		<div class="px-4 py-2">
			<h4 class="mb-2 font-medium text-sm">Tags</h4>
			<div class="flex flex-col gap-1">
				{#each tags as tag}
					<div class="text-sm">{tag}</div>
				{/each}
			</div>
		</div>
	</ScrollAreaViewport>
	<ScrollAreaScrollbar orientation="vertical">
		<ScrollAreaThumb />
	</ScrollAreaScrollbar>
	<ScrollAreaCorner />
</ScrollArea>`,
	select: `${scriptOpen}
	import {
		Select,
		SelectGroup,
		SelectGroupLabel,
		SelectItem,
		SelectPopup,
		SelectScrollDownButton,
		SelectScrollUpButton,
		SelectTrigger,
		SelectValue,
		SelectViewport,
	} from "coss-svelte";

${indent(basicOptions)}
${scriptClose}

<Select id="framework" name="framework" value="next" options={basicOptions} class="w-64">
	<SelectTrigger>
		<SelectValue placeholder="Choose a framework" />
	</SelectTrigger>
	<SelectPopup>
		<SelectScrollUpButton>Up</SelectScrollUpButton>
		<SelectViewport>
			<SelectGroup>
				<SelectGroupLabel>Frameworks</SelectGroupLabel>
				{#each basicOptions as option}
					<SelectItem value={option.value} label={option.label}>{option.label}</SelectItem>
				{/each}
			</SelectGroup>
		</SelectViewport>
		<SelectScrollDownButton>Down</SelectScrollDownButton>
	</SelectPopup>
</Select>`,
	separator: `${scriptOpen}
	import { Separator } from "coss-svelte";
${scriptClose}

<div class="w-full max-w-sm">
	<p class="mb-3">Above</p>
	<Separator />
	<p class="mt-3">Below</p>
</div>`,
	sheet: `${scriptOpen}
	import {
		Button,
		Field,
		FieldLabel,
		Form,
		Input,
		Sheet,
		SheetClose,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetPanel,
		SheetPopup,
		SheetTitle,
		SheetTrigger,
	} from "coss-svelte";
${scriptClose}

<Sheet>
	<SheetTrigger>Open Sheet</SheetTrigger>
	<SheetPopup side="right">
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>
				Make changes to your profile here. Click save when you're done.
			</SheetDescription>
		</SheetHeader>
		<Form class="contents">
			<SheetPanel class="grid gap-4">
				<Field><FieldLabel>Name</FieldLabel><Input type="text" value="Margaret Welsh" /></Field>
				<Field><FieldLabel>Username</FieldLabel><Input type="text" value="@maggie.welsh" /></Field>
			</SheetPanel>
		</Form>
		<SheetFooter>
			<SheetClose>Cancel</SheetClose>
			<Button type="submit">Save</Button>
		</SheetFooter>
	</SheetPopup>
</Sheet>`,
	sidebar: `${scriptOpen}
	import { BookOpen, Files, Route, Star } from "@lucide/svelte";
	import {
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarHeader,
		SidebarInset,
		SidebarMenu,
		SidebarMenuBadge,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarProvider,
		SidebarRail,
		SidebarSeparator,
		SidebarTrigger,
	} from "coss-svelte";
${scriptClose}

<SidebarProvider class="cn-sidebar-demo">
	<Sidebar variant="inset">
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" isActive>
						<Route size={16} strokeWidth={2.1} aria-hidden="true" />
						<span>Acme Inc</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Platform</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton href="/docs/introduction" isActive>
								<BookOpen size={16} strokeWidth={2.1} aria-hidden="true" />
								<span>Docs</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton href="/docs/components/button">
								<Files size={16} strokeWidth={2.1} aria-hidden="true" />
								<span>Components</span>
							</SidebarMenuButton>
							<SidebarMenuBadge>54</SidebarMenuBadge>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton href="/particles">
								<Star size={16} strokeWidth={2.1} aria-hidden="true" />
								<span>Particles</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
		<SidebarSeparator />
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton>
						<span class="size-2 rounded-full bg-emerald-500"></span>
						<span>johann@acme.com</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
	<SidebarInset>
		<header class="flex items-center gap-2 border-border border-b px-3 py-2">
			<SidebarTrigger />
			<span class="font-medium text-sm">Dashboard</span>
		</header>
		<div class="grid gap-2 p-3">
			<div class="rounded-lg border border-border bg-background p-3">
				<p class="m-0 font-medium text-sm">Project Overview</p>
				<p class="m-0 text-muted-foreground text-xs">A focused content area beside the sidebar.</p>
			</div>
		</div>
	</SidebarInset>
</SidebarProvider>`,
	skeleton: `${scriptOpen}
	import { Skeleton } from "coss-svelte";
${scriptClose}

<Skeleton class="h-20 w-72" />`,
	slider: `${scriptOpen}
	import { Slider, SliderRange, SliderThumb } from "coss-svelte";

	type SliderSnippet = {
		thumbItems: Array<{ index: number; value: number }>;
	};
${scriptClose}

<Slider value={50}>
	{#snippet children({ thumbItems }: SliderSnippet)}
		<SliderRange />
		{#each thumbItems as thumb}
			<SliderThumb index={thumb.index} />
		{/each}
	{/snippet}
</Slider>`,
	spinner: `${scriptOpen}
	import { Spinner } from "coss-svelte";
${scriptClose}

<Spinner />`,
	switch: `${scriptOpen}
	import { Switch, SwitchThumb } from "coss-svelte";
${scriptClose}

<Switch label="Marketing emails">
	<SwitchThumb />
</Switch>`,
	table: `${scriptOpen}
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
${scriptClose}

<Table class="min-w-[42rem]">
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
		<TableRow>
			<TableCell class="font-medium">Website Redesign</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-paid"></span>Paid</Badge></TableCell>
			<TableCell>Frontend Team</TableCell>
			<TableCell class="text-right">$12,500</TableCell>
		</TableRow>
		<TableRow>
			<TableCell class="font-medium">Mobile App</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-muted"></span>Unpaid</Badge></TableCell>
			<TableCell>Mobile Team</TableCell>
			<TableCell class="text-right">$8,750</TableCell>
		</TableRow>
		<TableRow>
			<TableCell class="font-medium">API Integration</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-pending"></span>Pending</Badge></TableCell>
			<TableCell>Backend Team</TableCell>
			<TableCell class="text-right">$5,200</TableCell>
		</TableRow>
		<TableRow>
			<TableCell class="font-medium">Database Migration</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-paid"></span>Paid</Badge></TableCell>
			<TableCell>DevOps Team</TableCell>
			<TableCell class="text-right">$3,800</TableCell>
		</TableRow>
		<TableRow>
			<TableCell class="font-medium">User Dashboard</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-paid"></span>Paid</Badge></TableCell>
			<TableCell>UX Team</TableCell>
			<TableCell class="text-right">$7,200</TableCell>
		</TableRow>
		<TableRow>
			<TableCell class="font-medium">Security Audit</TableCell>
			<TableCell><Badge variant="outline"><span aria-hidden="true" class="cn-status-dot cn-status-dot-failed"></span>Failed</Badge></TableCell>
			<TableCell>Security Team</TableCell>
			<TableCell class="text-right">$2,100</TableCell>
		</TableRow>
	</TableBody>
	<TableFooter>
		<TableRow>
			<TableCell colspan={3}>Total Budget</TableCell>
			<TableCell class="text-right">$39,550</TableCell>
		</TableRow>
	</TableFooter>
</Table>`,
	tabs: `${scriptOpen}
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "coss-svelte";
${scriptClose}

<Tabs value="tab-1">
	<TabsList>
		<TabsTrigger value="tab-1">Tab 1</TabsTrigger>
		<TabsTrigger value="tab-2">Tab 2</TabsTrigger>
		<TabsTrigger value="tab-3">Tab 3</TabsTrigger>
	</TabsList>
	<TabsContent class="text-center text-muted-foreground text-sm" value="tab-1">
		Tab 1 content
	</TabsContent>
	<TabsContent class="text-center text-muted-foreground text-sm" value="tab-2">
		Tab 2 content
	</TabsContent>
	<TabsContent class="text-center text-muted-foreground text-sm" value="tab-3">
		Tab 3 content
	</TabsContent>
</Tabs>`,
	textarea: `${scriptOpen}
	import { Textarea } from "coss-svelte";
${scriptClose}

<Textarea aria-label="Message" placeholder="Type your message here" />`,
	toast: `${scriptOpen}
	import { Button, Toast } from "coss-svelte";
${scriptClose}

<Button variant="outline">Default Toast</Button>
<Toast
	class="sr-only"
	title="Event has been created"
	description="Monday, January 3rd at 6:00pm"
/>`,
	toggle: `${scriptOpen}
	import { Toggle } from "coss-svelte";
${scriptClose}

<Toggle>Toggle</Toggle>`,
	"toggle-group": `${scriptOpen}
	import { Bold, Italic, Underline } from "@lucide/svelte";
	import { ToggleGroup, ToggleGroupItem } from "coss-svelte";
${scriptClose}

<ToggleGroup type="multiple" value={["bold"]}>
	<ToggleGroupItem aria-label="Toggle bold" value="bold">
		<Bold aria-hidden="true" size={16} />
	</ToggleGroupItem>
	<ToggleGroupItem aria-label="Toggle italic" value="italic">
		<Italic aria-hidden="true" size={16} />
	</ToggleGroupItem>
	<ToggleGroupItem aria-label="Toggle underline" value="underline">
		<Underline aria-hidden="true" size={16} />
	</ToggleGroupItem>
</ToggleGroup>`,
	toolbar: `${scriptOpen}
	import { AlignCenter, AlignLeft, AlignRight, DollarSign, Percent } from "@lucide/svelte";
	import {
		Select,
		SelectItem,
		SelectPopup,
		SelectTrigger,
		SelectValue,
		SelectViewport,
		Toolbar,
		ToolbarButton,
		ToolbarGroup,
		ToolbarGroupItem,
		ToolbarLink,
		ToolbarSeparator,
		Tooltip,
		TooltipPopup,
		TooltipProvider,
		TooltipTrigger,
	} from "coss-svelte";

	const toolbarFonts = [
		{ label: "Helvetica", value: "helvetica" },
		{ label: "Arial", value: "arial" },
		{ label: "Times New Roman", value: "times-new-roman" },
	];
${scriptClose}

<TooltipProvider>
	<Toolbar>
		<ToolbarGroup class="border-none p-0" type="multiple" value={["left"]}>
			<ToolbarGroupItem aria-label="Toggle left" value="left"><AlignLeft aria-hidden="true" size={16} /></ToolbarGroupItem>
			<ToolbarGroupItem aria-label="Toggle center" value="center"><AlignCenter aria-hidden="true" size={16} /></ToolbarGroupItem>
			<ToolbarGroupItem aria-label="Toggle right" value="right"><AlignRight aria-hidden="true" size={16} /></ToolbarGroupItem>
		</ToolbarGroup>
		<ToolbarSeparator />
		<ToolbarGroup>
			<ToolbarButton aria-label="Format as currency"><DollarSign aria-hidden="true" size={16} /></ToolbarButton>
			<ToolbarButton aria-label="Format as percent"><Percent aria-hidden="true" size={16} /></ToolbarButton>
		</ToolbarGroup>
		<ToolbarSeparator />
		<ToolbarGroup>
			<Select value="helvetica" options={toolbarFonts}>
				<SelectTrigger class="cn-toolbar-select"><SelectValue placeholder="Helvetica" /></SelectTrigger>
				<SelectPopup>
					<SelectViewport>
						{#each toolbarFonts as option}
							<SelectItem value={option.value} label={option.label}>{option.label}</SelectItem>
						{/each}
					</SelectViewport>
				</SelectPopup>
			</Select>
		</ToolbarGroup>
		<ToolbarSeparator />
		<ToolbarGroup><ToolbarButton>Save</ToolbarButton></ToolbarGroup>
		<Tooltip>
			<TooltipTrigger class="sr-only">Toolbar help</TooltipTrigger>
			<TooltipPopup>Format text</TooltipPopup>
		</Tooltip>
		<ToolbarLink class="sr-only" href="/docs/introduction">Link</ToolbarLink>
	</Toolbar>
</TooltipProvider>`,
	tooltip: `${scriptOpen}
	import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "coss-svelte";
${scriptClose}

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>Hover me</TooltipTrigger>
		<TooltipPopup>Helpful hint</TooltipPopup>
	</Tooltip>
</TooltipProvider>`,
};
