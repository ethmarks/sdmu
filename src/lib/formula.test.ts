import { describe, expect, it } from "vitest";
import { percentileToMult } from "./formula";

interface Answers {
	0: number;
	50: number;
	100: number;
}

interface TestCase {
	name: string;
	modifier: number;
	minMult: number;
	maxMult: number;
	answers: Answers;
}

const tests: TestCase[] = [
	{
		name: "normal",
		answers: { 0: 1, 100: 20, 50: 6.67 },
		modifier: 1,
		minMult: 1,
		maxMult: 20,
	},
	{
		name: "blessed",
		answers: { 0: 1.2, 100: 24, 50: 8 },
		modifier: 1.2,
		minMult: 1,
		maxMult: 20,
	},
	{
		name: "cursed",
		answers: { 0: 0.5, 100: 10, 50: 3.33 },
		modifier: 0.5,
		minMult: 1,
		maxMult: 20,
	},
	{
		name: "classic",
		answers: { 0: 0.3, 100: 30, 50: 9.16 },
		modifier: 1,
		minMult: 0.3,
		maxMult: 30,
	},
];

describe("Formula", () => {
	it("should run without errors", () => {
		expect(() => percentileToMult(50)).not.toThrow;
	});

	describe.each<TestCase>(tests)(
		"$name",
		({ name, answers, modifier, minMult, maxMult }) => {
			const formula = (percentile: number) =>
				percentileToMult(percentile, modifier, minMult, maxMult);

			it.each(Object.entries(answers))(
				"%dth percentile should be %dx",
				(percentile, mult) => {
					expect(formula(Number(percentile))).toBeCloseTo(mult);
				},
			);
		},
	);
});
