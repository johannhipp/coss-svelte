import { CalendarDate, type DateValue } from "@internationalized/date";
import type {
	Accordion,
	AccordionHeader,
	AlertDialogPopup,
	Autocomplete,
	AutocompletePopup,
	Button,
	Calendar,
	Checkbox,
	CheckboxGroup,
	Combobox,
	ComboboxPopup,
	CommandDialogPopup,
	DatePicker,
	DialogPopup,
	DialogTrigger,
	DrawerPopup,
	MenuPopup,
	OTPField,
	Pagination,
	PopoverPopup,
	PreviewCardPopup,
	Select,
	SelectPopup,
	SheetPopup,
	Slider,
	Switch,
	ToggleGroup,
	TooltipPopup,
} from "coss-svelte";
import type { ComponentProps } from "svelte";

type Assert<T extends true> = T;
type HasKey<T, K extends PropertyKey> = K extends keyof T ? true : false;
type Not<T extends boolean> = T extends true ? false : true;

type DialogTriggerProps = ComponentProps<typeof DialogTrigger>;
type AccordionHeaderProps = ComponentProps<typeof AccordionHeader>;
type _DelegatingTriggerHasChild = Assert<HasKey<DialogTriggerProps, "child">>;
type _StructuralHeaderOmitsChild = Assert<Not<HasKey<AccordionHeaderProps, "child">>>;

const delegatedTriggerRef: DialogTriggerProps = { ref: null };

type ButtonProps = ComponentProps<typeof Button>;
const anchorButton = {
	href: "",
	target: "_blank",
	download: "guide.pdf",
} satisfies ButtonProps;
const nativeButton = {
	type: "submit",
	form: "settings",
	disabled: true,
} satisfies ButtonProps;

// @ts-expect-error The anchor branch does not accept a button type.
const anchorWithButtonType: ButtonProps = { href: "/guide", type: "button" };
// @ts-expect-error The native button branch does not accept anchor targets.
const buttonWithTarget: ButtonProps = { target: "_blank" };
// @ts-expect-error Anchors do not advertise native disabled behavior.
const disabledAnchor: ButtonProps = { href: "/guide", disabled: true };
// @ts-expect-error Buttons do not accept the anchor download attribute.
const downloadableButton: ButtonProps = { download: "guide.pdf" };

type AccordionProps = ComponentProps<typeof Accordion>;
const accordionDefault = { value: "one" } satisfies AccordionProps;
const accordionSingle = {
	type: "single",
	value: "one",
	onValueChange: (value: string) => value,
} satisfies AccordionProps;
const accordionMultiple = {
	type: "multiple",
	value: ["one"],
	onValueChange: (value: string[]) => value,
} satisfies AccordionProps;
// @ts-expect-error Single Accordion values are scalar.
const invalidAccordionSingle: AccordionProps = { type: "single", value: ["one"] };
// @ts-expect-error Multiple Accordion callbacks receive arrays.
const invalidAccordionMultiple: AccordionProps = {
	type: "multiple",
	onValueChange: (value: string) => value,
};

type CalendarProps = ComponentProps<typeof Calendar>;
const calendarDate = new CalendarDate(2026, 7, 28);
const calendarDefault = { value: calendarDate } satisfies CalendarProps;
const calendarMultiple = {
	type: "multiple",
	value: [calendarDate],
	onValueChange: (value: DateValue[]) => value,
} satisfies CalendarProps;
// @ts-expect-error Single Calendar values are not arrays.
const invalidCalendarSingle: CalendarProps = { value: [calendarDate] };
// @ts-expect-error Multiple Calendar values are arrays.
const invalidCalendarMultiple: CalendarProps = { type: "multiple", value: calendarDate };

type SliderProps = ComponentProps<typeof Slider>;
const scalarStepSlider = { value: 10, step: 2 } satisfies SliderProps;
const discreteStepSlider = { value: 10, step: [0, 10, 25] } satisfies SliderProps;
const multipleSlider = {
	type: "multiple",
	value: [10, 20],
	step: [0, 10, 20, 30],
	onValueCommit: (value: number[]) => value,
} satisfies SliderProps;
// @ts-expect-error Single Slider callbacks receive a number.
const invalidSliderSingle: SliderProps = {
	type: "single",
	onValueChange: (value: number[]) => value,
};
// @ts-expect-error Multiple Slider values are arrays.
const invalidSliderMultiple: SliderProps = { type: "multiple", value: 10 };

type SelectProps = ComponentProps<typeof Select>;
type ComboboxProps = ComponentProps<typeof Combobox>;
type AutocompleteProps = ComponentProps<typeof Autocomplete>;
const selectDefault = { value: "svelte" } satisfies SelectProps;
const selectMultiple = { type: "multiple", value: ["svelte"] } satisfies SelectProps;
const comboboxDefault = { value: "svelte" } satisfies ComboboxProps;
const comboboxMultiple = {
	type: "multiple",
	value: ["svelte"],
	onValueChange: (value: string[]) => value,
} satisfies ComboboxProps;
const autocompleteDefault = { value: "svelte" } satisfies AutocompleteProps;
const autocompleteMultiple = {
	type: "multiple",
	value: ["svelte"],
} satisfies AutocompleteProps;
// @ts-expect-error Single Select values are scalar.
const invalidSelect: SelectProps = { value: ["svelte"] };
// @ts-expect-error Multiple Combobox callbacks receive arrays.
const invalidCombobox: ComboboxProps = {
	type: "multiple",
	onValueChange: (value: string) => value,
};
// @ts-expect-error Multiple Autocomplete values are arrays.
const invalidAutocomplete: AutocompleteProps = { type: "multiple", value: "svelte" };

type ToggleGroupProps = ComponentProps<typeof ToggleGroup>;
const toggleDefault = { value: "bold" } satisfies ToggleGroupProps;
const toggleMultiple = {
	type: "multiple",
	value: ["bold", "italic"],
	onValueChange: (value: string[]) => value,
} satisfies ToggleGroupProps;
// @ts-expect-error Single ToggleGroup values are scalar.
const invalidToggleSingle: ToggleGroupProps = { type: "single", value: ["bold"] };
// @ts-expect-error Multiple ToggleGroup callbacks receive arrays.
const invalidToggleMultiple: ToggleGroupProps = {
	type: "multiple",
	onValueChange: (value: string) => value,
};

type CheckboxProps = ComponentProps<typeof Checkbox>;
type CheckboxGroupProps = ComponentProps<typeof CheckboxGroup>;
type SwitchProps = ComponentProps<typeof Switch>;
type OTPFieldProps = ComponentProps<typeof OTPField>;
const namedCheckbox = { name: "terms", required: true, disabled: false } satisfies CheckboxProps;
const namedCheckboxGroup = {
	name: "frameworks",
	required: true,
	disabled: false,
	value: ["svelte"],
} satisfies CheckboxGroupProps;
const valuedSwitch = {
	name: "notifications",
	value: "enabled",
	required: true,
	disabled: false,
} satisfies SwitchProps;
const completedOtp = {
	name: "code",
	onComplete: (value: string) => value.length,
} satisfies OTPFieldProps;
// @ts-expect-error Checkbox names are narrowed from upstream any to string.
const numericCheckboxName: CheckboxProps = { name: 1 };
// @ts-expect-error CheckboxGroup names are narrowed from upstream any to string.
const symbolicCheckboxGroupName: CheckboxGroupProps = { name: Symbol("frameworks") };
// @ts-expect-error Switch form values are narrowed from upstream any to string.
const numericSwitchValue: SwitchProps = { value: 1 };
// @ts-expect-error OTP completion receives the completed string.
const numericOtpCallback: OTPFieldProps = { onComplete: (value: number) => value };

type PaginationProps = ComponentProps<typeof Pagination>;
type PaginationPayload = Parameters<NonNullable<PaginationProps["children"]>>[0];
declare const paginationPayload: PaginationPayload;
const paginationPageNumber: number = paginationPayload.currentPage;
const paginationRange: typeof paginationPayload.range = paginationPayload.range;
const paginationPages: typeof paginationPayload.pages = paginationPayload.pages;

type DatePickerProps = ComponentProps<typeof DatePicker>;
const localizedDatePicker = {
	locale: "de-DE",
	previousMonthLabel: "Vorheriger Monat",
	nextMonthLabel: "Nächster Monat",
	disabled: false,
	required: true,
} satisfies DatePickerProps;
// @ts-expect-error DatePicker does not support named form serialization.
const namedDatePicker: DatePickerProps = { name: "date" };

const selectorPortal = { portalProps: { to: "#portal-host" } };
const elementPortal = { portalProps: { to: document.createElement("div") } };
const inlinePortal = { portalProps: { disabled: true } };
const dialogPortal = selectorPortal satisfies ComponentProps<typeof DialogPopup>;
const alertDialogPortal = inlinePortal satisfies ComponentProps<typeof AlertDialogPopup>;
const sheetPortal = elementPortal satisfies ComponentProps<typeof SheetPopup>;
const drawerPortal = selectorPortal satisfies ComponentProps<typeof DrawerPopup>;
const commandDialogPortal = elementPortal satisfies ComponentProps<typeof CommandDialogPopup>;
const menuPortal = selectorPortal satisfies ComponentProps<typeof MenuPopup>;
const popoverPortal = inlinePortal satisfies ComponentProps<typeof PopoverPopup>;
const tooltipPortal = elementPortal satisfies ComponentProps<typeof TooltipPopup>;
const previewCardPortal = selectorPortal satisfies ComponentProps<typeof PreviewCardPopup>;
const autocompletePortal = inlinePortal satisfies ComponentProps<typeof AutocompletePopup>;
const comboboxPortal = elementPortal satisfies ComponentProps<typeof ComboboxPopup>;
const selectPortal = selectorPortal satisfies ComponentProps<typeof SelectPopup>;
const cancellableDialog = {
	onInteractOutside: (
		event: Parameters<NonNullable<ComponentProps<typeof DialogPopup>["onInteractOutside"]>>[0]
	) => event.preventDefault(),
} satisfies ComponentProps<typeof DialogPopup>;

const invalidPortalContainer = {
	portalProps: {
		// @ts-expect-error React/Base UI container is not a Bits Portal option.
		container: document.body,
	},
} satisfies ComponentProps<typeof DialogPopup>;
const invalidPortalKeepMounted = {
	portalProps: {
		// @ts-expect-error keepMounted is not a Bits Portal option.
		keepMounted: true,
	},
} satisfies ComponentProps<typeof DialogPopup>;
const invalidPortalChildren = {
	portalProps: {
		// @ts-expect-error Popup owns the Portal children.
		children: (() => {}) as never,
	},
} satisfies ComponentProps<typeof DialogPopup>;
const invalidDialogBehavior = {
	// @ts-expect-error DialogPopup fixes outside interaction to close.
	interactOutsideBehavior: "ignore",
} satisfies ComponentProps<typeof DialogPopup>;
const invalidAlertCancellation = {
	// @ts-expect-error AlertDialog intentionally does not expose outside cancellation.
	onInteractOutside: () => {},
} satisfies ComponentProps<typeof AlertDialogPopup>;

void anchorButton;
void nativeButton;
void anchorWithButtonType;
void buttonWithTarget;
void disabledAnchor;
void downloadableButton;
void delegatedTriggerRef;
void accordionDefault;
void accordionSingle;
void accordionMultiple;
void invalidAccordionSingle;
void invalidAccordionMultiple;
void calendarDefault;
void calendarMultiple;
void invalidCalendarSingle;
void invalidCalendarMultiple;
void scalarStepSlider;
void discreteStepSlider;
void multipleSlider;
void invalidSliderSingle;
void invalidSliderMultiple;
void selectDefault;
void selectMultiple;
void comboboxDefault;
void comboboxMultiple;
void autocompleteDefault;
void autocompleteMultiple;
void invalidSelect;
void invalidCombobox;
void invalidAutocomplete;
void toggleDefault;
void toggleMultiple;
void invalidToggleSingle;
void invalidToggleMultiple;
void namedCheckbox;
void namedCheckboxGroup;
void valuedSwitch;
void completedOtp;
void numericCheckboxName;
void symbolicCheckboxGroupName;
void numericSwitchValue;
void numericOtpCallback;
void paginationPageNumber;
void paginationRange;
void paginationPages;
void localizedDatePicker;
void namedDatePicker;
void dialogPortal;
void alertDialogPortal;
void sheetPortal;
void drawerPortal;
void commandDialogPortal;
void menuPortal;
void popoverPortal;
void tooltipPortal;
void previewCardPortal;
void autocompletePortal;
void comboboxPortal;
void selectPortal;
void cancellableDialog;
void invalidPortalContainer;
void invalidPortalKeepMounted;
void invalidPortalChildren;
void invalidDialogBehavior;
void invalidAlertCancellation;
