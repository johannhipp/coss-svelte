<script>
import { cn } from "../utils.js";

let { items = [], class: className = "", ...rest } = $props();
</script>

<nav data-slot="breadcrumb" class={cn("cn-breadcrumb", className)} aria-label="Breadcrumb" {...rest}>
	<ol>
		{#each items as item, index}
			{@const itemObject = typeof item === "object" && item !== null ? item : null}
			{@const itemLabel = itemObject?.label ?? item}
			<li>
				{#if itemObject?.ellipsis}
					<span
						class="cn-breadcrumb-ellipsis"
						role="img"
						aria-label={itemObject.label ?? "More"}
					>…</span
					>
				{:else if itemObject?.href && index < items.length - 1}
					<a href={itemObject.href}>{itemLabel}</a>
				{:else}
					<span aria-current={index === items.length - 1 ? "page" : undefined}>{itemLabel}</span>
				{/if}
			</li>
			{#if index < items.length - 1}
				<li class="cn-breadcrumb-separator" role="presentation">
					<span class="cn-breadcrumb-separator-icon" aria-hidden="true"></span>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
