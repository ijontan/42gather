<script>
	import { TagsType } from "$lib/model/event";

	import ChipColored from "./chipColored.svelte";

    export let title = "";
    /** @type {number[]} */
    export let values = [];
    /** @type {number} */
    export let color;

    $: options = values.map((v) => Object.keys(TagsType)[v]);
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="capitalize text-black/50">{title}:</label>
    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <ChipColored name={option} {color} disabled />
        {/each}
    </div>
</div>