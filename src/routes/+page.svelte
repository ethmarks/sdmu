<script lang="ts">
	import Calculator from "$lib/Calculator.svelte";
	import Graph from "$lib/Graph.svelte";
	import {
		percentileToMult,
		multToPercentile,
		DEFAULT_MAGIC_EXPONENT,
		DEFAULT_MIN_MULT,
		DEFAULT_MAX_MULT,
	} from "$lib/formula";
	import FormulaSteps from "$lib/FormulaSteps.svelte";
	import Walkthrough from "$lib/Walkthrough.svelte";
	import Modifiers from "$lib/Modifiers.svelte";

	const DECIMALS_FOR_PERCENTILE = 2;
	const DECIMALS_FOR_MULT = 2;

	let percentile: number = $state(50);
	let mult: number = $state(6.67);

	let minMult: number = $state(DEFAULT_MIN_MULT);
	let maxMult: number = $state(DEFAULT_MAX_MULT);
	let exponent: number = $state(DEFAULT_MAGIC_EXPONENT);

	function updatePercentile(newPercentile: number) {
		percentile = newPercentile;
		mult =
			Math.round(
				percentileToMult(percentile, minMult, maxMult, exponent) *
					10 ** DECIMALS_FOR_MULT,
			) /
			10 ** DECIMALS_FOR_MULT;
	}

	function updateMult(newMult: number) {
		mult = newMult;
		percentile =
			Math.round(
				multToPercentile(mult, minMult, maxMult, exponent) *
					10 ** DECIMALS_FOR_PERCENTILE,
			) /
			10 ** DECIMALS_FOR_PERCENTILE;
	}

	$effect(() => {
		mult =
			Math.round(
				percentileToMult(percentile, minMult, maxMult, exponent) *
					10 ** DECIMALS_FOR_MULT,
			) /
			10 ** DECIMALS_FOR_MULT;
	});

	updatePercentile(50);
</script>

<h1>Stardance Mult Utility</h1>
<p>
	Tools to visualize and explore the formula that <a
		href="https://stardance.hackclub.com/">Stardance</a
	> uses to calculate project multipliers.
</p>

<section id="graph">
	<h2>Interactive Graph</h2>
	<p>
		Drag the point side-to-side to adjust the percentile, and it'll display
		the multiplier.
	</p>
	<Graph
		{mult}
		{percentile}
		{updatePercentile}
		{minMult}
		{maxMult}
		{exponent}
	/>

	<p>
		Or check out <a href="https://www.desmos.com/calculator/ww5xp3gi52"
			>the original Desmos graph</a
		> (made by Jonah Crawford)
	</p>
</section>

<section id="calc">
	<h2>Calculator</h2>
	<p>
		Type a percentile to calculate the exact resulting multiplier, or type a
		multiplier to calculate the exact required percentile.
	</p>
	<Calculator
		{mult}
		{percentile}
		{updateMult}
		{updatePercentile}
		{minMult}
		{maxMult}
	/>
</section>

<section id="modifiers">
	<h2>Modifiers</h2>
	<div>
		<Modifiers
			setMinMult={(newMinMult: number) => {
				minMult = newMinMult;
			}}
			setMaxMult={(newMaxMult: number) => {
				maxMult = newMaxMult;
			}}
		/>
	</div>
</section>

<section id="formula">
	<h2>Formula</h2>
	<p>Steps to apply the formula.</p>
	<div>
		<FormulaSteps {mult} {percentile} {minMult} {maxMult} {exponent} />
	</div>
</section>

<section id="walkthrough">
	<h2>Code Walkthrough</h2>
	<p>
		Excerpts from the actual <a href="https://github.com/hackclub/stardance"
			>Stardance source code</a
		>, annotated with my explanatory comments.
	</p>
	<div>
		<Walkthrough />
	</div>
</section>

<style lang="scss">
	#formula div {
		max-width: 100%;
		overflow-x: auto;
		padding-block: 0.5rem;
	}
</style>
