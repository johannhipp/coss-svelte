import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { componentDocs } from "../apps/www/src/lib/docs/navigation.js";
import { sourceNotes, sourcePaths } from "./visual-parity-source.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutDir = join(root, ".cache/visual-parity");
const defaultLocalBaseUrl = "http://127.0.0.1:5175";
const defaultCossBaseUrl = "https://coss.com/ui";
const defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function parseArgs(argv) {
	const options = {
		chromePath: process.env.CHROME_PATH || defaultChromePath,
		cossBaseUrl: process.env.COSS_BASE_URL || defaultCossBaseUrl,
		localBaseUrl: process.env.LOCAL_BASE_URL || defaultLocalBaseUrl,
		outDir: defaultOutDir,
		skipScreenshots: false,
		slugs: [],
		timeoutMs: Number(process.env.SCREENSHOT_TIMEOUT_MS ?? 30_000),
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		const next = argv[index + 1];

		if (arg === "--skip-screenshots") {
			options.skipScreenshots = true;
			continue;
		}

		if (arg === "--slugs" && next) {
			options.slugs = next
				.split(",")
				.map((slug) => slug.trim())
				.filter(Boolean);
			index += 1;
			continue;
		}

		if (arg === "--out-dir" && next) {
			options.outDir = join(root, next);
			index += 1;
			continue;
		}

		if (arg === "--local-base-url" && next) {
			options.localBaseUrl = next.replace(/\/$/, "");
			index += 1;
			continue;
		}

		if (arg === "--coss-base-url" && next) {
			options.cossBaseUrl = next.replace(/\/$/, "");
			index += 1;
			continue;
		}

		if (arg === "--chrome-path" && next) {
			options.chromePath = next;
			index += 1;
			continue;
		}

		if (arg === "--timeout-ms" && next) {
			options.timeoutMs = Number(next);
			index += 1;
		}
	}

	return options;
}

function captureScreenshot({ chromePath, outputPath, timeoutMs, url }) {
	const result = spawnSync(
		chromePath,
		[
			"--headless=new",
			"--disable-gpu",
			"--hide-scrollbars",
			"--no-first-run",
			"--run-all-compositor-stages-before-draw",
			"--virtual-time-budget=2500",
			"--window-size=1440,1200",
			`--screenshot=${outputPath}`,
			url,
		],
		{
			encoding: "utf8",
			timeout: timeoutMs,
		}
	);

	return {
		error: result.error?.message,
		ok: result.status === 0 && existsSync(outputPath),
		stderr: result.stderr.trim(),
		stdout: result.stdout.trim(),
		status: result.status,
	};
}

function markdownTable(rows) {
	return [
		"| Component | Local route | COSS route | Upstream docs | Upstream UI source | Particles | Local screenshot | COSS screenshot |",
		"| --- | --- | --- | --- | --- | ---: | --- | --- |",
		...rows.map((row) =>
			[
				row.title,
				`[local](${row.localUrl})`,
				`[coss](${row.cossUrl})`,
				row.docsSource ? `\`${relative(root, row.docsPath)}\`` : "missing",
				row.registrySource
					? `\`${relative(root, row.registryPath)}\``
					: row.particles.length
						? `composition: \`${row.particles[0]}\``
						: "missing",
				String(row.particles.length),
				row.localScreenshot ? `[png](${row.localScreenshot})` : "not captured",
				row.cossScreenshot ? `[png](${row.cossScreenshot})` : "not captured",
			]
				.join(" | ")
				.replace(/^|/, "| ")
		),
	].join("\n");
}

function statusTable(rows) {
	return [
		"| Component | Evidence status | Notes |",
		"| --- | --- | --- |",
		...rows.map((row) =>
			[
				row.title,
				row.evidenceStatus,
				row.notes.length ? row.notes.join("; ") : "Screenshot/source evidence collected.",
			]
				.join(" | ")
				.replace(/^|/, "| ")
		),
	].join("\n");
}

async function run() {
	const options = parseArgs(process.argv.slice(2));

	const selectedComponents = options.slugs.length
		? componentDocs.filter((component) => options.slugs.includes(component.slug))
		: componentDocs;
	const unknownSlugs = options.slugs.filter(
		(slug) => !componentDocs.some((component) => component.slug === slug)
	);

	if (unknownSlugs.length) {
		throw new Error(`Unknown component slugs: ${unknownSlugs.join(", ")}`);
	}

	const screenshotDir = join(options.outDir, "screenshots");
	await mkdir(screenshotDir, { recursive: true });

	const rows = [];

	for (const component of selectedComponents) {
		const sources = sourcePaths(root, component.slug);
		const localUrl = `${options.localBaseUrl}/docs/components/${component.slug}`;
		const cossUrl = `${options.cossBaseUrl}/docs/components/${component.slug}`;
		const notes = [];
		const screenshotNotes = [];

		let localScreenshot = "";
		let cossScreenshot = "";

		if (!options.skipScreenshots) {
			if (!existsSync(options.chromePath)) {
				throw new Error(`Chrome executable not found at ${options.chromePath}`);
			}

			const localScreenshotPath = join(screenshotDir, `${component.slug}-local.png`);
			const cossScreenshotPath = join(screenshotDir, `${component.slug}-coss.png`);
			const localResult = captureScreenshot({
				chromePath: options.chromePath,
				outputPath: localScreenshotPath,
				timeoutMs: options.timeoutMs,
				url: localUrl,
			});
			const cossResult = captureScreenshot({
				chromePath: options.chromePath,
				outputPath: cossScreenshotPath,
				timeoutMs: options.timeoutMs,
				url: cossUrl,
			});

			if (localResult.ok) {
				localScreenshot = relative(options.outDir, localScreenshotPath);
			} else {
				screenshotNotes.push(
					`local screenshot failed (${localResult.error ?? localResult.status})`
				);
			}

			if (cossResult.ok) {
				cossScreenshot = relative(options.outDir, cossScreenshotPath);
			} else {
				screenshotNotes.push(`COSS screenshot failed (${cossResult.error ?? cossResult.status})`);
			}
		} else {
			screenshotNotes.push("screenshots intentionally skipped");
		}

		const sourceStatus = sourceNotes(sources);
		notes.push(...sourceStatus.informational);

		rows.push({
			...component,
			...sources,
			cossScreenshot,
			cossUrl,
			evidenceStatus:
				sourceStatus.blocking.length === 0 && screenshotNotes.length === 0
					? "captured"
					: sourceStatus.blocking.length === 0
						? "source mapped"
						: "incomplete",
			localScreenshot,
			localUrl,
			notes: [...sourceStatus.blocking, ...notes, ...screenshotNotes],
		});
	}

	const manifest = [
		"# Visual Parity Evidence Manifest",
		"",
		`Generated: ${new Date().toISOString()}`,
		"",
		`Local base URL: ${options.localBaseUrl}`,
		`COSS base URL: ${options.cossBaseUrl}`,
		`Components in this pass: ${rows.length}`,
		"",
		"## Evidence Status",
		"",
		statusTable(rows),
		"",
		"## Source And Screenshot Map",
		"",
		markdownTable(rows),
		"",
		"## How To Regenerate",
		"",
		"```bash",
		"pnpm parity:evidence",
		"pnpm parity:evidence -- --slugs button,input,tabs",
		"pnpm parity:evidence -- --timeout-ms 60000",
		"```",
		"",
	].join("\n");

	const manifestPath = join(options.outDir, "manifest.md");
	await writeFile(manifestPath, manifest);

	console.log(
		`Captured visual parity evidence for ${rows.length} components in ${relative(root, options.outDir)}.`
	);
}

await run();
