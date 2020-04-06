<script>
    let link = ""
    let result = null
    import { linkLoading } from "../stores/ui.store"
    import Loader from "../components/Loading.svelte"
    async function submit(event) {
        if (!link) {
            console.log("link empty")
            return
        }
        try {
            console.log(link)
            linkLoading.update(l => !l)
            const res = await fetch("https://emoji-link-shortener.herokuapp.com/encode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ longUrl: link }),
            })
            const body = await res.json()
            result = decodeURI(body.data.encodedEmojis)
            link = "https://emoji-link-shortener.herokuapp.com/" + result
            copyToClipboard(link)
        } catch (error) {
            console.log(error)
        }
        linkLoading.update(l => !l)
    }

    function copyToClipboard(value) {
        const el = document.createElement("textarea")
        el.value = value
        el.setAttribute("readonly", "")
        el.style.position = "absolute"
        el.style.left = "-9999px"
        document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
    }
</script>

<style>
    header {
        @apply flex items-center justify-center;
        height: 40vh;
    }
</style>

<svelte:head>
    <title>🖇️</title>
</svelte:head>
<header class="header">
    <div class="py-4 px-8 rounded bg-gray-900 text-white">

        <h1 class="text-6xl">🖇️</h1>
        <p class="text-center text-gray-400">😄, 👨🏻‍💻, 💾</p>
    </div>
</header>

<form class="w-full max-w-xl mx-auto px-4 relative" on:submit|preventDefault={submit}>
    {#if $linkLoading}
        <div class=" absolute left-0 right-0" style="top: 8px;">
            <Loader />
        </div>
    {/if}
    <input
        readonly={result}
        class:border-green-500={result}
        class:opacity-50={$linkLoading}
        class="w-full rounded border shadow h-24 appearance-none py-2 px-3 text-gray-700 leading-tight
        focus:outline-none focus:shadow-outline"
        bind:value={link}
        id="link"
        type="text"
        placeholder="heckinglongurl.com" />

    {#if result}
        <button
            class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none
            focus:shadow-outline w-full mt-4"
            type="button"
            on:click={copyToClipboard(link)}>
            ➡️ 📋
        </button>
    {:else}
        <button
            class="bg-purple-700 hover:bg-purple-900 h-12 text-white font-bold py-2 px-4 rounded focus:outline-none
            focus:shadow-outline w-full mt-4 "
            type="submit">
            ➡️⬅️
        </button>
    {/if}
</form>
