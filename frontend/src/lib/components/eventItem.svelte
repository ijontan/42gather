<script>
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";

	// @ts-ignore
	import EventData, { ColorType } from "$lib/model/event";
	import ChipList from "./chips/chipList.svelte";
	import DatetimefieldNoBg from "./fields/datetimefieldNoBG.svelte";
	import MyButton from "./buttons/myButton.svelte";
	import TextfieldNoBg from "./fields/textfieldNoBG.svelte";


    /** @type boolean */
    let hover = false;

    /** @type {EventData} */
    export let item;
    /** @type {boolean} */
    export let joined;
    /** @type {string} */
    let bgColor;
    /** @type {string} */
    let textColor;

    let isTop = false;

    $: {
        switch (item.color) {
            case ColorType.orange:
                bgColor = 'bg-orangeLight';
                textColor = 'text-orangeAcc';
                break;
            case ColorType.blue:
                bgColor = 'bg-blueLight';
                textColor = 'text-blueAcc';
                break;
            case ColorType.green:
                bgColor = 'bg-greenLight';
                textColor = 'text-greenAcc';
                break;
            case ColorType.teal:
                bgColor = 'bg-tealLight';
                textColor = 'text-tealAcc';
                break;
            case ColorType.pink:
                bgColor = 'bg-pinkLight';
                textColor = 'text-pinkAcc';
                break;
            case ColorType.yellow:
                bgColor = 'bg-yellowLight';
                textColor = 'text-yellowAcc';
                break;
            default:
                break;
        }
    }

    /** @type {HTMLDivElement} */
    let div;

    /** @type {number} */
    let timeout;

    function mouseEnter(){
        hover = true;
        if (div) {
            const {top, bottom} = div.getBoundingClientRect();
            if (bottom + 500 > window.innerHeight || top < 0)
                timeout = setTimeout(() => {
                    div.scrollIntoView({behavior: 'smooth', block: 'end'});
                }, 300);
                // div.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
    }

    function mouseLeave(){
        hover = false;
        if (timeout) clearTimeout(timeout);
    }

    async function joinEvent(){
        try {
            let res = await api.post('/events/join', {eventID: item.id});
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative z-0 w-[500px] rounded-[50px]" 
    on:mouseenter={mouseEnter}
    on:mouseleave={mouseLeave}
>
    <div class={`  bg-white absolute top-0 box-border flex flex-col gap-2 pt-[25%] left-0 right-0 overflow-clip rounded-[50px] shadow-medium ${hover? ' h-[500px] -z-10' : 'h-0 -z-20'} transition-all`}
        bind:this={div}
    >
        <div class="flex flex-col p-5 justify-evenly h-full">

            <TextfieldNoBg title='Descriptions' value={item.description}/>
            <TextfieldNoBg title='venue' value={item.venue} />
            <DatetimefieldNoBg title='date' value={item.datetime.split('.')[0]} disabled/>
            <ChipList title='tags' color={item.color} values={item.tags}/>
            <div class="flex flex-row justify-end">
                <MyButton name='close' color={item.color} noBackground
                    on:click={() => {
                        hover = !hover;
                    }}
                />
                <MyButton name={joined? 'joined' : 'join'} color={item.color} disabled={joined}
                    on:click={joinEvent}
                />
            </div>
        </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class={`z-30  flex flex-col gap-2 w-[500px] px-12 py-6 ${bgColor} rounded-[50px] cursor-pointer`}
        on:click={() => {
            goto(`/gathering/${item.id}`);
        }}
    >
        <h1 class={`z-30  ${textColor} capitalize whitespace-pre`}>{item.title ?? '--'}</h1>
        <p class={`z-30  whitespace-nowrap truncate opacity-50 ${textColor}`}>{item.description? item.description.split('.')[0] : '--'}</p>
    </div>
</div>