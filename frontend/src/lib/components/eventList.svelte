<script>
	import EventItem from "./eventItem.svelte";

    /** @type {string} */
    export let title;
</script>

<h2 class=" capitalize">{title}</h2>
<ul>
    <li>
        <EventItem/>
    </li>
</ul>