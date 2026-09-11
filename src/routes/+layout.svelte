<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css"
	/>
</svelte:head>

{@render children()}
