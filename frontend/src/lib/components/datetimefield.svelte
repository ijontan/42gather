<script>
    /** @type {string} */
    export let title;
    /** @type {Date} */
    export let value = new Date();
    /** @type {boolean}*/
    export let disabled = false;
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <input 
        id="title" 
        class={`w-full outline-none bg-gray rounded-full py-3 px-5 ${disabled?"":"shadow-light"} tracking-wide transition-all`}
        bind:value
        {disabled}
        type='datetime-local'
    />
</div>