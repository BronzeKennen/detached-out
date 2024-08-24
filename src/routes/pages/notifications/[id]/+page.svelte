<script>
    import NotifBlock from "../../../../components/notifBlock.svelte";
    import SideProfile from "../../../../components/sideProfile.svelte";
    import Connections from "../../../../components/connections.svelte";
    import { onMount } from "svelte";
    import {selectedProfile} from '$lib/stores.js'
    import ProfileIcon from "../../../../components/profileIcon.svelte";
    let users = [];
    let newuser = '';
    export let data;

    
    let friends;
    $: if (data && data.userProfile) {
        selectedProfile.set(data.userProfile);
        friends = $selectedProfile.friends;
    }


</script>

<style>
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
    .user {
        background-color: rgba(163, 127, 216, 0.363);
        border-radius: 10px;
        margin:1rem;
        width:20%;
        padding:.3rem;
        font-size:15px;

    }
</style>
<div class="feed">
    <SideProfile/>
    <div class='MiddleCol'>
        {#each $selectedProfile.friends as friend}
            <NotifBlock sender={friend.Sender} notiftype='friend_request'/>
        {/each}
    </div>
    <Connections />
</div>