<script>
	import { page } from "$app/stores";
	import { api } from "$lib/api";
	import ChipList from "$lib/components/chips/chipList.svelte";
	import ChipsSelectors from "$lib/components/chips/chipsSelectors.svelte";
	import Datetimefield from "$lib/components/fields/datetimefield.svelte";
	import DropdownColors from "$lib/components/dropdowns/dropdownColors.svelte";
	import MyButton from "$lib/components/buttons/myButton.svelte";
	import Numberfield from "$lib/components/fields/numberfield.svelte";
	import Textarea from "$lib/components/fields/textarea.svelte";
	import Textfield from "$lib/components/fields/textfield.svelte";
	import UserList from "$lib/components/userList.svelte";
	import EventData, { TagsType, RemindersType, ColorType } from "$lib/model/event";
	import { onMount } from "svelte";
	import UserData from "$lib/model/user";
	import UserListItem from "$lib/components/userListItem.svelte";
	import DialogDelegate, { DialogType } from "$lib/components/dialog/snackBar";
	import userData from "../../userData";
	import Dialog from "$lib/components/dialog/dialog.svelte";


    /** @type {EventData} */
    let item = EventData.empty();
    /** @type {string} */
    let bgColor;
    /** @type {string} */
    let textColor;
    /** @type {boolean} */
    let disabled = true;

    let id = $page.params.id;

    /** @type {UserData} */
    let user = UserData.empty();

    /** @type {boolean} */
    let displayDialog = false;
    /** @type {string} */
    let announcement = '';

    userData.subscribe(value => {
        if (!value) return;
        user = value;
    })

    onMount(async () => {
        try {
            /** @type {*} */
            let res = await api.get('/events/id/' + id);
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
        update();
        disabled = true
    }

    async function joinEvent(){
        try {
            let res = await api.post('/events/join', {eventID: item.id});
            if (res.data) {
                item.joined = true;
                DialogDelegate.show(
                    DialogType.success,
                    'Success',
                    'You have joined the event'
                );
            } else {
                DialogDelegate.show(
                    DialogType.error,
                    'Error',
                    'You have already joined the event'
                );
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function makeAnnouncement(){
        try {
            /** @type {*} */
            let res = await api.post('/events/announce/' + item.id, {message: announcement});
            console.log(res.data);
            announcement = '';
            if (res.data) {
                item.joined = true;
                DialogDelegate.show(
                    DialogType.success,
                    'Success',
                    'You successfully made an announcement'
                );
            } else {
                DialogDelegate.show(
                    DialogType.error,
                    'Error',
                    'Failed to make an announcement'
                );
            }
            announcement = '';
            if (res.data) {
                item.joined = true;
                DialogDelegate.show(
                    DialogType.success,
                    'Success',
                    'You successfully made an announcement'
                );
            } else {
                DialogDelegate.show(
                    DialogType.error,
                    'Error',
                    'Failed to make an announcement'
                );
            }
        } catch (error) {
            console.log(error);
        }
        displayDialog = false;
    }

    async function update() {
        try {
            /** @type {*}*/
            let res = await api.put('/events/id/' + item.id, item);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<div class="flex flex-col overflow-y-scroll mx-5 px-5 gap-2 pb-5 pt-20">
    <div class={`  flex flex-col gap-2  px-12 py-6 ${bgColor} rounded-[40px]`}>
        <h1 class={`  ${textColor} capitalize`}>{item.title}</h1>
        <p class={` opacity-50 ${textColor}`}>{item.description}</p>
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
    <h2 class="mt-5">Organizer</h2>
    <hr class=" border-t-2 border-black/10"/>
    <UserListItem user={item.creator ?? UserData.empty()
    }/>
    <h2 class="mt-5">Participants</h2>
    <hr class=" border-t-2 border-black/10"/>
    <UserList userList={item.currentParticipants}/>
</div>

<div class="fixed bottom-5 right-5 flex gap-2" >
    {#if user && user.intraName === item.creator?.intraName}
        <MyButton color={item.color} name={"Make Announcement"} on:click={()=>{displayDialog = true}} />
        <MyButton color={item.color} name={disabled?"Edit":"Save"} on:click={disabled?edit:save}/>
    {/if}
    <MyButton color={item.color} name={item.joined? "joined": "join"} disabled={item.joined} on:click={joinEvent}/>
</div>

<Dialog bind:show={displayDialog}>
    <div class="flex flex-col">
        <h2 class=" text-[30px] tracking-tighter">Announcement</h2>
        <hr class=" border-black/30 w-[30vw] mb-3"/>
        <div class=" flex flex-col gap-4">

            <Textarea title="message" bind:value={announcement} />
            <div class="flex gap-2 self-end">
                <MyButton color={item.color} name="send"  on:click={makeAnnouncement}/>
            </div>
        </div>
    </div>
</Dialog>