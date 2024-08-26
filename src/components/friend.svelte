<script>
    import { goto } from '$app/navigation';

    export let profile;
    export let id;
    let user;
    let classes = 'friend-profile'
    let addButtons = false;
    user = profile.Sender;
    $: {
        if(profile.Sender.UserId === id) {
            user = profile.Recipient
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
            console.log('success')
        } else {
            console.log('what du heeeellll oh my god no wayayayayaay');
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
            goto(window.location.pathname, { replaceState: true });
        } else {
            console.log('uuuu what du heeeellll')
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
            goto(window.location.pathname, { replaceState: true });
        } else {
            console.log('uuuu what du heeeellll')
        }

    }


</script>
<div class={classes}>
    <div class="background">
        {#if !addButtons}
        <button class="unfriendButton" on:click={deleteFriend}>X</button>
        {/if}
    </div>
    <div class="pfp">

    </div>
    <div class="details">
        {#if user.job_title}
        <p>{user.job_title.JobTitle}</p>
        {/if}
        {#if user.current_company}
        <p>{user.current_company.company_name}</p>
        {/if}
        <h4><a href="/pages/profile/{user.UserId}">{user.username}</a> </h4>
        {#if profile.Status === 'pending' && !addButtons}
        <h6 style="color: orange;">{profile.Status}</h6>
        {/if}
        {#if addButtons}
        <div class="buttons">
            <button class="accept" on:click={acceptFriendRequest}><h6>ACCEPT</h6></button>
            <button class="reject" on:click={rejectFriendRequest}><h6>DECLINE</h6></button>
        </div>
        {/if}
         <!-- those are for testing purposes they will be removed -->

    </div>
</div>

<style>
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
        box-shadow: 0px 1px 10px rgb(202, 21, 178);
    }
    .accept {
        background-color: lime;
    }
.friend-profile {

    color:white;
    margin:.5rem;
    border-radius:10%;
    position:relative;
}
.background {
    position:relative;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    height:55px;
    background-color: beige;
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
}
.details {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    background-color:rgb(0, 0, 0);
    min-height:130px;
    padding-bottom: 2px;
}
.details p {
    font-size:12px;
}

.details a {
    color:white;
}

.unfriendButton {
    position:absolute;
    top: 9%;
    right: 5.5%;
    transform: translateX(50%);
    border-radius:5px;
    border:none;
    background-color: red;
    width:20px;
    height:20px;
}
</style>