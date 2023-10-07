<script>
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";
	import { onMount } from "svelte";
    import "./app.css"
    
    onMount(()=>{
        checkAccessToken()
    })

    async function checkAccessToken() {
        if (typeof window === 'undefined') return;
        if (!localStorage.getItem('accessToken')) return;
        try {
            /** @type string */
            const data = await api.get('/auth')
            goto('home')
        } catch (error) {
            console.log(error)
            localStorage.removeItem('accessToken')
            goto('login')
        }
    }
</script>

<slot/>