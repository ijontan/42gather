<script>
	import Textfield from "$lib/components/fields/textfield.svelte";
	// @ts-ignore
	import UserData from "$lib/model/user";
	import { onMount } from "svelte";
	import userData from "../userData";
	import { api } from "$lib/api";
	import { goto } from "$app/navigation";

    /** @type {UserData[]} */
    let userList = [];
    /** @type {UserData[]} */
    let filteredUsers = [];
    /** @type {UserData[]} */

    /** @type {string} */
    let filterString = "";
    onMount(() => {
        getUsers();
    });

    $: userList, filterString, (filteredUsers = filter());

    function filter(){
        if (filterString === "") return userList;
        return userList.filter(user => user.name.toLowerCase().includes(filterString.toLowerCase()) || user.intraName.toLowerCase().includes(filterString.toLowerCase()));
    }

    async function getUsers() {
        try {
            /** @type {*} */
            let res = await api.get('/user/all');
            userList = res.data;
            console.log(userList);
        } catch (error) {
            console.log(error);
        }
    }

    /** @type {number}*/
    let offset = 0;

    /** @param {*} e */
    function handleScroll(e) {
        e.preventDefault();
        let maxOffset = (5) * 220;
        if (e.deltaY < 0 && offset > 0) {
            offset += e.deltaY;
            if (offset < 0) offset = 0;
        } else if (e.deltaY > 0 && offset < maxOffset) {
            offset += e.deltaY;
            if (offset > maxOffset) offset = maxOffset;
        }
    }
</script>

<div class=" p-12 w-full flex flex-col overflow-clip h-screen">
    <h1 class="mb-5">Admin Dashboard (for bocals, work in progress)</h1>
    <div class="flex flex-col gap-2">
        <div class=" w-[400px]">
            <Textfield title='Search' bind:value={filterString} />
        </div>
    </div>
    
    <div class=' flex  gap-5 overflow-visible px-12 py-5 -mx-12 transition-transform'
    style={`transform: translateX(${-offset}px)`}
    on:wheel={handleScroll}
    >
        {#each filteredUsers as user}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class=" w-[250px] hover:scale-110 transition-all min-w-[250px] shadow-large rounded-[30px] overflow-clip flex flex-col"
            on:click={() => {
                goto('/user/' + user.id );
            }}
        >
            <img src={user.imageLink} alt="Profile Icon" class=" aspect-square object-cover">
            <div class=" p-5 flex flex-col items-center gap-2">
                <div class="flex flex-row w-full justify-center">
                    <span class=" truncate">{user.name} </span>
                    <span class=" whitespace-nowrap">({user.intraName})</span>
                </div>
                <hr class="w-full border-black/10"/>
                <div class="flex justify-evenly w-full">
                    <div class="flex flex-col items-center">
                        <span>Joined</span>
                        <span>{user.joinedEvent}</span>
                    </div>
                    <div class="border-[1px] border-black/10 h-full"/>
                    <div class="flex flex-col items-center">
                        <span>Created</span>
                        <span>{user.createdEvent}</span>
                    </div>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>