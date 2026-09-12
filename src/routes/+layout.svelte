<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css"
	/>
	<title>Stardance Mult Utility</title>
</svelte:head>

<header>
	<nav>
		<a href="#top">Home</a>
		<a href="#graph">Graph</a>
		<a href="#calc">Calculator</a>
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
</style>
