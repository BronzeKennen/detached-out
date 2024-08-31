
<script>
    import { onDestroy } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";

    export let user = '';
    export let comment = ''

    export let commentId;
    export let likes;
    export let liked = false;
    export let sender;
    const pfp = sender.profile_pic_url;
    $: likeCount = likes.length;


    function handleLikes() {
        if (liked) {
            likeCount -= 1;
        } else {
            likeCount +=1;
        }
        liked = !liked;
        
    }

    let ogLikes = likes.length;
    for(const like of likes) { //Has the user already liked this post?
        console.log(like)
        if(user.UserId === like.SenderId) {
            liked = true; 
            break;
        }
    }

    onDestroy(async () => {
        let status;
        if(likeCount === ogLikes) return
        if(likeCount > ogLikes) status = 'added'
        else status = 'removed'

        let body;
        const response = await fetch('/api/posts/likes/send', {
            headers: {
                'Content-Type' : 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                status:status,
                postId:commentId,
                type:'comment'
            })
        
        })

        if(response.ok) {
            console.log('success')
        } else {
            console.log(response)
        }
    })
        
</script>

<div class="comment">
    {#if pfp}
        <div id="pfp" style={`background-image: url('${pfp}')`}></div>
    {:else}
        <div id="pfp"></div>
    {/if}
    <div class="bodyReacts">
        <div class="body">
            <div class="commenter">{sender.username}</div>
            <p>{comment}</p>
        </div>
        <div class="likes">
            <b> {likeCount} likes</b>
            <b>•</b>
            <span on:click={handleLikes} id="likebutton" class:liked={liked}>
                <b>{liked ? 'Liked' : 'Like'}</b> 
            </span>
        </div>
    </div>
</div>


<style>
    #pfp {
        margin:.5rem;
        min-width:50px;
        min-height:50px;
        width: 50px;
        height: 50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }


    .comment {
        min-height:25px;
        position:relative;
        display: flex;
        flex-direction: row;
        padding:.2rem;
        margin:1rem 0;
        border-radius: 10px;
    }

    .comment p {
        height: fit-content;
        min-width: 20%;
    }

    .commenter {
        font-weight: bold;
        font-size: large;
    }

    .body {
        flex: 1;
        height: fit-content;
        background-color: #e1d4e7b7;
        margin:.3rem 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
    }

    .bodyReacts {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .likes {
        gap: 0.5rem;
        margin-left: 1.5rem;
        display: flex;
        flex-direction: row;
        color: #393231;
        width: 20%;
        height: 1rem;
        font-size: small;
    }

    #likebutton:hover {
        cursor:pointer;
        color:#8D000E;
        transition-duration: 0.3s;
    }
    .liked {
        cursor:pointer;
        color:#8D000E;
        transition-duration: 0.3s;
    }
</style>