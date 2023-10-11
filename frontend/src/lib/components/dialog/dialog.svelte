<script>
    export let show = false;
    let hidden = false;
    let display = false;

    $:show, animate();

    function animate(){
        if (show){
            hidden = true;
            setTimeout(() => {
                display = true;
            }, 0);
        } else {
            display = false;
            setTimeout(() => {
                hidden = false;
            }, 300);
        }
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`fixed top-0 left-0 w-screen h-screen pointer-events-auto ${display?"bg-black/20 z-40": "bg-transparent"} duration-200 transition-all ${hidden || "hidden"}`}
    on:click={() => show = false}
/>
<div class={`fixed top-1/2 left-1/2 -translate-x-1/2  bg-white ${display?"-translate-y-1/2 opacity-100": "-translate-y-[40%] opacity-0"} duration-200 transition-all shadow-large rounded-[30px] py-7 px-7 z-50 ${hidden || "hidden"}`}>
    <slot />
</div>