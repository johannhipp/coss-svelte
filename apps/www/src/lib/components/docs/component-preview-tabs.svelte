<script>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "coss-svelte";
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";

let { code, slug, title } = $props();
let selected = $state("preview");
let hasCode = $derived(Boolean(code?.trim()));
</script>

<Tabs bind:value={selected} class="mt-4 mb-10 gap-2" id="preview">
	<div class="flex items-center justify-between">
		<TabsList aria-label={`${title} example`}>
			<TabsTrigger value="preview">Preview</TabsTrigger>
			{#if hasCode}
				<TabsTrigger value="code">Code</TabsTrigger>
			{/if}
		</TabsList>
	</div>

	<div class="overflow-hidden rounded-lg border border-border bg-card">
		<TabsContent value="preview">
			<div
				class="component-preview-shell flex min-h-[min(420px,70svh)] items-center justify-center overflow-auto bg-background p-4 sm:min-h-[420px] sm:p-8"
				data-preview-slug={slug}
			>
				<ComponentPreviewRenderer {slug} />
			</div>
		</TabsContent>
		{#if hasCode}
			<TabsContent value="code">
				<CodeBlock {code} />
			</TabsContent>
		{/if}
	</div>
</Tabs>
