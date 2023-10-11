<script>
    // @ts-ignore
    import UserData from "$lib/model/user";
    import MyButton from "./buttons/myButton.svelte";

    /** @type {UserData} */
    export let user;
</script>

<div class="flex flex-row items-center gap-5 py-2 justify-between">
    <div class="flex flex-row items-center gap-5 ">
        <img src={user.imageLink} alt="avatar" class="w-16 h-16 bg-auto bg-center rounded-full"/>
        <p class="text-black/80 text-[25px]">{user.name} 
            (<a href={'https://profile.intra.42.fr/users/' + user.intraName} class=" text-blueAcc" target="_blank">{user.intraName}</a>)
        </p>
    </div>
    {#if user.discordID}
        <MyButton name="Discord" color={3} on:click={()=>{
            window.open('https://discordapp.com/users/' + user.discordID, '_blank')
        }}/>
    {/if}
</div>
<hr class=" border-black/10"/>