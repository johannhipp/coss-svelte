<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";
import Spinner from "./Spinner.svelte";

type Variant = keyof typeof variantClassMap;
type ButtonSize = keyof typeof sizeClassMap;
type ButtonType = "button" | "submit" | "reset";

let {
	variant = "default" as Variant,
	size = "default" as ButtonSize,
	href = "",
	type = "button" as ButtonType,
	loading = false,
	disabled = false,
	class: className = "",
	children,
	...rest
}: NativeProps & {
	variant?: Variant;
	size?: ButtonSize;
	href?: string;
	type?: ButtonType;
	loading?: boolean;
	disabled?: boolean;
	class?: string;
	children?: import("svelte").Snippet;
} = $props();

const variantClassMap = {
	default: "primary",
	primary: "primary",
	secondary: "secondary",
	outline: "outline",
	ghost: "ghost",
	destructive: "destructive",
	"destructive-outline": "destructive-outline",
	link: "link",
};

const sizeClassMap = {
	default: "md",
	md: "md",
	xs: "xs",
	sm: "sm",
	lg: "lg",
	xl: "xl",
	icon: "icon",
	"icon-xs": "icon-xs",
	"icon-sm": "icon-sm",
	"icon-lg": "icon-lg",
	"icon-xl": "icon-xl",
};

let variantClass = $derived(variantClassMap[variant] ?? variant);
let sizeClass = $derived(sizeClassMap[size] ?? size);
let isDisabled = $derived(Boolean(disabled || loading));
</script>

{#if href}
	<a
		data-slot="button"
		data-loading={loading ? "" : undefined}
		aria-disabled={isDisabled ? "true" : undefined}
		class={cn("cn-button", `cn-button-${variantClass}`, `cn-button-${sizeClass}`, className)}
		{href}
		{...rest}
	>
		{@render children?.()}
		{#if loading}
			<Spinner class="cn-button-loading-indicator" data-slot="button-loading-indicator" />
		{/if}
	</a>
{:else}
	<button
		data-slot="button"
		data-loading={loading ? "" : undefined}
		aria-disabled={loading ? "true" : undefined}
		class={cn("cn-button", `cn-button-${variantClass}`, `cn-button-${sizeClass}`, className)}
		{type}
		disabled={isDisabled}
		{...rest}
	>
		{@render children?.()}
		{#if loading}
			<Spinner class="cn-button-loading-indicator" data-slot="button-loading-indicator" />
		{/if}
	</button>
{/if}
