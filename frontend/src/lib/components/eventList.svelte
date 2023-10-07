<script>
	import EventData from "$lib/model/event";
	import EventItem from "./eventItem.svelte";

    /** @type {string} */
    export let title;

    /** @type {number}*/
    let offset = 0;

    /** @param {*} e */
    function handleScroll(e) {
        e.preventDefault();
        if (e.deltaY < 0 && offset > 0)
            offset += e.deltaY;
        else if (e.deltaY > 0 && offset < 1000) 
            offset += e.deltaY;
    }
</script>

<div class="overflow-x-clip -mx-12 px-12">
    <h2 class=" capitalize">{title}</h2>
    <div class=' flex  gap-5 overflow-visible px-12 py-5 -mx-12 transition-transform'
        style={`transform: translateX(${-offset}px)`}
        on:wheel={handleScroll}
    >
        <EventItem item={EventData.test()}/>
        <EventItem item={EventData.test()}/>
        <EventItem item={EventData.test()}/>
    </div>
    <hr class=" border-t-2 border-black/20 -mr-12">
</div>

<style lang="postcss">

</style>