<script lang="ts">
	interface Props {
		setMinMult: (newMinMult: number) => void;
		setMaxMult: (newMaxMult: number) => void;
	}

	let { setMinMult, setMaxMult }: Props = $props();

	let ratingModifier: number = $state(1);

	const MULT_RANGE_MAP = {
		normal: [1, 20] as [number, number],
		viral: [20, 30] as [number, number],
		classic: [0.3, 30] as [number, number],
	} as const;
	type MultRangeName = keyof typeof MULT_RANGE_MAP;

	let multRangeName: MultRangeName = $state("normal");

	$effect(() => {
		const multRange: [number, number] = MULT_RANGE_MAP[multRangeName];

		const newMin = multRange[0] * ratingModifier;
		const newMax = multRange[1] * ratingModifier;

		setMinMult(newMin);
		setMaxMult(newMax);
	});
</script>

<fieldset>
	<legend>Rating Modifiers</legend>

	<p>The quality of your ratings actually affects the payout you get:</p>

	<blockquote>
		Thoughtful ratings earn a 1.2× payout blessing. Spam or low-effort
		ratings will get your payout halved.
	</blockquote>

	<div>
		<input
			id="cursed"
			type="radio"
			name="rating"
			value={0.5}
			bind:group={ratingModifier}
		/>
		<label for="cursed">Cursed (0.5x)</label>
	</div>

	<div>
		<input
			id="normal"
			type="radio"
			name="rating"
			value={1}
			checked
			bind:group={ratingModifier}
		/>
		<label for="normal">Normal (1x)</label>
	</div>

	<div>
		<input
			id="blessed"
			type="radio"
			name="rating"
			value={1.2}
			bind:group={ratingModifier}
		/>
		<label for="blessed">Blessed (1.2x)</label>
	</div>
</fieldset>

<fieldset>
	<legend>Mult Range</legend>

	<p>
		<strong>Normal</strong>: the default mult range for the vast majority of
		projects is 1x-20x
	</p>

	<p>
		<strong>Viral</strong>: if your project
		<a href="https://stardance.hackclub.com/resources/virality_bonus"
			>goes viral</a
		>, the mult range becomes 20x-30x
	</p>

	<p>
		<strong>Classic</strong>: before
		<a
			href="https://hackclub.slack.com/archives/C0AR0M43H61/p1781719856522069"
			>they changed it</a
		>, the mult range used to be 0.3x-30x
	</p>

	<div>
		<input
			id="normal"
			type="radio"
			name="multRange"
			value="normal"
			checked
			bind:group={multRangeName}
		/>
		<label for="normal">Normal (1x to 20x)</label>
	</div>

	<div>
		<input
			id="viral"
			type="radio"
			name="multRange"
			value="viral"
			bind:group={multRangeName}
		/>
		<label for="viral">Viral (20x to 30x)</label>
	</div>

	<div>
		<input
			id="classic"
			type="radio"
			name="multRange"
			value="classic"
			bind:group={multRangeName}
		/>
		<label for="classic">Classic (0.3x to 30x)</label>
	</div>
</fieldset>
