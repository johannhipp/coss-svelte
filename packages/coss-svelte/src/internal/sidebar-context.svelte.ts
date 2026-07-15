import { getContext, setContext } from "svelte";

const sidebarContextKey = Symbol("coss-svelte-sidebar");

export type SidebarContext = {
	open: boolean;
	toggle: () => void;
};

export function setSidebarContext(context: SidebarContext): void {
	setContext(sidebarContextKey, context);
}

export function getSidebarContext(): SidebarContext | undefined {
	return getContext<SidebarContext | undefined>(sidebarContextKey);
}
