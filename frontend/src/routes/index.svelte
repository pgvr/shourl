<script>
    let link = ""
    let result = null
    import { linkLoading } from "../stores/ui.store"
    function submit(event) {
        console.log(link)
        linkLoading.update(l => !l)
        setTimeout(() => {
            linkLoading.update(l => !l)
            result = true
        }, 2000)
    }
</script>

<svelte:head>
    <title>Shourl</title>
</svelte:head>

<h1 class="text-red-500 text-6xl text-center">Shourl</h1>
<form class="mt-4" on:submit|preventDefault={submit}>
    <div class="flex flex-wrap flex-col md:flex-row">
        <!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="link">Username</label> -->
        <input
            readonly={result}
            class:border-green-500={result}
            class="w-full md:w-auto md:flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline"
            bind:value={link}
            id="link"
            type="text"
            placeholder="heckinglongurl.com" />
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
            focus:shadow-outline md:ml-4 w-full md:w-auto mt-4 md:mt-0 md:flex-shrink-0"
            type="submit">
            Shorten
        </button>
    </div>
    {#if $linkLoading}
        <div>Loading...</div>
    {/if}
</form>
