<script>
	import Chip from "./chip.svelte";

    export let title = "";
    /** @type {string[]} */
    export let options = [];
    /** @type {boolean[]} */
    let selected = [];

    /** @type {number[]} */
    export let result = [];

    $: result = selected.map((value, index) => value ? index : -1).filter(value => value !== -1);

</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <div class="flex flex-wrap gap-2">
        {#each options as option, i}
            <Chip title={option} bind:selected={selected[i]} />
        {/each}
    </div>
</div>