<script lang="ts">
import type { ApiElement } from "$lib/docs/types.js";

let { reference = [] }: { reference?: ApiElement[] } = $props();
</script>

<div class="space-y-10">
	{#each reference as element}
		<section class="scroll-mt-20" id={`api-${element.name.toLowerCase()}`}>
			<h3 class="mb-3 font-semibold text-xl">{element.name}</h3>
			<p class="mb-5 text-muted-foreground leading-7">{element.description}</p>

			{#if element.props?.length}
				{@const hasDefault = element.props.some((prop) => prop.default !== undefined)}
				<div class="overflow-x-auto border-border border-y">
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
										<code class="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground">
											{prop.name}
										</code>
									</td>
									<td class="px-4 py-3 align-top">
										<code class="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground">
											{prop.type}
										</code>
									</td>
									{#if hasDefault}
										<td class="px-4 py-3 align-top">
											{#if prop.default !== undefined}
												<code class="rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground">
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
		</section>
	{/each}
</div>
