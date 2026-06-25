import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const headerPath = "apps/www/src/lib/components/docs/docs-header.svelte";
const shellPath = "apps/www/src/lib/components/docs/docs-shell.svelte";
const sidebarPath = "apps/www/src/lib/components/docs/docs-sidebar.svelte";
const themePath = "packages/theme/src/style-coss.css";
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

test("mobile docs menu slides in quickly from the left and uses mobile sidebar styling", async () => {
	const shell = await readFile(shellPath, "utf8");

	assert.match(shell, /from "svelte\/transition"/, "docs shell should use Svelte transitions");
	assert.match(shell, /from "svelte\/easing"/, "docs shell should use an easing curve");
	assert.match(shell, /transition:fade/, "mobile backdrop should fade in and out");
	assert.match(shell, /transition:fly/, "mobile drawer should fly in from the left");
	assert.match(shell, /x:\s*-[0-9]+/, "mobile drawer should enter from a negative x offset");
	assert.match(shell, /duration:\s*1[0-9]{2}/, "mobile drawer animation should stay fast");
	assert.match(
		shell,
		/docs-mobile-menu-scroll/,
		"mobile drawer should keep its own scroll behavior"
	);
	assert.match(shell, /variant="mobile"/, "mobile drawer should render the mobile sidebar variant");
});

test("docs sidebar exposes a larger mobile navigation variant", async () => {
	const sidebar = await readFile(sidebarPath, "utf8");

	assert.match(sidebar, /type SidebarVariant = "desktop" \| "mobile"/);
	assert.match(sidebar, /variant = "desktop"/);
	assert.match(sidebar, /variant === "mobile"/);
	assert.match(sidebar, /text-\[1\.3rem\]/, "mobile links should match the larger COSS menu scale");
	assert.match(sidebar, /ps-7/, "mobile links should be indented under section labels");
});

test("alert dialog renders a separated muted footer action band", async () => {
	const [theme, alertDialog] = await Promise.all([
		readFile(themePath, "utf8"),
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
