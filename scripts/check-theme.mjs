import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const files = ["style-coss.css", "tokens.css", "components.css"];
const sources = await Promise.all(
	files.map((file) => readFile(join(root, "packages/theme/src", file), "utf8"))
);
const source = sources.join("\n");
const forbidden = [/@source/, /\.docs-/, /^\s*(?:body|\*)\s*\{/m];
const violations = forbidden.filter((pattern) => pattern.test(source));

if (violations.length > 0) {
	console.error("Consumer theme contains app-only CSS markers.");
	process.exitCode = 1;
} else {
	console.log("Consumer theme boundary is clean.");
}
