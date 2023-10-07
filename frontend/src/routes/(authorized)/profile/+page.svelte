<script>
	import { api } from "$lib/api";
	import { onMount } from "svelte";
    import UserData from "$lib/model/user";
	import DiscordButton from "./discordButton.svelte";

    
    /** @type {UserData}*/
    let userData = new UserData( 
        {
            name: "Loading...",
            intraID: "Loading...",
            imageLink: "",
        }
    );

    onMount(()=>{
        if (typeof window === 'undefined') return;
        getUserData();
    })

    async function getUserData() {
        try {
            /** @type {*} */
            const res = await api.get('/user')
            userData = res.data
            console.log(userData)
        } catch (error) {
            console.log(error)
        }
    }
</script>

<div class=" w-full h-screen grid justify-center items-center">
    <div class="flex flex-col gap-5">
        <div class=" w-[500px] shadow-large rounded-[30px] overflow-clip flex flex-col">
            <img src={userData.imageLink} alt="Profile Icon" class=" aspect-square object-cover">
            <div class="p-10">
                <h2>{userData.name} (<span>{userData.intraID}</span>)</h2>
            </div>
        </div>
        <DiscordButton/>
    </div>
</div>
