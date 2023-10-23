<script>
	import Credit from "../credit.svelte";

    let count = 0;
    /** @type {number} */
    let timeout;
    let animate = false;

    function clickLogo() {
    clearTimeout(timeout);
    count++;
    if (count === 10) {
      console.log('click');
      animate = true;
      count = 0;
    } else {
      timeout = setTimeout(() => {
        count = 0;
      }, 1000);
    }
  }

</script>
<div class="flex flex-col items-center gap-1 lg:gap-5 lg:mb-16">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class=" rotate-45 bg-cyanAcc w-[20px] h-[20px] lg:w-[70px] lg:h-[70px] hover:rotate-[225deg] transition-transform duration-300"
        on:click={clickLogo}
    />
    <h1 class="text-xl lg:text-5xl">42 Gather</h1>
</div>

<Credit bind:animate/>