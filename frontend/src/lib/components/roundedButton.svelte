<script>
    /** @type string */
    export let name;
</script>

<button id={name} on:click class=" group-button rounded-full bg-cyanLight px-7 py-2 hover:bg-cyanAcc transition-all">
    <span class=" uppercase text-cyanDark group-button-hover:text-white transition-all">{name}</span>
</button>