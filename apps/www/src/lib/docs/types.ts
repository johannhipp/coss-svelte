export type LocalExample = {
	description: string;
	href: string;
	name: string;
	registryUrl: string;
	slug: string;
	title: string;
};

export type TocItem = {
	href: string;
	title: string;
};

export type ApiProp = {
	bindable?: boolean;
	default?: string;
	description: string;
	name: string;
	type: string;
};

export type ApiFact = {
	bindable?: boolean;
	name: string;
	type: string;
};

export type ApiElement = {
	bindings?: string[];
	description: string;
	facts?: ApiFact[];
	inherited?: {
		label: string;
		url: string;
	};
	name: string;
	props?: ApiProp[];
	signatures?: string[];
};

export type ComponentDoc = {
	apiReference?: ApiElement[];
	category: string;
	description: string;
	exampleSource?: string | null;
	firstImplementationPass?: string;
	foundation: string;
	href: string;
	imports: string[];
	name: string;
	particles: number;
	parts: string[];
	slug: string;
	status: string;
	statusLabel: string;
	title: string;
};
