<script>
    /** @type {string} */
    export let title;
    /** @type {number | string | null} */
    export let value = '';
    /** @type {boolean}*/
    export let disabled = false;
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="capitalize text-black/50">{title}:</label>
    <input 
        id="title" 
        class={`w-full outline-non bg-transparent ${disabled?"":"shadow-light"} tracking-wide`}
        bind:value
        {disabled}
        type='datetime-local'
    />
</div>