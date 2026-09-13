<script lang="ts">
	interface Props {
		percentile: number;
		mult: number;
		updatePercentile: (newPercentile: number) => void;
		updateMult: (newMult: number) => void;

		minMult: number;
		maxMult: number;
	}

	let {
		percentile,
		mult,
		updatePercentile,
		updateMult,
		minMult,
		maxMult,
	}: Props = $props();
</script>

<div class="grid">
	<span class="left">
		<input
			type="number"
			id="percentile"
			bind:value={percentile}
			onchange={() => updatePercentile(percentile)}
			min="0"
			max="100"
			step="0.01"
		/>
		<label for="percentile">%</label>
	</span>

	<span class="center">=</span>

	<span class="right">
		<input
			type="number"
			id="mult"
			bind:value={mult}
			onchange={() => updateMult(mult)}
			min={minMult}
			max={maxMult}
			step="0.01"
		/>
		<label for="mult">x mult</label>
	</span>
</div>

<style lang="scss">
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

		&:invalid {
			--focus: HSL(348, 100%, 50%);
			--border-muted: HSL(348, 100%, 50%);
			--focus-background: HSL(348, 100%, 23%);
		}
	}

	@media (width <= 768px) {
		input {
			min-width: unset;
		}
	}
</style>
