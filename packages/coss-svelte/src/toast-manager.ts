import { writable } from "svelte/store";

export type ToastOptions = {
	id?: string;
	title: string;
	description?: string;
	duration?: number;
	dismissible?: boolean;
};

export type ToastData = {
	id: string;
	title: string;
	description?: string;
	duration: number;
	dismissible: boolean;
};

let toastId = 0;
const timers = new Map<string, ReturnType<typeof setTimeout>>();
const toasts = writable<ToastData[]>([]);

function close(id: string) {
	const timer = timers.get(id);
	if (timer) {
		clearTimeout(timer);
		timers.delete(id);
	}
	toasts.update((current) => current.filter((toast) => toast.id !== id));
}

function add(options: ToastOptions) {
	const id = options.id ?? `toast-${++toastId}`;
	const toast: ToastData = {
		id,
		title: options.title,
		description: options.description,
		duration: options.duration ?? 5000,
		dismissible: options.dismissible ?? true,
	};

	toasts.update((current) => [...current.filter((item) => item.id !== id), toast]);

	if (toast.duration > 0) {
		const existingTimer = timers.get(id);
		if (existingTimer) clearTimeout(existingTimer);
		timers.set(
			id,
			setTimeout(() => close(id), toast.duration)
		);
	}

	return id;
}

export const toastManager = {
	subscribe: toasts.subscribe,
	add,
	close,
};
