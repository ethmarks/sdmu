<script lang="ts">
	interface Props {
		mult: number;
		updateMult: (newMult: number) => void;

		minMult: number;
		maxMult: number;
	}

	let { mult, updateMult, minMult, maxMult }: Props = $props();

	// hours between the start of stardance and the end of it
	// https://www.wolframalpha.com/input?i=hours+between+june+1+and+sep+30
	const MAX_HOURS = 2094;
	const MAX_STARDUST = $derived(MAX_HOURS * maxMult);

	let hours: number = $state(30);
	let stardust: number = $state(200);

	function updateHours(newHours: number): void {
		stardust = Math.round(newHours * mult);
	}

	// long function name because its funny
	function updateMultToChangeStardust(newMult: number): void {
		stardust = Math.round(hours * newMult);
	}

	function updateStardust(newStardust: number): void {
		hours = Math.round(newStardust / mult);
	}

	$effect(() => {
		updateMultToChangeStardust(mult);
	});

	updateHours(30);
</script>

<div class="flex">
	<span>
		<input
			type="number"
			id="hours"
			bind:value={hours}
			onchange={() => updateHours(hours)}
			min="0"
			max={MAX_HOURS}
		/>
		<label for="mult">hrs</label>
	</span>

	<span class="operator">*</span>

	<span>
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

	<span class="operator">=</span>

	<span>
		<input
			type="number"
			id="stardust"
			bind:value={stardust}
			min="0"
			max={MAX_STARDUST}
			onchange={() => updateStardust(stardust)}
		/>
		<label for="stardust">stardust</label>
	</span>
</div>

<style lang="scss">
	.flex {
		width: 100%;
		justify-content: center;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	span {
		display: flex;
		align-items: center;
	}

	.operator {
		font-family: monospace;
		font-size: 1.5em;
		margin-inline: 0.6rem;
		margin-bottom: 4px;
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
