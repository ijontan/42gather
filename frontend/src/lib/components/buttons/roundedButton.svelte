<script>
    /** @type string */
    export let name;
    export let shadow = false;
</script>

<button id={name} on:click class={`group-button rounded-full bg-cyanLight px-7 py-2 hover:bg-cyanAcc transition-all ${shadow?" shadow-light":""}`}>
    <span class=" uppercase text-cyanDark group-button-hover:text-white transition-all">{name}</span>
</button>