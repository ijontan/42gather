<script>
	import DialogDelegate, { DialogData } from "./snackBar";
    import Dialog from "./SnackBar.svelte";

    /** @type {DialogData[]} */
    let dialogs;

    DialogDelegate.subscribe((value) => {
        dialogs = value;
    });
</script>

<div class="flex flex-col w-[300px] z-50 fixed top-20 right-0 gap-2 ">
    {#each dialogs as dialog}
    {#key dialog.id}
    <Dialog {dialog} />
    {/key}
    {/each}
</div>



