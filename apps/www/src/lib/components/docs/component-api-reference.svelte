<script lang="ts">
import type { ApiElement } from "$lib/docs/types.js";

let { reference = [] }: { reference?: ApiElement[] } = $props();
</script>

<div class="space-y-10">
	{#each reference as element}
		<section class="scroll-mt-20" id={`api-${element.name.toLowerCase()}`}>
			<h3 class="mb-3 font-semibold text-xl">{element.name}</h3>
			<p class="mb-5 text-muted-foreground leading-7">{element.description}</p>

			{#if element.signatures?.length}
				<div class="mb-5">
					<h4 class="mb-2 font-medium text-sm">Signatures</h4>
					<div class="grid gap-2">
						{#each element.signatures as signature}
							<code class="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-sm">
								{signature}
							</code>
						{/each}
					</div>
				</div>
			{/if}

			{#if element.props?.length}
				{@const hasDefault = element.props.some((prop) => prop.default !== undefined)}
				<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to focus and scroll overflowing API tables.) -->
				<div
					class="overflow-x-auto border-border border-y"
					role="region"
					aria-label={`${element.name} props`}
					tabindex="0"
				>
					<table class="w-full min-w-[620px] table-fixed text-left text-sm">
						<thead>
							<tr class="border-border border-b">
								<th class="w-[20%] px-4 py-3 font-medium text-foreground">Prop</th>
								<th class="w-[30%] px-4 py-3 font-medium text-foreground">Type</th>
								{#if hasDefault}
									<th class="w-[18%] px-4 py-3 font-medium text-foreground">Default</th>
								{/if}
								<th class="px-4 py-3 font-medium text-foreground">Description</th>
							</tr>
						</thead>
						<tbody>
							{#each element.props as prop}
								<tr class="border-border border-b last:border-b-0">
									<td class="px-4 py-3 align-top">
										<code class="rounded-md bg-muted px-2 py-1 font-mono text-foreground">
											{prop.bindable ? `bind:${prop.name}` : prop.name}
										</code>
									</td>
									<td class="px-4 py-3 align-top">
										<code class="rounded-md bg-muted px-2 py-1 font-mono text-foreground">
											{prop.type}
										</code>
									</td>
									{#if hasDefault}
										<td class="px-4 py-3 align-top">
											{#if prop.default !== undefined}
												<code class="rounded-md bg-muted px-2 py-1 font-mono text-foreground">
													{prop.default}
												</code>
											{:else}
												<span class="text-muted-foreground">-</span>
											{/if}
										</td>
									{/if}
									<td class="px-4 py-3 align-top leading-6">{prop.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if element.facts?.length}
				<div class="mt-4 flex flex-wrap gap-2" aria-label={`${element.name} composition facts`}>
					{#each element.facts as fact}
						<span class="rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-sm">
							<code class="font-mono">
								{fact.bindable ? `bind:${fact.name}` : fact.name}
							</code>
							<span class="text-muted-foreground">: {fact.type}</span>
						</span>
					{/each}
				</div>
			{/if}

			{#if element.inherited}
				<p class="mt-4 text-muted-foreground text-sm">
					Inherits from
					<a
						class="font-medium text-foreground underline underline-offset-4"
						href={element.inherited.url}
						target="_blank"
						rel="noreferrer"
					>
						{element.inherited.label}
					</a>.
				</p>
			{/if}
		</section>
	{/each}
</div>
