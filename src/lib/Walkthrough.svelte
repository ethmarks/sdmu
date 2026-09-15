<script lang="ts">
	import Glow from "./Glow.svelte";

	const snippet1 = `
# This function implements the actual formula that this whole project is about
def dollars_per_hour_for_percentile(percentile)
  # See the next code block for an explanation of these
  low = game_constants.lowest_dollar_per_hour.to_f
  high = game_constants.highest_dollar_per_hour.to_f

  # This is the math part. It normalizes the percentile, applies the exponent
  # to make it a nonlinear curve, and then converts that normalized value to
  # between the minimum mult (aka low) and the maximum mult (aka high).
  # I have no idea where the 1.745427173 exponent comes from.
  low + (high - low) * ((percentile.to_f / 100.0).clamp(0.0, 1.0) ** 1.745427173)
end
`;

	const snippet2 = `
# These are the variables that control everything
shared:
  # Internally, stardust is called "tickets". This variable controls the
  # conversion ratio. At least, hypothetically. It's actually closer to 4
  # stardust per dollar for most shop items, though it varies.
  tickets_per_dollar: 5.0

  # This is used for the hour estimates in the shop
  dollars_per_mean_hour: 2.0

  # All three of these are completely unused
  min_quality_multiplier: 1.0
  mean_quality_multiplier: 10.0
  max_quality_multiplier: 30.0

  # These two are the ones used in the dollars_per_hour_for_percentile()
  # function you saw in the previous code block. That's actually the *only*
  # place where these are used.
  lowest_dollar_per_hour: 0.2
  highest_dollar_per_hour: 4.0

  # Completely unused
  sb_min_dollar_per_hour: 1.0
`;
</script>

<div>
	<p>
		<a
			href="https://github.com/hackclub/stardance/blob/main/app/models/post/ship_event/payouts.rb#L449-L453"
			>payouts.rb lines 449 to 453</a
		>
	</p>
	<Glow code={snippet1} opt={{ language: "ruby" }} />
</div>

<div>
	<p>
		<a
			href="https://github.com/hackclub/stardance/blob/main/config/game_constants.yml"
			>game_constants.yml</a
		>
	</p>
	<Glow code={snippet2} opt={{ language: "yaml" }} />
</div>

<style>
	p {
		margin: 0;
	}

	div {
		margin-block: 1rem;
	}
</style>
