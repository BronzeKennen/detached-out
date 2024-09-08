
<script>
    import PeopleCol from "../../../components/peopleCol.svelte";
    import PeopleColToggle from "../../../components/peopleColToggle.svelte";

    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
    $: condition = 0;

    $: {
        if(innerWidth < 900) {
            condition = 0;
        } else {
            condition = 1;
        }
    }
    let users = ['Aris B.', 'JJ', 'Ham']; /* fetch people that have messaged */
</script>

<div class="feed">
    {#if condition === 1}
        <PeopleCol {users}/>
    {/if}
    {#if condition === 0}
        <PeopleColToggle {users}/>
    {/if}

    <slot/>
</div>
<svelte:window bind:innerWidth bind:innerHeight/>

<style>

    .feed {
        margin-top: 3.5rem;
        display:flex;
        flex-direction: row;
        gap: 1rem;
    }
</style>