<script>
    /** @type string */
    export let title;
</script>
<div class="flex flex-col items-start w-full tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <input id="title" type="text" class="w-full outline-transparent bg-gray rounded-full h-10 px-5">
</div>