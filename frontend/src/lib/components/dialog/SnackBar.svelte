<script>
	import { onMount } from "svelte";
	import DialogDelegate, { DialogType } from "./snackBar";

    /** @type {import("./snackBar").DialogData} */
    export let dialog;
    /** @type {boolean} */
    let show = false;
    /** @type {boolean} */
    let expended = true;

    /** @type {string} */
    let bgColor = 'bg-cyanLight';
    let textColor = 'text-cyanAcc';
    let textColor50 = 'text-cyanAcc/50';
    onMount(() => {
        if (dialog.timeout) {
            show = true; 
            return;
        }
        dialog.timeout = setTimeout(() => {
            show = true;
            console.log("start", dialog.id)
            closeDialog(dialog.id, dialog.duration);
        }, 0);
    });

    /**
     * @param {string} id
     * @param {number} duration
     */
    async function closeDialog(id, duration) {        
        await new Promise((resolve) => setTimeout(resolve, duration));
        show = false;
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("end", id)
        DialogDelegate.remove(id);
    }
    $:switch (dialog.type) {
        case DialogType.normal:
            bgColor = 'bg-cyanLight';
            textColor = 'text-cyanAcc';
            textColor50 = 'text-cyanAcc/50';
            break;
        case DialogType.success:
            bgColor = 'bg-greenLight';
            textColor = 'text-greenAcc';
            textColor50 = 'text-greenAcc/50';
            break;
        case DialogType.error:
            bgColor = 'bg-red-200';
            textColor = 'text-red-500';
            textColor50 = 'text-red-500/50';
            break;
        case DialogType.warning:
            bgColor = 'bg-orangeLight';
            textColor = 'text-orangeAcc';
            textColor50 = 'text-orangeAcc/70';
            break;
        default:
            break;
    }
</script>
<button id={dialog.id} class={` z-[100] w-full ${expended?" h-fit":"h-0 p-0"} py-5 shadow-2xl shadow-black/20 pl-7 justify-center flex flex-col ${bgColor} rounded-l-[30px] ${show?"" : " translate-x-full"} transition-all duration-300`}
on:click={() => {
    show = false;
    closeDialog(dialog.id, 0);
}}
>
<span class={`text-[30px] leading-7 tracking-tight capitalize ${textColor}`}>{dialog.title}</span>
<span class={` capitalize ${textColor50} pr-1`}>{dialog.message}</span>
</button>