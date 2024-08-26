<script>
    import Friend from '../../../../components/friend.svelte';
    export let data;
    let profile = data.userProfile
    let friends = profile.friends

</script>

<style>

    .friends-tab {
        margin-top:1rem;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 170px;
        gap:20px;
        min-width:100%;
        text-align: center;
    }
    .separator {
        border:none;
        border-top:1px solid #ccc;
        margin:3% 0;
        min-width:100%;
    }
    .pending {
        opacity:50%;
    }
    @media (max-width: 600px) {
        .friends-tab {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 190px;
        }
    
    }
</style>

<h1>Friends</h1>
<div class="friends-tab">
    {#each friends as friend }
        {#if friend.Status === 'accepted'}
            <Friend profile={friend} id={profile.UserId}/>
        {/if}
    {/each}
</div>
<div class="separator"></div>
<h1> Pending Friend Requests</h1>
<div class="friends-tab pending">
    {#each friends as friend}
        {#if friend.Status === 'pending'}
            <Friend profile={friend} id={profile.UserId} />
        {/if}
    {/each}
</div>
