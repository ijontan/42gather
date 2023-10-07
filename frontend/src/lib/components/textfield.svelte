<script>
    /** @type {string} */
    export let title;
    /** @type {string} */
    export let value = '';
    /** @type {boolean}*/
    export let disabled = false;
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="px-5 capitalize tracking-wide text-black/50">{title}:</label>
    <input 
        id="title" 
        class="w-full outline-none bg-gray rounded-full py-3 px-5 shadow-light tracking-wide"
        bind:value
        {disabled}
        type='text'
    />
</div>