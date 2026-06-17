import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { componentDocs } from "../apps/www/src/lib/docs/navigation.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const upstreamRoot = join(root, ".cache/upstream/coss");
const defaultOutDir = join(root, ".cache/visual-parity/passes/interactive-open-states");
const defaultLocalBaseUrl = "http://127.0.0.1:5175";
const defaultCossBaseUrl = "https://coss.com/ui";
const defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewport = { height: 1200, width: 1440 };

const interactionConfigs = {
	"alert-dialog": { kind: "clickText", text: "Delete Account" },
	autocomplete: { kind: "focusPlaceholder", text: "Search items", type: "a" },
	combobox: { kind: "focusPlaceholder", text: "Select a item", type: "a" },
	command: {
		expectSelector: "[data-slot='command-dialog-popup']",
		kind: "clickText",
		text: "Open Command Palette",
	},
	"date-picker": { kind: "clickText", text: "Pick a date" },
	dialog: { kind: "clickText", text: "Open Dialog" },
	drawer: { kind: "clickText", text: "Open drawer" },
	menu: { kind: "clickText", text: "Open menu" },
	popover: { kind: "clickText", text: "Open Popover" },
	"preview-card": { kind: "hoverText", text: "coss.com/ui", minY: 220 },
	select: { kind: "clickSlot", slot: "select-trigger" },
	sheet: { kind: "clickText", text: "Open Sheet" },
	tooltip: { expectText: "Helpful hint", kind: "hoverText", text: "Hover me" },
};

function parseArgs(argv) {
	const options = {
		chromePath: process.env.CHROME_PATH || defaultChromePath,
		cossBaseUrl: process.env.COSS_BASE_URL || defaultCossBaseUrl,
		localBaseUrl: process.env.LOCAL_BASE_URL || defaultLocalBaseUrl,
		outDir: defaultOutDir,
		slugs: Object.keys(interactionConfigs),
		timeoutMs: Number(process.env.INTERACTIVE_SCREENSHOT_TIMEOUT_MS ?? 45_000),
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		const next = argv[index + 1];

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

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function sourcePaths(slug) {
	const docsPath = join(upstreamRoot, "apps/ui/content/docs/components", `${slug}.mdx`);
	const registryPath = join(upstreamRoot, "apps/ui/registry/default/ui", `${slug}.tsx`);
	const particleDir = join(upstreamRoot, "apps/ui/registry/default/particles");
	const particles = existsSync(particleDir) ? componentParticles(slug, particleDir) : [];

	return {
		docsPath,
		docsSource: existsSync(docsPath),
		particles,
		registryPath,
		registrySource: existsSync(registryPath),
		sourceMapped: existsSync(docsPath) && (existsSync(registryPath) || particles.length > 0),
	};
}

function componentParticles(slug, particleDir) {
	const ls = spawnSync(
		"find",
		[particleDir, "-maxdepth", "1", "-type", "f", "-name", `p-${slug}-*.tsx`],
		{
			encoding: "utf8",
		}
	);

	if (ls.status !== 0) {
		return [];
	}

	return ls.stdout
		.trim()
		.split("\n")
		.filter(Boolean)
		.sort()
		.map((file) => relative(root, file));
}

function sourceNotes(sources) {
	const blocking = [];
	const informational = [];

	if (!sources.docsSource) {
		blocking.push("upstream docs source missing");
	}

	if (!sources.registrySource) {
		if (sources.particles.length) {
			informational.push(
				`standalone UI source absent; composition source mapped via ${sources.particles.length} particle${sources.particles.length === 1 ? "" : "s"}`
			);
		} else {
			blocking.push("upstream registry source missing");
		}
	}

	return {
		blocking,
		informational,
	};
}

function waitForProcessExit(process) {
	return new Promise((resolve) => {
		process.once("exit", resolve);
	});
}

async function waitForTarget(port, timeoutMs) {
	const startedAt = Date.now();
	let lastError;

	while (Date.now() - startedAt < timeoutMs) {
		try {
			const response = await fetch(`http://127.0.0.1:${port}/json/list`);
			const targets = await response.json();
			const target = targets.find((entry) => entry.type === "page" && entry.webSocketDebuggerUrl);
			if (target) return target;
		} catch (error) {
			lastError = error;
		}

		await delay(100);
	}

	throw new Error(`Timed out waiting for Chrome target: ${lastError?.message ?? "no target"}`);
}

function createCdpClient(webSocketUrl) {
	const socket = new WebSocket(webSocketUrl);
	let nextId = 1;
	const pending = new Map();

	socket.addEventListener("message", (event) => {
		const message = JSON.parse(event.data);
		if (!message.id) return;

		const request = pending.get(message.id);
		if (!request) return;

		pending.delete(message.id);
		if (message.error) {
			request.reject(new Error(message.error.message));
		} else {
			request.resolve(message.result);
		}
	});

	return {
		async close() {
			socket.close();
		},
		async opened() {
			if (socket.readyState === WebSocket.OPEN) return;
			await new Promise((resolve, reject) => {
				socket.addEventListener("open", resolve, { once: true });
				socket.addEventListener("error", reject, { once: true });
			});
		},
		send(method, params = {}) {
			const id = nextId++;
			const payload = JSON.stringify({ id, method, params });
			socket.send(payload);
			return new Promise((resolve, reject) => {
				pending.set(id, { reject, resolve });
			});
		},
	};
}

async function waitForLoad(client, timeoutMs) {
	const startedAt = Date.now();

	while (Date.now() - startedAt < timeoutMs) {
		const result = await client.send("Runtime.evaluate", {
			expression: "document.readyState",
			returnByValue: true,
		});
		if (result.result?.value === "complete") return;
		await delay(100);
	}

	throw new Error("Timed out waiting for document.readyState=complete");
}

function interactionExpression(config) {
	return `(() => {
		const config = ${JSON.stringify(config)};
		const minY = config.minY ?? 120;
		const maxY = config.maxY ?? window.innerHeight;
		const minX = config.minX ?? 220;
		const visible = (element) => {
			if (!element) return false;
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && rect.bottom >= minY && rect.top <= maxY && rect.right >= minX && style.visibility !== "hidden" && style.display !== "none";
		};
		const score = (element) => {
			const rect = element.getBoundingClientRect();
			const centerPenalty = Math.abs((rect.left + rect.right) / 2 - window.innerWidth / 2);
			const yPenalty = Math.abs((rect.top + rect.bottom) / 2 - 420);
			return centerPenalty + yPenalty;
		};
		const textOf = (element) => [
			element.textContent,
			element.getAttribute("aria-label"),
			element.getAttribute("placeholder"),
			element.getAttribute("title"),
		].filter(Boolean).join(" ").trim();
		const matchesText = (element, text) => textOf(element).toLowerCase().includes(text.toLowerCase());
		const candidates = (selector) => [...document.querySelectorAll(selector)].filter(visible).sort((a, b) => score(a) - score(b));
		const byText = (text) => candidates("button, a, input, textarea, [role='button'], [role='combobox'], [data-slot]").find((element) => matchesText(element, text));
		const byPlaceholder = (text) => candidates("input, textarea").find((element) => (element.getAttribute("placeholder") ?? "").toLowerCase().includes(text.toLowerCase()));
		const bySlot = (slot) => candidates('[data-slot="' + slot + '"]').at(0);
		const point = (element) => {
			const rect = element.getBoundingClientRect();
			return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
		};

		let element;
		if (config.kind === "clickText" || config.kind === "hoverText") {
			element = byText(config.text);
		} else if (config.kind === "focusPlaceholder") {
			element = byPlaceholder(config.text);
		} else if (config.kind === "clickSlot") {
			element = bySlot(config.slot);
		}

		if (!element) {
			return { ok: false, reason: "target not found", config };
		}

		element.scrollIntoView({ block: "center", inline: "center" });
		const rect = element.getBoundingClientRect();
		return {
			ok: true,
			rect: {
				height: rect.height,
				width: rect.width,
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			},
			tag: element.tagName,
			text: textOf(element),
		};
	})()`;
}

function activateExpression(config) {
	return `(() => {
		const config = ${JSON.stringify(config)};
		const minY = config.minY ?? 120;
		const maxY = config.maxY ?? window.innerHeight;
		const minX = config.minX ?? 220;
		const visible = (element) => {
			if (!element) return false;
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && rect.bottom >= minY && rect.top <= maxY && rect.right >= minX && style.visibility !== "hidden" && style.display !== "none";
		};
		const score = (element) => {
			const rect = element.getBoundingClientRect();
			const centerPenalty = Math.abs((rect.left + rect.right) / 2 - window.innerWidth / 2);
			const yPenalty = Math.abs((rect.top + rect.bottom) / 2 - 420);
			return centerPenalty + yPenalty;
		};
		const textOf = (element) => [
			element.textContent,
			element.getAttribute("aria-label"),
			element.getAttribute("placeholder"),
			element.getAttribute("title"),
		].filter(Boolean).join(" ").trim();
		const candidates = [...document.querySelectorAll("button, a, input, textarea, [role='button'], [role='combobox'], [data-slot]")]
			.filter(visible)
			.sort((a, b) => score(a) - score(b));
		const element = candidates.find((candidate) => textOf(candidate).toLowerCase().includes(config.text.toLowerCase()));
		if (!element) return { ok: false, reason: "fallback target not found" };
		element.focus?.();
		if (config.kind !== "hoverText") element.click?.();
		return { ok: true, text: textOf(element) };
	})()`;
}

async function pageHasExpectedState(client, config) {
	if (config.expectSelector) {
		const selectorResult = await client.send("Runtime.evaluate", {
			expression: `(() => {
				const element = document.querySelector(${JSON.stringify(config.expectSelector)});
				if (!element) return false;
				const rect = element.getBoundingClientRect();
				const style = getComputedStyle(element);
				const state = element.getAttribute("data-state");
				return (state === null || state === "open") && rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) !== 0;
			})()`,
			returnByValue: true,
		});

		if (selectorResult.result?.value) return true;
	}

	if (!config.expectText) return true;
	const result = await client.send("Runtime.evaluate", {
		expression: `(() => {
			const expected = ${JSON.stringify(config.expectText.toLowerCase())};
			const visible = (element) => {
				const rect = element.getBoundingClientRect();
				const style = getComputedStyle(element);
				return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth && style.visibility !== "hidden" && style.display !== "none";
			};
			return [...document.querySelectorAll("body *")].some((element) => visible(element) && (element.textContent ?? "").toLowerCase().includes(expected));
		})()`,
		returnByValue: true,
	});

	return Boolean(result.result?.value);
}

async function performInteraction(client, config) {
	const target = await client.send("Runtime.evaluate", {
		expression: interactionExpression(config),
		returnByValue: true,
	});
	const value = target.result?.value;

	if (!value?.ok) {
		throw new Error(value?.reason ?? "interaction target not found");
	}

	const { x, y } = value.rect;

	if (config.kind === "hoverText") {
		await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
		await delay(1_800);
		if (!(await pageHasExpectedState(client, config))) {
			await client.send("Runtime.evaluate", {
				expression: activateExpression(config),
				returnByValue: true,
			});
			await delay(1_800);
		}
		if (!(await pageHasExpectedState(client, config))) {
			throw new Error(`expected open state was not visible for ${config.kind}:${config.text}`);
		}
		return value;
	}

	await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
	await client.send("Input.dispatchMouseEvent", {
		button: "left",
		clickCount: 1,
		type: "mousePressed",
		x,
		y,
	});
	await client.send("Input.dispatchMouseEvent", {
		button: "left",
		clickCount: 1,
		type: "mouseReleased",
		x,
		y,
	});

	if (config.kind === "focusPlaceholder" && config.type) {
		await delay(150);
		for (const char of config.type) {
			await client.send("Input.dispatchKeyEvent", { text: char, type: "char" });
		}
	}

	await delay(900);
	if (!(await pageHasExpectedState(client, config))) {
		await client.send("Runtime.evaluate", {
			expression: activateExpression(config),
			returnByValue: true,
		});
		await delay(900);
	}
	if (!(await pageHasExpectedState(client, config))) {
		throw new Error(`expected open state was not visible for ${config.kind}:${config.text}`);
	}

	return value;
}

async function captureInteractiveScreenshot({ chromePath, outputPath, timeoutMs, url, config }) {
	const profileDir = await mkdtemp(join(tmpdir(), "coss-interactive-"));
	const port = 9_300 + Math.floor(Math.random() * 400);
	const chrome = spawn(chromePath, [
		"--headless=new",
		"--disable-gpu",
		"--hide-scrollbars",
		"--no-first-run",
		"--run-all-compositor-stages-before-draw",
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profileDir}`,
		`--window-size=${viewport.width},${viewport.height}`,
		url,
	]);

	let stderr = "";
	chrome.stderr.on("data", (chunk) => {
		stderr += chunk.toString();
	});

	let client;

	try {
		const target = await waitForTarget(port, timeoutMs);
		client = createCdpClient(target.webSocketDebuggerUrl);
		await client.opened();
		await client.send("Page.enable");
		await client.send("Runtime.enable");
		await client.send("Input.setIgnoreInputEvents", { ignore: false });
		await waitForLoad(client, timeoutMs);
		await delay(1_000);
		const interaction = await performInteraction(client, config);
		const screenshot = await client.send("Page.captureScreenshot", {
			captureBeyondViewport: false,
			format: "png",
			fromSurface: true,
		});
		await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));

		return {
			interaction,
			ok: true,
			stderr: stderr.trim(),
		};
	} catch (error) {
		return {
			error: error.message,
			ok: false,
			stderr: stderr.trim(),
		};
	} finally {
		await client?.close();
		chrome.kill("SIGTERM");
		await Promise.race([waitForProcessExit(chrome), delay(2_000)]);
		await rm(profileDir, { force: true, recursive: true });
	}
}

function markdownTable(rows) {
	return [
		"| Component | Interaction | Local route | COSS route | Local screenshot | COSS screenshot | Notes |",
		"| --- | --- | --- | --- | --- | --- | --- |",
		...rows.map((row) =>
			[
				row.title,
				`\`${row.interactionLabel}\``,
				`[local](${row.localUrl})`,
				`[coss](${row.cossUrl})`,
				row.localScreenshot ? `[png](${row.localScreenshot})` : "not captured",
				row.cossScreenshot ? `[png](${row.cossScreenshot})` : "not captured",
				row.notes.length ? row.notes.join("; ") : "open-state screenshots captured",
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
				row.notes.length ? row.notes.join("; ") : "Open-state screenshots captured.",
			]
				.join(" | ")
				.replace(/^|/, "| ")
		),
	].join("\n");
}

async function run() {
	const options = parseArgs(process.argv.slice(2));

	if (!existsSync(options.chromePath)) {
		throw new Error(`Chrome executable not found at ${options.chromePath}`);
	}

	const selectedComponents = options.slugs.map((slug) => {
		const component = componentDocs.find((entry) => entry.slug === slug);
		if (!component) throw new Error(`Unknown component slug: ${slug}`);
		if (!interactionConfigs[slug]) throw new Error(`No interaction config for slug: ${slug}`);
		return component;
	});

	const screenshotDir = join(options.outDir, "screenshots");
	await mkdir(screenshotDir, { recursive: true });

	const rows = [];

	for (const component of selectedComponents) {
		const config = interactionConfigs[component.slug];
		const sources = sourcePaths(component.slug);
		const localUrl = `${options.localBaseUrl}/docs/components/${component.slug}`;
		const cossUrl = `${options.cossBaseUrl}/docs/components/${component.slug}`;
		const localScreenshotPath = join(screenshotDir, `${component.slug}-local-open.png`);
		const cossScreenshotPath = join(screenshotDir, `${component.slug}-coss-open.png`);
		const notes = [];
		let localScreenshot = "";
		let cossScreenshot = "";
		const sourceStatus = sourceNotes(sources);

		const localResult = await captureInteractiveScreenshot({
			chromePath: options.chromePath,
			config,
			outputPath: localScreenshotPath,
			timeoutMs: options.timeoutMs,
			url: localUrl,
		});
		const cossResult = await captureInteractiveScreenshot({
			chromePath: options.chromePath,
			config,
			outputPath: cossScreenshotPath,
			timeoutMs: options.timeoutMs,
			url: cossUrl,
		});

		if (localResult.ok) {
			localScreenshot = relative(options.outDir, localScreenshotPath);
		} else {
			notes.push(`local interaction failed: ${localResult.error}`);
		}

		if (cossResult.ok) {
			cossScreenshot = relative(options.outDir, cossScreenshotPath);
		} else {
			notes.push(`COSS interaction failed: ${cossResult.error}`);
		}

		notes.push(...sourceStatus.informational);

		rows.push({
			...component,
			cossScreenshot,
			cossUrl,
			evidenceStatus:
				sourceStatus.blocking.length || notes.some((note) => note.includes("failed"))
					? "incomplete"
					: "captured",
			interactionLabel:
				config.kind === "clickText" ||
				config.kind === "hoverText" ||
				config.kind === "focusPlaceholder"
					? `${config.kind}:${config.text}`
					: `${config.kind}:${config.slot}`,
			localScreenshot,
			localUrl,
			notes: [...sourceStatus.blocking, ...notes],
		});
	}

	const manifest = [
		"# Interactive Visual Parity Evidence Manifest",
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
		"## Interaction And Screenshot Map",
		"",
		markdownTable(rows),
		"",
		"## How To Regenerate",
		"",
		"```bash",
		"node scripts/capture-interactive-visual-parity-evidence.mjs",
		"node scripts/capture-interactive-visual-parity-evidence.mjs -- --slugs dialog,menu,tooltip",
		"```",
		"",
	].join("\n");

	await writeFile(join(options.outDir, "manifest.md"), manifest);
	console.log(
		`Captured interactive visual parity evidence for ${rows.length} components in ${relative(root, options.outDir)}.`
	);
}

await run();
