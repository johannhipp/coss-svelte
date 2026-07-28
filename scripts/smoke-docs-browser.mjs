import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "apps/www");

function reservePort() {
	return new Promise((resolve, reject) => {
		const server = createServer();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			if (!address || typeof address === "string") {
				reject(new Error("Unable to reserve a local port for browser smoke tests."));
				return;
			}
			server.close((error) => (error ? reject(error) : resolve(address.port)));
		});
	});
}

function delay(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServer(baseUrl, timeoutMilliseconds) {
	const startedAt = Date.now();
	let lastError;

	while (Date.now() - startedAt < timeoutMilliseconds) {
		try {
			const response = await fetch(`${baseUrl}/docs/introduction`);
			if (response.ok) return;
			lastError = new Error(`received ${response.status}`);
		} catch (error) {
			lastError = error;
		}
		await delay(100);
	}

	throw new Error(`Docs server did not start: ${lastError?.message ?? "unknown error"}`);
}

async function stop(child) {
	if (child.exitCode !== null || child.signalCode !== null) return;
	child.kill("SIGTERM");
	await Promise.race([
		new Promise((resolve) => child.once("exit", resolve)),
		delay(5_000).then(() => child.kill("SIGKILL")),
	]);
}

async function blockingAxeViolations(page) {
	const accessibility = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
		.analyze();
	return accessibility.violations.filter((violation) =>
		["critical", "serious"].includes(violation.impact)
	);
}

function assertNoBlockingAxeViolations(violations, label) {
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

async function assertPreviewCodeTabs(page, { slug, importName }) {
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

async function assertNumberField(page) {
	await page.goto(`${baseUrl}/docs/components/number-field`, { waitUntil: "networkidle" });
	const input = page.getByRole("spinbutton", { name: "Quantity" });
	await input.waitFor();
	await input.focus();
	await page.keyboard.press("ArrowUp");
	if ((await input.getAttribute("aria-valuenow")) !== "4") {
		throw new Error("Number Field did not increment from the keyboard.");
	}
	await page.keyboard.press("End");
	if ((await input.getAttribute("aria-valuenow")) !== "99") {
		throw new Error("Number Field did not move to its maximum bound.");
	}
	await page.keyboard.press("ArrowUp");
	if ((await input.getAttribute("aria-valuenow")) !== "99") {
		throw new Error("Number Field exceeded its maximum bound.");
	}
	await page.getByRole("button", { name: "Increase value" }).waitFor({ state: "attached" });
	if (!(await page.getByRole("button", { name: "Increase value" }).isDisabled())) {
		throw new Error("Number Field increment control is not disabled at its maximum.");
	}
}

async function assertContextMenu(page) {
	await page.goto(`${baseUrl}/docs/components/context-menu`, { waitUntil: "networkidle" });
	const trigger = page.getByLabel("Project files context menu");
	await trigger.waitFor();
	await trigger.focus();
	await trigger.click({ button: "right", position: { x: 120, y: 70 } });

	const menu = page.getByRole("menu").first();
	await menu.waitFor();
	const menuBounds = await menu.boundingBox();
	const viewport = page.viewportSize();
	if (
		!menuBounds ||
		!viewport ||
		menuBounds.x + menuBounds.width <= 0 ||
		menuBounds.y + menuBounds.height <= 0 ||
		menuBounds.x >= viewport.width ||
		menuBounds.y >= viewport.height
	) {
		throw new Error("Context Menu popup does not intersect the viewport.");
	}

	const sortTrigger = page.getByRole("menuitem", { name: "Sort by" });
	await sortTrigger.focus();
	await page.keyboard.press("ArrowRight");
	await page.getByRole("menuitemradio", { name: "Date modified" }).waitFor();
	await page.keyboard.press("Escape");
	await page.keyboard.press("Escape");
	if (!(await trigger.evaluate((element) => element === document.activeElement))) {
		throw new Error("Context Menu did not restore focus to its focused target.");
	}

	await trigger.press("Shift+F10");
	await menu.waitFor();
	await page.getByRole("menuitem", { name: /Rename/ }).click();
	await menu.waitFor({ state: "hidden" });
}

async function assertNoPageOverflow(page, slug) {
	await page.goto(`${baseUrl}/docs/components/${slug}`, { waitUntil: "networkidle" });
	const dimensions = await page.evaluate(() => ({
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth,
	}));
	if (dimensions.scrollWidth > dimensions.clientWidth) {
		throw new Error(`${slug} overflows the 390px mobile viewport.`);
	}
}

const port = await reservePort();
const docsServer = spawn(process.execPath, ["build"], {
	cwd: docsRoot,
	env: { ...process.env, PORT: String(port) },
	stdio: "inherit",
});
const baseUrl = `http://127.0.0.1:${port}`;
let browser;

try {
	await waitForServer(baseUrl, 20_000);
	browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

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

	for (const component of [
		{ slug: "button", importName: "Button" },
		{ slug: "number-field", importName: "NumberField" },
		{ slug: "context-menu", importName: "ContextMenu" },
	]) {
		await assertPreviewCodeTabs(page, component);
	}

	await assertNumberField(page);
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "Number Field preview");

	await page.goto(`${baseUrl}/docs/components/context-menu`, { waitUntil: "networkidle" });
	const contextTrigger = page.getByLabel("Project files context menu");
	await contextTrigger.click({ button: "right" });
	await page.getByRole("menu").first().waitFor();
	assertNoBlockingAxeViolations(await blockingAxeViolations(page), "Open Context Menu");
	await page.keyboard.press("Escape");
	await assertContextMenu(page);

	const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
	const mobilePage = await mobileContext.newPage();
	await assertNoPageOverflow(mobilePage, "number-field");
	await assertNoPageOverflow(mobilePage, "context-menu");
	const mobileTrigger = mobilePage.getByLabel("Project files context menu");
	await mobileTrigger.click({ button: "right" });
	await mobilePage.getByRole("menu").first().waitFor();
	const mobileMenuBounds = await mobilePage.getByRole("menu").first().boundingBox();
	if (
		!mobileMenuBounds ||
		mobileMenuBounds.x < 0 ||
		mobileMenuBounds.y < 0 ||
		mobileMenuBounds.x + mobileMenuBounds.width > 390 ||
		mobileMenuBounds.y + mobileMenuBounds.height > 844
	) {
		throw new Error("Context Menu popup escapes the mobile viewport.");
	}
	await mobileContext.close();

	const reducedMotionContext = await browser.newContext({ reducedMotion: "reduce" });
	const reducedMotionPage = await reducedMotionContext.newPage();
	await assertPreviewCodeTabs(reducedMotionPage, {
		slug: "context-menu",
		importName: "ContextMenu",
	});
	await reducedMotionContext.close();

	console.log(
		"Docs browser, Preview/Code, Number Field, Context Menu, mobile, reduced-motion, and accessibility checks passed."
	);
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	await browser?.close();
	await stop(docsServer);
}
