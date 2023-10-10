<script>
	import { RemindersType, TagsType } from "$lib/model/event";

	import ChipColored from "./chipColored.svelte";

    export let title = "";
    /** @type {number[]} */
    export let values = [];
    /** @type {number} */
    export let color;
    /** @type {boolean}*/
    export let notTag = false;
    /** @type {boolean}*/
    export let padding = false;

    $: options = values.map((v) => Object.keys(!notTag? TagsType : RemindersType)[v ?? 0]);
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class={`capitalize text-black/50 ${padding? "px-5" : ""}`}>{title}:</label>
    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <ChipColored name={option} {color} disabled />
        {/each}
    </div>
</div>