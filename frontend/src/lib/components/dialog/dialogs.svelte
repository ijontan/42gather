<script>
	import DialogDelegate, { DialogData } from "./dialogs";
    import Dialog from "./dialog.svelte";

    /** @type {DialogData[]} */
    let dialogs;

    DialogDelegate.subscribe((value) => {
        dialogs = value;
    });
</script>

<div class="flex flex-col w-[300px] fixed top-20 right-0 gap-2 ">
    {#each dialogs as dialog}
    <Dialog {dialog} />
    {/each}
</div>



