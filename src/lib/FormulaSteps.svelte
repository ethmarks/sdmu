<script lang="ts">
	import { DEFAULT_MAGIC_EXPONENT } from "./formula";

	interface Props {
		percentile: number;
		mult: number;
	}

	let { percentile, mult }: Props = $props();

	const multLow = 1;
	const multHigh = 20;
	const exp = DEFAULT_MAGIC_EXPONENT;

	function round(num: number): number {
		const pad = 10000;

		return Math.round(num * pad) / pad;
	}
</script>

<math display="block">
	<mtable>
		<!-- defining the formula  -->
		<mtr>
			<mtd>
				<mi>mult</mi>
			</mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<msub>
					<mi>m</mi>
					<mi>low</mi>
				</msub>
				<mo>+</mo>

				<mo>(</mo>

				<msub>
					<mi>m</mi>
					<mi>high</mi>
				</msub>
				<mo>-</mo>

				<msub>
					<mi>m</mi>
					<mi>low</mi>
				</msub>
				<mo>)</mo>

				<msup>
					<mrow>
						<mo>(</mo>
						<mi>percentile</mi>
						<mo>)</mo>
					</mrow>
					<mo>exp</mo>
				</msup>
			</mtd>
		</mtr>

		<!-- substituting stuff -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn>{multLow}</mn>

				<mo>+</mo>

				<mo>(</mo>

				<mn>{multHigh}</mn>
				<mo>-</mo>

				<mn>{multLow}</mn>
				<mo>)</mo>

				<msup>
					<mrow>
						<mo>(</mo>
						<mn>{percentile}%</mn>
						<mo>)</mo>
					</mrow>
					<mo>{exp}</mo>
				</msup>
			</mtd>
		</mtr>

		<!-- arithmetic -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn>{multLow}</mn>

				<mo>+</mo>

				<mn>{multHigh - multLow}</mn>

				<msup>
					<mrow>
						<mo>(</mo>
						<mn>{percentile}%</mn>
						<mo>)</mo>
					</mrow>
					<mo>{exp}</mo>
				</msup>
			</mtd>
		</mtr>

		<!-- more arithmetic -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn>{multLow}</mn>

				<mo>+</mo>

				<mn>{multHigh - multLow}</mn>

				<mo>(</mo>
				<mn>{round(percentile / 100 ** exp)}</mn>
				<mo>)</mo>
			</mtd>
		</mtr>

		<!-- omg more arithmetic -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn>{multLow}</mn>

				<mo>+</mo>

				<mn
					>{round(
						(multHigh - multLow) * (percentile / 100) ** exp,
					)}</mn
				>
			</mtd>
		</mtr>

		<!-- finally, the answer -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn
					>{round(
						multLow +
							(multHigh - multLow) * (percentile / 100) ** exp,
					)}</mn
				>
			</mtd>
		</mtr>
	</mtable>
</math>

<style>
	math {
		font-size: 1.5em;
	}
</style>
