<script>
	import { page } from "$app/stores";
	import { api } from "$lib/api";
	import ChipList from "$lib/components/chips/chipList.svelte";
	import ChipsSelectors from "$lib/components/chips/chipsSelectors.svelte";
	import Datetimefield from "$lib/components/fields/datetimefield.svelte";
	import DropdownColors from "$lib/components/dropdownColors/dropdownColors.svelte";
	import MyButton from "$lib/components/buttons/myButton.svelte";
	import Numberfield from "$lib/components/fields/numberfield.svelte";
	import Textarea from "$lib/components/fields/textarea.svelte";
	import Textfield from "$lib/components/fields/textfield.svelte";
	import UserList from "$lib/components/userList.svelte";
	import EventData, { TagsType, RemindersType, ColorType } from "$lib/model/event";
	import { onMount } from "svelte";
	import UserData from "$lib/model/user";
	import UserListItem from "$lib/components/userListItem.svelte";


    /** @type {EventData} */
    let item = EventData.empty();
    /** @type {string} */
    let bgColor;
    /** @type {string} */
    let textColor;
    /** @type {boolean} */
    let disabled = true;

    let id = $page.params.id;

    onMount(async () => {
        try {
            /** @type {*} */
            let res = await api.get('/events/id/' + id);
            console.log(res.data);
            item = res.data;
            item.datetime = item.datetime.split('.')[0];
        } catch (error) {
            console.log(error);
        }
    })
    
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

    /** @type {string[]} */
    let tagsOptions = Object.entries(TagsType).map(([key, value]) => key);

    /** @type {string[]} */
    let remindersOptions =Object.entries(RemindersType).map(([key, value]) => key);

    function edit() {
        disabled = false
    }

    function save() {
        disabled = true
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

<div class="flex flex-col overflow-y-scroll mx-5 px-5 gap-2 pb-5 pt-20">
    <div class={`z-30  flex flex-col gap-2  px-12 py-6 ${bgColor} rounded-[40px]`}>
        <h1 class={`z-30  ${textColor} capitalize`}>{item.title}</h1>
        <p class={`z-30 opacity-50 ${textColor}`}>{item.description}</p>
    </div>
    <div class="flex gap-5 w-full">
        <Textfield {disabled} title="Event Name" bind:value={item.title}/>
        <Datetimefield {disabled} title="Date & Time" bind:value={item.datetime}/>
        <DropdownColors {disabled} title="Color" bind:selected={item.color} />
    </div>
    <div class="flex gap-5 w-full">
        <Textfield {disabled} title="venue" bind:value={item.venue} />
        <Numberfield {disabled} title="Limit (Optional)" bind:value={item.limit} />
    </div>
    <Textarea {disabled} title="Description" bind:value={item.description} />
    <ChipList title='tags' color={item.color} values={item.tags??[]} padding/>
    <ChipList title='Reminders' color={item.color} values={item.reminders??[]} notTag padding/>
    <h2 class="mt-5">Creator</h2>
    <hr class=" border-t-2 border-black/10"/>
    <UserListItem user={item.creator ?? UserData.empty()
    }/>
    <h2 class="mt-5">Participants</h2>
    <hr class=" border-t-2 border-black/10"/>
    <UserList userList={item.currentParticipants}/>
</div>

<div class="fixed bottom-5 right-5 flex gap-2" >
    {#if disabled}
        <MyButton color={item.color} name="Edit" on:click={edit}/>
    {:else}
        <MyButton color={item.color} name="Save" on:click={save}/>
    {/if}
    <MyButton color={item.color} name="join" on:click={joinEvent}/>
</div>
