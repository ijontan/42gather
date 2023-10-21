<script>
	import { api } from "$lib/api";
	import ChipsSelectors from "$lib/components/chips/chipsSelectors.svelte";
    import EventList from "$lib/components/eventList.svelte";
	import Textfield from "$lib/components/fields/textfield.svelte";
	import EventData, { TagsType } from "$lib/model/event";
	import { onMount } from "svelte";

    /** @type {string[]} */
    let tagsOptions = Object.entries(TagsType).map(([key, value]) => key);

    /** @type {EventData[]} */
    let todayEventList = [];
    /** @type {EventData[]} */
    let weekEventList = [];
    /** @type {EventData[]} */
    let monthEventList = [];

    /** @type {number[]} */
    let selectedTags = [];

    /** @type {string} */
    let filterString = '';
    onMount(async () => {
        try {
            const res = await api.get('/events/today');
            console.log(res.data)
            todayEventList = res.data;
        } catch (error) {
            console.log(error)
        }
        try {   
            const res = await api.get('/events/week');
            console.log(res.data)
            weekEventList = res.data;
        } catch (error) {
            console.log(error)
        }
        try {   
            const res = await api.get('/events/month');
            console.log(res.data)
            monthEventList = res.data;
        } catch (error) {
            console.log(error)
        }
    })
</script>

<div class=" px-12 py-10 w-full flex flex-col gap-7">
    <h1>Discover</h1>
    <div class="flex flex-col gap-2">
        <h3>Filter</h3>
        <div class="flex gap-20">
            <div class=" w-[400px]">
                <Textfield title='Search' bind:value={filterString} />
            </div>
            <ChipsSelectors title='Tags' options={tagsOptions} bind:result={selectedTags} />
        </div>
    </div>
    <div class=" w-full flex flex-col-reverse gap-7 pb-[400px]">
        <EventList title='happening this Month' eventList={monthEventList} filterTags={selectedTags} {filterString} />
        <EventList title='happening this Week' eventList={weekEventList} filterTags={selectedTags} {filterString} />
        <EventList title='Happening today' eventList={todayEventList} filterTags={selectedTags} {filterString} />
    </div>
</div>