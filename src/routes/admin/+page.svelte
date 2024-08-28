<script> 
    import AdminGrid from "../../components/adminGrid.svelte";
    import Friend from "../../components/friend.svelte";

    export const users = [];
</script> 

<AdminGrid />
{#each users as user }
        {#if user.Status === 'accepted'}
            <Friend profile={user} id={user.UserId}/>
        {/if}
{/each}