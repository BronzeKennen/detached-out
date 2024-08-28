<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "../../../components/profileIcon.svelte";
    import NewPost from "../../../components/newPost.svelte";
    let newuser = '';

    export let data;
    const user = data.userProfile;
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
    <SideProfile {user}/>
    <div class='MiddleCol'>
        <NewPost />
        {#each user.posts as post}
            <FeedPost 
                poster={post.UserId}
                likes={post.LikeCount}
                comments={post.CommentCount}
                reposts={post.RepostCount}
                images={post.ImagesJson}
                content={post.Content}
            />
        {/each}
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