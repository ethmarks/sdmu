<script lang="ts">
	import { glow, type GlowOptions } from "nue-glow";

	interface Props {
		code: string;
		opt: GlowOptions;
	}

	let { code, opt }: Props = $props();
</script>

<pre class="glow">{@html glow(code, opt)}</pre>

<style>
	pre {
		background-color: transparent;
	}

	/*
		styles taken from one of my other projects:
		https://github.com/ethmarks/lume_nueglow
	*/
	:global {
		.glow {
			--glow-bg-color: #282c34;
			--glow-font-color: #abb2bf;
			--glow-primary-color: #61afef;
			--glow-secondary-color: #e5c07b;
			--glow-accent-color: #98c379;
			--glow-special-color: #c678dd;
			--glow-error-color: #f44747;
			--glow-base-color: #abb2bf;
			--glow-char-color: #d19a66;
			--glow-comment-color: #5c6370;
			--glow-counter-color: #4b5263;
			--glow-selected-color: #3e44517f;
		}

		.glow {
			background-color: var(--glow-bg-color);
			padding: var(--glow-padding);
			color: var(--glow-base-color);
			counter-reset: line-counter 0;
			font-family: monospace;
			line-height: 1.7;
		}
		.glow code * {
			font-weight: 400;
			font-style: inherit;
			text-decoration: inherit;
		}
		.glow b {
			color: var(--glow-primary-color);
		}
		.glow em {
			color: var(--glow-secondary-color);
		}
		.glow strong {
			color: var(--glow-accent-color);
		}
		.glow i {
			color: var(--glow-char-color);
		}
		.glow u {
			text-decoration: underline wavy var(--glow-error-color);
			text-underline-offset: 0.5em;
			text-decoration-thickness: 0.15em;
		}
		.glow sup {
			color: var(--glow-comment-color);
			font-size: inherit;
			vertical-align: inherit;
			font-style: italic;
		}
		.glow label {
			color: var(--glow-special-color);
			font-weight: 700;
		}
		.glow mark {
			color: unset;
			background-color: var(--glow-selected-color);
			border-radius: 0.2em;
			margin: -0.3em -0.4em;
			padding: 0.3em 0.4em;
		}
		.glow span {
			counter-increment: line-counter 1;
		}
		.glow span:before {
			color: var(--glow-counter-color);
			content: counter(line-counter);
			text-align: right;
			width: 2.5em;
			margin-right: 1em;
			padding-right: 1em;
			display: inline-block;
		}
		.glow span:has(u):before {
			background-color: var(--glow-error-color);
			color: #fff;
			border-radius: 0.2em;
			font-weight: 700;
		}
		.glow {
			--glow-line-color: 50, 180, 250;
			--glow-del-color: 250, 110, 130;
			--glow-ins-color: 50, 210, 190;
			--glow-line-opacity: 0.15;
			--glow-padding: 1em;
		}
		.glow ins,
		.glow del,
		.glow dfn {
			min-width: calc(100% + calc(var(--glow-padding) * 2));
			border-left: 0.2em solid #fff;
			width: 100%;
			display: inline-block;
			position: relative;
		}
		:is(.glow ins, .glow del, .glow dfn) :first-child {
			margin-left: -0.2em;
		}
		:is(.glow ins, .glow del, .glow dfn):before {
			left: calc(var(--glow-padding) + 2em);
			position: absolute;
		}
		span :is(.glow ins, .glow del, .glow dfn) {
			margin-left: calc(-3.7em - var(--glow-padding));
			padding-left: calc(3.5em + var(--glow-padding));
		}
		.glow ins {
			border-color: rgb(var(--glow-ins-color));
			background-color: rgba(
				var(--glow-ins-color),
				var(--glow-line-opacity)
			);
		}
		.glow ins:before {
			content: "+";
			color: rgb(var(--glow-ins-color));
		}
		.glow del {
			border-color: rgb(var(--glow-del-color));
			background-color: rgba(
				var(--glow-del-color),
				var(--glow-line-opacity)
			);
			border-radius: 0;
		}
		.glow del:before {
			content: "-";
			color: rgb(var(--glow-del-color));
		}
		.glow dfn {
			border-color: rgb(var(--glow-line-color));
			background-color: rgba(
				var(--glow-line-color),
				var(--glow-line-opacity)
			);
		}
	}
</style>
