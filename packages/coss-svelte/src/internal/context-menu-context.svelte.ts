import { getContext, setContext } from "svelte";

export type ContextMenuDirection = "ltr" | "rtl";

type ContextMenuContext = Readonly<{
	dir: ContextMenuDirection;
	trigger: HTMLElement | null;
	setTrigger: (trigger: HTMLElement | null) => void;
}>;

type ContextMenuSubContext = Readonly<{
	trigger: HTMLElement | null;
	setTrigger: (trigger: HTMLElement | null) => void;
}>;

const contextMenuContextKey = Symbol("coss-svelte-context-menu");
const contextMenuSubContextKey = Symbol("coss-svelte-context-menu-sub");

export function setContextMenuContext(
	getDirection: () => ContextMenuDirection,
	getTrigger: () => HTMLElement | null,
	setTrigger: (trigger: HTMLElement | null) => void
): void {
	setContext<ContextMenuContext>(contextMenuContextKey, {
		get dir() {
			return getDirection();
		},
		get trigger() {
			return getTrigger();
		},
		setTrigger,
	});
}

export function getContextMenuContext(): ContextMenuContext {
	const context = getContext<ContextMenuContext | undefined>(contextMenuContextKey);
	if (!context) {
		throw new Error("Context Menu submenu parts must be rendered inside <ContextMenu>.");
	}
	return context;
}

export function setContextMenuSubContext(
	getTrigger: () => HTMLElement | null,
	setTrigger: (trigger: HTMLElement | null) => void
): void {
	setContext<ContextMenuSubContext>(contextMenuSubContextKey, {
		get trigger() {
			return getTrigger();
		},
		setTrigger,
	});
}

export function getContextMenuSubContext(): ContextMenuSubContext {
	const context = getContext<ContextMenuSubContext | undefined>(contextMenuSubContextKey);
	if (!context) {
		throw new Error(
			"Context Menu submenu trigger and popup must be rendered inside <ContextMenuSub>."
		);
	}
	return context;
}
