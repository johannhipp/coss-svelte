export type ParticleExample = {
	id: string;
	title: string;
	url: string;
};

export type CatalogComponent = {
	name: string;
	slug: string;
	category: string;
	scope: string;
	particleCount: number;
	docsUrl: string;
	particles: ParticleExample[];
};

export type CatalogGroup = {
	category: string;
	components: CatalogComponent[];
};

export const catalogGroups = [
	{
		category: "Overlays & Popups",
		components: [
			{
				name: "Dialog",
				slug: "dialog",
				category: "Overlays & Popups",
				scope: "A modal overlay for displaying content that requires user interaction.",
				particleCount: 6,
				docsUrl: "https://coss.com/ui/docs/components/dialog.md",
				particles: [
					{
						id: "p-dialog-1",
						title: "Dialog with form",
						url: "https://coss.com/ui/r/p-dialog-1.json",
					},
					{
						id: "p-dialog-6",
						title: "Dialog with bare footer",
						url: "https://coss.com/ui/r/p-dialog-6.json",
					},
					{
						id: "p-dialog-2",
						title: "Dialog opened from menu",
						url: "https://coss.com/ui/r/p-dialog-2.json",
					},
					{
						id: "p-dialog-3",
						title: "Nested dialogs",
						url: "https://coss.com/ui/r/p-dialog-3.json",
					},
					{
						id: "p-dialog-4",
						title: "Dialog with close confirmation",
						url: "https://coss.com/ui/r/p-dialog-4.json",
					},
					{
						id: "p-dialog-5",
						title: "Dialog with long content",
						url: "https://coss.com/ui/r/p-dialog-5.json",
					},
				],
			},
			{
				name: "Alert Dialog",
				slug: "alert-dialog",
				category: "Overlays & Popups",
				scope: "A modal dialog that interrupts the user workflow for critical confirmations.",
				particleCount: 2,
				docsUrl: "https://coss.com/ui/docs/components/alert-dialog.md",
				particles: [
					{
						id: "p-alert-dialog-1",
						title: "Alert dialog",
						url: "https://coss.com/ui/r/p-alert-dialog-1.json",
					},
					{
						id: "p-alert-dialog-2",
						title: "Alert dialog with bare footer",
						url: "https://coss.com/ui/r/p-alert-dialog-2.json",
					},
				],
			},
			{
				name: "Sheet",
				slug: "sheet",
				category: "Overlays & Popups",
				scope: "A flyout that opens from the side of the screen, based on the dialog component.",
				particleCount: 3,
				docsUrl: "https://coss.com/ui/docs/components/sheet.md",
				particles: [
					{
						id: "p-sheet-1",
						title: "Basic sheet",
						url: "https://coss.com/ui/r/p-sheet-1.json",
					},
					{
						id: "p-sheet-2",
						title: "Sheet inset",
						url: "https://coss.com/ui/r/p-sheet-2.json",
					},
					{
						id: "p-sheet-3",
						title: "Sheet position",
						url: "https://coss.com/ui/r/p-sheet-3.json",
					},
				],
			},
			{
				name: "Drawer",
				slug: "drawer",
				category: "Overlays & Popups",
				scope:
					"A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.",
				particleCount: 14,
				docsUrl: "https://coss.com/ui/docs/components/drawer.md",
				particles: [
					{
						id: "p-drawer-1",
						title: "Simple bottom drawer with close button",
						url: "https://coss.com/ui/r/p-drawer-1.json",
					},
					{
						id: "p-drawer-2",
						title: "Bottom drawer without drag bar",
						url: "https://coss.com/ui/r/p-drawer-2.json",
					},
					{
						id: "p-drawer-3",
						title: "Drawer with close button",
						url: "https://coss.com/ui/r/p-drawer-3.json",
					},
					{
						id: "p-drawer-4",
						title: "Inset variant drawers for all four positions",
						url: "https://coss.com/ui/r/p-drawer-4.json",
					},
					{
						id: "p-drawer-5",
						title: "Straight variant drawers for all four positions",
						url: "https://coss.com/ui/r/p-drawer-5.json",
					},
					{
						id: "p-drawer-6",
						title: "Scrollable content with terms and conditions",
						url: "https://coss.com/ui/r/p-drawer-6.json",
					},
					{
						id: "p-drawer-7",
						title: "Nested bottom drawers with centered content",
						url: "https://coss.com/ui/r/p-drawer-7.json",
					},
					{
						id: "p-drawer-8",
						title: "Nested right drawers with inset variant",
						url: "https://coss.com/ui/r/p-drawer-8.json",
					},
					{
						id: "p-drawer-9",
						title: "Bottom drawer with snap points",
						url: "https://coss.com/ui/r/p-drawer-9.json",
					},
					{
						id: "p-drawer-10",
						title: "Edit profile form with default and bare footer variants",
						url: "https://coss.com/ui/r/p-drawer-10.json",
					},
					{
						id: "p-drawer-11",
						title: "Mobile menu drawer from the left",
						url: "https://coss.com/ui/r/p-drawer-11.json",
					},
					{
						id: "p-drawer-12",
						title: "Responsive edit profile: dialog on desktop, drawer on mobile",
						url: "https://coss.com/ui/r/p-drawer-12.json",
					},
					{
						id: "p-drawer-13",
						title: "Responsive actions menu: menu on desktop, drawer on mobile",
						url: "https://coss.com/ui/r/p-drawer-13.json",
					},
					{
						id: "p-drawer-14",
						title: "Left drawer with swipe area",
						url: "https://coss.com/ui/r/p-drawer-14.json",
					},
				],
			},
			{
				name: "Popover",
				slug: "popover",
				category: "Overlays & Popups",
				scope: "A floating container that appears near a trigger element.",
				particleCount: 3,
				docsUrl: "https://coss.com/ui/docs/components/popover.md",
				particles: [
					{
						id: "p-popover-1",
						title: "Popover with a form",
						url: "https://coss.com/ui/r/p-popover-1.json",
					},
					{
						id: "p-popover-2",
						title: "Popover with close button",
						url: "https://coss.com/ui/r/p-popover-2.json",
					},
					{
						id: "p-popover-3",
						title: "Animated popovers",
						url: "https://coss.com/ui/r/p-popover-3.json",
					},
				],
			},
			{
				name: "Tooltip",
				slug: "tooltip",
				category: "Overlays & Popups",
				scope: "A small overlay that provides contextual information on hover or focus.",
				particleCount: 4,
				docsUrl: "https://coss.com/ui/docs/components/tooltip.md",
				particles: [
					{
						id: "p-tooltip-1",
						title: "Basic tooltip",
						url: "https://coss.com/ui/r/p-tooltip-1.json",
					},
					{
						id: "p-tooltip-2",
						title: "Grouped tooltips",
						url: "https://coss.com/ui/r/p-tooltip-2.json",
					},
					{
						id: "p-tooltip-3",
						title: "Toggle group animated tooltip",
						url: "https://coss.com/ui/r/p-tooltip-3.json",
					},
					{
						id: "p-tooltip-4",
						title: "Vertical group with animated tooltip",
						url: "https://coss.com/ui/r/p-tooltip-4.json",
					},
				],
			},
			{
				name: "Preview Card",
				slug: "preview-card",
				category: "Overlays & Popups",
				scope: "A rich preview component for displaying linked content.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/preview-card.md",
				particles: [
					{
						id: "p-preview-card-1",
						title: "Preview card with popup",
						url: "https://coss.com/ui/r/p-preview-card-1.json",
					},
				],
			},
			{
				name: "Menu",
				slug: "menu",
				category: "Overlays & Popups",
				scope: "A list of actions or options revealed on demand.",
				particleCount: 9,
				docsUrl: "https://coss.com/ui/docs/components/menu.md",
				particles: [
					{
						id: "p-menu-1",
						title: "Basic menu",
						url: "https://coss.com/ui/r/p-menu-1.json",
					},
					{
						id: "p-menu-2",
						title: "Menu with hover",
						url: "https://coss.com/ui/r/p-menu-2.json",
					},
					{
						id: "p-menu-3",
						title: "Menu with checkbox",
						url: "https://coss.com/ui/r/p-menu-3.json",
					},
					{
						id: "p-menu-9",
						title: "Menu with checkbox items as switches",
						url: "https://coss.com/ui/r/p-menu-9.json",
					},
					{
						id: "p-menu-4",
						title: "Menu with radio group",
						url: "https://coss.com/ui/r/p-menu-4.json",
					},
					{
						id: "p-menu-5",
						title: "Menu with link",
						url: "https://coss.com/ui/r/p-menu-5.json",
					},
					{
						id: "p-menu-6",
						title: "Menu with group labels",
						url: "https://coss.com/ui/r/p-menu-6.json",
					},
					{
						id: "p-menu-7",
						title: "Nested menu",
						url: "https://coss.com/ui/r/p-menu-7.json",
					},
					{
						id: "p-menu-8",
						title: "Menu close on click",
						url: "https://coss.com/ui/r/p-menu-8.json",
					},
				],
			},
			{
				name: "Command",
				slug: "command",
				category: "Overlays & Popups",
				scope:
					"A command palette component built with Dialog and Autocomplete for searching and executing commands.",
				particleCount: 2,
				docsUrl: "https://coss.com/ui/docs/components/command.md",
				particles: [
					{
						id: "p-command-1",
						title: "Command palette with dialog",
						url: "https://coss.com/ui/r/p-command-1.json",
					},
					{
						id: "p-command-2",
						title: "Command palette with AI assistant",
						url: "https://coss.com/ui/r/p-command-2.json",
					},
				],
			},
		],
	},
	{
		category: "Selection & Input",
		components: [
			{
				name: "Select",
				slug: "select",
				category: "Selection & Input",
				scope: "A common form component for choosing a predefined value in a dropdown menu.",
				particleCount: 23,
				docsUrl: "https://coss.com/ui/docs/components/select.md",
				particles: [
					{
						id: "p-select-1",
						title: "Basic select",
						url: "https://coss.com/ui/r/p-select-1.json",
					},
					{
						id: "p-select-2",
						title: "Small select",
						url: "https://coss.com/ui/r/p-select-2.json",
					},
					{
						id: "p-select-3",
						title: "Large select",
						url: "https://coss.com/ui/r/p-select-3.json",
					},
					{
						id: "p-select-4",
						title: "Disabled select",
						url: "https://coss.com/ui/r/p-select-4.json",
					},
					{
						id: "p-select-5",
						title: "Select without item alignment",
						url: "https://coss.com/ui/r/p-select-5.json",
					},
					{
						id: "p-select-6",
						title: "Select with groups",
						url: "https://coss.com/ui/r/p-select-6.json",
					},
					{
						id: "p-select-7",
						title: "Multiple select",
						url: "https://coss.com/ui/r/p-select-7.json",
					},
					{
						id: "p-select-8",
						title: "Select with icon",
						url: "https://coss.com/ui/r/p-select-8.json",
					},
					{
						id: "p-select-9",
						title: "Select options with icon",
						url: "https://coss.com/ui/r/p-select-9.json",
					},
					{
						id: "p-select-10",
						title: "Select with object values",
						url: "https://coss.com/ui/r/p-select-10.json",
					},
					{
						id: "p-select-12",
						title: "Select with disabled items",
						url: "https://coss.com/ui/r/p-select-12.json",
					},
					{
						id: "p-select-13",
						title: "Timezone select",
						url: "https://coss.com/ui/r/p-select-13.json",
					},
					{
						id: "p-select-14",
						title: "Status select with colored dot",
						url: "https://coss.com/ui/r/p-select-14.json",
					},
					{
						id: "p-select-15",
						title: "Pill-shaped select trigger",
						url: "https://coss.com/ui/r/p-select-15.json",
					},
					{
						id: "p-select-16",
						title: "Select with left text label",
						url: "https://coss.com/ui/r/p-select-16.json",
					},
					{
						id: "p-select-17",
						title: "Select with country flags",
						url: "https://coss.com/ui/r/p-select-17.json",
					},
					{
						id: "p-select-18",
						title: "Select with description in options only",
						url: "https://coss.com/ui/r/p-select-18.json",
					},
					{
						id: "p-select-19",
						title: "Select with avatars",
						url: "https://coss.com/ui/r/p-select-19.json",
					},
					{
						id: "p-select-20",
						title: "Rich select with avatars and usernames",
						url: "https://coss.com/ui/r/p-select-20.json",
					},
					{
						id: "p-select-21",
						title: "Auto width select",
						url: "https://coss.com/ui/r/p-select-21.json",
					},
					{
						id: "p-select-22",
						title: "Select with custom border and background",
						url: "https://coss.com/ui/r/p-select-22.json",
					},
					{
						id: "p-select-23",
						title: "Select with label",
						url: "https://coss.com/ui/r/p-select-23.json",
					},
					{
						id: "p-select-11",
						title: "Select in form",
						url: "https://coss.com/ui/r/p-select-11.json",
					},
				],
			},
			{
				name: "Combobox",
				slug: "combobox",
				category: "Selection & Input",
				scope: "An input combined with a list of predefined items to select.",
				particleCount: 18,
				docsUrl: "https://coss.com/ui/docs/components/combobox.md",
				particles: [
					{
						id: "p-combobox-1",
						title: "Basic combobox",
						url: "https://coss.com/ui/r/p-combobox-1.json",
					},
					{
						id: "p-combobox-2",
						title: "Disabled combobox",
						url: "https://coss.com/ui/r/p-combobox-2.json",
					},
					{
						id: "p-combobox-3",
						title: "Small combobox",
						url: "https://coss.com/ui/r/p-combobox-3.json",
					},
					{
						id: "p-combobox-4",
						title: "Large combobox",
						url: "https://coss.com/ui/r/p-combobox-4.json",
					},
					{
						id: "p-combobox-5",
						title: "Combobox with label",
						url: "https://coss.com/ui/r/p-combobox-5.json",
					},
					{
						id: "p-combobox-6",
						title: "Combobox auto highlighting the first option",
						url: "https://coss.com/ui/r/p-combobox-6.json",
					},
					{
						id: "p-combobox-7",
						title: "Combobox with clear button",
						url: "https://coss.com/ui/r/p-combobox-7.json",
					},
					{
						id: "p-combobox-8",
						title: "Combobox with grouped items",
						url: "https://coss.com/ui/r/p-combobox-8.json",
					},
					{
						id: "p-combobox-9",
						title: "Combobox with multiple selection",
						url: "https://coss.com/ui/r/p-combobox-9.json",
					},
					{
						id: "p-combobox-10",
						title: "Combobox with input inside popup",
						url: "https://coss.com/ui/r/p-combobox-10.json",
					},
					{
						id: "p-combobox-11",
						title: "Combobox form",
						url: "https://coss.com/ui/r/p-combobox-11.json",
					},
					{
						id: "p-combobox-12",
						title: "Combobox multiple form",
						url: "https://coss.com/ui/r/p-combobox-12.json",
					},
					{
						id: "p-combobox-13",
						title: "Combobox with start addon",
						url: "https://coss.com/ui/r/p-combobox-13.json",
					},
					{
						id: "p-combobox-14",
						title: "Combobox multiple with start addon",
						url: "https://coss.com/ui/r/p-combobox-14.json",
					},
					{
						id: "p-combobox-15",
						title: "Pill-shaped combobox",
						url: "https://coss.com/ui/r/p-combobox-15.json",
					},
					{
						id: "p-combobox-16",
						title: "Timezone combobox",
						url: "https://coss.com/ui/r/p-combobox-16.json",
					},
					{
						id: "p-combobox-17",
						title: "Timezone combobox with search input",
						url: "https://coss.com/ui/r/p-combobox-17.json",
					},
					{
						id: "p-combobox-18",
						title: "Combobox with select trigger",
						url: "https://coss.com/ui/r/p-combobox-18.json",
					},
				],
			},
			{
				name: "Autocomplete",
				slug: "autocomplete",
				category: "Selection & Input",
				scope: "An input that suggests options as you type.",
				particleCount: 15,
				docsUrl: "https://coss.com/ui/docs/components/autocomplete.md",
				particles: [
					{
						id: "p-autocomplete-1",
						title: "Basic autocomplete",
						url: "https://coss.com/ui/r/p-autocomplete-1.json",
					},
					{
						id: "p-autocomplete-2",
						title: "Disabled autocomplete",
						url: "https://coss.com/ui/r/p-autocomplete-2.json",
					},
					{
						id: "p-autocomplete-3",
						title: "Small autocomplete",
						url: "https://coss.com/ui/r/p-autocomplete-3.json",
					},
					{
						id: "p-autocomplete-4",
						title: "Large autocomplete",
						url: "https://coss.com/ui/r/p-autocomplete-4.json",
					},
					{
						id: "p-autocomplete-5",
						title: "Autocomplete with label",
						url: "https://coss.com/ui/r/p-autocomplete-5.json",
					},
					{
						id: "p-autocomplete-6",
						title: "Autocomplete autofilling the input with the highlighted item",
						url: "https://coss.com/ui/r/p-autocomplete-6.json",
					},
					{
						id: "p-autocomplete-7",
						title: "Autocomplete auto highlighting the first option",
						url: "https://coss.com/ui/r/p-autocomplete-7.json",
					},
					{
						id: "p-autocomplete-8",
						title: "Autocomplete with clear button",
						url: "https://coss.com/ui/r/p-autocomplete-8.json",
					},
					{
						id: "p-autocomplete-9",
						title: "Autocomplete with trigger and clear buttons",
						url: "https://coss.com/ui/r/p-autocomplete-9.json",
					},
					{
						id: "p-autocomplete-10",
						title: "Autocomplete with grouped items",
						url: "https://coss.com/ui/r/p-autocomplete-10.json",
					},
					{
						id: "p-autocomplete-11",
						title: "Autocomplete with limited number of results",
						url: "https://coss.com/ui/r/p-autocomplete-11.json",
					},
					{
						id: "p-autocomplete-12",
						title: "Autocomplete with async items loading",
						url: "https://coss.com/ui/r/p-autocomplete-12.json",
					},
					{
						id: "p-autocomplete-13",
						title: "Autocomplete form",
						url: "https://coss.com/ui/r/p-autocomplete-13.json",
					},
					{
						id: "p-autocomplete-14",
						title: "Autocomplete form",
						url: "https://coss.com/ui/r/p-autocomplete-14.json",
					},
					{
						id: "p-autocomplete-15",
						title: "Pill-shaped autocomplete",
						url: "https://coss.com/ui/r/p-autocomplete-15.json",
					},
				],
			},
			{
				name: "Input",
				slug: "input",
				category: "Selection & Input",
				scope: "A native input element.",
				particleCount: 19,
				docsUrl: "https://coss.com/ui/docs/components/input.md",
				particles: [
					{
						id: "p-input-1",
						title: "Basic input",
						url: "https://coss.com/ui/r/p-input-1.json",
					},
					{
						id: "p-input-2",
						title: "Small input",
						url: "https://coss.com/ui/r/p-input-2.json",
					},
					{
						id: "p-input-3",
						title: "Large input",
						url: "https://coss.com/ui/r/p-input-3.json",
					},
					{
						id: "p-input-4",
						title: "Disabled input",
						url: "https://coss.com/ui/r/p-input-4.json",
					},
					{
						id: "p-input-5",
						title: "File input",
						url: "https://coss.com/ui/r/p-input-5.json",
					},
					{
						id: "p-input-6",
						title: "Input with label",
						url: "https://coss.com/ui/r/p-input-6.json",
					},
					{
						id: "p-input-7",
						title: "Input with button using Group",
						url: "https://coss.com/ui/r/p-input-7.json",
					},
					{
						id: "p-input-8",
						title: "Input with start text and end tooltip",
						url: "https://coss.com/ui/r/p-input-8.json",
					},
					{
						id: "p-input-9",
						title: "Password input with toggle visibility",
						url: "https://coss.com/ui/r/p-input-9.json",
					},
					{
						id: "p-input-10",
						title: "Input group mimicking a URL bar",
						url: "https://coss.com/ui/r/p-input-10.json",
					},
					{
						id: "p-input-11",
						title: "Input group with keyboard shortcut",
						url: "https://coss.com/ui/r/p-input-11.json",
					},
					{
						id: "p-input-12",
						title: "Input group with start loading spinner",
						url: "https://coss.com/ui/r/p-input-12.json",
					},
					{
						id: "p-input-13",
						title: "Input with label and required indicator",
						url: "https://coss.com/ui/r/p-input-13.json",
					},
					{
						id: "p-input-14",
						title: "Input with optional label",
						url: "https://coss.com/ui/r/p-input-14.json",
					},
					{
						id: "p-input-15",
						title: "Input with custom border and background",
						url: "https://coss.com/ui/r/p-input-15.json",
					},
					{
						id: "p-input-16",
						title: "Input group with end loading spinner",
						url: "https://coss.com/ui/r/p-input-16.json",
					},
					{
						id: "p-input-17",
						title: "Read-only input",
						url: "https://coss.com/ui/r/p-input-17.json",
					},
					{
						id: "p-input-18",
						title: "Input with characters remaining counter",
						url: "https://coss.com/ui/r/p-input-18.json",
					},
					{
						id: "p-input-19",
						title: "Pill-shaped input",
						url: "https://coss.com/ui/r/p-input-19.json",
					},
				],
			},
			{
				name: "Textarea",
				slug: "textarea",
				category: "Selection & Input",
				scope: "A multi-line text input for longer content.",
				particleCount: 15,
				docsUrl: "https://coss.com/ui/docs/components/textarea.md",
				particles: [
					{
						id: "p-textarea-1",
						title: "Basic textarea",
						url: "https://coss.com/ui/r/p-textarea-1.json",
					},
					{
						id: "p-textarea-2",
						title: "Small textarea",
						url: "https://coss.com/ui/r/p-textarea-2.json",
					},
					{
						id: "p-textarea-3",
						title: "Large textarea",
						url: "https://coss.com/ui/r/p-textarea-3.json",
					},
					{
						id: "p-textarea-4",
						title: "Disabled textarea",
						url: "https://coss.com/ui/r/p-textarea-4.json",
					},
					{
						id: "p-textarea-5",
						title: "Textarea with label",
						url: "https://coss.com/ui/r/p-textarea-5.json",
					},
					{
						id: "p-textarea-6",
						title: "Textarea in form",
						url: "https://coss.com/ui/r/p-textarea-6.json",
					},
					{
						id: "p-textarea-7",
						title: "Textarea with label and required indicator",
						url: "https://coss.com/ui/r/p-textarea-7.json",
					},
					{
						id: "p-textarea-8",
						title: "Textarea with optional label",
						url: "https://coss.com/ui/r/p-textarea-8.json",
					},
					{
						id: "p-textarea-9",
						title: "Textarea with custom border and background",
						url: "https://coss.com/ui/r/p-textarea-9.json",
					},
					{
						id: "p-textarea-10",
						title: "Read-only textarea",
						url: "https://coss.com/ui/r/p-textarea-10.json",
					},
					{
						id: "p-textarea-11",
						title: "Textarea with characters remaining counter",
						url: "https://coss.com/ui/r/p-textarea-11.json",
					},
					{
						id: "p-textarea-12",
						title: "Textarea field with required indicator",
						url: "https://coss.com/ui/r/p-textarea-12.json",
					},
					{
						id: "p-textarea-13",
						title: "Shorter textarea with fixed height",
						url: "https://coss.com/ui/r/p-textarea-13.json",
					},
					{
						id: "p-textarea-14",
						title: "Textarea with button aligned right",
						url: "https://coss.com/ui/r/p-textarea-14.json",
					},
					{
						id: "p-textarea-15",
						title: "Textarea with button aligned left",
						url: "https://coss.com/ui/r/p-textarea-15.json",
					},
				],
			},
			{
				name: "Input Group",
				slug: "input-group",
				category: "Selection & Input",
				scope: "A flexible component for grouping inputs with addons, buttons, and other elements.",
				particleCount: 28,
				docsUrl: "https://coss.com/ui/docs/components/input-group.md",
				particles: [
					{
						id: "p-input-group-1",
						title: "Basic input group",
						url: "https://coss.com/ui/r/p-input-group-1.json",
					},
					{
						id: "p-input-group-2",
						title: "Input group with end icon",
						url: "https://coss.com/ui/r/p-input-group-2.json",
					},
					{
						id: "p-input-group-3",
						title: "Input group with start text",
						url: "https://coss.com/ui/r/p-input-group-3.json",
					},
					{
						id: "p-input-group-4",
						title: "Input group with end text",
						url: "https://coss.com/ui/r/p-input-group-4.json",
					},
					{
						id: "p-input-group-5",
						title: "Input group with start and end text",
						url: "https://coss.com/ui/r/p-input-group-5.json",
					},
					{
						id: "p-input-group-6",
						title: "Input group with number field",
						url: "https://coss.com/ui/r/p-input-group-6.json",
					},
					{
						id: "p-input-group-7",
						title: "Input group with end tooltip",
						url: "https://coss.com/ui/r/p-input-group-7.json",
					},
					{
						id: "p-input-group-8",
						title: "Input group with icon button",
						url: "https://coss.com/ui/r/p-input-group-8.json",
					},
					{
						id: "p-input-group-9",
						title: "Input group with button",
						url: "https://coss.com/ui/r/p-input-group-9.json",
					},
					{
						id: "p-input-group-10",
						title: "Input group with badge",
						url: "https://coss.com/ui/r/p-input-group-10.json",
					},
					{
						id: "p-input-group-11",
						title: "Input group with keyboard shortcut",
						url: "https://coss.com/ui/r/p-input-group-11.json",
					},
					{
						id: "p-input-group-12",
						title: "Input group with inner label",
						url: "https://coss.com/ui/r/p-input-group-12.json",
					},
					{
						id: "p-input-group-13",
						title: "Small input group",
						url: "https://coss.com/ui/r/p-input-group-13.json",
					},
					{
						id: "p-input-group-14",
						title: "Large input group",
						url: "https://coss.com/ui/r/p-input-group-14.json",
					},
					{
						id: "p-input-group-15",
						title: "Disabled input group",
						url: "https://coss.com/ui/r/p-input-group-15.json",
					},
					{
						id: "p-input-group-16",
						title: "Input group with loading spinner",
						url: "https://coss.com/ui/r/p-input-group-16.json",
					},
					{
						id: "p-input-group-17",
						title: "Input group with textarea",
						url: "https://coss.com/ui/r/p-input-group-17.json",
					},
					{
						id: "p-input-group-18",
						title: "Input group with badge and menu",
						url: "https://coss.com/ui/r/p-input-group-18.json",
					},
					{
						id: "p-input-group-19",
						title: "Mini editor built with input group and toggle",
						url: "https://coss.com/ui/r/p-input-group-19.json",
					},
					{
						id: "p-input-group-20",
						title: "Input group with search icon",
						url: "https://coss.com/ui/r/p-input-group-20.json",
					},
					{
						id: "p-input-group-21",
						title: "Input group with start tooltip",
						url: "https://coss.com/ui/r/p-input-group-21.json",
					},
					{
						id: "p-input-group-22",
						title: "Input group with clear button",
						url: "https://coss.com/ui/r/p-input-group-22.json",
					},
					{
						id: "p-input-group-23",
						title: "Search input group with loader and voice button",
						url: "https://coss.com/ui/r/p-input-group-23.json",
					},
					{
						id: "p-input-group-24",
						title: "Input group with character counter",
						url: "https://coss.com/ui/r/p-input-group-24.json",
					},
					{
						id: "p-input-group-26",
						title: "Password input with strength indicator",
						url: "https://coss.com/ui/r/p-input-group-26.json",
					},
					{
						id: "p-input-group-27",
						title: "Code snippet input with language selector",
						url: "https://coss.com/ui/r/p-input-group-27.json",
					},
					{
						id: "p-input-group-28",
						title: "Message composer with attachment buttons",
						url: "https://coss.com/ui/r/p-input-group-28.json",
					},
					{
						id: "p-input-group-29",
						title: "Chat input with voice and send buttons",
						url: "https://coss.com/ui/r/p-input-group-29.json",
					},
				],
			},
			{
				name: "OTP Field",
				slug: "otp-field",
				category: "Selection & Input",
				scope: "A segmented input for one-time passwords and verification codes.",
				particleCount: 9,
				docsUrl: "https://coss.com/ui/docs/components/otp-field.md",
				particles: [
					{
						id: "p-otp-field-1",
						title: "Basic OTP field",
						url: "https://coss.com/ui/r/p-otp-field-1.json",
					},
					{
						id: "p-otp-field-2",
						title: "Large OTP field",
						url: "https://coss.com/ui/r/p-otp-field-2.json",
					},
					{
						id: "p-otp-field-3",
						title: "OTP field with separator",
						url: "https://coss.com/ui/r/p-otp-field-3.json",
					},
					{
						id: "p-otp-field-4",
						title: "OTP field with label",
						url: "https://coss.com/ui/r/p-otp-field-4.json",
					},
					{
						id: "p-otp-field-6",
						title: "OTP field with custom sanitization",
						url: "https://coss.com/ui/r/p-otp-field-6.json",
					},
					{
						id: "p-otp-field-7",
						title: "OTP field with auto validation",
						url: "https://coss.com/ui/r/p-otp-field-7.json",
					},
					{
						id: "p-otp-field-8",
						title: "Alphanumeric OTP field",
						url: "https://coss.com/ui/r/p-otp-field-8.json",
					},
					{
						id: "p-otp-field-9",
						title: "OTP field with placeholder hints",
						url: "https://coss.com/ui/r/p-otp-field-9.json",
					},
					{
						id: "p-otp-field-10",
						title: "Masked OTP field",
						url: "https://coss.com/ui/r/p-otp-field-10.json",
					},
				],
			},
			{
				name: "Number Field",
				slug: "number-field",
				category: "Selection & Input",
				scope: "A specialized input for numeric values with increment/decrement controls.",
				particleCount: 11,
				docsUrl: "https://coss.com/ui/docs/components/number-field.md",
				particles: [
					{
						id: "p-number-field-1",
						title: "Basic number field",
						url: "https://coss.com/ui/r/p-number-field-1.json",
					},
					{
						id: "p-number-field-2",
						title: "Small number field",
						url: "https://coss.com/ui/r/p-number-field-2.json",
					},
					{
						id: "p-number-field-3",
						title: "Large number field",
						url: "https://coss.com/ui/r/p-number-field-3.json",
					},
					{
						id: "p-number-field-4",
						title: "Disabled number field",
						url: "https://coss.com/ui/r/p-number-field-4.json",
					},
					{
						id: "p-number-field-5",
						title: "Number field with label",
						url: "https://coss.com/ui/r/p-number-field-5.json",
					},
					{
						id: "p-number-field-6",
						title: "Number field with scrub",
						url: "https://coss.com/ui/r/p-number-field-6.json",
					},
					{
						id: "p-number-field-7",
						title: "Number field with range",
						url: "https://coss.com/ui/r/p-number-field-7.json",
					},
					{
						id: "p-number-field-8",
						title: "Number field with formatted value",
						url: "https://coss.com/ui/r/p-number-field-8.json",
					},
					{
						id: "p-number-field-9",
						title: "Number field with step",
						url: "https://coss.com/ui/r/p-number-field-9.json",
					},
					{
						id: "p-number-field-10",
						title: "Number field in form",
						url: "https://coss.com/ui/r/p-number-field-10.json",
					},
					{
						id: "p-number-field-11",
						title: "Pill-shaped number field",
						url: "https://coss.com/ui/r/p-number-field-11.json",
					},
				],
			},
			{
				name: "Slider",
				slug: "slider",
				category: "Selection & Input",
				scope: "A draggable control for selecting values from a continuous range.",
				particleCount: 23,
				docsUrl: "https://coss.com/ui/docs/components/slider.md",
				particles: [
					{
						id: "p-slider-1",
						title: "Basic slider",
						url: "https://coss.com/ui/r/p-slider-1.json",
					},
					{
						id: "p-slider-2",
						title: "Slider with label and value",
						url: "https://coss.com/ui/r/p-slider-2.json",
					},
					{
						id: "p-slider-3",
						title: "Disabled slider",
						url: "https://coss.com/ui/r/p-slider-3.json",
					},
					{
						id: "p-slider-4",
						title: "Slider with reference labels",
						url: "https://coss.com/ui/r/p-slider-4.json",
					},
					{
						id: "p-slider-5",
						title: "Slider with ticks",
						url: "https://coss.com/ui/r/p-slider-5.json",
					},
					{
						id: "p-slider-6",
						title: "Slider with labels above",
						url: "https://coss.com/ui/r/p-slider-6.json",
					},
					{
						id: "p-slider-7",
						title: "Range slider",
						url: "https://coss.com/ui/r/p-slider-7.json",
					},
					{
						id: "p-slider-8",
						title: "Slider with 3 thumbs",
						url: "https://coss.com/ui/r/p-slider-8.json",
					},
					{
						id: "p-slider-9",
						title: "Range slider with collision behavior none",
						url: "https://coss.com/ui/r/p-slider-9.json",
					},
					{
						id: "p-slider-10",
						title: "Range slider with collision behavior swap",
						url: "https://coss.com/ui/r/p-slider-10.json",
					},
					{
						id: "p-slider-11",
						title: "Slider with icons",
						url: "https://coss.com/ui/r/p-slider-11.json",
					},
					{
						id: "p-slider-12",
						title: "Slider with input",
						url: "https://coss.com/ui/r/p-slider-12.json",
					},
					{
						id: "p-slider-13",
						title: "Range slider with inputs",
						url: "https://coss.com/ui/r/p-slider-13.json",
					},
					{
						id: "p-slider-14",
						title: "Slider with increment and decrement buttons",
						url: "https://coss.com/ui/r/p-slider-14.json",
					},
					{
						id: "p-slider-15",
						title: "Price range slider",
						url: "https://coss.com/ui/r/p-slider-15.json",
					},
					{
						id: "p-slider-16",
						title: "Emoji rating slider",
						url: "https://coss.com/ui/r/p-slider-16.json",
					},
					{
						id: "p-slider-17",
						title: "Vertical slider",
						url: "https://coss.com/ui/r/p-slider-17.json",
					},
					{
						id: "p-slider-18",
						title: "Vertical range slider",
						url: "https://coss.com/ui/r/p-slider-18.json",
					},
					{
						id: "p-slider-19",
						title: "Vertical slider with input",
						url: "https://coss.com/ui/r/p-slider-19.json",
					},
					{
						id: "p-slider-20",
						title: "Equalizer with vertical sliders",
						url: "https://coss.com/ui/r/p-slider-20.json",
					},
					{
						id: "p-slider-21",
						title: "Object position sliders with reset",
						url: "https://coss.com/ui/r/p-slider-21.json",
					},
					{
						id: "p-slider-22",
						title: "Price slider with histogram",
						url: "https://coss.com/ui/r/p-slider-22.json",
					},
					{
						id: "p-slider-23",
						title: "Slider in form",
						url: "https://coss.com/ui/r/p-slider-23.json",
					},
				],
			},
			{
				name: "Calendar",
				slug: "calendar",
				category: "Selection & Input",
				scope: "A date picker for selecting single dates, ranges, or multiple dates.",
				particleCount: 24,
				docsUrl: "https://coss.com/ui/docs/components/calendar.md",
				particles: [
					{
						id: "p-calendar-1",
						title: "Basic calendar",
						url: "https://coss.com/ui/r/p-calendar-1.json",
					},
					{
						id: "p-calendar-3",
						title: "Calendar with date range selection",
						url: "https://coss.com/ui/r/p-calendar-3.json",
					},
					{
						id: "p-calendar-4",
						title: "Calendar with month/year dropdown navigation",
						url: "https://coss.com/ui/r/p-calendar-4.json",
					},
					{
						id: "p-calendar-5",
						title: "Calendar with custom Select dropdown for month/year",
						url: "https://coss.com/ui/r/p-calendar-5.json",
					},
					{
						id: "p-calendar-6",
						title: "Calendar with Combobox dropdown for month/year",
						url: "https://coss.com/ui/r/p-calendar-6.json",
					},
					{
						id: "p-calendar-7",
						title: "Calendar with disabled dates",
						url: "https://coss.com/ui/r/p-calendar-7.json",
					},
					{
						id: "p-calendar-8",
						title: "Calendar with multiple date selection",
						url: "https://coss.com/ui/r/p-calendar-8.json",
					},
					{
						id: "p-calendar-2",
						title: "Calendar with custom cell size",
						url: "https://coss.com/ui/r/p-calendar-2.json",
					},
					{
						id: "p-calendar-9",
						title: "Calendar with rounded day buttons",
						url: "https://coss.com/ui/r/p-calendar-9.json",
					},
					{
						id: "p-calendar-10",
						title: "Calendar with rounded range selection style",
						url: "https://coss.com/ui/r/p-calendar-10.json",
					},
					{
						id: "p-calendar-11",
						title: "Calendar with right-aligned navigation",
						url: "https://coss.com/ui/r/p-calendar-11.json",
					},
					{
						id: "p-calendar-12",
						title: "Calendar with week numbers",
						url: "https://coss.com/ui/r/p-calendar-12.json",
					},
					{
						id: "p-calendar-13",
						title: "Calendar with year-only combobox dropdown",
						url: "https://coss.com/ui/r/p-calendar-13.json",
					},
					{
						id: "p-calendar-14",
						title: "Calendar without arrow navigation (dropdown only)",
						url: "https://coss.com/ui/r/p-calendar-14.json",
					},
					{
						id: "p-calendar-15",
						title: "Calendar with current month button",
						url: "https://coss.com/ui/r/p-calendar-15.json",
					},
					{
						id: "p-calendar-16",
						title: "Calendar with today button",
						url: "https://coss.com/ui/r/p-calendar-16.json",
					},
					{
						id: "p-calendar-17",
						title: "Calendar with date input",
						url: "https://coss.com/ui/r/p-calendar-17.json",
					},
					{
						id: "p-calendar-18",
						title: "Calendar with time input",
						url: "https://coss.com/ui/r/p-calendar-18.json",
					},
					{
						id: "p-calendar-19",
						title: "Calendar with time slots (appointment picker)",
						url: "https://coss.com/ui/r/p-calendar-19.json",
					},
					{
						id: "p-calendar-20",
						title: "Calendar with date presets",
						url: "https://coss.com/ui/r/p-calendar-20.json",
					},
					{
						id: "p-calendar-21",
						title: "Range calendar with date presets",
						url: "https://coss.com/ui/r/p-calendar-21.json",
					},
					{
						id: "p-calendar-22",
						title: "Two months calendar",
						url: "https://coss.com/ui/r/p-calendar-22.json",
					},
					{
						id: "p-calendar-23",
						title: "Three months calendar",
						url: "https://coss.com/ui/r/p-calendar-23.json",
					},
					{
						id: "p-calendar-24",
						title: "Pricing calendar with custom day buttons",
						url: "https://coss.com/ui/r/p-calendar-24.json",
					},
				],
			},
			{
				name: "Date Picker",
				slug: "date-picker",
				category: "Selection & Input",
				scope: "A date selection component, often combined with a calendar in a popover or input.",
				particleCount: 9,
				docsUrl: "https://coss.com/ui/docs/components/date-picker.md",
				particles: [
					{
						id: "p-date-picker-1",
						title: "Basic date picker",
						url: "https://coss.com/ui/r/p-date-picker-1.json",
					},
					{
						id: "p-date-picker-2",
						title: "Date range picker",
						url: "https://coss.com/ui/r/p-date-picker-2.json",
					},
					{
						id: "p-date-picker-9",
						title: "Two months calendar with range date",
						url: "https://coss.com/ui/r/p-date-picker-9.json",
					},
					{
						id: "p-date-picker-3",
						title: "Date picker with field and dropdown navigation",
						url: "https://coss.com/ui/r/p-date-picker-3.json",
					},
					{
						id: "p-date-picker-4",
						title: "Date picker with presets",
						url: "https://coss.com/ui/r/p-date-picker-4.json",
					},
					{
						id: "p-date-picker-5",
						title: "Date picker with input",
						url: "https://coss.com/ui/r/p-date-picker-5.json",
					},
					{
						id: "p-date-picker-6",
						title: "Date picker that closes on select",
						url: "https://coss.com/ui/r/p-date-picker-6.json",
					},
					{
						id: "p-date-picker-7",
						title: "Multiple dates picker",
						url: "https://coss.com/ui/r/p-date-picker-7.json",
					},
					{
						id: "p-date-picker-8",
						title: "Date picker with select-like trigger",
						url: "https://coss.com/ui/r/p-date-picker-8.json",
					},
				],
			},
		],
	},
	{
		category: "Forms & Validation",
		components: [
			{
				name: "Form",
				slug: "form",
				category: "Forms & Validation",
				scope: "A complete form implementation with validation and submission handling.",
				particleCount: 2,
				docsUrl: "https://coss.com/ui/docs/components/form.md",
				particles: [
					{
						id: "p-form-1",
						title: "Input in a form",
						url: "https://coss.com/ui/r/p-form-1.json",
					},
					{
						id: "p-form-2",
						title: "Form with zod validation",
						url: "https://coss.com/ui/r/p-form-2.json",
					},
				],
			},
			{
				name: "Field",
				slug: "field",
				category: "Forms & Validation",
				scope: "A wrapper component for form inputs with labels and validation.",
				particleCount: 18,
				docsUrl: "https://coss.com/ui/docs/components/field.md",
				particles: [
					{
						id: "p-field-1",
						title: "Field with description",
						url: "https://coss.com/ui/r/p-field-1.json",
					},
					{
						id: "p-field-2",
						title: "Field with required indicator",
						url: "https://coss.com/ui/r/p-field-2.json",
					},
					{
						id: "p-field-3",
						title: "Field in disabled state",
						url: "https://coss.com/ui/r/p-field-3.json",
					},
					{
						id: "p-field-4",
						title: "Field showing validation error",
						url: "https://coss.com/ui/r/p-field-4.json",
					},
					{
						id: "p-field-5",
						title: "Show field validity state",
						url: "https://coss.com/ui/r/p-field-5.json",
					},
					{
						id: "p-field-6",
						title: "Input group with field",
						url: "https://coss.com/ui/r/p-field-6.json",
					},
					{
						id: "p-field-7",
						title: "Field with autocomplete",
						url: "https://coss.com/ui/r/p-field-7.json",
					},
					{
						id: "p-field-8",
						title: "Field with combobox",
						url: "https://coss.com/ui/r/p-field-8.json",
					},
					{
						id: "p-field-9",
						title: "Field with multiple selection combobox",
						url: "https://coss.com/ui/r/p-field-9.json",
					},
					{
						id: "p-field-10",
						title: "Field with textarea",
						url: "https://coss.com/ui/r/p-field-10.json",
					},
					{
						id: "p-field-11",
						title: "Field with select",
						url: "https://coss.com/ui/r/p-field-11.json",
					},
					{
						id: "p-field-12",
						title: "Field with checkbox",
						url: "https://coss.com/ui/r/p-field-12.json",
					},
					{
						id: "p-field-13",
						title: "Field with checkbox group",
						url: "https://coss.com/ui/r/p-field-13.json",
					},
					{
						id: "p-field-14",
						title: "Field with radio group",
						url: "https://coss.com/ui/r/p-field-14.json",
					},
					{
						id: "p-field-15",
						title: "Field with toggle switch",
						url: "https://coss.com/ui/r/p-field-15.json",
					},
					{
						id: "p-field-16",
						title: "Field with slider",
						url: "https://coss.com/ui/r/p-field-16.json",
					},
					{
						id: "p-field-17",
						title: "Field with number field",
						url: "https://coss.com/ui/r/p-field-17.json",
					},
					{
						id: "p-field-18",
						title: "Complete form built with field",
						url: "https://coss.com/ui/r/p-field-18.json",
					},
				],
			},
			{
				name: "Fieldset",
				slug: "fieldset",
				category: "Forms & Validation",
				scope: "A group of related form fields with a common label.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/fieldset.md",
				particles: [
					{
						id: "p-fieldset-1",
						title: "Fieldset with multiple fields",
						url: "https://coss.com/ui/r/p-fieldset-1.json",
					},
				],
			},
			{
				name: "Label",
				slug: "label",
				category: "Forms & Validation",
				scope: "Renders an accessible label associated with controls.",
				particleCount: 0,
				docsUrl: "https://coss.com/ui/docs/components/label.md",
				particles: [],
			},
		],
	},
	{
		category: "Toggle & Choice",
		components: [
			{
				name: "Checkbox",
				slug: "checkbox",
				category: "Toggle & Choice",
				scope: "A binary toggle input for selecting one or multiple options.",
				particleCount: 5,
				docsUrl: "https://coss.com/ui/docs/components/checkbox.md",
				particles: [
					{
						id: "p-checkbox-1",
						title: "Basic checkbox",
						url: "https://coss.com/ui/r/p-checkbox-1.json",
					},
					{
						id: "p-checkbox-2",
						title: "Disabled checkbox",
						url: "https://coss.com/ui/r/p-checkbox-2.json",
					},
					{
						id: "p-checkbox-3",
						title: "Checkbox with description",
						url: "https://coss.com/ui/r/p-checkbox-3.json",
					},
					{
						id: "p-checkbox-4",
						title: "Card-style checkbox",
						url: "https://coss.com/ui/r/p-checkbox-4.json",
					},
					{
						id: "p-checkbox-5",
						title: "Checkbox form",
						url: "https://coss.com/ui/r/p-checkbox-5.json",
					},
				],
			},
			{
				name: "Checkbox Group",
				slug: "checkbox-group",
				category: "Toggle & Choice",
				scope: "A collection of related checkboxes with group-level control.",
				particleCount: 5,
				docsUrl: "https://coss.com/ui/docs/components/checkbox-group.md",
				particles: [
					{
						id: "p-checkbox-group-1",
						title: "Basic checkbox group",
						url: "https://coss.com/ui/r/p-checkbox-group-1.json",
					},
					{
						id: "p-checkbox-group-2",
						title: "Checkbox group with disabled items",
						url: "https://coss.com/ui/r/p-checkbox-group-2.json",
					},
					{
						id: "p-checkbox-group-3",
						title: "Checkbox group with parent checkbox",
						url: "https://coss.com/ui/r/p-checkbox-group-3.json",
					},
					{
						id: "p-checkbox-group-4",
						title: "Nested checkbox group with parent",
						url: "https://coss.com/ui/r/p-checkbox-group-4.json",
					},
					{
						id: "p-checkbox-group-5",
						title: "Checkbox group form",
						url: "https://coss.com/ui/r/p-checkbox-group-5.json",
					},
				],
			},
			{
				name: "Radio Group",
				slug: "radio-group",
				category: "Toggle & Choice",
				scope: "A set of mutually exclusive options presented as radio buttons.",
				particleCount: 6,
				docsUrl: "https://coss.com/ui/docs/components/radio-group.md",
				particles: [
					{
						id: "p-radio-group-1",
						title: "Basic radio group",
						url: "https://coss.com/ui/r/p-radio-group-1.json",
					},
					{
						id: "p-radio-group-2",
						title: "Disabled radio group",
						url: "https://coss.com/ui/r/p-radio-group-2.json",
					},
					{
						id: "p-radio-group-3",
						title: "Radio group with description",
						url: "https://coss.com/ui/r/p-radio-group-3.json",
					},
					{
						id: "p-radio-group-4",
						title: "Radio group card",
						url: "https://coss.com/ui/r/p-radio-group-4.json",
					},
					{
						id: "p-radio-group-5",
						title: "Radio group in form",
						url: "https://coss.com/ui/r/p-radio-group-5.json",
					},
					{
						id: "p-radio-group-6",
						title: "Theme selector with image cards",
						url: "https://coss.com/ui/r/p-radio-group-6.json",
					},
				],
			},
			{
				name: "Switch",
				slug: "switch",
				category: "Toggle & Choice",
				scope: "A toggle control for binary on/off states.",
				particleCount: 6,
				docsUrl: "https://coss.com/ui/docs/components/switch.md",
				particles: [
					{
						id: "p-switch-1",
						title: "Basic switch",
						url: "https://coss.com/ui/r/p-switch-1.json",
					},
					{
						id: "p-switch-2",
						title: "Disabled switch",
						url: "https://coss.com/ui/r/p-switch-2.json",
					},
					{
						id: "p-switch-3",
						title: "Switch with description",
						url: "https://coss.com/ui/r/p-switch-3.json",
					},
					{
						id: "p-switch-4",
						title: "Switch card",
						url: "https://coss.com/ui/r/p-switch-4.json",
					},
					{
						id: "p-switch-5",
						title: "Switch in form",
						url: "https://coss.com/ui/r/p-switch-5.json",
					},
					{
						id: "p-switch-6",
						title: "Custom size switch",
						url: "https://coss.com/ui/r/p-switch-6.json",
					},
				],
			},
			{
				name: "Toggle",
				slug: "toggle",
				category: "Toggle & Choice",
				scope: "A button that switches between two states.",
				particleCount: 8,
				docsUrl: "https://coss.com/ui/docs/components/toggle.md",
				particles: [
					{
						id: "p-toggle-1",
						title: "Basic toggle",
						url: "https://coss.com/ui/r/p-toggle-1.json",
					},
					{
						id: "p-toggle-2",
						title: "Toggle with outline",
						url: "https://coss.com/ui/r/p-toggle-2.json",
					},
					{
						id: "p-toggle-3",
						title: "Toggle with icon",
						url: "https://coss.com/ui/r/p-toggle-3.json",
					},
					{
						id: "p-toggle-4",
						title: "Small toggle",
						url: "https://coss.com/ui/r/p-toggle-4.json",
					},
					{
						id: "p-toggle-5",
						title: "Large toggle",
						url: "https://coss.com/ui/r/p-toggle-5.json",
					},
					{
						id: "p-toggle-6",
						title: "Disabled toggle",
						url: "https://coss.com/ui/r/p-toggle-6.json",
					},
					{
						id: "p-toggle-7",
						title: "Toggle icon group",
						url: "https://coss.com/ui/r/p-toggle-7.json",
					},
					{
						id: "p-toggle-8",
						title: "Bookmark toggle with tooltip and success toast",
						url: "https://coss.com/ui/r/p-toggle-8.json",
					},
				],
			},
			{
				name: "Toggle Group",
				slug: "toggle-group",
				category: "Toggle & Choice",
				scope: "A group of toggle buttons where one or multiple can be selected.",
				particleCount: 9,
				docsUrl: "https://coss.com/ui/docs/components/toggle-group.md",
				particles: [
					{
						id: "p-toggle-group-1",
						title: "Basic toggle group",
						url: "https://coss.com/ui/r/p-toggle-group-1.json",
					},
					{
						id: "p-toggle-group-2",
						title: "Small toggle group",
						url: "https://coss.com/ui/r/p-toggle-group-2.json",
					},
					{
						id: "p-toggle-group-3",
						title: "Large toggle group",
						url: "https://coss.com/ui/r/p-toggle-group-3.json",
					},
					{
						id: "p-toggle-group-4",
						title: "Toggle group with outline",
						url: "https://coss.com/ui/r/p-toggle-group-4.json",
					},
					{
						id: "p-toggle-group-5",
						title: "Vertical toggle group with outline",
						url: "https://coss.com/ui/r/p-toggle-group-5.json",
					},
					{
						id: "p-toggle-group-6",
						title: "Disabled toggle group",
						url: "https://coss.com/ui/r/p-toggle-group-6.json",
					},
					{
						id: "p-toggle-group-7",
						title: "Toggle group with disabled item",
						url: "https://coss.com/ui/r/p-toggle-group-7.json",
					},
					{
						id: "p-toggle-group-8",
						title: "Multiple selection toggle group",
						url: "https://coss.com/ui/r/p-toggle-group-8.json",
					},
					{
						id: "p-toggle-group-9",
						title: "Toggle group with tooltips",
						url: "https://coss.com/ui/r/p-toggle-group-9.json",
					},
				],
			},
		],
	},
	{
		category: "Layout & Navigation",
		components: [
			{
				name: "Tabs",
				slug: "tabs",
				category: "Layout & Navigation",
				scope: "A navigation component for switching between different views or content panels.",
				particleCount: 13,
				docsUrl: "https://coss.com/ui/docs/components/tabs.md",
				particles: [
					{
						id: "p-tabs-1",
						title: "Basic tabs",
						url: "https://coss.com/ui/r/p-tabs-1.json",
					},
					{
						id: "p-tabs-2",
						title: "Tabs with underline",
						url: "https://coss.com/ui/r/p-tabs-2.json",
					},
					{
						id: "p-tabs-3",
						title: "Vertical tabs",
						url: "https://coss.com/ui/r/p-tabs-3.json",
					},
					{
						id: "p-tabs-4",
						title: "Vertical tabs with underline",
						url: "https://coss.com/ui/r/p-tabs-4.json",
					},
					{
						id: "p-tabs-5",
						title: "Tabs with full rounded triggers",
						url: "https://coss.com/ui/r/p-tabs-5.json",
					},
					{
						id: "p-tabs-6",
						title: "Tabs with icon before name",
						url: "https://coss.com/ui/r/p-tabs-6.json",
					},
					{
						id: "p-tabs-7",
						title: "Tabs with icon before name and underline",
						url: "https://coss.com/ui/r/p-tabs-7.json",
					},
					{
						id: "p-tabs-8",
						title: "Tabs with icon only",
						url: "https://coss.com/ui/r/p-tabs-8.json",
					},
					{
						id: "p-tabs-9",
						title: "Tabs with underline and icon on top",
						url: "https://coss.com/ui/r/p-tabs-9.json",
					},
					{
						id: "p-tabs-10",
						title: "Tabs with count badge",
						url: "https://coss.com/ui/r/p-tabs-10.json",
					},
					{
						id: "p-tabs-11",
						title: "Vertical tabs with underline and icon before name",
						url: "https://coss.com/ui/r/p-tabs-11.json",
					},
					{
						id: "p-tabs-12",
						title: "Tabs with icon only and count badge",
						url: "https://coss.com/ui/r/p-tabs-12.json",
					},
					{
						id: "p-tabs-13",
						title: "Tabs with icon only and grouped tooltips",
						url: "https://coss.com/ui/r/p-tabs-13.json",
					},
				],
			},
			{
				name: "Accordion",
				slug: "accordion",
				category: "Layout & Navigation",
				scope: "A set of collapsible panels with headings.",
				particleCount: 4,
				docsUrl: "https://coss.com/ui/docs/components/accordion.md",
				particles: [
					{
						id: "p-accordion-1",
						title: "Basic accordion",
						url: "https://coss.com/ui/r/p-accordion-1.json",
					},
					{
						id: "p-accordion-2",
						title: "Accordion with one panel open",
						url: "https://coss.com/ui/r/p-accordion-2.json",
					},
					{
						id: "p-accordion-3",
						title: "Accordion allowing multiple panels open",
						url: "https://coss.com/ui/r/p-accordion-3.json",
					},
					{
						id: "p-accordion-4",
						title: "Controlled accordion",
						url: "https://coss.com/ui/r/p-accordion-4.json",
					},
				],
			},
			{
				name: "Collapsible",
				slug: "collapsible",
				category: "Layout & Navigation",
				scope: "A component that toggles visibility of content sections.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/collapsible.md",
				particles: [
					{
						id: "p-collapsible-1",
						title: "Basic collapsible",
						url: "https://coss.com/ui/r/p-collapsible-1.json",
					},
				],
			},
			{
				name: "Sidebar",
				slug: "sidebar",
				category: "Layout & Navigation",
				scope: "A collapsible side panel for navigation and secondary content.",
				particleCount: 0,
				docsUrl: "https://coss.com/ui/docs/components/sidebar.md",
				particles: [],
			},
			{
				name: "Breadcrumb",
				slug: "breadcrumb",
				category: "Layout & Navigation",
				scope: "Displays the path to the current resource using a hierarchy of links.",
				particleCount: 7,
				docsUrl: "https://coss.com/ui/docs/components/breadcrumb.md",
				particles: [
					{
						id: "p-breadcrumb-1",
						title: "Breadcrumb with menu example",
						url: "https://coss.com/ui/r/p-breadcrumb-1.json",
					},
					{
						id: "p-breadcrumb-2",
						title: "Breadcrumb with custom separator",
						url: "https://coss.com/ui/r/p-breadcrumb-2.json",
					},
					{
						id: "p-breadcrumb-3",
						title: "Breadcrumb with home icon for home link only",
						url: "https://coss.com/ui/r/p-breadcrumb-3.json",
					},
					{
						id: "p-breadcrumb-4",
						title: "Breadcrumb with folders icon menu",
						url: "https://coss.com/ui/r/p-breadcrumb-4.json",
					},
					{
						id: "p-breadcrumb-5",
						title: "Breadcrumb with icons before text",
						url: "https://coss.com/ui/r/p-breadcrumb-5.json",
					},
					{
						id: "p-breadcrumb-6",
						title: "Breadcrumb with dot separators",
						url: "https://coss.com/ui/r/p-breadcrumb-6.json",
					},
					{
						id: "p-breadcrumb-7",
						title: "Breadcrumb with select dropdown",
						url: "https://coss.com/ui/r/p-breadcrumb-7.json",
					},
				],
			},
			{
				name: "Pagination",
				slug: "pagination",
				category: "Layout & Navigation",
				scope: "A pagination with page navigation, next and previous links.",
				particleCount: 3,
				docsUrl: "https://coss.com/ui/docs/components/pagination.md",
				particles: [
					{
						id: "p-pagination-1",
						title: "Pagination example",
						url: "https://coss.com/ui/r/p-pagination-1.json",
					},
					{
						id: "p-pagination-2",
						title: "Pagination with previous and next buttons only",
						url: "https://coss.com/ui/r/p-pagination-2.json",
					},
					{
						id: "p-pagination-3",
						title: "Pagination with select, and previous and next buttons",
						url: "https://coss.com/ui/r/p-pagination-3.json",
					},
				],
			},
			{
				name: "Toolbar",
				slug: "toolbar",
				category: "Layout & Navigation",
				scope: "A container for grouping related actions or controls.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/toolbar.md",
				particles: [
					{
						id: "p-toolbar-1",
						title: "Toolbar with toggles, buttons, and select",
						url: "https://coss.com/ui/r/p-toolbar-1.json",
					},
				],
			},
			{
				name: "Scroll Area",
				slug: "scroll-area",
				category: "Layout & Navigation",
				scope: "A container with custom scrollbars for overflow content.",
				particleCount: 5,
				docsUrl: "https://coss.com/ui/docs/components/scroll-area.md",
				particles: [
					{
						id: "p-scroll-area-1",
						title: "Basic scroll area",
						url: "https://coss.com/ui/r/p-scroll-area-1.json",
					},
					{
						id: "p-scroll-area-2",
						title: "Horizontal scroll area",
						url: "https://coss.com/ui/r/p-scroll-area-2.json",
					},
					{
						id: "p-scroll-area-3",
						title: "Scroll area with both directions",
						url: "https://coss.com/ui/r/p-scroll-area-3.json",
					},
					{
						id: "p-scroll-area-4",
						title: "Scroll area with fading edges",
						url: "https://coss.com/ui/r/p-scroll-area-4.json",
					},
					{
						id: "p-scroll-area-5",
						title: "Horizontal scroll area with scrollbar gutter",
						url: "https://coss.com/ui/r/p-scroll-area-5.json",
					},
				],
			},
		],
	},
	{
		category: "Content & Display",
		components: [
			{
				name: "Card",
				slug: "card",
				category: "Content & Display",
				scope: "A content container for grouping related information.",
				particleCount: 11,
				docsUrl: "https://coss.com/ui/docs/components/card.md",
				particles: [
					{
						id: "p-card-1",
						title: "A basic card with header and footer",
						url: "https://coss.com/ui/r/p-card-1.json",
					},
					{
						id: "p-card-2",
						title: "Authentication card with actions",
						url: "https://coss.com/ui/r/p-card-2.json",
					},
					{
						id: "p-card-3",
						title: "Authentication card with separators",
						url: "https://coss.com/ui/r/p-card-3.json",
					},
					{
						id: "p-card-4",
						title: "Framed card with footer",
						url: "https://coss.com/ui/r/p-card-4.json",
					},
					{
						id: "p-card-5",
						title: "Framed card with header",
						url: "https://coss.com/ui/r/p-card-5.json",
					},
					{
						id: "p-card-6",
						title: "Framed card with header and footer",
						url: "https://coss.com/ui/r/p-card-6.json",
					},
					{
						id: "p-card-7",
						title: "Framed card with no rounded bottom",
						url: "https://coss.com/ui/r/p-card-7.json",
					},
					{
						id: "p-card-8",
						title: "Card within a frame and footer",
						url: "https://coss.com/ui/r/p-card-8.json",
					},
					{
						id: "p-card-9",
						title: "Card within a frame and footer",
						url: "https://coss.com/ui/r/p-card-9.json",
					},
					{
						id: "p-card-10",
						title: "Card within a frame with header and footer",
						url: "https://coss.com/ui/r/p-card-10.json",
					},
					{
						id: "p-card-11",
						title: "CardFrame with header action",
						url: "https://coss.com/ui/r/p-card-11.json",
					},
				],
			},
			{
				name: "Frame",
				slug: "frame",
				category: "Content & Display",
				scope: "A container component for displaying content in a frame.",
				particleCount: 4,
				docsUrl: "https://coss.com/ui/docs/components/frame.md",
				particles: [
					{
						id: "p-frame-1",
						title: "Basic frame",
						url: "https://coss.com/ui/r/p-frame-1.json",
					},
					{
						id: "p-frame-3",
						title: "Frame with multiple separated panels",
						url: "https://coss.com/ui/r/p-frame-3.json",
					},
					{
						id: "p-frame-4",
						title: "Frame with multiple stacked panels",
						url: "https://coss.com/ui/r/p-frame-4.json",
					},
					{
						id: "p-frame-2",
						title: "Frame with collapsible content and delete button",
						url: "https://coss.com/ui/r/p-frame-2.json",
					},
				],
			},
			{
				name: "Table",
				slug: "table",
				category: "Content & Display",
				scope: "A structured data display component with rows and columns.",
				particleCount: 8,
				docsUrl: "https://coss.com/ui/docs/components/table.md",
				particles: [
					{
						id: "p-table-1",
						title: "Basic table",
						url: "https://coss.com/ui/r/p-table-1.json",
					},
					{
						id: "p-table-2",
						title: "Frame with card-style table",
						url: "https://coss.com/ui/r/p-table-2.json",
					},
					{
						id: "p-table-3",
						title: "Table with TanStack Table and checkboxes",
						url: "https://coss.com/ui/r/p-table-3.json",
					},
					{
						id: "p-table-4",
						title: "Table with TanStack Table, sorting, and pagination",
						url: "https://coss.com/ui/r/p-table-4.json",
					},
					{
						id: "p-table-5",
						title: "Card-style table variant",
						url: "https://coss.com/ui/r/p-table-5.json",
					},
					{
						id: "p-table-7",
						title: "CardFrame with card-style table",
						url: "https://coss.com/ui/r/p-table-7.json",
					},
					{
						id: "p-table-6",
						title: "CardFrame with TanStack Table and checkboxes",
						url: "https://coss.com/ui/r/p-table-6.json",
					},
					{
						id: "p-table-8",
						title: "CardFrame with TanStack Table, sorting, and pagination",
						url: "https://coss.com/ui/r/p-table-8.json",
					},
				],
			},
			{
				name: "Avatar",
				slug: "avatar",
				category: "Content & Display",
				scope: "A visual representation of a user or entity.",
				particleCount: 14,
				docsUrl: "https://coss.com/ui/docs/components/avatar.md",
				particles: [
					{
						id: "p-avatar-1",
						title: "Avatar with image and fallback",
						url: "https://coss.com/ui/r/p-avatar-1.json",
					},
					{
						id: "p-avatar-2",
						title: "Fallback-only avatar",
						url: "https://coss.com/ui/r/p-avatar-2.json",
					},
					{
						id: "p-avatar-3",
						title: "Avatars with different sizes",
						url: "https://coss.com/ui/r/p-avatar-3.json",
					},
					{
						id: "p-avatar-4",
						title: "Avatars with different radii",
						url: "https://coss.com/ui/r/p-avatar-4.json",
					},
					{
						id: "p-avatar-5",
						title: "Overlapping avatar group",
						url: "https://coss.com/ui/r/p-avatar-5.json",
					},
					{
						id: "p-avatar-6",
						title: "Avatar with user icon fallback",
						url: "https://coss.com/ui/r/p-avatar-6.json",
					},
					{
						id: "p-avatar-7",
						title: "Avatar with emerald status dot",
						url: "https://coss.com/ui/r/p-avatar-7.json",
					},
					{
						id: "p-avatar-8",
						title: "Avatar with muted status dot",
						url: "https://coss.com/ui/r/p-avatar-8.json",
					},
					{
						id: "p-avatar-9",
						title: "Rounded avatar with top-right emerald status",
						url: "https://coss.com/ui/r/p-avatar-9.json",
					},
					{
						id: "p-avatar-10",
						title: "Avatar with notification badge",
						url: "https://coss.com/ui/r/p-avatar-10.json",
					},
					{
						id: "p-avatar-11",
						title: "Rounded avatar with notification badge",
						url: "https://coss.com/ui/r/p-avatar-11.json",
					},
					{
						id: "p-avatar-12",
						title: "Avatar with verified badge",
						url: "https://coss.com/ui/r/p-avatar-12.json",
					},
					{
						id: "p-avatar-13",
						title: "Small overlapping avatar group",
						url: "https://coss.com/ui/r/p-avatar-13.json",
					},
					{
						id: "p-avatar-14",
						title: "Large overlapping avatar group",
						url: "https://coss.com/ui/r/p-avatar-14.json",
					},
				],
			},
			{
				name: "Badge",
				slug: "badge",
				category: "Content & Display",
				scope: "A small status indicator or label component.",
				particleCount: 20,
				docsUrl: "https://coss.com/ui/docs/components/badge.md",
				particles: [
					{
						id: "p-badge-1",
						title: "Basic badge",
						url: "https://coss.com/ui/r/p-badge-1.json",
					},
					{
						id: "p-badge-2",
						title: "Outline badge",
						url: "https://coss.com/ui/r/p-badge-2.json",
					},
					{
						id: "p-badge-3",
						title: "Secondary badge",
						url: "https://coss.com/ui/r/p-badge-3.json",
					},
					{
						id: "p-badge-4",
						title: "Destructive badge",
						url: "https://coss.com/ui/r/p-badge-4.json",
					},
					{
						id: "p-badge-5",
						title: "Info badge",
						url: "https://coss.com/ui/r/p-badge-5.json",
					},
					{
						id: "p-badge-6",
						title: "Success badge",
						url: "https://coss.com/ui/r/p-badge-6.json",
					},
					{
						id: "p-badge-7",
						title: "Warning badge",
						url: "https://coss.com/ui/r/p-badge-7.json",
					},
					{
						id: "p-badge-8",
						title: "Error badge",
						url: "https://coss.com/ui/r/p-badge-8.json",
					},
					{
						id: "p-badge-9",
						title: "Small badge",
						url: "https://coss.com/ui/r/p-badge-9.json",
					},
					{
						id: "p-badge-10",
						title: "Large badge",
						url: "https://coss.com/ui/r/p-badge-10.json",
					},
					{
						id: "p-badge-11",
						title: "Badge with icon",
						url: "https://coss.com/ui/r/p-badge-11.json",
					},
					{
						id: "p-badge-12",
						title: "Badge with link",
						url: "https://coss.com/ui/r/p-badge-12.json",
					},
					{
						id: "p-badge-13",
						title: "Badge with count",
						url: "https://coss.com/ui/r/p-badge-13.json",
					},
					{
						id: "p-badge-14",
						title: "Full rounded badge (pill)",
						url: "https://coss.com/ui/r/p-badge-14.json",
					},
					{
						id: "p-badge-15",
						title: "Badge with number after text",
						url: "https://coss.com/ui/r/p-badge-15.json",
					},
					{
						id: "p-badge-16",
						title: "Status badge - Paid",
						url: "https://coss.com/ui/r/p-badge-16.json",
					},
					{
						id: "p-badge-17",
						title: "Status badge - Pending",
						url: "https://coss.com/ui/r/p-badge-17.json",
					},
					{
						id: "p-badge-18",
						title: "Status badge - Failed",
						url: "https://coss.com/ui/r/p-badge-18.json",
					},
					{
						id: "p-badge-19",
						title: "Selectable badge with checkbox",
						url: "https://coss.com/ui/r/p-badge-19.json",
					},
					{
						id: "p-badge-20",
						title: "Removable badge",
						url: "https://coss.com/ui/r/p-badge-20.json",
					},
				],
			},
			{
				name: "Kbd",
				slug: "kbd",
				category: "Content & Display",
				scope: "A component for displaying keyboard keys and shortcuts.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/kbd.md",
				particles: [
					{
						id: "p-kbd-1",
						title: "Keyboard shortcuts display",
						url: "https://coss.com/ui/r/p-kbd-1.json",
					},
				],
			},
			{
				name: "Separator",
				slug: "separator",
				category: "Content & Display",
				scope: "A visual divider for separating content sections.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/separator.md",
				particles: [
					{
						id: "p-separator-1",
						title: "Separator with horizontal and vertical orientations",
						url: "https://coss.com/ui/r/p-separator-1.json",
					},
				],
			},
			{
				name: "Group",
				slug: "group",
				category: "Content & Display",
				scope: "A container component for grouping related content with consistent styling.",
				particleCount: 22,
				docsUrl: "https://coss.com/ui/docs/components/group.md",
				particles: [
					{
						id: "p-group-1",
						title: "Basic group",
						url: "https://coss.com/ui/r/p-group-1.json",
					},
					{
						id: "p-group-2",
						title: "Group with input",
						url: "https://coss.com/ui/r/p-group-2.json",
					},
					{
						id: "p-group-3",
						title: "Small group",
						url: "https://coss.com/ui/r/p-group-3.json",
					},
					{
						id: "p-group-4",
						title: "Large group",
						url: "https://coss.com/ui/r/p-group-4.json",
					},
					{
						id: "p-group-5",
						title: "Group with disabled button",
						url: "https://coss.com/ui/r/p-group-5.json",
					},
					{
						id: "p-group-6",
						title: "Group with default button",
						url: "https://coss.com/ui/r/p-group-6.json",
					},
					{
						id: "p-group-7",
						title: "Group with start text",
						url: "https://coss.com/ui/r/p-group-7.json",
					},
					{
						id: "p-group-8",
						title: "Group with end text",
						url: "https://coss.com/ui/r/p-group-8.json",
					},
					{
						id: "p-group-9",
						title: "Vertical group",
						url: "https://coss.com/ui/r/p-group-9.json",
					},
					{
						id: "p-group-10",
						title: "Nested groups",
						url: "https://coss.com/ui/r/p-group-10.json",
					},
					{
						id: "p-group-11",
						title: "Group with popup",
						url: "https://coss.com/ui/r/p-group-11.json",
					},
					{
						id: "p-group-12",
						title: "Group with input group",
						url: "https://coss.com/ui/r/p-group-12.json",
					},
					{
						id: "p-group-13",
						title: "Group with menu",
						url: "https://coss.com/ui/r/p-group-13.json",
					},
					{
						id: "p-group-14",
						title: "Group with select",
						url: "https://coss.com/ui/r/p-group-14.json",
					},
					{
						id: "p-group-15",
						title: "Group with search",
						url: "https://coss.com/ui/r/p-group-15.json",
					},
					{
						id: "p-group-16",
						title: "Group with add button and input",
						url: "https://coss.com/ui/r/p-group-16.json",
					},
					{
						id: "p-group-17",
						title: "Group with input and currency text",
						url: "https://coss.com/ui/r/p-group-17.json",
					},
					{
						id: "p-group-18",
						title: "Group with select and input",
						url: "https://coss.com/ui/r/p-group-18.json",
					},
					{
						id: "p-group-19",
						title: "Group with input and select",
						url: "https://coss.com/ui/r/p-group-19.json",
					},
					{
						id: "p-group-20",
						title: "Group with input and text button",
						url: "https://coss.com/ui/r/p-group-20.json",
					},
					{
						id: "p-group-22",
						title: "Group with two number inputs for range",
						url: "https://coss.com/ui/r/p-group-22.json",
					},
					{
						id: "p-group-23",
						title: "Group with filter label, combobox multi-select, and remove button",
						url: "https://coss.com/ui/r/p-group-23.json",
					},
				],
			},
			{
				name: "Empty",
				slug: "empty",
				category: "Content & Display",
				scope: "A container for displaying empty state information.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/empty.md",
				particles: [
					{
						id: "p-empty-1",
						title: "Empty state with icon and actions",
						url: "https://coss.com/ui/r/p-empty-1.json",
					},
				],
			},
		],
	},
	{
		category: "Feedback & Status",
		components: [
			{
				name: "Alert",
				slug: "alert",
				category: "Feedback & Status",
				scope: "A callout for displaying important information.",
				particleCount: 7,
				docsUrl: "https://coss.com/ui/docs/components/alert.md",
				particles: [
					{
						id: "p-alert-1",
						title: "Basic alert",
						url: "https://coss.com/ui/r/p-alert-1.json",
					},
					{
						id: "p-alert-2",
						title: "Alert with icon",
						url: "https://coss.com/ui/r/p-alert-2.json",
					},
					{
						id: "p-alert-3",
						title: "Alert with icon and action buttons",
						url: "https://coss.com/ui/r/p-alert-3.json",
					},
					{
						id: "p-alert-4",
						title: "Info alert",
						url: "https://coss.com/ui/r/p-alert-4.json",
					},
					{
						id: "p-alert-5",
						title: "Success alert",
						url: "https://coss.com/ui/r/p-alert-5.json",
					},
					{
						id: "p-alert-6",
						title: "Warning alert",
						url: "https://coss.com/ui/r/p-alert-6.json",
					},
					{
						id: "p-alert-7",
						title: "Error alert",
						url: "https://coss.com/ui/r/p-alert-7.json",
					},
				],
			},
			{
				name: "Toast",
				slug: "toast",
				category: "Feedback & Status",
				scope: "A temporary notification message that appears and disappears automatically.",
				particleCount: 13,
				docsUrl: "https://coss.com/ui/docs/components/toast.md",
				particles: [
					{
						id: "p-toast-1",
						title: "Default stacked toast with title and description",
						url: "https://coss.com/ui/r/p-toast-1.json",
					},
					{
						id: "p-toast-2",
						title: "Stacked toasts by semantic type (success, error, info, warning)",
						url: "https://coss.com/ui/r/p-toast-2.json",
					},
					{
						id: "p-toast-3",
						title: "Loading-state stacked toast",
						url: "https://coss.com/ui/r/p-toast-3.json",
					},
					{
						id: "p-toast-4",
						title: "Stacked toast with primary action (undo)",
						url: "https://coss.com/ui/r/p-toast-4.json",
					},
					{
						id: "p-toast-5",
						title: "Promise-based stacked toast",
						url: "https://coss.com/ui/r/p-toast-5.json",
					},
					{
						id: "p-toast-6",
						title: "Stacked toasts with varying content height",
						url: "https://coss.com/ui/r/p-toast-6.json",
					},
					{
						id: "p-toast-7",
						title: "Anchored tooltip-style toast after copy",
						url: "https://coss.com/ui/r/p-toast-7.json",
					},
					{
						id: "p-toast-8",
						title: "Anchored error toast after async failure",
						url: "https://coss.com/ui/r/p-toast-8.json",
					},
					{
						id: "p-toast-9",
						title: "Long-running promise toast with cancel",
						url: "https://coss.com/ui/r/p-toast-9.json",
					},
					{
						id: "p-toast-10",
						title: "Deduplicated success toast",
						url: "https://coss.com/ui/r/p-toast-10.json",
					},
					{
						id: "p-toast-11",
						title: "Deduplicated error toast",
						url: "https://coss.com/ui/r/p-toast-11.json",
					},
					{
						id: "p-toast-12",
						title: "Anchored deduplicated success toast",
						url: "https://coss.com/ui/r/p-toast-12.json",
					},
					{
						id: "p-toast-13",
						title: "Anchored deduplicated error toast",
						url: "https://coss.com/ui/r/p-toast-13.json",
					},
				],
			},
			{
				name: "Progress",
				slug: "progress",
				category: "Feedback & Status",
				scope: "A visual indicator showing the completion status of a task.",
				particleCount: 3,
				docsUrl: "https://coss.com/ui/docs/components/progress.md",
				particles: [
					{
						id: "p-progress-1",
						title: "Basic progress bar",
						url: "https://coss.com/ui/r/p-progress-1.json",
					},
					{
						id: "p-progress-2",
						title: "Progress with label and value",
						url: "https://coss.com/ui/r/p-progress-2.json",
					},
					{
						id: "p-progress-3",
						title: "Progress with formatted value",
						url: "https://coss.com/ui/r/p-progress-3.json",
					},
				],
			},
			{
				name: "Meter",
				slug: "meter",
				category: "Feedback & Status",
				scope: "A visual representation of a value within a known range.",
				particleCount: 4,
				docsUrl: "https://coss.com/ui/docs/components/meter.md",
				particles: [
					{
						id: "p-meter-1",
						title: "Basic meter",
						url: "https://coss.com/ui/r/p-meter-1.json",
					},
					{
						id: "p-meter-2",
						title: "Simple meter",
						url: "https://coss.com/ui/r/p-meter-2.json",
					},
					{
						id: "p-meter-3",
						title: "Meter with formatted value",
						url: "https://coss.com/ui/r/p-meter-3.json",
					},
					{
						id: "p-meter-4",
						title: "Meter with range",
						url: "https://coss.com/ui/r/p-meter-4.json",
					},
				],
			},
			{
				name: "Spinner",
				slug: "spinner",
				category: "Feedback & Status",
				scope: "An indicator that can be used to show a loading state.",
				particleCount: 1,
				docsUrl: "https://coss.com/ui/docs/components/spinner.md",
				particles: [
					{
						id: "p-spinner-1",
						title: "Basic spinner",
						url: "https://coss.com/ui/r/p-spinner-1.json",
					},
				],
			},
			{
				name: "Skeleton",
				slug: "skeleton",
				category: "Feedback & Status",
				scope: "A placeholder for loading content.",
				particleCount: 2,
				docsUrl: "https://coss.com/ui/docs/components/skeleton.md",
				particles: [
					{
						id: "p-skeleton-1",
						title: "Basic skeleton",
						url: "https://coss.com/ui/r/p-skeleton-1.json",
					},
					{
						id: "p-skeleton-2",
						title: "Skeleton only",
						url: "https://coss.com/ui/r/p-skeleton-2.json",
					},
				],
			},
		],
	},
	{
		category: "Actions",
		components: [
			{
				name: "Button",
				slug: "button",
				category: "Actions",
				scope: "A button or a component that looks like a button.",
				particleCount: 40,
				docsUrl: "https://coss.com/ui/docs/components/button.md",
				particles: [
					{
						id: "p-button-1",
						title: "Default button",
						url: "https://coss.com/ui/r/p-button-1.json",
					},
					{
						id: "p-button-2",
						title: "Outline button",
						url: "https://coss.com/ui/r/p-button-2.json",
					},
					{
						id: "p-button-3",
						title: "Secondary button",
						url: "https://coss.com/ui/r/p-button-3.json",
					},
					{
						id: "p-button-4",
						title: "Destructive button",
						url: "https://coss.com/ui/r/p-button-4.json",
					},
					{
						id: "p-button-5",
						title: "Destructive outline button",
						url: "https://coss.com/ui/r/p-button-5.json",
					},
					{
						id: "p-button-6",
						title: "Ghost button",
						url: "https://coss.com/ui/r/p-button-6.json",
					},
					{
						id: "p-button-7",
						title: "Link button",
						url: "https://coss.com/ui/r/p-button-7.json",
					},
					{
						id: "p-button-8",
						title: "Extra-small button",
						url: "https://coss.com/ui/r/p-button-8.json",
					},
					{
						id: "p-button-9",
						title: "Small button",
						url: "https://coss.com/ui/r/p-button-9.json",
					},
					{
						id: "p-button-10",
						title: "Large button",
						url: "https://coss.com/ui/r/p-button-10.json",
					},
					{
						id: "p-button-11",
						title: "Extra-large button",
						url: "https://coss.com/ui/r/p-button-11.json",
					},
					{
						id: "p-button-12",
						title: "Disabled button",
						url: "https://coss.com/ui/r/p-button-12.json",
					},
					{
						id: "p-button-13",
						title: "Icon button",
						url: "https://coss.com/ui/r/p-button-13.json",
					},
					{
						id: "p-button-14",
						title: "Small icon button",
						url: "https://coss.com/ui/r/p-button-14.json",
					},
					{
						id: "p-button-15",
						title: "Large icon button",
						url: "https://coss.com/ui/r/p-button-15.json",
					},
					{
						id: "p-button-16",
						title: "Button with icon",
						url: "https://coss.com/ui/r/p-button-16.json",
					},
					{
						id: "p-button-17",
						title: "Link rendered as button",
						url: "https://coss.com/ui/r/p-button-17.json",
					},
					{
						id: "p-button-41",
						title: "Button using the built-in loading prop",
						url: "https://coss.com/ui/r/p-button-41.json",
					},
					{
						id: "p-button-18",
						title: "Custom loading button with manual Spinner",
						url: "https://coss.com/ui/r/p-button-18.json",
					},
					{
						id: "p-button-19",
						title: "Expandable show more/less toggle button",
						url: "https://coss.com/ui/r/p-button-19.json",
					},
					{
						id: "p-button-20",
						title: "Back link button with chevron",
						url: "https://coss.com/ui/r/p-button-20.json",
					},
					{
						id: "p-button-21",
						title: "Card-style button with heading and description",
						url: "https://coss.com/ui/r/p-button-21.json",
					},
					{
						id: "p-button-22",
						title: "Directional pad control buttons",
						url: "https://coss.com/ui/r/p-button-22.json",
					},
					{
						id: "p-button-23",
						title: "Outline like button with count",
						url: "https://coss.com/ui/r/p-button-23.json",
					},
					{
						id: "p-button-24",
						title: "Social login icon buttons",
						url: "https://coss.com/ui/r/p-button-24.json",
					},
					{
						id: "p-button-26",
						title: "Star button with count badge",
						url: "https://coss.com/ui/r/p-button-26.json",
					},
					{
						id: "p-button-27",
						title: "Button group with QR code icon and sign in",
						url: "https://coss.com/ui/r/p-button-27.json",
					},
					{
						id: "p-button-28",
						title: "Button with avatar",
						url: "https://coss.com/ui/r/p-button-28.json",
					},
					{
						id: "p-button-29",
						title: "Pill-shaped button with rounded-full styling",
						url: "https://coss.com/ui/r/p-button-29.json",
					},
					{
						id: "p-button-30",
						title: "Button with animated arrow on hover",
						url: "https://coss.com/ui/r/p-button-30.json",
					},
					{
						id: "p-button-31",
						title: "Button with keyboard shortcut indicator",
						url: "https://coss.com/ui/r/p-button-31.json",
					},
					{
						id: "p-button-32",
						title: "Button with notification badge",
						url: "https://coss.com/ui/r/p-button-32.json",
					},
					{
						id: "p-button-33",
						title: "Paired buttons (Cancel/Save)",
						url: "https://coss.com/ui/r/p-button-33.json",
					},
					{
						id: "p-button-34",
						title: "Button with animated status dot",
						url: "https://coss.com/ui/r/p-button-34.json",
					},
					{
						id: "p-button-35",
						title: "Icon-only copy button with feedback",
						url: "https://coss.com/ui/r/p-button-35.json",
					},
					{
						id: "p-button-36",
						title: "Copy button with feedback",
						url: "https://coss.com/ui/r/p-button-36.json",
					},
					{
						id: "p-button-37",
						title: "Rotating icon button (FAB-style toggle)",
						url: "https://coss.com/ui/r/p-button-37.json",
					},
					{
						id: "p-button-39",
						title: "Hamburger menu button with animated icon",
						url: "https://coss.com/ui/r/p-button-39.json",
					},
					{
						id: "p-button-40",
						title: "Download button with progress and cancel action",
						url: "https://coss.com/ui/r/p-button-40.json",
					},
					{
						id: "p-button-38",
						title: "Social login buttons (Google, X, GitHub)",
						url: "https://coss.com/ui/r/p-button-38.json",
					},
				],
			},
		],
	},
] satisfies CatalogGroup[];

export const catalogComponents = catalogGroups.flatMap((group) => group.components);
