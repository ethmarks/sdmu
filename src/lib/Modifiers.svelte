<script lang="ts">
	interface Props {
		setMinMult: (newMinMult: number) => void;
		setMaxMult: (newMaxMult: number) => void;
	}

	let { setMinMult, setMaxMult }: Props = $props();

	let ratingModifier: number = $state(1);

	const MULT_RANGE_MAP = {
		current: [1, 20] as [number, number],
		classic: [0.3, 30] as [number, number],
	} as const;
	type MultRangeName = keyof typeof MULT_RANGE_MAP;

	let multRangeName: MultRangeName = $state("current");

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

	<p>Did you know that the maximum mult used to be 30x?</p>

	<p>
		<a
			href="https://hackclub.slack.com/archives/C0AR0M43H61/p1781719856522069"
			>They changed it a few months ago</a
		> and they almost certainly aren't going to change it back, but it's interesting
		to see how things might have been if they didn't change it.
	</p>

	<div>
		<input
			id="current"
			type="radio"
			name="multRange"
			value="current"
			checked
			bind:group={multRangeName}
		/>
		<label for="current">Current (1x to 20x)</label>
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

<p>
	If your project is viral, you get a flat 30x regardless of how other people
	rate it, but rating modifiers (blessed and cursed) still apply.
</p>
