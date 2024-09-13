
<script>
    import FeedPost from "./feedPost.svelte";
    import { onMount ,onDestroy} from "svelte";
    let posts = [];
    export let profile;

    let isLoading;
    let allPostsLoaded = false;
    let page = 2;
    async function fetchPosts() {
        const resp = await fetch(`/api/posts?page=${page}&limit=5&own=1&id=${profile.UserId}`,{
            method:'GET'
        })
        if(resp.ok) {
            const data = await resp.json();
            if(data.body.length > 0) {
                for(const newPost of data.body) {
                    posts = [...posts,newPost]
    
                }
            page += 1;
            } else {
                allPostsLoaded = true;

            }
        }
        isLoading = false;
    }
    function checkScroll() {
        const scrollableHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollableHeight - scrollTop <= windowHeight * 1.5) {
            if (!isLoading) {
                isLoading = true;
                fetchPosts();
            }
        }
    }
    onMount(async () => {
        if(typeof window !== 'undefined')
        window.addEventListener('scroll', checkScroll);

    });

    onDestroy(() => {
        if(typeof window !== 'undefined')
            window.removeEventListener('scroll', checkScroll);
    });
</script>

{#each posts as post} 
    <FeedPost
        user={profile}
        userId={profile.UserId}
        postId={post.PostId}
        poster={profile}
        likes={post.Likes}
        comments={post.Comments}
        reposts={post.RepostCount}
        images={post.ImagesJson}
        content={post.Content}
        created={post.CreatedAt}
    />
{/each}