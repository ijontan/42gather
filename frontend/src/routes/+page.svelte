<script>
    import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { api } from "$lib/api";


    let code = $page.url.searchParams.get('code')

    $:authCheck(code)

    /**
     * 
     * @param {string | null} code 
     */
    async function authCheck(code) {
        if (typeof window === 'undefined') return;
        if (code === null)
            return setTimeout(()=>goto("login"), 0);
        try {
            /** @type string */
            const authToken = await api.post('auth', {code});
            localStorage.setItem('accessToken', authToken);
            window.location.replace('/')
        } catch (error) {
            console.log(error)    
        }
    }
</script>