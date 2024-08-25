<script>
    import ProfileIcon from "./profileIcon.svelte";
    export let sender;
    export let notiftype;
    export let recipient;

    const acceptFriendRequest = async () => {
        const resp = await fetch('/api/notifications/acceptFriendRequest',{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                sender: sender,
                recipient: recipient
            })
        })
        if(resp.ok) {
            console.log('success')
            notiftype = 'dead'
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
                sender: sender,
                recipient: recipient
            })
        })
        if(resp.ok) {
            console.log('success')
            notiftype = 'dead'
        } else {
            console.log('uuuu what du heeeellll')
        }

    }
</script>

<style>
    .notifBlock {
        align-self: flex-start;
        display: flex;
        flex-direction: row;
        background-color:white;
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }

    .notifBlock .pfp {
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 1rem;
        aspect-ratio: 1;
        background-color:cyan;
        width: 10%;
        border-radius: 50%;
    }

    .notifIcon {
        color: black;
        width: 35%;
        height: 35%;
        margin-top: 65%;
        margin-left: 60%;
    }

    .notifBlock .rest {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .notifBlock .message {
        background-color: white;
        color: black;
        padding: 1%;
    }

    .notifBlock .requestResponce {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 1%;
        height: 1.5rem;
    }

    .requestResponce button {
        width: 25%;
        background-color: rgb(155, 134, 175);
        margin-left: 1%;
        margin-right: 1%;
        border-radius: 5px;
        color: white;
    }

    #accept {
        background-color: rgb(0, 200, 0);
        border-color: rgb(0,200,0);
    }
    
    #decline {
        background-color: gray;
        border-color: gray;
    }

    a {
        font-weight: bolder;
        color: black;
    }

    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        .notifBlock .pfp {
            width: 15%;
        }
        
        .notifBlock .rest {
            width: 85%;
        }

        .requestResponce button {
            width: 30%;
        }
    }
</style>

<div class="notifBlock"> 
    <div class="pfp"><span class="notifIcon"><i class="fa-solid fa-user"></i></span></div>
    <div class="rest">
        {#if notiftype === 'friend_request'}
        <div class="requestResponce">
            <div class="message"><a href='/pages/profile/{sender.UserId}'>{sender.username}</a> wants to connect with you.</div>
            <button id="accept" on:click={acceptFriendRequest}>Accept</button>
            <button id="decline" on:click={rejectFriendRequest}>Decline</button>
        </div>
        {:else if notiftype === 'dead'}
            <div class="message"><a href='/pages/profile/{sender.UserId}'>Friend Request {sender.Status}</div>
        {:else}
        <div class="message"><a href='/pages/profile/{sender.UserId}'>{sender.username}</a> wants to connect with you.</div>
        {/if}
    </div>
</div>
<!-- These should be the same code block or separate files -->
<!-- <div class="notifBlock">  -->
    <!-- <div class="pfp"><span class="notifIcon"><i class="fa-solid fa-comments"></i></span></div> -->
    <!-- <div class="rest"> -->
        <!-- <div class="message"><a href='/pages/home'>{sender}</a> has commented on your <a href='/pages/home'>post</a>.</div> -->
    <!-- </div> -->
<!--      -->
<!-- </div> -->
<!--  -->