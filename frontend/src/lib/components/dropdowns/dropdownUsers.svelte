<script>
	import { api } from "$lib/api";
	import { ColorType } from "$lib/model/event";
	import { onMount } from "svelte";
	import UserData from "../../model/user";

    export let title = "";
    /** @type {*[]} */
    let userList = [];
    /** @type {*[]} */
    let filteredUsers = [];
    /** @type {*[]} */
    export let selected = [];
    /** @type {boolean}*/
    export let disabled = false;

    onMount(async () => {
        try {
            
            /** @type {*} */
            let res = await api.get("/user/all");
            userList = res.data;
            console.log(userList);
        } catch (error) {
            console.log(error);
        }
    })

    let filterString = "";

    $: filterString, userList, (filteredUsers = (userList ?? []).filter(user => user.intraName.toLowerCase().includes(filterString.toLowerCase())))

</script>

<div class="flex flex-col items-start tracking-wide gap-1 w-full">
    <label for={title} class="px-5 capitalize text-black/50 tracking-wide">{title}:</label>
    <div class={`w-full relative ${disabled?"":"group-button"} z-0`}>
        <div class={` absolute top-0 left-0 -z-10 right-0 bg-white rounded-[24px] group-button-hover:h-60 h-14 ${disabled?"":"shadow-light"} transition-all p-5 overflow-y-scroll`}>
            <div class="gap-1 flex flex-col mt-10">
                {#each filteredUsers as user}
                    <button class={`w-full h-6 rounded-md hover:scale-125 hover:font-bold transition-all tracking-wide`} on:click={() => selected = [...selected, user]}>
                       {user.intraName}
                    </button>
                {/each}
            </div>
        </div>
        <div 
            id="title" 
            class=" w-full outline-none bg-gray h-14 z-20 rounded-[25px] py-3 px-5 flex flex-wrap gap-2 overflow-y-scroll"
        >
            {#each selected as user}
                <button class=" group whitespace-pre bg-cyanLight hover:bg-cyanAcc hover:text-cyanLight transition-colors text-cyanDark px-3 tracking-wide font-medium rounded-full"
                    on:click={() => selected = selected.filter(u => u.intraName !== user.intraName)}
                >
                    {user.intraName}  <span class=" text-black/50 group-hover:text-red-400 font-bold">X</span>                    
                </button>
            {/each}
        </div>
    </div>
</div>