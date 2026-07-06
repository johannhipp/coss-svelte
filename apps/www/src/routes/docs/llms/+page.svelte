<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ContentPage from "$lib/components/docs/content-page.svelte";
import { createLlmsTxt, getContentMarkdown } from "$lib/docs/markdown.js";
import { componentDocs, resourcePages } from "$lib/docs/navigation.js";

const markdown = getContentMarkdown("llms");
const llmsPreview = createLlmsTxt();
const toc = [
	{ href: "#entry-points", title: "Entry Points" },
	{ href: "#component-routes", title: "Component Routes" },
	{ href: "#resources", title: "Resources" },
];
</script>

<svelte:head>
	<title>LLMs - coss-svelte</title>
</svelte:head>

<ContentPage
	title="LLMs"
	description="A compact local map of the coss-svelte component surface for agents and implementation work."
	{markdown}
	{toc}
>
	<section id="entry-points" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Entry Points</h2>
		<div class="grid gap-3 sm:grid-cols-2">
			<a class="rounded-lg border border-border p-3 no-underline hover:bg-muted/50" href="/llms.txt">
				<span class="block font-medium">/llms.txt</span>
				<span class="block text-muted-foreground text-sm">Agent-facing docs map.</span>
			</a>
			<a
				class="rounded-lg border border-border p-3 no-underline hover:bg-muted/50"
				href="/docs/skills"
			>
				<span class="block font-medium">Skills</span>
				<span class="block text-muted-foreground text-sm">Install agent behavior rules.</span>
			</a>
		</div>
		<CodeBlock language="md" code={llmsPreview} />
	</section>

	<section id="component-routes" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Component Routes</h2>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each componentDocs as component}
				<a
					class="rounded-lg border border-border p-3 no-underline hover:bg-muted/50"
					href={`${component.href}.md`}
				>
					<span class="block font-medium">{component.title}</span>
					<span class="block text-muted-foreground text-sm">{component.statusLabel}</span>
				</a>
			{/each}
		</div>
	</section>

	<section id="resources" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Resources</h2>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each resourcePages as resource}
				<a
					class="rounded-lg border border-border p-3 no-underline hover:bg-muted/50"
					href={`${resource.href}.md`}
				>
					<span class="block font-medium">{resource.title}</span>
					<span class="block text-muted-foreground text-sm">{resource.description}</span>
				</a>
			{/each}
		</div>
	</section>
</ContentPage>
