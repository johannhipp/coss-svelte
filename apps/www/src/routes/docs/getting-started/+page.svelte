<script>
import CodeBlock from "$lib/components/docs/code-block.svelte";
import ContentPage from "$lib/components/docs/content-page.svelte";

const themeImportCode = `<script>
	import "@coss-svelte/theme/style-coss.css";
</${"script"}>`;

const toc = [
	{ href: "#install", title: "Install" },
	{ href: "#theme", title: "Theme" },
];
</script>

<svelte:head>
	<title>Getting Started - coss-svelte</title>
</svelte:head>

<ContentPage
	title="Getting Started"
	description="Install coss-svelte, Bits UI, and the shared theme in a SvelteKit app."
	{toc}
>
	<section id="install" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Install</h2>
		<CodeBlock language="bash" code="pnpm add coss-svelte bits-ui" />
	</section>

	<section id="theme" class="grid scroll-mt-20 gap-4">
		<h2 class="font-semibold text-2xl">Theme</h2>
		<p class="text-muted-foreground leading-7">
			Import the COSS theme once in the app layout so local components receive the same token
			system as the docs previews.
		</p>
		<CodeBlock language="svelte" code={themeImportCode} />
	</section>
</ContentPage>
