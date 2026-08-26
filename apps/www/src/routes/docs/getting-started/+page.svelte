<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ContentPage from "$lib/components/docs/content-page.svelte";
import { getContentMarkdown } from "$lib/docs/markdown.js";

const themeImportCode = `@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";`;
const installationCode = "pnpm add coss-svelte @coss-svelte/theme bits-ui";
const registryExampleCode =
	"curl -fsSL https://coss-svelte.vercel.app/r/button.json -o button.json";
const markdown = getContentMarkdown("getting-started");

const toc = [
	{ href: "#source-setup", title: "Source Setup" },
	{ href: "#installation", title: "Installation" },
	{ href: "#theme", title: "Theme" },
	{ href: "#registry-preview", title: "Registry Preview" },
	{
		href: "#getting-your-agents-to-use-coss-svelte",
		title: "Getting your agents to use coss-svelte",
	},
];
</script>

<svelte:head>
	<title>Getting Started - coss-svelte</title>
</svelte:head>

<ContentPage
	title="Getting Started"
	description="Install coss-svelte, its shared theme, and Bits UI in a Svelte 5 application built with SvelteKit and Vite."
	{markdown}
	{toc}
>
	<section id="source-setup" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Source Setup</h2>
		<CodeBlock language="bash" code={`pnpm install --frozen-lockfile
pnpm package:prepare`} />
	</section>

	<section id="installation" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Installation</h2>
		<p class="text-muted-foreground leading-7">
			Start from a Svelte 5 application, then install the package, shared theme, and Bits UI peer.
		</p>
		<CodeBlock language="bash" code={installationCode} />
	</section>

	<section id="theme" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Theme</h2>
		<p class="text-muted-foreground leading-7">
				Import the COSS theme once from the global stylesheet loaded by your app layout so local
				components receive the same token system as the docs previews.
		</p>
			<CodeBlock language="css" code={themeImportCode} />
	</section>

	<section id="registry-preview" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Registry Preview</h2>
		<p class="text-muted-foreground leading-7">
			The copy-and-own registry is a preview in 0.1.0. Download a manifest such as Button:
		</p>
		<CodeBlock language="bash" code={registryExampleCode} />
		<p class="text-muted-foreground leading-7">
			Each manifest lists dependencies and files. Write each file's content to
			<code>src/lib/&lt;target&gt;</code>, install the listed dependencies, import the shared theme,
			and maintain the copied source in your application. Registry source and schemas may evolve
			between minor releases.
		</p>
	</section>

	<section id="getting-your-agents-to-use-coss-svelte" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Getting your agents to use coss-svelte</h2>
		<p class="text-muted-foreground leading-7">
			Use the <a
				class="font-medium text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
				href="/docs/skills"
			>coss-svelte skill</a> when an agent needs implementation rules for Svelte, Bits UI, Tailwind CSS 4, and the current
			component status boundaries.
		</p>
		<p class="text-muted-foreground leading-7">
			coss-svelte exposes a local docs map at <a
				class="font-medium text-foreground underline decoration-muted-foreground/60 underline-offset-4 hover:decoration-foreground"
				href="/llms.txt"
			>/llms.txt</a>, raw Markdown routes for component pages, and Copy Markdown actions for page-level
			context.
		</p>
	</section>
</ContentPage>
