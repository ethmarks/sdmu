const DEFAULT_LOWEST_MULT = 1;
const DEFAULT_HIGHEST_MULT = 20;

/**
 * I have no idea where this came from. It's just hardcoded into the formula on
 * line 452 of payouts.rb
 */
const DEFAULT_MAGIC_EXPONENT = 1.745427173;

export function percentileToMult(
	/** 0-100, NOT 0-1 */
	percentile: number,

	lowestMult = DEFAULT_LOWEST_MULT,
	highestMult = DEFAULT_HIGHEST_MULT,

	exponent = DEFAULT_MAGIC_EXPONENT,
): number {
	if (percentile > 100 || percentile < 0)
		throw new Error(
			`percentile must be between 0 and 100, but was ${percentile}`,
		);

	const normalizedPercentile = percentile / 100;
	const factor = normalizedPercentile ** exponent;

	const deltaMult = highestMult - lowestMult;

	return lowestMult + deltaMult * factor;
}
