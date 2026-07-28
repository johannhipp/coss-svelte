import { getContext, setContext } from "svelte";

const fieldContextKey = Symbol("coss-svelte-field");

export type FieldContext = {
	baseId: string;
	controlId: string;
	labelId: string;
	descriptionId: string;
	errorId: string;
	validityId: string;
	hasLabel: boolean;
	required: boolean;
	disabled: boolean;
	invalid: boolean;
	describedBy: string;
	registerLabel: (id?: string) => () => void;
	registerDescription: (id?: string) => () => void;
	registerError: (id?: string) => () => void;
};

export function createFieldContext(
	baseId: string,
	defaults: {
		required: () => boolean;
		disabled: () => boolean;
		invalid: () => boolean;
		label?: () => boolean;
		description?: () => boolean;
		error?: () => boolean;
	}
): FieldContext {
	let labels = $state<string[]>([]);
	let descriptions = $state<string[]>(defaults.description?.() ? [`${baseId}-description`] : []);
	let errors = $state<string[]>(defaults.error?.() ? [`${baseId}-error`] : []);
	const register = (items: string[], id: string | undefined) => {
		if (id && !items.includes(id)) items.push(id);
		return () => {
			const index = id ? items.indexOf(id) : -1;
			if (index >= 0) items.splice(index, 1);
		};
	};

	return {
		baseId,
		controlId: `${baseId}-control`,
		labelId: `${baseId}-label`,
		descriptionId: `${baseId}-description`,
		errorId: `${baseId}-error`,
		validityId: `${baseId}-validity`,
		get hasLabel() {
			return (defaults.label?.() ?? false) || labels.length > 0;
		},
		get required() {
			return defaults.required();
		},
		get disabled() {
			return defaults.disabled();
		},
		get invalid() {
			return defaults.invalid();
		},
		get describedBy() {
			return [...descriptions, ...errors].join(" ");
		},
		registerLabel: (id = `${baseId}-label`) => register(labels, id),
		registerDescription: (id = `${baseId}-description`) => register(descriptions, id),
		registerError: (id = `${baseId}-error`) => register(errors, id),
	};
}

export function setFieldContext(context: FieldContext): void {
	setContext(fieldContextKey, context);
}

export function getFieldContext(): FieldContext | undefined {
	return getContext<FieldContext | undefined>(fieldContextKey);
}

export function mergeFieldIds(...values: Array<string | null | undefined>): string | undefined {
	const ids = new Set<string>();
	for (const value of values) {
		for (const id of value?.split(/\s+/u) ?? []) {
			if (id) ids.add(id);
		}
	}
	return ids.size > 0 ? [...ids].join(" ") : undefined;
}
