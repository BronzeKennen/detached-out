<script>
    import NotifBlock from "../../../components/notifBlock.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { onMount } from "svelte";
    import {selectedProfile} from '$lib/stores.js'
    import ProfileIcon from "../../../components/profileIcon.svelte";
    let users = [];
    let newuser = '';
    export let data;
    console.log(data.userProfile.friends)

    
    $: pending = 0;
    let friends;
    $: if (data && data.userProfile) {
        selectedProfile.set(data.userProfile);
        friends = $selectedProfile.friends;
        friends.forEach(friend => {
            if (friend.Status === 'pending' && friend.Recipient === $selectedProfile.UserId )
                pending++;
        })
    }


</script>

<style>
    .no-notif {
        margin:1rem;
        background: white;
        display:flex;
        justify-content: center;
        padding:2rem;
        border-radius:10px;
    }
    .feed {
        display:flex;
        flex-direction: row;
    }

    .MiddleCol {
        flex-direction: column;
        flex: 2;
    }
    @media (max-width: 600px) {
        .feed {
            display:flex;
            flex-direction: column;
        }
    }

</style>
<div class="feed">
    <SideProfile user={data.userProfile}/>
    <div class='MiddleCol'>
        {#each $selectedProfile.friends as friend}
            {#if friend.Recipient === $selectedProfile.UserId && friend.Status === 'pending'}
                <NotifBlock recipient={$selectedProfile.UserId} sender={friend.Sender} notiftype='friend_request' pfp={friend.Sender.profile_pic_url}/>
            {/if}
        {/each}
        {#if !pending}
        <div class='no-notif'><h3>No notifications to show </h3></div>
        {/if}
    </div>
    <Connections />
</div>