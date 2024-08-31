<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { invalidate } from '$app/navigation'
    import ProfileIcon from "../../../components/profileIcon.svelte";
    import NewPost from "../../../components/newPost.svelte";
    let newuser = '';

    export let data;

    const user = data.userProfile;



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
        <NewPost id={user.UserId} pfp={user.profile_pic_url}/>
        {#each user.posts as post}
            <FeedPost 
                userId={user.UserId}
                postId={post.PostId}
                poster={post.UserId}
                likes={post.Likes}
                commentCount={post.CommentCount}
                comments={post.Comments}
                reposts={post.RepostCount}
                images={post.ImagesJson}
                content={post.Content}
                created={post.CreatedAt}
            />
        {/each}
    </div>  
    <Connections />
</div>
