<script>
    import Tailwindcss from "../components/Tailwindcss.svelte"
    // export let segment
</script>

<style lang="postcss">
    main {
        @apply relative max-w-4xl bg-white p-8 mx-auto my-0;
    }
</style>

<Tailwindcss />

<main>
    <slot />
</main>
