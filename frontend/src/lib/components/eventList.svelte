<script>
	// @ts-ignore
	import EventData from "$lib/model/event";
	import EventItem from "./eventItem.svelte";

    /** @type {string} */
    export let title;

    /** @type {number}*/
    let offset = 0;

    /** @type {EventData[]} */
    export let eventList = [];

    /** @param {*} e */
    function handleScroll(e) {
        e.preventDefault();
        let maxOffset = (eventList.length - 1) * 510;
        if (e.deltaY < 0 && offset > 0) {
            offset += e.deltaY;
            if (offset < 0) offset = 0;
        } else if (e.deltaY > 0 && offset < maxOffset) {
            offset += e.deltaY;
            if (offset > maxOffset) offset = maxOffset;
        }
    }

    /** @type {ResizeObserverSize[]} */
    let boxSize;

</script>

<div class="overflow-x-clip -mx-12 px-12">
    <h2 class=" capitalize">{title}</h2>
    <div class=' flex  gap-5 overflow-visible px-12 py-5 -mx-12 transition-transform'
        style={`transform: translateX(${-offset}px)`}
        bind:borderBoxSize={boxSize}
        on:wheel={handleScroll}
    >
        {#each eventList as item}
            <EventItem {item} />
        {/each}
    </div>
    <hr class=" border-t-2 border-black/20 -mr-12">
</div>

<style lang="postcss">

</style>