<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Logo from "$lib/components/sidebar/logo.svelte";
	import SidebarButton from "$lib/components/sidebar/sidebarButton.svelte";
	import { onMount } from "svelte";
	import userData from "./userData";
	import { api } from "$lib/api";
	import DialogDelegate, { DialogType } from "$lib/components/dialog/snackBar";
    import Device from 'svelte-device-info'

    $: currentDir = $page.route.id?.split('/')[2]

    /** @type {boolean} */
    let isMobile = false;

    onMount(() => {
        isMobile = Device.isMobile;
        getProfile(); 
    })

    async function getProfile() {
        const res = await api.get('/user')
        DialogDelegate.show(DialogType.warning, "WARNING", "THIS IS A OPEN BETA, DONT MAKE A FUSS ABOUT UI ELEMENT BREAKING.", 500000)
        if (res.data.discordID === null) DialogDelegate.show(DialogType.warning, "Account", "Link your discord account in profile to get notified for events", 50000)
        DialogDelegate.show(DialogType.warning, "Announcement", "Anything related to Discord is not working yet, need to invite the bot into 42 discord server.", 500000)
        userData.set(res.data)
    }

    function logout() {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
    }
</script>

{#if !isMobile}
<div class={`w-[300px] rounded-r-[100px] py-16 flex flex-col justify-between hidden lg:block fixed top-0 left-0 h-screen shadow-large overflow-clip z-50 `}>
    <div class="flex flex-col">
        <Logo/>
        <SidebarButton name="Home" selected={currentDir === "home"} on:click={()=>goto('/home')}/>
        <SidebarButton name="Discover" selected={currentDir === "discover"} on:click={()=>goto('/discover')}/>
        <!-- <SidebarButton name="Admin" selected={currentDir === "admin"} on:click={()=>goto('/admin')}/> -->
        <!-- <SidebarButton name="Calendar" selected={currentDir === "calendar"} on:click={()=>goto('/calendar')}/> -->
    </div>
    <div class="flex flex-col">
        <SidebarButton name="Profile" selected={currentDir === "profile"} on:click={()=>goto('/profile')}/>
        <SidebarButton name="Logout" on:click={logout} />
    </div>
</div>
{:else}
    <div class=" fixed top-0 left-0 right-0 bg-white shadow-medium h-20 z-50">
        {#if currentDir !== "home"}
        <div class=" fixed top-3 left-3">
            <button class="material-icons text-2xl rounded-full h-14 w-14 " on:click={()=>window.history.go(-1)}>arrow_back</button>
        </div>
        {/if}
        <div class="flex justify-center items-center h-full pt-4">
            <Logo/>
        </div>
    </div>
    <div class=" fixed bottom-0 left-0 right-0 bg-white shadow-heavy h-20 z-50">
        
    </div>
{/if}
<div class={"relative pt-20 pb-20 lg:pt-0 lg:pb-0 lg:block lg:pl-[300px]"}>
    <slot />
</div>
<!-- <i class="material-icons">home</i> -->
