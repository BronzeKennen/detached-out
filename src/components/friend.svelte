<script>
    import { goto } from '$app/navigation';
    import {friendStore} from '$lib/stores'

    export let profile;
    export let id;
    export let index;
    let user;
    let classes = 'friend-profile'
    let addButtons = false;
    user = profile.Sender;
    let pfp = user.profile_pic_url
    const defaultPfp = '/defaultpfp.png'
    if(!pfp) pfp = defaultPfp
    $: {
        if(profile.Sender.UserId === id) {
            user = profile.Recipient
            pfp = user.profile_pic_url
            if(!pfp) pfp = defaultPfp
        } else {
            if(profile.Status === 'pending'){
                addButtons = true;
            } 
        }

        if(profile.Status === 'pending' && !addButtons) {
            classes+= ' low-opacity'
        }
    }

    const deleteFriend = async () => {
        const friendshipId = profile.FriendId;
        const resp = await fetch(`/api/notifications/deleteFriend?friendshipId=${friendshipId}`, {
            method: 'DELETE',
            heeaders: {
                'Content-Type' : 'application/json'
            }
        })

        if(resp.ok) {
            friendStore.update(friends => {
                const updatedFriends = [...friends]; 
                updatedFriends.splice(index, 1); 
                return updatedFriends; 
            });
        } else {
            console.log('An error occured while deleting friend');
        }

    }

    const acceptFriendRequest = async () => {
        const resp = await fetch('/api/notifications/acceptFriendRequest',{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                sender: profile.Sender.UserId,
                recipient: profile.Recipient.UserId
            })
        })
        if(resp.ok) {
            console.log('success')
            $friendStore[index].status = 'accepted'
            friendStore.update(friends => {
                friends[index].Status = 'accepted'; // Update the status
                return [...friends]; // Return a new array to trigger reactivity
            });
        } else {
            console.log('An error has occured while accepting friend request')
        }
    }

    const rejectFriendRequest = async () => {
        const resp = await fetch('/api/notifications/rejectFriendRequest',{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                sender: profile.Sender.UserId,
                recipient: profile.Recipient.UserId
            })
        })
        if(resp.ok) {
            console.log('success')
            friendStore.update(friends => {
                friends[index].Status = 'rejected'; // Update the status
                return [...friends]; // Return a new array to trigger reactivity
            });
        } else {
            console.log('An error has occured while rejecting friend request')
        }

    }


</script>
<div class={classes}>
    <div class="background" style="background-color:{user.background_color}">
        {#if !addButtons}
        <button class="unfriendButton" on:click={deleteFriend}><i class="fa-solid fa-xmark"></i></button>
        {/if}
    </div>
    <div class="pfp" style={`background-image: url('${pfp}')`}></div>
    <div class="details">
        <div class="info-box">
            {#if profile.Status === 'pending' && !addButtons}
            <h6 style="color: orange;">{profile.Status}</h6>
            {:else if profile.Status === 'accepted'}
            <h5 style="color: green;">Connected</h5>
            {/if}
            <h3 id="username"><a href="/pages/profile/{user.UserId}">{user.username}</a> </h3>
            {#if !user.job_title && !user.current_company}
                <p>This user hasn't set their profile</p>

            {/if}
            {#if user.job_title}
            <p>{user.job_title.JobTitle}</p>
            {/if}
            {#if user.current_company}
            <p>{user.current_company.company_name}</p>
            {/if}
            {#if addButtons}
            <div class="buttons">
                <button class="accept" on:click={acceptFriendRequest}><h6>ACCEPT</h6></button>
                <button class="reject" on:click={rejectFriendRequest}><h6>DECLINE</h6></button>
            </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .info-box {
        display:flex;
        align-items: center;
        justify-content: center;
        width:50%;
        flex-direction: column;
    }
    #username {
        top:100px;
    }
    a {
        text-decoration: none;

    }
    a:visited {
        color: inherit;
    }
    .low-opacity {
        opacity:50%;
    }

    button:hover {
        cursor:pointer;
    }
    .buttons {
        display:flex;
        padding:.5rem;
    }
    .buttons button {
        margin:.2rem;
        padding:.2rem;
        border-radius:5px;
        box-shadow: 0px 1px 10px rgb(29, 29, 29);
    }
    .accept {
        background-color: lime;
    }

    .friend-profile {
        color:black;
        margin:.5rem;
        border-radius:10%;
        position:relative;
    }

    .background {
        padding-right: 0.1rem;
        padding-top: 0.1rem;
        position:relative;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        height:55px;
        background-color: rgb(224, 182, 215);
        box-shadow: 0 1.5px 10px rgb(49, 49, 49);
    }
    .pfp {
        position:absolute;
        width:55px;
        height:55px;
        top:55px;
        left:50%;
        border-radius:50%;
        border:3px white solid;
        background-color:aqua;
        transform: translate(-50%, -50%);
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    .details {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        box-shadow: 0 4.5px 9px rgb(34, 34, 34);
        background-color:rgb(255, 255, 255);
        min-height:130px;
        padding-bottom: 8%;
    }
    .details p {
        font-size:12px;
    }

    .details a {
        color:black;
    }

    .unfriendButton {
        position:absolute;
        top: 9%;
        right: 5.5%;
        transform: translateX(50%);
        border-radius:5px;
        border:none;
        background: none;
        color: red;
        font-weight: bolder;
        font-size: larger;
        width:20px;
        height:20px;
    }
</style>