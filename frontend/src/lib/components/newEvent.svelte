<script>
    // @ts-nocheck
	import { goto } from "$app/navigation";
	import { api } from "$lib/api";
	import EventData, { RemindersType, TagsType } from "$lib/model/event";
	import ChipsSelectors from "./chips/chipsSelectors.svelte";
	import Datetimefield from "./fields/datetimefield.svelte";
	import DropdownColors from "./dropdowns/dropdownColors.svelte";
	import Numberfield from "./fields/numberfield.svelte";
	import RoundedButton from "./buttons/roundedButton.svelte";
    import Textarea from "./fields/textarea.svelte";
	import Textfield from "./fields/textfield.svelte";
	import DialogDelegate, { DialogType } from "./dialog/snackBar";
	import DropdownUsers from "./dropdowns/dropdownUsers.svelte";
    import UserData from "../model/user";
	import Toggle from "./buttons/toggle.svelte";
    import Device from 'svelte-device-info'
	import { onMount } from "svelte";

    let hover = false;
    let opened = false;

    function openDialog(){
        if (opened) return;
        opened = true;
    }

    let item = EventData.empty();

    let isMobile = false
    onMount(() => {
        isMobile = Device.isMobile;
    });

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

    /** @type {UserData[]} */
    let selected = [];

    async function newEvent(){
        console.log(item);

        try {
            item.preJoinedMemberID = selected.map(user => user.id);
            /** @type {*} */
            let res = await api.post('/events/create', item);
            DialogDelegate.show(
                DialogType.success,
                'Success',
                'Event created successfully'
            );
            console.log("create res: ", res.data);
            goto('/gathering/' + res.data);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={` ${opened? "w-[calc(100vw-36px)] lg:w-[700px] h-[500px] lg:h-[650px]" : (hover ? 'w-[248px] h-[80px]' : 'w-[80px] h-[80px]')} shadow-heavy flex flex-col overflow-clip px-[22px] ${opened? "bg-white" :"bg-cyanAcc cursor-pointer"} fixed right-4 bottom-24 lg:right-20 lg:bottom-20 transition-all`}
    style={`border-radius: ${hover || opened ? '25px' : '100%'};`}
    on:click={openDialog}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    
    <div class="flex items-center w-[calc(100vw-80px)] lg:w-[654px] h-[80px] mt-[3px] justify-between">
        <div class="flex flex-row gap-5 items-center">
            <span class={` select-none text-[50px] ${opened? "text-black" : "text-white"}`}>+</span>
            <span class={` select-none text-2xl ${opened? "text-black" : "text-white"}`}>New Event</span>
        </div>
        <button class=" rounded-full bg-red-300 hover:bg-red-400 transition-colors aspect-square w-10 h-10 text-xl text-white font-bold"
            on:click={closeDialog}
        >x</button>
    </div>
    <hr class={` border-t-2 ${opened? "border-black" : " border-transparent"}`}/>
    <div class="flex flex-col overflow-y-scroll -mx-5 px-5 gap-2 pb-10 lg:pb-5 pt-2 mt-[1px]">
        <div class="flex gap-2 lg:gap-5 w-full flex-col lg:flex-row">
            <div class="flex gap-5 ">
                <Textfield title="Title" bind:value={item.title} />
                {#if isMobile}
                <DropdownColors title="Color" bind:selected={item.color} />
                {/if}
            </div>
            <div class="flex gap-5 ">
                <Datetimefield title="Date & Time" bind:value={item.datetime} />
                {#if !isMobile}
                <DropdownColors title="Color" bind:selected={item.color} />
                {/if}
            </div>
        </div>
        <div class="flex gap-2 lg:gap-5 w-full flex-col lg:flex-row">
            <Textfield title="venue" bind:value={item.venue} />
            <Numberfield title="Limit (Optional)" bind:value={item.limit} />
        </div>
        <div class="flex gap-5 w-full">
            <DropdownUsers title="Select User" bind:selected/>
            <Toggle title="Public"/>
        </div>
        <Textarea title="Description" bind:value={item.description} />
        <ChipsSelectors title="Tags" options={tagsOptions} bind:result={item.tags} />
        <ChipsSelectors title="Reminders" options={remindersOptions} bind:result={item.reminders} />
    </div>
    <div class={`absolute bottom-5 right-5 ${opened? "": "hidden"}`}>
        <RoundedButton name="+ Create" shadow on:click={newEvent}/>
    </div>
</div>