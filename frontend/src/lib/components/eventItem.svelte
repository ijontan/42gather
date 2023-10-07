<script>
	// @ts-ignore
	import EventData, { ColorType } from "$lib/model/event";
	import ChipList from "./chips/chipList.svelte";
	import MyButton from "./myButton.svelte";
	import Textarea from "./textarea.svelte";
	import Textfield from "./textfield.svelte";
	import TextfieldNoBg from "./textfieldNoBG.svelte";


    /** @type boolean */
    let hover = false;

    /** @type {EventData} */
    export let item;
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

    function mouseEnter(){
        hover = true;
        if (div) {
            const {top, bottom} = div.getBoundingClientRect();
            if (bottom + 500 > window.innerHeight || top < 0)
                div.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }

    function mouseLeave(){
        hover = false;
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative z-0 w-[500px] rounded-[50px]" 
    on:mouseenter={mouseEnter}
    on:mouseleave={mouseLeave}
    bind:this={div}
>
    <div class={`  bg-white absolute top-0 box-border flex flex-col gap-2 pt-[25%] left-0 right-0 overflow-clip rounded-[50px] shadow-medium ${hover? ' h-[500px] -z-10' : 'h-0 -z-20'} transition-all`}>
        <div class="flex flex-col p-5 justify-evenly h-full">

            <TextfieldNoBg title='Descriptions' value={item.description}/>
            <TextfieldNoBg title='vanue' value={item.vanue}/>
            <TextfieldNoBg title='date' value={item.datetime.toDateString() + item.datetime.toLocaleTimeString()}/>
            <ChipList title='tags' color={item.color} values={item.tags}/>
            <div class="flex flex-row justify-end">
                <MyButton name='close' color={item.color} noBackground
                    on:click={() => {
                        hover = !hover;
                    }}
                />
                <MyButton name='join' color={item.color}
                    on:click={() => {
                        
                    }}
                />
            </div>
        </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class={`z-30  flex flex-col gap-2  px-12 py-6 ${bgColor} rounded-[50px] cursor-pointer`}
        on:click={() => {
            hover = !hover;
        }}
    >
        <h1 class={`z-30  ${textColor} capitalize`}>{item.title}</h1>
        <p class={`z-30  whitespace-nowrap truncate opacity-50 ${textColor}`}>{item.description.split('.')[0]}</p>
    </div>
</div>