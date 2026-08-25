<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ContentPage from "$lib/components/docs/content-page.svelte";
import { getContentMarkdown } from "$lib/docs/markdown.js";

const themeImportCode = `@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";`;
const availabilityCheckCode = `npm view coss-svelte version
npm view @coss-svelte/theme version`;
const markdown = getContentMarkdown("getting-started");

const toc = [
	{ href: "#source-setup", title: "Source Setup" },
	{ href: "#external-availability", title: "External Availability" },
	{ href: "#theme", title: "Theme" },
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
	description="Use coss-svelte from the source workspace today, or verify package publication before installing it in another SvelteKit app."
	{markdown}
	{toc}
>
	<section id="source-setup" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Source Setup</h2>
		<CodeBlock language="bash" code={`pnpm install --frozen-lockfile
pnpm package:prepare`} />
	</section>

	<section id="external-availability" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">External Availability</h2>
		<p class="text-muted-foreground leading-7">
			The packages are not published yet. Verify both packages before presenting an external
			install as available.
		</p>
		<CodeBlock language="bash" code={availabilityCheckCode} />
		<p class="text-muted-foreground leading-7">After both checks succeed:</p>
		<CodeBlock language="bash" code="pnpm add coss-svelte bits-ui @coss-svelte/theme" />
	</section>

	<section id="theme" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Theme</h2>
		<p class="text-muted-foreground leading-7">
				Import the COSS theme once from the global stylesheet loaded by your app layout so local
				components receive the same token system as the docs previews.
		</p>
			<CodeBlock language="css" code={themeImportCode} />
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
