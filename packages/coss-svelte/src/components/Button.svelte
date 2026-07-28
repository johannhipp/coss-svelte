<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../utils.js";
import Spinner from "./Spinner.svelte";

type Variant = keyof typeof variantClassMap;
type ButtonSize = keyof typeof sizeClassMap;
type SharedProps = {
	variant?: Variant;
	size?: ButtonSize;
	loading?: boolean;
	class?: string;
	children?: Snippet;
};
type AnchorProps = SharedProps &
	Omit<HTMLAnchorAttributes, "children" | "class" | "disabled" | "form" | "href" | "type"> & {
		href: string;
		disabled?: never;
		form?: never;
		type?: never;
	};
type NativeButtonProps = SharedProps &
	Omit<HTMLButtonAttributes, "children" | "class" | "download" | "href" | "target"> & {
		href?: undefined;
		download?: never;
		target?: never;
	};
type Props = AnchorProps | NativeButtonProps;

let props: Props = $props();

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

let variant = $derived(props.variant ?? "default");
let size = $derived(props.size ?? "default");
let loading = $derived(props.loading ?? false);
let variantClass = $derived(variantClassMap[variant] ?? variant);
let sizeClass = $derived(sizeClassMap[size] ?? size);

function anchorAttributes(props: AnchorProps): HTMLAnchorAttributes {
	const {
		href: _href,
		variant: _variant,
		size: _size,
		loading: _loading,
		class: _class,
		children: _children,
		...attributes
	} = props;
	return attributes;
}

function buttonAttributes(props: NativeButtonProps): HTMLButtonAttributes {
	const {
		href: _href,
		variant: _variant,
		size: _size,
		loading: _loading,
		class: _class,
		children: _children,
		...attributes
	} = props;
	return attributes;
}

function preventLoadingAnchor(event: MouseEvent) {
	if (!loading) return;
	event.preventDefault();
	event.stopImmediatePropagation();
}
</script>

{#if props.href !== undefined}
	{@const attributes = anchorAttributes(props)}
	<a
		{...attributes}
		data-slot="button"
		data-loading={loading ? "" : undefined}
		aria-disabled={loading ? "true" : attributes["aria-disabled"]}
		class={cn("cn-button", `cn-button-${variantClass}`, `cn-button-${sizeClass}`, props.class)}
		href={props.href}
		onclickcapture={preventLoadingAnchor}
	>
		{@render props.children?.()}
		{#if loading}
			<Spinner class="cn-button-loading-indicator" data-slot="button-loading-indicator" />
		{/if}
	</a>
{:else}
	{@const attributes = buttonAttributes(props)}
	<button
		{...attributes}
		data-slot="button"
		data-loading={loading ? "" : undefined}
		aria-disabled={loading ? "true" : undefined}
		class={cn("cn-button", `cn-button-${variantClass}`, `cn-button-${sizeClass}`, props.class)}
		type={attributes.type ?? "button"}
		disabled={Boolean(attributes.disabled || loading)}
		onclickcapture={preventLoadingAnchor}
	>
		{@render props.children?.()}
		{#if loading}
			<Spinner class="cn-button-loading-indicator" data-slot="button-loading-indicator" />
		{/if}
	</button>
{/if}
