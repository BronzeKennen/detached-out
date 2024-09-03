<script>
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";


    // export let comments;
    // export let likes;
    // export let reposts = 0;
    // export let images;
    export let poster;
    // export let content;
    // export let postId;
    // export let userId;
    // export let user;
    // export let created;

    // $: ogLikes = likes.length;


    // const posterPfp = user.profile_pic_url;

    // $: commentCount = comments.length;
    // $: likeCount = likes.length;
    // images = JSON.parse(images)
    // if(images)
    // images = images.uploadedFiles
    // let liked = false;
    // let reposted = false;
    // let commenter = false;
    // let comment =''
    // let slider=null;

    // let timePassed = '';

    // function calculateTimePassed(timestamp) {
    //     const now = new Date();
    //     const diff = now - timestamp; // Difference in milliseconds

    //     const seconds = Math.floor(diff / 1000);
    //     const minutes = Math.floor(seconds / 60);
    //     const hours = Math.floor(minutes / 60);
    //     const days = Math.floor(hours / 24);

    //     if (days > 0) {
    //         return `${days}d`;
    //     } else if (hours > 0) {
    //         return `${hours}h`;
    //     } else if (minutes > 0) {
    //         return `${minutes}m`;
    //     } else {
    //         return `${seconds}s`;
    //     }
    // }

    // onMount(() => {
    //     if(!created) {
    //         timePassed = 'Just Now'
    //         return
    //     }
    //     const createdAt = new Date(created.replace(' ', 'T') + 'Z');
    //     timePassed = calculateTimePassed(createdAt);
    // });
    // //send the likes/etc on destroy to not send 10 trillion requests if the button is spammed
    // onDestroy(async () => {
    //     let status;
    //     if(likeCount === ogLikes) return
    //     if(likeCount > ogLikes) status = 'added'
    //     else status = 'removed'

    //     let body;
    //     const response = await fetch('/api/posts/likes/send', {
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //             status:status,
    //             postId:postId,
    //             type:'post'
    //         })
        
    //     })

    //     if(response.ok) {
    //         console.log('success')
    //     } else {
    //         console.log(response)
    //     }
    // })
        

    // function autoResize(event) {
    //     if(!event) return
    //     const textarea = event.target;
    //     textarea.style.height = 'auto';

    //     if(textarea.scrollHeight < 70) {// wtf is this 
    //         textarea.style.height = `${textarea.scrollHeight - 15}px`;
    //     } else {
    //         textarea.style.height = `${textarea.scrollHeight}px`;
    //     }
    // }

</script>

    <div class="feed-post">
        <div class="stats">
            <!-- <ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/> -->
            <p>This is poster info.</p>
            <div id="timePassed"> timePassed <i class="fa-regular fa-clock"></i></div>
        </div>
        <div class="post">
            <p>This is post jobBody</p>
        </div>
    </div>
    
<style>
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
    
    #timePassed {
        width: fit-content;
        position: absolute;
        top: 0;
        right: 0;
        font-size: small;
    }

    .stats {
        position: relative;
        margin:-.5rem;
        font-size:18px;
    }
    .post {
        margin:1rem 0rem .5rem 0;
    }

    @media(max-width: 500px) {
    }
</style>