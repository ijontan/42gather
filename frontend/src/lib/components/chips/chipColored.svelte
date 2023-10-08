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
    $: {
        switch (color) {
            case ColorType.orange:
                bgColor = 'bg-orangeLight';
                textColor = 'text-orangeAcc';
                hoverBgColor = 'hover:bg-orangeAcc';
                hoverTextColor = 'group-button-hover:text-orangeLight';
                break;
            case ColorType.blue:
                bgColor = 'bg-blueLight';
                textColor = 'text-blueAcc';
                hoverBgColor = 'hover:bg-blueAcc';
                hoverTextColor = 'group-button-hover:text-blueLight';
                break;
            case ColorType.green:
                bgColor = 'bg-greenLight';
                textColor = 'text-greenAcc';
                hoverBgColor = 'hover:bg-greenAcc';
                hoverTextColor = 'group-button-hover:text-greenLight';
                break;
            case ColorType.teal:
                bgColor = 'bg-tealLight';
                textColor = 'text-tealAcc';
                hoverBgColor = 'hover:bg-tealAcc';
                hoverTextColor = 'group-button-hover:text-tealLight';
                break;
            case ColorType.pink:
                bgColor = 'bg-pinkLight';
                textColor = 'text-pinkAcc';
                hoverBgColor = 'hover:bg-pinkAcc';
                hoverTextColor = 'group-button-hover:text-pinkLight';
                break;
            case ColorType.yellow:
                bgColor = 'bg-yellowLight';
                textColor = 'text-yellowAcc';
                hoverBgColor = 'hover:bg-yellowAcc';
                hoverTextColor = 'group-button-hover:text-yellowLight';
                break;
            default:
                break;
        }
        if (noBackground) {
            bgColor = 'bg-transparent';
            hoverBgColor = 'hover:' + bgColor;
            hoverTextColor = 'group-button-hover:' + textColor;
        }
        if (disabled) {
            hoverBgColor = '';
            hoverTextColor = '';
        }
    }

</script>

<button id={name} on:click {disabled} class={` group-button rounded-full ${bgColor} px-3 py-1 ${hoverBgColor} transition-all`}>
    <span class={` ${textColor} ${hoverTextColor} transition-all`}>{name}</span>
</button>