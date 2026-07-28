<script lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "coss-svelte";
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";

type PreviewAlignment = "start" | "center" | "end";

let {
	align = "center",
	code,
	slug,
	title,
}: {
	align?: PreviewAlignment;
	code: string;
	slug: string;
	title: string;
} = $props();
let selected = $state("preview");
let hasCode = $derived(Boolean(code?.trim()));
</script>

<Tabs
	bind:value={selected}
	class="docs-component-preview-tabs mt-4 mb-12"
	id="preview"
	data-preview-tabs={slug}
>
	<div class="flex items-center justify-between">
		<TabsList class="docs-preview-tabs-list" aria-label={`${title} example`}>
			<TabsTrigger class="docs-preview-tab" value="preview">Preview</TabsTrigger>
			{#if hasCode}
				<TabsTrigger class="docs-preview-tab" value="code">Code</TabsTrigger>
			{/if}
		</TabsList>
	</div>

	<div class="docs-preview-frame">
		<TabsContent class="docs-preview-panel" value="preview">
			<div
				class="component-preview-shell docs-preview-surface"
				data-align={align}
				data-preview-slug={slug}
			>
				<ComponentPreviewRenderer {slug} />
			</div>
		</TabsContent>
		{#if hasCode}
			<TabsContent class="docs-preview-panel" value="code">
				<div class="docs-preview-code-surface" data-code-preview={slug}>
					<CodeBlock {code} mode="embedded" />
				</div>
			</TabsContent>
		{/if}
	</div>
</Tabs>
