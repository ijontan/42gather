<script>
	// @ts-ignore
	import UserData from "$lib/model/user";
	import MyButton from "./buttons/myButton.svelte";
	import UserListItem from "./userListItem.svelte";

    /** @type {UserData[]} */
    export let userList = [];
    $:console.log(userList)
</script>

<div class="flex flex-col gap-2 mb-40">
    {#each userList as user}
        <UserListItem {user}/>
    {/each}
</div>