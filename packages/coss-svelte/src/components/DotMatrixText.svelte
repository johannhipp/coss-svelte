<script lang="ts">
import { type DotMotion, dotMatrixGrid } from "../internal/dot-matrix.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = Omit<NativeProps<HTMLDivElement>, "children" | "color"> & {
	text: string;
	dot?: number | string;
	gap?: number | string;
	color?: string;
	motion?: DotMotion;
	/** Seconds for one animation cycle. */
	duration?: number;
	/** Seconds between neighbouring dots. */
	stagger?: number;
	playing?: boolean;
	/** Accessible label. Pass an empty string for a decorative mark. */
	label?: string;
};

let {
	text,
	dot = 8,
	gap = 2,
	color = "currentColor",
	motion = "reveal",
	duration = 2.4,
	stagger = 0.045,
	playing = true,
	label,
	class: className = "",
	style = "",
	...rest
}: Props = $props();

const cssLength = (value: number | string) => (typeof value === "number" ? `${value}px` : value);
const grid = $derived(dotMatrixGrid(text));
const dots = $derived(
	grid.cells.flatMap((row, y) =>
		row.flatMap((filled, x) =>
			filled ? [{ key: `${x}-${y}`, area: `${y + 1} / ${x + 1}`, order: x + y * 0.35 }] : []
		)
	)
);
const accessibleLabel = $derived(label ?? text);
</script>

<div
	{...rest}
	data-slot="dot-matrix-text"
	class={cn("cn-dot-matrix", className)}
	data-motion={motion}
	data-paused={playing ? undefined : "true"}
	role={accessibleLabel ? "img" : undefined}
	aria-label={accessibleLabel || undefined}
	aria-hidden={accessibleLabel ? undefined : "true"}
	style="--dm-cols:{grid.cols}; --dm-dot:{cssLength(dot)}; --dm-gap:{cssLength(gap)}; --dm-color:{color}; --dm-duration:{duration}s; --dm-stagger:{stagger}s; {style}"
>
	{#each dots as dotCell (dotCell.key)}
		<span class="cn-dot-matrix-dot" style="grid-area:{dotCell.area}; --dm-order:{dotCell.order}"></span>
	{/each}
</div>
