
<script>
    import ProfileIcon from "./profileIcon.svelte";

    export let user = '';
    export let comment = ''

    export let likes = 0;
    export let liked = false;

    function handleLikes() {
        if (liked) {
            likes -= 1;
        } else {
            likes +=1;
        }
        liked = !liked;
        
    }
</script>

<div class="comment">
    <div id="pfp"></div>
    <div class="bodyReacts">
        <div class="body">
            <div class="commenter">{user}</div>
            <p>{comment}</p>
        </div>
        <div class="likes">
            <b> {likes} likes</b>
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