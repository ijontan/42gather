<script>
	import { api } from "$lib/api";
	import { onMount } from "svelte";
	import DiscordButton from "../../profile/discordButton.svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
    // @ts-ignore
    import UserData from "$lib/model/user";
	import EventList from "$lib/components/eventList.svelte";
	import MyButton from "$lib/components/buttons/myButton.svelte";

    let id = $page.params.id;

    /** @type {UserData} */
    let user = UserData.empty();

    let code = $page.url.searchParams.get('code')

    onMount(()=>{
        if (typeof window === 'undefined') return;
        postDiscordCode();
        getUserHistory();
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
        /** @type {*} */
        let res = await api.get('user/id/' + id);
        user = res.data;
        console.log(user)
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
    </div>
    {#if user.discordID}
        <MyButton name="Discord" color={3} on:click={()=>{
            window.open('https://discordapp.com/users/' + user.discordID, '_blank')
        }}/>
    {/if}
    <EventList title="Joined Events" joined={true} eventList={user? user.allEvents: []} />
</div>
