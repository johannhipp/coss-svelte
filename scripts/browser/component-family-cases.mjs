import { componentMetadata } from "../../packages/coss-svelte/src/metadata.js";
import { assertNoBlockingAxeViolations, blockingAxeViolations } from "./docs-shell-cases.mjs";

const fixturePath = "/__test__/component-families";
const catalogEntries = Object.values(componentMetadata).map(({ slug, title }) => ({ slug, title }));
const NUMBER_FIELD_PRESS_DELAY_MS = 400;
const NUMBER_FIELD_REPEAT_INTERVAL_MS = 80;
const NUMBER_FIELD_REPEAT_MARGIN_MS = 120;

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

async function gotoFixture(page, baseUrl) {
	await page.goto(`${baseUrl}${fixturePath}`, { waitUntil: "networkidle" });
	await page.getByTestId("component-family-fixture").waitFor();
}

async function waitForFixtureState(page, testId, expected) {
	await page.waitForFunction(
		({ testId, expected }) =>
			document.querySelector(`[data-testid="${testId}"]`)?.textContent?.trim() === expected,
		{ testId, expected }
	);
}

async function runWorkers(items, workerCount, work) {
	let nextIndex = 0;
	const failures = [];

	async function worker() {
		while (nextIndex < items.length) {
			const item = items[nextIndex];
			nextIndex += 1;
			try {
				await work(item);
			} catch (error) {
				failures.push(
					`${item.slug ?? item}: ${error instanceof Error ? error.message : String(error)}`
				);
			}
		}
	}

	await Promise.all(Array.from({ length: Math.min(workerCount, items.length) }, () => worker()));
	if (failures.length > 0) {
		throw new Error(failures.join("\n"));
	}
}

async function assertNoDocumentOverflow(page, label) {
	const dimensions = await page.evaluate(() => ({
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth,
	}));
	assert(
		dimensions.scrollWidth <= dimensions.clientWidth,
		`${label} overflows the document: ${JSON.stringify(dimensions)}`
	);
}

async function assertIntersectsViewport(page, locator, label) {
	const bounds = await locator.boundingBox();
	const viewport = page.viewportSize();
	assert(bounds && viewport, `${label} has no viewport geometry.`);
	assert(
		bounds.x + bounds.width > 0 &&
			bounds.y + bounds.height > 0 &&
			bounds.x < viewport.width &&
			bounds.y < viewport.height,
		`${label} does not intersect the viewport.`
	);
}

async function waitForAnimations(locator) {
	await locator.evaluate(async (element) => {
		await Promise.all(
			element.getAnimations({ subtree: true }).map((animation) => animation.finished)
		);
	});
}

async function catalogSsr({ context, baseUrl }) {
	await runWorkers(catalogEntries, 8, async ({ slug }) => {
		const response = await context.request.get(`${baseUrl}/docs/components/${slug}`);
		assert(response.ok(), `${slug} returned ${response.status()}.`);
		const html = await response.text();
		assert(html.includes(`data-preview-slug="${slug}"`), `${slug} is absent from SSR HTML.`);
		assert(!html.includes("could not be loaded"), `${slug} SSR emitted an example error.`);
	});
}

async function catalogHydrate({ browser, baseUrl }) {
	await runWorkers(catalogEntries, 4, async ({ slug }) => {
		const context = await browser.newContext({ reducedMotion: "reduce" });
		const page = await context.newPage();
		try {
			await page.goto(`${baseUrl}/docs/components/${slug}`, { waitUntil: "domcontentloaded" });
			await page.locator(`[data-preview-slug="${slug}"]`).waitFor();
			const codeTab = page.getByRole("tab", { name: "Code" });
			await codeTab.click();
			assert((await codeTab.getAttribute("aria-selected")) === "true", `${slug} did not hydrate.`);
			await page.getByRole("tab", { name: "Preview" }).click();
		} finally {
			await context.close();
		}
	});
}

async function catalogAxe({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "component-family fixture");
	assertNoBlockingAxeViolations(
		await blockingAxeViolations(page, { include: '[data-testid="native-form-family"]' }),
		"form-control fixture group"
	);
	assertNoBlockingAxeViolations(
		await blockingAxeViolations(page, {
			include: '[data-testid="number-field-a11y-states"]',
		}),
		"Number Field invalid, disabled, and Field-labelled states"
	);

	await page.getByTestId("dialog-trigger").click();
	const dialogPopup = page.locator('[data-slot="dialog-popup"]');
	await dialogPopup.waitFor();
	await waitForAnimations(dialogPopup);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open modal fixture");
	await page.keyboard.press("Escape");
	await dialogPopup.waitFor({ state: "hidden" });

	await page.getByTestId("menu-trigger").click();
	const menuPopup = page.getByRole("menu").first();
	await menuPopup.waitFor();
	await waitForAnimations(menuPopup);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open Menu fixture");
	await page.keyboard.press("Escape");
	await menuPopup.waitFor({ state: "hidden" });

	const contextTrigger = page.getByTestId("context-menu-trigger");
	await contextTrigger.focus();
	await page.keyboard.press("ContextMenu");
	const contextMenu = page.locator('[data-slot="context-menu-popup"]');
	await contextMenu.waitFor();
	await waitForAnimations(contextMenu);
	const contextSubTrigger = page.getByRole("menuitem", { name: "Context choices" });
	await contextSubTrigger.focus();
	assert(
		await contextSubTrigger.evaluate((element) => element === document.activeElement),
		"Context Menu root autofocus did not settle before the submenu canary."
	);
	await page.keyboard.press("ArrowLeft");
	const contextSubmenu = page.getByRole("menu").nth(1);
	await contextSubmenu.waitFor();
	await waitForAnimations(contextSubmenu);
	assertNoBlockingAxeViolations(
		await blockingAxeViolations(page),
		"open Context Menu submenu fixture"
	);
	await page.keyboard.press("Escape");
	await page.keyboard.press("Escape");

	await page.evaluate(() => document.documentElement.classList.add("dark"));
	await page.evaluate(async () => {
		const finiteAnimations = document
			.getAnimations()
			.filter((animation) => animation.effect?.getTiming().iterations !== Infinity);
		await Promise.all(finiteAnimations.map((animation) => animation.finished));
	});
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "dark component-family fixture");
	await page.evaluate(() => document.documentElement.classList.remove("dark"));
}

const modalConfigurations = Object.freeze({
	dialog: {
		popupSlot: "dialog-popup",
		overlaySlot: "dialog-overlay",
		portal: "selector",
		cancellable: true,
	},
	"alert-dialog": {
		popupSlot: "alert-dialog-popup",
		overlaySlot: "alert-dialog-overlay",
		portal: "body",
		cancellable: false,
	},
	sheet: {
		popupSlot: "sheet-popup",
		overlaySlot: "sheet-overlay",
		portal: "element",
		cancellable: true,
	},
	drawer: {
		popupSlot: "drawer-popup",
		overlaySlot: "drawer-overlay",
		portal: "inline",
		cancellable: true,
	},
	"command-dialog": {
		popupSlot: "command-dialog-popup",
		overlaySlot: "command-dialog-overlay",
		portal: "body",
		cancellable: true,
	},
});

async function assertModalPortal(page, name, popup, portal) {
	if (portal === "selector") {
		assert(
			(await page
				.getByTestId("selector-portal-host")
				.locator(`[data-slot="${name}-popup"]`)
				.count()) === 1,
			`${name} did not use its selector portal target.`
		);
		return;
	}
	if (portal === "element") {
		assert(
			(await page
				.getByTestId("element-portal-host")
				.locator(`[data-slot="${name}-popup"]`)
				.count()) === 1,
			`${name} did not use its Element portal target.`
		);
		return;
	}
	if (portal === "inline") {
		const isInline = await popup.evaluate(
			(element, fixtureName) => Boolean(element.closest(`[data-testid="${fixtureName}-fixture"]`)),
			name
		);
		assert(isInline, `${name} portalProps.disabled did not render inline.`);
		return;
	}
	const isOutsideFixture = await popup.evaluate(
		(element, fixtureName) => !element.closest(`[data-testid="${fixtureName}-fixture"]`),
		name
	);
	assert(isOutsideFixture, `${name} did not use the default body portal.`);
}

async function modalTransition(
	page,
	name,
	trigger,
	popup,
	expectedOpenChanges,
	expectedCompletedChanges
) {
	await trigger.click();
	await popup.waitFor();
	await waitForFixtureState(
		page,
		`${name}-state`,
		`open:${expectedOpenChanges}:${expectedCompletedChanges}`
	);
}

async function exerciseModal({ browser, page, baseUrl }, name) {
	const configuration = modalConfigurations[name];
	await gotoFixture(page, baseUrl);
	const trigger = page.getByTestId(`${name}-trigger`);
	const popup = page.locator(`[data-slot="${configuration.popupSlot}"]`);
	const overlay = page.locator(`[data-slot="${configuration.overlaySlot}"]`);
	let openChanges = 0;
	let completedChanges = 0;

	if (configuration.cancellable) {
		await page.getByTestId(`${name}-prevent-outside`).click();
		openChanges += 1;
		await modalTransition(page, name, trigger, popup, openChanges, completedChanges);
		await assertModalPortal(page, name, popup, configuration.portal);
		await popup.click({ position: { x: 20, y: 20 } });
		await waitForFixtureState(page, `${name}-state`, `open:${openChanges}:${completedChanges}`);
		await overlay.click({ position: { x: 6, y: 6 } });
		await waitForFixtureState(page, `${name}-state`, `open:${openChanges}:${completedChanges}`);
		await page.keyboard.press("Escape");
		await popup.waitFor({ state: "hidden" });
		openChanges += 1;
		completedChanges += 1;
		await waitForFixtureState(page, `${name}-state`, `closed:${openChanges}:${completedChanges}`);
		assert(
			await trigger.evaluate((element) => element === document.activeElement),
			`${name} did not restore focus after Escape.`
		);
		await page.getByTestId(`${name}-prevent-outside`).click();
	}

	openChanges += 1;
	await modalTransition(page, name, trigger, popup, openChanges, completedChanges);
	await assertModalPortal(page, name, popup, configuration.portal);
	await popup.click({ position: { x: 20, y: 20 } });
	await waitForFixtureState(page, `${name}-state`, `open:${openChanges}:${completedChanges}`);
	await overlay.click({ position: { x: 6, y: 6 } });
	await popup.waitFor({ state: "hidden" });
	openChanges += 1;
	completedChanges += 1;
	await waitForFixtureState(page, `${name}-state`, `closed:${openChanges}:${completedChanges}`);
	assert(
		await trigger.evaluate((element) => element === document.activeElement),
		`${name} did not restore focus after backdrop dismissal.`
	);

	openChanges += 1;
	await modalTransition(page, name, trigger, popup, openChanges, completedChanges);
	await page.keyboard.press("Escape");
	await popup.waitFor({ state: "hidden" });
	openChanges += 1;
	completedChanges += 1;
	await waitForFixtureState(page, `${name}-state`, `closed:${openChanges}:${completedChanges}`);
	assert(
		await trigger.evaluate((element) => element === document.activeElement),
		`${name} did not restore focus after its final Escape.`
	);

	const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
	try {
		const mobilePage = await mobileContext.newPage();
		await gotoFixture(mobilePage, baseUrl);
		const mobileTrigger = mobilePage.getByTestId(`${name}-trigger`);
		await mobileTrigger.click();
		const mobilePopup = mobilePage.locator(`[data-slot="${configuration.popupSlot}"]`);
		await mobilePopup.waitFor();
		await waitForAnimations(mobilePopup);
		await assertIntersectsViewport(mobilePage, mobilePopup, `${name} mobile popup`);
		await mobilePage
			.locator(`[data-slot="${configuration.overlaySlot}"]`)
			.click({ position: { x: 4, y: 4 } });
		await mobilePopup.waitFor({ state: "hidden" });
		assert(
			await mobileTrigger.evaluate((element) => element === document.activeElement),
			`${name} mobile backdrop dismissal did not restore focus.`
		);
		await assertNoDocumentOverflow(mobilePage, `${name} mobile path`);
	} finally {
		await mobileContext.close();
	}
}

async function dialogModal(arguments_) {
	await exerciseModal(arguments_, "dialog");
	const { browser, page, baseUrl } = arguments_;
	await gotoFixture(page, baseUrl);
	await page.getByTestId("dialog-trigger").click();
	const dialogPopup = page.locator('[data-slot="dialog-popup"]');
	await dialogPopup.waitFor();
	await waitForAnimations(dialogPopup);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open Dialog");
	await page.keyboard.press("Escape");

	const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
	try {
		const reducedPage = await reducedContext.newPage();
		await gotoFixture(reducedPage, baseUrl);
		const trigger = reducedPage.getByTestId("dialog-trigger");
		await trigger.click();
		await reducedPage.locator('[data-slot="dialog-popup"]').waitFor();
		await reducedPage.keyboard.press("Escape");
		await reducedPage.locator('[data-slot="dialog-popup"]').waitFor({ state: "hidden" });
		assert(
			await trigger.evaluate((element) => element === document.activeElement),
			"Reduced-motion Dialog did not close and restore focus."
		);
	} finally {
		await reducedContext.close();
	}
}

async function alertDialogModal(arguments_) {
	await exerciseModal(arguments_, "alert-dialog");
}

async function sheetModal(arguments_) {
	await exerciseModal(arguments_, "sheet");
}

async function drawerModal(arguments_) {
	await exerciseModal(arguments_, "drawer");
}

async function commandDialogModal(arguments_) {
	await exerciseModal(arguments_, "command-dialog");
}

async function floatingBehavior({ browser, page, baseUrl }) {
	await gotoFixture(page, baseUrl);

	const popoverTrigger = page.getByTestId("popover-trigger");
	await popoverTrigger.click();
	const popover = page.locator('[data-slot="popover-popup"]');
	await popover.waitFor();
	assert(
		(await page
			.getByTestId("selector-portal-host")
			.locator('[data-slot="popover-popup"]')
			.count()) === 1,
		"Popover did not use its selector portal target."
	);
	await page.getByTestId("popover-action").click();
	await waitForFixtureState(page, "popover-state", "open");
	await page.keyboard.press("Escape");
	await popover.waitFor({ state: "hidden" });
	assert(
		await popoverTrigger.evaluate((element) => element === document.activeElement),
		"Popover did not restore trigger focus."
	);

	const tooltipTrigger = page.getByTestId("tooltip-trigger");
	await tooltipTrigger.focus();
	const tooltip = page.getByRole("tooltip");
	await tooltip.waitFor();
	await page.keyboard.press("Escape");
	await tooltip.waitFor({ state: "hidden" });
	assert(
		await tooltipTrigger.evaluate((element) => element === document.activeElement),
		"Tooltip moved focus away from its trigger."
	);

	const previewTrigger = page.getByTestId("preview-card-trigger");
	await previewTrigger.focus();
	const preview = page.locator('[data-slot="preview-card-popup"]');
	await preview.waitFor();
	assert(
		(await page
			.getByTestId("element-portal-host")
			.locator('[data-slot="preview-card-popup"]')
			.count()) === 1,
		"Preview Card did not use its Element portal target."
	);
	await page.keyboard.press("Escape");
	await preview.waitFor({ state: "hidden" });

	const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
	try {
		const reducedPage = await reducedContext.newPage();
		await gotoFixture(reducedPage, baseUrl);
		await reducedPage.getByTestId("popover-trigger").click();
		await reducedPage.locator('[data-slot="popover-popup"]').waitFor();
		await reducedPage.keyboard.press("Escape");
		await reducedPage.locator('[data-slot="popover-popup"]').waitFor({ state: "hidden" });
	} finally {
		await reducedContext.close();
	}
}

async function menuBehavior({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const trigger = page.getByTestId("menu-trigger");
	await trigger.click();
	const menu = page.getByRole("menu").first();
	await menu.waitFor();
	await waitForAnimations(menu);
	assert(
		(await page.getByTestId("selector-portal-host").getByRole("menu").count()) === 1,
		"Menu did not use its selector portal target."
	);

	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("ArrowDown");
	const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
	assert(
		focusedText?.includes("Bravo action"),
		"Menu arrow navigation did not skip disabled item."
	);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open Menu");

	const subTrigger = page.getByRole("menuitem", { name: "More actions" });
	await subTrigger.focus();
	await page.keyboard.press("ArrowRight");
	await page.getByRole("menuitem", { name: "Nested action" }).waitFor();
	await page.keyboard.press("ArrowLeft");
	assert(
		await subTrigger.evaluate((element) => element === document.activeElement),
		"Menu submenu did not restore focus to its trigger with ArrowLeft."
	);
	await page.keyboard.press("Escape");
	await menu.waitFor({ state: "hidden" });
	assert(
		await trigger.evaluate((element) => element === document.activeElement),
		"Menu did not restore focus to its root trigger."
	);

	await trigger.click();
	await page.getByRole("menuitem", { name: "Bravo action" }).focus();
	await page.keyboard.press("Enter");
	await waitForFixtureState(page, "menu-state", "closed:bravo");
}

async function contextMenuBehavior({ browser, page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const trigger = page.getByTestId("context-menu-trigger");
	await trigger.focus();
	await page.keyboard.press("ContextMenu");
	const menu = page.getByRole("menu").first();
	await menu.waitFor();
	await waitForAnimations(menu);

	await page.keyboard.press("ArrowDown");
	const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
	assert(
		focusedText?.includes("Context flag"),
		"Context Menu keyboard navigation did not skip its disabled item."
	);

	const subTrigger = page.getByRole("menuitem", { name: "Context choices" });
	await subTrigger.focus();
	await page.keyboard.press("ArrowLeft");
	const submenu = page.getByRole("menu").nth(1);
	await submenu.waitFor();
	const triggerBounds = await subTrigger.boundingBox();
	const submenuBounds = await submenu.boundingBox();
	assert(
		triggerBounds && submenuBounds && submenuBounds.x < triggerBounds.x,
		"RTL Context Menu submenu did not open on the logical left."
	);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open Context Menu submenu");
	await page.keyboard.press("Escape");
	assert(
		await subTrigger.evaluate((element) => element === document.activeElement),
		"Context Menu submenu did not restore focus first."
	);
	await page.keyboard.press("Escape");
	await menu.waitFor({ state: "hidden" });
	assert(
		await trigger.evaluate((element) => element === document.activeElement),
		"Context Menu root did not restore target focus."
	);

	await trigger.click({ button: "right" });
	await menu.waitFor();
	await page.getByRole("menuitem", { name: "Context details link" }).click();
	await waitForFixtureState(page, "context-menu-state", "closed:link:false:alpha");
	assert(
		new URL(page.url()).hash === "#context-menu-state",
		"Context Menu link selection did not retain semantic navigation."
	);

	await trigger.click({ button: "right" });
	await menu.waitFor();
	await waitForAnimations(menu);
	await page.mouse.click(8, 8);
	await menu.waitFor({ state: "hidden" });

	const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
	try {
		const mobilePage = await mobileContext.newPage();
		await gotoFixture(mobilePage, baseUrl);
		const mobileTrigger = mobilePage.getByTestId("context-menu-trigger");
		await mobileTrigger.click({ button: "right" });
		const mobileMenu = mobilePage.getByRole("menu").first();
		await mobileMenu.waitFor();
		await assertIntersectsViewport(mobilePage, mobileMenu, "Context Menu mobile popup");
		await assertNoDocumentOverflow(mobilePage, "Context Menu mobile path");
	} finally {
		await mobileContext.close();
	}
}

async function listboxBehavior({ browser, page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const select = page.getByRole("button", { name: "Select fixture", exact: true });
	await select.click();
	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	await waitForFixtureState(page, "listbox-state", "bravo:::");

	const multiple = page.getByRole("button", { name: "Multiple Select fixture" });
	await multiple.click();
	await page.getByRole("option", { name: "Alpha" }).click();
	await page.getByRole("option", { name: "Bravo" }).click();
	await page.keyboard.press("Escape");
	await waitForFixtureState(page, "listbox-state", "bravo:alpha,bravo::");

	const combobox = page.getByRole("combobox", { name: "Combobox fixture" });
	await combobox.pressSequentially("br");
	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	await page.waitForFunction(() =>
		document.querySelector('[data-testid="listbox-state"]')?.textContent?.trim().includes(":bravo:")
	);

	const autocomplete = page.getByRole("combobox", { name: "Autocomplete fixture" });
	await autocomplete.pressSequentially("ch");
	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	await page.waitForFunction(() =>
		document
			.querySelector('[data-testid="listbox-state"]')
			?.textContent?.trim()
			.endsWith(":charlie")
	);

	assert(
		await page.getByRole("button", { name: "Disabled Select fixture" }).isDisabled(),
		"Disabled Select remains interactive."
	);

	const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
	try {
		const mobilePage = await mobileContext.newPage();
		await gotoFixture(mobilePage, baseUrl);
		await mobilePage.getByRole("button", { name: "Select fixture", exact: true }).click();
		const popup = mobilePage.locator('[data-slot="select-popup"]').first();
		await popup.waitFor();
		await assertIntersectsViewport(mobilePage, popup, "Select mobile popup");
		await assertNoDocumentOverflow(mobilePage, "Select mobile path");
	} finally {
		await mobileContext.close();
	}
}

async function choiceBehavior({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const checkbox = page.getByRole("checkbox", { name: "Checkbox fixture", exact: true });
	await checkbox.focus();
	await page.keyboard.press("Space");
	assert(
		(await checkbox.getAttribute("data-state")) === "checked",
		"Checkbox Space binding failed."
	);

	const disabled = page.getByRole("checkbox", { name: "Disabled Checkbox fixture" });
	assert(await disabled.isDisabled(), "Disabled Checkbox is enabled.");

	const groupAlpha = page.getByRole("checkbox", { name: "Checkbox Group Alpha" });
	await groupAlpha.focus();
	await page.keyboard.press("Space");

	const switchControl = page.getByRole("switch", { name: "Switch fixture" });
	await switchControl.focus();
	await page.keyboard.press("Space");

	const alphaRadio = page.getByRole("radio", { name: "Alpha" });
	await alphaRadio.focus();
	await page.keyboard.press("ArrowDown");
	assert(
		(await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Bravo",
		"Radio Group did not skip its disabled option."
	);

	const toggle = page.getByRole("button", { name: "Toggle fixture" });
	await toggle.focus();
	await page.keyboard.press("Space");
	const toggleAlpha = page.getByRole("button", { name: "Alpha" });
	await toggleAlpha.focus();
	await page.keyboard.press("Space");

	await page.waitForFunction(() => {
		const value = document.querySelector('[data-testid="choice-state"]')?.textContent?.trim();
		return value?.startsWith("true:alpha:true:bravo:true:alpha");
	});
}

async function disclosureBehavior({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const firstAccordion = page.getByRole("button", { name: "First Accordion fixture" });
	await firstAccordion.click();
	await waitForFixtureState(page, "disclosure-state", "first:false:first:true");
	await firstAccordion.focus();
	await page.keyboard.press("ArrowDown");
	assert(
		(await page.evaluate(() => document.activeElement?.textContent?.trim()))?.includes(
			"Second Accordion fixture"
		),
		"Accordion arrow focus failed."
	);

	await page.getByRole("button", { name: "Collapsible fixture" }).click();
	await waitForFixtureState(page, "disclosure-state", "first:true:first:true");

	const firstTab = page.getByRole("tab", { name: "First Tab fixture" });
	await firstTab.focus();
	await page.keyboard.press("ArrowRight");
	await waitForFixtureState(page, "disclosure-state", "first:true:second:true");
	assert(
		(await page.getByRole("tab", { name: "Second Tab fixture" }).getAttribute("aria-selected")) ===
			"true",
		"Tabs arrow activation failed."
	);

	await page.getByRole("button", { name: "Toggle Sidebar" }).click();
	await waitForFixtureState(page, "disclosure-state", "first:true:second:false");
	assert(
		(await page.getByLabel("Sidebar fixture").getAttribute("data-state")) === "collapsed",
		"Sidebar binding did not propagate."
	);
}

async function dateRangeBehavior({ browser, page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	await page.getByRole("button", { name: "Datum auswählen" }).click();
	const heading = page.locator('[data-slot="date-picker-popup"] [data-slot="calendar-heading"]');
	await heading.waitFor();
	const headingText = (await heading.textContent())?.trim().toLocaleLowerCase("de-DE");
	const germanMonth = new Intl.DateTimeFormat("de-DE", { month: "long" })
		.format(new Date())
		.toLocaleLowerCase("de-DE");
	assert(headingText?.includes(germanMonth), `DatePicker heading is not German: ${headingText}`);
	await page.keyboard.press("Escape");

	const boundsNumber = page.getByTestId("bounds-number-field");
	const number = boundsNumber.getByRole("spinbutton", {
		name: "Quantity fixture",
		exact: true,
	});
	await number.focus();
	await page.keyboard.press("End");
	assert((await number.getAttribute("aria-valuenow")) === "4", "Number Field End bound failed.");
	await page.keyboard.press("ArrowUp");
	assert((await number.getAttribute("aria-valuenow")) === "4", "Number Field exceeded max.");
	assert(
		await boundsNumber.getByRole("button", { name: "Increase value" }).isDisabled(),
		"Number Field increment is enabled at max."
	);

	const deepNumber = page.getByTestId("deep-number-field");
	const deepInput = deepNumber.getByRole("spinbutton", {
		name: "Deep quantity fixture",
	});
	const deepIncrement = deepNumber.getByRole("button", {
		name: "Increase value",
	});
	const resetDeepNumber = page.getByRole("button", {
		name: "Reset deep Number Field",
	});
	const deepState = page.getByTestId("deep-number-state");

	await deepInput.focus();
	await deepInput.fill("2,");
	await deepInput.evaluate(
		() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
	);
	assert(
		(await deepInput.inputValue()) === "2,",
		"Number Field did not retain a partial localized decimal across a frame."
	);
	assert(
		(await deepInput.getAttribute("aria-valuenow")) === "2",
		"Number Field did not update its canonical binding during localized editing."
	);
	await page.keyboard.press("Tab");
	assert(
		(await deepInput.inputValue()) === "2,00",
		"Number Field did not format the localized value at blur."
	);
	assert(
		(await deepState.textContent())?.trim().endsWith(":input"),
		"Number Field did not expose its input commit reason."
	);

	await resetDeepNumber.click();
	await page.waitForFunction(
		() =>
			document
				.querySelector('[data-testid="deep-number-field"] [role="spinbutton"]')
				?.getAttribute("aria-valuenow") === "1.5"
	);

	const incrementBounds = await deepIncrement.boundingBox();
	assert(incrementBounds, "Number Field increment has no browser geometry.");
	await page.mouse.move(
		incrementBounds.x + incrementBounds.width / 2,
		incrementBounds.y + incrementBounds.height / 2
	);
	await page.mouse.down();
	await page.waitForTimeout(
		NUMBER_FIELD_PRESS_DELAY_MS + NUMBER_FIELD_REPEAT_INTERVAL_MS + NUMBER_FIELD_REPEAT_MARGIN_MS
	);
	const repeatedValue = Number(await deepInput.getAttribute("aria-valuenow"));
	assert(repeatedValue > 2, "Number Field did not repeat while held.");
	await page.mouse.up();
	const releasedValue = await deepInput.getAttribute("aria-valuenow");
	const commitsAfterRelease = Number((await deepState.textContent())?.trim().split(":")[2]);
	await page.waitForTimeout(NUMBER_FIELD_REPEAT_INTERVAL_MS * 3);
	assert(
		(await deepInput.getAttribute("aria-valuenow")) === releasedValue,
		"Number Field repeat continued after pointer release."
	);
	assert(
		Number((await deepState.textContent())?.trim().split(":")[2]) === commitsAfterRelease,
		"Number Field emitted more than one release commit."
	);

	await resetDeepNumber.click();
	await page.waitForFunction(
		() =>
			document
				.querySelector('[data-testid="deep-number-field"] [role="spinbutton"]')
				?.getAttribute("aria-valuenow") === "1.5"
	);
	await deepInput.hover();
	await page.mouse.wheel(0, -100);
	assert(
		(await deepInput.getAttribute("aria-valuenow")) === "1.5",
		"Unfocused Number Field intercepted the wheel."
	);
	await deepInput.focus();
	await deepInput.hover();
	await page.mouse.wheel(0, -100);
	await page.waitForFunction(
		() =>
			document
				.querySelector('[data-testid="deep-number-field"] [role="spinbutton"]')
				?.getAttribute("aria-valuenow") === "2"
	);

	await resetDeepNumber.click();
	await page.waitForFunction(
		() =>
			document
				.querySelector('[data-testid="deep-number-field"] [role="spinbutton"]')
				?.getAttribute("aria-valuenow") === "1.5"
	);
	const scrub = deepNumber.locator('[data-slot="number-field-scrub-area"]');
	const scrubBounds = await scrub.boundingBox();
	assert(scrubBounds, "Number Field scrub area has no browser geometry.");
	const commitsBeforeScrub = Number((await deepState.textContent())?.trim().split(":")[2]);
	await page.mouse.move(scrubBounds.x + 4, scrubBounds.y + scrubBounds.height / 2);
	await page.mouse.down();
	await page.mouse.move(scrubBounds.x + 20, scrubBounds.y + scrubBounds.height / 2);
	await page.mouse.up();
	assert(
		(await deepInput.getAttribute("aria-valuenow")) === "2.5",
		"Number Field mouse scrub did not apply retained threshold units."
	);
	assert(
		Number((await deepState.textContent())?.trim().split(":")[2]) === commitsBeforeScrub + 1,
		"Number Field scrub did not emit exactly one release commit."
	);

	await page.getByRole("button", { name: "Submit deep Number Field" }).click();
	assert(
		(await page.getByTestId("deep-number-form-state").textContent())?.includes(
			'["deep-quantity","2.5"]'
		),
		"Number Field did not submit one invariant form value."
	);
	await resetDeepNumber.click();
	await page.waitForFunction(
		() =>
			document
				.querySelector('[data-testid="deep-number-field"] [role="spinbutton"]')
				?.getAttribute("aria-valuenow") === "1.5"
	);

	const slider = page.getByRole("slider", { name: "Slider fixture" });
	await slider.focus();
	await page.keyboard.press("ArrowRight");
	assert((await slider.getAttribute("aria-valuenow")) === "30", "Slider keyboard binding failed.");

	const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
	try {
		const mobilePage = await mobileContext.newPage();
		await gotoFixture(mobilePage, baseUrl);
		const mobileNumber = mobilePage.getByTestId("bounds-number-field").getByRole("spinbutton", {
			name: "Quantity fixture",
			exact: true,
		});
		await mobileNumber.focus();
		await mobilePage.keyboard.press("Home");
		assert(
			(await mobileNumber.getAttribute("aria-valuenow")) === "0",
			"Mobile Number bound failed."
		);
		await assertNoDocumentOverflow(mobilePage, "Number Field mobile path");
	} finally {
		await mobileContext.close();
	}
}

async function nativeFormBehavior({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	await page.getByRole("button", { name: "Submit native fixture" }).click();
	await page.waitForFunction(() => {
		const output = document.querySelector('[data-testid="native-form-state"]')?.textContent ?? "";
		return (
			output.includes('["fixture-input","alpha"]') && output.includes('["fixture-otp","4821"]')
		);
	});
	const output = await page.getByTestId("native-form-state").textContent();
	assert(output?.includes('["fixture-textarea","notes"]'), "Textarea did not serialize.");
	assert(!output?.includes("fixture-disabled"), "Disabled native input serialized.");
}

async function managedFeedback({ browser, page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const trigger = page.getByTestId("toast-trigger");
	await trigger.focus();
	await trigger.click();
	const toast = page.locator('[data-slot="toast"]');
	await toast.waitFor();
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "open Toast");
	const dismiss = page.getByRole("button", { name: "Dismiss notification" });
	await dismiss.focus();
	await page.keyboard.press("Enter");
	await toast.waitFor({ state: "hidden" });

	const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
	try {
		const reducedPage = await reducedContext.newPage();
		await gotoFixture(reducedPage, baseUrl);
		await reducedPage.getByTestId("toast-trigger").click();
		const reducedToast = reducedPage.locator('[data-slot="toast"]');
		await reducedToast.waitFor();
		await reducedPage.getByRole("button", { name: "Dismiss notification" }).click();
		await reducedToast.waitFor({ state: "hidden" });
	} finally {
		await reducedContext.close();
	}
}

async function actionBehavior({ page, baseUrl }) {
	await gotoFixture(page, baseUrl);
	const actionFamily = page.getByTestId("action-family");
	const action = actionFamily.getByTestId("action-button");
	await action.focus();
	await page.keyboard.press("Enter");
	await waitForFixtureState(page, "action-state", "1:1:left");
	assert(
		await actionFamily.getByTestId("disabled-action-button").isDisabled(),
		"Disabled Button is enabled."
	);

	await actionFamily.getByRole("button", { name: "Next" }).click();
	await waitForFixtureState(page, "action-state", "1:2:left");

	const toolbarAction = actionFamily.getByRole("button", {
		name: "Toolbar action",
		exact: true,
	});
	await toolbarAction.focus();
	await page.keyboard.press("ArrowRight");
	const focusedName = await page.evaluate(
		() =>
			document.activeElement?.getAttribute("aria-label") ??
			document.activeElement?.textContent?.trim()
	);
	assert(focusedName === "Align left", "Toolbar arrows did not skip the disabled action.");
	await page.keyboard.press("ArrowRight");
	await page.keyboard.press("Space");
	await waitForFixtureState(page, "action-state", "1:2:right");
}

export const componentFamilyCaseHandlers = Object.freeze({
	catalogSsr,
	catalogHydrate,
	catalogAxe,
	dialogModal,
	alertDialogModal,
	sheetModal,
	drawerModal,
	commandDialogModal,
	floatingBehavior,
	menuBehavior,
	contextMenuBehavior,
	listboxBehavior,
	choiceBehavior,
	disclosureBehavior,
	dateRangeBehavior,
	nativeFormBehavior,
	managedFeedback,
	actionBehavior,
});

export const componentFamilyGroups = Object.freeze({
	catalog: ["catalogSsr", "catalogHydrate", "catalogAxe"],
	modal: ["dialogModal", "alertDialogModal", "sheetModal", "drawerModal", "commandDialogModal"],
	floating: ["floatingBehavior"],
	menu: ["menuBehavior", "contextMenuBehavior"],
	listbox: ["listboxBehavior"],
	choice: ["choiceBehavior"],
	disclosure: ["disclosureBehavior"],
	"date-range": ["dateRangeBehavior"],
	"native-form": ["nativeFormBehavior"],
	"managed-feedback": ["managedFeedback"],
	action: ["actionBehavior"],
	presentational: ["catalogSsr", "catalogHydrate", "catalogAxe"],
});

export async function runComponentFamilyCases({ browser, baseUrl, family }) {
	const handlerNames = family
		? componentFamilyGroups[family]
		: [...new Set(Object.values(componentFamilyGroups).flat())];
	if (!handlerNames) {
		throw new Error(
			`Unknown component family "${family}". Expected one of: ${Object.keys(componentFamilyGroups).join(", ")}.`
		);
	}

	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	try {
		const page = await context.newPage();
		for (const name of handlerNames) {
			await componentFamilyCaseHandlers[name]({ browser, context, page, baseUrl });
			console.log(`browser:components:${name} passed`);
		}
	} finally {
		await context.close();
	}
}
