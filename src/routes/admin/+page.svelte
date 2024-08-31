<script> 
    import AdminGrid from "../../components/adminGrid.svelte";
    import Friend from "../../components/friend.svelte";

    export let data;
</script> 

<AdminGrid data={data}/>
{#each data as user }
        <Friend profile={user} id={UserId}/>
{/each}