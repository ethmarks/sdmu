import { describe, expect, it } from "vitest";
import { percentileToMult } from "./formula";

describe("Formula", () => {
	it("should run without errors", () => {
		expect(() => percentileToMult(50)).not.toThrow;
	});

	describe("regular", () => {
		const formula = percentileToMult;

		it("should be 1x for 0th percentile", () => {
			expect(formula).toBe(1);
		});
		it("should be 20x for 100th percentile", () => {
			expect(formula).toBe(20);
		});
		it("should be ~6.67x for 50th percentile", () => {
			expect(formula).toBeCloseTo(6.67);
		});
	});

	describe("blessed", () => {
		const formula = (percentile: number) => percentileToMult(percentile, 1.2);

		it("should be 1.2x for 0th percentile", () => {
			expect(formula(0)).toBeCloseTo(1.2);
		});
		it("should be 24x for 100th percentile", () => {
			expect(formula(100)).toBe(24);
		});
		it("should be ~8x for 50th percentile", () => {
			expect(formula(50)).toBeCloseTo(8);
		});
	});

	describe("cursed", () => {
		const formula = (percentile: number) => percentileToMult(percentile, 0.5);

		it("should be 0.5x for 0th percentile", () => {
			expect(formula(0)).toBeCloseTo(0.5);
		});
		it("should be 10x for 100th percentile", () => {
			expect(formula(100)).toBe(10);
		});
		it("should be ~3.33x for 50th percentile", () => {
			expect(formula(50)).toBeCloseTo(3.33);
		});
	});

	describe("30x max mult", () => {
		const formula = (percentile: number) =>
			percentileToMult(percentile, 1, 0.3, 30);

		it("should be 1x for 0th percentile", () => {
			expect(formula(0)).toBe(0.3);
		});
		it("should be 30x for 100th percentile", () => {
			expect(formula(100)).toBe(30);
		});
		it("should be ~9.16x for 50th percentile", () => {
			expect(formula(50)).toBeCloseTo(9.16);
		});
	});
});
