<script>
	// @ts-ignore
	import EventData from "$lib/model/event";
	import EventItem from "./eventItem.svelte";

    /** @type {string} */
    export let title;

    /** @type {number[]} */
    export let filterTags = [];
    
    /** @type {string} */
    export let filterString = '';

    /** @type {number}*/
    let offset = 0;

    /** @type {boolean}*/
    export let joined = false;

    /** @type {EventData[]} */
    export let eventList = [];
    
    /** @type {EventData[]} */
    let filteredList = [];

    let widths = eventList.map(item => 0);

    $:filteredList = eventList.filter(item => {
        if (filterTags.length === 0) return true;
        return filterTags.some(tag => item.tags.includes(tag));
    });

    $: if (filterString.length > 0)filteredList = filteredList.filter(item => {
        if (filterString === '') return true;
        return item.title.toLowerCase().includes(filterString.toLowerCase());
    }); else filteredList = eventList.filter(item => {
        if (filterTags.length === 0) return true;
        return filterTags.some(tag => item.tags.includes(tag));
    });


    /** @type {number | null} */
    let throttleTimeout = null;
    /** @param {*} e */
    function handleScroll(e) {
        e.preventDefault();
        if (throttleTimeout !== null) return;
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null;
        }, 10);
        let maxOffset = widths.reduce((a, b) => a + b + 20, 0) - (widths.findLast(n=> true) ?? 0) - 20;
        console.log(maxOffset)
        if (e.deltaY < 0 && offset > 0) {
            offset += e.deltaY;
            if (offset < 0) offset = 0;
        } else if (e.deltaY > 0 && offset < maxOffset) {
            offset += e.deltaY;
            if (offset > maxOffset) offset = maxOffset;
        }
    }

    /** @param {*} e */
    function handleDrag(e){
        e.preventDefault();
        console.log(e)
    }
</script>

<div class="overflow-x-clip -mx-12 px-12"
>
    <h2 class=" capitalize">{title}</h2>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class=" w-full "
        on:wheel={handleScroll}
        on:drag={handleDrag}

    >
        <div class=' flex  gap-5 overflow-visible px-12 py-5 -mx-12 transition-transform'
        style={`transform: translateX(${-offset}px)`}
        >
        {#each filteredList as item, i}
        <EventItem {item} {joined} bind:width={widths[i]} />
        {/each}
        </div>
    </div>
    <hr class=" border-t-2 border-black/20 -mr-12">
</div>

<style lang="postcss">

</style>