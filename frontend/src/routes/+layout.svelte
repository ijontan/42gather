<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
    import "./app.css"


    let code = $page.url.searchParams.get('code')

    $:authCheck(code)

    /**
     * 
     * @param {string | null} code 
     */
    function authCheck(code){
        if (typeof window === 'undefined') return;
        if (code === null)
            setTimeout(()=>goto("login"), 0);

    }
</script>

<slot/>