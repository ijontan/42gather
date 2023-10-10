<script>
	import { onMount } from "svelte";


    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date().toLocaleTimeString();
            date = new Date().toLocaleString().split(',')[0];
        }, 1000);

        return () => clearInterval(interval);
    });

</script>

<div class=" fixed top-10 left-[350px] flex flex-col">
    <span class=" text-[25px]">{date}</span>
    <span class=" text-[50px] leading-[40px] ">{time}</span>
</div>


