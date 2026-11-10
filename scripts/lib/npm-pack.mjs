export function singleNpmPack(output) {
	const packages = Array.isArray(output)
		? output
		: output && typeof output === "object"
			? Object.values(output)
			: [];
	if (packages.length !== 1 || typeof packages[0]?.filename !== "string" || !packages[0].filename) {
		throw new Error("npm pack did not return exactly one tarball");
	}
	return packages[0];
}
