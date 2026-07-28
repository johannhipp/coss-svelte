import AxeBuilder from "@axe-core/playwright";

async function waitForFiniteAnimations(page) {
	await page.evaluate(async () => {
		const animations = document.getAnimations().filter((animation) => {
			const iterations = animation.effect?.getTiming().iterations;
			return typeof iterations === "number" && Number.isFinite(iterations);
		});
		await Promise.allSettled(animations.map((animation) => animation.finished));
	});
}

export async function blockingAxeViolations(page, { include } = {}) {
	await waitForFiniteAnimations(page);
	let builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]);
	if (include) builder = builder.include(include);
	const accessibility = await builder.analyze();
	return accessibility.violations.filter((violation) =>
		["critical", "serious"].includes(violation.impact)
	);
}

export function assertNoBlockingAxeViolations(violations, label) {
	if (violations.length === 0) return;
	throw new Error(
		`${label} accessibility violations:\n${violations
			.map(
				(violation) =>
					`${violation.id}: ${violation.nodes.map((node) => node.target.join(", ")).join("; ")}`
			)
			.join("\n")}`
	);
}

async function assertPreviewCodeTabs(page, baseUrl, { slug, importName }) {
	await page.goto(`${baseUrl}/docs/components/${slug}`, { waitUntil: "networkidle" });
	const preview = page.locator(`[data-preview-slug="${slug}"]`);
	await preview.waitFor();

	const frame = page.locator(`[data-preview-tabs="${slug}"] .docs-preview-frame`);
	const previewBounds = await frame.boundingBox();
	if (!previewBounds || previewBounds.height < 440 || previewBounds.height > 460) {
		throw new Error(`${slug} preview frame should remain approximately 450px tall.`);
	}

	const codeTab = page.getByRole("tab", { name: "Code" });
	await codeTab.click();
	const codeSurface = page.locator(`[data-code-preview="${slug}"]`);
	await codeSurface.waitFor();
	const code = await codeSurface.textContent();
	if (!code?.includes(importName) || !code.includes('from "coss-svelte"')) {
		throw new Error(`${slug} Code tab is not showing its clean public Svelte example.`);
	}

	const codeBounds = await frame.boundingBox();
	if (!codeBounds || Math.abs(codeBounds.height - previewBounds.height) > 1) {
		throw new Error(`${slug} Code tab changed the fixed preview frame height.`);
	}

	await page.getByRole("tab", { name: "Preview" }).click();
	await preview.waitFor();
}

async function introductionShell({ page, baseUrl }) {
	await page.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
	await page.getByRole("heading", { name: "Introduction" }).waitFor();

	const toggle = page.getByRole("button", { name: /Switch to (dark|light) theme/ });
	const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
	if (!isDark) await toggle.click();
	await page.waitForFunction(() => document.documentElement.classList.contains("dark"));

	await page.keyboard.press("ControlOrMeta+K");
	await page.locator("#docs-search-input").waitFor();
	await page.keyboard.press("Escape");
	await page.locator("#docs-search-input").waitFor({ state: "hidden" });

	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "Introduction");
}

async function particlesSearch({ page, baseUrl }) {
	await page.goto(`${baseUrl}/particles`, { waitUntil: "networkidle" });
	await page.getByRole("heading", { name: "Browse Particles" }).waitFor();

	const search = page.getByRole("combobox", { name: "Search particles" });
	if ((await search.count()) !== 1) {
		throw new Error("The particle search should expose one searchable multi-select combobox.");
	}

	await search.click();
	const popup = page.locator("[data-particle-filter-popup]");
	await popup.waitFor();

	if ((await page.getByRole("button", { name: "Filter particles" }).count()) !== 0) {
		throw new Error("The particle search still exposes a separate tag-icon trigger.");
	}

	await search.fill("auto");
	const autocompleteOption = popup.getByRole("option", { name: "Autocomplete", exact: true });
	if ((await popup.getByRole("option").count()) !== 1 || (await autocompleteOption.count()) !== 1) {
		throw new Error("Typing in the particle search did not filter the available tags.");
	}
	await autocompleteOption.click();
	await page.waitForURL(`${baseUrl}/particles?tags=autocomplete`);
	await popup.waitFor();

	const avatarOption = popup.getByRole("option", { name: "Avatar", exact: true });
	if ((await avatarOption.count()) !== 1) {
		throw new Error("Selecting a particle did not clear the query for continued multi-selection.");
	}
	await avatarOption.click();
	await page.waitForURL(`${baseUrl}/particles?tags=autocomplete%2Cavatar`);

	await page.getByRole("heading", { name: "Browse Particles" }).click();
	await popup.waitFor({ state: "hidden" });

	await search.click();
	await search.press("Backspace");
	await page.waitForURL(`${baseUrl}/particles?tags=autocomplete`);
	await search.press("Delete");
	await page.waitForURL(`${baseUrl}/particles`);

	await search.click();
	await popup.waitFor();
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "Particle search");
}

async function routeMotion({ browser, page, baseUrl }) {
	await page.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
	await page.getByRole("link", { name: "Get Started", exact: true }).click();
	await page.waitForURL(`${baseUrl}/docs/getting-started`);
	await page.getByRole("heading", { name: "Getting Started" }).waitFor();

	const motion = await page
		.locator(".docs-page-flow > *")
		.first()
		.evaluate((element) =>
			element.getAnimations().map((animation) => ({
				duration: animation.effect?.getTiming().duration,
				name: "animationName" in animation ? animation.animationName : "",
			}))
		);
	if (
		!motion.some((animation) => animation.duration === 420 && animation.name === "docs-intro-enter")
	) {
		throw new Error("Sidebar navigation did not replay the Introduction entrance motion.");
	}

	await page.locator(".docs-page-flow").evaluate(async (element) => {
		await Promise.all(
			element.getAnimations({ subtree: true }).map((animation) => animation.finished)
		);
	});
	const finalStyle = await page
		.locator(".docs-page-flow > *")
		.first()
		.evaluate((element) => {
			const style = getComputedStyle(element);
			return { opacity: style.opacity, transform: style.transform };
		});
	if (
		finalStyle.opacity !== "1" ||
		!["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(finalStyle.transform)
	) {
		throw new Error(`Page motion did not settle visibly: ${JSON.stringify(finalStyle)}`);
	}

	for (const componentName of ["Button", "Context Menu"]) {
		await page.getByRole("link", { name: componentName, exact: true }).first().click();
		await page.getByRole("heading", { name: componentName, exact: true, level: 1 }).waitFor();
		const componentMotion = await page
			.locator(".docs-page-flow > *")
			.first()
			.evaluate((element) =>
				element
					.getAnimations()
					.some(
						(animation) =>
							"animationName" in animation &&
							animation.animationName === "docs-intro-enter" &&
							animation.effect?.getTiming().duration === 420
					)
			);
		if (!componentMotion) {
			throw new Error(`${componentName} did not receive the keyed route entrance.`);
		}
	}

	const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
	try {
		const reducedPage = await reducedContext.newPage();
		await reducedPage.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
		await reducedPage.getByRole("link", { name: "Get Started", exact: true }).click();
		await reducedPage.getByRole("heading", { name: "Getting Started" }).waitFor();
		const reducedAnimations = await reducedPage
			.locator(".docs-page-flow")
			.evaluate(
				(element) =>
					element
						.getAnimations({ subtree: true })
						.filter(
							(animation) =>
								"animationName" in animation && animation.animationName === "docs-intro-enter"
						).length
			);
		if (reducedAnimations !== 0) {
			throw new Error("Reduced-motion navigation still runs the page entrance.");
		}
	} finally {
		await reducedContext.close();
	}
}

async function installScrollProbe(page) {
	await page.evaluate(() => {
		const original = Element.prototype.scrollIntoView;
		window.__cossScrollCalls = [];
		Element.prototype.scrollIntoView = function scrollIntoView(options) {
			window.__cossScrollCalls.push({
				id: this.id,
				options,
			});
			return original.call(this, options);
		};
	});
}

async function tocNavigation({ browser, page, baseUrl }) {
	await page.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
	await installScrollProbe(page);

	const firstLink = page.getByRole("complementary", { name: "On this page" }).getByRole("link", {
		name: "How It Works",
	});
	const secondLink = page
		.getByRole("complementary", { name: "On this page" })
		.getByRole("link", { name: "Built on Bits UI" });

	await firstLink.click();
	await page.waitForFunction(() => window.location.hash === "#how-it-works");
	await page.waitForFunction(() => {
		const target = document.getElementById("how-it-works");
		if (!target) return false;
		const top = target.getBoundingClientRect().top;
		return top >= 56 && top <= 96;
	});

	await secondLink.click();
	await page.waitForFunction(() => window.location.hash === "#built-on-bits-ui");
	await page.waitForFunction(() => {
		const target = document.getElementById("built-on-bits-ui");
		if (!target) return false;
		const top = target.getBoundingClientRect().top;
		return top >= 56 && top < window.innerHeight;
	});

	const calls = await page.evaluate(() => window.__cossScrollCalls);
	if (
		calls.length < 2 ||
		calls[0].options?.behavior !== "smooth" ||
		calls[1].options?.behavior !== "smooth" ||
		calls.some((call) => call.options?.block !== "start")
	) {
		throw new Error(`TOC did not request minimal smooth scrolling: ${JSON.stringify(calls)}`);
	}

	const historyBefore = await page.evaluate(() => history.length);
	await secondLink.click();
	await page.waitForFunction((expectedLength) => history.length === expectedLength, historyBefore);

	const modifierResult = await secondLink.evaluate((link) => {
		const event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			ctrlKey: true,
			button: 0,
		});
		link.dispatchEvent(event);
		return event.defaultPrevented;
	});
	if (modifierResult) {
		throw new Error("Modified TOC clicks should retain native anchor behavior.");
	}

	const reducedContext = await browser.newContext({
		reducedMotion: "reduce",
		viewport: { width: 1440, height: 900 },
	});
	try {
		const reducedPage = await reducedContext.newPage();
		await reducedPage.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
		await installScrollProbe(reducedPage);
		await reducedPage
			.getByRole("complementary", { name: "On this page" })
			.getByRole("link", { name: "How It Works" })
			.click();
		const reducedCall = await reducedPage.evaluate(() => window.__cossScrollCalls.at(-1));
		if (reducedCall?.options?.behavior !== "auto") {
			throw new Error("Reduced-motion TOC navigation did not request immediate scrolling.");
		}
	} finally {
		await reducedContext.close();
	}
}

async function previewAndCode({ page, baseUrl }) {
	for (const component of [
		{ slug: "button", importName: "Button" },
		{ slug: "number-field", importName: "NumberField" },
		{ slug: "context-menu", importName: "ContextMenu" },
	]) {
		await assertPreviewCodeTabs(page, baseUrl, component);
	}
}

async function codeCopyRail({ page, context, baseUrl }) {
	await context.grantPermissions(["clipboard-read", "clipboard-write"], {
		origin: baseUrl,
	});
	await page.goto(`${baseUrl}/docs/components/context-menu`, { waitUntil: "networkidle" });
	await page.getByRole("tab", { name: "Code" }).click();

	const codeSurface = page.locator('[data-code-preview="context-menu"]');
	const pre = codeSurface.locator("pre");
	const copy = codeSurface.getByRole("button", { name: "Copy code" });
	const rail = codeSurface.locator(".docs-code-copy-rail");
	await pre.waitFor();

	const initial = await pre.evaluate((element) => ({
		clientWidth: element.clientWidth,
		scrollWidth: element.scrollWidth,
	}));
	if (initial.scrollWidth <= initial.clientWidth) {
		throw new Error("The deterministic Context Menu source does not exercise horizontal overflow.");
	}

	const copyBefore = await copy.boundingBox();
	await pre.evaluate((element) => {
		element.scrollLeft = Math.max(1, element.scrollWidth - element.clientWidth);
	});
	await page.waitForFunction((element) => element.scrollLeft > 0, await pre.elementHandle());
	const copyAfter = await copy.boundingBox();
	if (
		!copyBefore ||
		!copyAfter ||
		Math.abs(copyBefore.x - copyAfter.x) > 0.5 ||
		Math.abs(copyBefore.y - copyAfter.y) > 0.5
	) {
		throw new Error("The copy control moved with the horizontally scrolled source.");
	}

	const surfaces = await Promise.all([
		copy.evaluate((element) => getComputedStyle(element).backgroundColor),
		rail.evaluate((element) => getComputedStyle(element).backgroundImage),
	]);
	if (surfaces[0] === "rgba(0, 0, 0, 0)" || surfaces[1] === "none") {
		throw new Error(`The copy button rail is not opaque: ${JSON.stringify(surfaces)}`);
	}

	const expectedSource = await page.evaluate(async (url) => {
		const response = await fetch(url);
		return response.text();
	}, `${baseUrl}/docs/components/context-menu.md`);
	await copy.click();
	const copied = await page.evaluate(() => navigator.clipboard.readText());
	if (!expectedSource.includes(copied) || !copied.includes('from "coss-svelte"')) {
		throw new Error("Copy code did not preserve the full unmodified component source.");
	}

	const overflow = await page.evaluate(() => ({
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth,
	}));
	if (overflow.scrollWidth > overflow.clientWidth) {
		throw new Error("The embedded long line creates document-level horizontal overflow.");
	}
}

export const docsShellCaseHandlers = Object.freeze({
	introductionShell,
	particlesSearch,
	routeMotion,
	tocNavigation,
	previewAndCode,
	codeCopyRail,
});

export async function runDocsShellCases({ browser, baseUrl }) {
	const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
	try {
		const page = await context.newPage();
		for (const [name, handler] of Object.entries(docsShellCaseHandlers)) {
			await handler({ browser, context, page, baseUrl });
			console.log(`browser:docs:${name} passed`);
		}
	} finally {
		await context.close();
	}
}
