import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "docs/scope/source/00-component-index.md");
const particlePath = path.join(root, "docs/scope/source/90-particle-coverage.md");
const outPath = path.join(root, "apps/scope-catalog/src/lib/cossCatalog.ts");
const checkMode = process.argv.includes("--check");

function slugify(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function parseIndex() {
	const markdown = fs.readFileSync(indexPath, "utf8");
	const rows = [];

	for (const line of markdown.split(/\r?\n/)) {
		const parts = line
			.slice(1, -1)
			.split("|")
			.map((part) => part.trim());

		if (
			!line.startsWith("| ") ||
			parts.length < 6 ||
			parts[0] === "Component" ||
			parts.every((part) => /^:?-{2,}:?$/.test(part))
		) {
			continue;
		}

		const docsMatch = parts[5]?.match(/\(([^)]+)\)/);
		rows.push({
			name: parts[0],
			slug: slugify(parts[0]),
			category: parts[1],
			scope: parts[2],
			particleCount: Number(parts[3]),
			docsUrl: docsMatch?.[1] ?? "",
		});
	}

	return rows;
}

function parseParticles() {
	const markdown = fs.readFileSync(particlePath, "utf8");
	const particles = new Map();
	let current = "";

	for (const line of markdown.split(/\r?\n/)) {
		const heading = line.match(/^##\s+(.+)/);
		if (heading) {
			current = slugify(heading[1]);
			particles.set(current, []);
			continue;
		}

		const item = line.match(/^- `([^`]+)`: (.+?) \(\[JSON\]\(([^)]+)\)\)/);
		if (item && current) {
			particles.get(current).push({
				id: item[1],
				title: item[2],
				url: item[3],
			});
		}
	}

	return particles;
}

function buildCatalogGroups() {
	const components = parseIndex();
	const particles = parseParticles();

	return [...new Set(components.map((component) => component.category))].map((category) => ({
		category,
		components: components
			.filter((component) => component.category === category)
			.map((component) => ({
				...component,
				particles: particles.get(component.slug) ?? [],
			})),
	}));
}

function buildCatalogSource(groups) {
	return `export type ParticleExample = {
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

export const catalogGroups = ${JSON.stringify(groups, null, 2)} satisfies CatalogGroup[];

export const catalogComponents = catalogGroups.flatMap((group) => group.components);
`;
}

function formatFile(file) {
	execFileSync("pnpm", ["exec", "biome", "format", "--write", file], {
		cwd: root,
		stdio: "pipe",
	});
}

function formatSource(source) {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "coss-scope-catalog-"));
	const tempPath = path.join(tempDir, "cossCatalog.ts");

	try {
		fs.writeFileSync(tempPath, source, "utf8");
		formatFile(tempPath);
		return fs.readFileSync(tempPath, "utf8");
	} finally {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
}

const groups = buildCatalogGroups();
const source = buildCatalogSource(groups);

if (checkMode) {
	const formattedSource = formatSource(source);
	const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
	if (current !== formattedSource) {
		console.error(
			`${path.relative(root, outPath)} is out of date. Run pnpm --filter @coss-svelte/scope-catalog generate:catalog.`
		);
		process.exitCode = 1;
	} else {
		console.log("Catalog is up to date");
	}
} else {
	fs.mkdirSync(path.dirname(outPath), { recursive: true });
	fs.writeFileSync(outPath, source, "utf8");
	formatFile(outPath);
	console.log(
		`Wrote ${groups.flatMap((group) => group.components).length} components to ${path.relative(root, outPath)}`
	);
}
