<script>
	import RoundedButton from "$lib/components/buttons/roundedButton.svelte";
    import { PUBLIC_REDIRECT_URI } from "$env/static/public";

    function login() {
        window.location.replace(PUBLIC_REDIRECT_URI)
    }
</script>
<section class="grid justify-center items-center h-screen w-screen">
    <div class="group grid justify-center items-center h-[500px] w-[600px] relative">
        <div class={` rotate-45 p-5 bg-cyanAcc w-[80px] h-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] transition-all 
        group-hover:rotate-0 group-hover:w-[400px] group-hover:h-[200px] group-hover:rounded-[40px] group-hover:top-[85%]
        group-hover:shadow-large group-hover:bg-white`}>
        <div class=" opacity-0 group-hover:opacity-100 gap-3  flex flex-col items-center">
            <h2 class=" text-[80px]/[100px]">Login</h2>
            <RoundedButton name="with intra" on:click={login}/>
        </div>
        </div>
        <h1 class={` text-[80px] tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all
        group-hover:top-20 group-hover:text-[40px]`}>42 Gather</h1>
    </div>
</section>
