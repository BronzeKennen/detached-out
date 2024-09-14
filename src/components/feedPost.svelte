<script>
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";



    import Comment from "./comment.svelte";
    import ProfileIcon from "./profileIcon.svelte";
    export let comments;
    export let likes;
    export let reposts = 0;
    export let images;
    export let poster;
    export let content;
    export let postId;
    export let userId;
    export let user;
    export let created;

    $: ogLikes = likes.length;


    const defaultPfp = '/defaultpfp.png'
    let posterPfp = user.profile_pic_url;
    if(!posterPfp) posterPfp = defaultPfp


    $: commentCount = comments.length;
    $: likeCount = likes.length;
    $: images = JSON.parse(images)
    $: {
        if(images) {
            images = images.uploadedFiles
        }
    }

    const linkify = (text) => {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern ,'<a  href="$& target="_blank>$&</a>')
    }

    $: htmlContent = linkify(content);

    let liked = false;
    let reposted = false;
    let commenter = false;
    let comment =''
    let slider=null;

    let timePassed = '';

    function calculateTimePassed(timestamp) {
        const now = new Date();
        const diff = now - timestamp; // Difference in milliseconds

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }

    
    for(const like of likes) { //Has the user already liked this post?
        if(userId === like.SenderId) {
            liked = true; 
            break;
        }
    }
    
    if(images) { //reset the slider if images exist
        slider = 0;
    }
    //bottom button
    function handleLikes() {
        likeCount += liked ? -1 : +1;
        liked = !liked;
        
    }
    function handleReposts() {
        reposts += reposted ? -1 : +1;
        reposted = !reposted;
    }
    
    function toggleCommenter() {
        commenter = !commenter
        autoResize();
    }
    
    
    const submitComment = (async () => {
        commenter = !commenter;
        commentCount += 1;

        let commentId
        const response = await fetch('/api/posts/comments/send', {
            method:'POST',
            body: JSON.stringify({
                Content: comment,
                postId: postId
            })
        })
        if(response.ok) {
            let body = await response.json()
            comments = [...comments,{
                CommentId : body.commentId,
                UserFrom:user,
                Likes:[],
                Content:comment
            }]

            comment = ''
            console.log('success')
        }
        
        comment = '';
    })
    
    //slider functions
    function handleLeft() {
        if(slider > 0) {
            slider -= 1;
        }
    }
    function handleRight() {
        if(slider < images.length) {
            slider += 1;
        }
    }
    
    
    onMount(() => {
        if(!created) {
            timePassed = 'Just Now'
            return
        }
        const createdAt = new Date(created.replace(' ', 'T') + 'Z');
        timePassed = calculateTimePassed(createdAt);
    });
    //send the likes/etc on destroy to not send 10 trillion requests if the button is spammed
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
                postId:postId,
                type:'post'
            })
        
        })

        if(response.ok) {
            console.log('success')
        } else {
            console.log(response)
        }
    })
        

    function autoResize(event) {
        if(!event) return
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
            <ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
            <div id="timePassed">{timePassed} <i class="fa-regular fa-clock"></i></div>
            <button id="timePassed" class="edit-button">Edit</button>
        </div>
        <div class="post">
            <!-- <p>{content}</p> -->
            <p>{@html htmlContent}</p>
            
            <div class="image-slider">
                
                {#if images}
                    <img src={images[slider]} class="post-image">
                    <div class="buttons-a">
                        <button id="left" on:click={handleLeft} disabled={slider === 0}> {'<'}</button>
                        <button id="right" on:click={handleRight} disabled={slider === images.length - 1}> {'>'}</button>
                    </div>
                    {/if}
            <!-- <img src="https://res.cloudinary.com/dsyxmtqbu/image/upload/v1724873933/wjxxl74rtlxdbrmkcivq.png" class="post-image"> -->
            </div>
        </div>
        <div class="likes-buttons">
            <div class="reactions">
                <span>{likeCount} Likes</span>
                <span>
                    <span>{commentCount} Comments</span>
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
            </div>
            {#if commenter}
                <div class="commentsBackground">
                    {#each comments as comment}
                        <Comment 
                            user={user}
                            commentId={comment.CommentId} 
                            sender={comment.UserFrom} 
                            likes={comment.Likes} 
                            comment={comment.Content} 
                        />
                    {/each}
                </div>
            <div class="comment-box">
                <div id="pfp" style={`background-image: url('${posterPfp}')`}></div>
                
                <textarea
                    id="commentbox"
                    type="text" 
                    placeholder="Add a comment..."
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

    .edit-button {
        right:0px !important;
        border:none;
        background-color: none;
        cursor:pointer;
    }
    .image-slider {
    position: relative;
    width: 100%; 
    max-width: 600px; 
    height: auto; 
    margin: 0 auto; 
    overflow: hidden; 
    background-color: #f0f0f0; 
}

.post-image {
    width: 100%; 
    height: auto; 
    display: block; 
    object-fit: cover;
    border-radius: 10px;
}

.buttons-a {
    position: absolute;
    top: 50%; 
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%); 
    z-index: 10; 
    pointer-events: none; 
}

.buttons-a button {
    color:white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7); 
    border: 1px white solid;
    cursor: pointer;
    pointer-events: auto; /* Make sure buttons are clickable */
    z-index: 10; /* Ensure buttons are above everything */
    margin:.5rem;
}

.buttons-a button:disabled {
    opacity:0%;
}
    .feed-post {
        align-self: flex-start;
        background-color: white;
        box-shadow: 0 1.5px 1px rgb(159, 154, 161);
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }
    .post-image {
        width: calc(100% + 2rem);
        margin:0 -1rem;
    }

    #timePassed {
        width: fit-content;
        position: absolute;
        top: 0;
        right: 25px;
        font-size: small;
    }

    .reactions {
        opacity:40%;
        display:flex;
        width:100%;
        justify-content: space-between;

    }
    .stats {
        position: relative;
        margin:-.5rem;
        font-size:18px;
    }
    .post {
        margin:1rem 0rem .5rem 0;
        
    }

    .post p {
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        hyphens: auto;
    }

    .buttons {
        justify-content: space-between;
        display:flex;
        color: #000000;
        margin:.5rem 0;
        padding:.6rem;
        border-top:2px rgba(109, 23, 158, 0.4) solid;
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
        color:#70037a;
        transition-duration: 0.3s;
    }
    .liked {
        cursor:pointer;
        color:#70037a;
        transition-duration: 0.3s;
    }
    .reposted {
        cursor:pointer;
        color:#70037a;
        transition-duration: 0.3s;
    }
    #repostbutton:hover {
        cursor:pointer;
        color:#81008d;
        transition-duration: 0.3s;
    }
    .commenter {
        cursor:pointer;
        color:#81008d;
        transition-duration: 0.3s;
    }
    #commentbutton:hover {
        cursor:pointer;
        color:#81008d;
        transition-duration: 0.3s;
    }
    .comment-box {
        margin-top: 0.5rem;
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
        box-shadow: 0px 0px 2px #76008d;
    }
    .comment-box textarea:hover {
        box-shadow: 0px 0px 5px #76008d;
    }
    .comment-box textarea:focus {
        outline: none;
        box-shadow: 0px 0px 5px #76008d;
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
        margin-left: 0.7rem;
        min-width:50px;
        min-height:50px;
        max-width:50px;
        max-height:50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; 
        background-position: center; 
        background-repeat: no-repeat;
    }


    .commentsBackground {
        border-radius: 10px;
        padding-bottom: 0.1rem;
    }

</style>