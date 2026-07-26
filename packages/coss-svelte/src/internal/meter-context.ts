import { getContext, setContext } from "svelte";

const METER_CONTEXT = Symbol("coss-svelte-meter");

export type MeterContext = {
	readonly value: number;
	readonly min: number;
	readonly max: number;
};

export function setMeterContext(context: MeterContext) {
	setContext(METER_CONTEXT, context);
}

export function getMeterContext() {
	return getContext<MeterContext | undefined>(METER_CONTEXT);
}
