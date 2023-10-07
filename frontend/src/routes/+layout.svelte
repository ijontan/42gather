<script>
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";
	import { onMount } from "svelte";
    import "./app.css"
	import { page } from "$app/stores";
    
    onMount(()=>{
        checkAccessToken()
    })

    let code = $page.url.searchParams.get('code')

    async function checkAccessToken() {
        if (typeof window === 'undefined') return;
        if (code !== null) return;
        try {
            /** @type string */
            // const data = await api.get('/auth')
            goto('home')
        } catch (error) {
            console.log(error)
            localStorage.removeItem('accessToken')
            goto('login')
        }
    }
</script>

<slot/>