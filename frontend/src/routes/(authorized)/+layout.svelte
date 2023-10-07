<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Logo from "$lib/components/sidebar/logo.svelte";
	import SidebarButton from "$lib/components/sidebar/sidebarButton.svelte";
	import { onMount } from "svelte";
	import userData from "./userData";
	import { api } from "$lib/api";

    $: currentDir = $page.route.id?.split('/')[2]

    onMount(() => {
        getProfile(); 
    })

    async function getProfile() {
        const res = await api.get('/user')
        userData.set(res.data)
    }

    function logout() {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
    }
</script>

<div class="w-[300px] rounded-r-[100px] py-16 flex flex-col justify-between fixed top-0 left-0 h-screen shadow-large overflow-clip z-50">
    <div class="flex flex-col">
        <Logo/>
        <SidebarButton name="Home" selected={currentDir === "home"} on:click={()=>goto('/home')}/>
        <SidebarButton name="Discover" selected={currentDir === "discover"} on:click={()=>goto('/discover')}/>
    </div>
    <div class="flex flex-col">
        <SidebarButton name="Profile" selected={currentDir === "profile"} on:click={()=>goto('/profile')}/>
        <SidebarButton name="Logout" on:click={logout} />
    </div>
</div>
<div class=" pl-[300px]">
    <slot />
</div>