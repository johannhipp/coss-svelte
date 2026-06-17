import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const packageSrc = join(root, "packages/coss-svelte/src");
const componentsDir = join(packageSrc, "components");
const internalDir = join(packageSrc, "internal");

const stable = [
	"Accordion",
	"Alert",
	"AlertDialog",
	"Autocomplete",
	"Avatar",
	"Badge",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Checkbox",
	"CheckboxGroup",
	"Collapsible",
	"Combobox",
	"Command",
	"DatePicker",
	"Dialog",
	"Empty",
	"Field",
	"Fieldset",
	"Form",
	"Frame",
	"Group",
	"Input",
	"InputGroup",
	"Kbd",
	"Label",
	"Menu",
	"Meter",
	"OTPField",
	"Pagination",
	"Popover",
	"PreviewCard",
	"Progress",
	"RadioGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Skeleton",
	"Slider",
	"Spinner",
	"Switch",
	"Table",
	"Tabs",
	"Textarea",
	"Toggle",
	"ToggleGroup",
	"Toolbar",
	"Tooltip",
];

const experimental = ["Drawer", "Sidebar", "Toast"];
const deferred = ["NumberField"];
const componentParts = {
	Accordion: ["AccordionContent", "AccordionHeader", "AccordionItem", "AccordionTrigger"],
	Alert: ["AlertAction", "AlertDescription", "AlertTitle"],
	AlertDialog: [
		"AlertDialogAction",
		"AlertDialogCancel",
		"AlertDialogDescription",
		"AlertDialogPopup",
		"AlertDialogTitle",
		"AlertDialogTrigger",
	],
	Autocomplete: [
		"AutocompleteCollection",
		"AutocompleteEmpty",
		"AutocompleteGroup",
		"AutocompleteGroupLabel",
		"AutocompleteInput",
		"AutocompleteItem",
		"AutocompleteList",
		"AutocompletePopup",
		"AutocompleteSeparator",
		"AutocompleteStatus",
	],
	Avatar: ["AvatarFallback", "AvatarImage"],
	Card: ["CardDescription", "CardFooter", "CardHeader", "CardPanel", "CardTitle"],
	Collapsible: ["CollapsibleContent", "CollapsibleTrigger"],
	Combobox: [
		"ComboboxClear",
		"ComboboxCollection",
		"ComboboxEmpty",
		"ComboboxGroup",
		"ComboboxGroupLabel",
		"ComboboxInput",
		"ComboboxItem",
		"ComboboxList",
		"ComboboxPopup",
		"ComboboxSeparator",
		"ComboboxTrigger",
		"ComboboxValue",
	],
	Command: [
		"CommandCollection",
		"CommandDialog",
		"CommandDialogPopup",
		"CommandDialogTrigger",
		"CommandEmpty",
		"CommandFooter",
		"CommandGroup",
		"CommandGroupLabel",
		"CommandInput",
		"CommandItem",
		"CommandList",
		"CommandPanel",
		"CommandSeparator",
		"CommandShortcut",
	],
	Dialog: ["DialogClose", "DialogDescription", "DialogPopup", "DialogTitle", "DialogTrigger"],
	Drawer: [
		"DrawerClose",
		"DrawerContent",
		"DrawerCreateHandle",
		"DrawerDescription",
		"DrawerFooter",
		"DrawerHeader",
		"DrawerPanel",
		"DrawerPopup",
		"DrawerTitle",
		"DrawerTrigger",
	],
	Empty: ["EmptyContent", "EmptyDescription", "EmptyHeader", "EmptyMedia", "EmptyTitle"],
	Field: ["FieldDescription", "FieldError", "FieldLabel", "FieldValidity"],
	Fieldset: ["FieldsetLegend"],
	Frame: ["FrameDescription", "FrameFooter", "FrameHeader", "FramePanel", "FrameTitle"],
	Menu: [
		"MenuCheckboxItem",
		"MenuGroup",
		"MenuGroupLabel",
		"MenuItem",
		"MenuPopup",
		"MenuRadioGroup",
		"MenuRadioItem",
		"MenuSeparator",
		"MenuShortcut",
		"MenuSub",
		"MenuSubPopup",
		"MenuSubTrigger",
		"MenuTrigger",
	],
	OTPField: ["OTPFieldCell"],
	Pagination: ["PaginationNextButton", "PaginationPage", "PaginationPrevButton"],
	Popover: ["PopoverClose", "PopoverPopup", "PopoverTrigger"],
	PreviewCard: ["PreviewCardPopup", "PreviewCardTrigger"],
	RadioGroup: ["RadioGroupItem"],
	ScrollArea: ["ScrollAreaCorner", "ScrollAreaScrollbar", "ScrollAreaThumb", "ScrollAreaViewport"],
	Select: [
		"SelectGroup",
		"SelectGroupLabel",
		"SelectItem",
		"SelectPopup",
		"SelectScrollDownButton",
		"SelectScrollUpButton",
		"SelectTrigger",
		"SelectValue",
		"SelectViewport",
	],
	Sheet: [
		"SheetClose",
		"SheetContent",
		"SheetDescription",
		"SheetFooter",
		"SheetHeader",
		"SheetPanel",
		"SheetPopup",
		"SheetTitle",
		"SheetTrigger",
	],
	Slider: ["SliderRange", "SliderThumb", "SliderThumbLabel", "SliderTick", "SliderTickLabel"],
	Tabs: ["TabsContent", "TabsList", "TabsTrigger"],
	Table: [
		"TableBody",
		"TableCaption",
		"TableCell",
		"TableFooter",
		"TableHead",
		"TableHeader",
		"TableRow",
	],
	Switch: ["SwitchThumb"],
	ToggleGroup: ["ToggleGroupItem"],
	Tooltip: ["TooltipPopup", "TooltipProvider", "TooltipTrigger"],
	Toolbar: ["ToolbarButton", "ToolbarGroup", "ToolbarGroupItem", "ToolbarLink"],
};
const partNames = Object.values(componentParts).flat();

const custom = new Map();

function componentPath(name) {
	return join(componentsDir, `${name}.svelte`);
}

function slotName(name) {
	return name
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/\s+/g, "-")
		.replace(/OTP/g, "otp")
		.toLowerCase();
}

function displayNameToComponentName(displayName) {
	return displayName.replaceAll(" ", "");
}

function cleanMarkdownCell(cell) {
	return cell
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replaceAll("`", "")
		.trim();
}

function extractMarkdownLink(cell) {
	return cell.match(/\((https?:\/\/[^)]+)\)/)?.[1] ?? "";
}

function parseMarkdownTable(source) {
	return source
		.split("\n")
		.filter((line) => line.trim().startsWith("|") && !line.includes("---"))
		.map((line) =>
			line
				.trim()
				.slice(1, -1)
				.split("|")
				.map((cell) => cell.trim())
		);
}

function statusFor(name) {
	if (stable.includes(name)) {
		return "stable";
	}

	if (experimental.includes(name)) {
		return "experimental";
	}

	if (deferred.includes(name)) {
		return "deferred";
	}

	throw new Error(`No v0.1 status configured for ${name}`);
}

function foundationKind({ primitive, tier }) {
	const normalizedTier = tier.toLowerCase();
	const normalizedPrimitive = primitive.toLowerCase();

	if (normalizedTier.includes("custom") || normalizedPrimitive.includes("custom")) {
		return "custom";
	}

	if (normalizedTier.includes("compound")) {
		return "compound";
	}

	if (normalizedTier.includes("presentational") || normalizedPrimitive.includes("native")) {
		return "native";
	}

	return "bits";
}

function particlePriority({ status, particles }) {
	if (status === "deferred") {
		return "unsupported";
	}

	if (status === "experimental") {
		return "later";
	}

	return particles > 0 ? "mvp" : "mvp";
}

async function buildComponentMetadata() {
	const [indexSource, matrixSource] = await Promise.all([
		readFile(join(root, "docs/scope/source/00-component-index.md"), "utf8"),
		readFile(join(root, "docs/scope/component-implementation-matrix.md"), "utf8"),
	]);
	const indexRows = parseMarkdownTable(indexSource).slice(1);
	const matrixRows = parseMarkdownTable(matrixSource).slice(1);
	const indexed = new Map();
	const matrixed = new Map();

	for (const row of indexRows) {
		const [displayNameCell, category, scope, particles, localPrimitiveRef, docs] = row;
		const title = cleanMarkdownCell(displayNameCell);
		const name = displayNameToComponentName(title);

		indexed.set(name, {
			category: cleanMarkdownCell(category),
			description: cleanMarkdownCell(scope),
			docsUrl: extractMarkdownLink(docs),
			hasLocalPrimitiveRef: cleanMarkdownCell(localPrimitiveRef) === "yes",
			name,
			particles: Number(cleanMarkdownCell(particles)),
			slug: slotName(name),
			title,
		});
	}

	for (const row of matrixRows) {
		const [displayNameCell, , primitive, tier, firstPass] = row;
		const title = cleanMarkdownCell(displayNameCell);
		const name = displayNameToComponentName(title);

		matrixed.set(name, {
			firstImplementationPass: cleanMarkdownCell(firstPass),
			primitive: cleanMarkdownCell(primitive),
			tier: cleanMarkdownCell(tier),
		});
	}

	const metadata = {};

	for (const name of [...stable, ...experimental, ...deferred]) {
		const indexedItem = indexed.get(name);
		const matrixedItem = matrixed.get(name);

		if (!indexedItem || !matrixedItem) {
			throw new Error(`Missing markdown scope metadata for ${name}`);
		}

		const status = statusFor(name);

		metadata[name] = {
			...indexedItem,
			...matrixedItem,
			foundation: foundationKind(matrixedItem),
			parts: componentParts[name] ?? [],
			particlePriority: particlePriority({ particles: indexedItem.particles, status }),
			status,
		};
	}

	return metadata;
}

function baseComponent(name, { as = "div", role = "", className = "" } = {}) {
	const roleLine = role ? `\n\trole="${role}"` : "";
	return `<script>
\timport Block from "../internal/Block.svelte";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<Block
\tas="${as}"
\tdataSlot="${slotName(name)}"${roleLine}
\tclass={cn("cn-${slotName(name)}${className ? ` ${className}` : ""}", className)}
\t{...rest}
>
\t{@render children?.()}
</Block>
`;
}

function partComponent(name, { as = "div", dataSlot = slotName(name), className = "" } = {}) {
	return `<script>
\timport Block from "../internal/Block.svelte";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<Block
\tas="${as}"
\tdataSlot="${dataSlot}"
\tclass={cn("${className || `cn-${dataSlot}`}", className)}
\t{...rest}
>
\t{@render children?.()}
</Block>
`;
}

custom.set(
	"Button",
	`<script>
\timport { cn } from "../utils.js";

\tlet {
\t\tvariant = "primary",
\t\tsize = "md",
\t\thref = "",
\t\ttype = "button",
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

{#if href}
\t<a
\t\tdata-slot="button"
\t\tclass={cn("cn-button", \`cn-button-\${variant}\`, \`cn-button-\${size}\`, className)}
\t\t{href}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</a>
{:else}
\t<button
\t\tdata-slot="button"
\t\tclass={cn("cn-button", \`cn-button-\${variant}\`, \`cn-button-\${size}\`, className)}
\t\t{type}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</button>
{/if}
`
);

custom.set(
	"Badge",
	`<script>
\timport { cn } from "../utils.js";

\tlet { variant = "neutral", class: className = "", children, ...rest } = $props();
</script>

<span data-slot="badge" class={cn("cn-badge", \`cn-badge-\${variant}\`, className)} {...rest}>
\t{@render children?.()}
</span>
`
);

custom.set(
	"Input",
	`<script>
\timport { cn } from "../utils.js";

\tlet { type = "text", class: className = "", ...rest } = $props();
</script>

<input data-slot="input" class={cn("cn-input", className)} {type} {...rest} />
`
);

custom.set(
	"Textarea",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<textarea data-slot="textarea" class={cn("cn-textarea", className)} {...rest}></textarea>
`
);

custom.set(
	"Label",
	`<script>
\timport { Label as LabelPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<LabelPrimitive.Root data-slot="label" class={cn("cn-label", className)} {...rest}>
\t{@render children?.()}
</LabelPrimitive.Root>
`
);

custom.set(
	"Form",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<form data-slot="form" class={cn("cn-form", className)} {...rest}>
\t{@render children?.()}
</form>
`
);

custom.set(
	"Fieldset",
	`<script>
\timport { cn } from "../utils.js";

\tlet { legend = "", description = "", class: className = "", children, ...rest } = $props();
</script>

<fieldset data-slot="fieldset" class={cn("cn-fieldset", className)} {...rest}>
\t{#if legend}
\t\t<legend class="cn-fieldset-legend">{legend}</legend>
\t{/if}
\t{#if description}
\t\t<p class="cn-fieldset-description">{description}</p>
\t{/if}
\t{@render children?.()}
</fieldset>
`
);

custom.set(
	"Field",
	`<script>
\timport { cn } from "../utils.js";

\tlet {
\t\tlabel = "",
\t\tdescription = "",
\t\terror = "",
\t\trequired = false,
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<div
\tdata-slot="field"
\tdata-invalid={error ? "true" : undefined}
\tclass={cn("cn-field", className)}
\t{...rest}
>
\t{#if label}
\t\t<div class="cn-field-label-row">
\t\t\t<span class="cn-label">{label}</span>
\t\t\t{#if required}
\t\t\t\t<span class="cn-field-required" aria-hidden="true">*</span>
\t\t\t{/if}
\t\t</div>
\t{/if}
\t{@render children?.()}
\t{#if description}
\t\t<p class="cn-field-description">{description}</p>
\t{/if}
\t{#if error}
\t\t<p class="cn-field-error">{error}</p>
\t{/if}
</div>
`
);

custom.set(
	"Checkbox",
	`<script>
\timport { Checkbox as CheckboxPrimitive, Label as LabelPrimitive, useId } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tid = useId(),
\t\tchecked = $bindable(false),
\t\tindeterminate = $bindable(false),
\t\tlabel = "",
\t\tclass: className = "",
\t\t...rest
\t} = $props();
</script>

<span data-slot="checkbox-field" class="cn-checkbox-field">
\t<CheckboxPrimitive.Root
\t\t{id}
\t\tdata-slot="checkbox"
\t\tclass={cn("cn-checkbox", className)}
\t\tbind:checked
\t\tbind:indeterminate
\t\t{...rest}
\t>
\t\t{#snippet children({ checked, indeterminate })}
\t\t\t<span
\t\t\t\tclass="cn-checkbox-indicator"
\t\t\t\tdata-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
\t\t\t\taria-hidden="true"
\t\t\t>
\t\t\t\t{#if indeterminate}
\t\t\t\t\t-
\t\t\t\t{/if}
\t\t\t</span>
\t\t{/snippet}
\t</CheckboxPrimitive.Root>
\t{#if label}
\t\t<LabelPrimitive.Root for={id} class="cn-checkbox-label">{label}</LabelPrimitive.Root>
\t{/if}
</span>
`
);

custom.set(
	"CheckboxGroup",
	`<script>
\timport { cn } from "../utils.js";

\tlet { label = "", class: className = "", children, ...rest } = $props();
</script>

<fieldset data-slot="checkbox-group" class={cn("cn-choice-group", className)} {...rest}>
\t{#if label}
\t\t<legend>{label}</legend>
\t{/if}
\t<div class="cn-choice-stack">
\t\t{@render children?.()}
\t</div>
</fieldset>
`
);

custom.set(
	"RadioGroup",
	`<script>
\timport { RadioGroup as RadioGroupPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tvalue = $bindable(""),
\t\tlabel = "",
\t\toptions = [],
\t\torientation = "vertical",
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<RadioGroupPrimitive.Root
\tdata-slot="radio-group"
\tclass={cn("cn-choice-group", className)}
\tbind:value
\t{orientation}
\t{...rest}
>
\t{#if label}
\t\t<span class="cn-choice-label">{label}</span>
\t{/if}
\t<div class="cn-choice-stack">
\t\t{#if options.length}
\t\t\t{#each options as option}
\t\t\t\t<RadioGroupPrimitive.Item
\t\t\t\t\tdata-slot="radio-group-item"
\t\t\t\t\tclass="cn-radio"
\t\t\t\t\tvalue={option.value ?? option}
\t\t\t\t\tdisabled={option.disabled}
\t\t\t\t>
\t\t\t\t\t{#snippet children({ checked })}
\t\t\t\t\t\t<span
\t\t\t\t\t\t\tclass="cn-radio-indicator"
\t\t\t\t\t\t\tdata-state={checked ? "checked" : "unchecked"}
\t\t\t\t\t\t\taria-hidden="true"
\t\t\t\t\t\t></span>
\t\t\t\t\t\t<span>{option.label ?? option}</span>
\t\t\t\t\t{/snippet}
\t\t\t\t</RadioGroupPrimitive.Item>
\t\t\t{/each}
\t\t{:else}
\t\t\t{@render children?.()}
\t\t{/if}
\t</div>
</RadioGroupPrimitive.Root>
`
);

custom.set(
	"Select",
	`<script>
\timport { Select as SelectPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(""),
\t\topen = $bindable(false),
\t\toptions = [],
\t\tplaceholder = "Select",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();

\tlet items = $derived(
\t\toptions.map((option) => ({
\t\t\tvalue: option.value ?? option,
\t\t\tlabel: option.label ?? option,
\t\t\tdisabled: option.disabled ?? false,
\t\t}))
\t);
</script>

<SelectPrimitive.Root {type} bind:value bind:open {items} {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<SelectPrimitive.Trigger data-slot="select-trigger" class={cn("cn-select-trigger", className)}>
\t\t\t<SelectPrimitive.Value data-slot="select-value" class="cn-select-value" {placeholder} />
\t\t</SelectPrimitive.Trigger>
\t\t<SelectPrimitive.Portal>
\t\t\t<SelectPrimitive.Content data-slot="select-popup" class="cn-select-popup">
\t\t\t\t<SelectPrimitive.Viewport data-slot="select-viewport" class="cn-select-viewport">
\t\t\t\t\t{#each items as item}
\t\t\t\t\t\t<SelectPrimitive.Item
\t\t\t\t\t\t\tdata-slot="select-item"
\t\t\t\t\t\t\tclass="cn-select-item"
\t\t\t\t\t\t\tvalue={item.value}
\t\t\t\t\t\t\tlabel={item.label}
\t\t\t\t\t\t\tdisabled={item.disabled}
\t\t\t\t\t\t>
\t\t\t\t\t\t\t{item.label}
\t\t\t\t\t\t</SelectPrimitive.Item>
\t\t\t\t\t{/each}
\t\t\t\t</SelectPrimitive.Viewport>
\t\t\t</SelectPrimitive.Content>
\t\t</SelectPrimitive.Portal>
\t{/if}
</SelectPrimitive.Root>
`
);

custom.set(
	"Switch",
	`<script>
\timport { Label as LabelPrimitive, Switch as SwitchPrimitive, useId } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tid = useId(),
\t\tchecked = $bindable(false),
\t\tlabel = "",
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<span data-slot="switch-field" class="cn-switch-field">
\t<SwitchPrimitive.Root
\t\t{id}
\t\tdata-slot="switch"
\t\tclass={cn("cn-switch", className)}
\t\tbind:checked
\t\t{...rest}
\t>
\t\t{#if children}
\t\t\t{@render children()}
\t\t{:else}
\t\t\t<SwitchPrimitive.Thumb data-slot="switch-thumb" class="cn-switch-thumb" />
\t\t{/if}
\t</SwitchPrimitive.Root>
\t{#if label}
\t\t<LabelPrimitive.Root for={id} class="cn-switch-label">{label}</LabelPrimitive.Root>
\t{/if}
</span>
`
);

custom.set(
	"Slider",
	`<script>
\timport { Slider as SliderPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(40),
\t\tmin = 0,
\t\tmax = 100,
\t\tstep = 1,
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<SliderPrimitive.Root
\tdata-slot="slider"
\tclass={cn("cn-slider", className)}
\t{type}
\tbind:value
\t{min}
\t{max}
\t{step}
\t{...rest}
>
\t{#snippet children({ thumbItems, tickItems })}
\t\t{#if rootChildren}
\t\t\t{@render rootChildren({ thumbItems, tickItems })}
\t\t{:else}
\t\t\t<SliderPrimitive.Range data-slot="slider-range" class="cn-slider-range" />
\t\t\t{#each tickItems as tick}
\t\t\t\t<SliderPrimitive.Tick data-slot="slider-tick" class="cn-slider-tick" index={tick.index} />
\t\t\t{/each}
\t\t\t{#each thumbItems as thumb}
\t\t\t\t<SliderPrimitive.Thumb data-slot="slider-thumb" class="cn-slider-thumb" index={thumb.index} />
\t\t\t{/each}
\t\t{/if}
\t{/snippet}
</SliderPrimitive.Root>
`
);

custom.set(
	"Progress",
	`<script>
\timport { Progress as ProgressPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", value = 45, min = 0, max = 100, label = "", children, ...rest } = $props();

\tlet percentage = $derived(
\t\tvalue === null ? 100 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
\t);
</script>

<ProgressPrimitive.Root
\tdata-slot="progress"
\tclass={cn("cn-progress", className)}
\t{value}
\t{min}
\t{max}
\taria-label={label || rest["aria-label"] || "Progress"}
\t{...rest}
>
\t{#if children}
\t\t{@render children?.()}
\t{:else}
\t\t<span class="cn-progress-indicator" style={\`width: \${percentage}%\`}></span>
\t{/if}
\t{#if label}
\t\t<span class="cn-progress-label">{label}</span>
\t{/if}
</ProgressPrimitive.Root>
`
);

custom.set(
	"Meter",
	`<script>
\timport { Meter as MeterPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", value = 0.7, min = 0, max = 1, label = "", children, ...rest } = $props();

\tlet percentage = $derived(Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)));
</script>

<MeterPrimitive.Root
\tdata-slot="meter"
\tclass={cn("cn-meter", className)}
\t{value}
\t{min}
\t{max}
\taria-label={label || rest["aria-label"] || "Meter"}
\t{...rest}
>
\t{#if children}
\t\t{@render children?.()}
\t{:else}
\t\t<span class="cn-meter-indicator" style={\`width: \${percentage}%\`}></span>
\t{/if}
\t{#if label}
\t\t<span class="cn-meter-label">{label}</span>
\t{/if}
</MeterPrimitive.Root>
`
);

custom.set(
	"Separator",
	`<script>
\timport { Separator as SeparatorPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { orientation = "horizontal", class: className = "", children, ...rest } = $props();
</script>

<SeparatorPrimitive.Root
\tdata-slot="separator"
\tclass={cn("cn-separator", \`cn-separator-\${orientation}\`, className)}
\t{orientation}
\t{...rest}
>
\t{@render children?.()}
</SeparatorPrimitive.Root>
`
);

custom.set(
	"Spinner",
	`<script>
\timport { cn } from "../utils.js";

\tlet { label = "Loading", class: className = "", ...rest } = $props();
</script>

<span data-slot="spinner" class={cn("cn-spinner", className)} role="status" {...rest}>
\t<span class="cn-sr-only">{label}</span>
</span>
`
);

custom.set(
	"Skeleton",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<div data-slot="skeleton" class={cn("cn-skeleton", className)} aria-hidden="true" {...rest}></div>
`
);

custom.set(
	"Kbd",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<kbd data-slot="kbd" class={cn("cn-kbd", className)} {...rest}>
\t{@render children?.()}
</kbd>
`
);

custom.set(
	"Avatar",
	`<script>
\timport { Avatar as AvatarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tsrc = "",
\t\talt = "",
\t\tfallback = "",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<AvatarPrimitive.Root data-slot="avatar" class={cn("cn-avatar", className)} {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t{#if src}
\t\t\t<AvatarPrimitive.Image data-slot="avatar-image" class="cn-avatar-image" {src} {alt} />
\t\t{/if}
\t\t<AvatarPrimitive.Fallback data-slot="avatar-fallback" class="cn-avatar-fallback">
\t\t\t{fallback || alt || "?"}
\t\t</AvatarPrimitive.Fallback>
\t{/if}
</AvatarPrimitive.Root>
`
);

custom.set(
	"Calendar",
	`<script>
\timport { Calendar as CalendarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(),
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<CalendarPrimitive.Root
\tdata-slot="calendar"
\tclass={cn("cn-calendar", className)}
\t{type}
\tbind:value
\t{...rest}
>
\t{#snippet children({ months, weekdays })}
\t\t{#if rootChildren}
\t\t\t{@render rootChildren({ months, weekdays })}
\t\t{:else}
\t\t\t<CalendarPrimitive.Header data-slot="calendar-header" class="cn-calendar-header">
\t\t\t\t<CalendarPrimitive.PrevButton data-slot="calendar-prev-button" class="cn-calendar-nav-button">
\t\t\t\t\tPrevious
\t\t\t\t</CalendarPrimitive.PrevButton>
\t\t\t\t<CalendarPrimitive.Heading data-slot="calendar-heading" class="cn-calendar-heading" />
\t\t\t\t<CalendarPrimitive.NextButton data-slot="calendar-next-button" class="cn-calendar-nav-button">
\t\t\t\t\tNext
\t\t\t\t</CalendarPrimitive.NextButton>
\t\t\t</CalendarPrimitive.Header>
\t\t\t{#each months as month}
\t\t\t\t<CalendarPrimitive.Grid data-slot="calendar-grid" class="cn-calendar-grid">
\t\t\t\t\t<CalendarPrimitive.GridHead data-slot="calendar-grid-head">
\t\t\t\t\t\t<CalendarPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
\t\t\t\t\t\t\t{#each weekdays as weekday}
\t\t\t\t\t\t\t\t<CalendarPrimitive.HeadCell data-slot="calendar-head-cell" class="cn-calendar-head">
\t\t\t\t\t\t\t\t\t{weekday}
\t\t\t\t\t\t\t\t</CalendarPrimitive.HeadCell>
\t\t\t\t\t\t\t{/each}
\t\t\t\t\t\t</CalendarPrimitive.GridRow>
\t\t\t\t\t</CalendarPrimitive.GridHead>
\t\t\t\t\t<CalendarPrimitive.GridBody data-slot="calendar-grid-body">
\t\t\t\t\t\t{#each month.weeks as week}
\t\t\t\t\t\t\t<CalendarPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
\t\t\t\t\t\t\t\t{#each week as date}
\t\t\t\t\t\t\t\t\t<CalendarPrimitive.Cell
\t\t\t\t\t\t\t\t\t\tdata-slot="calendar-cell"
\t\t\t\t\t\t\t\t\t\tclass="cn-calendar-cell"
\t\t\t\t\t\t\t\t\t\t{date}
\t\t\t\t\t\t\t\t\t\tmonth={month.value}
\t\t\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\t\t\t<CalendarPrimitive.Day data-slot="calendar-day" class="cn-calendar-day" />
\t\t\t\t\t\t\t\t\t</CalendarPrimitive.Cell>
\t\t\t\t\t\t\t\t{/each}
\t\t\t\t\t\t\t</CalendarPrimitive.GridRow>
\t\t\t\t\t\t{/each}
\t\t\t\t\t</CalendarPrimitive.GridBody>
\t\t\t\t</CalendarPrimitive.Grid>
\t\t\t{/each}
\t\t{/if}
\t{/snippet}
</CalendarPrimitive.Root>
`
);

custom.set(
	"DatePicker",
	`<script>
\timport { DatePicker as DatePickerPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tvalue = $bindable(),
\t\topen = $bindable(false),
\t\tlabel = "Choose date",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<DatePickerPrimitive.Root bind:value bind:open {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<DatePickerPrimitive.Trigger data-slot="date-picker" class={cn("cn-input cn-date-picker", className)}>
\t\t\t{label}
\t\t</DatePickerPrimitive.Trigger>
\t\t<DatePickerPrimitive.Portal>
\t\t\t<DatePickerPrimitive.Content data-slot="date-picker-popup" class="cn-date-picker-popup">
\t\t\t\t<DatePickerPrimitive.Calendar data-slot="calendar" class="cn-calendar">
\t\t\t\t\t{#snippet children({ months, weekdays })}
\t\t\t\t\t\t<DatePickerPrimitive.Header data-slot="calendar-header" class="cn-calendar-header">
\t\t\t\t\t\t\t<DatePickerPrimitive.PrevButton
\t\t\t\t\t\t\t\tdata-slot="calendar-prev-button"
\t\t\t\t\t\t\t\tclass="cn-calendar-nav-button"
\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\tPrevious
\t\t\t\t\t\t\t</DatePickerPrimitive.PrevButton>
\t\t\t\t\t\t\t<DatePickerPrimitive.Heading data-slot="calendar-heading" class="cn-calendar-heading" />
\t\t\t\t\t\t\t<DatePickerPrimitive.NextButton
\t\t\t\t\t\t\t\tdata-slot="calendar-next-button"
\t\t\t\t\t\t\t\tclass="cn-calendar-nav-button"
\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\tNext
\t\t\t\t\t\t\t</DatePickerPrimitive.NextButton>
\t\t\t\t\t\t</DatePickerPrimitive.Header>
\t\t\t\t\t\t{#each months as month}
\t\t\t\t\t\t\t<DatePickerPrimitive.Grid data-slot="calendar-grid" class="cn-calendar-grid">
\t\t\t\t\t\t\t\t<DatePickerPrimitive.GridHead data-slot="calendar-grid-head">
\t\t\t\t\t\t\t\t\t<DatePickerPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
\t\t\t\t\t\t\t\t\t\t{#each weekdays as weekday}
\t\t\t\t\t\t\t\t\t\t\t<DatePickerPrimitive.HeadCell data-slot="calendar-head-cell" class="cn-calendar-head">
\t\t\t\t\t\t\t\t\t\t\t\t{weekday}
\t\t\t\t\t\t\t\t\t\t\t</DatePickerPrimitive.HeadCell>
\t\t\t\t\t\t\t\t\t\t{/each}
\t\t\t\t\t\t\t\t\t</DatePickerPrimitive.GridRow>
\t\t\t\t\t\t\t\t</DatePickerPrimitive.GridHead>
\t\t\t\t\t\t\t\t<DatePickerPrimitive.GridBody data-slot="calendar-grid-body">
\t\t\t\t\t\t\t\t\t{#each month.weeks as week}
\t\t\t\t\t\t\t\t\t\t<DatePickerPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
\t\t\t\t\t\t\t\t\t\t\t{#each week as date}
\t\t\t\t\t\t\t\t\t\t\t\t<DatePickerPrimitive.Cell
\t\t\t\t\t\t\t\t\t\t\t\t\tdata-slot="calendar-cell"
\t\t\t\t\t\t\t\t\t\t\t\t\tclass="cn-calendar-cell"
\t\t\t\t\t\t\t\t\t\t\t\t\t{date}
\t\t\t\t\t\t\t\t\t\t\t\t\tmonth={month.value}
\t\t\t\t\t\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\t\t\t\t\t\t<DatePickerPrimitive.Day data-slot="calendar-day" class="cn-calendar-day" />
\t\t\t\t\t\t\t\t\t\t\t\t</DatePickerPrimitive.Cell>
\t\t\t\t\t\t\t\t\t\t\t{/each}
\t\t\t\t\t\t\t\t\t\t</DatePickerPrimitive.GridRow>
\t\t\t\t\t\t\t\t\t{/each}
\t\t\t\t\t\t\t\t</DatePickerPrimitive.GridBody>
\t\t\t\t\t\t\t</DatePickerPrimitive.Grid>
\t\t\t\t\t\t{/each}
\t\t\t\t\t{/snippet}
\t\t\t\t</DatePickerPrimitive.Calendar>
\t\t\t</DatePickerPrimitive.Content>
\t\t</DatePickerPrimitive.Portal>
\t{/if}
</DatePickerPrimitive.Root>
`
);

custom.set(
	"OTPField",
	`<script>
\timport { PinInput as PinInputPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tvalue = $bindable(""),
\t\tlength = 6,
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<PinInputPrimitive.Root
\tdata-slot="otp-field"
\tclass={cn("cn-otp-field", className)}
\tbind:value
\tmaxlength={length}
\t{...rest}
>
\t{#snippet children({ cells })}
\t\t{#if rootChildren}
\t\t\t{@render rootChildren({ cells })}
\t\t{:else}
\t\t\t{#each cells as cell}
\t\t\t\t<PinInputPrimitive.Cell data-slot="otp-field-cell" class="cn-otp-cell" {cell}>
\t\t\t\t\t{cell.char ?? ""}
\t\t\t\t</PinInputPrimitive.Cell>
\t\t\t{/each}
\t\t{/if}
\t{/snippet}
</PinInputPrimitive.Root>
`
);

custom.set(
	"Pagination",
	`<script>
\timport { Pagination as PaginationPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tpage = $bindable(2),
\t\tpages: totalPages = 5,
\t\tcount = totalPages,
\t\tperPage = 1,
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<PaginationPrimitive.Root
\tdata-slot="pagination"
\tclass={cn("cn-pagination", className)}
\taria-label={rest["aria-label"] || "Pagination"}
\tbind:page
\t{count}
\t{perPage}
\t{...rest}
>
\t{#snippet children({ pages, range, currentPage })}
\t\t{#if rootChildren}
\t\t\t{@render rootChildren({ pages, range, currentPage })}
\t\t{:else}
\t\t\t<PaginationPrimitive.PrevButton data-slot="pagination-prev-button" class="cn-pagination-button">
\t\t\t\tPrevious
\t\t\t</PaginationPrimitive.PrevButton>
\t\t\t{#each pages as pageItem}
\t\t\t\t{#if pageItem.type === "ellipsis"}
\t\t\t\t\t<span class="cn-pagination-ellipsis" aria-hidden="true">...</span>
\t\t\t\t{:else}
\t\t\t\t\t<PaginationPrimitive.Page
\t\t\t\t\t\tdata-slot="pagination-page"
\t\t\t\t\t\tclass="cn-pagination-button"
\t\t\t\t\t\tpage={pageItem}
\t\t\t\t\t/>
\t\t\t\t{/if}
\t\t\t{/each}
\t\t\t<PaginationPrimitive.NextButton data-slot="pagination-next-button" class="cn-pagination-button">
\t\t\t\tNext
\t\t\t</PaginationPrimitive.NextButton>
\t\t{/if}
\t{/snippet}
</PaginationPrimitive.Root>
`
);

custom.set(
	"Tabs",
	`<script>
\timport { Tabs as TabsPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tchildren,
\t\tvalue = $bindable("tab-1"),
\t\ttabs = children ? [] : ["Overview", "Details"],
\t\tclass: className = "",
\t\t...rest
\t} = $props();
</script>

<TabsPrimitive.Root data-slot="tabs" class={cn("cn-tabs", className)} bind:value {...rest}>
\t{#if tabs.length}
\t\t<TabsPrimitive.List data-slot="tabs-list" class="cn-tabs-list">
\t\t{#each tabs as tab, index}
\t\t\t<TabsPrimitive.Trigger
\t\t\t\tdata-slot="tabs-trigger"
\t\t\t\tclass="cn-tabs-trigger"
\t\t\t\tvalue={tab.value ?? \`tab-\${index + 1}\`}
\t\t\t\tdisabled={tab.disabled}
\t\t\t>
\t\t\t\t{tab.label ?? tab}
\t\t\t</TabsPrimitive.Trigger>
\t\t{/each}
\t</TabsPrimitive.List>
\t\t{#each tabs as tab, index}
\t\t\t<TabsPrimitive.Content
\t\t\t\tdata-slot="tabs-content"
\t\t\t\tclass="cn-tabs-content"
\t\t\t\tvalue={tab.value ?? \`tab-\${index + 1}\`}
\t\t\t>
\t\t\t\t{#if index === 0}
\t\t\t\t\t{@render children?.()}
\t\t\t\t{:else if tab.content}
\t\t\t\t\t{tab.content}
\t\t\t\t{/if}
\t\t\t</TabsPrimitive.Content>
\t\t{/each}
\t{:else}
\t\t{@render children?.()}
\t{/if}
</TabsPrimitive.Root>
`
);

custom.set(
	"Table",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="table-wrap" class="cn-table-wrap">
\t<table data-slot="table" class={cn("cn-table", className)} {...rest}>
\t\t{@render children?.()}
\t</table>
</div>
`
);

custom.set(
	"Toggle",
	`<script>
\timport { Toggle as TogglePrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { pressed = $bindable(false), class: className = "", children, ...rest } = $props();
</script>

<TogglePrimitive.Root
\tdata-slot="toggle"
\tclass={cn("cn-toggle", pressed && "cn-toggle-pressed", className)}
\tbind:pressed
\t{...rest}
>
\t{@render children?.()}
</TogglePrimitive.Root>
`
);

custom.set(
	"ToggleGroup",
	`<script>
\timport { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(),
\t\titems = [],
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<ToggleGroupPrimitive.Root
\tdata-slot="toggle-group"
\tclass={cn("cn-toggle-group", className)}
\t{type}
\tbind:value
\t{...rest}
>
\t{#if items.length}
\t\t{#each items as item, index}
\t\t\t<ToggleGroupPrimitive.Item
\t\t\t\tdata-slot="toggle-group-item"
\t\t\t\tclass="cn-toggle-group-item"
\t\t\t\tvalue={item.value ?? \`item-\${index + 1}\`}
\t\t\t\tdisabled={item.disabled}
\t\t\t>
\t\t\t\t{item.label ?? item}
\t\t\t</ToggleGroupPrimitive.Item>
\t\t{/each}
\t{:else}
\t\t{@render children?.()}
\t{/if}
</ToggleGroupPrimitive.Root>
`
);

custom.set(
	"ScrollArea",
	`<script>
\timport { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.Root data-slot="scroll-area" class={cn("cn-scroll-area", className)} {...rest}>
\t{@render children?.()}
</ScrollAreaPrimitive.Root>
`
);

custom.set(
	"Autocomplete",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(""),
\t\topen = $bindable(false),
\t\toptions = [],
\t\tplaceholder = "Search",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();

\tlet items = $derived(
\t\toptions.map((option) => ({
\t\t\tvalue: option.value ?? option,
\t\t\tlabel: option.label ?? option,
\t\t\tdisabled: option.disabled ?? false,
\t\t}))
\t);
</script>

<ComboboxPrimitive.Root {type} bind:value bind:open {items} {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<div data-slot="autocomplete" class={cn("cn-autocomplete", className)}>
\t\t\t<ComboboxPrimitive.Input
\t\t\t\tdata-slot="autocomplete-input"
\t\t\t\tclass="cn-autocomplete-input"
\t\t\t\t{placeholder}
\t\t\t/>
\t\t\t<ComboboxPrimitive.Portal>
\t\t\t\t<ComboboxPrimitive.Content data-slot="autocomplete-popup" class="cn-autocomplete-popup">
\t\t\t\t\t<ComboboxPrimitive.Viewport data-slot="autocomplete-list" class="cn-autocomplete-list">
\t\t\t\t\t\t{#each items as item}
\t\t\t\t\t\t\t<ComboboxPrimitive.Item
\t\t\t\t\t\t\t\tdata-slot="autocomplete-item"
\t\t\t\t\t\t\t\tclass="cn-autocomplete-item"
\t\t\t\t\t\t\t\tvalue={item.value}
\t\t\t\t\t\t\t\tlabel={item.label}
\t\t\t\t\t\t\t\tdisabled={item.disabled}
\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\t{item.label}
\t\t\t\t\t\t\t</ComboboxPrimitive.Item>
\t\t\t\t\t\t{/each}
\t\t\t\t\t</ComboboxPrimitive.Viewport>
\t\t\t\t</ComboboxPrimitive.Content>
\t\t\t</ComboboxPrimitive.Portal>
\t\t</div>
\t{/if}
</ComboboxPrimitive.Root>
`
);

custom.set(
	"Combobox",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(""),
\t\topen = $bindable(false),
\t\toptions = [],
\t\tplaceholder = "Choose",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();

\tlet items = $derived(
\t\toptions.map((option) => ({
\t\t\tvalue: option.value ?? option,
\t\t\tlabel: option.label ?? option,
\t\t\tdisabled: option.disabled ?? false,
\t\t}))
\t);
</script>

<ComboboxPrimitive.Root {type} bind:value bind:open {items} {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<div data-slot="combobox" class={cn("cn-combobox", className)}>
\t\t\t<div class="cn-combobox-control">
\t\t\t\t<ComboboxPrimitive.Input
\t\t\t\t\tdata-slot="combobox-input"
\t\t\t\t\tclass="cn-combobox-input"
\t\t\t\t\t{placeholder}
\t\t\t\t/>
\t\t\t\t<ComboboxPrimitive.Trigger data-slot="combobox-trigger" class="cn-combobox-trigger">
\t\t\t\t\tOpen
\t\t\t\t</ComboboxPrimitive.Trigger>
\t\t\t</div>
\t\t\t<ComboboxPrimitive.Portal>
\t\t\t\t<ComboboxPrimitive.Content data-slot="combobox-popup" class="cn-combobox-popup">
\t\t\t\t\t<ComboboxPrimitive.Viewport data-slot="combobox-list" class="cn-combobox-list">
\t\t\t\t\t\t{#each items as item}
\t\t\t\t\t\t\t<ComboboxPrimitive.Item
\t\t\t\t\t\t\t\tdata-slot="combobox-item"
\t\t\t\t\t\t\t\tclass="cn-combobox-item"
\t\t\t\t\t\t\t\tvalue={item.value}
\t\t\t\t\t\t\t\tlabel={item.label}
\t\t\t\t\t\t\t\tdisabled={item.disabled}
\t\t\t\t\t\t\t>
\t\t\t\t\t\t\t\t{item.label}
\t\t\t\t\t\t\t</ComboboxPrimitive.Item>
\t\t\t\t\t\t{/each}
\t\t\t\t\t</ComboboxPrimitive.Viewport>
\t\t\t\t</ComboboxPrimitive.Content>
\t\t\t</ComboboxPrimitive.Portal>
\t\t</div>
\t{/if}
</ComboboxPrimitive.Root>
`
);

custom.set(
	"Command",
	`<script>
\timport { Command as CommandPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tvalue = $bindable(""),
\t\titems = [],
\t\tplaceholder = "Type a command",
\t\tlabel = "Command menu",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<CommandPrimitive.Root
\tdata-slot="command"
\tclass={cn("cn-command", className)}
\tbind:value
\t{label}
\t{...rest}
>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<CommandPrimitive.Input data-slot="command-input" class="cn-command-input" {placeholder} />
\t\t<CommandPrimitive.Empty data-slot="command-empty" class="cn-command-empty">
\t\t\tNo results found.
\t\t</CommandPrimitive.Empty>
\t\t<CommandPrimitive.List data-slot="command-list" class="cn-command-list">
\t\t\t{#each items as item}
\t\t\t\t<CommandPrimitive.Item
\t\t\t\t\tdata-slot="command-item"
\t\t\t\t\tclass="cn-command-item"
\t\t\t\t\tvalue={item.value ?? item}
\t\t\t\t\tdisabled={item.disabled}
\t\t\t\t>
\t\t\t\t\t{item.label ?? item}
\t\t\t\t</CommandPrimitive.Item>
\t\t\t{/each}
\t\t</CommandPrimitive.List>
\t{/if}
</CommandPrimitive.Root>
`
);

custom.set(
	"Menu",
	`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\topen = $bindable(false),
\t\titems = [],
\t\tlabel = "Menu",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<MenuPrimitive.Root bind:open {...rest}>
\t{#if rootChildren}
\t\t{@render rootChildren()}
\t{:else}
\t\t<MenuPrimitive.Trigger data-slot="menu-trigger" class="cn-menu-trigger">
\t\t\t{label}
\t\t</MenuPrimitive.Trigger>
\t\t<MenuPrimitive.Portal>
\t\t\t<MenuPrimitive.Content data-slot="menu-popup" class={cn("cn-menu-popup", className)}>
\t\t\t\t{#each items as item}
\t\t\t\t\t<MenuPrimitive.Item data-slot="menu-item" class="cn-menu-item" disabled={item.disabled}>
\t\t\t\t\t\t{item.label ?? item}
\t\t\t\t\t</MenuPrimitive.Item>
\t\t\t\t{/each}
\t\t\t</MenuPrimitive.Content>
\t\t</MenuPrimitive.Portal>
\t{/if}
</MenuPrimitive.Root>
`
);

custom.set(
	"Breadcrumb",
	`<script>
\timport { cn } from "../utils.js";

\tlet { items = [], class: className = "", ...rest } = $props();
</script>

<nav data-slot="breadcrumb" class={cn("cn-breadcrumb", className)} aria-label="Breadcrumb" {...rest}>
\t<ol>
\t\t{#each items as item, index}
\t\t\t<li aria-current={index === items.length - 1 ? "page" : undefined}>{item.label ?? item}</li>
\t\t{/each}
\t</ol>
</nav>
`
);

custom.set(
	"Accordion",
	`<script>
\timport { Accordion as AccordionPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\ttype = "single",
\t\tvalue = $bindable(),
\t\titems = [],
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<AccordionPrimitive.Root
\tdata-slot="accordion"
\tclass={cn("cn-accordion", className)}
\t{type}
\tbind:value
\t{...rest}
>
\t{#if items.length}
\t\t{#each items as item, index}
\t\t\t<AccordionPrimitive.Item
\t\t\t\tdata-slot="accordion-item"
\t\t\t\tclass="cn-accordion-item"
\t\t\t\tvalue={item.value ?? \`item-\${index + 1}\`}
\t\t\t\tdisabled={item.disabled}
\t\t\t>
\t\t\t\t<AccordionPrimitive.Header data-slot="accordion-header" class="cn-accordion-header">
\t\t\t\t\t<AccordionPrimitive.Trigger data-slot="accordion-trigger" class="cn-accordion-trigger">
\t\t\t\t\t\t{item.title}
\t\t\t\t\t</AccordionPrimitive.Trigger>
\t\t\t\t</AccordionPrimitive.Header>
\t\t\t\t<AccordionPrimitive.Content data-slot="accordion-content" class="cn-accordion-content">
\t\t\t\t\t{item.content}
\t\t\t\t</AccordionPrimitive.Content>
\t\t\t</AccordionPrimitive.Item>
\t\t{/each}
\t{:else}
\t\t{@render children?.()}
\t{/if}
</AccordionPrimitive.Root>
`
);

custom.set(
	"Collapsible",
	`<script>
\timport { Collapsible as CollapsiblePrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { open = $bindable(false), title = "", class: className = "", children, ...rest } = $props();
</script>

<CollapsiblePrimitive.Root
\tdata-slot="collapsible"
\tclass={cn("cn-collapsible", className)}
\tbind:open
\t{...rest}
>
\t{#if title}
\t\t<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" class="cn-collapsible-trigger">
\t\t\t{title}
\t\t</CollapsiblePrimitive.Trigger>
\t\t<CollapsiblePrimitive.Content data-slot="collapsible-content" class="cn-collapsible-content">
\t\t\t{@render children?.()}
\t\t</CollapsiblePrimitive.Content>
\t{:else}
\t\t{@render children?.()}
\t{/if}
</CollapsiblePrimitive.Root>
`
);

custom.set(
	"Dialog",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\topen = $bindable(false),
\t\ttrigger = "Open dialog",
\t\ttitle = "",
\t\tdescription = "",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
\t{#if title || description}
\t\t<DialogPrimitive.Trigger data-slot="dialog-trigger" class="cn-dialog-trigger">
\t\t\t{trigger}
\t\t</DialogPrimitive.Trigger>
\t\t<DialogPrimitive.Portal>
\t\t\t<DialogPrimitive.Overlay data-slot="dialog-overlay" class="cn-dialog-overlay" />
\t\t\t<DialogPrimitive.Content data-slot="dialog-popup" class={cn("cn-dialog", className)}>
\t\t\t\t{#if title}
\t\t\t\t\t<DialogPrimitive.Title data-slot="dialog-title" class="cn-dialog-title">
\t\t\t\t\t\t{title}
\t\t\t\t\t</DialogPrimitive.Title>
\t\t\t\t{/if}
\t\t\t\t{#if description}
\t\t\t\t\t<DialogPrimitive.Description data-slot="dialog-description" class="cn-dialog-description">
\t\t\t\t\t\t{description}
\t\t\t\t\t</DialogPrimitive.Description>
\t\t\t\t{/if}
\t\t\t\t{@render rootChildren?.()}
\t\t\t\t<DialogPrimitive.Close data-slot="dialog-close" class="cn-dialog-close">
\t\t\t\t\tClose
\t\t\t\t</DialogPrimitive.Close>
\t\t\t</DialogPrimitive.Content>
\t\t</DialogPrimitive.Portal>
\t{:else}
\t\t{@render rootChildren?.()}
\t{/if}
</DialogPrimitive.Root>
`
);

custom.set(
	"AlertDialog",
	`<script>
\timport { AlertDialog as AlertDialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\topen = $bindable(false),
\t\ttrigger = "Open alert dialog",
\t\ttitle = "",
\t\tdescription = "",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<AlertDialogPrimitive.Root bind:open {...rest}>
\t{#if title || description}
\t\t<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" class="cn-alert-dialog-trigger">
\t\t\t{trigger}
\t\t</AlertDialogPrimitive.Trigger>
\t\t<AlertDialogPrimitive.Portal>
\t\t\t<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
\t\t\t<AlertDialogPrimitive.Content
\t\t\t\tdata-slot="alert-dialog-popup"
\t\t\t\tclass={cn("cn-dialog cn-alert-dialog", className)}
\t\t\t>
\t\t\t\t{#if title}
\t\t\t\t\t<AlertDialogPrimitive.Title data-slot="alert-dialog-title" class="cn-dialog-title">
\t\t\t\t\t\t{title}
\t\t\t\t\t</AlertDialogPrimitive.Title>
\t\t\t\t{/if}
\t\t\t\t{#if description}
\t\t\t\t\t<AlertDialogPrimitive.Description
\t\t\t\t\t\tdata-slot="alert-dialog-description"
\t\t\t\t\t\tclass="cn-dialog-description"
\t\t\t\t\t>
\t\t\t\t\t\t{description}
\t\t\t\t\t</AlertDialogPrimitive.Description>
\t\t\t\t{/if}
\t\t\t\t{@render rootChildren?.()}
\t\t\t\t<div class="cn-alert-dialog-actions">
\t\t\t\t\t<AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" class="cn-alert-dialog-cancel">
\t\t\t\t\t\tCancel
\t\t\t\t\t</AlertDialogPrimitive.Cancel>
\t\t\t\t\t<AlertDialogPrimitive.Action data-slot="alert-dialog-action" class="cn-alert-dialog-action">
\t\t\t\t\t\tConfirm
\t\t\t\t\t</AlertDialogPrimitive.Action>
\t\t\t\t</div>
\t\t\t</AlertDialogPrimitive.Content>
\t\t</AlertDialogPrimitive.Portal>
\t{:else}
\t\t{@render rootChildren?.()}
\t{/if}
</AlertDialogPrimitive.Root>
`
);

custom.set(
	"Sheet",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\topen = $bindable(false),
\t\tside = "right",
\t\ttrigger = "Open sheet",
\t\ttitle = "",
\t\tdescription = "",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
\t{#if title || description}
\t\t<DialogPrimitive.Trigger data-slot="sheet-trigger" class="cn-sheet-trigger">
\t\t\t{trigger}
\t\t</DialogPrimitive.Trigger>
\t\t<DialogPrimitive.Portal>
\t\t\t<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
\t\t\t<DialogPrimitive.Content
\t\t\t\tdata-slot="sheet-popup"
\t\t\t\tdata-side={side}
\t\t\t\tclass={cn("cn-sheet", \`cn-sheet-\${side}\`, className)}
\t\t\t>
\t\t\t\t<header data-slot="sheet-header" class="cn-sheet-header">
\t\t\t\t\t<DialogPrimitive.Title data-slot="sheet-title" class="cn-sheet-title">
\t\t\t\t\t\t{title}
\t\t\t\t\t</DialogPrimitive.Title>
\t\t\t\t\t{#if description}
\t\t\t\t\t\t<DialogPrimitive.Description data-slot="sheet-description" class="cn-sheet-description">
\t\t\t\t\t\t\t{description}
\t\t\t\t\t\t</DialogPrimitive.Description>
\t\t\t\t\t{/if}
\t\t\t\t</header>
\t\t\t\t<div data-slot="sheet-panel" class="cn-sheet-panel">
\t\t\t\t\t{@render rootChildren?.()}
\t\t\t\t</div>
\t\t\t\t<footer data-slot="sheet-footer" class="cn-sheet-footer">
\t\t\t\t\t<DialogPrimitive.Close data-slot="sheet-close" class="cn-sheet-close">
\t\t\t\t\t\tClose
\t\t\t\t\t</DialogPrimitive.Close>
\t\t\t\t</footer>
\t\t\t</DialogPrimitive.Content>
\t\t</DialogPrimitive.Portal>
\t{:else}
\t\t{@render rootChildren?.()}
\t{/if}
</DialogPrimitive.Root>
`
);

custom.set(
	"Drawer",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\topen = $bindable(false),
\t\ttrigger = "Open drawer",
\t\ttitle = "",
\t\tdescription = "",
\t\tclass: className = "",
\t\tchildren: rootChildren,
\t\t...rest
\t} = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
\t{#if title || description}
\t\t<DialogPrimitive.Trigger data-slot="drawer-trigger" class="cn-drawer-trigger">
\t\t\t{trigger}
\t\t</DialogPrimitive.Trigger>
\t\t<DialogPrimitive.Portal>
\t\t\t<DialogPrimitive.Overlay data-slot="drawer-overlay" class="cn-dialog-overlay" />
\t\t\t<DialogPrimitive.Content data-slot="drawer-popup" class={cn("cn-drawer", className)}>
\t\t\t\t<span data-slot="drawer-create-handle" class="cn-drawer-handle" aria-hidden="true"></span>
\t\t\t\t<header data-slot="drawer-header" class="cn-drawer-header">
\t\t\t\t\t<DialogPrimitive.Title data-slot="drawer-title" class="cn-drawer-title">
\t\t\t\t\t\t{title}
\t\t\t\t\t</DialogPrimitive.Title>
\t\t\t\t\t{#if description}
\t\t\t\t\t\t<DialogPrimitive.Description data-slot="drawer-description" class="cn-drawer-description">
\t\t\t\t\t\t\t{description}
\t\t\t\t\t\t</DialogPrimitive.Description>
\t\t\t\t\t{/if}
\t\t\t\t</header>
\t\t\t\t<div data-slot="drawer-panel" class="cn-drawer-panel">
\t\t\t\t\t{@render rootChildren?.()}
\t\t\t\t</div>
\t\t\t\t<footer data-slot="drawer-footer" class="cn-drawer-footer">
\t\t\t\t\t<DialogPrimitive.Close data-slot="drawer-close" class="cn-drawer-close">
\t\t\t\t\t\tClose
\t\t\t\t\t</DialogPrimitive.Close>
\t\t\t\t</footer>
\t\t\t</DialogPrimitive.Content>
\t\t</DialogPrimitive.Portal>
\t{:else}
\t\t{@render rootChildren?.()}
\t{/if}
</DialogPrimitive.Root>
`
);

custom.set(
	"Popover",
	`<script>
\timport { Popover as PopoverPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { open = $bindable(false), label = "Popover", class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.Root bind:open {...rest}>
\t<PopoverPrimitive.Trigger data-slot="popover-trigger" class="cn-popover-trigger">
\t\t{label}
\t</PopoverPrimitive.Trigger>
\t<PopoverPrimitive.Portal>
\t\t<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)}>
\t\t\t{@render children?.()}
\t\t</PopoverPrimitive.Content>
\t</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
`
);

custom.set(
	"Tooltip",
	`<script>
\timport { Tooltip as TooltipPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { label = "Hover", tip = "Tooltip", class: className = "", ...rest } = $props();
</script>

<TooltipPrimitive.Root {...rest}>
\t<TooltipPrimitive.Trigger data-slot="tooltip-trigger" class="cn-tooltip-trigger">
\t\t{label}
\t</TooltipPrimitive.Trigger>
\t<TooltipPrimitive.Portal>
\t\t<TooltipPrimitive.Content data-slot="tooltip-popup" class={cn("cn-tooltip-content", className)}>
\t\t\t{tip}
\t\t</TooltipPrimitive.Content>
\t</TooltipPrimitive.Portal>
</TooltipPrimitive.Root>
`
);

custom.set(
	"PreviewCard",
	`<script>
\timport { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\thref = "#",
\t\tlabel = "Preview",
\t\ttitle = "Preview",
\t\tdescription = "",
\t\tclass: className = "",
\t\tchildren,
\t\t...rest
\t} = $props();
</script>

<LinkPreviewPrimitive.Root {...rest}>
\t<LinkPreviewPrimitive.Trigger data-slot="preview-card-trigger" class="cn-preview-card-trigger" {href}>
\t\t{label}
\t</LinkPreviewPrimitive.Trigger>
\t<LinkPreviewPrimitive.Portal>
\t\t<LinkPreviewPrimitive.Content data-slot="preview-card-popup" class={cn("cn-preview-card", className)}>
\t\t\t<h3>{title}</h3>
\t\t\t{#if description}
\t\t\t\t<p>{description}</p>
\t\t\t{/if}
\t\t\t{@render children?.()}
\t\t</LinkPreviewPrimitive.Content>
\t</LinkPreviewPrimitive.Portal>
</LinkPreviewPrimitive.Root>
`
);

custom.set(
	"Sidebar",
	`<script>
\timport { cn } from "../utils.js";

\tlet { items = [], label = "Sidebar", class: className = "", children, ...rest } = $props();
</script>

<aside data-slot="sidebar" class={cn("cn-sidebar", className)} aria-label={label} {...rest}>
\t<nav>
\t\t{#each items as item}
\t\t\t<a href={item.href ?? "#"}>{item.label ?? item}</a>
\t\t{/each}
\t</nav>
\t{@render children?.()}
</aside>
`
);

custom.set(
	"Toast",
	`<script>
\timport { cn } from "../utils.js";

\tlet { title = "Saved", description = "", class: className = "", children, ...rest } = $props();
</script>

<aside data-slot="toast" class={cn("cn-toast", className)} role="status" {...rest}>
\t<strong>{title}</strong>
\t{#if description}
\t\t<p>{description}</p>
\t{/if}
\t{@render children?.()}
</aside>
`
);

custom.set(
	"Toolbar",
	`<script>
\timport { Toolbar as ToolbarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { orientation = "horizontal", class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Root
\tdata-slot="toolbar"
\tclass={cn("cn-toolbar", className)}
\t{orientation}
\t{...rest}
>
\t{@render children?.()}
</ToolbarPrimitive.Root>
`
);

for (const name of ["Alert", "Card", "Empty", "Frame", "Group", "InputGroup"]) {
	custom.set(name, baseComponent(name));
}

for (const [name, as] of [
	["AlertDescription", "p"],
	["AlertTitle", "h3"],
	["CardDescription", "p"],
	["CardFooter", "footer"],
	["CardHeader", "header"],
	["CardPanel", "div"],
	["CardTitle", "h3"],
	["EmptyContent", "div"],
	["EmptyDescription", "p"],
	["EmptyHeader", "header"],
	["EmptyMedia", "div"],
	["EmptyTitle", "h3"],
	["FieldDescription", "p"],
	["FieldValidity", "p"],
	["FieldsetLegend", "legend"],
	["FrameDescription", "p"],
	["FrameFooter", "footer"],
	["FrameHeader", "header"],
	["FramePanel", "div"],
	["FrameTitle", "h3"],
	["TableBody", "tbody"],
	["TableCaption", "caption"],
	["TableCell", "td"],
	["TableFooter", "tfoot"],
	["TableHeader", "thead"],
	["TableRow", "tr"],
]) {
	custom.set(name, partComponent(name, { as }));
}

for (const [name, primitive, dataSlot, classToken] of [
	["AccordionItem", "Item", "accordion-item", "cn-accordion-item"],
	["AccordionHeader", "Header", "accordion-header", "cn-accordion-header"],
	["AccordionTrigger", "Trigger", "accordion-trigger", "cn-accordion-trigger"],
	["AccordionContent", "Content", "accordion-content", "cn-accordion-content"],
]) {
	custom.set(
		name,
		`<script>
\timport { Accordion as AccordionPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<AccordionPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</AccordionPrimitive.${primitive}>
`
	);
}

for (const [name, primitive, dataSlot, classToken] of [
	["CollapsibleTrigger", "Trigger", "collapsible-trigger", "cn-collapsible-trigger"],
	["CollapsibleContent", "Content", "collapsible-content", "cn-collapsible-content"],
]) {
	custom.set(
		name,
		`<script>
\timport { Collapsible as CollapsiblePrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<CollapsiblePrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</CollapsiblePrimitive.${primitive}>
`
	);
}

for (const [name, primitive, dataSlot, classToken] of [
	["TabsList", "List", "tabs-list", "cn-tabs-list"],
	["TabsTrigger", "Trigger", "tabs-trigger", "cn-tabs-trigger"],
	["TabsContent", "Content", "tabs-content", "cn-tabs-content"],
]) {
	custom.set(
		name,
		`<script>
\timport { Tabs as TabsPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<TabsPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</TabsPrimitive.${primitive}>
`
	);
}

custom.set(
	"ToggleGroupItem",
	`<script>
\timport { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ToggleGroupPrimitive.Item
\tdata-slot="toggle-group-item"
\tclass={cn("cn-toggle-group-item", className)}
\t{...rest}
>
\t{@render children?.()}
</ToggleGroupPrimitive.Item>
`
);

custom.set(
	"SwitchThumb",
	`<script>
\timport { Switch as SwitchPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<SwitchPrimitive.Thumb
\tdata-slot="switch-thumb"
\tclass={cn("cn-switch-thumb", className)}
\t{...rest}
>
\t{@render children?.()}
</SwitchPrimitive.Thumb>
`
);

custom.set(
	"AvatarImage",
	`<script>
\timport { Avatar as AvatarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<AvatarPrimitive.Image
\tdata-slot="avatar-image"
\tclass={cn("cn-avatar-image", className)}
\t{...rest}
/>
`
);

custom.set(
	"AvatarFallback",
	`<script>
\timport { Avatar as AvatarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<AvatarPrimitive.Fallback
\tdata-slot="avatar-fallback"
\tclass={cn("cn-avatar-fallback", className)}
\t{...rest}
>
\t{@render children?.()}
</AvatarPrimitive.Fallback>
`
);

custom.set(
	"RadioGroupItem",
	`<script>
\timport { RadioGroup as RadioGroupPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children: itemChildren, ...rest } = $props();
</script>

<RadioGroupPrimitive.Item
\tdata-slot="radio-group-item"
\tclass={cn("cn-radio", className)}
\t{...rest}
>
\t{#snippet children({ checked })}
\t\t<span
\t\t\tclass="cn-radio-indicator"
\t\t\tdata-state={checked ? "checked" : "unchecked"}
\t\t\taria-hidden="true"
\t\t></span>
\t\t<span>{@render itemChildren?.({ checked })}</span>
\t{/snippet}
</RadioGroupPrimitive.Item>
`
);

custom.set(
	"OTPFieldCell",
	`<script>
\timport { PinInput as PinInputPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<PinInputPrimitive.Cell
\tdata-slot="otp-field-cell"
\tclass={cn("cn-otp-cell", className)}
\t{...rest}
>
\t{@render children?.()}
</PinInputPrimitive.Cell>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["PaginationPrevButton", "PrevButton", "pagination-prev-button", "cn-pagination-button"],
	["PaginationNextButton", "NextButton", "pagination-next-button", "cn-pagination-button"],
	["PaginationPage", "Page", "pagination-page", "cn-pagination-button"],
]) {
	custom.set(
		name,
		`<script>
\timport { Pagination as PaginationPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<PaginationPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</PaginationPrimitive.${primitive}>
`
	);
}

custom.set(
	"PaginationPage",
	`<script>
\timport { Pagination as PaginationPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children: pageChildren, ...rest } = $props();
</script>

{#if pageChildren}
\t<PaginationPrimitive.Page
\t\tdata-slot="pagination-page"
\t\tclass={cn("cn-pagination-button", className)}
\t\t{...rest}
\t>
\t\t{@render pageChildren?.()}
\t</PaginationPrimitive.Page>
{:else}
\t<PaginationPrimitive.Page
\t\tdata-slot="pagination-page"
\t\tclass={cn("cn-pagination-button", className)}
\t\t{...rest}
\t/>
{/if}
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["SliderRange", "Range", "slider-range", "cn-slider-range"],
	["SliderThumb", "Thumb", "slider-thumb", "cn-slider-thumb"],
	["SliderTick", "Tick", "slider-tick", "cn-slider-tick"],
	["SliderTickLabel", "TickLabel", "slider-tick-label", "cn-slider-tick-label"],
	["SliderThumbLabel", "ThumbLabel", "slider-thumb-label", "cn-slider-thumb-label"],
]) {
	custom.set(
		name,
		`<script>
\timport { Slider as SliderPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</SliderPrimitive.${primitive}>
`
	);
}

custom.set(
	"ScrollAreaScrollbar",
	`<script>
\timport { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { orientation = "vertical", class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
\tdata-slot="scroll-area-scrollbar"
\tclass={cn("cn-scroll-area-scrollbar", className)}
\t{orientation}
\t{...rest}
>
\t{@render children?.()}
</ScrollAreaPrimitive.Scrollbar>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["ScrollAreaViewport", "Viewport", "scroll-area-viewport", "cn-scroll-area-viewport"],
	["ScrollAreaThumb", "Thumb", "scroll-area-thumb", "cn-scroll-area-thumb"],
	["ScrollAreaCorner", "Corner", "scroll-area-corner", "cn-scroll-area-corner"],
]) {
	custom.set(
		name,
		`<script>
\timport { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</ScrollAreaPrimitive.${primitive}>
`
	);
}

for (const [name, primitive, dataSlot, classToken] of [
	["ToolbarButton", "Button", "toolbar-button", "cn-toolbar-button"],
	["ToolbarLink", "Link", "toolbar-link", "cn-toolbar-link"],
	["ToolbarGroupItem", "GroupItem", "toolbar-group-item", "cn-toolbar-group-item"],
]) {
	custom.set(
		name,
		`<script>
\timport { Toolbar as ToolbarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</ToolbarPrimitive.${primitive}>
`
	);
}

custom.set(
	"ToolbarGroup",
	`<script>
\timport { Toolbar as ToolbarPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { type = "single", value = $bindable(), class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Group
\tdata-slot="toolbar-group"
\tclass={cn("cn-toolbar-group", className)}
\t{type}
\tbind:value
\t{...rest}
>
\t{@render children?.()}
</ToolbarPrimitive.Group>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["DialogTrigger", "Trigger", "dialog-trigger", "cn-dialog-trigger"],
	["DialogClose", "Close", "dialog-close", "cn-dialog-close"],
	["DialogTitle", "Title", "dialog-title", "cn-dialog-title"],
	["DialogDescription", "Description", "dialog-description", "cn-dialog-description"],
]) {
	custom.set(
		name,
		`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</DialogPrimitive.${primitive}>
`
	);
}

custom.set(
	"DialogPopup",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
\t<DialogPrimitive.Overlay data-slot="dialog-overlay" class="cn-dialog-overlay" />
\t<DialogPrimitive.Content data-slot="dialog-popup" class={cn("cn-dialog", className)} {...rest}>
\t\t{@render children?.()}
\t</DialogPrimitive.Content>
</DialogPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["AlertDialogTrigger", "Trigger", "alert-dialog-trigger", "cn-alert-dialog-trigger"],
	["AlertDialogAction", "Action", "alert-dialog-action", "cn-alert-dialog-action"],
	["AlertDialogCancel", "Cancel", "alert-dialog-cancel", "cn-alert-dialog-cancel"],
	["AlertDialogTitle", "Title", "alert-dialog-title", "cn-dialog-title"],
	["AlertDialogDescription", "Description", "alert-dialog-description", "cn-dialog-description"],
]) {
	custom.set(
		name,
		`<script>
\timport { AlertDialog as AlertDialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</AlertDialogPrimitive.${primitive}>
`
	);
}

custom.set(
	"AlertDialogPopup",
	`<script>
\timport { AlertDialog as AlertDialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Portal>
\t<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
\t<AlertDialogPrimitive.Content
\t\tdata-slot="alert-dialog-popup"
\t\tclass={cn("cn-dialog cn-alert-dialog", className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["PopoverTrigger", "Trigger", "popover-trigger", "cn-popover-trigger"],
	["PopoverClose", "Close", "popover-close", "cn-popover-close"],
]) {
	custom.set(
		name,
		`<script>
\timport { Popover as PopoverPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</PopoverPrimitive.${primitive}>
`
	);
}

custom.set(
	"PopoverPopup",
	`<script>
\timport { Popover as PopoverPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.Portal>
\t<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)} {...rest}>
\t\t{@render children?.()}
\t</PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
`
);

custom.set(
	"TooltipProvider",
	`<script>
\timport { Tooltip as TooltipPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.Provider {...rest}>
\t<span data-slot="tooltip-provider" class={cn("cn-tooltip-provider", className)}>
\t\t{@render children?.()}
\t</span>
</TooltipPrimitive.Provider>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["TooltipTrigger", "Trigger", "tooltip-trigger", "cn-tooltip-trigger"],
	["TooltipPopup", "Content", "tooltip-popup", "cn-tooltip-content"],
]) {
	custom.set(
		name,
		`<script>
\timport { Tooltip as TooltipPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</TooltipPrimitive.${primitive}>
`
	);
}

custom.set(
	"PreviewCardTrigger",
	`<script>
\timport { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<LinkPreviewPrimitive.Trigger
\tdata-slot="preview-card-trigger"
\tclass={cn("cn-preview-card-trigger", className)}
\t{...rest}
>
\t{@render children?.()}
</LinkPreviewPrimitive.Trigger>
`
);

custom.set(
	"PreviewCardPopup",
	`<script>
\timport { LinkPreview as LinkPreviewPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<LinkPreviewPrimitive.Portal>
\t<LinkPreviewPrimitive.Content
\t\tdata-slot="preview-card-popup"
\t\tclass={cn("cn-preview-card", className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</LinkPreviewPrimitive.Content>
</LinkPreviewPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["SelectTrigger", "Trigger", "select-trigger", "cn-select-trigger"],
	["SelectValue", "Value", "select-value", "cn-select-value"],
	["SelectItem", "Item", "select-item", "cn-select-item"],
	["SelectGroup", "Group", "select-group", "cn-select-group"],
	["SelectGroupLabel", "GroupHeading", "select-group-label", "cn-select-group-label"],
	["SelectViewport", "Viewport", "select-viewport", "cn-select-viewport"],
	["SelectScrollUpButton", "ScrollUpButton", "select-scroll-up-button", "cn-select-scroll-button"],
	[
		"SelectScrollDownButton",
		"ScrollDownButton",
		"select-scroll-down-button",
		"cn-select-scroll-button",
	],
]) {
	custom.set(
		name,
		`<script>
\timport { Select as SelectPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</SelectPrimitive.${primitive}>
`
	);
}

custom.set(
	"SelectValue",
	`<script>
\timport { Select as SelectPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children: valueChildren, ...rest } = $props();
</script>

{#if valueChildren}
\t<SelectPrimitive.Value
\t\tdata-slot="select-value"
\t\tclass={cn("cn-select-value", className)}
\t\t{...rest}
\t>
\t\t{#snippet children(props)}
\t\t\t{@render valueChildren?.(props)}
\t\t{/snippet}
\t</SelectPrimitive.Value>
{:else}
\t<SelectPrimitive.Value
\t\tdata-slot="select-value"
\t\tclass={cn("cn-select-value", className)}
\t\t{...rest}
\t/>
{/if}
`
);

custom.set(
	"SelectPopup",
	`<script>
\timport { Select as SelectPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.Portal>
\t<SelectPrimitive.Content data-slot="select-popup" class={cn("cn-select-popup", className)} {...rest}>
\t\t{@render children?.()}
\t</SelectPrimitive.Content>
</SelectPrimitive.Portal>
`
);

custom.set(
	"AutocompleteInput",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet {
\t\tclass: className = "",
\t\tshowTrigger = false,
\t\ttriggerProps = {},
\t\t...rest
\t} = $props();

\tlet triggerClass = $derived(triggerProps.class ?? "");
\tlet triggerLabel = $derived(triggerProps["aria-label"] ?? "Toggle autocomplete suggestions");
\tlet triggerRest = $derived.by(() => {
\t\tconst {
\t\t\tclass: _class,
\t\t\t"aria-label": _ariaLabel,
\t\t\tchildren: _children,
\t\t\t...attrs
\t\t} = triggerProps;
\t\treturn attrs;
\t});
</script>

{#if showTrigger}
\t<span data-slot="autocomplete-input-group" class="cn-autocomplete-input-group">
\t\t<ComboboxPrimitive.Input
\t\t\tdata-slot="autocomplete-input"
\t\t\tclass={cn("cn-autocomplete-input", className)}
\t\t\t{...rest}
\t\t/>
\t\t<ComboboxPrimitive.Trigger
\t\t\tdata-slot="autocomplete-trigger"
\t\t\tclass={cn("cn-autocomplete-trigger", triggerClass)}
\t\t\taria-label={triggerLabel}
\t\t\t{...triggerRest}
\t\t>
\t\t\t<span aria-hidden="true">v</span>
\t\t</ComboboxPrimitive.Trigger>
\t</span>
{:else}
\t<ComboboxPrimitive.Input
\t\tdata-slot="autocomplete-input"
\t\tclass={cn("cn-autocomplete-input", className)}
\t\t{...rest}
\t/>
{/if}
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["AutocompleteGroup", "Group", "autocomplete-group", "cn-autocomplete-group"],
	[
		"AutocompleteGroupLabel",
		"GroupHeading",
		"autocomplete-group-label",
		"cn-autocomplete-group-label",
	],
	["AutocompleteItem", "Item", "autocomplete-item", "cn-autocomplete-item"],
	["AutocompleteList", "Viewport", "autocomplete-list", "cn-autocomplete-list"],
	["AutocompleteSeparator", "Separator", "autocomplete-separator", "cn-autocomplete-separator"],
]) {
	custom.set(
		name,
		`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</ComboboxPrimitive.${primitive}>
`
	);
}

custom.set(
	"AutocompletePopup",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Portal>
\t<ComboboxPrimitive.Content
\t\tdata-slot="autocomplete-popup"
\t\tclass={cn("cn-autocomplete-popup", className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
`
);

for (const [name, as, dataSlot, classToken] of [
	["AutocompleteCollection", "div", "autocomplete-collection", "cn-autocomplete-collection"],
	["AutocompleteEmpty", "div", "autocomplete-empty", "cn-autocomplete-empty"],
	["AutocompleteStatus", "div", "autocomplete-status", "cn-autocomplete-status"],
]) {
	custom.set(name, partComponent(name, { as, dataSlot, className: classToken }));
}

custom.set(
	"ComboboxInput",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<ComboboxPrimitive.Input
\tdata-slot="combobox-input"
\tclass={cn("cn-combobox-input", className)}
\t{...rest}
/>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["ComboboxTrigger", "Trigger", "combobox-trigger", "cn-combobox-trigger"],
	["ComboboxGroup", "Group", "combobox-group", "cn-combobox-group"],
	["ComboboxGroupLabel", "GroupHeading", "combobox-group-label", "cn-combobox-group-label"],
	["ComboboxItem", "Item", "combobox-item", "cn-combobox-item"],
	["ComboboxList", "Viewport", "combobox-list", "cn-combobox-list"],
	["ComboboxSeparator", "Separator", "combobox-separator", "cn-combobox-separator"],
]) {
	custom.set(
		name,
		`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</ComboboxPrimitive.${primitive}>
`
	);
}

custom.set(
	"ComboboxPopup",
	`<script>
\timport { Combobox as ComboboxPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Portal>
\t<ComboboxPrimitive.Content
\t\tdata-slot="combobox-popup"
\t\tclass={cn("cn-combobox-popup", className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
`
);

for (const [name, as, dataSlot, classToken] of [
	["ComboboxClear", "button", "combobox-clear", "cn-combobox-clear"],
	["ComboboxCollection", "div", "combobox-collection", "cn-combobox-collection"],
	["ComboboxEmpty", "div", "combobox-empty", "cn-combobox-empty"],
	["ComboboxValue", "span", "combobox-value", "cn-combobox-value"],
]) {
	custom.set(name, partComponent(name, { as, dataSlot, className: classToken }));
}

custom.set(
	"CommandDialog",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { open = $bindable(false), class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
\t<span data-slot="command-dialog" class={cn("cn-command-dialog-shell", className)}>
\t\t{@render children?.()}
\t</span>
</DialogPrimitive.Root>
`
);

custom.set(
	"CommandDialogPopup",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
\t<DialogPrimitive.Overlay data-slot="command-dialog-overlay" class="cn-dialog-overlay" />
\t<DialogPrimitive.Content
\t\tdata-slot="command-dialog-popup"
\t\tclass={cn("cn-dialog cn-command-dialog-popup", className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</DialogPrimitive.Content>
</DialogPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["CommandDialogTrigger", "Trigger", "command-dialog-trigger", "cn-command-dialog-trigger"],
	["CommandEmpty", "Empty", "command-empty", "cn-command-empty"],
	["CommandGroup", "Group", "command-group", "cn-command-group"],
	["CommandGroupLabel", "GroupHeading", "command-group-label", "cn-command-group-label"],
	["CommandCollection", "GroupItems", "command-collection", "cn-command-collection"],
	["CommandItem", "Item", "command-item", "cn-command-item"],
	["CommandList", "List", "command-list", "cn-command-list"],
	["CommandPanel", "Viewport", "command-panel", "cn-command-panel"],
	["CommandSeparator", "Separator", "command-separator", "cn-command-separator"],
]) {
	custom.set(
		name,
		`<script>
\timport { Command as CommandPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</CommandPrimitive.${primitive}>
`
	);
}

custom.set(
	"CommandInput",
	`<script>
\timport { Command as CommandPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<CommandPrimitive.Input
\tdata-slot="command-input"
\tclass={cn("cn-command-input", className)}
\t{...rest}
/>
`
);

custom.set(
	"CommandDialogTrigger",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Trigger
\tdata-slot="command-dialog-trigger"
\tclass={cn("cn-command-dialog-trigger", className)}
\t{...rest}
>
\t{@render children?.()}
</DialogPrimitive.Trigger>
`
);

for (const [name, as, dataSlot, classToken] of [
	["CommandFooter", "footer", "command-footer", "cn-command-footer"],
	["CommandShortcut", "span", "command-shortcut", "cn-command-shortcut"],
]) {
	custom.set(name, partComponent(name, { as, dataSlot, className: classToken }));
}

custom.set(
	"MenuSub",
	`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { open = $bindable(false), class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Sub bind:open {...rest}>
\t<span data-slot="menu-sub" class={cn("cn-menu-sub-shell", className)}>
\t\t{@render children?.()}
\t</span>
</MenuPrimitive.Sub>
`
);

custom.set(
	"MenuPopup",
	`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Portal>
\t<MenuPrimitive.Content data-slot="menu-popup" class={cn("cn-menu-popup", className)} {...rest}>
\t\t{@render children?.()}
\t</MenuPrimitive.Content>
</MenuPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["MenuTrigger", "Trigger", "menu-trigger", "cn-menu-trigger"],
	["MenuGroup", "Group", "menu-group", "cn-menu-group"],
	["MenuGroupLabel", "GroupHeading", "menu-group-label", "cn-menu-group-label"],
	["MenuItem", "Item", "menu-item", "cn-menu-item"],
	["MenuRadioGroup", "RadioGroup", "menu-radio-group", "cn-menu-radio-group"],
	["MenuSeparator", "Separator", "menu-separator", "cn-menu-separator"],
	["MenuSubTrigger", "SubTrigger", "menu-sub-trigger", "cn-menu-sub-trigger"],
	["MenuSubPopup", "SubContent", "menu-sub-popup", "cn-menu-sub-popup"],
]) {
	custom.set(
		name,
		`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</MenuPrimitive.${primitive}>
`
	);
}

custom.set(
	"MenuCheckboxItem",
	`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children: itemChildren, ...rest } = $props();
</script>

<MenuPrimitive.CheckboxItem
\tdata-slot="menu-checkbox-item"
\tclass={cn("cn-menu-item cn-menu-checkbox-item", className)}
\t{...rest}
>
\t{#snippet children({ checked, indeterminate })}
\t\t<span
\t\t\tclass="cn-menu-item-indicator"
\t\t\tdata-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
\t\t\taria-hidden="true"
\t\t></span>
\t\t<span>{@render itemChildren?.({ checked, indeterminate })}</span>
\t{/snippet}
</MenuPrimitive.CheckboxItem>
`
);

custom.set(
	"MenuRadioItem",
	`<script>
\timport { DropdownMenu as MenuPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children: itemChildren, ...rest } = $props();
</script>

<MenuPrimitive.RadioItem
\tdata-slot="menu-radio-item"
\tclass={cn("cn-menu-item cn-menu-radio-item", className)}
\t{...rest}
>
\t{#snippet children({ checked })}
\t\t<span
\t\t\tclass="cn-menu-item-indicator"
\t\t\tdata-state={checked ? "checked" : "unchecked"}
\t\t\taria-hidden="true"
\t\t></span>
\t\t<span>{@render itemChildren?.({ checked })}</span>
\t{/snippet}
</MenuPrimitive.RadioItem>
`
);

custom.set(
	"MenuShortcut",
	partComponent("MenuShortcut", {
		as: "span",
		dataSlot: "menu-shortcut",
		className: "cn-menu-shortcut",
	})
);

custom.set(
	"SheetPopup",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { side = "right", class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
\t<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
\t<DialogPrimitive.Content
\t\tdata-slot="sheet-popup"
\t\tdata-side={side}
\t\tclass={cn("cn-sheet", \`cn-sheet-\${side}\`, className)}
\t\t{...rest}
\t>
\t\t{@render children?.()}
\t</DialogPrimitive.Content>
</DialogPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["SheetTrigger", "Trigger", "sheet-trigger", "cn-sheet-trigger"],
	["SheetClose", "Close", "sheet-close", "cn-sheet-close"],
	["SheetTitle", "Title", "sheet-title", "cn-sheet-title"],
	["SheetDescription", "Description", "sheet-description", "cn-sheet-description"],
]) {
	custom.set(
		name,
		`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</DialogPrimitive.${primitive}>
`
	);
}

for (const [name, as, dataSlot, classToken] of [
	["SheetContent", "div", "sheet-content", "cn-sheet-content"],
	["SheetFooter", "footer", "sheet-footer", "cn-sheet-footer"],
	["SheetHeader", "header", "sheet-header", "cn-sheet-header"],
	["SheetPanel", "div", "sheet-panel", "cn-sheet-panel"],
]) {
	custom.set(name, partComponent(name, { as, dataSlot, className: classToken }));
}

custom.set(
	"DrawerPopup",
	`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
\t<DialogPrimitive.Overlay data-slot="drawer-overlay" class="cn-dialog-overlay" />
\t<DialogPrimitive.Content data-slot="drawer-popup" class={cn("cn-drawer", className)} {...rest}>
\t\t{@render children?.()}
\t</DialogPrimitive.Content>
</DialogPrimitive.Portal>
`
);

for (const [name, primitive, dataSlot, classToken] of [
	["DrawerTrigger", "Trigger", "drawer-trigger", "cn-drawer-trigger"],
	["DrawerClose", "Close", "drawer-close", "cn-drawer-close"],
	["DrawerTitle", "Title", "drawer-title", "cn-drawer-title"],
	["DrawerDescription", "Description", "drawer-description", "cn-drawer-description"],
]) {
	custom.set(
		name,
		`<script>
\timport { Dialog as DialogPrimitive } from "bits-ui";
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.${primitive}
\tdata-slot="${dataSlot}"
\tclass={cn("${classToken}", className)}
\t{...rest}
>
\t{@render children?.()}
</DialogPrimitive.${primitive}>
`
	);
}

custom.set(
	"DrawerCreateHandle",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", ...rest } = $props();
</script>

<span
\tdata-slot="drawer-create-handle"
\tclass={cn("cn-drawer-handle", className)}
\taria-hidden="true"
\t{...rest}
></span>
`
);

for (const [name, as, dataSlot, classToken] of [
	["DrawerContent", "div", "drawer-content", "cn-drawer-content"],
	["DrawerFooter", "footer", "drawer-footer", "cn-drawer-footer"],
	["DrawerHeader", "header", "drawer-header", "cn-drawer-header"],
	["DrawerPanel", "div", "drawer-panel", "cn-drawer-panel"],
]) {
	custom.set(name, partComponent(name, { as, dataSlot, className: classToken }));
}

custom.set(
	"AlertAction",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="alert-action" class={cn("cn-alert-action", className)} {...rest}>
\t{@render children?.()}
</div>
`
);

custom.set(
	"FieldLabel",
	`<script>
\timport { cn } from "../utils.js";

\tlet { required = false, class: className = "", children, ...rest } = $props();
</script>

<label data-slot="field-label" class={cn("cn-field-label", className)} {...rest}>
\t<span>{@render children?.()}</span>
\t{#if required}
\t\t<span class="cn-field-required" aria-hidden="true">*</span>
\t{/if}
</label>
`
);

custom.set(
	"FieldError",
	`<script>
\timport { cn } from "../utils.js";

\tlet { class: className = "", children, ...rest } = $props();
</script>

<p data-slot="field-error" class={cn("cn-field-error", className)} role="alert" {...rest}>
\t{@render children?.()}
</p>
`
);

custom.set(
	"TableHead",
	`<script>
\timport { cn } from "../utils.js";

\tlet { scope = "col", class: className = "", children, ...rest } = $props();
</script>

<th data-slot="table-head" class={cn("cn-table-head", className)} {scope} {...rest}>
\t{@render children?.()}
</th>
`
);

async function write(path, content) {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, content);
}

function formatGeneratedSources() {
	const targets = [packageSrc, join(root, "packages/registry/src")];
	const result = spawnSync("pnpm", ["exec", "biome", "format", "--write", ...targets], {
		cwd: root,
		stdio: "inherit",
	});

	if (result.error) {
		throw result.error;
	}

	if (result.status !== 0) {
		throw new Error(
			`Biome format failed for ${targets.map((target) => relative(root, target)).join(", ")}`
		);
	}
}

async function main() {
	await mkdir(componentsDir, { recursive: true });
	await mkdir(internalDir, { recursive: true });
	const generatedComponents = [...stable, ...experimental, ...partNames].sort((first, second) =>
		first.localeCompare(second)
	);
	const componentMetadata = await buildComponentMetadata();

	await write(
		join(packageSrc, "utils.js"),
		`import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
\treturn twMerge(clsx(inputs));
}
`
	);

	await write(
		join(internalDir, "Block.svelte"),
		`<script>
\timport { cn } from "../utils.js";

\tlet { as = "div", dataSlot = "", class: className = "", children, ...rest } = $props();
</script>

<svelte:element this={as} data-slot={dataSlot || undefined} class={cn(className)} {...rest}>
\t{@render children?.()}
</svelte:element>
`
	);

	for (const name of generatedComponents) {
		await write(componentPath(name), custom.get(name) ?? baseComponent(name));
	}

	await write(
		join(packageSrc, "metadata.js"),
		`export const stableComponents = ${JSON.stringify(stable, null, "\t")};

export const experimentalComponents = ${JSON.stringify(experimental, null, "\t")};

export const deferredComponents = ${JSON.stringify(deferred, null, "\t")};

export const componentParts = ${JSON.stringify(componentParts, null, "\t")};

export const componentStatus = Object.freeze({
${[...stable.map((name) => `\t${name}: "stable"`), ...experimental.map((name) => `\t${name}: "experimental"`), ...deferred.map((name) => `\t${name}: "deferred"`)].join(",\n")}
});

export const componentMetadata = Object.freeze(${JSON.stringify(componentMetadata, null, "\t")});
`
	);

	await write(
		join(packageSrc, "index.js"),
		`${generatedComponents
			.map((name) => `export { default as ${name} } from "./components/${name}.svelte";`)
			.join("\n")}
export {
\tcomponentMetadata,
\tcomponentParts,
\tcomponentStatus,
\tdeferredComponents,
\texperimentalComponents,
\tstableComponents,
} from "./metadata.js";
export { cn } from "./utils.js";
`
	);

	await write(
		join(packageSrc, "index.d.ts"),
		`import type { Component } from "svelte";

type AnyComponent = Component<Record<string, unknown>>;

${generatedComponents.map((name) => `export const ${name}: AnyComponent;`).join("\n")}

export type ComponentStatus = "stable" | "experimental" | "deferred";
export type ComponentFoundation = "bits" | "native" | "compound" | "custom";
export type ParticlePriority = "mvp" | "later" | "unsupported";
export type ComponentMetadata = {
\tcategory: string;
\tdescription: string;
\tdocsUrl: string;
\tfirstImplementationPass: string;
\tfoundation: ComponentFoundation;
\thasLocalPrimitiveRef: boolean;
\tname: string;
\tparticlePriority: ParticlePriority;
\tparticles: number;
\tparts: string[];
\tprimitive: string;
\tslug: string;
\tstatus: ComponentStatus;
\ttier: string;
\ttitle: string;
};

export const stableComponents: string[];
export const experimentalComponents: string[];
export const deferredComponents: string[];
export const componentParts: Record<string, string[]>;
export const componentStatus: Record<string, ComponentStatus>;
export const componentMetadata: Record<string, ComponentMetadata>;
export function cn(...inputs: unknown[]): string;
`
	);

	await write(
		join(root, "packages/registry/src/index.js"),
		`import {
\tcomponentMetadata,
\tcomponentParts,
\tcomponentStatus,
\tdeferredComponents,
\texperimentalComponents,
\tstableComponents,
} from "coss-svelte/metadata";

const themeCssVars = {
\t"--cn-background": "#f7f7f4",
\t"--cn-foreground": "#171717",
\t"--cn-surface": "#ffffff",
\t"--cn-border": "#deded6",
\t"--cn-primary": "#111111",
\t"--cn-radius": "0.5rem",
};

const bitsBackedCompoundComponents = new Set([
	"Autocomplete",
	"Command",
	"Drawer",
	"Menu",
	"Sheet",
]);

function componentFiles(metadata) {
\tif (metadata.status === "deferred") {
\t\treturn [];
\t}

\treturn [metadata.name, ...(componentParts[metadata.name] ?? [])].map((name) => ({
\t\tpath: \`packages/coss-svelte/src/components/\${name}.svelte\`,
\t\ttarget: \`components/\${name}.svelte\`,
\t\ttype: "registry:ui",
\t}));
}

function componentDependencies(metadata) {
\tif (
\t\tmetadata.status !== "deferred" &&
\t\t(metadata.foundation === "bits" || bitsBackedCompoundComponents.has(metadata.name))
\t) {
\t\treturn ["bits-ui"];
\t}

\treturn [];
}

export const registryItems = Object.values(componentMetadata).map((metadata) => ({
\tname: metadata.name,
\ttitle: metadata.title,
\tdescription: metadata.description,
\ttype: "registry:ui",
\tfiles: componentFiles(metadata),
\tdependencies: componentDependencies(metadata),
\tdevDependencies: [],
\tregistryDependencies: [],
\tcssVars: themeCssVars,
\tmeta: {
\t\tstatus: metadata.status,
\t\tfoundation: metadata.foundation,
\t\tparticlePriority: metadata.particlePriority,
\t\tslug: metadata.slug,
\t},
\tcategories: [metadata.category],
\tdocs: metadata.docsUrl,
}));

export {
\tcomponentMetadata,
\tcomponentParts,
\tcomponentStatus,
\tdeferredComponents,
\texperimentalComponents,
\tstableComponents,
};
`
	);

	formatGeneratedSources();
}

await main();
