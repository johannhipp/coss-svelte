<script lang="ts">
import {
	Accordion,
	Alert,
	AlertDescription,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogPopup,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertTitle,
	Autocomplete,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Calendar,
	Card,
	CardDescription,
	CardHeader,
	CardPanel,
	CardTitle,
	Checkbox,
	CheckboxGroup,
	Collapsible,
	Combobox,
	Command,
	CommandDialog,
	CommandDialogPopup,
	CommandDialogTrigger,
	CommandInput,
	CommandItem,
	CommandList,
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuItem,
	ContextMenuLinkItem,
	ContextMenuPopup,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSub,
	ContextMenuSubPopup,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
	DatePicker,
	Dialog,
	DialogDescription,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerDescription,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
	Field,
	FieldDescription,
	FieldLabel,
	Fieldset,
	FieldsetLegend,
	Form,
	Frame,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
	Group,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	Kbd,
	Label,
	Menu,
	MenuItem,
	MenuPopup,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
	Meter,
	NumberField,
	OTPField,
	Pagination,
	Popover,
	PopoverPopup,
	PopoverTitle,
	PopoverTrigger,
	PreviewCard,
	PreviewCardPopup,
	PreviewCardTrigger,
	Progress,
	RadioGroup,
	ScrollArea,
	Select,
	Separator,
	Sheet,
	SheetDescription,
	SheetPopup,
	SheetTitle,
	SheetTrigger,
	Sidebar,
	SidebarProvider,
	SidebarTrigger,
	Skeleton,
	Slider,
	Spinner,
	Switch,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Tabs,
	Textarea,
	ToastProvider,
	Toggle,
	ToggleGroup,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarGroupItem,
	Tooltip,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
	toastManager,
} from "coss-svelte";

const options = [
	{ label: "Alpha", value: "alpha" },
	{ label: "Unavailable", value: "unavailable", disabled: true },
	{ label: "Bravo", value: "bravo" },
	{ label: "Charlie", value: "charlie" },
];

let elementPortalHost = $state<HTMLElement | null>(null);
let elementPortalProps = $derived(elementPortalHost ? { to: elementPortalHost } : {});

let dialogOpen = $state(false);
let dialogPreventOutside = $state(false);
let dialogOpenChanges = $state(0);
let dialogCompletedChanges = $state(0);

let alertDialogOpen = $state(false);
let alertDialogOpenChanges = $state(0);
let alertDialogCompletedChanges = $state(0);

let sheetOpen = $state(false);
let sheetPreventOutside = $state(false);
let sheetOpenChanges = $state(0);
let sheetCompletedChanges = $state(0);

let drawerOpen = $state(false);
let drawerPreventOutside = $state(false);
let drawerOpenChanges = $state(0);
let drawerCompletedChanges = $state(0);

let commandDialogOpen = $state(false);
let commandDialogPreventOutside = $state(false);
let commandDialogOpenChanges = $state(0);
let commandDialogCompletedChanges = $state(0);

let popoverOpen = $state(false);
let tooltipOpen = $state(false);
let previewCardOpen = $state(false);

let menuOpen = $state(false);
let menuResult = $state("none");
let contextMenuOpen = $state(false);
let contextMenuResult = $state("none");
let contextChecked = $state(false);
let contextRadio = $state("alpha");

let selectValue = $state("alpha");
let selectMultiple = $state<string[]>([]);
let comboboxValue = $state("");
let autocompleteValue = $state("");

let checkboxChecked = $state(false);
let checkboxGroupValue = $state<string[]>([]);
let switchChecked = $state(false);
let radioValue = $state("alpha");
let togglePressed = $state(false);
let toggleGroupValue = $state<string[]>([]);

let accordionValue = $state("");
let collapsibleOpen = $state(false);
let tabsValue = $state("first");
let sidebarOpen = $state(true);

let numberValue = $state<number | null>(2);
let deepNumberValue = $state<number | null>(1.5);
let deepNumberChangeCount = $state(0);
let deepNumberCommitCount = $state(0);
let deepNumberLastReason = $state("none");
let deepNumberFormResult = $state("");
let sliderValue = $state(25);

let nativeFormResult = $state("");
let actionCount = $state(0);
let paginationPage = $state(1);
let toolbarValue = $state("left");

function serializeForm(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
	event.preventDefault();
	const entries = [...new FormData(event.currentTarget).entries()].map(([name, value]) => [
		name,
		String(value),
	]);
	nativeFormResult = JSON.stringify(entries);
}

function serializeNumberForm(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
	event.preventDefault();
	const entries = [...new FormData(event.currentTarget).entries()].map(([name, value]) => [
		name,
		String(value),
	]);
	deepNumberFormResult = JSON.stringify(entries);
}

function openFixtureToast() {
	toastManager.add({
		id: "component-family-toast",
		title: "Fixture saved",
		description: "The managed feedback surface is open.",
		duration: 0,
	});
}
</script>

<svelte:head>
	<title>Component family fixtures</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main
	id="component-family-fixture"
	data-testid="component-family-fixture"
	class="fixture-grid mx-auto grid w-full max-w-5xl gap-10 p-6"
>
	<h1>Component family fixtures</h1>

	<section data-testid="modal-family" aria-labelledby="modal-family-title" class="fixture-grid grid gap-4">
		<h2 id="modal-family-title">Modal family</h2>

		<div data-testid="dialog-fixture">
			<Dialog
				bind:open={dialogOpen}
				onOpenChange={() => {
					dialogOpenChanges += 1;
				}}
				onOpenChangeComplete={() => {
					dialogCompletedChanges += 1;
				}}
			>
				<DialogTrigger data-testid="dialog-trigger">Open Dialog fixture</DialogTrigger>
				<DialogPopup
					portalProps={{ to: "#selector-portal-host" }}
					onInteractOutside={(event) => {
						if (dialogPreventOutside) event.preventDefault();
					}}
				>
					<DialogTitle>Dialog fixture</DialogTitle>
					<DialogDescription>Dialog backdrop behavior.</DialogDescription>
					<Button data-testid="dialog-content-action">Dialog content action</Button>
				</DialogPopup>
			</Dialog>
			<Button
				data-testid="dialog-prevent-outside"
				aria-pressed={dialogPreventOutside}
				onclick={() => {
					dialogPreventOutside = !dialogPreventOutside;
				}}
			>
				Toggle Dialog outside cancellation
			</Button>
			<output data-testid="dialog-state">
				{dialogOpen ? "open" : "closed"}:{dialogOpenChanges}:{dialogCompletedChanges}
			</output>
		</div>

		<div data-testid="alert-dialog-fixture">
			<AlertDialog
				bind:open={alertDialogOpen}
				onOpenChange={() => {
					alertDialogOpenChanges += 1;
				}}
				onOpenChangeComplete={() => {
					alertDialogCompletedChanges += 1;
				}}
			>
				<AlertDialogTrigger data-testid="alert-dialog-trigger">
					Open Alert Dialog fixture
				</AlertDialogTrigger>
				<AlertDialogPopup>
					<AlertDialogTitle>Alert Dialog fixture</AlertDialogTitle>
					<AlertDialogDescription>Alert Dialog backdrop behavior.</AlertDialogDescription>
					<AlertDialogCancel>Cancel fixture action</AlertDialogCancel>
					<AlertDialogAction>Confirm fixture action</AlertDialogAction>
				</AlertDialogPopup>
			</AlertDialog>
			<output data-testid="alert-dialog-state">
				{alertDialogOpen ? "open" : "closed"}:{alertDialogOpenChanges}:{alertDialogCompletedChanges}
			</output>
		</div>

		<div data-testid="sheet-fixture">
			<Sheet
				bind:open={sheetOpen}
				onOpenChange={() => {
					sheetOpenChanges += 1;
				}}
				onOpenChangeComplete={() => {
					sheetCompletedChanges += 1;
				}}
			>
				<SheetTrigger data-testid="sheet-trigger">Open Sheet fixture</SheetTrigger>
				<SheetPopup
					portalProps={elementPortalProps}
					onInteractOutside={(event) => {
						if (sheetPreventOutside) event.preventDefault();
					}}
				>
					<SheetTitle>Sheet fixture</SheetTitle>
					<SheetDescription>Sheet backdrop behavior.</SheetDescription>
					<Button data-testid="sheet-content-action">Sheet content action</Button>
				</SheetPopup>
			</Sheet>
			<Button
				data-testid="sheet-prevent-outside"
				aria-pressed={sheetPreventOutside}
				onclick={() => {
					sheetPreventOutside = !sheetPreventOutside;
				}}
			>
				Toggle Sheet outside cancellation
			</Button>
			<output data-testid="sheet-state">
				{sheetOpen ? "open" : "closed"}:{sheetOpenChanges}:{sheetCompletedChanges}
			</output>
		</div>

		<div data-testid="drawer-fixture">
			<Drawer
				bind:open={drawerOpen}
				onOpenChange={() => {
					drawerOpenChanges += 1;
				}}
				onOpenChangeComplete={() => {
					drawerCompletedChanges += 1;
				}}
			>
				<DrawerTrigger data-testid="drawer-trigger">Open Drawer fixture</DrawerTrigger>
				<DrawerPopup
					portalProps={{ disabled: true }}
					onInteractOutside={(event) => {
						if (drawerPreventOutside) event.preventDefault();
					}}
				>
					<DrawerTitle>Drawer fixture</DrawerTitle>
					<DrawerDescription>Drawer backdrop behavior.</DrawerDescription>
					<Button data-testid="drawer-content-action">Drawer content action</Button>
				</DrawerPopup>
			</Drawer>
			<Button
				data-testid="drawer-prevent-outside"
				aria-pressed={drawerPreventOutside}
				onclick={() => {
					drawerPreventOutside = !drawerPreventOutside;
				}}
			>
				Toggle Drawer outside cancellation
			</Button>
			<output data-testid="drawer-state">
				{drawerOpen ? "open" : "closed"}:{drawerOpenChanges}:{drawerCompletedChanges}
			</output>
		</div>

		<div data-testid="command-dialog-fixture">
			<CommandDialog
				bind:open={commandDialogOpen}
				onOpenChange={() => {
					commandDialogOpenChanges += 1;
				}}
				onOpenChangeComplete={() => {
					commandDialogCompletedChanges += 1;
				}}
			>
				<CommandDialogTrigger data-testid="command-dialog-trigger">
					Open Command Dialog fixture
				</CommandDialogTrigger>
				<CommandDialogPopup
					aria-label="Command Dialog fixture"
					onInteractOutside={(event) => {
						if (commandDialogPreventOutside) event.preventDefault();
					}}
				>
					<Command label="Fixture commands">
						<CommandInput aria-label="Search fixture commands" />
						<CommandList>
							<CommandItem value="alpha">Alpha command</CommandItem>
							<CommandItem value="bravo">Bravo command</CommandItem>
						</CommandList>
					</Command>
				</CommandDialogPopup>
			</CommandDialog>
			<Button
				data-testid="command-dialog-prevent-outside"
				aria-pressed={commandDialogPreventOutside}
				onclick={() => {
					commandDialogPreventOutside = !commandDialogPreventOutside;
				}}
			>
				Toggle Command Dialog outside cancellation
			</Button>
			<output data-testid="command-dialog-state">
				{commandDialogOpen ? "open" : "closed"}:{commandDialogOpenChanges}:{commandDialogCompletedChanges}
			</output>
		</div>
	</section>

	<section data-testid="floating-family" aria-labelledby="floating-family-title" class="fixture-grid grid gap-4">
		<h2 id="floating-family-title">Floating family</h2>
		<Popover bind:open={popoverOpen}>
			<PopoverTrigger data-testid="popover-trigger">Open Popover fixture</PopoverTrigger>
			<PopoverPopup portalProps={{ to: "#selector-portal-host" }}>
				<PopoverTitle>Popover fixture</PopoverTitle>
				<Button data-testid="popover-action">Popover action</Button>
			</PopoverPopup>
		</Popover>
		<output data-testid="popover-state">{popoverOpen ? "open" : "closed"}</output>

		<TooltipProvider delayDuration={0}>
			<Tooltip bind:open={tooltipOpen} delayDuration={0}>
				<TooltipTrigger data-testid="tooltip-trigger">Tooltip fixture trigger</TooltipTrigger>
				<TooltipPopup>Tooltip fixture</TooltipPopup>
			</Tooltip>
		</TooltipProvider>
		<output data-testid="tooltip-state">{tooltipOpen ? "open" : "closed"}</output>

		<PreviewCard bind:open={previewCardOpen} openDelay={0} closeDelay={0}>
			<PreviewCardTrigger data-testid="preview-card-trigger" href="#component-family-fixture">
				Preview Card fixture
			</PreviewCardTrigger>
			<PreviewCardPopup portalProps={elementPortalProps}>Preview Card fixture popup</PreviewCardPopup>
		</PreviewCard>
		<output data-testid="preview-card-state">{previewCardOpen ? "open" : "closed"}</output>
	</section>

	<section data-testid="menu-family" aria-labelledby="menu-family-title" class="fixture-grid grid gap-4">
		<h2 id="menu-family-title">Menu family</h2>
		<Menu bind:open={menuOpen}>
			<MenuTrigger data-testid="menu-trigger">Open Menu fixture</MenuTrigger>
			<MenuPopup portalProps={{ to: "#selector-portal-host" }}>
				<MenuItem
					onSelect={() => {
						menuResult = "alpha";
					}}>Alpha action</MenuItem
				>
				<MenuItem disabled>Unavailable action</MenuItem>
				<MenuItem
					onSelect={() => {
						menuResult = "bravo";
					}}>Bravo action</MenuItem
				>
				<MenuSub>
					<MenuSubTrigger>More actions</MenuSubTrigger>
					<MenuSubPopup>
						<MenuItem
							onSelect={() => {
								menuResult = "nested";
							}}>Nested action</MenuItem
						>
					</MenuSubPopup>
				</MenuSub>
			</MenuPopup>
		</Menu>
		<output data-testid="menu-state">{menuOpen ? "open" : "closed"}:{menuResult}</output>

		<ContextMenu bind:open={contextMenuOpen} dir="rtl">
			<ContextMenuTrigger
				data-testid="context-menu-trigger"
				tabindex={0}
				aria-label="Context Menu fixture target"
				class="min-h-24 border p-4"
			>
				Context Menu fixture target
			</ContextMenuTrigger>
			<ContextMenuPopup>
				<ContextMenuItem
					onSelect={() => {
						contextMenuResult = "alpha";
					}}>Alpha context action</ContextMenuItem
				>
				<ContextMenuItem disabled>Unavailable context action</ContextMenuItem>
				<ContextMenuCheckboxItem bind:checked={contextChecked} closeOnSelect={false}>
					Context flag
				</ContextMenuCheckboxItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger>Context choices</ContextMenuSubTrigger>
					<ContextMenuSubPopup>
						<ContextMenuRadioGroup bind:value={contextRadio}>
							<ContextMenuRadioItem value="alpha">Alpha choice</ContextMenuRadioItem>
							<ContextMenuRadioItem value="bravo">Bravo choice</ContextMenuRadioItem>
						</ContextMenuRadioGroup>
					</ContextMenuSubPopup>
				</ContextMenuSub>
				<ContextMenuLinkItem
					href="#context-menu-state"
					onSelect={() => {
						contextMenuResult = "link";
					}}
				>
					Context details link
				</ContextMenuLinkItem>
			</ContextMenuPopup>
		</ContextMenu>
		<output id="context-menu-state" data-testid="context-menu-state">
			{contextMenuOpen ? "open" : "closed"}:{contextMenuResult}:{contextChecked}:{contextRadio}
		</output>
	</section>

	<section data-testid="listbox-family" aria-labelledby="listbox-family-title" class="fixture-grid grid gap-4">
		<h2 id="listbox-family-title">Listbox family</h2>
		<Select
			bind:value={selectValue}
			name="select-single"
			{options}
			aria-label="Select fixture"
		/>
		<Select
			type="multiple"
			bind:value={selectMultiple}
			name="select-multiple"
			{options}
			aria-label="Multiple Select fixture"
		/>
		<Select disabled {options} aria-label="Disabled Select fixture" />
		<Combobox
			bind:value={comboboxValue}
			name="combobox-single"
			{options}
			aria-label="Combobox fixture"
		/>
		<Autocomplete
			bind:value={autocompleteValue}
			name="autocomplete-single"
			{options}
			aria-label="Autocomplete fixture"
		/>
		<output data-testid="listbox-state">
			{selectValue}:{selectMultiple.join(",")}:{comboboxValue}:{autocompleteValue}
		</output>
	</section>

	<section data-testid="choice-family" aria-labelledby="choice-family-title" class="fixture-grid grid gap-4">
		<h2 id="choice-family-title">Choice family</h2>
		<Checkbox bind:checked={checkboxChecked} aria-label="Checkbox fixture" />
		<Checkbox disabled aria-label="Disabled Checkbox fixture" />
		<CheckboxGroup bind:value={checkboxGroupValue} aria-label="Checkbox Group fixture">
			<Checkbox value="alpha" aria-label="Checkbox Group Alpha" />
			<Checkbox value="bravo" aria-label="Checkbox Group Bravo" />
		</CheckboxGroup>
		<Switch bind:checked={switchChecked} aria-label="Switch fixture" />
		<RadioGroup
			bind:value={radioValue}
			{options}
			aria-label="Radio Group fixture"
		/>
		<Toggle bind:pressed={togglePressed} aria-label="Toggle fixture">Toggle fixture</Toggle>
		<ToggleGroup
			type="multiple"
			bind:value={toggleGroupValue}
			items={options}
			aria-label="Toggle Group fixture"
		/>
		<output data-testid="choice-state">
			{checkboxChecked}:{checkboxGroupValue.join(",")}:{switchChecked}:{radioValue}:{togglePressed}:{toggleGroupValue.join(
				","
			)}
		</output>
	</section>

	<section data-testid="disclosure-family" aria-labelledby="disclosure-family-title" class="fixture-grid grid gap-4">
		<h2 id="disclosure-family-title">Disclosure family</h2>
		<Accordion
			bind:value={accordionValue}
			items={[
				{ value: "first", title: "First Accordion fixture", content: "First content" },
				{ value: "second", title: "Second Accordion fixture", content: "Second content" },
			]}
		/>
		<Collapsible bind:open={collapsibleOpen} title="Collapsible fixture">
			<p>Collapsible fixture content</p>
		</Collapsible>
		<Tabs
			bind:value={tabsValue}
			tabs={[
				{ value: "first", label: "First Tab fixture", content: "First tab content" },
				{ value: "second", label: "Second Tab fixture", content: "Second tab content" },
			]}
		/>
		<SidebarProvider bind:open={sidebarOpen}>
			<SidebarTrigger>Sidebar fixture trigger</SidebarTrigger>
			<Sidebar label="Sidebar fixture" items={[{ label: "Fixture navigation", href: "#modal-family-title" }]} />
		</SidebarProvider>
		<output data-testid="disclosure-state">
			{accordionValue}:{collapsibleOpen}:{tabsValue}:{sidebarOpen}
		</output>
	</section>

	<section data-testid="date-range-family" aria-labelledby="date-range-family-title" class="fixture-grid grid gap-4">
		<h2 id="date-range-family-title">Date and range family</h2>
		<Calendar aria-label="Calendar fixture" />
		<DatePicker
			locale="de-DE"
			label="Datum auswählen"
			previousMonthLabel="Vorheriger Monat"
			nextMonthLabel="Nächster Monat"
		/>
		<NumberField
			data-testid="bounds-number-field"
			bind:value={numberValue}
			label="Quantity fixture"
			name="quantity"
			min={0}
			max={4}
			step={1}
		/>
		<form
			data-testid="deep-number-form"
			class="grid gap-3"
			onsubmit={serializeNumberForm}
		>
			<NumberField
				data-testid="deep-number-field"
				bind:value={deepNumberValue}
				defaultValue={1.5}
				label="Deep quantity fixture"
				name="deep-quantity"
				min={0}
				max={10}
				step={0.5}
				locale="de-DE"
				format={{ minimumFractionDigits: 2 }}
				allowWheelScrub
				onValueChange={(_value, details) => {
					deepNumberChangeCount += 1;
					deepNumberLastReason = details.reason;
				}}
				onValueCommit={(_value, details) => {
					deepNumberCommitCount += 1;
					deepNumberLastReason = details.reason;
				}}
			/>
			<div class="flex flex-wrap gap-2">
				<Button type="submit">Submit deep Number Field</Button>
				<Button type="reset">Reset deep Number Field</Button>
			</div>
			<output data-testid="deep-number-state">
				{deepNumberValue}:{deepNumberChangeCount}:{deepNumberCommitCount}:{deepNumberLastReason}
			</output>
			<output data-testid="deep-number-form-state">{deepNumberFormResult}</output>
		</form>
		<div data-testid="number-field-a11y-states" class="grid gap-3">
			<NumberField label="Invalid quantity fixture" value={2} invalid />
			<NumberField label="Disabled quantity fixture" value={2} disabled />
			<Field
				label="Field-labelled quantity fixture"
				description="Use a quantity between zero and ten."
				required
				invalid
			>
				<NumberField value={2} min={0} max={10} />
			</Field>
		</div>
		<Slider
			bind:value={sliderValue}
			min={0}
			max={100}
			step={5}
			aria-label="Slider fixture"
		/>
		<output data-testid="date-range-state">{numberValue}:{sliderValue}</output>
	</section>

	<section data-testid="native-form-family" aria-labelledby="native-form-family-title" class="fixture-grid grid gap-4">
		<h2 id="native-form-family-title">Native form family</h2>
		<Form data-testid="native-form" onsubmit={serializeForm}>
			<Input name="fixture-input" value="alpha" aria-label="Native Input fixture" />
			<Input name="fixture-disabled" value="omitted" disabled aria-label="Disabled Input fixture" />
			<Textarea name="fixture-textarea" value="notes" aria-label="Native Textarea fixture" />
			<OTPField
				name="fixture-otp"
				value="4821"
				length={4}
				aria-label="OTP Field fixture"
			/>
			<Button type="submit">Submit native fixture</Button>
		</Form>
		<output data-testid="native-form-state">{nativeFormResult}</output>
	</section>

	<section
		data-testid="managed-feedback-family"
		aria-labelledby="managed-feedback-family-title"
		class="fixture-grid grid gap-4"
	>
		<h2 id="managed-feedback-family-title">Managed feedback family</h2>
		<ToastProvider>
			<Button data-testid="toast-trigger" onclick={openFixtureToast}>Open Toast fixture</Button>
		</ToastProvider>
	</section>

	<section data-testid="action-family" aria-labelledby="action-family-title" class="fixture-grid grid gap-4">
		<h2 id="action-family-title">Action family</h2>
		<Button
			data-testid="action-button"
			onclick={() => {
				actionCount += 1;
			}}>Action Button fixture</Button
		>
		<Button disabled data-testid="disabled-action-button">Disabled Action fixture</Button>
		<Pagination bind:page={paginationPage} count={30} perPage={10} aria-label="Pagination fixture" />
		<Toolbar aria-label="Toolbar fixture">
			<ToolbarButton
				onclick={() => {
					actionCount += 1;
				}}>Toolbar action</ToolbarButton
			>
			<ToolbarButton disabled>Disabled toolbar action</ToolbarButton>
			<ToolbarGroup type="single" bind:value={toolbarValue}>
				<ToolbarGroupItem value="left">Align left</ToolbarGroupItem>
				<ToolbarGroupItem value="right">Align right</ToolbarGroupItem>
			</ToolbarGroup>
		</Toolbar>
		<output data-testid="action-state">{actionCount}:{paginationPage}:{toolbarValue}</output>
	</section>

	<section
		data-testid="presentational-family"
		aria-labelledby="presentational-family-title"
		class="fixture-grid grid gap-4"
	>
		<h2 id="presentational-family-title">Presentational family</h2>
		<Alert>
			<AlertTitle>Alert fixture</AlertTitle>
			<AlertDescription>Alert fixture description.</AlertDescription>
		</Alert>
		<Avatar alt="Fixture avatar" fallback="FA" />
		<Badge>Badge fixture</Badge>
		<Breadcrumb
			items={[
				{ label: "Fixture home", href: "#component-family-fixture" },
				"Presentational family",
			]}
		/>
		<Card>
			<CardHeader>
				<CardTitle>Card fixture</CardTitle>
				<CardDescription>Card fixture description.</CardDescription>
			</CardHeader>
			<CardPanel>Card fixture panel.</CardPanel>
		</Card>
		<Empty>
			<EmptyHeader>
				<EmptyTitle>Empty fixture</EmptyTitle>
				<EmptyDescription>No fixture results.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>Try another fixture.</EmptyContent>
		</Empty>
		<Field>
			<FieldLabel>Field fixture</FieldLabel>
			<Input type="text" />
			<FieldDescription>Field fixture description.</FieldDescription>
		</Field>
		<Fieldset>
			<FieldsetLegend>Fieldset fixture</FieldsetLegend>
			<Label for="fieldset-input">Fieldset input</Label>
			<Input id="fieldset-input" type="text" />
		</Fieldset>
		<Frame>
			<FrameHeader>
				<FrameTitle>Frame fixture</FrameTitle>
				<FrameDescription>Frame fixture description.</FrameDescription>
			</FrameHeader>
			<FramePanel>Frame fixture panel.</FramePanel>
			<FrameFooter>Frame fixture footer.</FrameFooter>
		</Frame>
		<Group aria-label="Group fixture">
			<Button>Grouped action one</Button>
			<Button variant="outline">Grouped action two</Button>
		</Group>
		<InputGroup>
			<InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
			<InputGroupInput aria-label="Input Group fixture" />
		</InputGroup>
		<p>Keyboard shortcut <Kbd>⌘K</Kbd></p>
		<Meter value={60} label="Meter fixture" />
		<Progress value={40} label="Progress fixture" />
		<ScrollArea class="h-24 border p-2" aria-label="Scroll Area fixture">
			<p>Scrollable fixture content.</p>
			<p>More scrollable fixture content.</p>
			<p>Final scrollable fixture content.</p>
		</ScrollArea>
		<div>
			<span>Before Separator fixture</span>
			<Separator />
			<span>After Separator fixture</span>
		</div>
		<Skeleton class="h-4 w-24" aria-hidden="true" />
		<Spinner label="Spinner fixture" />
		<Table>
			<TableCaption>Table fixture</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Component</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Fixture</TableCell>
					<TableCell>Ready</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</section>

	<div
		id="selector-portal-host"
		data-testid="selector-portal-host"
		class="contents"
	></div>
	<div
		bind:this={elementPortalHost}
		data-testid="element-portal-host"
		class="contents"
	></div>
</main>

<style>
	.fixture-grid {
		grid-template-columns: minmax(0, 1fr);
	}

	.fixture-grid > * {
		min-width: 0;
	}

	.fixture-grid :global(button) {
		max-width: 100%;
		white-space: normal;
	}
</style>
