<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ComponentPreviewRenderer from "$lib/components/docs/component-preview-renderer.svelte";

let { code, slug, title } = $props();
let selected = $state("preview");
</script>

<div class="mt-4 mb-10 flex flex-col gap-2" id="preview">
	<div class="flex items-center justify-between">
		<div class="flex rounded-lg bg-muted p-1" role="tablist" aria-label={`${title} example`}>
			<button
				class={[
					"h-8 rounded-md px-3 font-medium text-sm",
					selected === "preview" ? "bg-background shadow-sm" : "text-muted-foreground",
				]}
				type="button"
				role="tab"
				aria-selected={selected === "preview"}
				onclick={() => {
					selected = "preview";
				}}
			>
				Preview
			</button>
			<button
				class={[
					"h-8 rounded-md px-3 font-medium text-sm",
					selected === "code" ? "bg-background shadow-sm" : "text-muted-foreground",
				]}
				type="button"
				role="tab"
				aria-selected={selected === "code"}
				onclick={() => {
					selected = "code";
				}}
			>
				Code
			</button>
		</div>
	</div>

	<div class="overflow-hidden rounded-lg border border-border bg-card">
		{#if selected === "preview"}
			<div
				class="component-preview-shell flex min-h-[min(420px,70svh)] items-center justify-center overflow-auto bg-background p-4 sm:min-h-[420px] sm:p-8"
				data-preview-slug={slug}
			>
				<ComponentPreviewRenderer {slug} />
			</div>
		{:else}
			<CodeBlock {code} />
		{/if}
	</div>
</div>
