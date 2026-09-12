const DEFAULT_LOWEST_MULT = 1;
const DEFAULT_HIGHEST_MULT = 20;

/**
 * I have no idea where this came from. It's just hardcoded into the formula on
 * line 452 of payouts.rb
 */
export const DEFAULT_MAGIC_EXPONENT = 1.745427173;

/**
 * Based on `dollars_per_hour_for_percentile` in payouts.rb
 */
export function percentileToMult(
	/** 0-100, NOT 0-1 */
	percentile: number,

	/** For blessed and cursed modifiers */
	modifier: number = 1,

	lowestMult = DEFAULT_LOWEST_MULT,
	highestMult = DEFAULT_HIGHEST_MULT,

	exponent = DEFAULT_MAGIC_EXPONENT,
): number {
	if (percentile > 100 || percentile < 0) {
		throw new Error(
			`percentile must be between 0 and 100, but was ${percentile}`,
		);
	}

	const normalizedPercentile = percentile / 100;
	const factor = normalizedPercentile ** exponent;

	const deltaMult = highestMult - lowestMult;

	const raw = lowestMult + deltaMult * factor;

	return raw * modifier;
}

/**
 * Mathematical inverse of {@link percentileToMult}
 */
export function multToPercentile(
	mult: number,

	/** For blessed and cursed modifiers */
	modifier: number = 1,

	lowestMult = DEFAULT_LOWEST_MULT,
	highestMult = DEFAULT_HIGHEST_MULT,

	exponent = DEFAULT_MAGIC_EXPONENT,
): number {
	const raw = mult / modifier;

	if (raw > highestMult) {
		throw new Error(
			`mult must be less than or equal to highest mult, but mult was ${raw} and highest mult was ${highestMult}`,
		);
	}
	if (raw < lowestMult) {
		throw new Error(
			`mult must be greater than or equal to lowest mult, but mult was ${raw} and lowest mult was ${lowestMult}`,
		);
	}

	const deltaMult = highestMult - lowestMult;
	const factor = (raw - lowestMult) / deltaMult;

	const normalizedPercentile = factor ** (1 / exponent);

	return normalizedPercentile * 100;
}
