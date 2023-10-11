<script>
	import Textfield from "$lib/components/fields/textfield.svelte";
	import UserData from "$lib/model/user";
	import userData from "../userData";


    /** @type {UserData} */
    let user;

    userData.subscribe(value => {
        user = value ?? UserData.empty();
    })

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
            <Textfield title='Search' />
        </div>
    </div>
    
    <div class=' flex  gap-5 overflow-visible px-12 py-5 -mx-12 transition-transform'
    style={`transform: translateX(${-offset}px)`}
    on:wheel={handleScroll}
    >
        {#each Array(5) as item}
        <div class=" w-[250px] min-w-[250px] shadow-large rounded-[30px] overflow-clip flex flex-col">
            <img src={user.imageLink} alt="Profile Icon" class=" aspect-square object-cover">
            <div class=" p-5 flex flex-col items-center gap-2">
                <span>{user.name} (<span>{user.intraName}</span>)</span>
                <hr class="w-full border-black/10"/>
                <div class="flex justify-evenly w-full">
                    <div class="flex flex-col items-center">
                        <span>Joined</span>
                        <span>5</span>
                    </div>
                    <div class="border-[1px] border-black/10 h-full"/>
                    <div class="flex flex-col items-center">
                        <span>Created</span>
                        <span>2</span>
                    </div>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>