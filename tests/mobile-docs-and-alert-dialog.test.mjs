import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { readThemeSource } from "./theme-source.mjs";

const headerPath = "apps/www/src/lib/components/docs/docs-header.svelte";
const shellPath = "apps/www/src/lib/components/docs/docs-shell.svelte";
const mobileMenuPath = "apps/www/src/lib/components/docs/docs-mobile-menu.svelte";
const sidebarPath = "apps/www/src/lib/components/docs/docs-sidebar.svelte";
const alertDialogPath = "packages/coss-svelte/src/components/AlertDialog.svelte";

test("mobile docs trigger uses a two-line burger icon", async () => {
	const header = await readFile(headerPath, "utf8");

	assert.doesNotMatch(
		header,
		/\bMenu\b/,
		"header should not import or render the three-line lucide menu"
	);
	assert.match(
		header,
		/docs-menu-toggle-icon/,
		"header should render the custom two-line menu icon"
	);
	assert.equal(
		(header.match(/class="h-0\.5 w-full rounded-full bg-current"/g) ?? []).length,
		2,
		"mobile menu icon should render exactly two bars"
	);
});

test("header controls use the clickable cursor", async () => {
	const header = await readFile(headerPath, "utf8");
	const buttons = [...header.matchAll(/<button\b[\s\S]*?<\/button>/g)].map(([source]) => source);
	const menuButton = buttons.find((button) => button.includes('aria-label="Open menu"'));
	const themeButton = buttons.find((button) => button.includes("aria-label={darkMode"));

	assert.ok(menuButton, "header should render an open-menu button");
	assert.ok(themeButton, "header should render a theme toggle button");
	assert.match(menuButton, /\bcursor-pointer\b/);
	assert.match(themeButton, /\bcursor-pointer\b/);
});

test("mobile docs menu slides in quickly from the left and uses mobile sidebar styling", async () => {
	const [shell, mobileMenu] = await Promise.all([
		readFile(shellPath, "utf8"),
		readFile(mobileMenuPath, "utf8"),
	]);

	assert.match(shell, /DocsMobileMenu/, "docs shell should render the shared mobile menu");
	assert.match(
		mobileMenu,
		/from "svelte\/transition"/,
		"mobile menu should use Svelte transitions"
	);
	assert.match(mobileMenu, /from "svelte\/easing"/, "mobile menu should use an easing curve");
	assert.match(mobileMenu, /transition:fade/, "mobile backdrop should fade in and out");
	assert.match(mobileMenu, /transition:fly/, "mobile drawer should fly in from the left");
	assert.match(mobileMenu, /x:\s*-[0-9]+/, "mobile drawer should enter from a negative x offset");
	assert.match(mobileMenu, /duration:\s*1[0-9]{2}/, "mobile drawer should stay fast");
	assert.match(
		mobileMenu,
		/docs-mobile-menu-scroll/,
		"mobile drawer should keep its own scroll behavior"
	);
	assert.match(
		mobileMenu,
		/variant="mobile"/,
		"mobile drawer should render the mobile sidebar variant"
	);
});

test("docs sidebar exposes a larger mobile navigation variant", async () => {
	const [sidebar, mobileMenu] = await Promise.all([
		readFile(sidebarPath, "utf8"),
		readFile(mobileMenuPath, "utf8"),
	]);

	assert.match(sidebar, /type SidebarVariant = "desktop" \| "mobile"/);
	assert.match(sidebar, /variant = "desktop"/);
	assert.match(sidebar, /variant === "mobile"/);
	assert.match(sidebar, /text-base/, "mobile links should use the compact COSS menu scale");
	assert.doesNotMatch(sidebar, /text-\[1\.3rem\]/, "mobile links should not use oversized type");
	assert.match(sidebar, /ps-0/, "mobile links should align with their section labels");
	assert.match(mobileMenu, /text-xl leading-tight/, "primary mobile links should use compact type");
	assert.doesNotMatch(
		mobileMenu,
		/text-\[1\.7rem\]|text-\[2rem\]/,
		"mobile menu should not use oversized type"
	);
});

test("alert dialog renders a separated muted footer action band", async () => {
	const [theme, alertDialog] = await Promise.all([
		readThemeSource(),
		readFile(alertDialogPath, "utf8"),
	]);

	assert.match(theme, /\.cn-alert-dialog\s*{[^}]*padding:\s*0;/s);
	assert.match(theme, /\.cn-alert-dialog-header\s*{[^}]*padding:\s*1\.5rem/s);
	assert.match(
		theme,
		/\.cn-alert-dialog-footer\s*{[^}]*border-top:\s*1px solid var\(--cn-border\)/s
	);
	assert.match(theme, /\.cn-alert-dialog-footer\s*{[^}]*background:\s*color-mix/s);
	assert.match(theme, /\.cn-alert-dialog-footer\s*{[^}]*justify-content:\s*flex-end/s);
	assert.match(alertDialog, /cn-alert-dialog-header/);
	assert.match(alertDialog, /cn-alert-dialog-footer/);
});
