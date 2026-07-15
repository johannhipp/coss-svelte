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
	default?: string;
	description: string;
	name: string;
	type: string;
};

export type ApiElement = {
	description: string;
	name: string;
	props?: ApiProp[];
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
