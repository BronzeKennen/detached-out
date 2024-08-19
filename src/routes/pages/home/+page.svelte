<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "../../../components/profileIcon.svelte";
    import NewPost from "../../../components/newPost.svelte";
    let users = [];
    let newuser = '';

    // onMount(async () => {
        // const resp = await fetch('/api/users');
        // const data = await resp.json();
        // users = data.body;
    // })
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
    <SideProfile />
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