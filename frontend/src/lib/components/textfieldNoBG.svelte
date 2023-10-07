<script>
    /** @type {string} */
    export let title;
    /** @type {string | undefined} */
    export let value = undefined;

</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class=" capitalize tracking-wide text-black/50">{title}:</label>
    <p 
        id="title" 
        class="w-full tracking-wide font-semibold"
    >
        {value ?? '--'}
    </p>
</div>