
<script>
    let date = new Date();

    /** @type {string} */
    let tod; 
    let style= ''

    $:date, getTOD()

    function getTOD(){
        let hour = date.getHours()
        if (hour < 4) {
            tod = 'Night'
            style = ' text-blueAcc '
        } else if (hour < 12) {
            tod = 'Morning'
            style = ' text-orangeAcc '
        } else if (hour < 18) {
            tod = 'Afternoon'
            style = ' text-yellowAcc '
        } else if (hour < 21) {
            tod = 'Evening'
            style = ' text-pinkAcc '
        } else {
            tod = 'Night'
            style = ' text-blueAcc '
        }

    }
    /** @type {string} */
    export let name;
</script>


<div class="h-full grid items-center justify-center">
    <div class=" sticky pb-5 top-14">
        <h1 class="text-center">
            Good <span class={`${style} text-blueAcc`}>{tod}</span>, <span class="text-[70px]">{name}</span>
        </h1>
    </div>
</div>