import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export function load() {
	if (env.COSS_ENABLE_TEST_FIXTURES !== "1") {
		error(404, "Not found");
	}

	return {};
}
