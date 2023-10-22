<script>
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";
	import { onMount } from "svelte";
    import { dev } from '$app/environment';
    import "./app.css"
	import { page } from "$app/stores";
	import Dialogs from "$lib/components/dialog/SnackBars.svelte";
    import Device from 'svelte-device-info'
    import { inject } from '@vercel/analytics';

    
    $: currentDir = $page.route.id?.split('/').pop()
    
    onMount(()=>{
        inject({ mode: dev ? 'development' : 'production' });
        if (Device.isMobile && currentDir !== "mobile") {
            setTimeout(() => goto('/mobile'), 0)
            return ;
        }
        checkAccessToken()
    })
    
    let code = $page.url.searchParams.get('code')

    async function checkAccessToken() {
        if (typeof window === 'undefined') return;
        if (code !== null) return;
        try {
            /** @type string */
            const data = await api.get('/auth')
            if (currentDir === 'login' || currentDir === '' || currentDir === undefined)
                goto('/home')
        } catch (error) {
            console.log(error)
            localStorage.removeItem('accessToken')
            goto('/login')
        }
    }
</script>

<slot/>

<Dialogs />