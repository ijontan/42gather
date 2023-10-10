<script>
	import EventItem from "$lib/components/eventItem.svelte";
	import EventList from "$lib/components/eventList.svelte";
	import HomeGreeting from "$lib/components/homeGreeting.svelte";
	import NewEvent from "$lib/components/newEvent.svelte";
	// @ts-ignore
	import EventData from "$lib/model/event";
	import UserData from "$lib/model/user";
	import { onMount } from "svelte";
	import userData from "../userData";
	import { api } from "$lib/api";
	import Clock from "$lib/components/clock.svelte";

    /** @type {UserData} */
    let user;

    userData.subscribe(value => {
        user = value ?? UserData.empty();
    })

    /** @type {EventData[]} */
    let joiningEventList = [];
    /** @type {EventData[]} */
    let suggestedEventList = [];

    onMount(async () => {
        try {
            const res = await api.get('/events/my');
            console.log(res.data)
            joiningEventList = res.data;
        } catch (error) {
            console.log(error)
        }
        try {   
            const res = await api.get('/events/suggested');
            console.log(res.data)
            suggestedEventList = res.data;
        } catch (error) {
            console.log(error)
        }
    })
</script>

<div class=" w-full h-[calc(100vh+300px)] flex flex-col p-12 overflow-visible justify-between">
    <HomeGreeting name={user.name}/>
    <div class="flex flex-col-reverse gap-7 pb-[300px]">
        <EventList title='Suggested' eventList={suggestedEventList}/>
        <EventList title='joining && upcoming' eventList={joiningEventList} joined/>
    </div>
    <NewEvent />
</div>

<Clock />