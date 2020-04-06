<script>
    import Tailwindcss from "../components/Tailwindcss.svelte"
    // export let segment
</script>

<style lang="postcss">
    main {
        @apply relative bg-gray-100 h-full w-full mx-auto my-0;

        /* background-color: #21d4fd;
        background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%); */
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 200% 200%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
    }
    @-webkit-keyframes Gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @-moz-keyframes Gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes Gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>

<Tailwindcss />

<main>
    <slot />
</main>
