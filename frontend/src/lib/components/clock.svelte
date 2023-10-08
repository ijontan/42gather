<script>
	import { onMount } from "svelte";


    let time = new Date().toLocaleTimeString();

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date().toLocaleTimeString();
        }, 1000);

        return () => clearInterval(interval);
    });

</script>

<div class=" fixed top-10 right-72 translate-x-[100%]">
    <span class=" text-[50px]">{time}</span>
</div>


