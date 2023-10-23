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
    import Device from 'svelte-device-info'


    /** @type {UserData} */
    let user;

    userData.subscribe(value => {
        user = value ?? UserData.empty();
    })

    /** @type {boolean} */
    let isMobile = false;

    /** @type {EventData[]} */
    let joiningEventList = [];
    /** @type {EventData[]} */
    let suggestedEventList = [];

    onMount(async () => {
        isMobile = Device.isMobile;
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

<div class={` w-full  flex flex-col ${isMobile?"p-4 h-[calc(100vh-160px)]":"p-12 h-[calc(100vh+320px)]"} overflow-visible justify-between`}>
    <div class={`h-full flex ${isMobile? "flex-col gap-2 items-center" : ""}`}>
        {#if !isMobile}
        <Clock />
        {/if}
        <HomeGreeting name={user.name}/>
    </div>
    <div class={"flex flex-col-reverse gap-7 lg:pb-[320px]"}>
        <EventList title='Suggested' eventList={suggestedEventList}/>
        <EventList title='joining && upcoming' eventList={joiningEventList} joined/>
    </div>
    <NewEvent />
</div>
