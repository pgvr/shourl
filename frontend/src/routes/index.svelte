<style lang="postcss">
	.button {
		@apply flex-shrink-0 bg-teal-500 border-teal-500 text-sm border-4 text-white py-2 px-4 rounded content-center;
	}
	.button:hover {
		@apply border-teal-700 bg-teal-700;
	}
	.input {
		@apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight;
	}
	.input:focus {
		@apply outline-none border-gray-300 bg-white;
	}

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>


<h1 class="text-2xl md:text-6xl underline md:p8 p-4 text-center mb-4">Cooler Name!</h1>

<form class="w-full max-w-ml" on:submit|preventDefault={submit}>
  <div class="flex items-center md:flex-row flex-col">
    <input class="input md:mr-5 md:mb-0 mb-5" bind:value={url} type="text" placeholder="Your Link">
    <button class="button md:w-auto w-full" type="submit">Shorten</button>
  </div>
</form>

<script>
let url = ""
function submit(event) {
	console.log(url)
	// validate maybe
	// send url to smiley encoder
	// put in db
}
</script>