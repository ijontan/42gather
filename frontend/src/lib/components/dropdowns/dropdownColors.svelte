<script>
	import { ColorType } from "$lib/model/event";

    export let title = "";
    /** @type {number[]} */
    let options = Object.entries(ColorType).map(([key, value]) => value);
    /** @type {number} */
    export let selected = 0;
    /** @type {boolean}*/
    export let disabled = false;

    /**
     * 
     * @param {number} color
     * @returns {string}
     */
    function getColor(color) {
        switch (color) {
            case ColorType.orange:
                return 'bg-orangeAcc';
            case ColorType.blue:
                return 'bg-blueAcc';
            case ColorType.green:
                return 'bg-greenAcc';
            case ColorType.teal:
                return 'bg-tealAcc';
            case ColorType.pink:
                return 'bg-pinkAcc';
            case ColorType.yellow:
                return 'bg-yellowAcc';
            default:
                return 'bg-transparent';
        }
    }
</script>

<div class="flex flex-col items-start tracking-wide gap-1">
    <label for={title} class="px-5 capitalize text-black/50">{title}:</label>
    <div class={` relative ${disabled?"":"group-button"} z-10`}>
        <div class={` absolute top-0 left-0 -z-10 right-0 bg-white rounded-[24px] group-button-hover:h-60 h-12 ${disabled?"":"shadow-light"} transition-all p-5 overflow-y-scroll`}>
            <div class="gap-1 flex flex-col mt-10">
                {#each options as option}
                    <button class={`w-full h-6 rounded-md hover:scale-125 transition-transform ${getColor(option)}`} on:click={() => selected = option} />
                {/each}
            </div>
        </div>
        <div 
            id="title" 
            class="w-20 outline-none bg-gray h-12 z-20 rounded-[25px] py-3 px-5"
        >
            <div class={`w-full h-6 rounded-md ${getColor(selected)}`} />

        </div>
    </div>
</div>