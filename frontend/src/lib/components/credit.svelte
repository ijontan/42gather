<script>
    export let animate = false;

    $: {
        if (animate) {
            setTimeout(() => {
                animate = false;
            }, 3000);
        }
    }
</script>

<div class={`fixed left-1/2 -translate-x-1/2 ${animate?" top-0 " : " -top-28"} rounded-b-[30px] px-10 py-5 bg-white shadow-large transition-all duration-700`}>
    <p>
        <span class="text-[50px]">🎉</span>
        <span class="text-[50px]">🎉</span>
        credits to: 
        <span class=" text-blueAcc text-[30px]">Ze Hao</span>, 
        <span class=" text-[#0ab5af] text-[30px]">Daryl</span>, and
        <span class=" text-greenAcc text-[30px]">Ijon</span>.
        <span class="text-[50px]">🎉</span>
        <span class="text-[50px]">🎉</span>
    </p>
</div>
