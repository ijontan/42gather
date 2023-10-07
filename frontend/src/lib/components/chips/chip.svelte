<script>
    export let title = "";
    export let selected = false;

    function selectChip(){
        console.log(selected);
        selected = !selected;
    }
</script>

<button id={title} class={`rounded-full px-3 py-1 ${selected? "bg-cyanAcc text-cyanLight" : "bg-cyanLight text-cyanAcc" } transition-colors`}
    on:click={selectChip}
>
    {title}
</button>