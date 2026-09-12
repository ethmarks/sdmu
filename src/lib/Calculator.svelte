<script lang="ts">
	import { percentileToMult, multToPercentile } from "./formula";

	const DECIMALS_FOR_PERCENTILE = 2;
	const DECIMALS_FOR_MULT = 4;

	let percentile: number = $state(50);
	let mult: number = $state(6.67);

	function updateMult() {
		mult =
			Math.round(percentileToMult(percentile) * 10 ** DECIMALS_FOR_MULT) /
			10 ** DECIMALS_FOR_MULT;
	}

	function updatePercentile() {
		percentile =
			Math.round(multToPercentile(mult) * 10 ** DECIMALS_FOR_PERCENTILE) /
			10 ** DECIMALS_FOR_PERCENTILE;
	}

	updateMult();
</script>

<div class="grid">
	<span class="left">
		<input
			type="number"
			id="percentile"
			bind:value={percentile}
			onchange={updateMult}
			min="0"
			max="100"
		/>
		<label for="percentile">%</label>
	</span>

	<span class="center">=</span>

	<span class="right">
		<input
			type="number"
			id="mult"
			bind:value={mult}
			onchange={updatePercentile}
			min="1"
			max="20"
			step="0.01"
		/>
		<label for="mult">x mult</label>
	</span>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		align-items: center;
	}

	span {
		display: flex;
		align-items: center;
	}

	.left {
		justify-self: end;
	}
	.center {
		justify-self: center;

		font-family: monospace;
		font-size: 2em;
		margin-inline: 1rem;
		margin-bottom: 4px;
	}
	.right {
		justify-self: start;
	}

	input {
		min-width: 15ch;
	}

	@media (width <= 768px) {
		input {
			min-width: unset;
		}
	}
</style>
