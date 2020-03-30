<script>
	import Nav from '../components/Nav.svelte';
	import Tailwindcss from '../components/Tailwindcss.svelte';

	export let segment;
</script>

<style>
</style>

<Tailwindcss />

<Nav {segment}/>

<main>
	<slot></slot>
</main>