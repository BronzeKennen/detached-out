<script>
    import Comment from "./comment.svelte";
    import ProfileIcon from "./profileIcon.svelte";
    let likes = 0;
    let comments = 0;
    let reposts = 0;
    let liked = false;
    let reposted = false;
    let commenter = false;
    let comment =''
    function handleLikes() {
        if (liked) {
            likes -= 1;
        } else {
            likes +=1;
        }
        liked = !liked;
        
    }
    function handleReposts() {
        if(reposted) {
            reposts -= 1;
        } else {
            reposts += 1;
        }
        reposted = !reposted;
    }

    function toggleCommenter() {
        commenter = !commenter
        autoResize();
    }
    const submitComment = (() => {
        commenter = !commenter;
        comments += 1;
        comment = '';
    })

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 70) {// wtf is this 
            textarea.style.height = `${textarea.scrollHeight - 15}px`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

</script>

    <div class="feed-post">
        <div class="stats">
            <ProfileIcon user="Hamburger"/>
        </div>
        <div class="post">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique quisquam tempora vitae veniam cupiditate excepturi minus aspernatur laboriosam eius quibusdam, recusandae, corrupti aliquam libero molestias magnam repellendus esse dolores culpa ab officia eligendi porro! Unde veritatis repellat quia quam vel pariatur? Neque, officia reiciendis! Nesciunt culpa cupiditate dolore expedita alias.</p>
    
        </div>
        <div class="likes-buttons">
            <div class="reactions">
                <span>{likes} Likes</span>
                <span>
                    <span>{comments} Comments</span>
                    <span>{reposts} Reposts</span>
                </span>
            </div>
            <div class="buttons">
                <span on:click={handleLikes} id="likebutton" class:liked={liked}>
                    <i class="fa-solid fa-thumbs-up"></i>
                    <b>Like</b>
                </span>
                <span id="commentbutton" on:click={toggleCommenter} class:commenter={commenter}>
                    <i class="fa-solid fa-comments"></i>
                    <b>Comment</b>
                </span>
                <span on:click={handleReposts} id="repostbutton" class:reposted={reposted}>
                    <i class="fa-solid fa-paper-plane"></i>
                    <b>Repost</b>
                </span>
            </div>
            {#if commenter}
                <Comment user='Mr.Ham' comment='Θα σε αγγιξω'/> 
                <Comment user='AlexK' comment='🥵🥵'/>
            <div class="comment-box">
                <span id="pfp"></span>
                <textarea
                    id="commentbox"
                    type="text" 
                    placeholder="Add a comment"
                    bind:value={comment}
                    on:input={autoResize}
                />
                <span class="hidden-span"></span>
                {#if comment !== ''}
                    <button on:click={submitComment}><i class="fa-solid fa-paper-plane"></i></button>
                {/if}
        </div>
        {/if}
    </div>
    </div>
<style>
    .feed-post {
        align-self: flex-start;
        background-color:white;
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }


    .reactions {
        opacity:40%;
        display:flex;
        width:100%;
        justify-content: space-between;

    }
    .stats {
        margin:-.5rem;
        font-size:18px;
    }
    .post {
        margin:1rem 0rem .5rem 0;
    }
    .buttons {
        justify-content: space-between;
        display:flex;
        margin:.5rem 0;
        padding:.6rem;
        border-top:2px rgba(0,0,0,.3) solid;
    }
    .buttons b {
        font-size:20px;
    }
    @media(max-width: 500px) {
        .buttons b {
            display:none;
        }
    }
    #likebutton:hover {
        cursor:pointer;
        color:rgb(88, 88, 182);
        transition-duration: 0.3s;
    }
    .liked {
        cursor:pointer;
        color:rgb(88, 88, 182);
        transition-duration: 0.3s;
    }
    .reposted {
        cursor:pointer;
        color:rgb(209, 201, 153);
        transition-duration: 0.3s;
    }
    #repostbutton:hover {
        cursor:pointer;
        color:rgb(209, 201, 153);
        transition-duration: 0.3s;
    }
    .commenter {
        cursor:pointer;
        color:rgb(96, 60, 153);
        transition-duration: 0.3s;
    }
    #commentbutton:hover {
        cursor:pointer;
        color:rgb(96, 60, 153);
        transition-duration: 0.3s;
    }
    .comment-box {
        display:flex;
        flex-direction: row;
        position:relative;
        width:100%;
    }
    .comment-box textarea {
        resize:none;
        height:46px;
        overflow: hidden;
        width:100%;
        padding:1rem;
        border-radius: 50px;
        border:none;
        padding-right:10%;
        box-sizing: border-box;
        transition-duration: 0.5s;
        box-shadow: 0px 0px 2px rgba(155, 17, 113, 1.452);
    }
    .comment-box textarea:hover {
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }
    .comment-box textarea:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }
    .comment-box button {
        font-size:23px;
        position:absolute;
        right: 1.7%;
        top: 0;
        bottom: 6%;
        border: none;
        background:none;
        padding: 0 15px; /* Adjust padding as needed */
        cursor: pointer;
    }
    #pfp {
        margin-top:-.1rem;
        margin-right: .5rem;
        min-width:50px;
        min-height:50px;
        background-color:cyan;
        border-radius:50%;
    }
</style>