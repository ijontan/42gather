<script>
    /** @type string */
    export let name;
    /** @type boolean*/
    export let selected = false;
    /** @type boolean */
    let hovering = false;
</script>

<button 
    on:click 
    on:mouseenter={()=>{hovering =true}} 
    on:mouseleave={()=>{hovering =false}}
    class="group px-10 py-2 rounded-full flex justify-start relative outline-transparent"
>
    <span class={` z-10 text-2xl ${selected? " text-cyanDark":""}`}>{name}</span>
    <div class={`bg-gray z-0 transition-all h-full absolute top-0 bottom-0 group-focus:w-full group-focus:left-0 rounded-full ${hovering || selected? "w-full left-0":"w-0 left-10"}`}></div>
</button>