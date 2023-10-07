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
    <input 
        id="title" 
        class="w-full outline-transparent bg-gray rounded-full h-10 px-5"
        bind:value
        {disabled}
        type='text'
    />
</div>