<script lang="ts">
	import Calculator from "$lib/Calculator.svelte";
	import { percentileToMult, multToPercentile } from "$lib/formula";
	import FormulaSteps from "$lib/FormulaSteps.svelte";

	const DECIMALS_FOR_PERCENTILE = 2;
	const DECIMALS_FOR_MULT = 4;

	let percentile: number = $state(50);
	let mult: number = $state(6.67);

	function updatePercentile(newPercentile: number) {
		percentile = newPercentile;
		mult =
			Math.round(percentileToMult(percentile) * 10 ** DECIMALS_FOR_MULT) /
			10 ** DECIMALS_FOR_MULT;
	}

	function updateMult(newMult: number) {
		mult = newMult;
		percentile =
			Math.round(multToPercentile(mult) * 10 ** DECIMALS_FOR_PERCENTILE) /
			10 ** DECIMALS_FOR_PERCENTILE;
	}

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
	<p>
		<a href="https://www.desmos.com/calculator/ww5xp3gi52"
			>Source on Desmos</a
		> (made by Jonah Crawford)
	</p>
	<iframe
		title="Stardance Multiplier"
		src="https://www.desmos.com/calculator/jhptzj9o1h?embed"
		width="100%"
		height="500"
		frameborder="0"
	></iframe>
</section>

<section id="calc">
	<h2>Calculator</h2>
	<p>
		Type a percentile to calculate the exact resulting multiplier, or type a
		multiplier to calculate the exact required percentile.
	</p>
	<Calculator {mult} {percentile} {updateMult} {updatePercentile} />
</section>

<section id="formula">
	<h2>Formula</h2>
	<p>Steps to apply the formula.</p>
	<div>
		<FormulaSteps {mult} {percentile} />
	</div>
</section>

<style lang="scss">
	#graph iframe {
		display: block;
		margin-inline: auto;
		border-radius: 1em;
		background: white;
	}

	#formula div {
		max-width: 100%;
		overflow-x: auto;
		padding-block: 0.5rem;
	}
</style>
