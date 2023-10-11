<script>
    export let title = "";
    /** @type {boolean} */
    export let state = true;
    /** @type {boolean} */
    export let disabled = false;

    function toggle(){
        state = !state;
    }
</script>
<div class="flex flex-col items-start tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <button class="${state?" bg-green-200":" bg-red-300"} group-button transition-colors shadow-light outline-transparent rounded-full h-14 w-24 relative" {disabled}
    on:click={toggle}
    >
    <div class={` h-10 w-10 absolute bg-white shadow-sm rounded-full group-button-hover:shadow-lg shadow-black/20 left-1/2 ${state?"":" -translate-x-full"} top-2 transition-all duration-100`}>
    </button>
</div>