<script>
    /** @type {string} */
    export let title;
    /** @type {string} */
    export let value = '';
    /** @type {boolean}*/
    export let disabled = false;
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <textarea 
        id="title" 
        class="w-full outline-none bg-gray rounded-[25px] py-3 px-5 shadow-light"
        bind:value
        {disabled}
        rows="3"
    />
</div>