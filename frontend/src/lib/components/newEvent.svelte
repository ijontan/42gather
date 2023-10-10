<script>
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";
	import EventData, { RemindersType, TagsType } from "$lib/model/event";
	import ChipsSelectors from "./chips/chipsSelectors.svelte";
	import Datetimefield from "./fields/datetimefield.svelte";
	import DropdownColors from "./dropdownColors/dropdownColors.svelte";
	import MyButton from "./buttons/myButton.svelte";
	import Numberfield from "./numberfield.svelte";
	import RoundedButton from "./roundedButton.svelte";
    import Textarea from "./textarea.svelte";
	import Textfield from "./textfield.svelte";

    let hover = false;
    let opened = false;

    function openDialog(){
        if (opened) return;
        opened = true;
    }

    let item = EventData.empty();

    /**
     * @param {MouseEvent} e
     */
    function closeDialog(e){
        e.stopPropagation();
        opened = false;
    }

    function handleMouseEnter(){
        hover = true;
    }

    function handleMouseLeave() {
        hover = false;
    }

    /** @type {string[]} */
    let tagsOptions = Object.entries(TagsType).map(([key, value]) => key);

    /** @type {string[]} */
    let remindersOptions =Object.entries(RemindersType).map(([key, value]) => key);

    async function newEvent(){
        console.log(item);

        try {
            /** @type {*} */
            let res = await api.post('/events/create', item);
            console.log("create res: ", res.data);
            goto('/gathering/' + res.data);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={` ${opened? "w-[700px] h-[650px]" : (hover ? 'w-[248px] h-[80px]' : 'w-[80px] h-[80px]')} shadow-heavy flex flex-col overflow-clip px-[22px] ${opened? "bg-white" :"bg-cyanAcc cursor-pointer"} fixed right-20 bottom-20 transition-all`}
    style={`border-radius: ${hover || opened ? '25px' : '100%'};`}
    on:click={openDialog}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    
    <div class="flex items-center w-[654px] h-[80px] mt-[3px] justify-between">
        <div class="flex flex-row gap-5 items-center">
            <span class={` select-none text-[50px] ${opened? "text-black" : "text-white"}`}>+</span>
            <span class={` select-none text-2xl ${opened? "text-black" : "text-white"}`}>New Event</span>
        </div>
        <button class=" rounded-full bg-red-300 hover:bg-red-400 transition-colors aspect-square w-10 h-10 text-xl text-white font-bold"
            on:click={closeDialog}
        >x</button>
    </div>
    <hr class={` border-t-2 ${opened? "border-black" : " border-transparent"}`}/>
    <div class="flex flex-col overflow-y-scroll -mx-5 px-5 gap-2 pb-5 pt-2">
        <div class="flex gap-5 w-full">
            <Textfield title="Title" bind:value={item.title} />
            <Datetimefield title="Date & Time" bind:value={item.datetime} />
            <DropdownColors title="Color" bind:selected={item.color} />
        </div>
        <div class="flex gap-5 w-full">
            <Textfield title="venue" bind:value={item.venue} />
            <Numberfield title="Limit (Optional)" bind:value={item.limit} />
        </div>
        <Textarea title="Description" bind:value={item.description} />
        <ChipsSelectors title="Tags" options={tagsOptions} bind:result={item.tags} />
        <ChipsSelectors title="Reminders" options={remindersOptions} bind:result={item.reminders} />
    </div>
    <div class={`absolute bottom-5 right-5 ${opened? "": "hidden"}`}>
        <RoundedButton name="+ Create" on:click={newEvent}/>
    </div>
</div>