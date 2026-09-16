<script lang="ts">
	import { Spring } from "svelte/motion";
	import { percentileToMult } from "$lib/formula";

	interface Props {
		percentile: number;
		mult: number;
		updatePercentile: (newPercentile: number) => void;
		minMult: number;
		maxMult: number;
		exponent: number;
		yTickCount?: number;
	}

	let {
		percentile,
		mult,
		updatePercentile,
		minMult,
		maxMult,
		exponent,
		yTickCount = 5,
	}: Props = $props();

	const width = 800;
	const height = 420;
	const plot = { left: 64, right: 24, top: 24, bottom: 52 };
	const plotWidth = width - plot.left - plot.right;
	const plotHeight = height - plot.top - plot.bottom;
	const xTicks = [0, 25, 50, 75, 100];

	function yTicks() {
		const count = Math.max(2, Math.floor(yTickCount));
		const interval = (maxMult - minMult) / (count - 1);

		return Array.from(
			{ length: count },
			(_, index) => minMult + index * interval,
		);
	}

	function xForPercentile(value: number) {
		return plot.left + (value / 100) * plotWidth;
	}

	function yForMult(value: number) {
		return (
			plot.top + ((maxMult - value) / (maxMult - minMult)) * plotHeight
		);
	}

	function curvePoints() {
		return Array.from({ length: 101 }, (_, index) => {
			const value = percentileToMult(index, minMult, maxMult, exponent);
			return `${xForPercentile(index)},${yForMult(value)}`;
		}).join(" ");
	}

	let svg: SVGSVGElement;
	let dragging = false;
	const activeX = new Spring(0, { stiffness: 0.16, damping: 0.8 });
	const activeY = new Spring(0, { stiffness: 0.16, damping: 0.8 });

	$effect(() => {
		const nextX = xForPercentile(percentile);
		const nextY = yForMult(mult);
		const instant = activeX.target === 0 && activeY.target === 0;

		activeX.set(nextX, { instant });
		activeY.set(nextY, { instant });
	});

	function updateFromPointer(event: PointerEvent) {
		const bounds = svg.getBoundingClientRect();
		const position = ((event.clientX - bounds.left) / bounds.width) * width;
		const nextPercentile = Math.max(
			0,
			Math.min(100, ((position - plot.left) / plotWidth) * 100),
		);
		updatePercentile(Math.round(nextPercentile * 100) / 100);
	}

	function startDragging(event: PointerEvent) {
		dragging = true;
		svg.setPointerCapture(event.pointerId);
		updateFromPointer(event);
	}

	function stopDragging() {
		dragging = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		const step = event.shiftKey ? 5 : 1;
		let nextPercentile = percentile;

		if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
			nextPercentile -= step;
		} else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
			nextPercentile += step;
		} else if (event.key === "Home") {
			nextPercentile = 0;
		} else if (event.key === "End") {
			nextPercentile = 100;
		} else {
			return;
		}

		event.preventDefault();
		updatePercentile(Math.max(0, Math.min(100, nextPercentile)));
	}
</script>

<div class="graph-frame">
	<svg
		bind:this={svg}
		viewBox={`0 0 ${width} ${height}`}
		role="group"
		aria-labelledby="graph-title graph-description"
		onpointermove={(event) => dragging && updateFromPointer(event)}
		onpointerup={stopDragging}
		onpointercancel={stopDragging}
	>
		<title id="graph-title">Percentile to multiplier graph</title>
		<desc id="graph-description">
			An interactive graph of the Stardance multiplier formula. Drag the
			point, or focus it and use the arrow keys, to change the percentile.
		</desc>

		<g class="grid-lines" aria-hidden="true">
			{#each xTicks as tick}
				<line
					x1={xForPercentile(tick)}
					x2={xForPercentile(tick)}
					y1={plot.top}
					y2={plot.top + plotHeight}
				/>
			{/each}
			{#each yTicks() as tick}
				<line
					x1={plot.left}
					x2={plot.left + plotWidth}
					y1={yForMult(tick)}
					y2={yForMult(tick)}
				/>
			{/each}
		</g>

		<rect
			class="interaction-area"
			x={plot.left}
			y={plot.top}
			width={plotWidth}
			height={plotHeight}
			aria-hidden="true"
			onpointerdown={startDragging}
		/>
		<polyline class="curve" points={curvePoints()} aria-hidden="true" />

		<g class="labels" aria-hidden="true">
			{#each xTicks as tick}
				<text
					x={xForPercentile(tick)}
					y={height - 18}
					text-anchor="middle"
				>
					{tick}%
				</text>
			{/each}
			{#each yTicks() as tick}
				<text
					x={plot.left - 12}
					y={yForMult(tick) + 5}
					text-anchor="end"
				>
					{tick.toFixed(1)}x
				</text>
			{/each}
			<text
				class="active-tick"
				x={activeX.current}
				y={plot.top + plotHeight + 24}
				text-anchor="middle">{percentile}%</text
			>
			<text
				class="active-tick"
				x={plot.left - 12}
				y={activeY.current + 5}
				text-anchor="end">{mult.toFixed(2)}x</text
			>
			<text
				class="axis-title"
				x={width / 2}
				y={height}
				text-anchor="middle"
			>
				Percentile
			</text>
			<text
				class="axis-title"
				transform={`translate(16 ${height / 2}) rotate(-90)`}
				text-anchor="middle">Multiplier</text
			>
		</g>

		<line
			class="active-line"
			x1={activeX.current}
			x2={activeX.current}
			y1={plot.top}
			y2={plot.top + plotHeight}
			aria-hidden="true"
		/>
		<line
			class="active-line"
			x1={plot.left}
			x2={plot.left + plotWidth}
			y1={activeY.current}
			y2={activeY.current}
			aria-hidden="true"
		/>
		<circle
			class="point"
			cx={activeX.current}
			cy={activeY.current}
			r="9"
			tabindex="0"
			role="slider"
			aria-label="Percentile"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={percentile}
			aria-valuetext={`${percentile}% percentile, ${mult}x multiplier`}
			onpointerdown={startDragging}
			onkeydown={handleKeydown}
		/>
		<circle
			class="point point-visible"
			cx={activeX.current}
			cy={activeY.current}
			r="9"
			aria-hidden="true"
		/>
		<text
			class="value-label"
			x={activeX.current}
			y={activeY.current - 18}
			text-anchor="middle">{percentile}% = {mult}x</text
		>
	</svg>
</div>

<style lang="scss">
	.graph-frame {
		background: var(--background);
		border: 1px solid var(--border);
		border-radius: 0.4em;
		padding: 0.75rem;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
		font-family: var(--sans-serif);
		touch-action: none;
	}

	.grid-lines line {
		stroke: var(--border-muted);
		stroke-width: 1;
	}

	.curve {
		fill: none;
		stroke: var(--links);
		stroke-width: 4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.active-line {
		stroke: var(--links);
		stroke-dasharray: 5 5;
		stroke-width: 1.5;
		opacity: 0.7;
	}

	.interaction-area {
		fill: transparent;
		cursor: default;
	}

	.point {
		fill: var(--links);
		stroke: var(--text-bright);
		stroke-width: 3;
		cursor: grab;
		outline: none;
	}

	.point:focus {
		stroke: var(--links);
		stroke-width: 4;
	}

	.point:active {
		cursor: grabbing;
	}

	.point-visible {
		pointer-events: none;
	}

	.labels,
	.value-label {
		fill: var(--text-muted);
		font-size: 14px;
	}

	.value-label {
		text-shadow: black 0 0 2px;
	}

	.axis-title {
		fill: var(--text-main);
		font-size: 15px;
	}

	.value-label {
		fill: var(--text-bright);
		font-family: var(--monospace);
		font-size: 15px;
		font-weight: 600;
	}

	.active-tick {
		fill: var(--links);
		font-family: var(--monospace);
		font-weight: 600;
	}
</style>
