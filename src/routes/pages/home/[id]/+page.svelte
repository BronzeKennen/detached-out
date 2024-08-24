<script>
    import FeedPost from "../../../../components/feedPost.svelte";
    import SideProfile from "../../../../components/sideProfile.svelte";
    import Connections from "../../../../components/connections.svelte";
    import ProfileIcon from "../../../../components/profileIcon.svelte";
    import NewPost from "../../../../components/newPost.svelte";
    import { onMount } from "svelte";
    let users = [];
    let newuser = '';
    export let data;
    import {selectedProfile} from '$lib/stores.js'


    $: if (data && data.userProfile) {
        selectedProfile.set(data.userProfile);
    }

    let resp;
  
// 
</script>

<style>
    .feed {
        display:flex;
        flex-direction: row;
    }
    /* will be removed */
    @media (max-width : 1000px) {
    }

    @media (max-width: 600px) {
        .feed {
            display:flex;
            flex-direction: column;
        }
    }

    .MiddleCol {
        flex-direction: column;
        flex: 2;
    }

</style>
<div class="feed">
    <SideProfile profile={$selectedProfile}/>
    <div class='MiddleCol'>
        <NewPost />
        <FeedPost />
    </div>  
    <Connections />
</div>
    <!-- {#if users} -->
        <!-- {#each users as user} -->
            <!-- <div class="user"> -->
                <!-- <ProfileIcon user={user.username}/> -->
                <!-- <p>{user.password}</p> -->
                <!-- <p>{user.email}</p> -->
            <!-- </div> -->
        <!-- {/each} -->
    <!-- {/if} -->