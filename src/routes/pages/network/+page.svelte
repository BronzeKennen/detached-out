<script>
    import Friend from '../../../components/friend.svelte';
    import {friendStore} from '$lib/stores'
    export let data;
    let profile = data.userProfile
    // let friends = profile.friends
    let friends;
    $: friendStore
    if(!$friendStore) {
        friendStore.set(profile.friends)
    }
    else {
        const newFriends = profile.friends.filter(
            newFriend => !$friendStore.some(existingFriend => existingFriend.UserId === newFriend.UserId)
        );
        friendStore.update(friends => [...friends, ...newFriends])
    }
    let pendingExist = false;
    let friendsExist = false;

    $: {
        pendingExist = $friendStore.some(friend => friend.Status === 'pending')
        friendsExist = $friendStore.some(friend => friend.Status === 'accepted')
    }

</script>

<style>

    .friends-tab {
        margin-top:1rem;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 200px;
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
    @media (max-width: 600px) {
        .friends-tab {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 190px;
        }
    
    }
</style>

<h1>Connections</h1>
<div class="friends-tab">
    {#each $friendStore as friend,index }
        {#if friend.Status === 'accepted'}
            <Friend profile={friend} id={profile.UserId} index={index}/>
        {/if}
    {/each}
</div>
{#if !friendsExist}
    <p> Connected users will appear here</p>
{/if}
<div class="separator"></div>
<h1> Pending Connection Requests</h1>
<div class="friends-tab pending">
    {#each $friendStore as friend,index}
        {#if friend.Status === 'pending'}
            <Friend profile={friend} id={profile.UserId} index={index}/>
        {/if}
    {/each}
</div>

{#if !pendingExist}
    <p> No pending connection requests </p>
{/if}