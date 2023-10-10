<script>
	import { onMount } from "svelte";

    /** @type {import("./dialogs").DialogData} */
    export let dialog;
    /** @type {boolean} */
    let show = false;

    onMount(() => {
        show = true;
        setTimeout(() => {
            show = false;
        }, dialog.duration);
    });
</script>

<div class=" w-full h-20 bg-slate-500 rounded-l-[30px]">
    <span>{dialog.title}</span>
    <span>{dialog.message}</span>
</div>