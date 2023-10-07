<script>
    import DiscordIcon from "$lib/assets/discord-logo-blue.svg";
    export let connected = true;
</script>

<button class={`h-28 w-[500px] shadow-large group-button bg-[#313338] outline-transparent ${connected? "" :" focus:bg-black hover:bg-black transition-colors"} rounded-[30px] flex flex-row items-center px-10 justify-between`}
    disabled={connected}
>
    <span class={`text-white text-[33px] transition-colors`}>{connected?"Connected": "Connect"} to</span>
    <img src={DiscordIcon} alt="Discord Icon" class=" w-[170px]">
</button>