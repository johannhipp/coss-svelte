import ts from "typescript";

const typeFormatFlags =
	ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

export const apiReferenceCompilerOptions = {
	lib: ["lib.dom.d.ts", "lib.es2022.d.ts"],
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	noEmit: true,
	skipLibCheck: true,
	strict: true,
	target: ts.ScriptTarget.ES2022,
};

export function createVirtualTypeProgram({
	virtualPath,
	virtualSource,
	compilerOptions = apiReferenceCompilerOptions,
}) {
	const host = ts.createCompilerHost(compilerOptions);
	const originalFileExists = host.fileExists.bind(host);
	const originalGetSourceFile = host.getSourceFile.bind(host);
	const originalReadFile = host.readFile.bind(host);

	host.fileExists = (filename) => filename === virtualPath || originalFileExists(filename);
	host.readFile = (filename) =>
		filename === virtualPath ? virtualSource : originalReadFile(filename);
	host.getSourceFile = (filename, languageVersion, onError, shouldCreateNewSourceFile) =>
		filename === virtualPath
			? ts.createSourceFile(filename, virtualSource, languageVersion, true)
			: originalGetSourceFile(filename, languageVersion, onError, shouldCreateNewSourceFile);

	const program = ts.createProgram([virtualPath], compilerOptions, host);
	const diagnostics = ts
		.getPreEmitDiagnostics(program)
		.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
	const sourceFile = program.getSourceFile(virtualPath);
	if (!sourceFile) {
		throw new Error("Unable to create the virtual API-reference type source.");
	}

	return {
		checker: program.getTypeChecker(),
		diagnostics,
		sourceFile,
	};
}

export function formatTypeDiagnostics(diagnostics, currentDirectory) {
	return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
		getCanonicalFileName: (filename) => filename,
		getCurrentDirectory: () => currentDirectory,
		getNewLine: () => "\n",
	});
}

export function aliasType(checker, sourceFile, name) {
	const declaration = sourceFile.statements
		.filter(ts.isTypeAliasDeclaration)
		.find((candidate) => candidate.name.text === name);
	if (!declaration) {
		throw new Error(`Missing generated type alias ${name}.`);
	}
	return {
		declaration,
		type: checker.getTypeFromTypeNode(declaration.type),
	};
}

export function normalizeTypeText(value) {
	return value
		.replace(/import\("(?:[^"]*\/)?node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?[^"]+"\)\./g, "")
		.replace(/import\("(?:svelte|svelte\/elements|bits-ui)"\)\./g, "")
		.replace(/import\("\.\/dist\/[^"]+"\)\./g, "")
		.replace(/\s+/g, " ")
		.replace(/\s*;\s*}/g, " }")
		.trim();
}

export function displayType(checker, type, location, { omitUndefined = false } = {}) {
	let text = normalizeTypeText(checker.typeToString(type, location, typeFormatFlags));
	if (omitUndefined) {
		text = text
			.replace(/^undefined \| /, "")
			.replace(/ \| undefined$/g, "")
			.replace(/ \| undefined \| /g, " | ");
	}
	return text;
}

export function propertyFact(checker, propsType, location, name) {
	const symbol = propsType.getProperty(name);
	if (!symbol) return null;
	const optional = (symbol.flags & ts.SymbolFlags.Optional) !== 0;
	const type = checker.getTypeOfSymbolAtLocation(symbol, location);
	return {
		name,
		type: displayType(checker, type, location, {
			omitUndefined: optional,
		}),
	};
}

export function requiredPropertyFact(checker, propsType, location, componentName, name) {
	const fact = propertyFact(checker, propsType, location, name);
	if (!fact) {
		throw new Error(`${componentName} curates unknown public prop ${name}.`);
	}
	return fact;
}

export function portalOptionsType(checker, type, location) {
	const candidates = type.isUnion()
		? type.types.filter((candidate) => !(candidate.flags & ts.TypeFlags.Undefined))
		: [type];
	const candidate = candidates[0];
	if (!candidate) {
		return displayType(checker, type, location, { omitUndefined: true });
	}
	const properties = candidate.getProperties();
	if (properties.length === 0) {
		return displayType(checker, type, location, { omitUndefined: true });
	}
	return `{ ${properties
		.map((property) => {
			const optional = (property.flags & ts.SymbolFlags.Optional) !== 0;
			const propertyType = checker.getTypeOfSymbolAtLocation(property, location);
			return `${property.name}${optional ? "?" : ""}: ${displayType(
				checker,
				propertyType,
				location,
				{ omitUndefined: optional }
			)}`;
		})
		.join("; ")} }`;
}

export function bindingNamesFromDeclaration(
	source,
	componentName,
	declarationPath = `${componentName}.svelte.d.ts`
) {
	const sourceFile = ts.createSourceFile(
		declarationPath,
		source,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS
	);
	const componentDeclaration = sourceFile.statements
		.filter(ts.isVariableStatement)
		.flatMap((statement) => statement.declarationList.declarations)
		.find(
			(declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === componentName
		);
	const componentType = componentDeclaration?.type;
	if (
		!componentType ||
		(!ts.isTypeReferenceNode(componentType) && !ts.isImportTypeNode(componentType)) ||
		componentType.typeArguments?.length !== 3
	) {
		throw new Error(
			`${componentName} declaration no longer exposes Svelte Component binding keys as its third type argument.`
		);
	}
	const bindingType = componentType.typeArguments[2];
	const nodes = ts.isUnionTypeNode(bindingType) ? bindingType.types : [bindingType];
	const names = nodes.map((node) => {
		if (!ts.isLiteralTypeNode(node) || !ts.isStringLiteral(node.literal)) {
			throw new Error(
				`${componentName} declaration has a non-literal binding key: ${node.getText(sourceFile)}`
			);
		}
		return node.literal.text;
	});
	return [...new Set(names.filter(Boolean))].sort();
}

export function signatureForBranch(checker, branch, location, names) {
	const properties = [];
	for (const name of names) {
		const symbol = branch.getProperty(name);
		if (!symbol) continue;
		const optional = (symbol.flags & ts.SymbolFlags.Optional) !== 0;
		const type = checker.getTypeOfSymbolAtLocation(symbol, location);
		properties.push(
			`${name}${optional ? "?" : ""}: ${displayType(checker, type, location, {
				omitUndefined: optional,
			})}`
		);
	}
	return `{ ${properties.join("; ")} }`;
}

export function assertHostPathFree(output, hostRoots) {
	for (const root of hostRoots) {
		if (root && output.includes(root)) {
			throw new Error("Generated API reference contains an absolute host path.");
		}
	}
}

export function generatedOutputIsCurrent(existing, generated) {
	return existing === generated;
}
