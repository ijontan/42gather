<script>
	import EventList from "$lib/components/eventList.svelte";
</script>

<div class=" px-12 py-10 w-full flex flex-col-reverse gap-7 pb-[400px]">
    <EventList title='Happening today'/>
    <EventList title='happening this Week'/>
    <EventList title='happening this Month'/>
</div>