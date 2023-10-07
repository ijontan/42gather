<script>
	import EventItem from "$lib/components/eventItem.svelte";
	import EventList from "$lib/components/eventList.svelte";
	import HomeGreeting from "$lib/components/homeGreeting.svelte";
	import EventData from "$lib/model/event";

</script>

<div class=" w-full h-[calc(100vh+400px)] flex flex-col p-12 overflow-visible justify-between">
    <HomeGreeting name="Ijon Tan"/>
    <div class="flex flex-col-reverse gap-7 pb-[400px]">
        <EventList title='Suggested'/>
        <EventList title='joining && upcoming'/>
    </div>
</div>