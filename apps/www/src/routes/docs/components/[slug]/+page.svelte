<script>
import ComponentDocPage from "$lib/components/docs/component-doc-page.svelte";

let { data } = $props();
</script>

<svelte:head>
	<title>{data.page.title} - coss-svelte</title>
	<meta name="description" content={data.page.description} />
</svelte:head>

<ComponentDocPage page={data.page} previous={data.previous} next={data.next} toc={data.toc} />
