<script lang="ts">
	import favicon from "$lib/assets/favicon.ico";
	import screenshot from "$lib/assets/screenshot.png";

	let { children } = $props();

	const title = "Stardance Mult Utility";
	const desc =
		"Tools to visualize and explore the formula that Stardance uses to calculate project multipliers.";
	const url = "https://ethmarks.github.io/sdmu/";
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css"
	/>

	<title>{title}</title>
	<meta name="description" content={desc} />
	<link rel="canonical" href={url} />
	<link rel="icon" href={favicon} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={screenshot} />
</svelte:head>

<header>
	<nav>
		<a href="#top">Home</a>
		<a href="#graph">Graph</a>
		<a href="#calc">Calculator</a>
		<a href="#modifiers">Modifiers</a>
		<a href="#hours">Hours</a>
		<a href="#formula">Formula</a>
		<a href="#walkthrough">Walkthrough</a>
		<a href="https://github.com/ethmarks/sdmu">Source</a>
	</nav>
</header>

<main id="top">
	{@render children()}
</main>

<footer>By <a href="https://github.com/ethmarks">Ethan Marks</a></footer>

<style>
	footer {
		margin-top: 40px;
		text-align: center;
	}

	:global(nav) {
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
