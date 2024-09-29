<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { invalidate } from '$app/navigation'
    import ProfileIcon from "../../../components/profileIcon.svelte";
    import NewPost from "../../../components/newPost.svelte";
    import { onMount,onDestroy } from "svelte";
    let newuser = '';

    export let data;

    const user = data.userProfile;
    let allPostsLoaded = false;

    let isLoading = false;

    let recommendedPosts = [];

    function checkScroll() {
        const scrollableHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollableHeight - scrollTop <= windowHeight * 1.5) {
            if (!isLoading) {
                isLoading = true;
                recommended ? fetchRecommended() : fetchPosts();
            }
        }
    }
    let page = 2;
    async function fetchPosts() {
        const resp = await fetch(`/api/posts?page=${page}&limit=5`,{
            method:'GET'
        })
        if(resp.ok) {
            const data = await resp.json();
            if(data.body.length > 0) {
                for(const newPost of data.body) {
                    user.posts = [...user.posts,newPost]
    
                }
            page += 1;
            } else {
                allPostsLoaded = true;

            }
        }
        isLoading = false;
    }

    async function fetchRecommended() {

        const resp = await fetch(`/api/posts?page=${page}&limit=5&recommended=1`,{
            method:'GET'
        })
        if(resp.ok) {
            const data = await resp.json();
            if(data.body.length > 0) {
                let tempPosts = []
                for(const newPost of data.body) {
                    tempPosts = [newPost,...tempPosts]
    
                }
                user.posts = [...user.posts,...tempPosts]
            page += 1;
            } else {
                allPostsLoaded = true;

            }
        }
        console.log(user.posts, page)
        isLoading = false;
    }



    onMount(() => {
        if(typeof window !== 'undefined')
        window.addEventListener('scroll', checkScroll);

    });
    onDestroy(() => {
        if(typeof window !== 'undefined')
            window.removeEventListener('scroll', checkScroll);
    });


    $: recent = true;
    $: recommended = false;

    function toggleRecommened() {
        recent = !recent;
        recommended = !recommended;
        page = 1;
        user.posts = [];
        recommended ? fetchRecommended() : fetchPosts();
    }

</script>

<style>
    .feed {
        display:flex;
        flex-direction: row;
    }

    
    
    .LeftCol {
        display: flex;
        flex-direction: row;
        width: 300px;
        height: 50vh;
        margin-right: 1rem;
    }

    .RightCol {
        display: flex;
        flex-direction: row;
        width: 260px;
        margin-right: 5px;
        height: 50vh;
    }
    
    .MiddleCol {
        flex-direction: column;
        flex: 2;
    }

    @media (max-width : 950px) {
        .RightCol {
            width: 210px;
        }

    }

    @media (max-width : 850px) {
        .LeftCol {
            width: 250px;
        }
        .RightCol {
            display: none;
        }
    }

    @media (max-width: 600px) {
        .feed {
            display:flex;
            flex-direction: column;
        }

        .LeftCol {
            width: 100%;
            height: fit-content;
            flex-direction: column;
        }
    }
</style>

<div class="feed">
    <div class='LeftCol'>
        <SideProfile {user}/>
    </div>
    <div class='MiddleCol'>
        <NewPost user={user} pfp={user.profile_pic_url}/>
        <button on:click={toggleRecommened}>VIEWING {recent ? 'RECENT' : 'RECOMMENDED'} POSTS</button>
            {#each user.posts as post}
                <FeedPost
                    user={user}
                    userId={user.UserId}
                    postId={post.PostId}
                    poster={post.UserId}
                    likes={post.Likes}
                    comments={post.Comments}
                    reposts={post.RepostCount}
                    images={post.ImagesJson}
                    content={post.Content}
                    created={post.CreatedAt}
                />
            {/each}
    </div>  
    <div class='RightCol'>
        <Connections />
    </div>
</div>
