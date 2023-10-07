<script>
	import ChipsSelectors from "$lib/components/chips/chipsSelectors.svelte";
    import EventList from "$lib/components/eventList.svelte";
	import Textfield from "$lib/components/textfield.svelte";
	import { TagsType } from "$lib/model/event";

    /** @type {string[]} */
    let tagsOptions = Object.entries(TagsType).map(([key, value]) => key);
</script>

<div class=" px-12 py-10 w-full flex flex-col gap-7">
    <h1>Discover</h1>
    <div class="flex flex-col gap-2">
        <h3>Filter</h3>
        <div class="flex gap-20">
            <div class=" w-[400px]">
                <Textfield title='Search' />
            </div>
            <ChipsSelectors title='Tags' options={tagsOptions}/>
        </div>
    </div>
    <div class=" w-full flex flex-col-reverse gap-7 pb-[400px]">
        <EventList title='happening this Month'/>
        <EventList title='happening this Week'/>
        <EventList title='Happening today'/>
    </div>
</div>