<script lang="ts">
	interface Props {
		percentile: number;
		mult: number;

		minMult: number;
		maxMult: number;
		exponent: number;
		modifier: number;
	}

	let { percentile, mult, minMult, maxMult, exponent, modifier }: Props =
		$props();

	function round(num: number, pad: number = 10000): number {
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
					<mi>min</mi>
				</msub>
				<mo>+</mo>

				<mo>(</mo>

				<msub>
					<mi>m</mi>
					<mi>max</mi>
				</msub>
				<mo>-</mo>

				<msub>
					<mi>m</mi>
					<mi>min</mi>
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
				<mn>{minMult}</mn>

				<mo>+</mo>

				<mo>(</mo>

				<mn>{maxMult}</mn>
				<mo>-</mo>

				<mn>{minMult}</mn>
				<mo>)</mo>

				<msup>
					<mrow>
						<mo>(</mo>
						<mn><mark>{percentile}%</mark></mn>
						<mo>)</mo>
					</mrow>
					<mo>{exponent}</mo>
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
				<mn>{minMult}</mn>

				<mo>+</mo>

				<mn>{maxMult - minMult}</mn>

				<msup>
					<mrow>
						<mo>(</mo>
						<mn><mark>{percentile}%</mark></mn>
						<mo>)</mo>
					</mrow>
					<mo>{exponent}</mo>
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
				<mn>{minMult}</mn>

				<mo>+</mo>

				<mn>{maxMult - minMult}</mn>

				<mo>(</mo>
				<mn><mark>{round((percentile / 100) ** exponent)}</mark></mn>
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
				<mn>{minMult}</mn>

				<mo>+</mo>

				<mn
					><mark
						>{round(
							(maxMult - minMult) *
								(percentile / 100) ** exponent,
						)}</mark
					></mn
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
					><mark
						>{round(
							minMult +
								(maxMult - minMult) *
									(percentile / 100) ** exponent,
						)}</mark
					></mn
				>
			</mtd>
		</mtr>

		<mspace height="2rem" />

		<!-- defining the formula  -->
		<mtr>
			<mtd>
				<mi>percentile</mi>
			</mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mroot>
					<mfrac>
						<mrow>
							<mo>(</mo>
							<mi>mult</mi>
							<mo>-</mo>
							<msub>
								<mi>m</mi>
								<mi>min</mi>
							</msub>
							<mo>)</mo>
						</mrow>

						<mrow>
							<mo>(</mo>

							<msub>
								<mi>m</mi>
								<mi>max</mi>
							</msub>
							<mo>-</mo>

							<msub>
								<mi>m</mi>
								<mi>min</mi>
							</msub>
							<mo>)</mo>
						</mrow>
					</mfrac>
					<mi>exp</mi>
				</mroot>
			</mtd>
		</mtr>

		<!-- substituting stuff -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mroot>
					<mfrac>
						<mrow>
							<mo>(</mo>
							<mn><mark>{mult}</mark></mn>
							<mo>-</mo>
							<mn>{minMult}</mn>
							<mo>)</mo>
						</mrow>

						<mrow>
							<mo>(</mo>

							<mn>{maxMult}</mn>
							<mo>-</mo>

							<mn>{minMult}</mn>
							<mo>)</mo>
						</mrow>
					</mfrac>
					<mi>{exponent}</mi>
				</mroot>
			</mtd>
		</mtr>

		<!-- arithmetic -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mroot>
					<mfrac>
						<mn><mark>{mult - minMult}</mark></mn>
						<mn>{maxMult - minMult}</mn>
					</mfrac>
					<mi>{exponent}</mi>
				</mroot>
			</mtd>
		</mtr>

		<!-- again arithmetic -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mroot>
					<mn
						><mark
							>{round(
								(mult - minMult) / (maxMult - minMult),
							)}</mark
						></mn
					>
					<mi>{exponent}</mi>
				</mroot>
			</mtd>
		</mtr>

		<!-- answer! That was pretty easy -->
		<mtr>
			<mtd></mtd>

			<mtd>
				<mo>=</mo>
			</mtd>

			<mtd>
				<mn
					><mark
						>{round(
							((mult - minMult) / (maxMult - minMult)) **
								(1 / exponent) *
								100,
							100,
						)}%</mark
					></mn
				>
			</mtd>
		</mtr>
	</mtable>
</math>

<style>
	math {
		font-size: 1.5em;
	}

	/* to justify it and make it look nice */
	mtd:last-child {
		text-align: left;
	}
</style>
