<script>
	import Textfield from "$lib/components/textfield.svelte";

</script>
<section class="grid justify-center items-center h-screen w-screen">
    <div class="group grid justify-center items-center h-[500px] w-[600px] relative">
        <div class={` rotate-45 p-5 bg-cyanAcc w-[80px] h-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] transition-all 
        group-hover:rotate-0 group-hover:w-[400px] group-hover:h-[450px] group-hover:rounded-[40px] group-hover:top-[138%]
        group-hover:shadow-large group-hover:bg-white`}>
        <div class=" opacity-0 group-hover:opacity-100 gap-3  flex flex-col items-center">
            <h2 class=" text-[80px]/[100px] mb-5">Login</h2>
            <Textfield title="email"/>
            <Textfield title="password"/>
        </div>
        </div>
        <h1 class={` text-[80px] tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all
        group-hover:top-0 group-hover:text-[40px]`}>42 Gather</h1>
    </div>
</section>
