import { getContext, setContext } from "svelte";

const fieldContextKey = Symbol("coss-svelte-field");

export type FieldContext = {
	baseId: string;
	controlId: string;
	labelId: string;
	descriptionId: string;
	errorId: string;
	validityId: string;
	required: boolean;
	disabled: boolean;
	invalid: boolean;
	describedBy: string;
	registerDescription: (id?: string) => () => void;
	registerError: (id?: string) => () => void;
};

export function createFieldContext(
	baseId: string,
	defaults: {
		required: () => boolean;
		disabled: () => boolean;
		invalid: () => boolean;
		description?: () => boolean;
		error?: () => boolean;
	}
): FieldContext {
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
