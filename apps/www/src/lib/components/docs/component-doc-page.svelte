<script lang="ts">
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ComponentApiReference from "$lib/components/docs/component-api-reference.svelte";
import ComponentPreviewTabs from "$lib/components/docs/component-preview-tabs.svelte";
import CopyMarkdownButton from "$lib/components/docs/copy-markdown-button.svelte";
import DocsToc from "$lib/components/docs/docs-toc.svelte";
import { createComponentMarkdown } from "$lib/docs/markdown.js";
import type { ComponentDoc, TocItem } from "$lib/docs/types.js";

let {
	exampleSource = "",
	next = null,
	page,
	previous = null,
	toc = [],
}: {
	exampleSource?: string | null;
	next?: ComponentDoc | null;
	page: ComponentDoc;
	previous?: ComponentDoc | null;
	toc?: TocItem[];
} = $props();

let usageCode = $derived(exampleSource ?? "");
let importCode = $derived(`import { ${page.imports.join(", ")} } from "coss-svelte";`);
let markdown = $derived(createComponentMarkdown(page, usageCode));
</script>

<div class="flex min-w-0 items-stretch">
	<article class="relative min-w-0 flex-1 py-5 lg:mt-8 lg:mr-4 lg:mb-8 lg:py-0">
		<div class="rounded-xl border border-border bg-card shadow-[0_8px_30px_rgb(0_0_0_/_0.035)]">
			<div class="px-4 py-6 sm:px-6 lg:p-8">
				<div class="mx-auto w-full max-w-5xl">
					<header class="mb-8 flex flex-col gap-2">
						<div class="flex flex-col gap-2">
							<div class="flex flex-wrap items-center gap-2">
								<h1
									class="scroll-m-20 font-heading font-semibold text-3xl text-foreground leading-tight xl:text-4xl"
								>
									{page.title}
								</h1>
							</div>
							<p class="text-muted-foreground text-lg leading-7 sm:text-lg">{page.description}</p>
						</div>
						<div class="flex flex-wrap gap-2 pt-4">
							<CopyMarkdownButton {markdown} />
						</div>
					</header>

					<ComponentPreviewTabs slug={page.slug} title={page.title} code={usageCode} />

					<section id="installation" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Installation</h2>
						<p class="mb-4 text-muted-foreground leading-7">
							Install the local package, Bits UI peer primitives, and the shared coss-svelte theme.
						</p>
						<CodeBlock language="bash" code="pnpm add coss-svelte bits-ui" />
					</section>

					<section id="usage" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Usage</h2>
						<p class="mb-4 text-muted-foreground leading-7">
							Import the Svelte component exports directly from the local package.
						</p>
						<CodeBlock language="ts" code={importCode} />
					</section>

					<section id="anatomy" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Anatomy</h2>
						{#if page.parts.length}
							<ul class="grid gap-2 sm:grid-cols-2">
								<li class="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
									{page.name}
								</li>
								{#each page.parts as part}
									<li class="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-sm">
										{part}
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-muted-foreground leading-7">
								{page.title} exposes a single component export for the current implementation.
							</p>
						{/if}
					</section>

					<section id="api-reference" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">API Reference</h2>
						<ComponentApiReference reference={page.apiReference} />
					</section>

					<section id="implementation-details" class="scroll-mt-20 border-border border-t py-8">
						<h2 class="mb-3 font-semibold text-2xl">Implementation Details</h2>
						<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
							<div>
								<dt class="font-medium text-foreground">Status</dt>
								<dd class="text-muted-foreground">{page.statusLabel}</dd>
							</div>
							<div>
								<dt class="font-medium text-foreground">Foundation</dt>
								<dd class="text-muted-foreground">{page.foundation}</dd>
							</div>
							<div>
								<dt class="font-medium text-foreground">Category</dt>
								<dd class="text-muted-foreground">{page.category}</dd>
							</div>
							<div>
								<dt class="font-medium text-foreground">Particles</dt>
								<dd class="text-muted-foreground">{page.particles}</dd>
							</div>
						</dl>
					</section>

					{#if page.status !== "stable"}
						<section id="status" class="scroll-mt-20 border-border border-t py-8">
							<h2 class="mb-3 font-semibold text-2xl">Status</h2>
							<p class="text-muted-foreground leading-7">{page.firstImplementationPass}</p>
						</section>
					{/if}

					<nav
						class="mt-2 grid gap-3 border-border border-t pt-6 sm:grid-cols-2"
						aria-label="Component pagination"
					>
						{#if previous}
							<a class="rounded-lg border border-border p-4 no-underline hover:bg-muted/50" href={previous.href}>
								<span class="block text-muted-foreground text-sm">Previous</span>
								<span class="font-medium">{previous.title}</span>
							</a>
						{/if}
						{#if next}
							<a
								class="rounded-lg border border-border p-4 text-right no-underline hover:bg-muted/50 sm:col-start-2"
								href={next.href}
							>
								<span class="block text-muted-foreground text-sm">Next</span>
								<span class="font-medium">{next.title}</span>
							</a>
						{/if}
					</nav>
				</div>
			</div>
		</div>
	</article>

	<DocsToc items={toc} />
</div>
