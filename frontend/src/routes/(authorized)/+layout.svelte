<script>
	import { page } from "$app/stores";
	import Logo from "$lib/components/sidebar/logo.svelte";
	import SidebarButton from "$lib/components/sidebar/sidebarButton.svelte";

    const currentDir = $page.route.id?.split('/')[2]
</script>

<div class="w-[300px] rounded-r-[100px] py-16 flex flex-col justify-between absolute top-0 left-0 h-screen shadow-large overflow-clip">
    <div class="flex flex-col">
        <Logo/>
        <SidebarButton name="Home" selected={currentDir === "home"}/>
        <SidebarButton name="Discover" selected={currentDir === "discover"}/>
    </div>
    <div class="flex flex-col">
        <SidebarButton name="Settings" selected={currentDir === "settings"}/>
        <SidebarButton name="Logout" />
    </div>
</div>
<div class=" pl-[300px]">
    <slot />
</div>