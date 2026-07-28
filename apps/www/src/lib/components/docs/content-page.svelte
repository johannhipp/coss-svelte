<script>
import CopyMarkdownButton from "$lib/components/docs/copy-markdown-button.svelte";
import DocsToc from "$lib/components/docs/docs-toc.svelte";
import { createContentMarkdown } from "$lib/docs/markdown.js";

let {
	children,
	description,
	eyebrow = "Docs",
	markdown: markdownOverride = null,
	title,
	toc = [],
} = $props();

let markdown = $derived(markdownOverride ?? createContentMarkdown({ description, title }));
</script>

<div class="flex min-w-0 items-stretch">
	<article class="relative min-w-0 flex-1 py-5 lg:mt-8 lg:mr-4 lg:mb-8 lg:py-0">
		<div class="rounded-xl border border-border bg-card shadow-[0_8px_30px_rgb(0_0_0_/_0.035)]">
			<div class="px-4 py-6 sm:px-6 lg:p-8">
				<div class="docs-page-flow mx-auto flex w-full max-w-3xl flex-col gap-8">
					<header class="flex flex-col gap-2">
						<p class="font-medium text-muted-foreground text-sm">{eyebrow}</p>
						<h1 class="font-heading font-semibold text-3xl leading-tight xl:text-4xl">{title}</h1>
						<p class="text-muted-foreground text-lg leading-7">{description}</p>
						<div class="pt-4">
							<CopyMarkdownButton {markdown} />
						</div>
					</header>
					{@render children()}
				</div>
			</div>
		</div>
	</article>

	{#if toc.length}
		<DocsToc items={toc} />
	{/if}
</div>
