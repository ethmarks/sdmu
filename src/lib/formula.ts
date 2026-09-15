export const DEFAULT_MIN_MULT = 1;
export const DEFAULT_MAX_MULT = 20;

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

	minMult = DEFAULT_MIN_MULT,
	maxMult = DEFAULT_MAX_MULT,

	exponent = DEFAULT_MAGIC_EXPONENT,
): number {
	if (percentile > 100 || percentile < 0) {
		throw new Error(
			`percentile must be between 0 and 100, but was ${percentile}`,
		);
	}

	const normalizedPercentile = percentile / 100;
	const factor = normalizedPercentile ** exponent;

	const deltaMult = maxMult - minMult;

	return minMult + deltaMult * factor;
}

/**
 * Mathematical inverse of {@link percentileToMult}
 */
export function multToPercentile(
	mult: number,

	minMult = DEFAULT_MIN_MULT,
	maxMult = DEFAULT_MAX_MULT,

	exponent = DEFAULT_MAGIC_EXPONENT,
): number {
	if (mult > maxMult) {
		throw new Error(
			`mult must be less than or equal to max mult, but mult was ${mult} and max mult was ${maxMult}`,
		);
	}
	if (mult < minMult) {
		throw new Error(
			`mult must be greater than or equal to min mult, but mult was ${mult} and min mult was ${minMult}`,
		);
	}

	const deltaMult = maxMult - minMult;
	const factor = (mult - minMult) / deltaMult;

	const normalizedPercentile = factor ** (1 / exponent);

	return normalizedPercentile * 100;
}
