
<script>
    export let data;
    const post = data.post
    const user = data.user;
    import FeedPost from "../../../../components/feedPost.svelte";

</script>

{#if !post}
<div class="not-found">
    <h1>The post was not found.</h1>
</div>

{:else}
<FeedPost
    user={user}
    userId={post.UserId}
    postId={post.PostId}
    poster={post.UserId}
    likes={post.Likes}
    comments={post.Comments}
    reposts={post.RepostCount}
    images={post.ImagesJson}
    content={post.Content}
    created={post.CreatedAt}
/>
{/if}