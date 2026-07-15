<script lang="ts">
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type ButtonSize = "default" | "sm" | "lg";
type ButtonVariant = "default" | "outline";
type AnchorProps = HTMLAnchorAttributes & {
	href: string;
	type?: never;
	isActive?: boolean;
	size?: ButtonSize;
	variant?: ButtonVariant;
	children?: import("svelte").Snippet;
};
type ButtonProps = HTMLButtonAttributes & {
	href?: undefined;
	isActive?: boolean;
	size?: ButtonSize;
	variant?: ButtonVariant;
	children?: import("svelte").Snippet;
};
type Props = AnchorProps | ButtonProps;
let props: Props = $props();

function isAnchorProps(value: Props): value is AnchorProps {
	return typeof value.href === "string";
}
</script>

{#if isAnchorProps(props)}
	<a
		data-slot="sidebar-menu-button"
		data-sidebar="menu-button"
		data-active={props.isActive ?? false}
		data-size={props.size ?? "default"}
		data-variant={props.variant ?? "default"}
		class={cn("cn-sidebar-menu-button", props.class ?? "")}
		{...props}
	>
		{@render props.children?.()}
	</a>
{:else}
	<button
		data-slot="sidebar-menu-button"
		data-sidebar="menu-button"
		data-active={props.isActive ?? false}
		data-size={props.size ?? "default"}
		data-variant={props.variant ?? "default"}
		class={cn("cn-sidebar-menu-button", props.class ?? "")}
		type={props.type ?? "button"}
		{...props}
	>
		{@render props.children?.()}
	</button>
{/if}
