<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ContentPage from "$lib/components/docs/content-page.svelte";
import { createSkillsMarkdown } from "$lib/docs/markdown.js";

const installCommand = "npx skills@latest add johannhipp/skills --skill coss-svelte";
const markdown = createSkillsMarkdown();
const toc = [
	{ href: "#install", title: "Install" },
	{ href: "#coverage", title: "Coverage" },
	{ href: "#workflow", title: "Workflow" },
];
</script>

<svelte:head>
	<title>Skills - coss-svelte</title>
</svelte:head>

<ContentPage
	title="Skills"
	description="Install coss-svelte knowledge into AI coding agents so they can implement the Svelte component surface correctly."
	{markdown}
	{toc}
>
	<section id="install" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Install</h2>
		<CodeBlock language="bash" code={installCommand} />
	</section>

	<section id="coverage" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">What It Covers</h2>
		<p class="text-muted-foreground leading-7">
			The coss-svelte skill covers component discovery, Svelte and Bits UI composition, Tailwind
			CSS 4 styling, form patterns, migration traps from React COSS or shadcn/Radix, registry
			usage, and current stable and experimental component statuses.
		</p>
	</section>

	<section id="workflow" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">How Agents Use It</h2>
		<p class="text-muted-foreground leading-7">
			Agents load the root skill first, then read focused rule and primitive references on
			demand before generating or modifying coss-svelte code.
		</p>
	</section>
</ContentPage>
