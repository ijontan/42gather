<script>
	import { api } from "$lib/api";
	import { onMount } from "svelte";
	import DiscordButton from "./discordButton.svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
    // @ts-ignore
    import UserData from "$lib/model/user";
	import userData from "../userData";
	import EventList from "$lib/components/eventList.svelte";

    /** @type {UserData} */
    let user;
    /** @type {UserData} */
    let userHistory;

    userData.subscribe(value => {
        user = value ?? UserData.empty();
        getUserHistory();
    })
    let code = $page.url.searchParams.get('code')

    onMount(()=>{
        if (typeof window === 'undefined') return;
        postDiscordCode();
    })

    async function postDiscordCode() {
        if (code !== null){
            try {
                console.log(code)
                const authToken = await api.post('user/discord', {code});
                goto('/profile')
            } catch (error) {
                console.log(error)
                goto('/profile')
            }
        }
    }
    
    async function getUserHistory() {
        if (user.id === null || user.id === undefined) return;
        /** @type {*} */
        let res = await api.get('user/id/' + user.id);
        userHistory = res.data;
        console.log(userHistory)
    }
</script>

<div class=" w-full h-screen flex flex-col mt-20 justify-center gap-5 px-12 mb-[500px]">
    <div class="flex flex-col gap-5 self-center">
        <div class=" w-[500px] shadow-large rounded-[30px] overflow-clip flex flex-col">
            <img src={user.imageLink} alt="Profile Icon" class=" aspect-square object-cover">
            <div class="p-10">
                <h2>{user.name} (<span>{user.intraName}</span>)</h2>
            </div>
        </div>
        <DiscordButton connected={user.discordID !== null}/>
    </div>
    <EventList title="Joined Events" joined={true} eventList={userHistory? userHistory.allEvents: []} />
</div>
