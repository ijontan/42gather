<script>
	import { ColorType } from "$lib/model/event";

    /** @type string */
    export let name;
    /** @type {number}*/
    export let color;
    /** @type {boolean}*/
    export let noBackground = false;
    /** @type {string} */
    let bgColor;
    /** @type {string} */
    let textColor;
    /** @type {string} */
    let hoverBgColor;
    /** @type {string} */
    let hoverTextColor;
    /** @type {boolean}*/
    export let disabled = false;

    /** @type {string | null} */
    export let tooltip = null;
    $: {
        switch (color) {
            case ColorType.orange:
                bgColor = 'bg-orangeAcc';
                textColor = 'text-orangeLight';
                hoverBgColor = 'hover:bg-orangeLight';
                hoverTextColor = 'group-button-hover:text-orangeAcc';
                break;
            case ColorType.blue:
                bgColor = 'bg-blueAcc';
                textColor = 'text-blueLight';
                hoverBgColor = 'hover:bg-blueLight';
                hoverTextColor = 'group-button-hover:text-blueAcc';
                break;
            case ColorType.green:
                bgColor = 'bg-greenAcc';
                textColor = 'text-greenLight';
                hoverBgColor = 'hover:bg-greenLight';
                hoverTextColor = 'group-button-hover:text-greenAcc';
                break;
            case ColorType.teal:
                bgColor = 'bg-tealAcc';
                textColor = 'text-tealLight';
                hoverBgColor = 'hover:bg-tealLight';
                hoverTextColor = 'group-button-hover:text-tealAcc';
                break;
            case ColorType.pink:
                bgColor = 'bg-pinkAcc';
                textColor = 'text-pinkLight';
                hoverBgColor = 'hover:bg-pinkLight';
                hoverTextColor = 'group-button-hover:text-pinkAcc';
                break;
            case ColorType.yellow:
                bgColor = 'bg-yellowAcc';
                textColor = 'text-yellowLight';
                hoverBgColor = 'hover:bg-yellowLight';
                hoverTextColor = 'group-button-hover:text-yellowAcc';
                break;
            default:
                break;
        }
        if (noBackground) {
            bgColor = 'bg-transparent';
            textColor = 'text-black/50';
            hoverBgColor = 'hover:' + bgColor;
            hoverTextColor = 'group-button-hover:' + textColor;
        }
        if (disabled) {
            hoverBgColor = '';
            hoverTextColor = '';
        }
    }

</script>

<button id={name} on:click {disabled} class={` relative group-button rounded-full ${bgColor} px-7 py-2 ${hoverBgColor} transition-all`}>
    <span class={` uppercase ${textColor} ${hoverTextColor} transition-all`}>{name}</span>
    {#if tooltip}
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none px-2 group-button-hover:opacity-100 opacity-0 rounded-md bg-black/30 first-line:bgColor">
            <span class=" text-white whitespace-pre">{tooltip}</span>
        </div>
    {/if}
</button>