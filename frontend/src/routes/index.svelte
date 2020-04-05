<script>
    let link = ""
    function submit(event) {
        console.log(link)
    }
</script>

<style>
    h1 {
        @apply font-bold;
    }
</style>

<svelte:head>
    <title>Shourl</title>
</svelte:head>

<h1 class="text-red-500 text-6xl text-center">Shourl</h1>
<form class="mt-4" on:submit|preventDefault={submit}>
    <div class="mb-4">
        <!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="link">Username</label> -->
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline"
            bind:value={link}
            id="link"
            type="text"
            placeholder="heckinglongurl.com" />
    </div>
    <div class="flex items-center justify-between">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
            focus:shadow-outline w-full"
            type="submit">
            Generate
        </button>
    </div>
</form>
