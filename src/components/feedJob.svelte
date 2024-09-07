<script>
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";

    // export let comments;
    // export let likes;
    // export let reposts = 0;
    // export let images;
    // export let poster;
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
    let apply = false;

    function applyToJob() {
        apply = !apply;
    }
</script>

    <div class="feed-post">
        <div class="stats">
            <!-- <ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/> -->
            <p>This is poster info.</p>
            <div id="timePassed"> timePassed <i class="fa-regular fa-clock"></i></div>
        </div>
        <div class="post">
            <div class="jobTitle">Barista needed for take away coffee shop</div>
            <div id="basicInfo">• Employment type: Full-time</div>
            <div id="basicInfo">• Location: Peristeri(On-Site)</div>
            <div id="basicInfo">• Monthly wage: 890€</div>
            <div id="basicInfo">• Desired Skills:
                <div class="desiredSkills">
                    <div class="skill">Talkative</div>
                    <div class="skill">Social</div>
                    <div class="skill">Consistent</div>
                    <div class="skill">Talkative</div>
                    <div class="skill">Talkative</div>
                    <div class="skill">Consistent</div>
                    <div class="skill">Social</div>
                    <div class="skill">Social</div>
                    <div class="skill">Consistent</div>
                </div>
            </div>
            <p>Additional information here.</p>
        </div>
        <button id="applyButton" class="under-text-button" on:click={applyToJob}>{apply ? 'Applied' : 'Apply'}</button>
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

    .jobTitle {
        font-size: x-large;
        font-weight: bold;
        font-style: italic;
    }

    #basicInfo {
        display: flex;
        flex-direction: row;
        font-weight: bold;
        text-wrap: nowrap;
        margin-bottom: 0.25rem;
    }

    .desiredSkills {
        margin-left: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .skill {
        display:flex;
        justify-content: center;
        align-items: center;
        color:black;
        font-size:11px;
        font-weight: bold;
        border-radius: 8px;
        height: 1.25rem;
        box-sizing: border-box;
        position: relative;
        width:fit-content;
        padding: 0 0.5rem;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }

    #applyButton {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:20%;
        margin:0 .2rem 0 80%;
    }

    #applyButton:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
    }

    @media(max-width: 800px) {
        .jobTitle {
            font-size: large;
            font-weight: bold;
            font-style: italic;
        }
    }
</style>